import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini persis dengan template Word QatarEnergy Anda
    const fileName = '4. QatarEnergy LNG Medical Department.docx'; 
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
    const isNS = (val: any) => (val === 'Not Sure') ? '☑' : '☐';
    
    // Checkbox Renderers untuk Roll-Up Logic
    const isChecked = (cond: boolean) => cond ? '☑' : '☐';
    const isUnchecked = (cond: boolean) => cond ? '☐' : '☑';

    // Helper Tabel Laboratorium Qatar (Otomatis deteksi Normal/Abnormal dari isian)
    const isLabN = (val: any) => (val && val !== 'Abnormal' && val !== 'Positive' && val !== 'Reactive') ? '☑' : '☐';
    const isLabA = (val: any) => (val === 'Abnormal' || val === 'Positive' || val === 'Reactive') ? '☑' : '☐';

    // Format Tanggal Lahir (DD/MM/YY)
    let dobFormatted = formData.dob || "";
    if (formData.dob) {
      const parts = formData.dob.split('-');
      if (parts.length === 3) {
        dobFormatted = `${parts[2]}/${parts[1]}/${parts[0].substring(2)}`;
      }
    }

    const isFemale = formData.gender === 'Female';

    // --- ROLL-UP LOGIC UNTUK PHYSICAL EXAM (SMART UI) ---
    // Logika: Jika ada salah satu sub-organ yang "Abnormal", maka kategori Qatar menjadi "Abnormal"
    const checkAbnormal = (fields: string[]) => fields.some(field => formData[field] === 'Abnormal');
    
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

    // --- RENDER VARIABEL 100% MENGIKUTI TEMPLATE QATAR ENERGY ---
    doc.render({
      // ==========================================
      // 1. IDENTITAS & SIFAT PEKERJAAN (NATURE OF WORK)
      // ==========================================
      first_name: formData.firstName || "",
      family_name: formData.familyName || "",
      ddmmyy: dobFormatted,
      id_passport: formData.idPassport || "",
      nationality: formData.nationality || "",
      g_m: formData.gender === 'Male' ? '☑' : '☐',
      g_f: isFemale ? '☑' : '☐',
      position: formData.position || formData.ilo_position || "",
      work_location: formData.workLocation || "",
      department: formData.department || "",
      company: formData.company || "",
      contact_number: formData.contactNumber || "",
      address: formData.address || "",

      // Nature of Work
      nw_confined: isY(formData.nw_confined),
      dvg: isY(formData.nw_diving),
      hanging: isY(formData.nw_hanging),
      sew_d: isY(formData.nw_sewage),
      nw_height: isY(formData.nw_height),
      s_r: isY(formData.nw_swing),
      emer_r: isY(formData.nw_emergency),
      food_h: isY(formData.nw_food),
      o_h_e: isY(formData.nw_heavy),
      o_w: isY(formData.nw_office),
      l_r: isY(formData.nw_radiation),
      othersy: formData.nw_others ? '☑' : '☐',
      others_ifyes: formData.nw_others || "",

      // ==========================================
      // 2. VACCINATION HISTORY
      // ==========================================
      v_hepa_y: isY(formData.vac_hepa), v_hepa_n: isN(formData.vac_hepa), v_hepa_s: isNS(formData.vac_hepa),
      v_hepb_y: isY(formData.vac_hepb), v_hepb_n: isN(formData.vac_hepb), v_hepb_s: isNS(formData.vac_hepb),
      c19_y: isY(formData.vac_c19), c19_n: isN(formData.vac_c19), c19_s: isNS(formData.vac_c19),
      tet_y: isY(formData.vac_tet), tet_n: isN(formData.vac_tet), tet_s: isNS(formData.vac_tet),
      mea_y: isY(formData.vac_mea), mea_n: isN(formData.vac_mea), mea_s: isNS(formData.vac_mea),
      chick_y: isY(formData.vac_chick), chick_n: isN(formData.vac_chick), chick_s: isNS(formData.vac_chick),
      typh_y: isY(formData.vac_typh), typh_n: isN(formData.vac_typh), typh_s: isNS(formData.vac_typh),

      // ==========================================
      // 3. MEDICAL & FAMILY HISTORY
      // ==========================================
      mh_blood_y: isY(formData.mh_blood), mh_blood_n: isN(formData.mh_blood),
      cns_y: isY(formData.mh_cns), cns_n: isN(formData.mh_cns),
      c_asma_y: isY(formData.mh_asthma), c_asma_n: isN(formData.mh_asthma),
      p_ulc_y: isY(formData.mh_ulcer), p_ulc_n: isN(formData.mh_ulcer),
      h_dis_y: isY(formData.mh_heart), h_dis_n: isN(formData.mh_heart),
      std_y: isY(formData.mh_std), std_n: isN(formData.mh_std),
      epil_y: isY(formData.mh_epilepsy), epil_n: isN(formData.mh_epilepsy),
      mh_hbp_y: isY(formData.mh_hbp), mh_hbp_n: isN(formData.mh_hbp),
      hep_y: isY(formData.mh_hep), hep_n: isN(formData.mh_hep),
      work_y: isY(formData.mh_accident), work_n: isN(formData.mh_accident),
      mh_dia_y: isY(formData.mh_diabetes), mh_dia_n: isN(formData.mh_diabetes),
      m_sur_y: isY(formData.mh_surgery), m_sur_n: isN(formData.mh_surgery),
      ears_y: isY(formData.mh_ear), ears_n: isN(formData.mh_ear),
      k_b_t_y: isY(formData.mh_kidney), k_b_t_n: isN(formData.mh_kidney),
      cancer_y: isY(formData.mh_cancer), cancer_n: isN(formData.mh_cancer),
      r_head_y: isY(formData.mh_headache), r_head_n: isN(formData.mh_headache),
      r_art_y: isY(formData.mh_rheumatism), r_art_n: isN(formData.mh_rheumatism),
      drug_a_y: isY(formData.mh_drug), drug_a_n: isN(formData.mh_drug),
      r_a_p_y: isY(formData.mh_abd_pain), r_a_p_n: isN(formData.mh_abd_pain),
      f_lc_y: isY(formData.mh_fainting), f_lc_n: isN(formData.mh_fainting),
      t_dis_y: isY(formData.mh_thyroid), t_dis_n: isN(formData.mh_thyroid),
      s_dis_y: isY(formData.mh_skin), s_dis_n: isN(formData.mh_skin),
      v_dis_y: isY(formData.mh_vascular), v_dis_n: isN(formData.mh_vascular),
      
      c_preg_y: (isFemale && parseInt(formData.f_preg_no || '0') > 0) ? '☑' : '☐',
      c_preg_n: (!isFemale || !formData.f_preg_no || formData.f_preg_no === '0') ? '☑' : '☐',
      
      m_skel_y: isY(formData.mh_musculo), m_skel_n: isN(formData.mh_musculo),
      eye_con_y: isY(formData.mh_eye), eye_con_n: isN(formData.mh_eye),
      h_adm_y: isY(formData.q_illness), h_adm_n: isN(formData.q_illness),
      m_ill_y: isY(formData.mh_mental), m_ill_n: isN(formData.mh_mental),
      others_mh: formData.mh_others || "",

      // Family History
      dia_y: isY(formData.fm_diabetes), dia_n: isN(formData.fm_diabetes),
      fm_h_dis_y: isY(formData.fm_heart), fm_h_dis_n: isN(formData.fm_heart),
      hyp_y: isY(formData.fm_hypertension), hyp_n: isN(formData.fm_hypertension),
      ast_y: isY(formData.fm_asthma), ast_n: isN(formData.fm_asthma),
      fmepil_y: isY(formData.fm_epilepsy), fmepil_n: isN(formData.fm_epilepsy),
      can_t_y: isY(formData.fm_cancer), can_t_n: isN(formData.fm_cancer),
      others_fm: formData.fm_others || "",

      // ==========================================
      // 4. GENERAL QUESTIONS
      // ==========================================
      illness_y: isY(formData.q_illness), illness_n: isN(formData.q_illness),
      medev_why: formData.q_medevac_text || "",
      medev_y: isY(formData.q_medevac), medev_n: isN(formData.q_medevac),
      
      curren_ifyes: formData.q_meds_text || "",
      curren_y: isY(formData.q_meds), curren_n: isN(formData.q_meds),
      
      q_smoke_text: formData.q_smoke === 'Yes' ? formData.q_smoke_text : "",
      hl_hf: formData.q_smoke === 'Yes' ? formData.q_smoke_freq : "",
      q_smoke_y: isY(formData.q_smoke), q_smoke_n: isN(formData.q_smoke),
      
      answer_ifyes: formData.q_alcohol_text || "",
      alc_y: isY(formData.q_alcohol), alc_n: isN(formData.q_alcohol),
      
      fit_y: isY(formData.q_fit), fit_n: isN(formData.q_fit),
      fear_y: isY(formData.q_fear), fear_n: isN(formData.q_fear),
      stress_y: isY(formData.q_stress), stress_n: isN(formData.q_stress),
      score: formData.q_stress_score || "",
      strfull_y: isY(formData.q_stressful), strfull_n: isN(formData.q_stressful),
      
      omfc_ifyes: formData.q_omfc_text || "",
      qmfc_y: isY(formData.q_omfc), qmfc_n: isN(formData.q_omfc),
      
      date: formData.date || "",

      // ==========================================
      // 5. PHYSICAL EXAMINATION (SECTION B - MENGGUNAKAN ROLL UP LOGIC)
      // ==========================================
      eyes_n: isUnchecked(eyeAbn), eyes_a: isChecked(eyeAbn), eyes_r: formData.ey_comm || "",
      ent_n: isUnchecked(entAbn), ent_a: isChecked(entAbn), ent_r: [formData.rs_comm, formData.ea_comm].filter(Boolean).join('. '),
      oral_c_n: isUnchecked(oralAbn), oral_c_a: isChecked(oralAbn), oral_c_r: formData.al_comm || "",
      chest_n: isUnchecked(chestAbn), chest_a: isChecked(chestAbn), chest_r: formData.rs_comm || "",
      cardio_n: isUnchecked(cardioAbn), cardio_a: isChecked(cardioAbn), cardio_r: formData.cv_comm || "",
      abdom_n: isUnchecked(abdAbn), abdom_a: isChecked(abdAbn), abdom_r: formData.al_comm || "",
      her_or_n: isUnchecked(hernAbn), her_or_a: isChecked(hernAbn), her_or_r: formData.al_comm || "",
      anus_r_n: isUnchecked(anusAbn), anus_r_a: isChecked(anusAbn), anus_r_r: formData.al_comm || "",
      genito_n: isUnchecked(guAbn), genito_a: isChecked(guAbn), genito_r: formData.gu_comm || "",
      extrem_n: isUnchecked(extAbn), extrem_a: isChecked(extAbn), extrem_r: formData.ms_comm || "",
      musculo_n: isUnchecked(muscAbn), musculo_a: isChecked(muscAbn), musculo_r: formData.ms_comm || "",
      skin_n: isUnchecked(skinAbn), skin_a: isChecked(skinAbn), skin_r: formData.in_comm || "",
      vas_s_n: isUnchecked(varAbn), vas_s_a: isChecked(varAbn), vas_s_r: formData.cv_comm || "",
      c_n_s_n: isUnchecked(cnsAbn), c_n_s_a: isChecked(cnsAbn), c_n_s_r: formData.ns_comm || "",

      // ==========================================
      // 6. LABORATORY REPORTS (SECTION B)
      // ==========================================
      fbg_n: isLabN(formData.val_sugar), fbg_a: isLabA(formData.val_sugar), fbg_r: formData.val_sugar || "",
      cbc_n: isLabN(formData.lab_hb), cbc_a: isLabA(formData.lab_hb), cbc_r: formData.lab_hb ? `Hb: ${formData.lab_hb}` : "",
      tcho_n: isLabN(formData.val_chol), tcho_a: isLabA(formData.val_chol), tcho_r: formData.val_chol || "",
      lft_n: isLabN(formData.val_sgot), lft_a: isLabA(formData.val_sgot), lft_r: formData.val_sgot ? `SGOT: ${formData.val_sgot}` : "",
      rft_n: isLabN(formData.val_creat), rft_a: isLabA(formData.val_creat), rft_r: formData.val_creat || "",
      urin_n: isLabN(formData.ur_sugar), urin_a: isLabA(formData.ur_sugar), urin_r: formData.ur_sugar ? `Sugar: ${formData.ur_sugar}` : "",
      audi_n: isLabN(formData.oht_result), audi_a: isLabA(formData.oht_result), audi_r: formData.oht_result || "",
      spir_n: isLabN(formData.ft_fvc), spir_a: isLabA(formData.ft_fvc), spir_r: formData.ft_fvc ? `FVC: ${formData.ft_fvc}` : "",
      ecg_n: isLabN(formData.diag), ecg_a: isLabA(formData.diag), ecg_r: formData.diag || "",
      
      xrey_n: formData.xray === 'Normal' ? '☑' : '☐', xrey_a: formData.xray === 'Abnormal' ? '☑' : '☐', xrey_r: formData.des_abnor || "",
      
      idt_n: isLabN(formData.hiv_res), idt_a: isLabA(formData.hiv_res), idt_r: formData.hiv_res || "",
      hha1_n: '☐', hha1_a: '☐', hha1_r: "",
      ffh_n: isLabN(formData.stool_bact), ffh_a: isLabA(formData.stool_bact), ffh_r: formData.stool_bact || "",

      // ==========================================
      // 7. BIOMETRICS & VISION (SECTION C)
      // ==========================================
      h: formData.height || "",
      w: formData.weight || "",
      weist: formData.waist || "",
      bmi: formData.bmi || "",
      p: formData.pulse || "",
      b_p: formData.bloodPressure || "",
      
      disr_unc: formData.disr_unc || "-", disl_unc: formData.disl_unc || "-",
      nearr_unc: formData.nearr_unc || "-", nearl_unc: formData.nearl_unc || "-",
      bv_unc: formData.bv_unc || "-",
      
      disr_cor: formData.disr_cor || "-", disl_cor: formData.disl_cor || "-",
      nearr_cor: formData.nearr_cor || "-", nearl_cor: formData.nearl_cor || "-",
      bv_cor: formData.bv_cor || "-",
      
      cv_nor: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_pcb: formData.color_vision === 'Partial' ? '☑' : '☐',
      cv_tcb: formData.color_vision === 'Total' ? '☑' : '☐',
      
      bg_type: formData.bloodGroupType || "",
      bg_rh: formData.bloodGroupRh || "",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="QatarEnergy_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}