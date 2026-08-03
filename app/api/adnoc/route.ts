import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    const fileName = '6. ADNOC Medical Form.docx'; 
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

    // --- LOGIKA PEMISAH NAMA DEPAN & TENGAH KHUSUS ADNOC ---
    let realFirstName = formData.firstName || "";
    const middle = formData.middleName || "";
    if (middle && realFirstName.endsWith(middle)) {
        realFirstName = realFirstName.slice(0, -(middle.length)).trim();
    }

    // --- PEMISAH TEKANAN DARAH (120/80 menjadi Sys: 120, Dia: 80) ---
    const bpParts = (formData.bloodPressure || "").split("/");
    const bp_sys = bpParts[0] || "";
    const bp_dia = bpParts[1] || "";

    // --- HELPER FUNCTIONS ---
    const isY = (val: any) => (val === 'Yes' || val === true) ? '☑' : '☐';
    const isN = (val: any) => (val === 'No' || val === false || !val) ? '☑' : '☐';
    const getNorm = (status: string) => status === 'Abnormal' ? 'Abnormal' : 'Normal';
    const getRem = (status: string, rem: string) => status === 'Abnormal' ? (rem || 'Abnormal') : '';
    const isFemale = formData.gender === 'Female';

    // --- RENDER VARIABEL 100% MENGIKUTI TEMPLATE WORD ---
    doc.render({
      // 1. IDENTITAS & PEKERJAAN
      first_name: realFirstName,
      middle_name: middle,
      family_name: formData.familyName || "",
      dob: formData.dob || "",
      gender: formData.gender || "",
      nationality: formData.nationality || "",
      company: formData.company || "",
      position: formData.position || formData.ilo_position || "",
      marital_status: formData.maritalStatus || "",
      address: formData.address || "",
      contact_number: formData.contactNumber || "",
      email: formData.email || "",
      reason_exam: "Pre-Employment",

      // Previous Employment (Dikosongkan jika tidak ada di UI)
      job1: "", comp1: "", from1: "", to1: "",
      job2: "", comp2: "", from2: "", to2: "",
      job3: "", comp3: "", from3: "", to3: "",
      job4: "", comp4: "", from4: "", to4: "",

      // 2. EXPOSURE & KELUARGA
      ex_noise: isY(formData.nw_heavy),
      ex_metal: isY(formData.nw_heavy),
      ex_skin: '☐',
      ex_comp: '☐',
      ex_chem: '☐',
      ex_rad: isY(formData.nw_radiation),
      ex_dust: isY(formData.nw_confined),
      ex_unfit: isY(formData.q_omfc),
      ex_dis: '☐', dis_no: "",

      fh_heart: isY(formData.fm_heart),
      fh_asthma: isY(formData.fm_asthma),
      fh_diab: isY(formData.fm_diabetes),
      fh_hbp: isY(formData.fm_hypertension),
      fh_tb: '☐',
      fh_allergy: '☐',
      fh_cancer: isY(formData.fm_cancer),
      fh_mental: '☐',
      fh_other: formData.fm_others ? '☑' : '☐',
      fm_others: formData.fm_others || '',
      
      // Umur Keluarga (Kosong)
      fa_age: "", fa_state: "", spo_age: "", spo_state: "",
      mo_age: "", mo_state: "", chi_age: "", chi_state: "",
      sib_age: "", sib_state: "",

      // 3. RIWAYAT MEDIS PRIBADI (PERSONAL HISTORY)
      ph_hbp_y: isY(formData.mh_hbp), ph_hbp_n: isN(formData.mh_hbp),
      ph_ang_y: isY(formData.mh_heart), ph_ang_n: isN(formData.mh_heart),
      ph_hrt_y: isY(formData.mh_heart), ph_hrt_n: isN(formData.mh_heart),
      ph_csurg_y: isY(formData.mh_surgery), ph_csurg_n: isN(formData.mh_surgery),
      ph_asthma_y: isY(formData.mh_asthma), ph_asthma_n: isN(formData.mh_asthma),
      ph_bron_y: isY(formData.mh_asthma), ph_bron_n: isN(formData.mh_asthma),
      ph_tb_y: isY(formData.mh_asthma), ph_tb_n: isN(formData.mh_asthma),
      ph_ulcer_y: isY(formData.mh_ulcer), ph_ulcer_n: isN(formData.mh_ulcer),
      ph_hep_y: isY(formData.mh_hep), ph_hep_n: isN(formData.mh_hep),
      ph_piles_y: isY(formData.mh_abd_pain), ph_piles_n: isN(formData.mh_abd_pain),
      ph_hernia_y: isY(formData.mh_abd_pain), ph_hernia_n: isN(formData.mh_abd_pain),
      ph_const_y: isY(formData.mh_abd_pain), ph_const_n: isN(formData.mh_abd_pain),
      ph_diar_y: isY(formData.mh_abd_pain), ph_diar_n: isN(formData.mh_abd_pain),
      ph_bowel_y: isY(formData.mh_ulcer), ph_bowel_n: isN(formData.mh_ulcer),
      ph_epil_y: isY(formData.mh_epilepsy), ph_epil_n: isN(formData.mh_epilepsy),
      ph_stroke_y: isY(formData.mh_cns), ph_stroke_n: isN(formData.mh_cns),
      ph_mig_y: isY(formData.mh_headache), ph_mig_n: isN(formData.mh_headache),
      ph_vert_y: isY(formData.mh_fainting), ph_vert_n: isN(formData.mh_fainting),
      ph_back_y: isY(formData.mh_musculo), ph_back_n: isN(formData.mh_musculo),
      ph_joint_y: isY(formData.mh_rheumatism), ph_joint_n: isN(formData.mh_rheumatism),
      ph_frac_y: isY(formData.mh_accident), ph_frac_n: isN(formData.mh_accident),
      ph_ecz_y: isY(formData.mh_skin), ph_ecz_n: isN(formData.mh_skin),
      ph_viti_y: isY(formData.mh_skin), ph_viti_n: isN(formData.mh_skin),

      ph_kid_y: isY(formData.mh_kidney), ph_kid_n: isN(formData.mh_kidney),
      ph_ksto_y: isY(formData.mh_kidney), ph_ksto_n: isN(formData.mh_kidney),
      ph_anx_y: isY(formData.mh_mental), ph_anx_n: isN(formData.mh_mental),
      ph_slp_y: isY(formData.q_fear), ph_slp_n: isN(formData.q_fear),
      ph_eye1_y: isY(formData.mh_eye), ph_eye1_n: isN(formData.mh_eye),
      ph_eye2_y: isY(formData.mh_eye), ph_eye2_n: isN(formData.mh_eye),
      ph_hear1_y: isY(formData.mh_ear), ph_hear1_n: isN(formData.mh_ear),
      ph_tin_y: isY(formData.mh_ear), ph_tin_n: isN(formData.mh_ear),
      ph_ear2_y: isY(formData.mh_ear), ph_ear2_n: isN(formData.mh_ear),
      
      diab_ins: '☐',
      ph_diab_y: isY(formData.mh_diabetes), ph_diab_n: isN(formData.mh_diabetes),
      
      ph_thyr_y: isY(formData.mh_thyroid), ph_thyr_n: isN(formData.mh_thyroid),
      ph_ane_y: isY(formData.mh_blood), ph_ane_n: isN(formData.mh_blood),
      ph_thal_y: isY(formData.mh_blood), ph_thal_n: isN(formData.mh_blood),
      ph_sick_y: isY(formData.mh_blood), ph_sick_n: isN(formData.mh_blood),
      ph_alrg_y: isY(formData.mh_skin), ph_alrg_n: isN(formData.mh_skin),
      
      ph_meds_y: isY(formData.q_meds), ph_meds_n: isN(formData.q_meds),
      ph_hosp1_y: isY(formData.q_illness), ph_hosp1_n: isN(formData.q_illness),
      ph_hosp2_y: '☐', ph_hosp2_n: '☑',
      ph_oth_y: formData.mh_others ? '☑' : '☐', ph_oth_n: formData.mh_others ? '☐' : '☑',
      ph_smoke_y: isY(formData.q_smoke), ph_smoke_n: isN(formData.q_smoke),
      ph_alc_y: isY(formData.q_alcohol), ph_alc_n: isN(formData.q_alcohol),
      ph_drug_y: isY(formData.mh_drug), ph_drug_n: isN(formData.mh_drug),
      ph_skin_y: isY(formData.mh_skin), ph_skin_n: isN(formData.mh_skin),

      // 4. KHUSUS WANITA (FEMALES)
      f_lmp: isFemale ? (formData.f_lmp || 'N/A') : 'N/A',
      f_heavy_y: '☐', f_heavy_n: isFemale ? '☑' : '☐',
      f_reg_y: isFemale ? '☑' : '☐', f_reg_n: '☐',
      f_pain_y: '☐', f_pain_n: isFemale ? '☑' : '☐',
      f_pill_y: '☐', f_pill_n: isFemale ? '☑' : '☐',
      f_preg_no: isFemale ? (formData.f_preg_no || 'N/A') : 'N/A',
      f_live_birth: isFemale ? (formData.f_live_birth || 'N/A') : 'N/A',

      date: formData.date || new Date().toLocaleDateString('en-GB'),

      // 5. PEMERIKSAAN FISIK DOKTER (FORM B)
      g_m: formData.gender === 'Male' ? '☑' : '☐',
      g_f: isFemale ? '☑' : '☐',
      illness_last: "Nil",

      cv_pulse: getNorm(formData.cardio), cv_comm: "",
      cv_bp: getNorm(formData.cardio),
      cv_apex: getNorm(formData.cardio),
      cv_sounds: getNorm(formData.cardio),
      cv_murmurs: getNorm(formData.cardio),
      cv_varicose: getNorm(formData.vas_s),

      rs_nasal: getNorm(formData.ent), rs_comm: getRem(formData.ent, formData.ent_r),
      rs_thyroid: getNorm(formData.ent),
      rs_trachea: getNorm(formData.chest),
      rs_chest: getNorm(formData.chest),
      rs_perc: getNorm(formData.chest),
      rs_air: getNorm(formData.chest),
      rs_breath: getNorm(formData.chest),
      rs_advent: getNorm(formData.chest),

      al_teeth: getNorm(formData.oral_c), al_comm: getRem(formData.oral_c, formData.oral_c_r),
      al_tongue: getNorm(formData.oral_c),
      al_abd: getNorm(formData.abdom),
      al_liver: getNorm(formData.abdom),
      al_spleen: getNorm(formData.abdom),
      al_lymph: getNorm(formData.abdom),
      al_hernia: getNorm(formData.her_or),
      al_anus: getNorm(formData.anus_r),

      gu_kidney: getNorm(formData.genito), gu_comm: getRem(formData.genito, formData.genito_r),
      gu_gen: getNorm(formData.genito),

      in_hair: getNorm(formData.skin), in_comm: "",
      in_skin: getNorm(formData.skin),
      in_nails: getNorm(formData.skin),

      ms_hands: getNorm(formData.extrem), ms_comm: "",
      ms_limbs: getNorm(formData.extrem),
      ms_back: getNorm(formData.musculo),
      ms_joints: getNorm(formData.musculo),
      ms_inj: getNorm(formData.musculo),

      ns_comm: getRem(formData.c_n_s, formData.c_n_s_r),
      r_bl_r: "Normal", r_tl_r: "Normal", r_sup_r: "Normal", r_kn_r: "Normal", r_an_r: "Normal", r_pl_r: "Normal",
      r_bl_l: "Normal", r_tl_l: "Normal", r_sup_l: "Normal", r_kn_l: "Normal", r_an_l: "Normal", r_pl_l: "Normal",
      ns_power: getNorm(formData.c_n_s),
      ns_tone: getNorm(formData.c_n_s),
      ns_coord: getNorm(formData.c_n_s),
      ns_sens: getNorm(formData.c_n_s),
      ns_emot: getNorm(formData.mh_mental),
      ns_intel: getNorm(formData.c_n_s),

      ea_meatus: getNorm(formData.ent), ea_comm: "",
      ea_drums: getNorm(formData.ent),
      ea_wr_r: getNorm(formData.hear_r), ea_wr_l: getNorm(formData.hear_l),
      ea_hr_r: getNorm(formData.hear_r), ea_hr_l: getNorm(formData.hear_l),

      ey_light: getNorm(formData.eyes), ey_comm: "",
      ey_accom: getNorm(formData.eyes),
      ey_nyst: getNorm(formData.eyes),
      ey_fundi: getNorm(formData.eyes),

      // 6. VISUAL ACUITY & LABORATORIUM
      nearr_unc: formData.nearr_unc || "-", nearl_unc: formData.nearl_unc || "-",
      disr_unc: formData.disr_unc || "-", disl_unc: formData.disl_unc || "-",
      nearr_cor: formData.nearr_cor || "-", nearl_cor: formData.nearl_cor || "-",
      disr_cor: formData.disr_cor || "-", disl_cor: formData.disl_cor || "-",
      
      cv_n: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_df: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',

      height: formData.height || "", weight: formData.weight || "", bmi: formData.bmi || "",
      pulse: formData.pulse || "", 
      bp_sys: bp_sys, bp_dia: bp_dia,
      
      chest_exp: formData.chest_exp || "-", ft_fvc: formData.ft_fvc || "-", ft_fev1: formData.ft_fev1 || "-",
      xray_res: formData.xray || "-", oht_result: formData.oht_result || "-", diag: formData.diag || "-",
      bg_rh: `${formData.bloodGroupType || ""}${formData.bloodGroupRh || ""}`,
      lab_hb: formData.lab_hb || "-",
      ur_sugar: formData.ur_sugar || "-", albumin: formData.albumin || "-",
      hep_b: formData.hep_b_ag === 'Positive' ? 'Positive' : (formData.hep_b_ag === 'Negative' ? 'Negative' : '-'),
      hep_c: formData.hep_c || "-", hep_a: formData.hep_a || "-",

      // 7. REKOMENDASI DOKTER (FITNESS)
      fit_job: formData.fit_lookout === 'Fit' ? '☑' : '☐',
      unfit_job: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
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
        'Content-Disposition': 'attachment; filename="ADNOC_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}