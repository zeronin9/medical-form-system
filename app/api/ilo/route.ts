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

    // --- HELPER FUNCTIONS (TRUE 3-STATE LOGIC) ---
    // Kotak hanya dicentang jika nilai eksplisit Yes atau No dikirimkan.
    const isY = (val: any) => (val === 'Yes' || val === true) ? '☑' : '☐';
    const isN = (val: any) => (val === 'No' || val === false) ? '☑' : '☐';
    
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

    // --- ADAPTER: ROLL-UP LOGIC UNTUK PHYSICAL EXAM ---
    // Logika 3-State: Jika semua kosong -> null. Jika ada Abnormal -> Abnormal. Sisanya -> Normal.
    const evaluateExam = (fields: string[]) => {
      if (fields.every(f => !formData[f])) return null;
      if (fields.some(f => formData[f] === 'Abnormal')) return 'Abnormal';
      return 'Normal';
    };

    const isExN = (status: string | null) => status === 'Normal' ? '☑' : '☐';
    const isExA = (status: string | null) => status === 'Abnormal' ? '☑' : '☐';
    
    const headStatus = evaluateExam(['rs_nasal', 'al_teeth', 'al_tongue', 'ea_meatus', 'ea_drums', 'ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const entStatus = evaluateExam(['rs_nasal', 'rs_thyroid', 'rs_trachea', 'ea_meatus', 'ea_drums']);
    const oralStatus = evaluateExam(['al_teeth', 'al_tongue']);
    const earStatus = evaluateExam(['ea_meatus', 'ea_drums']);
    const tympStatus = evaluateExam(['ea_drums']);
    const eyeStatus = evaluateExam(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const ophStatus = evaluateExam(['ey_fundi']);
    const pupilStatus = evaluateExam(['ey_light', 'ey_accom']);
    const eyemStatus = evaluateExam(['ey_nyst']);
    const lungStatus = evaluateExam(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const breastStatus = null; // Default kosong, tidak ada di Smart UI
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

    // Map kondisi mental & saraf pusat (cns)
    const hasMentalIssue = (formData.mh_anxiety === 'Yes' || formData.q_stress === 'Yes') ? 'Yes' : (!formData.mh_anxiety && !formData.q_stress ? null : 'No');
    const hasCnsIssue = (formData.mh_stroke === 'Yes' || formData.mh_epilepsy === 'Yes') ? 'Yes' : (!formData.mh_stroke && !formData.mh_epilepsy ? null : 'No');

    // --- RENDER VARIABEL 100% DINAMIS (TANPA DUMMY) ---
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
      disr_unc: formData.disr_unc || "", disl_unc: formData.disl_unc || "",
      disr_cor: formData.disr_cor || "", disl_cor: formData.disl_cor || "",
      
      col_book: formData.color_test_type === 'Book' ? '☑' : '☐',
      col_lant: formData.color_test_type === 'Lantern' ? '☑' : '☐',
      col_y: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_r: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_g: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_b: formData.color_vision === 'Normal' ? '☑' : '☐',
      
      hear_r: formData.hear_r || "", hear_l: formData.hear_l || "",
      
      id_y: formData.idPassport ? '☑' : '☐', id_n: !formData.idPassport ? '☑' : '☐',
      hr_stcw_y: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? '☑' : '☐',
      hr_stcw_n: (formData.hear_r === 'Abnormal' || formData.hear_l === 'Abnormal') ? '☑' : '☐',
      hr_stcw_na: '☐',
      hr_unaid_y: (formData.hear_r === 'Normal' && formData.hear_l === 'Normal') ? '☑' : '☐',
      hr_unaid_n: (formData.hear_r === 'Abnormal' || formData.hear_l === 'Abnormal') ? '☑' : '☐',
      
      vis_stcw_y: (formData.disr_unc || formData.disr_cor) ? '☑' : '☐', vis_stcw_n: '☐',
      col_stcw_y: formData.color_vision === 'Normal' ? '☑' : '☐',
      col_stcw_n: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',
      date_vt: formData.date || "",
      
      glass_y: (formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      glass_n: (formData.disr_unc || formData.disl_unc) && !(formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      
      watch_y: formData.fit_lookout === 'Fit' ? '☑' : '☐',
      watch_n: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      meds_y: isY(formData.q_meds), meds_n: isN(formData.q_meds),
      
      free_y: formData.free_cond === 'Yes' ? '☑' : '☐',
      free_n: formData.free_cond === 'No' ? '☑' : '☐',
      rest_desc: formData.restrictions === 'Yes' ? formData.rest_desc || "" : "",
      
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      cert_auth: formData.cert_auth || "",
      date: formData.date || "",
      exp_date: formData.exp_date || "",

      // ==========================================
      // 3. PERSONAL DECLARATION (42 PERTANYAAN)
      // ==========================================
      ddmmyy: ddmmyy,
      ddmmyyyy: formData.date || "",
      
      i_q1_y: isY(formData.mh_eye), i_q1_n: isN(formData.mh_eye),
      i_q2_y: isY(formData.mh_hbp), i_q2_n: isN(formData.mh_hbp),
      i_q3_y: isY(formData.mh_heart), i_q3_n: isN(formData.mh_heart),
      i_q4_y: isY(formData.mh_surgery), i_q4_n: isN(formData.mh_surgery),
      i_q5_y: formData.cv_varicose ? (formData.cv_varicose === 'Abnormal' ? '☑' : '☐') : '☐', i_q5_n: formData.cv_varicose ? (formData.cv_varicose !== 'Abnormal' ? '☑' : '☐') : '☐',
      i_q6_y: isY(formData.mh_asthma), i_q6_n: isN(formData.mh_asthma),
      i_q7_y: isY(formData.mh_blood), i_q7_n: isN(formData.mh_blood),
      i_q8_y: isY(formData.mh_diabetes), i_q8_n: isN(formData.mh_diabetes),
      i_q9_y: isY(formData.mh_thyroid), i_q9_n: isN(formData.mh_thyroid),
      i_q10_y: isY(formData.mh_ulcer), i_q10_n: isN(formData.mh_ulcer),
      i_q11_y: isY(formData.mh_kidney), i_q11_n: isN(formData.mh_kidney),
      i_q12_y: isY(formData.mh_skin), i_q12_n: isN(formData.mh_skin),
      i_q13_y: isY(formData.mh_skin), i_q13_n: isN(formData.mh_skin),
      i_q14_y: isY(formData.mh_hep), i_q14_n: isN(formData.mh_hep),
      i_q15_y: formData.al_hernia ? (formData.al_hernia === 'Abnormal' ? '☑' : '☐') : '☐', i_q15_n: formData.al_hernia ? (formData.al_hernia !== 'Abnormal' ? '☑' : '☐') : '☐',
      i_q16_y: formData.gu_gen ? (formData.gu_gen === 'Abnormal' ? '☑' : '☐') : '☐', i_q16_n: formData.gu_gen ? (formData.gu_gen !== 'Abnormal' ? '☑' : '☐') : '☐',
      
      i_q17_y: isFemale && formData.f_preg_no && parseInt(formData.f_preg_no) > 0 ? '☑' : '☐', 
      i_q17_n: isFemale && formData.f_preg_no && parseInt(formData.f_preg_no) === 0 ? '☑' : '☐', 
      
      i_q18_y: isY(formData.q_stress), i_q18_n: isN(formData.q_stress),
      i_q19_y: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☑' : '☐', i_q19_n: (formData.q_smoke === 'No' && formData.q_alcohol === 'No') ? '☑' : '☐',
      i_q20_y: isY(formData.mh_surgery), i_q20_n: isN(formData.mh_surgery),
      i_q21_y: isY(formData.mh_epilepsy), i_q21_n: isN(formData.mh_epilepsy),
      i_q22_y: isY(formData.mh_fainting), i_q22_n: isN(formData.mh_fainting),
      i_q23_y: isY(formData.mh_fainting), i_q23_n: isN(formData.mh_fainting),
      i_q24_y: isY(hasMentalIssue), i_q24_n: isN(hasMentalIssue),
      i_q25_y: isY(hasMentalIssue), i_q25_n: isN(hasMentalIssue),
      i_q26_y: isY(hasMentalIssue), i_q26_n: isN(hasMentalIssue),
      i_q27_y: isY(hasCnsIssue), i_q27_n: isN(hasCnsIssue),
      i_q28_y: isY(hasCnsIssue), i_q28_n: isN(hasCnsIssue),
      i_q29_y: isY(formData.mh_headache), i_q29_n: isN(formData.mh_headache),
      i_q30_y: isY(formData.mh_ear), i_q30_n: isN(formData.mh_ear),
      i_q31_y: isY(formData.mh_musculo), i_q31_n: isN(formData.mh_musculo),
      i_q32_y: isY(formData.mh_rheumatism), i_q32_n: isN(formData.mh_rheumatism),
      i_q33_y: formData.ms_limbs ? (formData.ms_limbs === 'Abnormal' ? '☑' : '☐') : '☐', i_q33_n: formData.ms_limbs ? (formData.ms_limbs !== 'Abnormal' ? '☑' : '☐') : '☐',
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
      me_periodic: formData.reason_exam === 'Periodic' ? '☑' : '☐',
      me_other: formData.reason_exam === 'Other' ? '☑' : '☐',

      bv_unc: formData.bv_unc || "", bv_cor: formData.bv_cor || "",
      nearr_unc: formData.nearr_unc || "", nearl_unc: formData.nearl_unc || "",
      near_bv_unc: formData.near_bv_unc || "",
      nearr_cor: formData.nearr_cor || "", nearl_cor: formData.nearl_cor || "",
      near_bv_cor: formData.near_bv_cor || "",

      vf_r_n: isExN(eyeStatus), vf_r_d: isExA(eyeStatus),
      vf_l_n: isExN(eyeStatus), vf_l_d: isExA(eyeStatus),

      cv_n: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_db: '☐', 
      cv_df: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',

      // Audiometri
      r05: formData.r05 || formData.r500 || "", r1: formData.r1 || "", r2: formData.r2 || "", r3: formData.r3 || "", r4: formData.r4 || "", r6: formData.r6 || "",
      l05: formData.l05 || formData.l500 || "", l1: formData.l1 || "", l2: formData.l2 || "", l3: formData.l3 || "", l4: formData.l4 || "", l6: formData.l6 || "",
      
      sw_r_n: formData.hear_r === 'Normal' ? '☑' : '☐', sw_r_w: formData.hear_r === 'Abnormal' ? '☑' : '☐',
      sw_l_n: formData.hear_l === 'Normal' ? '☑' : '☐', sw_l_w: formData.hear_l === 'Abnormal' ? '☑' : '☐',

      h: formData.height || "", w: formData.weight || "",
      p: formData.pulse || "", rhyt: formData.rhyt || "",
      bp_sys: bp_sys, bp_dia: bp_dia,
      
      ur_sugar: formData.ur_sugar || "", albumin: formData.albumin || "",

      // PEMERIKSAAN FISIK KLINIS (ROLL-UP MURNI DINAMIS)
      head_n: isExN(headStatus), head_a: isExA(headStatus),
      ent_n: isExN(entStatus), ent_a: isExA(entStatus),
      oral_n: isExN(oralStatus), oral_a: isExA(oralStatus),
      ear_n: isExN(earStatus), ear_a: isExA(earStatus),
      tymp_n: isExN(tympStatus), tymp_a: isExA(tympStatus),
      eye_n: isExN(eyeStatus), eye_a: isExA(eyeStatus),
      oph_n: isExN(ophStatus), oph_a: isExA(ophStatus),
      pupil_n: isExN(pupilStatus), pupil_a: isExA(pupilStatus),
      eyem_n: isExN(eyemStatus), eyem_a: isExA(eyemStatus),
      lung_n: isExN(lungStatus), lung_a: isExA(lungStatus),
      breast_n: isExN(breastStatus), breast_a: isExA(breastStatus),
      heart_n: isExN(heartStatus), heart_a: isExA(heartStatus),
      
      var_n: isExN(varStatus), var_a: isExA(varStatus),
      vasc_n: isExN(vascStatus), vasc_a: isExA(vascStatus),
      abd_n: isExN(abdStatus), abd_a: isExA(abdStatus),
      hern_n: isExN(hernStatus), hern_a: isExA(hernStatus),
      anus_n: isExN(anusStatus), anus_a: isExA(anusStatus),
      gu_n: isExN(guStatus), gu_a: isExA(guStatus),
      ext_n: isExN(extStatus), ext_a: isExA(extStatus),
      spine_n: isExN(spineStatus), spine_a: isExA(spineStatus),
      neuro_n: isExN(neuroStatus), neuro_a: isExA(neuroStatus),
      psych_n: isExN(hasMentalIssue ? (hasMentalIssue === 'Yes' ? 'Abnormal' : 'Normal') : null), psych_a: isExA(hasMentalIssue ? (hasMentalIssue === 'Yes' ? 'Abnormal' : 'Normal') : null),
      gen_n: isExN(formData.gen_app ? (formData.gen_app === 'Abnormal' ? 'Abnormal' : 'Normal') : null), gen_a: isExA(formData.gen_app ? (formData.gen_app === 'Abnormal' ? 'Abnormal' : 'Normal') : null),
      skin_n: isExN(skinStatus), skin_a: isExA(skinStatus),

      // Laboratorium
      xray_np: !formData.xray ? '☑' : '☐', xray_n: formData.xray === 'Normal' ? '☑' : '☐', xray_a: formData.xray === 'Abnormal' ? '☑' : '☐',
      date_xray: formData.date_xray || formData.date || "", xray_res: formData.des_abnor || "",
      
      lab_hb: formData.lab_hb || "", lab_sr: formData.lab_sr || "",
      hbab_p: formData.hep_b_ab === 'Positive' ? '☑' : '☐', hbab_n: formData.hep_b_ab === 'Negative' ? '☑' : '☐',
      hbag_p: formData.hep_b_ag === 'Positive' ? '☑' : '☐', hbag_n: formData.hep_b_ag === 'Negative' ? '☑' : '☐',
      
      bs_np: formData.stool_bact === 'Not Performed' || !formData.stool_bact ? '☑' : '☐', bs_neg: formData.stool_bact === 'Negative' ? '☑' : '☐', bs_pos: formData.stool_bact === 'Positive' ? '☑' : '☐',
      ps_np: formData.stool_para === 'Not Performed' || !formData.stool_para ? '☑' : '☐', ps_neg: formData.stool_para === 'Negative' ? '☑' : '☐', ps_pos: formData.stool_para === 'Positive' ? '☑' : '☐',
      
      diag: formData.diag || "", hiv_res: formData.hiv_res || "", comments: formData.comments || "",
      
      vac_sat: formData.vaccinated === 'Yes' ? '☑' : '☐', vac_ren: formData.vaccinated === 'No' ? '☑' : '☐', vac_details: formData.vac_details || "",

      // Kesimpulan
      lo_f: formData.fit_lookout === 'Fit' ? '☑' : '☐', lo_u: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      dk_f: formData.fit_deck === 'Fit' ? '☑' : '☐', dk_u: formData.fit_deck === 'Unfit' ? '☑' : '☐',
      en_f: formData.fit_engine === 'Fit' ? '☑' : '☐', en_u: formData.fit_engine === 'Unfit' ? '☑' : '☐',
      ct_f: formData.fit_catering === 'Fit' ? '☑' : '☐', ct_u: formData.fit_catering === 'Unfit' ? '☑' : '☐',
      ot_f: formData.fit_other === 'Fit' ? '☑' : '☐', ot_u: formData.fit_other === 'Unfit' ? '☑' : '☐',

      rest_no: formData.restrictions === 'No' ? '☑' : '☐', rest_yes: formData.restrictions === 'Yes' ? '☑' : '☐',
      action_taken: formData.action_taken || "",
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