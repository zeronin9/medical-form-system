import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '4. QatarEnergy LNG Medical Department.docx';
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

    const val = (...keys: string[]) => {
      for (const key of keys) {
        const v = formData[key];
        if (v !== undefined && v !== null) return v;
      }
      return '';
    };

    const str = (...keys: string[]) => {
      const v = val(...keys);
      return v === undefined || v === null ? '' : String(v).trim();
    };

    const yes = (v: any) => String(v).trim() === 'Yes' || v === true;
    const no = (v: any) => String(v).trim() === 'No' || v === false;
    const notSure = (v: any) => String(v).trim() === 'Not Sure';

    const isY = (v: any) => (yes(v) ? '☑' : '☐');
    const isN = (v: any) => (no(v) ? '☑' : '☐');
    const isNS = (v: any) => (notSure(v) ? '☑' : '☐');

    const isChecked = (cond: boolean) => (cond ? '☑' : '☐');
    const isUnchecked = (cond: boolean) => (cond ? '☐' : '☑');

    const hasMeaningfulValue = (v: any) =>
      v !== undefined &&
      v !== null &&
      String(v).trim() !== '' &&
      String(v).trim().toLowerCase() !== 'normal' &&
      String(v).trim().toLowerCase() !== 'negative' &&
      String(v).trim().toLowerCase() !== 'non reactive' &&
      String(v).trim().toLowerCase() !== 'non-reactive' &&
      String(v).trim().toLowerCase() !== 'not detected';

    const isAbnormalText = (v: any) => {
      const s = String(v || '').trim().toLowerCase();
      return (
        s === 'abnormal' ||
        s === 'positive' ||
        s === 'reactive' ||
        s === 'partial' ||
        s === 'total'
      );
    };

    const isLabN = (v: any) => {
      const s = String(v || '').trim();
      if (!s) return '☐';
      return isAbnormalText(s) ? '☐' : '☑';
    };

    const isLabA = (v: any) => {
      const s = String(v || '').trim();
      if (!s) return '☐';
      return isAbnormalText(s) ? '☑' : '☐';
    };

    const yesNoPair = (v: any) => ({
      y: isY(v),
      n: isN(v),
    });

    const formatDobQatar = (dob: string) => {
      if (!dob || !dob.includes('-')) return '';
      const parts = dob.split('-');
      if (parts.length !== 3) return '';
      const [yyyy, mm, dd] = parts;
      return `${dd}/${mm}/${yyyy.slice(-2)}`;
    };

    const joinRemarks = (...items: any[]) =>
      items
        .map((x) => String(x || '').trim())
        .filter(Boolean)
        .join('. ');

    const checkAbnormal = (fields: string[]) =>
      fields.some((field) => {
        const v = formData[field];
        return String(v || '').trim() === 'Abnormal';
      });

    const labSummary = (pairs: Array<[string, any]>) =>
      pairs
        .filter(([, v]) => String(v || '').trim() !== '')
        .map(([label, v]) => `${label}: ${String(v).trim()}`)
        .join('; ');

    const isFemale = str('gender') === 'Female';
    const dobFormatted = formatDobQatar(str('dob'));

    const eyeAbn = checkAbnormal(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const entAbn = checkAbnormal(['rs_nasal', 'rs_thyroid', 'rs_trachea', 'ea_meatus', 'ea_drums']);
    const oralAbn = checkAbnormal(['al_teeth', 'al_tongue']);
    const chestAbn = checkAbnormal(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const cardioAbn = checkAbnormal(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs']);
    const abdAbn = checkAbnormal(['al_abd', 'al_liver', 'al_spleen', 'al_lymph']);
    const hernAbn = checkAbnormal(['al_hernia']);
    const anusAbn = checkAbnormal(['al_anus']);
    const guAbn = checkAbnormal(['gu_kidney', 'gu_gen']);
    const extAbn = checkAbnormal(['ms_hands', 'ms_limbs', 'ms_inj']);
    const muscAbn = checkAbnormal(['ms_back', 'ms_joints']);
    const skinAbn = checkAbnormal(['in_hair', 'in_skin', 'in_nails']);
    const varAbn = checkAbnormal(['cv_varicose']);
    const cnsAbn = checkAbnormal(['ns_power', 'ns_tone', 'ns_coord', 'ns_sens', 'ns_intel']);

    const totalCholSummary = labSummary([
      ['Chol', str('val_chol')],
      ['HDL', str('val_hdl')],
      ['LDL', str('val_ldl')],
      ['Trig', str('val_trig')],
    ]);

    const lftSummary = labSummary([
      ['SGOT/AST', str('val_sgot')],
      ['SGPT/ALT', str('val_sgpt')],
      ['Bilirubin', str('val_bili')],
      ['GGT', str('val_ggt')],
    ]);

    const rftSummary = labSummary([
      ['Urea/BUN', str('val_bun')],
      ['Creatinine', str('val_creat')],
      ['Uric Acid', str('val_urig')],
    ]);

    const urinalysisSummary = labSummary([
      ['Albumin', str('albumin')],
      ['Sugar', str('ur_sugar')],
      ['Blood', str('urin_b')],
      ['WBC', str('wbc')],
      ['RBC', str('rbc')],
      ['Casts', str('casts')],
      ['Others', str('ur_others')],
    ]);

    const infectiousSummary = labSummary([
      ['HBsAg', str('hep_b_ag')],
      ['HCV Ab', str('hep_c')],
      ['HIV Ab', str('hiv_res')],
      ['VDRL', str('vdrl_res')],
    ]);

    const foodHandlerSummary = labSummary([
      ['Stool Bacteria', str('stool_bact')],
      ['Stool Parasite', str('stool_para')],
      ['Others', str('only_cg')],
      ['Abnormal Findings', str('detail_af')],
    ]);

    const xrayRemark = joinRemarks(str('des_abnor'), str('date_xray'));

    const cbcRemark = labSummary([
      ['Hb', str('lab_hb')],
      ['Hct', str('lab_hct')],
      ['WBC', str('lab_wbc')],
      ['Platelet', str('lab_platelet')],
    ]);

    const spirometryRemark = labSummary([
      ['FVC', str('ft_fvc')],
      ['Pred FVC', str('pre_fvc')],
      ['FEV1', str('ft_fev1')],
      ['Pred FEV1', str('pre_fev1')],
      ['FEV1/FVC', str('ev1_vc')],
    ]);

    const fbgVal = str('val_sugar');
    const cbcVal = cbcRemark;
    const tchoVal = totalCholSummary;
    const lftVal = lftSummary;
    const rftVal = rftSummary;
    const urinVal = urinalysisSummary;
    const audiVal = str('oht_result');
    const spirVal = spirometryRemark;
    const ecgVal = str('diag');
    const xrayVal = xrayRemark;
    const idtVal = infectiousSummary;
    const ffhVal = foodHandlerSummary;

    const labNormalAbnormal = (text: string) => ({
      n: text ? (/[Pp]ositive|[Rr]eactive|[Aa]bnormal|[Pp]artial|[Tt]otal/.test(text) ? '☐' : '☑') : '☐',
      a: text ? (/[Pp]ositive|[Rr]eactive|[Aa]bnormal|[Pp]artial|[Tt]otal/.test(text) ? '☑' : '☐') : '☐',
      r: text || '',
    });

    const fbg = labNormalAbnormal(fbgVal);
    const cbc = labNormalAbnormal(cbcVal);
    const tcho = labNormalAbnormal(tchoVal);
    const lft = labNormalAbnormal(lftVal);
    const rft = labNormalAbnormal(rftVal);
    const urin = labNormalAbnormal(urinVal);
    const audi = labNormalAbnormal(audiVal);
    const spir = labNormalAbnormal(spirVal);
    const ecg = labNormalAbnormal(ecgVal);
    const idt = labNormalAbnormal(idtVal);
    const ffh = labNormalAbnormal(ffhVal);

    doc.render({
      // 1. Identitas
      first_name: str('firstName', 'first_name'),
      family_name: str('familyName', 'family_name'),
      ddmmyy: dobFormatted,
      id_passport: str('idPassport', 'id_passport'),
      nationality: str('nationality'),
      g_m: str('gender') === 'Male' ? '☑' : '☐',
      g_f: isFemale ? '☑' : '☐',
      position: str('position', 'ilo_position'),
      work_location: str('workLocation', 'work_location'),
      department: str('department'),
      company: str('company'),
      contact_number: str('contactNumber', 'contact_number'),
      address: str('address'),

      // Nature of work
      nw_confined: isY(val('nw_confined')),
      dvg: isY(val('nw_diving')),
      hanging: isY(val('nw_hanging')),
      sew_d: isY(val('nw_sewage')),
      nw_height: isY(val('nw_height')),
      s_r: isY(val('nw_swing')),
      emer_r: isY(val('nw_emergency')),
      food_h: isY(val('nw_food')),
      o_h_e: isY(val('nw_heavy')),
      o_w: isY(val('nw_office')),
      l_r: isY(val('nw_radiation')),
      othersy: str('nw_others') ? '☑' : '☐',
      others_ifyes: str('nw_others'),

      // Vaccination
      v_hepa_y: isY(val('vac_hepa')), v_hepa_n: isN(val('vac_hepa')), v_hepa_s: isNS(val('vac_hepa')),
      v_hepb_y: isY(val('vac_hepb')), v_hepb_n: isN(val('vac_hepb')), v_hepb_s: isNS(val('vac_hepb')),
      c19_y: isY(val('vac_c19')), c19_n: isN(val('vac_c19')), c19_s: isNS(val('vac_c19')),
      tet_y: isY(val('vac_tet')), tet_n: isN(val('vac_tet')), tet_s: isNS(val('vac_tet')),
      mea_y: isY(val('vac_mea')), mea_n: isN(val('vac_mea')), mea_s: isNS(val('vac_mea')),
      chick_y: isY(val('vac_chick')), chick_n: isN(val('vac_chick')), chick_s: isNS(val('vac_chick')),
      typh_y: isY(val('vac_typh')), typh_n: isN(val('vac_typh')), typh_s: isNS(val('vac_typh')),

      // Medical history
      mh_blood_y: isY(val('mh_blood')), mh_blood_n: isN(val('mh_blood')),
      cns_y: isY(val('mh_cns')), cns_n: isN(val('mh_cns')),
      c_asma_y: isY(val('mh_asthma')), c_asma_n: isN(val('mh_asthma')),
      p_ulc_y: isY(val('mh_ulcer')), p_ulc_n: isN(val('mh_ulcer')),
      h_dis_y: isY(val('mh_heart')), h_dis_n: isN(val('mh_heart')),
      std_y: isY(val('mh_std')), std_n: isN(val('mh_std')),
      epil_y: isY(val('mh_epilepsy')), epil_n: isN(val('mh_epilepsy')),
      mh_hbp_y: isY(val('mh_hbp')), mh_hbp_n: isN(val('mh_hbp')),
      hep_y: isY(val('mh_hep')), hep_n: isN(val('mh_hep')),
      work_y: isY(val('mh_accident')), work_n: isN(val('mh_accident')),
      mh_dia_y: isY(val('mh_diabetes')), mh_dia_n: isN(val('mh_diabetes')),
      m_sur_y: isY(val('mh_surgery')), m_sur_n: isN(val('mh_surgery')),
      ears_y: isY(val('mh_ear')), ears_n: isN(val('mh_ear')),
      k_b_t_y: isY(val('mh_kidney')), k_b_t_n: isN(val('mh_kidney')),
      cancer_y: isY(val('mh_cancer')), cancer_n: isN(val('mh_cancer')),
      r_head_y: isY(val('mh_headache')), r_head_n: isN(val('mh_headache')),
      r_art_y: isY(val('mh_rheumatism')), r_art_n: isN(val('mh_rheumatism')),
      drug_a_y: isY(val('mh_drug')), drug_a_n: isN(val('mh_drug')),
      r_a_p_y: isY(val('mh_abd_pain')), r_a_p_n: isN(val('mh_abd_pain')),
      f_lc_y: isY(val('mh_fainting')), f_lc_n: isN(val('mh_fainting')),
      t_dis_y: isY(val('mh_thyroid')), t_dis_n: isN(val('mh_thyroid')),
      s_dis_y: isY(val('mh_skin')), s_dis_n: isN(val('mh_skin')),
      v_dis_y: isY(val('mh_vascular')), v_dis_n: isN(val('mh_vascular')),
      c_preg_y: isFemale && parseInt(str('f_preg_no') || '0', 10) > 0 ? '☑' : '☐',
      c_preg_n: !isFemale || parseInt(str('f_preg_no') || '0', 10) === 0 ? '☑' : '☐',
      m_skel_y: isY(val('mh_musculo')), m_skel_n: isN(val('mh_musculo')),
      eye_con_y: isY(val('mh_eye')), eye_con_n: isN(val('mh_eye')),
      h_adm_y: isY(val('q_illness')), h_adm_n: isN(val('q_illness')),
      m_ill_y: isY(val('mh_mental')), m_ill_n: isN(val('mh_mental')),
      others_mh: str('mh_others'),

      // Family history
      dia_y: isY(val('fm_diabetes')), dia_n: isN(val('fm_diabetes')),
      fm_h_dis_y: isY(val('fm_heart')), fm_h_dis_n: isN(val('fm_heart')),
      hyp_y: isY(val('fm_hypertension')), hyp_n: isN(val('fm_hypertension')),
      ast_y: isY(val('fm_asthma')), ast_n: isN(val('fm_asthma')),
      fmepil_y: isY(val('fm_epilepsy')), fmepil_n: isN(val('fm_epilepsy')),
      can_t_y: isY(val('fm_cancer')), can_t_n: isN(val('fm_cancer')),
      others_fm: str('fm_others'),

      // General questions
      illness_y: isY(val('q_illness')), illness_n: isN(val('q_illness')),
      medev_why: str('q_medevac_text'),
      medev_y: isY(val('q_medevac')), medev_n: isN(val('q_medevac')),
      curren_ifyes: str('q_meds_text'),
      curren_y: isY(val('q_meds')), curren_n: isN(val('q_meds')),
      q_smoke_text: yes(val('q_smoke')) ? str('q_smoke_text') : '',
      hl_hf: yes(val('q_smoke')) ? str('q_smoke_freq') : '',
      q_smoke_y: isY(val('q_smoke')), q_smoke_n: isN(val('q_smoke')),
      answer_ifyes: str('q_alcohol_text'),
      alc_y: isY(val('q_alcohol')), alc_n: isN(val('q_alcohol')),
      fit_y: isY(val('q_fit')), fit_n: isN(val('q_fit')),
      fear_y: isY(val('q_fear')), fear_n: isN(val('q_fear')),
      stress_y: isY(val('q_stress')), stress_n: isN(val('q_stress')),
      score: str('q_stress_score'),
      strfull_y: isY(val('q_stressful')), strfull_n: isN(val('q_stressful')),
      omfc_ifyes: str('q_omfc_text'),
      qmfc_y: isY(val('q_omfc')), qmfc_n: isN(val('q_omfc')),
      date: str('date'),

      // Physical examination
      eyes_n: isUnchecked(eyeAbn), eyes_a: isChecked(eyeAbn), eyes_r: str('ey_comm'),
      ent_n: isUnchecked(entAbn), ent_a: isChecked(entAbn), ent_r: joinRemarks(str('rs_comm'), str('ea_comm')),
      oral_c_n: isUnchecked(oralAbn), oral_c_a: isChecked(oralAbn), oral_c_r: str('al_comm'),
      chest_n: isUnchecked(chestAbn), chest_a: isChecked(chestAbn), chest_r: str('rs_comm'),
      cardio_n: isUnchecked(cardioAbn), cardio_a: isChecked(cardioAbn), cardio_r: str('cv_comm'),
      abdom_n: isUnchecked(abdAbn), abdom_a: isChecked(abdAbn), abdom_r: str('al_comm'),
      her_or_n: isUnchecked(hernAbn), her_or_a: isChecked(hernAbn), her_or_r: str('al_comm'),
      anus_r_n: isUnchecked(anusAbn), anus_r_a: isChecked(anusAbn), anus_r_r: str('al_comm'),
      genito_n: isUnchecked(guAbn), genito_a: isChecked(guAbn), genito_r: str('gu_comm'),
      extrem_n: isUnchecked(extAbn), extrem_a: isChecked(extAbn), extrem_r: str('ms_comm'),
      musculo_n: isUnchecked(muscAbn), musculo_a: isChecked(muscAbn), musculo_r: str('ms_comm'),
      skin_n: isUnchecked(skinAbn), skin_a: isChecked(skinAbn), skin_r: str('in_comm'),
      vas_s_n: isUnchecked(varAbn), vas_s_a: isChecked(varAbn), vas_s_r: str('cv_comm'),
      c_n_s_n: isUnchecked(cnsAbn), c_n_s_a: isChecked(cnsAbn), c_n_s_r: str('ns_comm'),

      // Laboratory reports
      fbg_n: fbg.n, fbg_a: fbg.a, fbg_r: fbg.r,
      cbc_n: cbc.n, cbc_a: cbc.a, cbc_r: cbc.r,
      tcho_n: tcho.n, tcho_a: tcho.a, tcho_r: tcho.r,
      lft_n: lft.n, lft_a: lft.a, lft_r: lft.r,
      rft_n: rft.n, rft_a: rft.a, rft_r: rft.r,
      urin_n: urin.n, urin_a: urin.a, urin_r: urin.r,
      audi_n: audi.n, audi_a: audi.a, audi_r: audi.r,
      spir_n: spir.n, spir_a: spir.a, spir_r: spir.r,
      ecg_n: ecg.n, ecg_a: ecg.a, ecg_r: ecg.r,
      xrey_n: str('xray') === 'Normal' ? '☑' : '☐',
      xrey_a: str('xray') === 'Abnormal' ? '☑' : '☐',
      xrey_r: xrayVal,
      idt_n: idt.n, idt_a: idt.a, idt_r: idt.r,
      hha1_n: isLabN(str('hba1c') || str('ppbs_2hr')),
      hha1_a: isLabA(str('hba1c') || str('ppbs_2hr')),
      hha1_r: labSummary([
        ['HbA1c', str('hba1c')],
        ['2hPPBS', str('ppbs_2hr')],
      ]),
      ffh_n: ffh.n, ffh_a: ffh.a, ffh_r: ffh.r,

      // Biometrics
      h: str('height'),
      w: str('weight'),
      weist: str('waist'),
      bmi: str('bmi'),
      p: str('pulse'),
      b_p: str('bloodPressure', 'blood_pressure'),

      disr_unc: str('disr_unc') || '-',
      disl_unc: str('disl_unc') || '-',
      nearr_unc: str('nearr_unc') || '-',
      nearl_unc: str('nearl_unc') || '-',
      bv_unc: str('bv_unc') || '-',

      disr_cor: str('disr_cor') || '-',
      disl_cor: str('disl_cor') || '-',
      nearr_cor: str('nearr_cor') || '-',
      nearl_cor: str('nearl_cor') || '-',
      bv_cor: str('bv_cor') || '-',

      cv_nor: str('color_vision') === 'Normal' ? '☑' : '☐',
      cv_pcb: str('color_vision') === 'Partial' ? '☑' : '☐',
      cv_tcb: str('color_vision') === 'Total' ? '☑' : '☐',

      bg_type: str('bloodGroupType', 'bg_type'),
      bg_rh: str('bloodGroupRh', 'bg_rh'),
    });

    const buf = doc.getZip().generate({
      type: 'uint8array',
      compression: 'DEFLATE',
    });

    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="QatarEnergy_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan internal backend.' },
      { status: 500 }
    );
  }
}