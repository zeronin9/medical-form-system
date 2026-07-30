import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini sama persis dengan nama file Word Anda di folder public/templates
    const fileName = '1. ILO (1).docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // Memaksa TypeScript mengabaikan error tipe dengan @ts-ignore
    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Bersihkan undefined
    });

    // Helper Fungsi untuk mencetak Checkbox (☑ / ☐)
    const check = (value: any, expected: string | boolean) => value === expected ? '☑' : '☐';

    doc.render({
      // ==========================================
      // SECTION 1: IDENTITAS & PEKERJAAN
      // ==========================================
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      family_name: formData.familyName || "",
      first_name: formData.firstName || "",
      
      // Pemecahan String Tanggal Lahir (DD/MM/YYYY)
      day: (formData.dob || "").split(/[-/ ]/)[0] || "",
      month: (formData.dob || "").split(/[-/ ]/)[1] || "",
      year: (formData.dob || "").split(/[-/ ]/)[2] || "",
      
      // Pemecahan String Tempat Lahir (Koma: Kota, Negara)
      pob_city: (formData.pob || "").split(",")[0]?.trim() || formData.pob || "",
      pob_country: (formData.pob || "").split(",")[1]?.trim() || "",
      
      // Jenis Kelamin
      g_m: check(formData.gender, 'Male'),
      g_f: check(formData.gender, 'Female'),
      
      // Data Administratif
      id_passport: formData.idPassport || "",
      nationality: formData.nationality || "",
      address: formData.address || "",
      type_of_ship: formData.typeOfShip || "",
      trade_area: formData.tradeArea || "",
      
      // Posisi di Kapal (Pilih salah satu)
      pos_mas: check(formData.ilo_position, 'Master'),
      pos_dec: check(formData.ilo_position, 'Deck Officer'),
      pos_eng: check(formData.ilo_position, 'Engineering Officer'),
      pos_rad: check(formData.ilo_position, 'Radio Operator'),
      pos_rat: check(formData.ilo_position, 'Rating'),

      // ==========================================
      // SECTION 2: KEPATUHAN STCW & VISUAL DASAR
      // ==========================================
      // Kepatuhan (Yes/No)
      id_y: check(formData.id_checked, 'Yes'), id_n: check(formData.id_checked, 'No'),
      hr_stcw_y: check(formData.hr_stcw, 'Yes'), hr_stcw_n: check(formData.hr_stcw, 'No'), hr_stcw_na: check(formData.hr_stcw, 'Not Applicable'),
      hr_unaid_y: check(formData.hr_unaid, 'Yes'), hr_unaid_n: check(formData.hr_unaid, 'No'),
      vis_stcw_y: check(formData.vis_stcw, 'Yes'), vis_stcw_n: check(formData.vis_stcw, 'No'),
      col_stcw_y: check(formData.col_stcw, 'Yes'), col_stcw_n: check(formData.col_stcw, 'No'),
      glass_y: check(formData.glass_nec, 'Yes'), glass_n: check(formData.glass_nec, 'No'),
      watch_y: check(formData.watch_able, 'Yes'), watch_n: check(formData.watch_able, 'No'),
      
      // Daur ulang mapping SSOT (Medikasi & Bebas Kondisi Medis)
      meds_y: check(formData.q_meds, 'Yes'), meds_n: check(formData.q_meds, 'No'),
      free_y: check(formData.free_cond, 'Yes'), free_n: check(formData.free_cond, 'No'),
      
      // Tes Warna Tambahan (Opsional)
      col_book: check(formData.col_type, 'Book'), col_lant: check(formData.col_type, 'Lantern'),
      col_y: formData.col_y || "", col_r: formData.col_r || "",
      col_g: formData.col_g || "", col_b: formData.col_b || "",
      hear_r: formData.hear_r || "", hear_l: formData.hear_l || "",

      // ==========================================
      // SECTION 3: KUESIONER PENYAKIT (42 SOAL ILO)
      // ==========================================
      // Mapping pintar dari isian Shared (SSOT)
      i_q1_y: check(formData.mh_eye, 'Yes'), i_q1_n: check(formData.mh_eye, 'No'),       // Vision
      i_q2_y: check(formData.mh_hbp, 'Yes'), i_q2_n: check(formData.mh_hbp, 'No'),       // High BP
      i_q3_y: check(formData.mh_heart, 'Yes'), i_q3_n: check(formData.mh_heart, 'No'),     // Heart
      i_q4_y: check(formData.mh_surgery, 'Yes'), i_q4_n: check(formData.mh_surgery, 'No'),   // Heart surgery
      i_q5_y: check(formData.mh_vascular, 'Yes'), i_q5_n: check(formData.mh_vascular, 'No'), // Varicose veins
      i_q6_y: check(formData.mh_asthma, 'Yes'), i_q6_n: check(formData.mh_asthma, 'No'),   // Asthma
      i_q7_y: check(formData.mh_blood, 'Yes'), i_q7_n: check(formData.mh_blood, 'No'),     // Blood disorder
      i_q8_y: check(formData.mh_diabetes, 'Yes'), i_q8_n: check(formData.mh_diabetes, 'No'),   // Diabetes
      i_q9_y: check(formData.mh_thyroid, 'Yes'), i_q9_n: check(formData.mh_thyroid, 'No'),   // Thyroid
      i_q10_y: check(formData.mh_ulcer, 'Yes'), i_q10_n: check(formData.mh_ulcer, 'No'),   // Digestive
      i_q11_y: check(formData.mh_kidney, 'Yes'), i_q11_n: check(formData.mh_kidney, 'No'),   // Kidney
      i_q12_y: check(formData.mh_skin, 'Yes'), i_q12_n: check(formData.mh_skin, 'No'),     // Skin
      i_q13_y: check(formData.mh_skin, 'Yes'), i_q13_n: check(formData.mh_skin, 'No'),     // Allergies
      i_q14_y: check(formData.mh_std, 'Yes'), i_q14_n: check(formData.mh_std, 'No'),       // Infectious
      i_q15_y: check(formData.mh_surgery, 'Yes'), i_q15_n: check(formData.mh_surgery, 'No'), // Hernia
      i_q16_y: check(formData.mh_std, 'Yes'), i_q16_n: check(formData.mh_std, 'No'),       // Genital
      i_q17_y: check(formData.mh_pregnancy, 'Yes'), i_q17_n: check(formData.mh_pregnancy, 'No'),// Pregnancy
      i_q18_y: check(formData.mh_mental, 'Yes'), i_q18_n: check(formData.mh_mental, 'No'),   // Sleep problems
      i_q19_y: check(formData.q_smoke, 'Yes'), i_q19_n: check(formData.q_smoke, 'No'),     // Smoke
      i_q20_y: check(formData.mh_surgery, 'Yes'), i_q20_n: check(formData.mh_surgery, 'No'),   // Operation
      i_q21_y: check(formData.mh_epilepsy, 'Yes'), i_q21_n: check(formData.mh_epilepsy, 'No'), // Epilepsy
      i_q22_y: check(formData.mh_fainting, 'Yes'), i_q22_n: check(formData.mh_fainting, 'No'), // Dizziness/fainting
      i_q23_y: check(formData.mh_fainting, 'Yes'), i_q23_n: check(formData.mh_fainting, 'No'), // Loss of consciousness
      i_q24_y: check(formData.mh_mental, 'Yes'), i_q24_n: check(formData.mh_mental, 'No'),   // Psychiatric
      i_q25_y: check(formData.mh_mental, 'Yes'), i_q25_n: check(formData.mh_mental, 'No'),   // Depression
      i_q26_y: check(formData.mh_mental, 'Yes'), i_q26_n: check(formData.mh_mental, 'No'),   // Attempted suicide
      i_q27_y: check(formData.mh_cns, 'Yes'), i_q27_n: check(formData.mh_cns, 'No'),       // Loss of memory
      i_q28_y: check(formData.mh_ear, 'Yes'), i_q28_n: check(formData.mh_ear, 'No'),       // Balance problem
      i_q29_y: check(formData.mh_headache, 'Yes'), i_q29_n: check(formData.mh_headache, 'No'), // Severe headaches
      i_q30_y: check(formData.mh_ear, 'Yes'), i_q30_n: check(formData.mh_ear, 'No'),       // Ear/nose/throat
      i_q31_y: check(formData.mh_musculo, 'Yes'), i_q31_n: check(formData.mh_musculo, 'No'), // Restricted mobility
      i_q32_y: check(formData.mh_musculo, 'Yes'), i_q32_n: check(formData.mh_musculo, 'No'), // Back problems
      i_q33_y: check(formData.mh_surgery, 'Yes'), i_q33_n: check(formData.mh_surgery, 'No'), // Amputation
      i_q34_y: check(formData.mh_accident, 'Yes'), i_q34_n: check(formData.mh_accident, 'No'), // Fractures
      
      // Pertanyaan Lanjutan
      i_q35_y: check(formData.q_medevac, 'Yes'), i_q35_n: check(formData.q_medevac, 'No'),   // Repatriated/sick
      i_q36_y: check(formData.mh_hospital, 'Yes'), i_q36_n: check(formData.mh_hospital, 'No'), // Hospitalised
      i_q37_y: check(formData.q_omfc, 'Yes'), i_q37_n: check(formData.q_omfc, 'No'),         // Unfit for sea duty
      i_q38_y: check(formData.q_omfc, 'Yes'), i_q38_n: check(formData.q_omfc, 'No'),         // Revoked cert
      i_q39_y: check(formData.q_illness, 'Yes'), i_q39_n: check(formData.q_illness, 'No'),   // Medical problems
      i_q40_y: check(formData.q_fit, 'Yes'), i_q40_n: check(formData.q_fit, 'No'),           // Feel healthy
      i_q41_y: check(formData.mh_skin, 'Yes'), i_q41_n: check(formData.mh_skin, 'No'),       // Allergic to meds
      i_q42_y: check(formData.q_meds, 'Yes'), i_q42_n: check(formData.q_meds, 'No'),         // Taking meds
      
      meds_text: formData.q_meds_text || "",
      epd_comments: formData.q_medevac_text || formData.mh_others || "",

      // ==========================================
      // SECTION 4: PEMERIKSAAN MEDIS (MEDICAL EXAM)
      // ==========================================
      me_psea: check(formData.me_type, 'Pre-sea'),
      me_periodic: check(formData.me_type, 'Periodic'),
      me_other: check(formData.me_type, 'Other'),
      
      // Visual Acuity
      disr_unc: formData.disr_unc || "", disl_unc: formData.disl_unc || "", bv_unc: formData.bv_unc || "",
      disr_cor: formData.disr_cor || "", disl_cor: formData.disl_cor || "", bv_cor: formData.bv_cor || "",
      nearr_unc: formData.nearr_unc || "", nearl_unc: formData.nearl_unc || "", near_bv_unc: formData.near_bv_unc || "",
      nearr_cor: formData.nearr_cor || "", nearl_cor: formData.nearl_cor || "", near_bv_cor: formData.near_bv_cor || "",

      // Visual Fields (Baru)
      vf_r_n: check(formData.vf_r, 'Normal'), vf_r_d: check(formData.vf_r, 'Defective'),
      vf_l_n: check(formData.vf_l, 'Normal'), vf_l_d: check(formData.vf_l, 'Defective'),

      // Colour Vision
      cv_n: check(formData.color_vision, 'Normal'), 
      cv_db: check(formData.color_vision, 'Partial'), 
      cv_df: check(formData.color_vision, 'Total'),
      date_vt: formData.date || new Date().toLocaleDateString('id-ID'),

      // Audiometry (Daur ulang SSOT Chevron)
      r05: formData.r05 || "", r1: formData.r1 || "", r2: formData.r2 || "", r3: formData.r3 || "", r4: formData.r4 || "", r6: formData.r6 || "",
      l05: formData.l05 || "", l1: formData.l1 || "", l2: formData.l2 || "", l3: formData.l3 || "", l4: formData.l4 || "", l6: formData.l6 || "",
      
      // Speech & Whisper Test (Baru)
      sw_r_n: check(formData.sw_r, 'Normal'), sw_r_w: check(formData.sw_r, 'Whisper'),
      sw_l_n: check(formData.sw_l, 'Normal'), sw_l_w: check(formData.sw_l, 'Whisper'),

      // Biometrics
      h: formData.height || "", w: formData.weight || "",
      p: formData.pulse || "", rhyt: formData.rhyt || "",
      bp_sys: formData.bloodPressure?.split('/')[0] || "",
      bp_dia: formData.bloodPressure?.split('/')[1] || "",
      ur_sugar: formData.ur_sugar || "", albumin: formData.albumin || "",

      // ==========================================
      // SECTION 5: PEMERIKSAAN FISIK (SMART GROUPING)
      // ==========================================
      head_n: check(formData.c_n_s, 'Normal'), head_a: check(formData.c_n_s, 'Abnormal'),
      neuro_n: check(formData.c_n_s, 'Normal'), neuro_a: check(formData.c_n_s, 'Abnormal'),
      psych_n: check(formData.c_n_s, 'Normal'), psych_a: check(formData.c_n_s, 'Abnormal'),
      gen_n: check(formData.c_n_s, 'Normal'), gen_a: check(formData.c_n_s, 'Abnormal'),
      
      ent_n: check(formData.ent, 'Normal'), ent_a: check(formData.ent, 'Abnormal'),
      ear_n: check(formData.ent, 'Normal'), ear_a: check(formData.ent, 'Abnormal'),
      tymp_n: check(formData.ent, 'Normal'), tymp_a: check(formData.ent, 'Abnormal'),
      
      eye_n: check(formData.eyes, 'Normal'), eye_a: check(formData.eyes, 'Abnormal'),
      oph_n: check(formData.eyes, 'Normal'), oph_a: check(formData.eyes, 'Abnormal'),
      pupil_n: check(formData.eyes, 'Normal'), pupil_a: check(formData.eyes, 'Abnormal'),
      eyem_n: check(formData.eyes, 'Normal'), eyem_a: check(formData.eyes, 'Abnormal'),
      
      lung_n: check(formData.chest, 'Normal'), lung_a: check(formData.chest, 'Abnormal'),
      breast_n: check(formData.chest, 'Normal'), breast_a: check(formData.chest, 'Abnormal'),
      
      heart_n: check(formData.cardio, 'Normal'), heart_a: check(formData.cardio, 'Abnormal'),
      var_n: check(formData.vas_s, 'Normal'), var_a: check(formData.vas_s, 'Abnormal'),
      vasc_n: check(formData.vas_s, 'Normal'), vasc_a: check(formData.vas_s, 'Abnormal'),
      
      oral_n: check(formData.oral_c, 'Normal'), oral_a: check(formData.oral_c, 'Abnormal'),
      abd_n: check(formData.abdom, 'Normal'), abd_a: check(formData.abdom, 'Abnormal'),
      hern_n: check(formData.her_or, 'Normal'), hern_a: check(formData.her_or, 'Abnormal'),
      anus_n: check(formData.anus_r, 'Normal'), anus_a: check(formData.anus_r, 'Abnormal'),
      gu_n: check(formData.genito, 'Normal'), gu_a: check(formData.genito, 'Abnormal'),
      ext_n: check(formData.extrem, 'Normal'), ext_a: check(formData.extrem, 'Abnormal'),
      spine_n: check(formData.musculo, 'Normal'), spine_a: check(formData.musculo, 'Abnormal'),
      skin_n: check(formData.skin, 'Normal'), skin_a: check(formData.skin, 'Abnormal'),

      // --- CHEST X-RAY (Daur Ulang dari Chevron/Qatar) ---
xray_np: (!formData.xray) ? '☑' : '☐',
xray_n: check(formData.xray, 'Normal'),
xray_a: check(formData.xray, 'Abnormal'),
date_xray: formData.date_xray || "",
xray_res: formData.xray === 'Normal' ? 'NORMAL' : (formData.des_abnor || ""),

      // ==========================================
      // SECTION 6: HASIL LAB & KELAIKAN (FITNESS)
      // ==========================================
      lab_hb: formData.lab_hb || "",
      lab_sr: formData.lab_sr || "",
      hbab_p: check(formData.hep_b_ab, 'Positive'), hbab_n: check(formData.hep_b_ab, 'Negative'),
      hbag_p: check(formData.hep_b_ag, 'Positive'), hbag_n: check(formData.hep_b_ag, 'Negative'),
      bs_np: check(formData.stool_bact, 'Not Performed'), bs_neg: check(formData.stool_bact, 'Negative'), bs_pos: check(formData.stool_bact, 'Positive'),
      ps_np: check(formData.stool_para, 'Not Performed'), ps_neg: check(formData.stool_para, 'Negative'), ps_pos: check(formData.stool_para, 'Positive'),
      hiv_res: formData.hiv_res || "",
      diag: formData.diag || "", // EKG Result
      
      // Vaccination
      vac_sat: check(formData.vac_status, 'Satisfactory'), vac_ren: check(formData.vac_status, 'Renewed'),
      vac_details: formData.vac_details || "",

      // Kelaikan Kapal (Lookout, Deck, Engine, Catering, Other)
      lo_f: check(formData.fit_lookout, 'Fit'), lo_u: check(formData.fit_lookout, 'Unfit'),
      dk_f: check(formData.fit_deck, 'Fit'), dk_u: check(formData.fit_deck, 'Unfit'),
      en_f: check(formData.fit_engine, 'Fit'), en_u: check(formData.fit_engine, 'Unfit'),
      ct_f: check(formData.fit_catering, 'Fit'), ct_u: check(formData.fit_catering, 'Unfit'),
      ot_f: check(formData.fit_other, 'Fit'), ot_u: check(formData.fit_other, 'Unfit'),

      // Meta Data Penutup
      rest_no: check(formData.restrictions, 'Without'), rest_yes: check(formData.restrictions, 'With'),
      rest_desc: formData.rest_desc || "",
      action_taken: formData.action_taken || "",
      date: formData.date || new Date().toLocaleDateString('id-ID'),
      ddmmyyyy: formData.date || new Date().toLocaleDateString('id-ID'),
      exp_date: formData.exp_date || "",
      comments: formData.comments || "",
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      cert_auth: formData.cert_auth || ""
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="ilo_terisi.docx"`,
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