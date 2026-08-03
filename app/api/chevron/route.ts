import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini persis dengan template Word Chevron Anda
    const fileName = '5. Chevron Medical Form.docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Mencegah teks "undefined"
    });

    // --- HELPER FUNCTIONS KHUSUS CHEVRON ---
    // Chevron menggunakan huruf "X" untuk mencentang kotak
    const isX = (val: any) => (val === 'Yes' || val === true) ? 'X' : '';
    const isNX = (val: any) => (val === 'No' || val === false || !val) ? 'X' : '';
    
    const isNorm = (val: any) => (val === 'Normal' || val === 'Good' || !val) ? 'X' : '';
    const isAbn = (val: any) => val === 'Abnormal' ? 'X' : '';

    const isFemale = formData.gender === 'Female';

    // Format Tanggal
    let dobFormatted = formData.dob || "";
    if (formData.dob) {
      const parts = formData.dob.split('-');
      if (parts.length === 3) {
        dobFormatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    doc.render({
      // ==========================================
      // 1. IDENTITAS (SECTION 1)
      // ==========================================
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      employer: formData.company || "",
      address: formData.address || "",
      id_passport: formData.idPassport || "",
      ddmmyy: dobFormatted,
      gr: formData.gender === 'Male' ? 'Male' : (formData.gender === 'Female' ? 'Female' : ''),
      med_no: formData.medNo || "",
      position: formData.position || formData.ilo_position || "",
      work_location: formData.workLocation || "",

      // ==========================================
      // 2. KUESIONER 44 PERTANYAAN (MAPPING X PRESISI)
      // ==========================================
      c_q1_y: isX(formData.mh_epilepsy), c_q1_n: isNX(formData.mh_epilepsy),
      c_q2_y: isX(formData.mh_headache), c_q2_n: isNX(formData.mh_headache),
      c_q3_y: isX(formData.mh_mental), c_q3_n: isNX(formData.mh_mental),
      c_q4_y: isX(formData.mh_ear), c_q4_n: isNX(formData.mh_ear),
      c_q5_y: isX(formData.mh_ear), c_q5_n: isNX(formData.mh_ear),
      c_q6_y: isX(formData.mh_ear), c_q6_n: isNX(formData.mh_ear),
      c_q7_y: isX(formData.mh_thyroid), c_q7_n: isNX(formData.mh_thyroid),
      c_q8_y: isX(formData.mh_hbp), c_q8_n: isNX(formData.mh_hbp),
      c_q9_y: isX(formData.mh_heart), c_q9_n: isNX(formData.mh_heart),
      c_q10_y: isX(formData.mh_asthma), c_q10_n: isNX(formData.mh_asthma),
      c_q11_y: isX(formData.mh_asthma), c_q11_n: isNX(formData.mh_asthma),
      c_q12_y: isX(formData.mh_ulcer), c_q12_n: isNX(formData.mh_ulcer),
      c_q13_y: isX(formData.mh_hep), c_q13_n: isNX(formData.mh_hep),
      c_q14_y: isX(formData.mh_abd_pain), c_q14_n: isNX(formData.mh_abd_pain),
      c_q15_y: isX(formData.mh_abd_pain), c_q15_n: isNX(formData.mh_abd_pain),
      c_q16_y: isX(formData.mh_kidney), c_q16_n: isNX(formData.mh_kidney),
      c_q17_y: isX(formData.mh_kidney), c_q17_n: isNX(formData.mh_kidney),
      c_q18_y: isX(formData.mh_std), c_q18_n: isNX(formData.mh_std),
      c_q19_y: isX(formData.mh_diabetes), c_q19_n: isNX(formData.mh_diabetes),
      c_q20_y: isX(formData.mh_blood), c_q20_n: isNX(formData.mh_blood),
      c_q21_y: isX(formData.mh_rheumatism), c_q21_n: isNX(formData.mh_rheumatism),
      c_q22_y: isX(formData.mh_accident), c_q22_n: isNX(formData.mh_accident),
      c_q23_y: isX(formData.mh_musculo), c_q23_n: isNX(formData.mh_musculo),
      c_q24_y: isX(formData.mh_skin), c_q24_n: isNX(formData.mh_skin),
      c_q25_y: isX(formData.mh_cancer), c_q25_n: isNX(formData.mh_cancer),
      c_q26_y: isX(formData.q_illness), c_q26_n: isNX(formData.q_illness),
      
      c_q27_y: (formData.disr_cor || formData.disl_cor) ? 'X' : '', 
      c_q27_n: !(formData.disr_cor || formData.disl_cor) ? 'X' : '',
      
      c_q28_y: isX(formData.mh_eye), c_q28_n: isNX(formData.mh_eye),
      c_q29_y: isX(formData.q_illness), c_q29_n: isNX(formData.q_illness),
      c_q30_y: isX(formData.q_meds), c_q30_n: isNX(formData.q_meds),
      c_q31_y: isX(formData.q_meds), c_q31_n: isNX(formData.q_meds),
      c_q32_y: isX(formData.mh_skin), c_q32_n: isNX(formData.mh_skin),
      c_q33_y: formData.mh_others ? 'X' : '', c_q33_n: formData.mh_others ? '' : 'X',
      c_q34_y: '', c_q34_n: 'X',
      c_q35_y: '', c_q35_n: 'X',
      c_q36_y: isX(formData.q_illness), c_q36_n: isNX(formData.q_illness),
      c_q37_y: '', c_q37_n: 'X',
      c_q38_y: '', c_q38_n: 'X',
      c_q39_y: isX(formData.nw_radiation), c_q39_n: isNX(formData.nw_radiation),
      c_q40_y: isX(formData.nw_heavy), c_q40_n: isNX(formData.nw_heavy),
      c_q41_y: isX(formData.nw_confined), c_q41_n: isNX(formData.nw_confined),
      c_q42_y: isX(formData.mh_skin), c_q42_n: isNX(formData.mh_skin),
      c_q43_y: isX(formData.mh_skin), c_q43_n: isNX(formData.mh_skin),
      c_q44_y: (isFemale && parseInt(formData.f_preg_no || '0') > 0) ? 'X' : '',
      c_q44_n: (isFemale && parseInt(formData.f_preg_no || '0') === 0) ? 'X' : (!isFemale ? 'X' : ''),

      // ==========================================
      // 3. HEALTH EXAMINATION SUMMARY
      // ==========================================
      emp_id: formData.idPassport || "",
      ddmmyyyy: dobFormatted,
      service_date: formData.serviceDate || "",
      job_title: formData.position || formData.ilo_position || "",
      location: formData.workLocation || "",
      company: formData.company || "",
      personal_id: formData.idPassport || "",
      
      alcohol_w: formData.q_alcohol === 'Yes' ? formData.q_alcohol_text : "0",
      n_smoker: formData.q_smoke === 'No' ? 'X' : '',
      smoker: formData.q_smoke === 'Yes' ? 'X' : '',
      smoker_y: formData.smoker_y || "",
      smoker_d: formData.smoker_d || "",
      smoker_q: formData.smoker_q === 'Yes' ? 'X' : '',
      smoker_q_y: formData.smoker_s_y || "",

      p: formData.pulse || "",
      b_p: formData.bloodPressure || "",
      rr: formData.rr || formData.respiratoryRate || "",
      w: formData.weight || "",
      h: formData.height || "",
      bmi: formData.bmi || "",

      // PHYSICAL EXAM ITEMS (Normal / Abnormal)
      eyes_n: isNorm(formData.eyes), eyes_a: isAbn(formData.eyes),
      ears_n: isNorm(formData.ent), ears_a: isAbn(formData.ent),
      nose_n: isNorm(formData.ent), nose_a: isAbn(formData.ent),
      throat_n: isNorm(formData.ent), throat_a: isAbn(formData.ent),
      den_c_n: isNorm(formData.oral_c), den_c_a: isAbn(formData.oral_c),
      n_t_n: isNorm(formData.ent), n_t_a: isAbn(formData.ent),
      breast_n: isNorm(formData.chest), breast_a: isAbn(formData.chest),
      lung_n: isNorm(formData.chest), lung_a: isAbn(formData.chest),
      heart_n: isNorm(formData.cardio), heart_a: isAbn(formData.cardio),
      abdomen_n: isNorm(formData.abdom), abdomen_a: isAbn(formData.abdom),
      hernia_n: isNorm(formData.her_or), hernia_a: isAbn(formData.her_or),
      genit_n: isNorm(formData.genito), genit_a: isAbn(formData.genito),
      rectal_n: isNorm(formData.anus_r), rectal_a: isAbn(formData.anus_r),
      pelvic_e_n: isNorm(formData.genito), pelvic_e_a: isAbn(formData.genito),
      lymph_n: isNorm(formData.abdom), lymph_a: isAbn(formData.abdom),
      skin_n: isNorm(formData.skin), skin_a: isAbn(formData.skin),
      muscul_n: isNorm(formData.musculo), muscul_a: isAbn(formData.musculo),
      reflex_n: isNorm(formData.c_n_s), reflex_a: isAbn(formData.c_n_s),

      // OCCUPATIONAL HEALTH TESTS
      date_vt: formData.date || "",
      va_rt: formData.disr_unc || "-", va_lt: formData.disl_unc || "-", va_be: formData.bv_unc || "-",
      color_blindness: formData.color_vision || "Normal",
      ft_fvc: formData.ft_fvc || "-", pre_fvc: formData.pre_fvc || "-",
      ft_fev1: formData.ft_fev1 || "-", pre_fev1: formData.pre_fev1 || "-",
      ev1_vc: formData.ev1_vc || "-", result: "Normal",
      
      l05: formData.l05 || formData.l500 || "-", l1: formData.l1 || "-", l2: formData.l2 || "-", l3: formData.l3 || "-", l4: formData.l4 || "-", l6: formData.l6 || "-", l8: formData.l8 || "-",
      r05: formData.r05 || formData.r500 || "-", r1: formData.r1 || "-", r2: formData.r2 || "-", r3: formData.r3 || "-", r4: formData.r4 || "-", r6: formData.r6 || "-", r8: formData.r8 || "-",
      oth_result: formData.oht_result || "-",

      // ==========================================
      // 4. LABORATORY (BLOOD & URINE) - SOLUSI SALAH KAMAR
      // ==========================================
      rate: formData.rate || "-", rhyt: formData.rhyt || "-", axis: formData.axis || "-",
      blood_g: formData.bloodGroupType || "-", lab_rh: formData.bloodGroupRh || "-",
      pr: formData.pr || "-", qrs: formData.qrs || "-", twv: formData.twv || "-",
      lab_hb: formData.lab_hb || "-", lab_hct: formData.lab_hct || "-", diag: formData.diag || "-",
      rbc_m: formData.rbc_m || "-", lab_wbc: formData.lab_wbc || "-",

      pmn: formData.pmn || "-", lymph: formData.lymph || "-", mono: formData.mono || "-",
      albumin: formData.albumin || "-", ur_sugar: formData.ur_sugar || "-",
      eos: formData.eos || "-", baso: formData.baso || "-", band: formData.band || "-",
      urin_b: formData.urin_b || "-", lab_platelet: formData.lab_platelet || "-",
      wbc: formData.wbc || "-", rbc: formData.rbc || "-", casts: formData.casts || "-", ur_others: formData.ur_others || "-",

      // CHEMISTRY: Memasukkan data dari form ke kolom 'Result' (lab_*), bukan Normal Value
      lab_sugar: formData.val_sugar || "", val_sugar: "",
      lab_chol: formData.val_chol || "", val_chol: "",
      lab_trig: formData.val_trig || "", val_trig: "", only_cg: "",
      lab_hdl: formData.val_hdl || "", val_hdl: "",
      lab_ldl: formData.val_ldl || "", val_ldl: "",
      lab_bun: formData.val_bun || "", val_bun: "",
      lab_creat: formData.val_creat || "", val_creat: "",
      lab_sgot: formData.val_sgot || "", val_sgot: "",
      lab_sgpt: formData.val_sgpt || "", val_sgpt: "",
      lab_uric: formData.val_urig || "", val_urig: "",

      detail_af: formData.detail_af || formData.rest_desc || "",
      date_xray: formData.date_xray || formData.date || "",
      des_abnor: formData.des_abnor || formData.xray || "Normal",
      
      summary: formData.summary || "",
      suggestion: formData.suggestion || "",
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      date: formData.date || "",

      // ==========================================
      // 5. FITNESS FOR DUTY (HALAMAN TERAKHIR)
      // ==========================================
      comments: formData.comments || formData.rest_desc || "No abnormal findings.",
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