import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini sama persis dengan template Word ADNOC Anda
    const fileName = '6. ADNOC Medical Form.docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Mencegah undefined menjadi tulisan "undefined"
    });

    // --- HELPER FUNCTIONS ---
    // 1. Helper Checkbox ADNOC (☑ / ☐)
    const check = (val: any, expected: string | boolean) => val === expected ? '☑' : '☐';
    const checkYes = (val: any) => val === 'Yes' ? '☑' : '☐';
    const checkNo = (val: any) => (val === 'No' || val === undefined || val === '') ? '☑' : '☐'; // Default ke No jika kosong
    
    // 2. Helper Smart Grouping (Otomatis mengisi Normal jika sistem utamanya Normal)
    const getFinding = (sysStatus: string) => sysStatus === 'Normal' ? 'Normal' : (sysStatus === 'Abnormal' ? 'Abnormal' : '');
    const getComment = (sysStatus: string, remark: string) => sysStatus === 'Abnormal' ? (remark || 'Need further evaluation') : '';
    const getReflex = (sysStatus: string) => sysStatus === 'Normal' ? '+' : '';

    // Data Penyakit & Kuesioner
    const isFemale = formData.gender === 'Female';
    const bloodGroup = (formData.bloodGroupType && formData.bloodGroupRh) ? `${formData.bloodGroupType}${formData.bloodGroupRh}` : "";

    doc.render({
      // ==========================================
      // FORM A: IDENTITAS & PEKERJAAN
      // ==========================================
      first_name: formData.firstName || "",
      middle_name: formData.middleName || "", // Tambahkan di UI jika diperlukan
      family_name: formData.familyName || "",
      dob: formData.dob || "",
      gender: formData.gender || "",
      nationality: formData.nationality || "",
      company: formData.company || "",
      position: formData.position || formData.ilo_position || "",
      marital_status: formData.maritalStatus || "", // Tambahkan di UI jika diperlukan
      address: formData.address || "",
      contact_number: formData.contactNumber || "",
      email: formData.email || "", // Tambahkan di UI jika diperlukan
      reason_exam: "Pre-Employment",
      date: formData.date || new Date().toLocaleDateString('id-ID'),

      // Previous Employment (Bisa di-hardcode kosong dulu atau dikembangkan di UI nanti)
      job1: "", comp1: "", from1: "", to1: "",
      job2: "", comp2: "", from2: "", to2: "",
      job3: "", comp3: "", from3: "", to3: "",
      job4: "", comp4: "", from4: "", to4: "",

      // Previous Exposure (Map ke Nature of Work & pertanyaan umum)
      ex_noise: check(formData.nw_heavy, true) || check(formData.mh_ear, 'Yes'),
      ex_metal: '☐', ex_skin: '☐', ex_comp: '☐', ex_chem: '☐',
      ex_rad: check(formData.nw_radiation, true),
      ex_dust: check(formData.nw_confined, true),
      ex_unfit: checkYes(formData.q_omfc),
      ex_dis: '☐', dis_no: '',

      // ==========================================
      // FORM A: FAMILY & PERSONAL HISTORY
      // ==========================================
      // Family History
      fh_heart: checkYes(formData.fm_heart), fh_asthma: checkYes(formData.fm_asthma),
      fh_diab: checkYes(formData.fm_diabetes), fh_hbp: checkYes(formData.fm_hypertension),
      fh_tb: checkYes(formData.fm_asthma), fh_allergy: checkYes(formData.fm_asthma),
      fh_cancer: checkYes(formData.fm_cancer), fh_mental: '☐',
      fh_other: formData.fm_others ? '☑' : '☐', fm_others: formData.fm_others || "",
      
      fa_age: "", fa_state: "", mo_age: "", mo_state: "", sib_age: "", sib_state: "",
      spo_age: "", spo_state: "", chi_age: "", chi_state: "",

      // Personal History (Smart Mapping)
      ph_hbp_y: checkYes(formData.mh_hbp), ph_hbp_n: checkNo(formData.mh_hbp),
      ph_ang_y: checkYes(formData.mh_heart), ph_ang_n: checkNo(formData.mh_heart),
      ph_hrt_y: checkYes(formData.mh_heart), ph_hrt_n: checkNo(formData.mh_heart),
      ph_csurg_y: checkYes(formData.mh_surgery), ph_csurg_n: checkNo(formData.mh_surgery),
      ph_kid_y: checkYes(formData.mh_kidney), ph_kid_n: checkNo(formData.mh_kidney),
      ph_ksto_y: checkYes(formData.mh_kidney), ph_ksto_n: checkNo(formData.mh_kidney),
      ph_anx_y: checkYes(formData.mh_mental), ph_anx_n: checkNo(formData.mh_mental),
      ph_slp_y: checkYes(formData.q_fear), ph_slp_n: checkNo(formData.q_fear),
      ph_asthma_y: checkYes(formData.mh_asthma), ph_asthma_n: checkNo(formData.mh_asthma),
      ph_bron_y: checkYes(formData.mh_asthma), ph_bron_n: checkNo(formData.mh_asthma),
      ph_tb_y: checkYes(formData.mh_asthma), ph_tb_n: checkNo(formData.mh_asthma),
      ph_ulcer_y: checkYes(formData.mh_ulcer), ph_ulcer_n: checkNo(formData.mh_ulcer),
      ph_hep_y: checkYes(formData.mh_hep), ph_hep_n: checkNo(formData.mh_hep),
      ph_piles_y: checkYes(formData.mh_abd_pain), ph_piles_n: checkNo(formData.mh_abd_pain),
      ph_hernia_y: checkYes(formData.mh_abd_pain), ph_hernia_n: checkNo(formData.mh_abd_pain),
      ph_const_y: checkYes(formData.mh_abd_pain), ph_const_n: checkNo(formData.mh_abd_pain),
      ph_diar_y: checkYes(formData.mh_abd_pain), ph_diar_n: checkNo(formData.mh_abd_pain),
      ph_bowel_y: checkYes(formData.mh_ulcer), ph_bowel_n: checkNo(formData.mh_ulcer),
      ph_epil_y: checkYes(formData.mh_epilepsy), ph_epil_n: checkNo(formData.mh_epilepsy),
      ph_stroke_y: checkYes(formData.mh_cns), ph_stroke_n: checkNo(formData.mh_cns),
      ph_mig_y: checkYes(formData.mh_headache), ph_mig_n: checkNo(formData.mh_headache),
      ph_vert_y: checkYes(formData.mh_fainting), ph_vert_n: checkNo(formData.mh_fainting),
      ph_back_y: checkYes(formData.mh_musculo), ph_back_n: checkNo(formData.mh_musculo),
      ph_joint_y: checkYes(formData.mh_rheumatism), ph_joint_n: checkNo(formData.mh_rheumatism),
      ph_frac_y: checkYes(formData.mh_accident), ph_frac_n: checkNo(formData.mh_accident),
      ph_ecz_y: checkYes(formData.mh_skin), ph_ecz_n: checkNo(formData.mh_skin),
      ph_viti_y: checkYes(formData.mh_skin), ph_viti_n: checkNo(formData.mh_skin),
      ph_eye1_y: checkYes(formData.mh_eye), ph_eye1_n: checkNo(formData.mh_eye),
      ph_eye2_y: checkYes(formData.mh_eye), ph_eye2_n: checkNo(formData.mh_eye),
      ph_hear1_y: checkYes(formData.mh_ear), ph_hear1_n: checkNo(formData.mh_ear),
      ph_tin_y: checkYes(formData.mh_ear), ph_tin_n: checkNo(formData.mh_ear),
      ph_ear2_y: checkYes(formData.mh_ear), ph_ear2_n: checkNo(formData.mh_ear),
      ph_diab_y: checkYes(formData.mh_diabetes), ph_diab_n: checkNo(formData.mh_diabetes),
      diab_ins: '☐', diab_non: '☐', // Dibiarkan kosong/opsional
      ph_thyr_y: checkYes(formData.mh_thyroid), ph_thyr_n: checkNo(formData.mh_thyroid),
      ph_ane_y: checkYes(formData.mh_blood), ph_ane_n: checkNo(formData.mh_blood),
      ph_thal_y: checkYes(formData.mh_blood), ph_thal_n: checkNo(formData.mh_blood),
      ph_sick_y: checkYes(formData.mh_blood), ph_sick_n: checkNo(formData.mh_blood),
      ph_alrg_y: checkYes(formData.mh_skin), ph_alrg_n: checkNo(formData.mh_skin),
      ph_meds_y: checkYes(formData.q_meds), ph_meds_n: checkNo(formData.q_meds),
      ph_hosp1_y: checkYes(formData.q_illness), ph_hosp1_n: checkNo(formData.q_illness),
      ph_hosp2_y: '☐', ph_hosp2_n: '☑',
      ph_oth_y: formData.mh_others ? '☑' : '☐', ph_oth_n: formData.mh_others ? '☐' : '☑',
      ph_smoke_y: checkYes(formData.q_smoke), ph_smoke_n: checkNo(formData.q_smoke),
      ph_alc_y: checkYes(formData.q_alcohol), ph_alc_n: checkNo(formData.q_alcohol),
      ph_drug_y: checkYes(formData.mh_drug), ph_drug_n: checkNo(formData.mh_drug),
      ph_skin_y: checkYes(formData.mh_skin), ph_skin_n: checkNo(formData.mh_skin),

      // Females Section
      f_lmp: isFemale ? (formData.f_lmp || "N/A") : "N/A",
      f_heavy_y: isFemale ? '☐' : '☐', f_heavy_n: isFemale ? '☑' : '☐',
      f_reg_y: isFemale ? '☑' : '☐', f_reg_n: isFemale ? '☐' : '☐',
      f_pain_y: isFemale ? '☐' : '☐', f_pain_n: isFemale ? '☑' : '☐',
      f_pill_y: isFemale ? '☐' : '☐', f_pill_n: isFemale ? '☑' : '☐',
      f_preg_no: isFemale ? (formData.f_preg_no || "0") : "N/A",
      f_live_birth: isFemale ? (formData.f_live_birth || "0") : "N/A",

      // ==========================================
      // FORM B: PHYSICAL ASSESSMENT (SMART GROUPING)
      // ==========================================
      g_m: check(formData.gender, 'Male'), g_f: check(formData.gender, 'Female'),
      illness_last: "Nil",

      // Cardiovascular
      cv_pulse: getFinding(formData.cardio), cv_bp: getFinding(formData.cardio), 
      cv_apex: getFinding(formData.cardio), cv_sounds: getFinding(formData.cardio), 
      cv_murmurs: getFinding(formData.cardio), cv_varicose: getFinding(formData.vas_s),
      cv_comm: getComment(formData.cardio, formData.cardio_r),

      // Respiratory
      rs_nasal: getFinding(formData.ent), rs_thyroid: getFinding(formData.ent),
      rs_trachea: getFinding(formData.chest), rs_chest: getFinding(formData.chest),
      rs_perc: getFinding(formData.chest), rs_air: getFinding(formData.chest),
      rs_breath: getFinding(formData.chest), rs_advent: getFinding(formData.chest),
      rs_comm: getComment(formData.chest, formData.chest_r),

      // Alimentary
      al_teeth: getFinding(formData.oral_c), al_tongue: getFinding(formData.oral_c),
      al_abd: getFinding(formData.abdom), al_liver: getFinding(formData.abdom),
      al_spleen: getFinding(formData.abdom), al_lymph: getFinding(formData.abdom),
      al_hernia: getFinding(formData.her_or), al_anus: getFinding(formData.anus_r),
      al_comm: getComment(formData.abdom, formData.abdom_r),

      // Genito-Urinary
      gu_kidney: getFinding(formData.genito), gu_gen: getFinding(formData.genito),
      gu_comm: getComment(formData.genito, formData.genito_r),

      // Integumentary
      in_hair: getFinding(formData.skin), in_skin: getFinding(formData.skin), in_nails: getFinding(formData.skin),
      in_comm: getComment(formData.skin, formData.skin_r),

      // Musculo-skeletal
      ms_hands: getFinding(formData.extrem), ms_limbs: getFinding(formData.extrem),
      ms_back: getFinding(formData.musculo), ms_joints: getFinding(formData.musculo), ms_inj: getFinding(formData.musculo),
      ms_comm: getComment(formData.musculo, formData.musculo_r),

      // Nervous System
      cn_1: getFinding(formData.c_n_s), cn_2: getFinding(formData.c_n_s), cn_3: getFinding(formData.c_n_s),
      cn_4: getFinding(formData.c_n_s), cn_5: getFinding(formData.c_n_s), cn_6: getFinding(formData.c_n_s),
      cn_7: getFinding(formData.c_n_s), cn_8: getFinding(formData.c_n_s), cn_9: getFinding(formData.c_n_s),
      cn_10: getFinding(formData.c_n_s), cn_11: getFinding(formData.c_n_s), cn_12: getFinding(formData.c_n_s),
      
      r_bl_r: getReflex(formData.c_n_s), r_tl_r: getReflex(formData.c_n_s), r_sup_r: getReflex(formData.c_n_s),
      r_kn_r: getReflex(formData.c_n_s), r_an_r: getReflex(formData.c_n_s), r_pl_r: getReflex(formData.c_n_s),
      r_bl_l: getReflex(formData.c_n_s), r_tl_l: getReflex(formData.c_n_s), r_sup_l: getReflex(formData.c_n_s),
      r_kn_l: getReflex(formData.c_n_s), r_an_l: getReflex(formData.c_n_s), r_pl_l: getReflex(formData.c_n_s),
      
      ns_power: getFinding(formData.c_n_s), ns_tone: getFinding(formData.c_n_s), ns_coord: getFinding(formData.c_n_s),
      ns_sens: getFinding(formData.c_n_s), ns_emot: getFinding(formData.c_n_s), ns_intel: getFinding(formData.c_n_s),
      ns_comm: getComment(formData.c_n_s, formData.c_n_s_r),

      // Ears & Eyes
      ea_meatus: getFinding(formData.ent), ea_drums: getFinding(formData.ent),
      ea_wr_r: getFinding(formData.ent), ea_wr_l: getFinding(formData.ent),
      ea_hr_r: getFinding(formData.ent), ea_hr_l: getFinding(formData.ent), ea_comm: getComment(formData.ent, formData.ent_r),
      
      ey_light: getFinding(formData.eyes), ey_accom: getFinding(formData.eyes),
      ey_nyst: getFinding(formData.eyes), ey_fundi: getFinding(formData.eyes), ey_comm: getComment(formData.eyes, formData.eyes_r),

      // Vision Acuity & Color
      nearr_unc: formData.nearr_unc || "", disr_unc: formData.disr_unc || "",
      nearl_unc: formData.nearl_unc || "", disl_unc: formData.disl_unc || "",
      nearr_cor: formData.nearr_cor || "", disr_cor: formData.disr_cor || "",
      nearl_cor: formData.nearl_cor || "", disl_cor: formData.disl_cor || "",
      cv_n: check(formData.color_vision, 'Normal'), 
      cv_df: check(formData.color_vision, 'Total') || check(formData.color_vision, 'Partial'),

      // ==========================================
      // MISCELLANEOUS & PHYSICIAN CONCLUSION
      // ==========================================
      height: formData.height || "", weight: formData.weight || "", bmi: formData.bmi || "",
      pulse: formData.pulse || "", bp_sys: formData.bloodPressure?.split('/')[0] || "", bp_dia: formData.bloodPressure?.split('/')[1] || "",
      chest_exp: formData.chest_exp || "", ft_fvc: formData.ft_fvc || "", ft_fev1: formData.ft_fev1 || "",
      xray_res: formData.xray || "", oht_result: formData.oht_result || "", diag: formData.diag || "",
      bg_rh: bloodGroup, lab_hb: formData.lab_hb || "",
      ur_sugar: formData.ur_sugar || "", albumin: formData.albumin || "",
      hep_b: formData.hep_b_ag || formData.hep_b_ab || "", hep_c: "", hep_a: "",

      fit_job: check(formData.fit_lookout, 'Fit') || check(formData.free_cond, 'Yes') || check(formData.q_fit, 'Yes') ? '☑' : '☐',
      unfit_job: check(formData.fit_lookout, 'Unfit') || check(formData.q_fit, 'No') ? '☑' : '☐',
      temp_unfit: '☐',
      eps: formData.eps || "",
      doc_contact: formData.contactNumber || "",
      hospital: formData.hospital || "",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="adnoc_terisi.docx"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map((e: any) => e.properties.explanation).join(", ");
        return NextResponse.json({ error: `Format template salah: ${errorMessages}` }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}