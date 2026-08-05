import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '5. Chevron Medical Form.docx';
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

    const charChecked = '☑';
    const charUnchecked = '☐';

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

    const isFilled = (v: any) => v !== undefined && v !== null && String(v).trim() !== '';

    const isY = (v: any) =>
      String(v).trim() === 'Yes' || v === true ? charChecked : charUnchecked;

    const isN = (v: any) =>
      String(v).trim() === 'No' || v === false ? charChecked : charUnchecked;

    const formatDateDDMMYYYY = (dateStr: string) => {
      if (!dateStr || !dateStr.includes('-')) return dateStr || '';
      const [yyyy, mm, dd] = dateStr.split('-');
      if (!yyyy || !mm || !dd) return dateStr || '';
      return `${dd}/${mm}/${yyyy}`;
    };

    const formatDateDDMMYY = (dateStr: string) => {
      if (!dateStr || !dateStr.includes('-')) return dateStr || '';
      const [yyyy, mm, dd] = dateStr.split('-');
      if (!yyyy || !mm || !dd) return dateStr || '';
      return `${dd}/${mm}/${yyyy.slice(-2)}`;
    };

    const joinRemarks = (...items: any[]) =>
      items
        .map((x) => String(x || '').trim())
        .filter(Boolean)
        .join('. ');

    const evaluateQ = (
      fields: string[],
      conditionFn: (val: any) => boolean = (val) => val === 'Yes'
    ) => {
      if (fields.length === 0) return null;
      if (fields.every((f) => !isFilled(formData[f]))) return null;
      if (fields.some((f) => conditionFn(formData[f]))) return 'Yes';
      return 'No';
    };

    const cq = (v: string | null) => ({
      y: v === 'Yes' ? charChecked : charUnchecked,
      n: v === 'No' ? charChecked : charUnchecked,
    });

    const getExamCategoryStatus = (fields: string[]) => {
      if (fields.every((f) => !isFilled(formData[f]))) return null;
      if (fields.some((f) => String(formData[f]).trim() === 'Abnormal')) return 'Abnormal';
      if (fields.some((f) => String(formData[f]).trim() === 'Normal')) return 'Normal';
      return null;
    };

    const checkEx = (status: string | null) => ({
      n: status === 'Normal' ? charChecked : charUnchecked,
      a: status === 'Abnormal' ? charChecked : charUnchecked,
    });

    const dobRaw = str('dob');
    const dobShort = formatDateDDMMYY(dobRaw);
    const dobLong = formatDateDDMMYYYY(dobRaw);
    const serviceDate = formatDateDDMMYYYY(str('serviceDate'));
    const examDate = formatDateDDMMYYYY(str('date'));
    const xrayDate = formatDateDDMMYYYY(str('date_xray'));

    const fullName = [
      str('firstName'),
      str('middleName'),
      str('familyName'),
    ]
      .filter(Boolean)
      .join(' ');

    const eyes_status = getExamCategoryStatus(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const ears_status = getExamCategoryStatus(['ea_meatus', 'ea_drums']);
    const nose_status = getExamCategoryStatus(['rs_nasal']);
    const throat_status = getExamCategoryStatus(['al_tongue']);
    const dental_status = getExamCategoryStatus(['al_teeth']);
    const neck_status = getExamCategoryStatus(['rs_thyroid', 'rs_trachea']);
    const lung_status = getExamCategoryStatus(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const heart_status = getExamCategoryStatus(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs', 'cv_varicose']);
    const abdomen_status = getExamCategoryStatus(['al_abd', 'al_liver', 'al_spleen']);
    const hernia_status = getExamCategoryStatus(['al_hernia']);
    const genitalia_status = getExamCategoryStatus(['gu_gen']);
    const rectal_status = getExamCategoryStatus(['al_anus']);
    const lymph_status = getExamCategoryStatus(['al_lymph']);
    const skin_status = getExamCategoryStatus(['in_hair', 'in_skin', 'in_nails']);
    const muscul_status = getExamCategoryStatus(['ms_hands', 'ms_limbs', 'ms_back', 'ms_joints', 'ms_inj']);
    const reflex_status = getExamCategoryStatus(['ns_power', 'ns_tone', 'ns_coord', 'ns_sens', 'ns_intel']);

    const q1 = evaluateQ(['mh_fainting', 'mh_epilepsy']);
    const q2 = evaluateQ(['mh_headache']);
    const q3 = evaluateQ(['mh_anxiety', 'fm_mental']);
    const q4 = evaluateQ(['mh_allergy_med', 'rs_nasal'], (v) => v === 'Yes' || v === 'Abnormal');
    const q5 = evaluateQ(['al_tongue'], (v) => v === 'Abnormal');
    const q6 = evaluateQ(['mh_ear', 'mh_ear2', 'mh_tinnitus']);
    const q7 = evaluateQ(['mh_thyroid', 'rs_thyroid'], (v) => v === 'Yes' || v === 'Abnormal');
    const q8 = evaluateQ(['mh_hbp']);
    const q9 = evaluateQ(['mh_heart', 'mh_angina']);
    const q10 = evaluateQ(['mh_asthma', 'mh_bronchitis']);
    const q11 = evaluateQ(['mh_tb']);
    const q12 = evaluateQ(['mh_ulcer']);
    const q13 = evaluateQ(['mh_hep', 'al_liver'], (v) => v === 'Yes' || v === 'Abnormal');
    const q14 = evaluateQ(['mh_diarrhea', 'mh_bowel']);
    const q15 = evaluateQ(['mh_piles']);
    const q16 = evaluateQ(['mh_kidney', 'mh_kidney_stone']);
    const q17 = evaluateQ(['ur_sugar', 'albumin', 'urin_b'], (v) => v === 'Positive');
    const q18 = evaluateQ(['vdrl_res', 'hiv_res'], (v) => v === 'Reactive' || v === 'Positive');
    const q19 = evaluateQ(['mh_diabetes']);
    const q20 = null;
    const q21 = evaluateQ(['mh_rheumatism', 'cv_varicose'], (v) => v === 'Yes' || v === 'Abnormal');
    const q22 = evaluateQ(['mh_accident']);
    const q23 = evaluateQ(['mh_musculo', 'ms_back'], (v) => v === 'Yes' || v === 'Abnormal');
    const q24 = evaluateQ(['mh_skin', 'mh_eczema']);
    const q25 = evaluateQ(['fm_cancer']);
    const q26 = evaluateQ(['date_xray', 'des_abnor'], (v) => isFilled(v));
    const q27 = evaluateQ(['nearr_cor', 'nearl_cor', 'disr_cor', 'disl_cor'], (v) => isFilled(v));
    const q28 = evaluateQ(['mh_eye', 'mh_eye2']);
    const q29 = evaluateQ(['q_illness', 'mh_surgery']);
    const q30 = evaluateQ(['q_illness'], (v) => v === 'Yes');
    const q31 = evaluateQ(['q_meds']);
    const q32 = evaluateQ(['mh_allergy_med']);
    const q33 = evaluateQ(['mh_others'], (v) => isFilled(v));
    const q34 = evaluateQ(['exp_compensation']);
    const q35 = evaluateQ(['exp_disable']);
    const q36 = evaluateQ(['q_illness']);
    const q37 = evaluateQ(['q_omfc']);
    const q38 = evaluateQ(['mh_accident']);
    const q39 = evaluateQ(['exp_radiation']);
    const q40 = evaluateQ(['exp_heavy_metals', 'exp_chemicals']);
    const q41 = evaluateQ(['exp_dust']);
    const q42 = evaluateQ(['exp_chemicals']);
    const q43 = evaluateQ(['exp_skin_infections']);
    const q44 = evaluateQ(['f_preg_no'], (v) => isFilled(v) && parseInt(String(v), 10) > 0);

    const smokingQuit = str('smoker_q');
    const smokingQuitYes = smokingQuit === 'Yes' || smokingQuit === 'true' || smokingQuit === 'True';

    const detailAbnormalFindings = joinRemarks(
      str('cv_comm'),
      str('rs_comm'),
      str('al_comm'),
      str('gu_comm'),
      str('in_comm'),
      str('ms_comm'),
      str('ns_comm'),
      str('ea_comm'),
      str('ey_comm'),
      str('des_abnor'),
      str('detail_af')
    );

    doc.render({
      // SECTION I
      name: fullName,
      employer: str('company'),
      address: str('address'),
      id_passport: str('idPassport', 'id_passport'),
      ddmmyy: dobShort,
      gr: str('gender'),
      med_no: str('medNo', 'med_no'),
      position: str('position', 'ilo_position'),
      work_location: str('workLocation', 'work_location'),

      // HEALTH EXAMINATION SUMMARY HEADER
      emp_id: str('idPassport', 'id_passport'),
      ddmmyyyy: dobLong,
      service_date: serviceDate,
      job_title: str('position', 'ilo_position'),
      location: str('workLocation', 'work_location'),
      company: str('company'),
      personal_id: str('idPassport', 'id_passport'),

      // Lifestyle
      alcohol_w: str('q_alcohol_text') || (str('q_alcohol') === 'Yes' ? 'Yes' : '0'),
      n_smoker: isN(val('q_smoke')),
      smoker: isY(val('q_smoke')),
      smoker_y: str('smoker_y'),
      smoker_d: str('smoker_d'),
      smoker_q: smokingQuitYes ? charChecked : charUnchecked,
      smoker_q_y: str('smoker_q_y', 'smoker_s_y'),

      // Questionnaire
      c_q1_y: cq(q1).y, c_q1_n: cq(q1).n,
      c_q2_y: cq(q2).y, c_q2_n: cq(q2).n,
      c_q3_y: cq(q3).y, c_q3_n: cq(q3).n,
      c_q4_y: cq(q4).y, c_q4_n: cq(q4).n,
      c_q5_y: cq(q5).y, c_q5_n: cq(q5).n,
      c_q6_y: cq(q6).y, c_q6_n: cq(q6).n,
      c_q7_y: cq(q7).y, c_q7_n: cq(q7).n,
      c_q8_y: cq(q8).y, c_q8_n: cq(q8).n,
      c_q9_y: cq(q9).y, c_q9_n: cq(q9).n,
      c_q10_y: cq(q10).y, c_q10_n: cq(q10).n,
      c_q11_y: cq(q11).y, c_q11_n: cq(q11).n,
      c_q12_y: cq(q12).y, c_q12_n: cq(q12).n,
      c_q13_y: cq(q13).y, c_q13_n: cq(q13).n,
      c_q14_y: cq(q14).y, c_q14_n: cq(q14).n,
      c_q15_y: cq(q15).y, c_q15_n: cq(q15).n,
      c_q16_y: cq(q16).y, c_q16_n: cq(q16).n,
      c_q17_y: cq(q17).y, c_q17_n: cq(q17).n,
      c_q18_y: cq(q18).y, c_q18_n: cq(q18).n,
      c_q19_y: cq(q19).y, c_q19_n: cq(q19).n,
      c_q20_y: cq(q20).y, c_q20_n: cq(q20).n,
      c_q21_y: cq(q21).y, c_q21_n: cq(q21).n,
      c_q22_y: cq(q22).y, c_q22_n: cq(q22).n,
      c_q23_y: cq(q23).y, c_q23_n: cq(q23).n,
      c_q24_y: cq(q24).y, c_q24_n: cq(q24).n,
      c_q25_y: cq(q25).y, c_q25_n: cq(q25).n,
      c_q26_y: cq(q26).y, c_q26_n: cq(q26).n,
      c_q27_y: cq(q27).y, c_q27_n: cq(q27).n,
      c_q28_y: cq(q28).y, c_q28_n: cq(q28).n,
      c_q29_y: cq(q29).y, c_q29_n: cq(q29).n,
      c_q30_y: cq(q30).y, c_q30_n: cq(q30).n,
      c_q31_y: cq(q31).y, c_q31_n: cq(q31).n,
      c_q32_y: cq(q32).y, c_q32_n: cq(q32).n,
      c_q33_y: cq(q33).y, c_q33_n: cq(q33).n,
      c_q34_y: cq(q34).y, c_q34_n: cq(q34).n,
      c_q35_y: cq(q35).y, c_q35_n: cq(q35).n,
      c_q36_y: cq(q36).y, c_q36_n: cq(q36).n,
      c_q37_y: cq(q37).y, c_q37_n: cq(q37).n,
      c_q38_y: cq(q38).y, c_q38_n: cq(q38).n,
      c_q39_y: cq(q39).y, c_q39_n: cq(q39).n,
      c_q40_y: cq(q40).y, c_q40_n: cq(q40).n,
      c_q41_y: cq(q41).y, c_q41_n: cq(q41).n,
      c_q42_y: cq(q42).y, c_q42_n: cq(q42).n,
      c_q43_y: cq(q43).y, c_q43_n: cq(q43).n,
      c_q44_y: cq(q44).y, c_q44_n: cq(q44).n,

      // Biometrics
      p: str('pulse'),
      b_p: str('bloodPressure', 'blood_pressure'),
      rr: str('respiratoryRate', 'rr'),
      w: str('weight'),
      h: str('height'),
      bmi: str('bmi'),

      // Vision
      date_vt: examDate,
      va_rt: str('disr_unc') || str('disr_cor'),
      va_lt: str('disl_unc') || str('disl_cor'),
      va_be: str('bv_unc') || str('bv_cor'),
      color_blindness: str('color_vision'),

      // Physical exam
      eyes_a: checkEx(eyes_status).a, eyes_n: checkEx(eyes_status).n,
      ears_a: checkEx(ears_status).a, ears_n: checkEx(ears_status).n,
      nose_a: checkEx(nose_status).a, nose_n: checkEx(nose_status).n,
      throat_a: checkEx(throat_status).a, throat_n: checkEx(throat_status).n,
      den_c_a: checkEx(dental_status).a, den_c_n: checkEx(dental_status).n,
      n_t_a: checkEx(neck_status).a, n_t_n: checkEx(neck_status).n,
      breast_a: charUnchecked, breast_n: charUnchecked,
      lung_a: checkEx(lung_status).a, lung_n: checkEx(lung_status).n,
      heart_a: checkEx(heart_status).a, heart_n: checkEx(heart_status).n,
      abdomen_a: checkEx(abdomen_status).a, abdomen_n: checkEx(abdomen_status).n,
      hernia_a: checkEx(hernia_status).a, hernia_n: checkEx(hernia_status).n,
      genit_a: checkEx(genitalia_status).a, genit_n: checkEx(genitalia_status).n,
      rectal_a: checkEx(rectal_status).a, rectal_n: checkEx(rectal_status).n,
      pelvic_e_a: charUnchecked, pelvic_e_n: charUnchecked,
      lymph_a: checkEx(lymph_status).a, lymph_n: checkEx(lymph_status).n,
      skin_a: checkEx(skin_status).a, skin_n: checkEx(skin_status).n,
      muscul_a: checkEx(muscul_status).a, muscul_n: checkEx(muscul_status).n,
      reflex_a: checkEx(reflex_status).a, reflex_n: checkEx(reflex_status).n,

      // PFT
      ft_fvc: str('ft_fvc'),
      pre_fvc: str('pre_fvc'),
      ft_fev1: str('ft_fev1'),
      pre_fev1: str('pre_fev1'),
      ev1_vc: str('ev1_vc'),
      result: str('result'),

      // Audiometry
      l05: str('l05'), l1: str('l1'), l2: str('l2'), l3: str('l3'), l4: str('l4'), l6: str('l6'), l8: str('l8'),
      r05: str('r05'), r1: str('r1'), r2: str('r2'), r3: str('r3'), r4: str('r4'), r6: str('r6'), r8: str('r8'),
      oth_result: str('oht_result'),

      // ECG
      rate: str('rate'),
      rhyt: str('rhyt'),
      axis: str('axis'),
      pr: str('pr'),
      qrs: str('qrs'),
      twv: str('twv'),
      diag: str('diag'),

      // Blood
      blood_g: str('bloodGroupType', 'bg_type'),
      lab_rh: str('bloodGroupRh', 'bg_rh'),
      lab_hb: str('lab_hb'),
      lab_hct: str('lab_hct'),
      rbc_m: str('rbc_m'),
      lab_wbc: str('lab_wbc'),

      // Urine
      pmn: str('pmn'),
      lymph: str('lymph'),
      mono: str('mono'),
      eos: str('eos'),
      baso: str('baso'),
      band: str('band'),
      albumin: str('albumin'),
      ur_sugar: str('ur_sugar'),
      urin_b: str('urin_b'),
      lab_platelet: str('lab_platelet'),
      wbc: str('wbc'),
      rbc: str('rbc'),
      casts: str('casts'),
      ur_others: str('ur_others'),

      // Chemical blood & stool
      lab_sugar: str('lab_sugar'),
      val_sugar: str('val_sugar'),
      lab_chol: str('lab_chol'),
      val_chol: str('val_chol'),
      lab_trig: str('lab_trig'),
      val_trig: str('val_trig'),
      lab_hdl: str('lab_hdl'),
      val_hdl: str('val_hdl'),
      lab_ldl: str('lab_ldl'),
      val_ldl: str('val_ldl'),
      lab_bun: str('lab_bun'),
      val_bun: str('val_bun'),
      lab_creat: str('lab_creat'),
      val_creat: str('val_creat'),
      lab_sgot: str('lab_sgot'),
      val_sgot: str('val_sgot'),
      lab_sgpt: str('lab_sgpt'),
      val_sgpt: str('val_sgpt'),
      lab_uric: str('lab_uric'),
      val_urig: str('val_urig'),
      only_cg: str('only_cg') || [str('stool_bact'), str('stool_para')].filter(Boolean).join(' / '),

      // X-ray & conclusion
      date_xray: xrayDate || examDate,
      des_abnor: str('des_abnor') || str('xray'),
      detail_af: detailAbnormalFindings,
      summary: str('summary'),
      suggestion: str('suggestion'),
      eps: str('eps'),
      hospital: str('hospital'),
      date: examDate,
      comments: str('comments') || str('restrictions') || str('rest_desc'),
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
        'Content-Disposition': 'attachment; filename="Chevron_Report.docx"',
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