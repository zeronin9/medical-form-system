import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini sama persis dengan nama template Word Anda di folder public/templates
    const fileName = '2. MLC.docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // Memaksa TypeScript mengabaikan error tipe dengan @ts-ignore
    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Bersihkan undefined menjadi string kosong
    });

    // --- HELPER FUNCTIONS ---
    // 1. Helper untuk mencetak Checkbox (☑ / ☐)
    const check = (value: any, expected: string | boolean) => value === expected ? '☑' : '☐';
    
    // 2. Helper Cerdas untuk format MLC Halaman 1 (Teks "Yes" / "No")
    const yesNo = (val: any) => {
        if (val === 'Yes' || val === 'Fit' || val === 'With') return 'Yes';
        if (val === 'No' || val === 'Unfit' || val === 'Without') return 'No';
        return ''; // Kosong jika belum dipilih di UI
    };

    doc.render({
      // ==========================================
      // HALAMAN 1 & 3: IDENTITAS & ADMINISTRASI
      // ==========================================
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      company: formData.company || "",
      gender: formData.gender || "",
      dob: formData.dob || "",
      nationality: formData.nationality || "",
      id_passport: formData.idPassport || "",
      ilo_position: formData.ilo_position || "",
      date: formData.date || new Date().toLocaleDateString('id-ID'),
      exp_date: formData.exp_date || "",
      address: formData.address || "",
      seaman_book: formData.seaman_book || "",
      type_of_ship: formData.typeOfShip || "",
      trade_area: formData.tradeArea || "",
      department: formData.department || "",

      // Pemecahan String Tanggal Lahir untuk Halaman 3 (DD/MM/YYYY)
      day: (formData.dob || "").split(/[-/ ]/)[0] || "",
      month: (formData.dob || "").split(/[-/ ]/)[1] || "",
      year: (formData.dob || "").split(/[-/ ]/)[2] || "",

      // ==========================================
      // HALAMAN 1: KELAIKAN (SMART YES/NO)
      // ==========================================
      mlc_id: yesNo(formData.id_checked),
      mlc_hr_stcw: yesNo(formData.hr_stcw),
      mlc_hr_unaid: yesNo(formData.hr_unaid),
      mlc_vis_stcw: yesNo(formData.vis_stcw),
      mlc_col_stcw: yesNo(formData.col_stcw),
      mlc_fit_lookout: yesNo(formData.fit_lookout), 
      mlc_fit_sea: yesNo(formData.free_cond),
      mlc_free: yesNo(formData.free_cond),
      mlc_limit: yesNo(formData.restrictions),
      date_vt: formData.date || "",

      // ==========================================
      // HALAMAN 2: BIOMETRIK & KLINIS
      // ==========================================
      h: formData.height || "", w: formData.weight || "",
      p: formData.pulse || "", rhyt: formData.rhyt || "",
      bp_sys: formData.bloodPressure?.split('/')[0] || "",
      bp_dia: formData.bloodPressure?.split('/')[1] || "",
      
      // Vision Acuity (Ketajaman Mata)
      disr_unc: formData.disr_unc || "", disl_unc: formData.disl_unc || "", bv_unc: formData.bv_unc || "",
      disr_cor: formData.disr_cor || "", disl_cor: formData.disl_cor || "", bv_cor: formData.bv_cor || "",
      nearr_unc: formData.nearr_unc || "", nearl_unc: formData.nearl_unc || "", near_bv_unc: formData.near_bv_unc || "",
      nearr_cor: formData.nearr_cor || "", nearl_cor: formData.nearl_cor || "", near_bv_cor: formData.near_bv_cor || "",
      
      // Visual Fields
      vf_r_n: check(formData.vf_r, 'Normal'), vf_r_d: check(formData.vf_r, 'Defective'),
      vf_l_n: check(formData.vf_l, 'Normal'), vf_l_d: check(formData.vf_l, 'Defective'),
      
      // Colour Vision
      cv_n: check(formData.color_vision, 'Normal'), 
      cv_df: check(formData.color_vision, 'Total') || check(formData.color_vision, 'Partial'),
      
      // Hearing & Otoscopy (Daur Ulang THT)
      hr_r_n: check(formData.ent, 'Normal'), hr_r_s: check(formData.ent, 'Normal'), hr_r_o: check(formData.ent, 'Normal'),
      hr_l_n: check(formData.ent, 'Normal'), hr_l_s: check(formData.ent, 'Normal'), hr_l_o: check(formData.ent, 'Normal'),

      // Physical Exam (Smart Grouping Normal/Abnormal)
      head_n: check(formData.c_n_s, 'Normal'), head_a: check(formData.c_n_s, 'Abnormal'),
      ent_n: check(formData.ent, 'Normal'), ent_a: check(formData.ent, 'Abnormal'),
      oral_n: check(formData.oral_c, 'Normal'), oral_a: check(formData.oral_c, 'Abnormal'),
      ear_n: check(formData.ent, 'Normal'), ear_a: check(formData.ent, 'Abnormal'),
      eye_n: check(formData.eyes, 'Normal'), eye_a: check(formData.eyes, 'Abnormal'),
      oph_n: check(formData.eyes, 'Normal'), oph_a: check(formData.eyes, 'Abnormal'),
      pupil_n: check(formData.eyes, 'Normal'), pupil_a: check(formData.eyes, 'Abnormal'),
      eyem_n: check(formData.eyes, 'Normal'), eyem_a: check(formData.eyes, 'Abnormal'),
      lung_n: check(formData.chest, 'Normal'), lung_a: check(formData.chest, 'Abnormal'),
      breast_n: check(formData.chest, 'Normal'), breast_a: check(formData.chest, 'Abnormal'),
      heart_n: check(formData.cardio, 'Normal'), heart_a: check(formData.cardio, 'Abnormal'),
      skin_n: check(formData.skin, 'Normal'), skin_a: check(formData.skin, 'Abnormal'),
      var_n: check(formData.vas_s, 'Normal'), var_a: check(formData.vas_s, 'Abnormal'),
      vasc_n: check(formData.vas_s, 'Normal'), vasc_a: check(formData.vas_s, 'Abnormal'),
      abd_n: check(formData.abdom, 'Normal'), abd_a: check(formData.abdom, 'Abnormal'),
      hern_n: check(formData.her_or, 'Normal'), hern_a: check(formData.her_or, 'Abnormal'),
      anus_n: check(formData.anus_r, 'Normal'), anus_a: check(formData.anus_r, 'Abnormal'),
      gu_n: check(formData.genito, 'Normal'), gu_a: check(formData.genito, 'Abnormal'),
      ext_n: check(formData.extrem, 'Normal'), ext_a: check(formData.extrem, 'Abnormal'),
      spine_n: check(formData.musculo, 'Normal'), spine_a: check(formData.musculo, 'Abnormal'),
      neuro_n: check(formData.c_n_s, 'Normal'), neuro_a: check(formData.c_n_s, 'Abnormal'),
      psych_n: check(formData.c_n_s, 'Normal'), psych_a: check(formData.c_n_s, 'Abnormal'),
      gen_n: check(formData.c_n_s, 'Normal'), gen_a: check(formData.c_n_s, 'Abnormal'),

      // Diagnostics & Lab
      xray_res: formData.xray === 'Normal' ? 'NORMAL' : (formData.des_abnor || ""),
      hiv_res: formData.hiv_res || "",
      vdrl_res: formData.vdrl_res || "",
      ur_sugar: formData.ur_sugar || "",
      albumin: formData.albumin || "",
      urin_b: formData.urin_b || "",
      diag: formData.diag || "",
      
      // Fitness Checkout (Checkboxes Bawah Halaman 2)
      lo_f: check(formData.fit_lookout, 'Fit'), lo_u: check(formData.fit_lookout, 'Unfit'),
      dk_f: check(formData.fit_deck, 'Fit'), dk_u: check(formData.fit_deck, 'Unfit'),
      en_f: check(formData.fit_engine, 'Fit'), en_u: check(formData.fit_engine, 'Unfit'),
      ct_f: check(formData.fit_catering, 'Fit'), ct_u: check(formData.fit_catering, 'Unfit'),
      ot_f: check(formData.fit_other, 'Fit'), ot_u: check(formData.fit_other, 'Unfit'),
      glass_y: check(formData.glass_nec, 'Yes'), glass_n: check(formData.glass_nec, 'No'),
      rest_yes: check(formData.restrictions, 'With'), rest_no: check(formData.restrictions, 'Without'),
      rest_desc: formData.rest_desc || "",
      
      // Dokter & RS
      eps: formData.eps || "",
      hospital: formData.hospital || "",

      // ==========================================
      // HALAMAN 3: KUESIONER MEDIS (1-42)
      // ==========================================
      q1_y: check(formData.mh_eye, 'Yes'), q1_n: check(formData.mh_eye, 'No'),
      q2_y: check(formData.mh_hbp, 'Yes'), q2_n: check(formData.mh_hbp, 'No'),
      q3_y: check(formData.mh_heart, 'Yes'), q3_n: check(formData.mh_heart, 'No'),
      q4_y: check(formData.mh_surgery, 'Yes'), q4_n: check(formData.mh_surgery, 'No'),
      q5_y: check(formData.mh_vascular, 'Yes'), q5_n: check(formData.mh_vascular, 'No'),
      q6_y: check(formData.mh_asthma, 'Yes'), q6_n: check(formData.mh_asthma, 'No'),
      q7_y: check(formData.mh_blood, 'Yes'), q7_n: check(formData.mh_blood, 'No'),
      q8_y: check(formData.mh_diabetes, 'Yes'), q8_n: check(formData.mh_diabetes, 'No'),
      q9_y: check(formData.mh_thyroid, 'Yes'), q9_n: check(formData.mh_thyroid, 'No'),
      q10_y: check(formData.mh_ulcer, 'Yes'), q10_n: check(formData.mh_ulcer, 'No'),
      q11_y: check(formData.mh_kidney, 'Yes'), q11_n: check(formData.mh_kidney, 'No'),
      q12_y: check(formData.mh_skin, 'Yes'), q12_n: check(formData.mh_skin, 'No'),
      q13_y: check(formData.mh_skin, 'Yes'), q13_n: check(formData.mh_skin, 'No'),
      q14_y: check(formData.mh_std, 'Yes'), q14_n: check(formData.mh_std, 'No'),
      q15_y: check(formData.mh_surgery, 'Yes'), q15_n: check(formData.mh_surgery, 'No'),
      q16_y: check(formData.mh_std, 'Yes'), q16_n: check(formData.mh_std, 'No'),
      q17_y: check(formData.mh_pregnancy, 'Yes'), q17_n: check(formData.mh_pregnancy, 'No'),
      q18_y: check(formData.mh_mental, 'Yes'), q18_n: check(formData.mh_mental, 'No'),
      
      // Gabungan Merokok dan/atau Alkohol
      q19_y: (formData.q_smoke === 'Yes' || formData.q_alcohol === 'Yes') ? '☑' : '☐',
      q19_n: (formData.q_smoke === 'No' && formData.q_alcohol === 'No') ? '☑' : '☐',
      
      q20_y: check(formData.mh_surgery, 'Yes'), q20_n: check(formData.mh_surgery, 'No'),
      q21_y: check(formData.mh_epilepsy, 'Yes'), q21_n: check(formData.mh_epilepsy, 'No'),
      q22_y: check(formData.mh_fainting, 'Yes'), q22_n: check(formData.mh_fainting, 'No'),
      q23_y: check(formData.mh_fainting, 'Yes'), q23_n: check(formData.mh_fainting, 'No'),
      q24_y: check(formData.mh_mental, 'Yes'), q24_n: check(formData.mh_mental, 'No'),
      q25_y: check(formData.mh_mental, 'Yes'), q25_n: check(formData.mh_mental, 'No'),
      q26_y: check(formData.mh_mental, 'Yes'), q26_n: check(formData.mh_mental, 'No'),
      q27_y: check(formData.mh_cns, 'Yes'), q27_n: check(formData.mh_cns, 'No'),
      q28_y: check(formData.mh_ear, 'Yes'), q28_n: check(formData.mh_ear, 'No'),
      q29_y: check(formData.mh_headache, 'Yes'), q29_n: check(formData.mh_headache, 'No'),
      q30_y: check(formData.mh_ear, 'Yes'), q30_n: check(formData.mh_ear, 'No'),
      q31_y: check(formData.mh_musculo, 'Yes'), q31_n: check(formData.mh_musculo, 'No'),
      q32_y: check(formData.mh_musculo, 'Yes'), q32_n: check(formData.mh_musculo, 'No'),
      q33_y: check(formData.mh_surgery, 'Yes'), q33_n: check(formData.mh_surgery, 'No'),
      q34_y: check(formData.mh_accident, 'Yes'), q34_n: check(formData.mh_accident, 'No'),
      q35_y: check(formData.q_medevac, 'Yes'), q35_n: check(formData.q_medevac, 'No'),
      q36_y: check(formData.mh_hospital, 'Yes'), q36_n: check(formData.mh_hospital, 'No'),
      q37_y: check(formData.q_omfc, 'Yes'), q37_n: check(formData.q_omfc, 'No'),
      q38_y: check(formData.q_omfc, 'Yes'), q38_n: check(formData.q_omfc, 'No'),
      q39_y: check(formData.q_illness, 'Yes'), q39_n: check(formData.q_illness, 'No'),
      q40_y: check(formData.q_fit, 'Yes'), q40_n: check(formData.q_fit, 'No'),
      q41_y: check(formData.mh_skin, 'Yes'), q41_n: check(formData.mh_skin, 'No'),
      q42_y: check(formData.q_meds, 'Yes'), q42_n: check(formData.q_meds, 'No'),

      // Penjelasan / Details
      epd_comments: formData.q_medevac_text || formData.mh_others || "",
      meds_text: formData.q_meds_text || "",
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="mlc_terisi.docx"`,
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