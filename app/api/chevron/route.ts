import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Sesuaikan nama file dengan yang ada di folder public/templates Anda
    const fileName = '5. Chevron Medical Form.docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Mencegah muncul teks "undefined"
    });

    // --- HELPER FUNCTIONS (3-STATE LOGIC) ---
    // PENTING: Ganti charChecked dan charUnchecked di bawah ini sesuai karakter 
    // kotak/centang yang Anda gunakan di dalam template Word Docxtemplater.
    const charChecked = '☑';   // Karakter jika dicentang
    const charUnchecked = '☐'; // Karakter jika dibiarkan kosong/tidak dicentang

    const isY = (val: any) => (val === 'Yes' || val === true) ? charChecked : charUnchecked;
    const isN = (val: any) => (val === 'No' || val === false) ? charChecked : charUnchecked;

    // Helper Kuesioner (Medical History) - Mengembalikan 'Yes', 'No', atau null jika kosong
    const evaluateQ = (fields: string[], conditionFn: (val: any) => boolean = (val) => val === 'Yes') => {
        // Jika SEMUA field pembentuk kosong, kembalikan null (Tidak ada yang dicentang)
        if (fields.every(f => formData[f] === undefined || formData[f] === '')) return null;
        // Jika ADA minimal satu field yang memenuhi kondisi, kembalikan 'Yes'
        if (fields.some(f => conditionFn(formData[f]))) return 'Yes';
        // Jika sudah diisi tapi tidak ada yang memenuhi kondisi, kembalikan 'No'
        return 'No';
    };

    const cq = (val: string | null) => ({
        y: val === 'Yes' ? charChecked : charUnchecked,
        n: val === 'No' ? charChecked : charUnchecked
    });

    // Helper Pemeriksaan Fisik (Physical Exam) - Mengembalikan 'Abnormal', 'Normal', atau null jika kosong
    const getExamCategoryStatus = (fields: string[]) => {
        if (fields.every(f => formData[f] === undefined || formData[f] === '')) return null; // Kosong 100%
        if (fields.some(field => formData[field] === 'Abnormal')) return 'Abnormal';
        if (fields.some(field => formData[field] === 'Normal')) return 'Normal';
        return null;
    };

    const checkEx = (status: string | null) => ({
        n: status === 'Normal' ? charChecked : charUnchecked,
        a: status === 'Abnormal' ? charChecked : charUnchecked
    });

    // --- 1. ROLL-UP LOGIC UNTUK PHYSICAL EXAM (MENGGUNAKAN 3-STATE) ---
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

    // --- 2. ROLL-UP LOGIC UNTUK 44 KUESIONER CHEVRON (MENGGUNAKAN 3-STATE) ---
    const q1 = evaluateQ(['mh_fainting', 'mh_epilepsy']);
    const q2 = evaluateQ(['mh_headache']);
    const q3 = evaluateQ(['mh_anxiety', 'fm_mental']);
    const q4 = evaluateQ(['mh_allergy_med', 'rs_nasal'], (val) => val === 'Yes' || val === 'Abnormal');
    const q5 = evaluateQ(['al_tongue'], (val) => val === 'Abnormal');
    const q6 = evaluateQ(['mh_ear', 'mh_ear2', 'mh_tinnitus']);
    const q7 = evaluateQ(['mh_thyroid', 'rs_thyroid'], (val) => val === 'Yes' || val === 'Abnormal');
    const q8 = evaluateQ(['mh_hbp']);
    const q9 = evaluateQ(['mh_heart', 'mh_angina']);
    const q10 = evaluateQ(['mh_asthma', 'mh_bronchitis']);
    const q11 = evaluateQ(['mh_tb']);
    const q12 = evaluateQ(['mh_ulcer']);
    const q13 = evaluateQ(['mh_hep', 'al_liver'], (val) => val === 'Yes' || val === 'Abnormal');
    const q14 = evaluateQ(['mh_diarrhea', 'mh_bowel']);
    const q15 = evaluateQ(['mh_piles']);
    const q16 = evaluateQ(['mh_kidney', 'mh_kidney_stone']);
    const q17 = evaluateQ(['ur_sugar', 'albumin', 'urin_b'], (val) => val === 'Positive');
    const q18 = evaluateQ(['vdrl_res', 'hiv_res'], (val) => val === 'Reactive');
    const q19 = evaluateQ(['mh_diabetes']);
    const q20 = evaluateQ([], () => false); // Change in weight (Otomatis Kosong jika tidak ada input UI)
    const q21 = evaluateQ(['mh_rheumatism', 'cv_varicose'], (val) => val === 'Yes' || val === 'Abnormal');
    const q22 = evaluateQ(['mh_accident']);
    const q23 = evaluateQ(['mh_musculo', 'ms_back'], (val) => val === 'Yes' || val === 'Abnormal');
    const q24 = evaluateQ(['mh_skin', 'mh_eczema']);
    const q25 = evaluateQ(['fm_cancer']);
    const q26 = evaluateQ(['xray'], (val) => !!val);
    const q27 = evaluateQ(['nearr_cor', 'disr_cor'], (val) => !!val);
    const q28 = evaluateQ(['mh_eye', 'mh_eye2']);
    const q29 = evaluateQ(['q_illness', 'mh_surgery']);
    const q30 = evaluateQ(['q_meds', 'q_illness']);
    const q31 = evaluateQ(['q_meds']);
    const q32 = evaluateQ(['mh_allergy_med']);
    const q33 = evaluateQ(['mh_others'], (val) => !!val);
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
    const q44 = evaluateQ(['f_preg_no'], (val) => !!val && parseInt(val) > 0);

    doc.render({
      // SECTION I: IDENTITAS PRIBADI
      name: `${formData.firstName || ''} ${formData.middleName || ''} ${formData.familyName || ''}`.trim(),
      employer: formData.company || "",
      address: formData.address || "",
      id_passport: formData.idPassport || "",
      ddmmyy: formData.dob || "",
      gr: formData.gender || "",
      med_no: formData.medNo || "",
      position: formData.position || "",
      work_location: formData.workLocation || "",
      
      // TABEL HEALTH EXAMINATION SUMMARY (KOP ATAS)
      emp_id: formData.idPassport || "", 
      ddmmyyyy: formData.dob || "",
      service_date: formData.serviceDate || "",
      job_title: formData.position || "",
      location: formData.workLocation || "",
      company: formData.company || "",
      personal_id: formData.idPassport || "",
      
      // GAYA HIDUP (ROKOK & ALKOHOL)
      alcohol_w: formData.q_alcohol_text || (formData.q_alcohol === 'Yes' ? 'Yes' : '0'),
      n_smoker: isN(formData.q_smoke),
      smoker: isY(formData.q_smoke),
      smoker_y: formData.smoker_y || "",
      smoker_d: formData.smoker_d || "",
      smoker_q: isY(formData.smoker_q),
      smoker_q_y: formData.smoker_s_y || "",

      // SECTION II: MAPPING KUESIONER
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

      // BIOMETRIK FISIK (TEKANAN DARAH & TINGGI)
      p: formData.pulse || "",
      b_p: formData.bloodPressure || "",
      rr: formData.respiratoryRate || formData.rr || "",
      w: formData.weight || "",
      h: formData.height || "",
      bmi: formData.bmi || "",

      // 1. VISION TEST
      date_vt: formData.date || "",
      va_rt: formData.disr_unc || formData.disr_cor || "",
      va_lt: formData.disl_unc || formData.disl_cor || "",
      va_be: formData.bv_unc || formData.bv_cor || "",
      color_blindness: formData.color_vision || "",
      
      // MAPPING KE TABEL PHYSICAL EXAM CHEVRON (MENGGUNAKAN 3-STATE)
      eyes_a: checkEx(eyes_status).a, eyes_n: checkEx(eyes_status).n,
      ears_a: checkEx(ears_status).a, ears_n: checkEx(ears_status).n,
      nose_a: checkEx(nose_status).a, nose_n: checkEx(nose_status).n,
      throat_a: checkEx(throat_status).a, throat_n: checkEx(throat_status).n,
      den_c_a: checkEx(dental_status).a, den_c_n: checkEx(dental_status).n,
      n_t_a: checkEx(neck_status).a, n_t_n: checkEx(neck_status).n,
      breast_a: charUnchecked, breast_n: charUnchecked, // Default kosong, tidak ada di Smart UI
      lung_a: checkEx(lung_status).a, lung_n: checkEx(lung_status).n,
      heart_a: checkEx(heart_status).a, heart_n: checkEx(heart_status).n,
      abdomen_a: checkEx(abdomen_status).a, abdomen_n: checkEx(abdomen_status).n,
      hernia_a: checkEx(hernia_status).a, hernia_n: checkEx(hernia_status).n,
      genit_a: checkEx(genitalia_status).a, genit_n: checkEx(genitalia_status).n,
      rectal_a: checkEx(rectal_status).a, rectal_n: checkEx(rectal_status).n,
      pelvic_e_a: charUnchecked, pelvic_e_n: charUnchecked, // Default kosong
      lymph_a: checkEx(lymph_status).a, lymph_n: checkEx(lymph_status).n,
      skin_a: checkEx(skin_status).a, skin_n: checkEx(skin_status).n,
      muscul_a: checkEx(muscul_status).a, muscul_n: checkEx(muscul_status).n,
      reflex_a: checkEx(reflex_status).a, reflex_n: checkEx(reflex_status).n,

      // 2. PULMONARY FUNCTION TEST (PFT)
      ft_fvc: formData.ft_fvc || "",
      pre_fvc: formData.pre_fvc || "",
      ft_fev1: formData.ft_fev1 || "",
      pre_fev1: formData.pre_fev1 || "",
      ev1_vc: formData.ev1_vc || "",
      result: formData.result || "",

      // 3. AUDIOMETRIC TEST (TELINGA)
      l05: formData.l05 || "", l1: formData.l1 || "", l2: formData.l2 || "", l3: formData.l3 || "", l4: formData.l4 || "", l6: formData.l6 || "", l8: formData.l8 || "",
      r05: formData.r05 || "", r1: formData.r1 || "", r2: formData.r2 || "", r3: formData.r3 || "", r4: formData.r4 || "", r6: formData.r6 || "", r8: formData.r8 || "",
      oth_result: formData.oht_result || "",

      // 4. EKG / ECG
      rate: formData.rate || "",
      rhyt: formData.rhyt || "",
      axis: formData.axis || "",
      pr: formData.pr || "",
      qrs: formData.qrs || "",
      twv: formData.twv || "",
      diag: formData.diag || "",

      // 5. DARAH (BLOOD)
      blood_g: formData.bloodGroupType || "",
      lab_rh: formData.bloodGroupRh || "",
      lab_hb: formData.lab_hb || "",
      lab_hct: formData.lab_hct || "",
      rbc_m: formData.rbc_m || "",
      lab_wbc: formData.lab_wbc || "",

      // 6. URINE (KENCING)
      pmn: formData.pmn || "",
      lymph: formData.lymph || "",
      mono: formData.mono || "",
      eos: formData.eos || "",
      baso: formData.baso || "",
      band: formData.band || "",
      albumin: formData.albumin || "",
      ur_sugar: formData.ur_sugar || "",
      urin_b: formData.urin_b || "",
      lab_platelet: formData.lab_platelet || "",
      wbc: formData.wbc || "",
      rbc: formData.rbc || "",
      casts: formData.casts || "",
      ur_others: formData.ur_others || "",

      // 7. CHEMICAL BLOOD & STOOL
      lab_sugar: formData.lab_sugar || "", val_sugar: formData.val_sugar || "",
      lab_chol: formData.lab_chol || "", val_chol: formData.val_chol || "",
      lab_trig: formData.lab_trig || "", val_trig: formData.val_trig || "",
      lab_hdl: formData.lab_hdl || "", val_hdl: formData.val_hdl || "",
      lab_ldl: formData.lab_ldl || "", val_ldl: formData.val_ldl || "",
      lab_bun: formData.lab_bun || "", val_bun: formData.val_bun || "",
      lab_creat: formData.lab_creat || "", val_creat: formData.val_creat || "",
      lab_sgot: formData.lab_sgot || "", val_sgot: formData.val_sgot || "",
      lab_sgpt: formData.lab_sgpt || "", val_sgpt: formData.val_sgpt || "",
      lab_uric: formData.lab_uric || "", val_urig: formData.val_urig || "",
      only_cg: formData.stool_bact || formData.stool_para || "",

      // 8. RONGTEN (X-RAY) & KESIMPULAN (CONCLUSION)
      date_xray: formData.date_xray || formData.date || "",
      des_abnor: formData.des_abnor || formData.xray || "",
      
      // Menggabungkan komentar pemeriksaan fisik yang abnormal ke dalam kolom detail
      detail_af: [formData.cv_comm, formData.rs_comm, formData.al_comm, formData.gu_comm, formData.in_comm, formData.ms_comm, formData.ns_comm, formData.ea_comm, formData.ey_comm].filter(Boolean).join('. '),
      
      summary: formData.summary || "",
      suggestion: formData.suggestion || "",
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      date: formData.date || "",
      comments: formData.comments || formData.restrictions || "",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="Chevron_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}