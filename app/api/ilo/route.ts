import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    const fileName = '1. ILO.docx'; 
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
    const isN = (val: any) => (val === 'No' || val === false || !val) ? '☑' : '☐';
    const isNorm = (val: any) => (val === 'Normal' || val === 'Good' || !val) ? '☑' : '☐';
    const isAbn = (val: any) => val === 'Abnormal' ? '☑' : '☐';

    // --- PEMISAH TANGGAL (DOB) ---
    const dobStr = formData.dob || ""; 
    const [dobY, dobM, dobD] = dobStr.split("-");
    const ddmmyy = formData.dob ? `${dobY}/${dobM}/${dobD}` : "";

    // --- PEMISAH TEKANAN DARAH ---
    const bpParts = (formData.bloodPressure || "").split("/");
    const bp_sys = bpParts[0] || "";
    const bp_dia = bpParts[1] || "";

    // Deteksi Gender
    const isFemale = formData.gender === 'Female';

    // --- RENDER VARIABEL 100% MENGIKUTI TEMPLATE WORD ILO ---
    doc.render({
      // ==========================================
      // 1. IDENTITAS & PEKERJAAN (HALAMAN 1)
      // ==========================================
      first_name: formData.firstName || "",
      family_name: formData.familyName || "",
      
      day: dobD || "",
      month: dobM || "",
      year: dobY || "",
      
      pob_city: formData.pob_city || "",
      pob_country: formData.pob_country || "",
      g_m: formData.gender === 'Male' ? '☑' : '☐',
      g_f: formData.gender === 'Female' ? '☑' : '☐',
      
      address: formData.address || "",
      id_passport: formData.idPassport || "",
      type_of_ship: formData.typeOfShip || "",
      trade_area: formData.tradeArea || "",

      pos_mas: formData.ilo_position === 'Master' ? '☑' : '☐',
      pos_dec: formData.ilo_position === 'Deck Officer' ? '☑' : '☐',
      pos_eng: formData.ilo_position === 'Engineering Officer' ? '☑' : '☐',
      pos_rad: (formData.ilo_position === 'Radio Officer' || formData.ilo_position === 'Radio Operator') ? '☑' : '☐',
      pos_rat: formData.ilo_position === 'Rating' ? '☑' : '☐',

      // ==========================================
      // 2. KESIMPULAN DOKTER (HALAMAN 1)
      // ==========================================
      disr_unc: formData.disr_unc || "-", disl_unc: formData.disl_unc || "-",
      disr_cor: formData.disr_cor || "-", disl_cor: formData.disl_cor || "-",
      
      col_book: formData.color_test_type === 'Book' ? '☑' : '☐',
      col_lant: formData.color_test_type === 'Lantern' ? '☑' : '☐',
      col_y: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_r: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_g: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_b: formData.color_vision === 'Normal' ? '☑' : '☐',
      
      hear_r: formData.hear_r || "Normal", hear_l: formData.hear_l || "Normal",
      
      id_y: '☑', id_n: '☐',
      hr_stcw_y: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? '☑' : '☐',
      hr_stcw_n: (formData.hear_r === 'Abnormal' || formData.hear_l === 'Abnormal') ? '☑' : '☐',
      hr_stcw_na: '☐',
      hr_unaid_y: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? '☑' : '☐',
      hr_unaid_n: (formData.hear_r === 'Abnormal' || formData.hear_l === 'Abnormal') ? '☑' : '☐',
      
      vis_stcw_y: '☑', vis_stcw_n: '☐',
      col_stcw_y: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_stcw_n: formData.color_vision !== 'Normal' ? '☑' : '☐',
      date_vt: formData.date || "",
      
      glass_y: (formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      glass_n: !(formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      
      watch_y: formData.fit_lookout === 'Fit' ? '☑' : '☐',
      watch_n: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      meds_y: isY(formData.q_meds), meds_n: isN(formData.q_meds),
      
      free_y: formData.free_cond === 'Yes' ? '☑' : '☐',
      free_n: formData.free_cond === 'No' ? '☑' : '☐',
      rest_desc: formData.restrictions === 'Yes' ? (formData.rest_desc || "No Specific Restrictions") : "Tidak ada",
      
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      cert_auth: formData.cert_auth || "",
      date: formData.date || "",
      exp_date: formData.exp_date || "",

      // ==========================================
      // 3. PERSONAL DECLARATION (42 PERTANYAAN)
      // ==========================================
      ddmmyy: ddmmyy, // DOB di bagian atas tabel
      ddmmyyyy: formData.date || "", // TTD Examinee di bawah
      
      i_q1_y: isY(formData.mh_eye), i_q1_n: isN(formData.mh_eye),
      i_q2_y: isY(formData.mh_hbp), i_q2_n: isN(formData.mh_hbp),
      i_q3_y: isY(formData.mh_heart), i_q3_n: isN(formData.mh_heart),
      i_q4_y: isY(formData.mh_surgery), i_q4_n: isN(formData.mh_surgery),
      i_q5_y: isY(formData.vas_s === 'Abnormal' ? 'Yes' : 'No'), i_q5_n: isY(formData.vas_s !== 'Abnormal' ? 'Yes' : 'No'),
      i_q6_y: isY(formData.mh_asthma), i_q6_n: isN(formData.mh_asthma),
      i_q7_y: isY(formData.mh_blood), i_q7_n: isN(formData.mh_blood),
      i_q8_y: isY(formData.mh_diabetes), i_q8_n: isN(formData.mh_diabetes),
      i_q9_y: isY(formData.mh_thyroid), i_q9_n: isN(formData.mh_thyroid),
      i_q10_y: isY(formData.mh_ulcer), i_q10_n: isN(formData.mh_ulcer),
      i_q11_y: isY(formData.mh_kidney), i_q11_n: isN(formData.mh_kidney),
      i_q12_y: isY(formData.mh_skin), i_q12_n: isN(formData.mh_skin),
      i_q13_y: isY(formData.mh_skin), i_q13_n: isN(formData.mh_skin),
      i_q14_y: isY(formData.mh_hep), i_q14_n: isN(formData.mh_hep),
      i_q15_y: isY(formData.her_or === 'Abnormal' ? 'Yes' : 'No'), i_q15_n: isY(formData.her_or !== 'Abnormal' ? 'Yes' : 'No'),
      i_q16_y: isY(formData.genito === 'Abnormal' ? 'Yes' : 'No'), i_q16_n: isY(formData.genito !== 'Abnormal' ? 'Yes' : 'No'),
      
      i_q17_y: (isFemale && parseInt(formData.f_preg_no || '0') > 0) ? '☑' : '☐', 
      i_q17_n: (!isFemale || !formData.f_preg_no || formData.f_preg_no === '0') ? '☑' : '☐', 
      
      i_q18_y: isY(formData.q_stress), i_q18_n: isN(formData.q_stress),
      i_q19_y: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☑' : '☐', i_q19_n: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☐' : '☑',
      i_q20_y: isY(formData.mh_surgery), i_q20_n: isN(formData.mh_surgery),
      i_q21_y: isY(formData.mh_epilepsy), i_q21_n: isN(formData.mh_epilepsy),
      i_q22_y: isY(formData.mh_fainting), i_q22_n: isN(formData.mh_fainting),
      i_q23_y: isY(formData.mh_fainting), i_q23_n: isN(formData.mh_fainting),
      i_q24_y: isY(formData.mh_mental), i_q24_n: isN(formData.mh_mental),
      i_q25_y: isY(formData.mh_mental), i_q25_n: isN(formData.mh_mental),
      i_q26_y: isY(formData.mh_mental), i_q26_n: isN(formData.mh_mental),
      i_q27_y: isY(formData.mh_cns), i_q27_n: isN(formData.mh_cns),
      i_q28_y: isY(formData.mh_cns), i_q28_n: isN(formData.mh_cns),
      i_q29_y: isY(formData.mh_headache), i_q29_n: isN(formData.mh_headache),
      i_q30_y: isY(formData.mh_ear), i_q30_n: isN(formData.mh_ear),
      i_q31_y: isY(formData.mh_musculo), i_q31_n: isN(formData.mh_musculo),
      i_q32_y: isY(formData.mh_rheumatism), i_q32_n: isN(formData.mh_rheumatism),
      i_q33_y: isY(formData.extrem === 'Abnormal' ? 'Yes' : 'No'), i_q33_n: isY(formData.extrem !== 'Abnormal' ? 'Yes' : 'No'),
      i_q34_y: isY(formData.mh_accident), i_q34_n: isN(formData.mh_accident),
      
      i_q35_y: isY(formData.q_medevac), i_q35_n: isN(formData.q_medevac),
      i_q36_y: isY(formData.q_illness), i_q36_n: isN(formData.q_illness),
      i_q37_y: isY(formData.q_omfc), i_q37_n: isN(formData.q_omfc),
      i_q38_y: isY(formData.restrictions), i_q38_n: isN(formData.restrictions),
      i_q39_y: isY(formData.q_illness), i_q39_n: isN(formData.q_illness),
      i_q40_y: isY(formData.q_fit), i_q40_n: isN(formData.q_fit),
      i_q41_y: isY(formData.mh_skin), i_q41_n: isN(formData.mh_skin),
      i_q42_y: isY(formData.q_meds), i_q42_n: isN(formData.q_meds),
      
      epd_comments: formData.comments || "",
      meds_text: formData.q_meds_text || "",

      // ==========================================
      // 4. PEMERIKSAAN MEDIS (HALAMAN TERAKHIR)
      // ==========================================
      me_psea: formData.reason_exam === 'Pre-Employment' ? '☑' : '☐',
      me_periodic: formData.reason_exam !== 'Pre-Employment' ? '☑' : '☐',
      me_other: '☐',

      bv_unc: formData.bv_unc || "-", bv_cor: formData.bv_cor || "-",
      nearr_unc: formData.nearr_unc || "-", nearl_unc: formData.nearl_unc || "-",
      near_bv_unc: formData.near_bv_unc || "-",
      nearr_cor: formData.nearr_cor || "-", nearl_cor: formData.nearl_cor || "-",
      near_bv_cor: formData.near_bv_cor || "-",

      vf_r_n: isNorm(formData.eyes), vf_r_d: isAbn(formData.eyes),
      vf_l_n: isNorm(formData.eyes), vf_l_d: isAbn(formData.eyes),

      cv_n: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_db: '☐', 
      cv_df: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',

      // Audiometri
      r05: formData.r05 || formData.r500 || "-", r1: formData.r1 || "-", r2: formData.r2 || "-", r3: formData.r3 || "-", r4: formData.r4 || "-", r6: formData.r6 || "-",
      l05: formData.l05 || formData.l500 || "-", l1: formData.l1 || "-", l2: formData.l2 || "-", l3: formData.l3 || "-", l4: formData.l4 || "-", l6: formData.l6 || "-",
      sw_r_n: isNorm(formData.hear_r), sw_r_w: isNorm(formData.hear_r),
      sw_l_n: isNorm(formData.hear_l), sw_l_w: isNorm(formData.hear_l),

      h: formData.height || "", w: formData.weight || "",
      p: formData.pulse || "", rhyt: formData.rhyt || "Normal",
      bp_sys: bp_sys, bp_dia: bp_dia,
      
      ur_sugar: formData.ur_sugar || "-", albumin: formData.albumin || "-",

      // Pemeriksaan Fisik Klinis
      head_n: isNorm(formData.ent), head_a: isAbn(formData.ent),
      ent_n: isNorm(formData.ent), ent_a: isAbn(formData.ent),
      oral_n: isNorm(formData.oral_c), oral_a: isAbn(formData.oral_c),
      ear_n: isNorm(formData.ent), ear_a: isAbn(formData.ent),
      tymp_n: isNorm(formData.ent), tymp_a: isAbn(formData.ent),
      eye_n: isNorm(formData.eyes), eye_a: isAbn(formData.eyes),
      oph_n: isNorm(formData.eyes), oph_a: isAbn(formData.eyes),
      pupil_n: isNorm(formData.eyes), pupil_a: isAbn(formData.eyes),
      eyem_n: isNorm(formData.eyes), eyem_a: isAbn(formData.eyes),
      lung_n: isNorm(formData.chest), lung_a: isAbn(formData.chest),
      breast_n: isNorm(formData.chest), breast_a: isAbn(formData.chest),
      heart_n: isNorm(formData.cardio), heart_a: isAbn(formData.cardio),
      
      var_n: isNorm(formData.vas_s), var_a: isAbn(formData.vas_s),
      vasc_n: isNorm(formData.cardio), vasc_a: isAbn(formData.cardio),
      abd_n: isNorm(formData.abdom), abd_a: isAbn(formData.abdom),
      hern_n: isNorm(formData.her_or), hern_a: isAbn(formData.her_or),
      anus_n: isNorm(formData.anus_r), anus_a: isAbn(formData.anus_r),
      gu_n: isNorm(formData.genito), gu_a: isAbn(formData.genito),
      ext_n: isNorm(formData.extrem), ext_a: isAbn(formData.extrem),
      spine_n: isNorm(formData.musculo), spine_a: isAbn(formData.musculo),
      neuro_n: isNorm(formData.c_n_s), neuro_a: isAbn(formData.c_n_s),
      psych_n: formData.mh_mental === 'Yes' ? '☐' : '☑', psych_a: formData.mh_mental === 'Yes' ? '☑' : '☐',
      gen_n: isNorm(formData.gen_app), gen_a: isAbn(formData.gen_app),
      skin_n: isNorm(formData.skin), skin_a: isAbn(formData.skin),

      // Laboratorium
      xray_np: '☐', xray_n: formData.xray === 'Normal' ? '☑' : '☐', xray_a: formData.xray === 'Abnormal' ? '☑' : '☐',
      date_xray: formData.date_xray || formData.date || "", xray_res: formData.des_abnor || "NORMAL",
      
      lab_hb: formData.lab_hb || "-", lab_sr: formData.lab_sr || "-",
      hbab_p: formData.hep_b_ab === 'Positive' ? '☑' : '☐', hbab_n: formData.hep_b_ab === 'Negative' ? '☑' : '☐',
      hbag_p: formData.hep_b_ag === 'Positive' ? '☑' : '☐', hbag_n: formData.hep_b_ag === 'Negative' ? '☑' : '☐',
      
      bs_np: '☐', bs_neg: formData.stool_bact === 'Negative' ? '☑' : '☐', bs_pos: formData.stool_bact === 'Positive' ? '☑' : '☐',
      ps_np: '☐', ps_neg: formData.stool_para === 'Negative' ? '☑' : '☐', ps_pos: formData.stool_para === 'Positive' ? '☑' : '☐',
      
      diag: formData.diag || "-", hiv_res: formData.hiv_res || "-", comments: formData.comments || "",
      
      vac_sat: '☑', vac_ren: '☐', vac_details: formData.vac_details || "",

      // Kesimpulan
      lo_f: formData.fit_lookout === 'Fit' ? '☑' : '☐', lo_u: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      dk_f: formData.fit_deck === 'Fit' ? '☑' : '☐', dk_u: formData.fit_deck === 'Unfit' ? '☑' : '☐',
      en_f: formData.fit_engine === 'Fit' ? '☑' : '☐', en_u: formData.fit_engine === 'Unfit' ? '☑' : '☐',
      ct_f: formData.fit_catering === 'Fit' ? '☑' : '☐', ct_u: formData.fit_catering === 'Unfit' ? '☑' : '☐',
      ot_f: formData.fit_other === 'Fit' ? '☑' : '☐', ot_u: formData.fit_other === 'Unfit' ? '☑' : '☐',

      rest_no: formData.restrictions === 'No' ? '☑' : '☐', rest_yes: formData.restrictions === 'Yes' ? '☑' : '☐',
      action_taken: formData.action_taken || "Aman",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="ILO_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}