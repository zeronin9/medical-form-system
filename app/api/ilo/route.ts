import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '1. ILO.docx';
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

    // =========================
    // Helpers
    // =========================
    const val = (...keys: string[]) => {
      for (const key of keys) {
        const v = formData[key];
        if (v !== undefined && v !== null) return v;
      }
      return '';
    };

    const str = (...keys: string[]) => {
      const v = val(...keys);
      return v === undefined || v === null ? '' : String(v);
    };

    const yn = (input: any): 'Yes' | 'No' | '' => {
      if (input === true || input === 'true' || input === 'Yes') return 'Yes';
      if (input === false || input === 'false' || input === 'No') return 'No';
      return '';
    };

    const isY = (input: any) => (yn(input) === 'Yes' ? '☑' : '☐');
    const isN = (input: any) => (yn(input) === 'No' ? '☑' : '☐');

    const ex = (input: any): 'Normal' | 'Abnormal' | null => {
      if (input === 'Normal') return 'Normal';
      if (input === 'Abnormal') return 'Abnormal';
      return null;
    };

    const isExN = (input: any) => (ex(input) === 'Normal' ? '☑' : '☐');
    const isExA = (input: any) => (ex(input) === 'Abnormal' ? '☑' : '☐');

    const splitDate = (dateValue: string) => {
      if (!dateValue || !dateValue.includes('-')) {
        return { year: '', month: '', day: '' };
      }
      const [year, month, day] = dateValue.split('-');
      return {
        year: year || '',
        month: month || '',
        day: day || '',
      };
    };

    const formatDob = (dateValue: string) => {
      const { year, month, day } = splitDate(dateValue);
      if (!year || !month || !day) return '';
      return `${year}/${month}/${day}`;
    };

    const splitBloodPressure = (bpValue: string) => {
      const cleaned = (bpValue || '').trim();
      if (!cleaned) return { sys: '', dia: '' };
      const parts = cleaned.split('/');
      return {
        sys: parts[0]?.trim() || '',
        dia: parts[1]?.trim() || '',
      };
    };

    const evaluateExam = (fields: string[]) => {
      const values = fields
        .map((field) => formData[field])
        .filter((v) => v !== undefined && v !== null && v !== '');

      if (values.length === 0) return null;
      if (values.some((v) => v === 'Abnormal')) return 'Abnormal';
      if (values.some((v) => v === 'Normal')) return 'Normal';
      return null;
    };

    // =========================
    // Basic derived values
    // =========================
    const dob = str('dob');
    const { year: dobY, month: dobM, day: dobD } = splitDate(dob);
    const ddmmyy = formatDob(dob);

    const { sys: bp_sys, dia: bp_dia } = splitBloodPressure(
      str('bloodPressure', 'blood_pressure')
    );

    const gender = str('gender');
    const isFemale = gender === 'Female';

    const reasonExam = str('reason_exam', 'reasonExam');
    const colorVision = str('color_vision', 'colorVision');
    const xray = str('xray');
    const restrictions = str('restrictions');

    // =========================
    // Physical exam roll-up
    // =========================
    const headStatus = evaluateExam([
      'rs_nasal',
      'al_teeth',
      'al_tongue',
      'ea_meatus',
      'ea_drums',
      'ey_light',
      'ey_accom',
      'ey_nyst',
      'ey_fundi',
    ]);

    const entStatus = evaluateExam([
      'rs_nasal',
      'rs_thyroid',
      'rs_trachea',
      'ea_meatus',
      'ea_drums',
    ]);

    const oralStatus = evaluateExam(['al_teeth', 'al_tongue']);
    const earStatus = evaluateExam(['ea_meatus', 'ea_drums']);
    const tympStatus = evaluateExam(['ea_drums']);
    const eyeStatus = evaluateExam(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const ophStatus = evaluateExam(['ey_fundi']);
    const pupilStatus = evaluateExam(['ey_light', 'ey_accom']);
    const eyemStatus = evaluateExam(['ey_nyst']);
    const lungStatus = evaluateExam(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const breastStatus = null;
    const heartStatus = evaluateExam(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs']);
    const varStatus = evaluateExam(['cv_varicose']);
    const vascStatus = evaluateExam(['cv_varicose', 'cv_bp']);
    const abdStatus = evaluateExam(['al_abd', 'al_liver', 'al_spleen', 'al_lymph']);
    const hernStatus = evaluateExam(['al_hernia']);
    const anusStatus = evaluateExam(['al_anus']);
    const guStatus = evaluateExam(['gu_kidney', 'gu_gen']);
    const extStatus = evaluateExam(['ms_hands', 'ms_limbs', 'ms_inj']);
    const spineStatus = evaluateExam(['ms_back', 'ms_joints']);
    const neuroStatus = evaluateExam(['ns_power', 'ns_tone', 'ns_coord', 'ns_sens', 'ns_intel']);
    const skinStatus = evaluateExam(['in_hair', 'in_skin', 'in_nails']);

    const genAppRaw = str('gen_app', 'genApp');
    const genStatus =
      genAppRaw === 'Abnormal'
        ? 'Abnormal'
        : genAppRaw
          ? 'Normal'
          : null;

    // =========================
    // Final render data
    // Semua key di bawah disamakan dengan placeholder template ILO
    // =========================
    const renderData = {
      // 1. IDENTITAS & PEKERJAAN
      family_name: str('familyName', 'family_name', 'familyname'),
      first_name: str('firstName', 'first_name', 'firstname'),

      day: dobD,
      month: dobM,
      year: dobY,
      pob_city: str('pob_city', 'pobCity'),
      pob_country: str('pob_country', 'pobCountry'),

      g_m: gender === 'Male' ? '☑' : '☐',
      g_f: gender === 'Female' ? '☑' : '☐',

      address: str('address'),
      id_passport: str('idPassport', 'id_passport'),
      type_of_ship: str('typeOfShip', 'type_of_ship'),
      trade_area: str('tradeArea', 'trade_area'),

      pos_mas: str('ilo_position') === 'Master' ? '☑' : '☐',
      pos_dec: str('ilo_position') === 'Deck Officer' ? '☑' : '☐',
      pos_eng: str('ilo_position') === 'Engineering Officer' ? '☑' : '☐',
      pos_rad: ['Radio Officer', 'Radio Operator'].includes(str('ilo_position')) ? '☑' : '☐',
      pos_rat: str('ilo_position') === 'Rating' ? '☑' : '☐',

      // 2. DECLARATION OF AUTHORIZED PHYSICIAN
      disr_unc: str('disr_unc'),
      disl_unc: str('disl_unc'),
      disr_cor: str('disr_cor'),
      disl_cor: str('disl_cor'),

      col_book: str('color_test_type') === 'Book' ? '☑' : '☐',
      col_lant: str('color_test_type') === 'Lantern' ? '☑' : '☐',
      col_y: isY(val('color_y')),
      col_r: isY(val('color_r')),
      col_g: isY(val('color_g')),
      col_b: isY(val('color_b')),

      hear_r: str('hear_r'),
      hear_l: str('hear_l'),

      id_y: isY(val('id_checked')),
      id_n: isN(val('id_checked')),

      hr_stcw_y: isY(val('hr_stcw')),
      hr_stcw_n: isN(val('hr_stcw')),
      hr_stcw_na: str('hr_stcw') === 'NA' ? '☑' : '☐',

      hr_unaid_y: isY(val('hr_unaid')),
      hr_unaid_n: isN(val('hr_unaid')),

      vis_stcw_y: isY(val('vis_stcw')),
      vis_stcw_n: isN(val('vis_stcw')),

      col_stcw_y: isY(val('col_stcw')),
      col_stcw_n: isN(val('col_stcw')),
      date_vt: str('date_vt', 'date'),

      glass_y: isY(val('glasses_nec')),
      glass_n: isN(val('glasses_nec')),

      watch_y: isY(val('watch_able')),
      watch_n: isN(val('watch_able')),

      meds_y: isY(val('q_meds', 'qmeds')),
      meds_n: isN(val('q_meds', 'qmeds')),

      free_y: isY(val('free_cond')),
      free_n: isN(val('free_cond')),

      rest_desc: restrictions === 'Yes' ? str('rest_desc', 'restdesc') : '',

      eps: str('eps'),
      hospital: str('hospital'),
      cert_auth: str('cert_auth', 'certauth'),
      date: str('date'),
      exp_date: str('exp_date', 'expdate'),

      // 3. EXAMINEE PERSONAL DECLARATION
      ddmmyy,
      ddmmyyyy: str('date'),

      i_q1_y: isY(val('mh_eye')),
      i_q1_n: isN(val('mh_eye')),
      i_q2_y: isY(val('mh_hbp')),
      i_q2_n: isN(val('mh_hbp')),
      i_q3_y: isY(val('mh_heart')),
      i_q3_n: isN(val('mh_heart')),
      i_q4_y: isY(val('mhcardiacsurgery')),
      i_q4_n: isN(val('mhcardiacsurgery')),
      i_q5_y: isY(val('mh_varicose')),
      i_q5_n: isN(val('mh_varicose')),
      i_q6_y: isY(val('mh_asthma')),
      i_q6_n: isN(val('mh_asthma')),
      i_q7_y: isY(val('mh_blood')),
      i_q7_n: isN(val('mh_blood')),
      i_q8_y: isY(val('mh_diabetes')),
      i_q8_n: isN(val('mh_diabetes')),
      i_q9_y: isY(val('mh_thyroid')),
      i_q9_n: isN(val('mh_thyroid')),
      i_q10_y: isY(val('mh_digestive')),
      i_q10_n: isN(val('mh_digestive')),
      i_q11_y: isY(val('mh_kidney')),
      i_q11_n: isN(val('mh_kidney')),
      i_q12_y: isY(val('mh_skin')),
      i_q12_n: isN(val('mh_skin')),
      i_q13_y: isY(val('mh_allergy_med')),
      i_q13_n: isN(val('mh_allergy_med')),
      i_q14_y: isY(val('mh_infectious')),
      i_q14_n: isN(val('mh_infectious')),
      i_q15_y: isY(val('mh_hernia')),
      i_q15_n: isN(val('mh_hernia')),
      i_q16_y: isY(val('mh_genital')),
      i_q16_n: isN(val('mh_genital')),

      i_q17_y: isFemale ? isY(val('mhpregnancy')) : '☐',
      i_q17_n: isFemale ? isN(val('mhpregnancy')) : '☐',

      i_q18_y: isY(val('mhsleep')),
      i_q18_n: isN(val('mhsleep')),
      i_q19_y: isY(val('q_smoke', 'qsmoke')),
      i_q19_n: isN(val('q_smoke', 'qsmoke')),
      i_q20_y: isY(val('mhsurgery')),
      i_q20_n: isN(val('mhsurgery')),
      i_q21_y: isY(val('mh_epilepsy')),
      i_q21_n: isN(val('mh_epilepsy')),
      i_q22_y: isY(val('mhfainting')),
      i_q22_n: isN(val('mhfainting')),
      i_q23_y: isY(val('mh_loss_consc')),
      i_q23_n: isN(val('mh_loss_consc')),
      i_q24_y: isY(val('mh_psychiatric')),
      i_q24_n: isN(val('mh_psychiatric')),
      i_q25_y: isY(val('mh_depression')),
      i_q25_n: isN(val('mh_depression')),
      i_q26_y: isY(val('mh_suicide')),
      i_q26_n: isN(val('mh_suicide')),
      i_q27_y: isY(val('mh_memory')),
      i_q27_n: isN(val('mh_memory')),
      i_q28_y: isY(val('mh_balance')),
      i_q28_n: isN(val('mh_balance')),
      i_q29_y: isY(val('mh_headache')),
      i_q29_n: isN(val('mh_headache')),
      i_q30_y: isY(val('mh_ear')),
      i_q30_n: isN(val('mh_ear')),
      i_q31_y: isY(val('mh_mobility')),
      i_q31_n: isN(val('mh_mobility')),
      i_q32_y: isY(val('mh_back')),
      i_q32_n: isN(val('mh_back')),
      i_q33_y: isY(val('mh_amputation')),
      i_q33_n: isN(val('mh_amputation')),
      i_q34_y: isY(val('mh_accident')),
      i_q34_n: isN(val('mh_accident')),

      i_q35_y: isY(val('q_medevac', 'qmedevac')),
      i_q35_n: isN(val('q_medevac', 'qmedevac')),
      i_q36_y: isY(val('q_illness', 'qillness')),
      i_q36_n: isN(val('q_illness', 'qillness')),
      i_q37_y: isY(val('q_omfc', 'qomfc')),
      i_q37_n: isN(val('q_omfc', 'qomfc')),
      i_q38_y: isY(val('q_cert_revoked', 'qcertrevoked')),
      i_q38_n: isN(val('q_cert_revoked', 'qcertrevoked')),
      i_q39_y: isY(val('q_aware_medical', 'qawaremedical')),
      i_q39_n: isN(val('q_aware_medical', 'qawaremedical')),
      i_q40_y: isY(val('q_fit', 'qfit')),
      i_q40_n: isN(val('q_fit', 'qfit')),
      i_q41_y: isY(val('mh_allergy_med')),
      i_q41_n: isN(val('mh_allergy_med')),
      i_q42_y: isY(val('q_meds', 'qmeds')),
      i_q42_n: isN(val('q_meds', 'qmeds')),

      epd_comments: str('comments', 'epd_comments'),
      meds_text: str('q_meds_text', 'qmedstext'),

      // 4. MEDICAL EXAMINATION
      me_psea: reasonExam === 'Pre-Employment' ? '☑' : '☐',
      me_periodic: reasonExam === 'Periodic' ? '☑' : '☐',
      me_other: reasonExam === 'Other' ? '☑' : '☐',

      bv_unc: str('bv_unc'),
      bv_cor: str('bv_cor'),
      nearr_unc: str('nearr_unc'),
      nearl_unc: str('nearl_unc'),
      near_bv_unc: str('near_bv_unc'),
      nearr_cor: str('nearr_cor'),
      nearl_cor: str('nearl_cor'),
      near_bv_cor: str('near_bv_cor'),

      vf_r_n: isExN(eyeStatus),
      vf_r_d: isExA(eyeStatus),
      vf_l_n: isExN(eyeStatus),
      vf_l_d: isExA(eyeStatus),

      cv_n: colorVision === 'Normal' ? '☑' : '☐',
      cv_db: '☐',
      cv_df: ['Partial', 'Total'].includes(colorVision) ? '☑' : '☐',

      r05: str('r05'),
      r1: str('r1'),
      r2: str('r2'),
      r3: str('r3'),
      r4: str('r4'),
      r6: str('r6'),
      r8: str('r8'),

      l05: str('l05'),
      l1: str('l1'),
      l2: str('l2'),
      l3: str('l3'),
      l4: str('l4'),
      l6: str('l6'),
      l8: str('l8'),

      sw_r_n: str('hear_r') === 'Normal' ? '☑' : '☐',
      sw_r_w: str('hear_r') === 'Abnormal' ? '☑' : '☐',
      sw_l_n: str('hear_l') === 'Normal' ? '☑' : '☐',
      sw_l_w: str('hear_l') === 'Abnormal' ? '☑' : '☐',

      h: str('height'),
      w: str('weight'),
      p: str('pulse'),
      rhyt: str('rhyt'),
      bp_sys,
      bp_dia,

      ur_sugar: str('ur_sugar'),
      albumin: str('albumin'),

      head_n: isExN(headStatus),
      head_a: isExA(headStatus),

      ent_n: isExN(entStatus),
      ent_a: isExA(entStatus),

      oral_n: isExN(oralStatus),
      oral_a: isExA(oralStatus),

      ear_n: isExN(earStatus),
      ear_a: isExA(earStatus),

      tymp_n: isExN(tympStatus),
      tymp_a: isExA(tympStatus),

      eye_n: isExN(eyeStatus),
      eye_a: isExA(eyeStatus),

      oph_n: isExN(ophStatus),
      oph_a: isExA(ophStatus),

      pupil_n: isExN(pupilStatus),
      pupil_a: isExA(pupilStatus),

      eyem_n: isExN(eyemStatus),
      eyem_a: isExA(eyemStatus),

      lung_n: isExN(lungStatus),
      lung_a: isExA(lungStatus),

      breast_n: isExN(breastStatus),
      breast_a: isExA(breastStatus),

      heart_n: isExN(heartStatus),
      heart_a: isExA(heartStatus),

      var_n: isExN(varStatus),
      var_a: isExA(varStatus),

      vasc_n: isExN(vascStatus),
      vasc_a: isExA(vascStatus),

      abd_n: isExN(abdStatus),
      abd_a: isExA(abdStatus),

      hern_n: isExN(hernStatus),
      hern_a: isExA(hernStatus),

      anus_n: isExN(anusStatus),
      anus_a: isExA(anusStatus),

      gu_n: isExN(guStatus),
      gu_a: isExA(guStatus),

      ext_n: isExN(extStatus),
      ext_a: isExA(extStatus),

      spine_n: isExN(spineStatus),
      spine_a: isExA(spineStatus),

      neuro_n: isExN(neuroStatus),
      neuro_a: isExA(neuroStatus),

      psych_n: str('mh_psychiatric') === 'No' ? '☑' : '☐',
      psych_a: str('mh_psychiatric') === 'Yes' ? '☑' : '☐',

      gen_n: isExN(genStatus),
      gen_a: isExA(genStatus),

      skin_n: isExN(skinStatus),
      skin_a: isExA(skinStatus),

      xray_np: !xray ? '☑' : '☐',
      xray_n: xray === 'Normal' ? '☑' : '☐',
      xray_a: xray === 'Abnormal' ? '☑' : '☐',
      date_xray: str('date_xray', 'date'),
      xray_res: str('des_abnor'),

      lab_hb: str('lab_hb'),
      lab_sr: str('lab_sr'),

      hbab_p: str('hep_b_ab') === 'Positive' ? '☑' : '☐',
      hbab_n: str('hep_b_ab') === 'Negative' ? '☑' : '☐',
      hbag_p: str('hep_b_ag') === 'Positive' ? '☑' : '☐',
      hbag_n: str('hep_b_ag') === 'Negative' ? '☑' : '☐',

      bs_np: str('stool_bact') === 'Not Performed' || !str('stool_bact') ? '☑' : '☐',
      bs_neg: str('stool_bact') === 'Negative' ? '☑' : '☐',
      bs_pos: str('stool_bact') === 'Positive' ? '☑' : '☐',

      ps_np: str('stool_para') === 'Not Performed' || !str('stool_para') ? '☑' : '☐',
      ps_neg: str('stool_para') === 'Negative' ? '☑' : '☐',
      ps_pos: str('stool_para') === 'Positive' ? '☑' : '☐',

      diag: str('diag'),
      hiv_res: str('hiv_res'),
      comments: str('comments'),

      vac_sat: str('vaccinated') === 'Yes' ? '☑' : '☐',
      vac_ren: str('vaccinated') === 'No' ? '☑' : '☐',
      vac_details: str('vac_details'),

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

      rest_no: restrictions === 'No' ? '☑' : '☐',
      rest_yes: restrictions === 'Yes' ? '☑' : '☐',
      action_taken: str('action_taken'),
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
        'Content-Disposition': 'attachment; filename="ILO_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating ILO document:', error);

    return NextResponse.json(
      {
        error: error?.message || 'Terjadi kesalahan internal backend saat generate ILO.',
      },
      { status: 500 }
    );
  }
}