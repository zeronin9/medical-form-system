import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini persis dengan template Word MLC Anda di folder public/templates
    const fileName = '2. MLC.docx'; 
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

    // --- HELPER FUNCTIONS PENCEGAH TABRAKAN CENTANG ---
    const isY = (val: any) => (val === 'Yes' || val === true) ? '☑' : '☐';
    const isN = (val: any) => (val === 'No' || val === false || !val) ? '☑' : '☐';
    const isNorm = (val: any) => (val === 'Normal' || val === 'Good' || !val) ? '☑' : '☐';
    const isAbn = (val: any) => val === 'Abnormal' ? '☑' : '☐';

    // --- PEMISAH TANGGAL LAHIR (YYYY-MM-DD menjadi Year, Month, Day) ---
    const dobStr = formData.dob || ""; 
    const [dobY, dobM, dobD] = dobStr.split("-");

    // --- PEMISAH TEKANAN DARAH (Contoh: 120/80 menjadi Sys: 120, Dia: 80) ---
    const bpParts = (formData.bloodPressure || "").split("/");
    const bp_sys = bpParts[0] || "";
    const bp_dia = bpParts[1] || "";

    // Deteksi Gender
    const isFemale = formData.gender === 'Female';

    // --- RENDER VARIABEL KE TEMPLATE ---
    doc.render({
      // ==========================================
      // 1. IDENTITAS & SERTIFIKASI (HALAMAN 1)
      // ==========================================
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      company: formData.company || "",
      gender: formData.gender || "",
      dob: formData.dob || "",
      nationality: formData.nationality || "",
      id_passport: formData.idPassport || "",
      ilo_position: formData.ilo_position || formData.position || "",
      
      date: formData.date || "",
      exp_date: formData.exp_date || "",

      // Kuesioner Halaman 1 (Menggunakan Teks Yes/No)
      mlc_id: 'Yes',
      mlc_fit_lookout: formData.fit_lookout === 'Fit' ? 'Yes' : 'No',
      mlc_hr_stcw: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? 'Yes' : 'No',
      mlc_fit_sea: formData.fit_lookout === 'Fit' ? 'Yes' : 'No',
      mlc_hr_unaid: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? 'Yes' : 'No',
      mlc_free: formData.free_cond === 'Yes' ? 'Yes' : 'No',
      mlc_vis_stcw: 'Yes',
      mlc_col_stcw: formData.color_vision === 'Normal' ? 'Yes' : 'No',
      mlc_limit: formData.restrictions === 'Yes' ? 'Yes' : 'No',
      date_vt: formData.date || "",

      // ==========================================
      // 2. PEMERIKSAAN MEDIS (HALAMAN 2)
      // ==========================================
      h: formData.height || "", w: formData.weight || "",
      p: formData.pulse || "", rhyt: formData.rhyt || "Normal",
      bp_sys: bp_sys, bp_dia: bp_dia,

      // Visual Acuity
      disr_unc: formData.disr_unc || "-", disl_unc: formData.disl_unc || "-", bv_unc: formData.bv_unc || "-",
      disr_cor: formData.disr_cor || "-", disl_cor: formData.disl_cor || "-", bv_cor: formData.bv_cor || "-",
      nearr_unc: formData.nearr_unc || "-", nearl_unc: formData.nearl_unc || "-", near_bv_unc: formData.near_bv_unc || "-",
      nearr_cor: formData.nearr_cor || "-", nearl_cor: formData.nearl_cor || "-", near_bv_cor: formData.near_bv_cor || "-",

      // Visual Fields & Color Vision
      vf_r_n: isNorm(formData.eyes), vf_r_d: isAbn(formData.eyes),
      vf_l_n: isNorm(formData.eyes), vf_l_d: isAbn(formData.eyes),
      cv_n: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_df: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',

      // Hearing
      hr_r_n: isNorm(formData.hear_r), hr_r_s: isNorm(formData.hear_r), hr_r_o: isNorm(formData.ent),
      hr_l_n: isNorm(formData.hear_l), hr_l_s: isNorm(formData.hear_l), hr_l_o: isNorm(formData.ent),

      // Clinical Findings (Menggunakan Variabel Organ Spesifik)
      head_n: isNorm(formData.ent), head_a: isAbn(formData.ent),
      var_n: isNorm(formData.vas_s), var_a: isAbn(formData.vas_s),
      ent_n: isNorm(formData.ent), ent_a: isAbn(formData.ent),
      vasc_n: isNorm(formData.cardio), vasc_a: isAbn(formData.cardio),
      oral_n: isNorm(formData.oral_c), oral_a: isAbn(formData.oral_c),
      abd_n: isNorm(formData.abdom), abd_a: isAbn(formData.abdom),
      ear_n: isNorm(formData.ent), ear_a: isAbn(formData.ent),
      hern_n: isNorm(formData.her_or), hern_a: isAbn(formData.her_or),
      eye_n: isNorm(formData.eyes), eye_a: isAbn(formData.eyes),
      anus_n: isNorm(formData.anus_r), anus_a: isAbn(formData.anus_r),
      oph_n: isNorm(formData.eyes), oph_a: isAbn(formData.eyes),
      gu_n: isNorm(formData.genito), gu_a: isAbn(formData.genito),
      pupil_n: isNorm(formData.eyes), pupil_a: isAbn(formData.eyes),
      ext_n: isNorm(formData.extrem), ext_a: isAbn(formData.extrem),
      eyem_n: isNorm(formData.eyes), eyem_a: isAbn(formData.eyes),
      spine_n: isNorm(formData.musculo), spine_a: isAbn(formData.musculo),
      lung_n: isNorm(formData.chest), lung_a: isAbn(formData.chest),
      neuro_n: isNorm(formData.c_n_s), neuro_a: isAbn(formData.c_n_s),
      breast_n: isNorm(formData.chest), breast_a: isAbn(formData.chest),
      psych_n: formData.mh_mental === 'Yes' ? '☐' : '☑', psych_a: formData.mh_mental === 'Yes' ? '☑' : '☐',
      heart_n: isNorm(formData.cardio), heart_a: isAbn(formData.cardio),
      gen_n: isNorm(formData.gen_app), gen_a: isAbn(formData.gen_app),
      skin_n: isNorm(formData.skin), skin_a: isAbn(formData.skin),

      // Lab Results
      xray_res: formData.des_abnor || formData.xray || "NORMAL",
      hiv_res: formData.hiv_res || "-",
      vdrl_res: formData.vdrl_res || "-",
      ur_sugar: formData.ur_sugar || "-",
      albumin: formData.albumin || "-",
      urin_b: formData.urin_b || "-",
      diag: formData.diag || "-",

      // Kelaikan (Fit/Unfit)
      lo_f: formData.fit_lookout === 'Fit' ? '☑' : '☐', lo_u: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      dk_f: formData.fit_deck === 'Fit' ? '☑' : '☐', dk_u: formData.fit_deck === 'Unfit' ? '☑' : '☐',
      en_f: formData.fit_engine === 'Fit' ? '☑' : '☐', en_u: formData.fit_engine === 'Unfit' ? '☑' : '☐',
      ct_f: formData.fit_catering === 'Fit' ? '☑' : '☐', ct_u: formData.fit_catering === 'Unfit' ? '☑' : '☐',
      ot_f: formData.fit_other === 'Fit' ? '☑' : '☐', ot_u: formData.fit_other === 'Unfit' ? '☑' : '☐',

      rest_no: formData.restrictions === 'No' ? '☑' : '☐', rest_yes: formData.restrictions === 'Yes' ? '☑' : '☐',
      glass_y: (formData.disr_cor || formData.disl_cor) ? '☑' : '☐', glass_n: !(formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      rest_desc: formData.restrictions === 'Yes' ? (formData.rest_desc || "No Specific Restrictions") : "Tidak ada",
      action_taken: formData.action_taken || "Aman",
      hospital: formData.hospital || "",
      eps: formData.eps || "",

      // ==========================================
      // 3. PERSONAL DECLARATION (HALAMAN 3)
      // ==========================================
      day: dobD || "", month: dobM || "", year: dobY || "",
      address: formData.address || "",
      seaman_book: formData.seaman_book || "",
      type_of_ship: formData.typeOfShip || "",
      trade_area: formData.tradeArea || "",
      department: formData.department || formData.position || formData.ilo_position || "",

      // Kuesioner (42 Pertanyaan)
      q1_y: isY(formData.mh_eye), q1_n: isN(formData.mh_eye),
      q2_y: isY(formData.mh_hbp), q2_n: isN(formData.mh_hbp),
      q3_y: isY(formData.mh_heart), q3_n: isN(formData.mh_heart),
      q4_y: isY(formData.mh_surgery), q4_n: isN(formData.mh_surgery),
      q5_y: isY(formData.vas_s === 'Abnormal' ? 'Yes' : 'No'), q5_n: isY(formData.vas_s !== 'Abnormal' ? 'Yes' : 'No'),
      q6_y: isY(formData.mh_asthma), q6_n: isN(formData.mh_asthma),
      q7_y: isY(formData.mh_blood), q7_n: isN(formData.mh_blood),
      q8_y: isY(formData.mh_diabetes), q8_n: isN(formData.mh_diabetes),
      q9_y: isY(formData.mh_thyroid), q9_n: isN(formData.mh_thyroid),
      q10_y: isY(formData.mh_ulcer), q10_n: isN(formData.mh_ulcer),
      q11_y: isY(formData.mh_kidney), q11_n: isN(formData.mh_kidney),
      q12_y: isY(formData.mh_skin), q12_n: isN(formData.mh_skin),
      q13_y: isY(formData.mh_skin), q13_n: isN(formData.mh_skin),
      q14_y: isY(formData.mh_hep), q14_n: isN(formData.mh_hep),
      q15_y: isY(formData.her_or === 'Abnormal' ? 'Yes' : 'No'), q15_n: isY(formData.her_or !== 'Abnormal' ? 'Yes' : 'No'),
      q16_y: isY(formData.genito === 'Abnormal' ? 'Yes' : 'No'), q16_n: isY(formData.genito !== 'Abnormal' ? 'Yes' : 'No'),
      
      q17_y: (isFemale && parseInt(formData.f_preg_no || '0') > 0) ? '☑' : '☐', 
      q17_n: (!isFemale || !formData.f_preg_no || formData.f_preg_no === '0') ? '☑' : '☐', 
      
      q18_y: isY(formData.q_stress), q18_n: isN(formData.q_stress),
      q19_y: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☑' : '☐', q19_n: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☐' : '☑',
      q20_y: isY(formData.mh_surgery), q20_n: isN(formData.mh_surgery),
      q21_y: isY(formData.mh_epilepsy), q21_n: isN(formData.mh_epilepsy),
      q22_y: isY(formData.mh_fainting), q22_n: isN(formData.mh_fainting),
      q23_y: isY(formData.mh_fainting), q23_n: isN(formData.mh_fainting),
      q24_y: isY(formData.mh_mental), q24_n: isN(formData.mh_mental),
      q25_y: isY(formData.mh_mental), q25_n: isN(formData.mh_mental),
      q26_y: isY(formData.mh_mental), q26_n: isN(formData.mh_mental),
      q27_y: isY(formData.mh_cns), q27_n: isN(formData.mh_cns),
      q28_y: isY(formData.mh_cns), q28_n: isN(formData.mh_cns),
      q29_y: isY(formData.mh_headache), q29_n: isN(formData.mh_headache),
      q30_y: isY(formData.mh_ear), q30_n: isN(formData.mh_ear),
      q31_y: isY(formData.mh_musculo), q31_n: isN(formData.mh_musculo),
      q32_y: isY(formData.mh_rheumatism), q32_n: isN(formData.mh_rheumatism),
      q33_y: isY(formData.extrem === 'Abnormal' ? 'Yes' : 'No'), q33_n: isY(formData.extrem !== 'Abnormal' ? 'Yes' : 'No'),
      q34_y: isY(formData.mh_accident), q34_n: isN(formData.mh_accident),
      
      q35_y: isY(formData.q_medevac), q35_n: isN(formData.q_medevac),
      q36_y: isY(formData.q_illness), q36_n: isN(formData.q_illness),
      q37_y: isY(formData.q_omfc), q37_n: isN(formData.q_omfc),
      q38_y: isY(formData.restrictions), q38_n: isN(formData.restrictions),
      q39_y: isY(formData.q_illness), q39_n: isN(formData.q_illness),
      q40_y: isY(formData.q_fit), q40_n: isN(formData.q_fit),
      q41_y: isY(formData.mh_skin), q41_n: isN(formData.mh_skin),
      q42_y: isY(formData.q_meds), q42_n: isN(formData.q_meds),

      epd_comments: formData.comments || "",
      meds_text: formData.q_meds_text || "",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="MLC_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}