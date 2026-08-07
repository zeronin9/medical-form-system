import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '2. MLC.docx';
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: `Template tidak ditemukan: ${fileName}` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: () => '',
    });

    const pick = (...keys: string[]) => {
      for (const key of keys) {
        const value = formData[key];
        if (value !== undefined && value !== null) return value;
      }
      return '';
    };

    const str = (...keys: string[]) => {
      const value = pick(...keys);
      return value === undefined || value === null ? '' : String(value);
    };

    const yn = (value: any): 'Yes' | 'No' | '' => {
      if (value === true || value === 'true' || value === 'Yes') return 'Yes';
      if (value === false || value === 'false' || value === 'No') return 'No';
      return '';
    };

    const markYesNo = (value: any) => {
      if (value === true || value === 'true' || value === 'Yes') return 'Yes';
      if (value === false || value === 'false' || value === 'No') return 'No';
      return '';
    };

    const isY = (value: any) => (yn(value) === 'Yes' ? '☑' : '☐');
    const isN = (value: any) => (yn(value) === 'No' ? '☑' : '☐');

    const splitDate = (value: string) => {
      if (!value || !value.includes('-')) {
        return { year: '', month: '', day: '', ddmmyyyy: '' };
      }
      const [year, month, day] = value.split('-');
      return {
        year: year || '',
        month: month || '',
        day: day || '',
        ddmmyyyy: `${day || ''}/${month || ''}/${year || ''}`, // Format ddmmyyyy
      };
    };

    const splitBloodPressure = (value: string) => {
      const raw = (value || '').trim();
      if (!raw) return { sys: '', dia: '' };

      const [sys, dia] = raw.split('/');
      return {
        sys: (sys || '').trim(),
        dia: (dia || '').trim(),
      };
    };

    const dob = str('dob');
    const { year: dobY, month: dobM, day: dobD } = splitDate(dob);
    const { sys: bp_sys, dia: bp_dia } = splitBloodPressure(
      str('bloodPressure', 'blood_pressure')
    );

    const gender = str('gender');
    const isFemale = gender === 'Female';

    const renderData = {
      // ==========================================
      // 1. IDENTITAS & CERTIFICATE HEADER
      // ==========================================
      name: `${str('firstName', 'first_name')} ${str('familyName', 'family_name')}`.trim(),

      family_name: str('familyName', 'family_name'),
      first_name: str('firstName', 'first_name'),

      company: str('company'),
      gender: str('gender'),
      dob: `${dobD}/${dobM}/${dobY}`,
      nationality: str('nationality'),
      id_passport: str('idPassport', 'id_passport'),
      ilo_position: str('ilo_position', 'position'),

      date: str('date'),
      exp_date: str('exp_date'),

      // ==========================================
      // 2. DECLARATION OF THE RECOGNIZED MEDICAL PRACTITIONER
      // ==========================================
      mlc_id: markYesNo(pick('id_checked')),
      
      // FIX: Jika kosong maka biarkan kosong. Jika Fit -> Yes, Unfit -> No.
      mlc_fit_lookout: str('fit_lookout') === 'Fit' ? 'Yes' : (str('fit_lookout') === 'Unfit' ? 'No' : ''),
      
      mlc_hr_stcw: markYesNo(pick('hr_stcw')),
      
      // FIX: Cek apakah ada departemen yang diisi. Jika belum ada yang diisi, biarkan kosong.
      mlc_fit_sea: (!str('fit_deck') && !str('fit_engine') && !str('fit_catering') && !str('fit_other')) 
        ? '' 
        : (str('fit_deck') === 'Fit' || str('fit_engine') === 'Fit' || str('fit_catering') === 'Fit' || str('fit_other') === 'Fit' ? 'Yes' : 'No'),
      
      mlc_hr_unaid: markYesNo(pick('hr_unaid')),
      mlc_free: markYesNo(pick('free_cond')),
      mlc_vis_stcw: markYesNo(pick('vis_stcw')),
      mlc_col_stcw: markYesNo(pick('col_stcw')),
      
      // FIX: Jika belum dipilih Yes/No, biarkan kosong.
      mlc_limit: !str('restrictions') ? '' : (str('restrictions') === 'Yes' ? str('rest_desc') : 'No'),
      
      date_vt: str('date_vt', 'date'),

      // ==========================================
      // 3. CLINICAL FINDINGS (VITAL & SENSORY)
      // ==========================================
      h: str('height'),
      w: str('weight'),
      p: str('pulse'),
      rhyt: str('rhyt', 'rhythm') || 'Normal',
      bp_sys,
      bp_dia,

      // Visual acuity
      disr_unc: str('disr_unc') || '-',
      disl_unc: str('disl_unc') || '-',
      bv_unc: str('bv_unc') || '-',
      disr_cor: str('disr_cor') || '-',
      disl_cor: str('disl_cor') || '-',
      bv_cor: str('bv_cor') || '-',
      nearr_unc: str('nearr_unc') || '-',
      nearl_unc: str('nearl_unc') || '-',
      near_bv_unc: str('near_bv_unc') || '-',
      nearr_cor: str('nearr_cor') || '-',
      nearl_cor: str('nearl_cor') || '-',
      near_bv_cor: str('near_bv_cor') || '-',

      // Visual field & colour vision
      vf_r_n: formData.vf_r === 'Normal' ? '☑' : '☐',
      vf_r_d: formData.vf_r === 'Defective' ? '☑' : '☐',
      vf_l_n: formData.vf_l === 'Normal' ? '☑' : '☐',
      vf_l_d: formData.vf_l === 'Defective' ? '☑' : '☐',

      cv_n: str('color_vision') === 'Normal' ? '☑' : '☐',
      cv_df: str('color_vision') === 'Partial' || str('color_vision') === 'Total' ? '☑' : '☐',

      // Hearing
      hr_r_n: formData.hear_r === 'Normal' ? '☑' : '☐',
      hr_r_s: str('ea_wr_r'),
      hr_r_o: str('ea_meatus'),

      hr_l_n: formData.hear_l === 'Normal' ? '☑' : '☐',
      hr_l_s: str('ea_wr_l'),
      hr_l_o: str('ea_meatus'),

      // ==========================================
      // 4. PEMERIKSAAN FISIK UMUM (DIRECT MAPPING 24 ITEM)
      // ==========================================
      head_n: formData.ilo_head === 'Normal' ? '☑' : '☐',
      head_a: formData.ilo_head === 'Abnormal' ? '☑' : '☐',
      var_n: formData.ilo_var === 'Normal' ? '☑' : '☐',
      var_a: formData.ilo_var === 'Abnormal' ? '☑' : '☐',
      ent_n: formData.ilo_ent === 'Normal' ? '☑' : '☐',
      ent_a: formData.ilo_ent === 'Abnormal' ? '☑' : '☐',
      vasc_n: formData.ilo_vasc === 'Normal' ? '☑' : '☐',
      vasc_a: formData.ilo_vasc === 'Abnormal' ? '☑' : '☐',
      oral_n: formData.ilo_oral === 'Normal' ? '☑' : '☐',
      oral_a: formData.ilo_oral === 'Abnormal' ? '☑' : '☐',
      abd_n: formData.ilo_abd === 'Normal' ? '☑' : '☐',
      abd_a: formData.ilo_abd === 'Abnormal' ? '☑' : '☐',
      ear_n: formData.ilo_ear === 'Normal' ? '☑' : '☐',
      ear_a: formData.ilo_ear === 'Abnormal' ? '☑' : '☐',
      hern_n: formData.ilo_hern === 'Normal' ? '☑' : '☐',
      hern_a: formData.ilo_hern === 'Abnormal' ? '☑' : '☐',
      eye_n: formData.ilo_eye === 'Normal' ? '☑' : '☐',
      eye_a: formData.ilo_eye === 'Abnormal' ? '☑' : '☐',
      anus_n: formData.ilo_anus === 'Normal' ? '☑' : '☐',
      anus_a: formData.ilo_anus === 'Abnormal' ? '☑' : '☐',
      oph_n: formData.ilo_oph === 'Normal' ? '☑' : '☐',
      oph_a: formData.ilo_oph === 'Abnormal' ? '☑' : '☐',
      gu_n: formData.ilo_gu === 'Normal' ? '☑' : '☐',
      gu_a: formData.ilo_gu === 'Abnormal' ? '☑' : '☐',
      pupil_n: formData.ilo_pupil === 'Normal' ? '☑' : '☐',
      pupil_a: formData.ilo_pupil === 'Abnormal' ? '☑' : '☐',
      ext_n: formData.ilo_ext === 'Normal' ? '☑' : '☐',
      ext_a: formData.ilo_ext === 'Abnormal' ? '☑' : '☐',
      eyem_n: formData.ilo_eyem === 'Normal' ? '☑' : '☐',
      eyem_a: formData.ilo_eyem === 'Abnormal' ? '☑' : '☐',
      spine_n: formData.ilo_spine === 'Normal' ? '☑' : '☐',
      spine_a: formData.ilo_spine === 'Abnormal' ? '☑' : '☐',
      lung_n: formData.ilo_lung === 'Normal' ? '☑' : '☐',
      lung_a: formData.ilo_lung === 'Abnormal' ? '☑' : '☐',
      neuro_n: formData.ilo_neuro === 'Normal' ? '☑' : '☐',
      neuro_a: formData.ilo_neuro === 'Abnormal' ? '☑' : '☐',
      breast_n: formData.ilo_breast === 'Normal' ? '☑' : '☐',
      breast_a: formData.ilo_breast === 'Abnormal' ? '☑' : '☐',
      psych_n: formData.ilo_psych === 'Normal' ? '☑' : '☐',
      psych_a: formData.ilo_psych === 'Abnormal' ? '☑' : '☐',
      heart_n: formData.ilo_heart === 'Normal' ? '☑' : '☐',
      heart_a: formData.ilo_heart === 'Abnormal' ? '☑' : '☐',
      gen_n: formData.ilo_gen === 'Normal' ? '☑' : '☐',
      gen_a: formData.ilo_gen === 'Abnormal' ? '☑' : '☐',
      skin_n: formData.ilo_skin === 'Normal' ? '☑' : '☐',
      skin_a: formData.ilo_skin === 'Abnormal' ? '☑' : '☐',

      // ==========================================
      // 5. OTHER DIAGNOSTICS TESTS AND RESULTS
      // ==========================================
      xray_res: str('des_abnor') || str('xray') || '-',
      hiv_res: str('hiv_res') || '-',
      vdrl_res: str('vdrl_res') || '-',
      ur_sugar: str('ur_sugar') || '-',
      albumin: str('albumin') || '-',
      urin_b: str('urin_b') || '-',
      diag: str('diag') || '-',

      // ==========================================
      // 6. FITNESS / RESTRICTIONS
      // ==========================================
      lo_f: str('fit_lookout') === 'Fit' ? '☑' : '☐',
      lo_u: str('fit_lookout') === 'Unfit' ? '☑' : '☐',

      dk_f: str('fit_deck') === 'Fit' ? '☑' : '☐',
      dk_u: str('fit_deck') === 'Unfit' ? '☑' : '☐',

      en_f: str('fit_engine') === 'Fit' ? '☑' : '☐',
      en_u: str('fit_engine') === 'Unfit' ? '☑' : '☐',

      ct_f: str('fit_catering') === 'Fit' ? '☑' : '☐',
      ct_u: str('fit_catering') === 'Unfit' ? '☑' : '☐',

      ot_f: str('fit_other') === 'Fit' ? '☑' : '☐',
      ot_u: str('fit_other') === 'Unfit' ? '☑' : '☐',

      rest_no: str('restrictions') === 'No' ? '☑' : '☐',
      rest_yes: str('restrictions') === 'Yes' ? '☑' : '☐',

      glass_y: str('glasses_nec') === 'Yes' ? '☑' : '☐',
      glass_n: str('glasses_nec') === 'No' ? '☑' : '☐',

      free_y: str('free_cond') === 'Yes' ? '☑' : '☐',
      free_n: str('free_cond') === 'No' ? '☑' : '☐',

      rest_desc:
        str('restrictions') === 'Yes'
          ? str('rest_desc') || '-'
          : '-',

      action_taken: str('action_taken') || '-',

      // ==========================================
      // 7. PERSONAL DECLARATION
      // ==========================================
      day: dobD || '',
      month: dobM || '',
      year: dobY || '',

      address: str('address'),
      seaman_book: str('seaman_book'),
      type_of_ship: str('typeOfShip', 'type_of_ship'),
      trade_area: str('tradeArea', 'trade_area'),
      department: str('department', 'position', 'ilo_position'),

      q1_y: isY(pick('mh_eye')), q1_n: isN(pick('mh_eye')),
      q2_y: isY(pick('mh_hbp')), q2_n: isN(pick('mh_hbp')),
      q3_y: isY(pick('mh_heart')), q3_n: isN(pick('mh_heart')),
      q4_y: isY(pick('mhcardiacsurgery')), q4_n: isN(pick('mhcardiacsurgery')),
      q5_y: isY(pick('mh_varicose')), q5_n: isN(pick('mh_varicose')),
      q6_y: isY(pick('mh_asthma')), q6_n: isN(pick('mh_asthma')),
      q7_y: isY(pick('mh_blood')), q7_n: isN(pick('mh_blood')),
      q8_y: isY(pick('mh_diabetes')), q8_n: isN(pick('mh_diabetes')),
      q9_y: isY(pick('mh_thyroid')), q9_n: isN(pick('mh_thyroid')),
      q10_y: isY(pick('mh_digestive')), q10_n: isN(pick('mh_digestive')),
      q11_y: isY(pick('mh_kidney')), q11_n: isN(pick('mh_kidney')),
      q12_y: isY(pick('mh_skin')), q12_n: isN(pick('mh_skin')),
      q13_y: isY(pick('mh_allergy_med')), q13_n: isN(pick('mh_allergy_med')),
      q14_y: isY(pick('mh_infectious')), q14_n: isN(pick('mh_infectious')),
      q15_y: isY(pick('mh_hernia')), q15_n: isN(pick('mh_hernia')),
      q16_y: isY(pick('mh_genital')), q16_n: isN(pick('mh_genital')),
      q17_y: isY(pick('mhpregnancy')),
q17_n: isN(pick('mhpregnancy')),
      q18_y: isY(pick('mhsleep')), q18_n: isN(pick('mhsleep')),
      
      q19_y: isY(pick('mh_lifestyle', 'q_smoke', 'qsmoke')),
q19_n: isN(pick('mh_lifestyle', 'q_smoke', 'qsmoke')),

      q20_y: isY(pick('mhsurgery')), q20_n: isN(pick('mhsurgery')),
      q21_y: isY(pick('mh_epilepsy')), q21_n: isN(pick('mh_epilepsy')),
      q22_y: isY(pick('mhfainting')), q22_n: isN(pick('mhfainting')),
      q23_y: isY(pick('mh_loss_consc')), q23_n: isN(pick('mh_loss_consc')),
      q24_y: isY(pick('mh_psychiatric')), q24_n: isN(pick('mh_psychiatric')),
      q25_y: isY(pick('mh_depression')), q25_n: isN(pick('mh_depression')),
      q26_y: isY(pick('mh_suicide')), q26_n: isN(pick('mh_suicide')),
      q27_y: isY(pick('mh_memory')), q27_n: isN(pick('mh_memory')),
      q28_y: isY(pick('mh_balance')), q28_n: isN(pick('mh_balance')),
      q29_y: isY(pick('mh_headache')), q29_n: isN(pick('mh_headache')),
      q30_y: isY(pick('mh_ear')), q30_n: isN(pick('mh_ear')),
      q31_y: isY(pick('mh_mobility')), q31_n: isN(pick('mh_mobility')),
      
      q32_y: isY(pick('mh_back', 'mh_back_joint', 'back_problem')),
q32_n: isN(pick('mh_back', 'mh_back_joint', 'back_problem')),

      q33_y: isY(pick('mh_amputation')), q33_n: isN(pick('mh_amputation')),
      q34_y: isY(pick('mh_accident')), q34_n: isN(pick('mh_accident')),
      q35_y: isY(pick('qmedevac', 'q_medevac')), q35_n: isN(pick('qmedevac', 'q_medevac')),
      q36_y: isY(pick('qillness', 'q_illness')), q36_n: isN(pick('qillness', 'q_illness')),
      q37_y: isY(pick('qomfc', 'q_omfc')), q37_n: isN(pick('qomfc', 'q_omfc')),
      q38_y: isY(pick('qcertrevoked', 'q_cert_revoked')), q38_n: isN(pick('qcertrevoked', 'q_cert_revoked')),
      q39_y: isY(pick('qawaremedical', 'q_aware_medical')), q39_n: isN(pick('qawaremedical', 'q_aware_medical')),
      q40_y: isY(pick('qfit', 'q_fit')), q40_n: isN(pick('qfit', 'q_fit')),
      q41_y: isY(pick('mh_allergy_med')), q41_n: isN(pick('mh_allergy_med')),
      q42_y: isY(pick('qmeds', 'q_meds')), q42_n: isN(pick('qmeds', 'q_meds')),

      epd_comments: str('comments'),
      meds_text: str('qmedstext', 'q_meds_text'),

      // ==========================================
      // 8. FINAL DECLARATION
      // ==========================================
      eps: str('eps'),
      hospital: str('hospital'),
    };

    doc.render(renderData);

    const buf = doc.getZip().generate({
      type: 'uint8array',
      compression: 'DEFLATE',
    });

    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="MLC_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating MLC document:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan internal backend saat generate MLC.' },
      { status: 500 }
    );
  }
}