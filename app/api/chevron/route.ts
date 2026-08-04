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

    // --- HELPER FUNCTIONS ---
    const isY = (val: any) => (val === 'Yes' || val === true) ? '☑' : '☐';
    const isN = (val: any) => (val === 'No' || val === false) ? '☑' : '☐';
    
    const isChecked = (condition: boolean) => condition ? '☑' : '☐';
    const isUnchecked = (condition: boolean) => condition ? '☐' : '☑';

    // --- 1. ROLL-UP LOGIC UNTUK PHYSICAL EXAM ---
    // Chevron meminta kategori besar (Mata, THT, Paru, dll). 
    // Logika ini mengecek: Jika ada satu saja sub-organ di Smart UI yang "Abnormal", 
    // maka kategori Chevron tersebut dicentang "Abnormal". Jika tidak ada, maka "Normal".
    const checkAbnormal = (fields: string[]) => fields.some(field => formData[field] === 'Abnormal');
    
    const eyes_isAbnormal = checkAbnormal(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const ears_isAbnormal = checkAbnormal(['ea_meatus', 'ea_drums']);
    const nose_isAbnormal = checkAbnormal(['rs_nasal']);
    const throat_isAbnormal = checkAbnormal(['al_tongue']);
    const dental_isAbnormal = checkAbnormal(['al_teeth']);
    const neck_isAbnormal = checkAbnormal(['rs_thyroid', 'rs_trachea']);
    const lung_isAbnormal = checkAbnormal(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const heart_isAbnormal = checkAbnormal(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs', 'cv_varicose']);
    const abdomen_isAbnormal = checkAbnormal(['al_abd', 'al_liver', 'al_spleen']);
    const hernia_isAbnormal = checkAbnormal(['al_hernia']);
    const genitalia_isAbnormal = checkAbnormal(['gu_gen']);
    const rectal_isAbnormal = checkAbnormal(['al_anus']);
    const lymph_isAbnormal = checkAbnormal(['al_lymph']);
    const skin_isAbnormal = checkAbnormal(['in_hair', 'in_skin', 'in_nails']);
    const muscul_isAbnormal = checkAbnormal(['ms_hands', 'ms_limbs', 'ms_back', 'ms_joints', 'ms_inj']);
    const reflex_isAbnormal = checkAbnormal(['ns_power', 'ns_tone', 'ns_coord', 'ns_sens', 'ns_intel']);
    
    // --- 2. ROLL-UP LOGIC UNTUK 44 KUESIONER CHEVRON ---
    const cq = (condition: boolean) => ({
        y: condition ? '☑' : '☐',
        n: condition ? '☐' : '☑'
    });

    // Menerjemahkan isian Master Form ke 44 Kuesioner Chevron secara otomatis:
    const q1 = formData.mh_fainting === 'Yes' || formData.mh_epilepsy === 'Yes';
    const q2 = formData.mh_headache === 'Yes';
    const q3 = formData.mh_anxiety === 'Yes' || formData.fm_mental === 'Yes';
    const q4 = formData.mh_allergy_med === 'Yes' || formData.rs_nasal === 'Abnormal';
    const q5 = formData.al_tongue === 'Abnormal'; 
    const q6 = formData.mh_ear === 'Yes' || formData.mh_ear2 === 'Yes' || formData.mh_tinnitus === 'Yes';
    const q7 = formData.mh_thyroid === 'Yes' || formData.rs_thyroid === 'Abnormal';
    const q8 = formData.mh_hbp === 'Yes';
    const q9 = formData.mh_heart === 'Yes' || formData.mh_angina === 'Yes';
    const q10 = formData.mh_asthma === 'Yes' || formData.mh_bronchitis === 'Yes';
    const q11 = formData.mh_tb === 'Yes';
    const q12 = formData.mh_ulcer === 'Yes';
    const q13 = formData.mh_hep === 'Yes' || formData.al_liver === 'Abnormal';
    const q14 = formData.mh_diarrhea === 'Yes' || formData.mh_bowel === 'Yes';
    const q15 = formData.mh_piles === 'Yes';
    const q16 = formData.mh_kidney === 'Yes' || formData.mh_kidney_stone === 'Yes';
    const q17 = formData.ur_sugar === 'Positive' || formData.albumin === 'Positive' || formData.urin_b === 'Positive';
    const q18 = formData.vdrl_res === 'Reactive' || formData.hiv_res === 'Reactive';
    const q19 = formData.mh_diabetes === 'Yes';
    const q20 = false; // Change in weight
    const q21 = formData.mh_rheumatism === 'Yes' || formData.cv_varicose === 'Abnormal';
    const q22 = formData.mh_accident === 'Yes';
    const q23 = formData.mh_musculo === 'Yes' || formData.ms_back === 'Abnormal';
    const q24 = formData.mh_skin === 'Yes' || formData.mh_eczema === 'Yes';
    const q25 = formData.fm_cancer === 'Yes'; 
    const q26 = !!formData.xray; // Any X-Rays
    const q27 = !!formData.nearr_cor || !!formData.disr_cor; // Memakai Kacamata
    const q28 = formData.mh_eye === 'Yes' || formData.mh_eye2 === 'Yes';
    const q29 = formData.q_illness === 'Yes' || formData.mh_surgery === 'Yes';
    const q30 = formData.q_meds === 'Yes' || formData.q_illness === 'Yes';
    const q31 = formData.q_meds === 'Yes';
    const q32 = formData.mh_allergy_med === 'Yes';
    const q33 = !!formData.mh_others;
    const q34 = formData.exp_compensation === 'Yes';
    const q35 = formData.exp_disable === 'Yes';
    const q36 = formData.q_illness === 'Yes';
    const q37 = formData.q_omfc === 'Yes';
    const q38 = formData.mh_accident === 'Yes'; 
    const q39 = formData.exp_radiation === 'Yes';
    const q40 = formData.exp_heavy_metals === 'Yes' || formData.exp_chemicals === 'Yes';
    const q41 = formData.exp_dust === 'Yes';
    const q42 = formData.exp_chemicals === 'Yes';
    const q43 = formData.exp_skin_infections === 'Yes';
    const q44 = !!formData.f_preg_no && parseInt(formData.f_preg_no) > 0; // Hamil
    
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
      
      // MAPPING KE TABEL PHYSICAL EXAM CHEVRON (Smart UI -> Standard)
      eyes_a: isChecked(eyes_isAbnormal), eyes_n: isUnchecked(eyes_isAbnormal),
      ears_a: isChecked(ears_isAbnormal), ears_n: isUnchecked(ears_isAbnormal),
      nose_a: isChecked(nose_isAbnormal), nose_n: isUnchecked(nose_isAbnormal),
      throat_a: isChecked(throat_isAbnormal), throat_n: isUnchecked(throat_isAbnormal),
      den_c_a: isChecked(dental_isAbnormal), den_c_n: isUnchecked(dental_isAbnormal),
      n_t_a: isChecked(neck_isAbnormal), n_t_n: isUnchecked(neck_isAbnormal),
      breast_a: '☐', breast_n: '☑', // Karena tidak ada di Master UI, di-default ke Normal
      lung_a: isChecked(lung_isAbnormal), lung_n: isUnchecked(lung_isAbnormal),
      heart_a: isChecked(heart_isAbnormal), heart_n: isUnchecked(heart_isAbnormal),
      abdomen_a: isChecked(abdomen_isAbnormal), abdomen_n: isUnchecked(abdomen_isAbnormal),
      hernia_a: isChecked(hernia_isAbnormal), hernia_n: isUnchecked(hernia_isAbnormal),
      genit_a: isChecked(genitalia_isAbnormal), genit_n: isUnchecked(genitalia_isAbnormal),
      rectal_a: isChecked(rectal_isAbnormal), rectal_n: isUnchecked(rectal_isAbnormal),
      pelvic_e_a: '☐', pelvic_e_n: '☑', // Default ke Normal
      lymph_a: isChecked(lymph_isAbnormal), lymph_n: isUnchecked(lymph_isAbnormal),
      skin_a: isChecked(skin_isAbnormal), skin_n: isUnchecked(skin_isAbnormal),
      muscul_a: isChecked(muscul_isAbnormal), muscul_n: isUnchecked(muscul_isAbnormal),
      reflex_a: isChecked(reflex_isAbnormal), reflex_n: isUnchecked(reflex_isAbnormal),

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