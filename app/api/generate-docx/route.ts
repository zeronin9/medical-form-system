import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData, selectedFormat } = await request.json();

    const fileName = selectedFormat === 'chevron' 
      ? 'Chevron Medical Form_updated_2.docx' 
      : 'QatarEnergy LNG Medical Department.docx';
      
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Helper untuk Centang Kotak (Unicode)
    const check = (value: any, expected: string | boolean) => value === expected ? '☑' : '☐';

    doc.render({
      // ==========================================
      // SECTION A: IDENTITAS & PEKERJAAN
      // ==========================================
      first_name: formData.firstName || "",
      family_name: formData.familyName || "",
      ddmmyy: formData.dob || "",
      id_passport: formData.idPassport || "",
      nationality: formData.nationality || "",
      position: formData.position || "",
      department: formData.department || "",
      company: formData.company || "",
      work_location: formData.workLocation || "",
      contact_number: formData.contactNumber || "",
      address: formData.address || "",
      date: formData.date || new Date().toLocaleDateString('id-ID'), // Tanggal hari ini
      g_m: check(formData.gender, 'Male'),
      g_f: check(formData.gender, 'Female'),

      // ==========================================
      // NATURE OF WORK (Multiple Checkbox)
      // ==========================================
      nw_confined: check(formData.nw_confined, true),
      nw_height: check(formData.nw_height, true),
      o_h_e: check(formData.nw_heavy, true),
      dvg: check(formData.nw_diving, true),
      s_r: check(formData.nw_swing, true),
      o_w: check(formData.nw_office, true),
      hanging: check(formData.nw_hanging, true),
      emer_r: check(formData.nw_emergency, true),
      l_r: check(formData.nw_radiation, true),
      sew_d: check(formData.nw_sewage, true),
      food_h: check(formData.nw_food, true),
      othersy: formData.nw_others || "",

      // ==========================================
      // VACCINATION HISTORY (Yes / No / Not Sure)
      // ==========================================
      v_hepa_y: check(formData.vac_hepa, 'Yes'), v_hepa_n: check(formData.vac_hepa, 'No'), v_hepa_s: check(formData.vac_hepa, 'Not Sure'),
      v_hepb_y: check(formData.vac_hepb, 'Yes'), v_hepb_n: check(formData.vac_hepb, 'No'), v_hepb_s: check(formData.vac_hepb, 'Not Sure'),
      c19_y: check(formData.vac_c19, 'Yes'), c19_n: check(formData.vac_c19, 'No'), c19_s: check(formData.vac_c19, 'Not Sure'),
      tet_y: check(formData.vac_tet, 'Yes'), tet_n: check(formData.vac_tet, 'No'), tet_s: check(formData.vac_tet, 'Not Sure'),
      mea_y: check(formData.vac_mea, 'Yes'), mea_n: check(formData.vac_mea, 'No'), mea_s: check(formData.vac_mea, 'Not Sure'),
      chick_y: check(formData.vac_chick, 'Yes'), chick_n: check(formData.vac_chick, 'No'), chick_s: check(formData.vac_chick, 'Not Sure'),
      typh_y: check(formData.vac_typh, 'Yes'), typh_n: check(formData.vac_typh, 'No'), typh_s: check(formData.vac_typh, 'Not Sure'),

      // ==========================================
      // MEDICAL HISTORY (Yes / No)
      // ==========================================
      mh_blood_y: check(formData.mh_blood, 'Yes'), mh_blood_n: check(formData.mh_blood, 'No'),
      p_ulc_y: check(formData.mh_ulcer, 'Yes'), p_ulc_n: check(formData.mh_ulcer, 'No'),
      epil_y: check(formData.mh_epilepsy, 'Yes'), epil_n: check(formData.mh_epilepsy, 'No'),
      work_y: check(formData.mh_accident, 'Yes'), work_n: check(formData.mh_accident, 'No'),
      ears_y: check(formData.mh_ear, 'Yes'), ears_n: check(formData.mh_ear, 'No'),
      r_head_y: check(formData.mh_headache, 'Yes'), r_head_n: check(formData.mh_headache, 'No'),
      r_a_p_y: check(formData.mh_abd_pain, 'Yes'), r_a_p_n: check(formData.mh_abd_pain, 'No'),
      s_dis_y: check(formData.mh_skin, 'Yes'), s_dis_n: check(formData.mh_skin, 'No'),
      m_skel_y: check(formData.mh_musculo, 'Yes'), m_skel_n: check(formData.mh_musculo, 'No'),
      m_ill_y: check(formData.mh_mental, 'Yes'), m_ill_n: check(formData.mh_mental, 'No'), // Typo m_ill_ diperbaiki ke m_ill_n
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

      // ==========================================
      // FAMILY HISTORY (Yes / No)
      // ==========================================
      dia_y: check(formData.fm_diabetes, 'Yes'), dia_n: check(formData.fm_diabetes, 'No'),
      hyp_y: check(formData.fm_hypertension, 'Yes'), hyp_n: check(formData.fm_hypertension, 'No'),
      fm_epil_y: check(formData.fm_epilepsy, 'Yes'), fm_epil_n: check(formData.fm_epilepsy, 'No'), // Menggunakan tag yg diperbaiki
      fm_h_dis_y: check(formData.fm_heart, 'Yes'), fm_h_dis_n: check(formData.fm_heart, 'No'), // Menggunakan tag yg diperbaiki
      ast_y: check(formData.fm_asthma, 'Yes'), ast_n: check(formData.fm_asthma, 'No'),
      can_t_y: check(formData.fm_cancer, 'Yes'), can_t_n: check(formData.fm_cancer, 'No'),
      others_fm: formData.fm_others || "",

      // ==========================================
      // GENERAL QUESTIONS
      // ==========================================
      illness_y: check(formData.q_illness, 'Yes'), illness_n: check(formData.q_illness, 'No'),
      medev_y: check(formData.q_medevac, 'Yes'), medev_n: check(formData.q_medevac, 'No'),
      medev_why: formData.q_medevac_text || "",
      curren_y: check(formData.q_meds, 'Yes'), curren_n: check(formData.q_meds, 'No'),
      curren_ifyes: formData.q_meds_text || "",
      q_smoke_y: check(formData.q_smoke, 'Yes'), q_smoke_n: check(formData.q_smoke, 'No'),
      q_smoke_text: formData.q_smoke_text || "",
      alc_y: check(formData.q_alcohol, 'Yes'), alc_n: check(formData.q_alcohol, 'No'),
      fit_y: check(formData.q_fit, 'Yes'), fit_n: check(formData.q_fit, 'No'),
      fear_y: check(formData.q_fear, 'Yes'), fear_n: check(formData.q_fear, 'No'),
      stress_y: check(formData.q_stress, 'Yes'), stress_n: check(formData.q_stress, 'No'),
      strfull_y: check(formData.q_stressful, 'Yes'), strfull_n: check(formData.q_stressful, 'No'),
      qmfc_y: check(formData.q_omfc, 'Yes'), qmfc_n: check(formData.q_omfc, 'No'),
      omfc_ifyes: formData.q_omfc_text || "",

      // ==========================================
      // SECTION C: BIOMETRICS
      // ==========================================
      h: formData.height || "", w: formData.weight || "", bmi: formData.bmi || "",
      weist: formData.waist || "", p: formData.pulse || "", b_p: formData.bloodPressure || "",
      bg_type: formData.bloodGroupType || "", bg_rh: formData.bloodGroupRh || "",

      // (Catatan: Section B (Doctor's Lab) sengaja tidak dipetakan di form Frontend karena 
      // ini wilayah isi dokter, namun tag di Word akan aman/dikosongkan secara otomatis).
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${selectedFormat}_terisi.docx"`,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal.' }, { status: 500 });
  }
}