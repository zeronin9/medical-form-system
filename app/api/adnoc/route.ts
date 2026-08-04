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
    const isN = (val: any) => (val === 'No' || val === false) ? '☑' : '☐';
    const isFemale = formData.gender === 'Female';

    // --- PENGECEKAN STATUS DIABETES ---
    const isDiabetes = formData.mh_diabetes === 'Yes';

    // --- RENDER VARIABEL 100% MENGIKUTI TEMPLATE WORD ---
    doc.render({
      // 1. IDENTITAS & PEKERJAAN
      first_name: realFirstName || "",
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
      reason_exam: formData.reason_exam || "",

      // Previous Employment
      job1: formData.job1 || "", comp1: formData.comp1 || "", from1: formData.from1 || "", to1: formData.to1 || "",
      job2: formData.job2 || "", comp2: formData.comp2 || "", from2: formData.from2 || "", to2: formData.to2 || "",
      job3: formData.job3 || "", comp3: formData.comp3 || "", from3: formData.from3 || "", to3: formData.to3 || "",
      job4: formData.job4 || "", comp4: formData.comp4 || "", from4: formData.from4 || "", to4: formData.to4 || "",

      // 2. EXPOSURE & KELUARGA
      ex_noise: isY(formData.exp_noise),
      ex_metal: isY(formData.exp_heavy_metals),
      ex_skin: isY(formData.exp_skin_infections),
      ex_comp: isY(formData.exp_compensation),
      ex_chem: isY(formData.exp_chemicals),
      ex_rad: isY(formData.exp_radiation),
      ex_dust: isY(formData.exp_dust),
      ex_unfit: isY(formData.q_omfc), 
      ex_dis: isY(formData.exp_disable), 
      dis_no: formData.exp_disable_no || "",

      fh_heart: isY(formData.fm_heart),
      fh_asthma: isY(formData.fm_asthma),
      fh_diab: isY(formData.fm_diabetes),
      fh_hbp: isY(formData.fm_hypertension),
      fh_tb: isY(formData.fm_tb),
      fh_allergy: isY(formData.fm_allergy),
      fh_mental: isY(formData.fm_mental),
      fh_cancer: isY(formData.fm_cancer),
      fh_other: formData.fm_others ? '☑' : '☐',
      fm_others: formData.fm_others || '',
      
      // Umur & Status Kesehatan Keluarga
      fa_age: formData.fa_age || "", fa_state: formData.fa_state || "", 
      spo_age: formData.spo_age || "", spo_state: formData.spo_state || "",
      mo_age: formData.mo_age || "", mo_state: formData.mo_state || "", 
      chi_age: formData.chi_age || "", chi_state: formData.chi_state || "",
      sib_age: formData.sib_age || "", sib_state: formData.sib_state || "",

      // 3. RIWAYAT MEDIS PRIBADI (PERSONAL HISTORY)
      ph_hbp_y: isY(formData.mh_hbp), ph_hbp_n: isN(formData.mh_hbp),
      ph_ang_y: isY(formData.mh_angina), ph_ang_n: isN(formData.mh_angina),
      ph_hrt_y: isY(formData.mh_heart), ph_hrt_n: isN(formData.mh_heart),
      ph_csurg_y: isY(formData.mh_cardiac_surgery), ph_csurg_n: isN(formData.mh_cardiac_surgery),
      ph_asthma_y: isY(formData.mh_asthma), ph_asthma_n: isN(formData.mh_asthma),
      
      ph_bron_y: isY(formData.mh_bronchitis), ph_bron_n: isN(formData.mh_bronchitis),
      ph_tb_y: isY(formData.mh_tb), ph_tb_n: isN(formData.mh_tb),
      ph_ulcer_y: isY(formData.mh_ulcer), ph_ulcer_n: isN(formData.mh_ulcer),
      ph_hep_y: isY(formData.mh_hep), ph_hep_n: isN(formData.mh_hep),
      
      ph_piles_y: isY(formData.mh_piles), ph_piles_n: isN(formData.mh_piles),
      ph_hernia_y: isY(formData.mh_hernia), ph_hernia_n: isN(formData.mh_hernia),
      ph_const_y: isY(formData.mh_constipation), ph_const_n: isN(formData.mh_constipation),
      ph_diar_y: isY(formData.mh_diarrhea), ph_diar_n: isN(formData.mh_diarrhea),
      ph_bowel_y: isY(formData.mh_bowel), ph_bowel_n: isN(formData.mh_bowel),
      
      ph_epil_y: isY(formData.mh_epilepsy), ph_epil_n: isN(formData.mh_epilepsy),
      ph_stroke_y: isY(formData.mh_stroke), ph_stroke_n: isN(formData.mh_stroke),
      ph_mig_y: isY(formData.mh_headache), ph_mig_n: isN(formData.mh_headache),
      ph_vert_y: isY(formData.mh_fainting), ph_vert_n: isN(formData.mh_fainting),
      ph_back_y: isY(formData.mh_musculo), ph_back_n: isN(formData.mh_musculo),
      ph_joint_y: isY(formData.mh_rheumatism), ph_joint_n: isN(formData.mh_rheumatism),
      ph_frac_y: isY(formData.mh_accident), ph_frac_n: isN(formData.mh_accident),
      
      ph_ecz_y: isY(formData.mh_eczema), ph_ecz_n: isN(formData.mh_eczema),
      ph_viti_y: isY(formData.mh_vitiligo), ph_viti_n: isN(formData.mh_vitiligo),

      ph_kid_y: isY(formData.mh_kidney), ph_kid_n: isN(formData.mh_kidney),
      ph_ksto_y: isY(formData.mh_kidney_stone), ph_ksto_n: isN(formData.mh_kidney_stone),
      ph_anx_y: isY(formData.mh_anxiety), ph_anx_n: isN(formData.mh_anxiety),
      ph_slp_y: isY(formData.mh_sleep), ph_slp_n: isN(formData.mh_sleep),
      
      ph_eye1_y: isY(formData.mh_eye), ph_eye1_n: isN(formData.mh_eye),
      ph_eye2_y: isY(formData.mh_eye2), ph_eye2_n: isN(formData.mh_eye2),
      ph_hear1_y: isY(formData.mh_ear), ph_hear1_n: isN(formData.mh_ear),
      ph_tin_y: isY(formData.mh_tinnitus), ph_tin_n: isN(formData.mh_tinnitus),
      ph_ear2_y: isY(formData.mh_ear2), ph_ear2_n: isN(formData.mh_ear2),
      
      // === LOGIKA DIABETES INSULIN & NON-INSULIN ===
      diab_ins: (isDiabetes && formData.diab_ins === 'Yes') ? '☑' : '☐',
      diab_non: (isDiabetes && formData.diab_non === 'Yes') ? '☑' : '☐',
      ph_diab_y: isY(formData.mh_diabetes), 
      ph_diab_n: isN(formData.mh_diabetes),
      
      ph_thyr_y: isY(formData.mh_thyroid), ph_thyr_n: isN(formData.mh_thyroid),

      ph_ane_y: isY(formData.mh_anemia), ph_ane_n: isN(formData.mh_anemia),
      ph_thal_y: isY(formData.mh_thal), ph_thal_n: isN(formData.mh_thal),
      ph_sick_y: isY(formData.mh_sickle), ph_sick_n: isN(formData.mh_sickle),
      ph_alrg_y: isY(formData.mh_allergy_med), ph_alrg_n: isN(formData.mh_allergy_med),

      // BAGIAN BAWAH PERSONAL HISTORY
      ph_meds_y: isY(formData.q_meds), ph_meds_n: isN(formData.q_meds),
      ph_hosp1_y: isY(formData.q_illness), ph_hosp1_n: isN(formData.q_illness),
      ph_hosp2_y: isY(formData.q_hosp_wait), ph_hosp2_n: isN(formData.q_hosp_wait),
      ph_oth_y: formData.mh_others ? '☑' : '☐', ph_oth_n: '☐', 
      ph_smoke_y: isY(formData.q_smoke), ph_smoke_n: isN(formData.q_smoke),
      ph_alc_y: isY(formData.q_alcohol), ph_alc_n: isN(formData.q_alcohol),
      ph_drug_y: isY(formData.mh_drug), ph_drug_n: isN(formData.mh_drug),
      ph_skin_y: isY(formData.mh_skin), ph_skin_n: isN(formData.mh_skin),

      // 4. KHUSUS WANITA (FEMALES)
      f_lmp: isFemale ? (formData.f_lmp || '') : '',
      f_heavy_y: isFemale ? isY(formData.f_heavy) : '☐', 
      f_heavy_n: isFemale ? isN(formData.f_heavy) : '☐',
      f_reg_y: isFemale ? isY(formData.f_reg) : '☐', 
      f_reg_n: isFemale ? isN(formData.f_reg) : '☐',
      f_pain_y: isFemale ? isY(formData.f_pain) : '☐', 
      f_pain_n: isFemale ? isN(formData.f_pain) : '☐',
      f_pill_y: isFemale ? isY(formData.f_pill) : '☐', 
      f_pill_n: isFemale ? isN(formData.f_pill) : '☐',
      f_preg_no: isFemale ? (formData.f_preg_no || '') : '',
      f_live_birth: isFemale ? (formData.f_live_birth || '') : '',

      date: formData.date || "",

      // 5. PEMERIKSAAN FISIK DOKTER (FORM B) - LOGIKA SMART UI TERBARU
      g_m: formData.gender === 'Male' ? '☑' : '☐',
      g_f: isFemale ? '☑' : '☐',
      illness_last: formData.illness_last || "", 

      cv_pulse: formData.cv_pulse || "", cv_comm: formData.cv_comm || "",
      cv_bp: formData.cv_bp || "",
      cv_apex: formData.cv_apex || "",
      cv_sounds: formData.cv_sounds || "",
      cv_murmurs: formData.cv_murmurs || "",
      cv_varicose: formData.cv_varicose || "",

      rs_nasal: formData.rs_nasal || "", rs_comm: formData.rs_comm || "",
      rs_thyroid: formData.rs_thyroid || "",
      rs_trachea: formData.rs_trachea || "",
      rs_chest: formData.rs_chest || "",
      rs_perc: formData.rs_perc || "",
      rs_air: formData.rs_air || "",
      rs_breath: formData.rs_breath || "",
      rs_advent: formData.rs_advent || "",

      al_teeth: formData.al_teeth || "", al_comm: formData.al_comm || "",
      al_tongue: formData.al_tongue || "",
      al_abd: formData.al_abd || "",
      al_liver: formData.al_liver || "",
      al_spleen: formData.al_spleen || "",
      al_lymph: formData.al_lymph || "",
      al_hernia: formData.al_hernia || "",
      al_anus: formData.al_anus || "",

      gu_kidney: formData.gu_kidney || "", gu_comm: formData.gu_comm || "",
      gu_gen: formData.gu_gen || "",

      in_hair: formData.in_hair || "", in_comm: formData.in_comm || "",
      in_skin: formData.in_skin || "",
      in_nails: formData.in_nails || "",

      ms_hands: formData.ms_hands || "", ms_comm: formData.ms_comm || "",
      ms_limbs: formData.ms_limbs || "",
      ms_back: formData.ms_back || "",
      ms_joints: formData.ms_joints || "",
      ms_inj: formData.ms_inj || "",

      ns_comm: formData.ns_comm || "",
      r_bl_r: "", r_tl_r: "", r_sup_r: "", r_kn_r: "", r_an_r: "", r_pl_r: "",
      r_bl_l: "", r_tl_l: "", r_sup_l: "", r_kn_l: "", r_an_l: "", r_pl_l: "",
      ns_power: formData.ns_power || "",
      ns_tone: formData.ns_tone || "",
      ns_coord: formData.ns_coord || "",
      ns_sens: formData.ns_sens || "",
      ns_emot: formData.mh_mental || "", 
      ns_intel: formData.ns_intel || "",

      ea_meatus: formData.ea_meatus || "", ea_comm: formData.ea_comm || "",
      ea_drums: formData.ea_drums || "",
      ea_wr_r: formData.hear_r || "", ea_wr_l: formData.hear_l || "",
      ea_hr_r: formData.hear_r || "", ea_hr_l: formData.hear_l || "",

      ey_light: formData.ey_light || "", ey_comm: formData.ey_comm || "",
      ey_accom: formData.ey_accom || "",
      ey_nyst: formData.ey_nyst || "",
      ey_fundi: formData.ey_fundi || "",

      // 6. VISUAL ACUITY & LABORATORIUM
      nearr_unc: formData.nearr_unc || "", nearl_unc: formData.nearl_unc || "",
      disr_unc: formData.disr_unc || "", disl_unc: formData.disl_unc || "",
      nearr_cor: formData.nearr_cor || "", nearl_cor: formData.nearl_cor || "",
      disr_cor: formData.disr_cor || "", disl_cor: formData.disl_cor || "",
      
      cv_n: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_df: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',

      // FORMAT TAMBAHAN UNTUK TINGGI, BERAT, DENYUT NADI
      height: formData.height ? `${formData.height} cm` : "", 
      weight: formData.weight ? `${formData.weight} kg` : "", 
      bmi: formData.bmi || "",
      pulse: formData.pulse ? `${formData.pulse} bpm` : "", 
      bp_sys: bp_sys, bp_dia: bp_dia,
      
      chest_exp: formData.chest_exp || "", ft_fvc: formData.ft_fvc || "", ft_fev1: formData.ft_fev1 || "",
      xray_res: formData.xray || "", oht_result: formData.oht_result || "", diag: formData.diag || "",
      bg_rh: `${formData.bloodGroupType || ""}${formData.bloodGroupRh || ""}`,
      lab_hb: formData.lab_hb || "",
      ur_sugar: formData.ur_sugar || "", albumin: formData.albumin || "",
      hep_b: formData.hep_b_ag === 'Positive' ? 'Positive' : (formData.hep_b_ag === 'Negative' ? 'Negative' : ''),
      hep_c: formData.hep_c || "", hep_a: formData.hep_a || "",

      // 7. REKOMENDASI DOKTER (FITNESS)
      fit_job: formData.fit_lookout === 'Fit' ? '☑' : '☐',
      unfit_job: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      temp_unfit: formData.fit_lookout === 'Temp Unfit' ? '☑' : '☐', 

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