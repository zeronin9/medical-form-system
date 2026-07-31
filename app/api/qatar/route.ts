import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();

    // Pastikan nama file ini 100% sama dengan yang ada di folder public/templates Anda
    const fileName = '4. QatarEnergy LNG Medical Department.docx'; 
      
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // MENGATASI UNDEFINED: Memaksa TypeScript mengabaikan error tipe dengan @ts-ignore
    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() {
        return ""; // Mengubah semua undefined menjadi string kosong/bersih
      }
    });

    const check = (value: any, expected: string | boolean) => value === expected ? '☑' : '☐';

    doc.render({
      // ==========================================
      // SECTION A: IDENTITAS & PEKERJAAN
      // ==========================================
      first_name: formData.firstName || "", family_name: formData.familyName || "",
      ddmmyy: formData.dob || "", id_passport: formData.idPassport || "",
      nationality: formData.nationality || "", position: formData.position || "",
      department: formData.department || "", company: formData.company || "",
      work_location: formData.workLocation || "", contact_number: formData.contactNumber || "",
      address: formData.address || "", date: formData.date || new Date().toLocaleDateString('id-ID'),
      g_m: check(formData.gender, 'Male'), g_f: check(formData.gender, 'Female'),

      // NATURE OF WORK
      nw_confined: check(formData.nw_confined, true), nw_height: check(formData.nw_height, true),
      o_h_e: check(formData.nw_heavy, true), dvg: check(formData.nw_diving, true),
      s_r: check(formData.nw_swing, true), o_w: check(formData.nw_office, true),
      hanging: check(formData.nw_hanging, true), emer_r: check(formData.nw_emergency, true),
      l_r: check(formData.nw_radiation, true), sew_d: check(formData.nw_sewage, true),
      food_h: check(formData.nw_food, true), othersy: check(formData.nw_others !== "" && formData.nw_others !== undefined, true),
      others_ifyes: formData.nw_others || "", 

      // VACCINATION
      v_hepa_y: check(formData.vac_hepa, 'Yes'), v_hepa_n: check(formData.vac_hepa, 'No'), v_hepa_s: check(formData.vac_hepa, 'Not Sure'),
      v_hepb_y: check(formData.vac_hepb, 'Yes'), v_hepb_n: check(formData.vac_hepb, 'No'), v_hepb_s: check(formData.vac_hepb, 'Not Sure'),
      c19_y: check(formData.vac_c19, 'Yes'), c19_n: check(formData.vac_c19, 'No'), c19_s: check(formData.vac_c19, 'Not Sure'),
      tet_y: check(formData.vac_tet, 'Yes'), tet_n: check(formData.vac_tet, 'No'), tet_s: check(formData.vac_tet, 'Not Sure'),
      mea_y: check(formData.vac_mea, 'Yes'), mea_n: check(formData.vac_mea, 'No'), mea_s: check(formData.vac_mea, 'Not Sure'),
      chick_y: check(formData.vac_chick, 'Yes'), chick_n: check(formData.vac_chick, 'No'), chick_s: check(formData.vac_chick, 'Not Sure'),
      typh_y: check(formData.vac_typh, 'Yes'), typh_n: check(formData.vac_typh, 'No'), typh_s: check(formData.vac_typh, 'Not Sure'),

      // MEDICAL HISTORY
      mh_blood_y: check(formData.mh_blood, 'Yes'), mh_blood_n: check(formData.mh_blood, 'No'),
      p_ulc_y: check(formData.mh_ulcer, 'Yes'), p_ulc_n: check(formData.mh_ulcer, 'No'),
      epil_y: check(formData.mh_epilepsy, 'Yes'), epil_n: check(formData.mh_epilepsy, 'No'),
      work_y: check(formData.mh_accident, 'Yes'), work_n: check(formData.mh_accident, 'No'),
      ears_y: check(formData.mh_ear, 'Yes'), ears_n: check(formData.mh_ear, 'No'),
      r_head_y: check(formData.mh_headache, 'Yes'), r_head_n: check(formData.mh_headache, 'No'),
      r_a_p_y: check(formData.mh_abd_pain, 'Yes'), r_a_p_n: check(formData.mh_abd_pain, 'No'),
      s_dis_y: check(formData.mh_skin, 'Yes'), s_dis_n: check(formData.mh_skin, 'No'),
      m_skel_y: check(formData.mh_musculo, 'Yes'), m_skel_n: check(formData.mh_musculo, 'No'),
      m_ill_y: check(formData.mh_mental, 'Yes'), m_ill_n: check(formData.mh_mental, 'No'),
      cns_y: check(formData.mh_cns, 'Yes'), cns_n: check(formData.mh_cns, 'No'),
      h_dis_y: check(formData.mh_heart, 'Yes'), h_dis_n: check(formData.mh_heart, 'No'),
      mh_hbp_y: check(formData.mh_hbp, 'Yes'), mh_hbp_n: check(formData.mh_hbp, 'No'),
      mh_dia_y: check(formData.mh_diabetes, 'Yes'), mh_dia_n: check(formData.mh_diabetes, 'No'),
      k_b_t_y: check(formData.mh_kidney, 'Yes'), k_b_t_n: check(formData.mh_kidney, 'No'),
      r_art_y: check(formData.mh_rheumatism, 'Yes'), r_art_n: check(formData.mh_rheumatism, 'No'),
      f_lc_y: check(formData.mh_fainting, 'Yes'), f_lc_n: check(formData.mh_fainting, 'No'),
      v_dis_y: check(formData.mh_vascular, 'Yes'), v_dis_n: check(formData.mh_vascular, 'No'),
      eye_con_y: check(formData.mh_eye, 'Yes'), eye_con_n: check(formData.mh_eye, 'No'),
      c_asma_y: check(formData.mh_asthma, 'Yes'), c_asma_n: check(formData.mh_asthma, 'No'),
      std_y: check(formData.mh_std, 'Yes'), std_n: check(formData.mh_std, 'No'),
      hep_y: check(formData.mh_hep, 'Yes'), hep_n: check(formData.mh_hep, 'No'),
      m_sur_y: check(formData.mh_surgery, 'Yes'), m_sur_n: check(formData.mh_surgery, 'No'),
      cancer_y: check(formData.mh_cancer, 'Yes'), cancer_n: check(formData.mh_cancer, 'No'),
      drug_a_y: check(formData.mh_drug, 'Yes'), drug_a_n: check(formData.mh_drug, 'No'),
      t_dis_y: check(formData.mh_thyroid, 'Yes'), t_dis_n: check(formData.mh_thyroid, 'No'),
      c_preg_y: check(formData.mh_pregnancy, 'Yes'), c_preg_n: check(formData.mh_pregnancy, 'No'),
      h_adm_y: check(formData.mh_hospital, 'Yes'), h_adm_n: check(formData.mh_hospital, 'No'),
      others_mh: formData.mh_others || "",

      // FAMILY HISTORY
      dia_y: check(formData.fm_diabetes, 'Yes'), dia_n: check(formData.fm_diabetes, 'No'),
      hyp_y: check(formData.fm_hypertension, 'Yes'), hyp_n: check(formData.fm_hypertension, 'No'),
      fmepil_y: check(formData.fm_epilepsy, 'Yes'), fmepil_n: check(formData.fm_epilepsy, 'No'),
      fm_h_dis_y: check(formData.fm_heart, 'Yes'), fm_h_dis_n: check(formData.fm_heart, 'No'),
      ast_y: check(formData.fm_asthma, 'Yes'), ast_n: check(formData.fm_asthma, 'No'),
      can_t_y: check(formData.fm_cancer, 'Yes'), can_t_n: check(formData.fm_cancer, 'No'),
      others_fm: formData.fm_others || "",

      // GENERAL QUESTIONS
      illness_y: check(formData.q_illness, 'Yes'), illness_n: check(formData.q_illness, 'No'),
      medev_y: check(formData.q_medevac, 'Yes'), medev_n: check(formData.q_medevac, 'No'), medev_why: formData.q_medevac_text || "",
      curren_y: check(formData.q_meds, 'Yes'), curren_n: check(formData.q_meds, 'No'), curren_ifyes: formData.q_meds_text || "",
      q_smoke_y: check(formData.q_smoke, 'Yes'), q_smoke_n: check(formData.q_smoke, 'No'), 
      q_smoke_text: formData.q_smoke_text || "", hl_hf: formData.q_smoke_freq || "", 
      alc_y: check(formData.q_alcohol, 'Yes'), alc_n: check(formData.q_alcohol, 'No'), answer_ifyes: formData.q_alcohol_text || "",
      fit_y: check(formData.q_fit, 'Yes'), fit_n: check(formData.q_fit, 'No'),
      fear_y: check(formData.q_fear, 'Yes'), fear_n: check(formData.q_fear, 'No'),
      stress_y: check(formData.q_stress, 'Yes'), stress_n: check(formData.q_stress, 'No'),
      strfull_y: check(formData.q_stressful, 'Yes'), strfull_n: check(formData.q_stressful, 'No'),
      score: formData.q_stress_score || "", 
      qmfc_y: check(formData.q_omfc, 'Yes'), qmfc_n: check(formData.q_omfc, 'No'), omfc_ifyes: formData.q_omfc_text || "",

      // ==========================================
      // SECTION B: DOCTOR'S PHYSICAL EXAM
      // ==========================================
      eyes_n: check(formData.eyes, 'Normal'), eyes_a: check(formData.eyes, 'Abnormal'), eyes_r: formData.eyes_r || "",
      ent_n: check(formData.ent, 'Normal'), ent_a: check(formData.ent, 'Abnormal'), ent_r: formData.ent_r || "",
      oral_c_n: check(formData.oral_c, 'Normal'), oral_c_a: check(formData.oral_c, 'Abnormal'), oral_c_r: formData.oral_c_r || "",
      chest_n: check(formData.chest, 'Normal'), chest_a: check(formData.chest, 'Abnormal'), chest_r: formData.chest_r || "",
      cardio_n: check(formData.cardio, 'Normal'), cardio_a: check(formData.cardio, 'Abnormal'), cardio_r: formData.cardio_r || "",
      abdom_n: check(formData.abdom, 'Normal'), abdom_a: check(formData.abdom, 'Abnormal'), abdom_r: formData.abdom_r || "",
      her_or_n: check(formData.her_or, 'Normal'), her_or_a: check(formData.her_or, 'Abnormal'), her_or_r: formData.her_or_r || "",
      anus_r_n: check(formData.anus_r, 'Normal'), anus_r_a: check(formData.anus_r, 'Abnormal'), anus_r_r: formData.anus_r_r || "",
      genito_n: check(formData.genito, 'Normal'), genito_a: check(formData.genito, 'Abnormal'), genito_r: formData.genito_r || "",
      extrem_n: check(formData.extrem, 'Normal'), extrem_a: check(formData.extrem, 'Abnormal'), extrem_r: formData.extrem_r || "",
      musculo_n: check(formData.musculo, 'Normal'), musculo_a: check(formData.musculo, 'Abnormal'), musculo_r: formData.musculo_r || "",
      skin_n: check(formData.skin, 'Normal'), skin_a: check(formData.skin, 'Abnormal'), skin_r: formData.skin_r || "",
      vas_s_n: check(formData.vas_s, 'Normal'), vas_s_a: check(formData.vas_s, 'Abnormal'), vas_s_r: formData.vas_s_r || "",
      c_n_s_n: check(formData.c_n_s, 'Normal'), c_n_s_a: check(formData.c_n_s, 'Abnormal'), c_n_s_r: formData.c_n_s_r || "",

      // ==========================================
      // SECTION B: DOCTOR'S LAB REPORTS
      // ==========================================
      fbg_n: check(formData.fbg, 'Normal'), fbg_a: check(formData.fbg, 'Abnormal'), fbg_r: formData.fbg_r || "",
      cbc_n: check(formData.cbc, 'Normal'), cbc_a: check(formData.cbc, 'Abnormal'), cbc_r: formData.cbc_r || "",
      tcho_n: check(formData.tcho, 'Normal'), tcho_a: check(formData.tcho, 'Abnormal'), tcho_r: formData.tcho_r || "",
      lft_n: check(formData.lft, 'Normal'), lft_a: check(formData.lft, 'Abnormal'), lft_r: formData.lft_r || "",
      rft_n: check(formData.rft, 'Normal'), rft_a: check(formData.rft, 'Abnormal'), rft_r: formData.rft_r || "",
      urin_n: check(formData.urin, 'Normal'), urin_a: check(formData.urin, 'Abnormal'), urin_r: formData.urin_r || "",
      audi_n: check(formData.audi, 'Normal'), audi_a: check(formData.audi, 'Abnormal'), audi_r: formData.audi_r || "",
      spir_n: check(formData.spir, 'Normal'), spir_a: check(formData.spir, 'Abnormal'), spir_r: formData.spir_r || "",
      ecg_n: check(formData.ecg, 'Normal'), ecg_a: check(formData.ecg, 'Abnormal'), ecg_r: formData.ecg_r || "",
      xrey_n: check(formData.xrey, 'Normal'), xrey_a: check(formData.xrey, 'Abnormal'), xrey_r: formData.xrey_r || "",
      idt_n: check(formData.idt, 'Normal'), idt_a: check(formData.idt, 'Abnormal'), idt_r: formData.idt_r || "",
      hha1_n: check(formData.hha1, 'Normal'), hha1_a: check(formData.hha1, 'Abnormal'), hha1_r: formData.hha1_r || "",
      ffh_n: check(formData.ffh, 'Normal'), ffh_a: check(formData.ffh, 'Abnormal'), ffh_r: formData.ffh_r || "",

      // ==========================================
      // SECTION C: BIOMETRICS & VISION
      // ==========================================
      h: formData.height || "", w: formData.weight || "", bmi: formData.bmi || "",
      weist: formData.waist || "", p: formData.pulse || "", b_p: formData.bloodPressure || "",
      bg_type: formData.bloodGroupType || "", bg_rh: formData.bloodGroupRh || "",
      
      disr_unc: formData.disr_unc || "", disl_unc: formData.disl_unc || "",
      nearr_unc: formData.nearr_unc || "", nearl_unc: formData.nearl_unc || "", bv_unc: formData.bv_unc || "",
      disr_cor: formData.disr_cor || "", disl_cor: formData.disl_cor || "",
      nearr_cor: formData.nearr_cor || "", nearl_cor: formData.nearl_cor || "", bv_cor: formData.bv_cor || "",
      cv_nor: check(formData.color_vision, 'Normal'), cv_pcb: check(formData.color_vision, 'Partial'), cv_tcb: check(formData.color_vision, 'Total')
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="qatarenergy_terisi.docx"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    
    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
            .map((e: any) => e.properties.explanation)
            .join(", ");
        return NextResponse.json({ error: `Format template salah: ${errorMessages}` }, { status: 500 });
    }

    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan internal backend.' },
      { status: 500 }
    );
  }
}