import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();

    // Pastikan nama file ini 100% sama dengan yang ada di folder public/templates Anda
    const fileName = 'Chevron Medical Form_updated.docx'; 
    
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

    // Helper Fungsi
    const cCheck = (value: any, expected: string | boolean) => value === expected ? 'X' : ''; // Untuk 43 Pertanyaan Chevron
    const checkNormal = (value: any, expected: string) => value === expected ? 'X' : ''; // Untuk pemeriksaan fisik
    const checkBox = (value: any, expected: string | boolean) => value === expected ? '☑' : '☐'; // Untuk checkbox khusus gaya hidup

    doc.render({
      // ==========================================
      // SECTION 1: IDENTITAS & PEKERJAAN
      // ==========================================
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      ddmmyy: formData.dob || "",
      ddmmyyyy: formData.dob || "",
      id_passport: formData.idPassport || "",
      emp_id: formData.idPassport || "",
      personal_id: formData.idPassport || "",
      position: formData.position || "",
      job_title: formData.position || "", // Menghubungkan {{job_title}} dengan Posisi/Jabatan
      company: formData.company || "",
      employer: formData.company || "",
      work_location: formData.workLocation || "",
      location: formData.workLocation || "",
      address: formData.address || "",
      date: formData.date || new Date().toLocaleDateString('id-ID'),
      service_date: formData.serviceDate || "",
      med_no: formData.medNo || "",
      gr: formData.gender === 'Male' ? 'Male' : (formData.gender === 'Female' ? 'Female' : ''),

      // ==========================================
      // SECTION 2: BIOMETRIK FISIK
      // ==========================================
      h: formData.height || "", 
      w: formData.weight || "", 
      bmi: formData.bmi || "",
      p: formData.pulse || "", 
      b_p: formData.bloodPressure || "", 
      rr: formData.respiratoryRate || "",
      bg_type: formData.bloodGroupType || "", 
      lab_rh: formData.bloodGroupRh || "",
      blood_g: formData.bloodGroupType || "",

      // ==========================================
      // SECTION 3: GAYA HIDUP (LIFESTYLE) - CHECKBOX
      // ==========================================
      alcohol_w: formData.q_alcohol === 'Yes' ? formData.q_alcohol_text || "" : "",
      
      // Menggunakan simbol Checkbox untuk Status Merokok
      n_smoker: checkBox(formData.q_smoke, 'No'), 
      smoker: checkBox(formData.q_smoke, 'Yes'),
      smoker_y: formData.q_smoke === 'Yes' ? formData.q_smoke_freq || "" : "",
      smoker_d: formData.q_smoke === 'Yes' ? formData.q_smoke_freq || "" : "",
      
      smoker_q: checkBox(formData.smoker_q, 'Yes'), // Checkbox untuk Quit
      smoker_q_y: formData.smoker_s_y || "",

      // ==========================================
      // SECTION 4: KUESIONER (44 PERTANYAAN MAPPING DARI QATAR)
      // ==========================================
      c_q1_y: cCheck(formData.mh_epilepsy, 'Yes'), c_q1_n: cCheck(formData.mh_epilepsy, 'No'),
      c_q2_y: cCheck(formData.mh_headache, 'Yes'), c_q2_n: cCheck(formData.mh_headache, 'No'),
      c_q3_y: cCheck(formData.mh_mental, 'Yes'), c_q3_n: cCheck(formData.mh_mental, 'No'),
      c_q4_y: cCheck(formData.mh_ear, 'Yes'), c_q4_n: cCheck(formData.mh_ear, 'No'),
      c_q5_y: cCheck(formData.mh_ear, 'Yes'), c_q5_n: cCheck(formData.mh_ear, 'No'),
      c_q6_y: cCheck(formData.mh_ear, 'Yes'), c_q6_n: cCheck(formData.mh_ear, 'No'),
      c_q7_y: cCheck(formData.mh_thyroid, 'Yes'), c_q7_n: cCheck(formData.mh_thyroid, 'No'),
      c_q8_y: cCheck(formData.mh_hbp, 'Yes'), c_q8_n: cCheck(formData.mh_hbp, 'No'),
      c_q9_y: cCheck(formData.mh_heart, 'Yes'), c_q9_n: cCheck(formData.mh_heart, 'No'),
      c_q10_y: cCheck(formData.mh_asthma, 'Yes'), c_q10_n: cCheck(formData.mh_asthma, 'No'),
      c_q11_y: cCheck(formData.mh_asthma, 'Yes'), c_q11_n: cCheck(formData.mh_asthma, 'No'),
      c_q12_y: cCheck(formData.mh_ulcer, 'Yes'), c_q12_n: cCheck(formData.mh_ulcer, 'No'),
      c_q13_y: cCheck(formData.mh_hep, 'Yes'), c_q13_n: cCheck(formData.mh_hep, 'No'),
      c_q14_y: cCheck(formData.mh_ulcer, 'Yes'), c_q14_n: cCheck(formData.mh_ulcer, 'No'),
      c_q15_y: cCheck(formData.mh_ulcer, 'Yes'), c_q15_n: cCheck(formData.mh_ulcer, 'No'),
      c_q16_y: cCheck(formData.mh_kidney, 'Yes'), c_q16_n: cCheck(formData.mh_kidney, 'No'),
      c_q17_y: cCheck(formData.mh_kidney, 'Yes'), c_q17_n: cCheck(formData.mh_kidney, 'No'),
      c_q18_y: cCheck(formData.mh_std, 'Yes'), c_q18_n: cCheck(formData.mh_std, 'No'),
      c_q19_y: cCheck(formData.mh_diabetes, 'Yes'), c_q19_n: cCheck(formData.mh_diabetes, 'No'),
      c_q20_y: cCheck(formData.mh_blood, 'Yes'), c_q20_n: cCheck(formData.mh_blood, 'No'),
      c_q21_y: cCheck(formData.mh_rheumatism, 'Yes'), c_q21_n: cCheck(formData.mh_rheumatism, 'No'),
      c_q22_y: cCheck(formData.mh_accident, 'Yes'), c_q22_n: cCheck(formData.mh_accident, 'No'),
      c_q23_y: cCheck(formData.mh_musculo, 'Yes'), c_q23_n: cCheck(formData.mh_musculo, 'No'),
      c_q24_y: cCheck(formData.mh_skin, 'Yes'), c_q24_n: cCheck(formData.mh_skin, 'No'),
      c_q25_y: cCheck(formData.mh_cancer, 'Yes'), c_q25_n: cCheck(formData.mh_cancer, 'No'),
      c_q26_y: cCheck(formData.mh_hospital, 'Yes'), c_q26_n: cCheck(formData.mh_hospital, 'No'),
      c_q27_y: cCheck(formData.mh_eye, 'Yes'), c_q27_n: cCheck(formData.mh_eye, 'No'),
      c_q28_y: cCheck(formData.mh_eye, 'Yes'), c_q28_n: cCheck(formData.mh_eye, 'No'),
      c_q29_y: cCheck(formData.mh_hospital, 'Yes'), c_q29_n: cCheck(formData.mh_hospital, 'No'),
      c_q30_y: cCheck(formData.q_illness, 'Yes'), c_q30_n: cCheck(formData.q_illness, 'No'),
      c_q31_y: cCheck(formData.q_meds, 'Yes'), c_q31_n: cCheck(formData.q_meds, 'No'),
      c_q32_y: cCheck(formData.mh_skin, 'Yes'), c_q32_n: cCheck(formData.mh_skin, 'No'),
      c_q33_y: cCheck(formData.mh_others !== "", true), c_q33_n: cCheck(formData.mh_others === "", true),
      c_q34_y: cCheck(formData.mh_accident, 'Yes'), c_q34_n: cCheck(formData.mh_accident, 'No'),
      c_q35_y: cCheck(formData.mh_accident, 'Yes'), c_q35_n: cCheck(formData.mh_accident, 'No'),
      c_q36_y: cCheck(formData.q_illness, 'Yes'), c_q36_n: cCheck(formData.q_illness, 'No'),
      c_q37_y: cCheck(formData.q_omfc, 'Yes'), c_q37_n: cCheck(formData.q_omfc, 'No'),
      c_q38_y: cCheck(formData.mh_accident, 'Yes'), c_q38_n: cCheck(formData.mh_accident, 'No'),
      c_q39_y: cCheck(formData.nw_radiation, true), c_q39_n: cCheck(formData.nw_radiation, false),
      c_q40_y: cCheck(formData.nw_confined, true), c_q40_n: cCheck(formData.nw_confined, false),
      c_q41_y: cCheck(formData.nw_heavy, true), c_q41_n: cCheck(formData.nw_heavy, false),
      c_q42_y: cCheck(formData.mh_skin, 'Yes'), c_q42_n: cCheck(formData.mh_skin, 'No'),
      c_q43_y: cCheck(formData.mh_skin, 'Yes'), c_q43_n: cCheck(formData.mh_skin, 'No'),
      c_q44_y: cCheck(formData.mh_pregnancy, 'Yes'), c_q44_n: cCheck(formData.mh_pregnancy, 'No'),

      // ==========================================
      // SECTION 5: PENGLIHATAN (VISION)
      // ==========================================
      date_vt: formData.date || new Date().toLocaleDateString('id-ID'),
      va_rt: formData.disr_unc || formData.disr_cor || "", 
      va_lt: formData.disl_unc || formData.disl_cor || "", 
      va_be: formData.bv_unc || formData.bv_cor || "", 
      color_blindness: formData.color_vision || "",

      // ==========================================
      // SECTION 6: PEMERIKSAAN FISIK DOKTER
      // ==========================================
      eyes_n: checkNormal(formData.eyes, 'Normal'), eyes_a: checkNormal(formData.eyes, 'Abnormal'),
      ears_n: checkNormal(formData.ent, 'Normal'), ears_a: checkNormal(formData.ent, 'Abnormal'),
      nose_n: checkNormal(formData.ent, 'Normal'), nose_a: checkNormal(formData.ent, 'Abnormal'),
      throat_n: checkNormal(formData.ent, 'Normal'), throat_a: checkNormal(formData.ent, 'Abnormal'),
      den_c_n: checkNormal(formData.oral_c, 'Normal'), den_c_a: checkNormal(formData.oral_c, 'Abnormal'),
      n_t_n: checkNormal(formData.ent, 'Normal'), n_t_a: checkNormal(formData.ent, 'Abnormal'),
      breast_n: checkNormal(formData.chest, 'Normal'), breast_a: checkNormal(formData.chest, 'Abnormal'),
      lung_n: checkNormal(formData.chest, 'Normal'), lung_a: checkNormal(formData.chest, 'Abnormal'),
      heart_n: checkNormal(formData.cardio, 'Normal'), heart_a: checkNormal(formData.cardio, 'Abnormal'),
      abdomen_n: checkNormal(formData.abdom, 'Normal'), abdomen_a: checkNormal(formData.abdom, 'Abnormal'),
      hernia_n: checkNormal(formData.her_or, 'Normal'), hernia_a: checkNormal(formData.her_or, 'Abnormal'),
      genit_n: checkNormal(formData.genito, 'Normal'), genit_a: checkNormal(formData.genito, 'Abnormal'),
      rectal_n: checkNormal(formData.anus_r, 'Normal'), rectal_a: checkNormal(formData.anus_r, 'Abnormal'),
      pelvic_e_n: checkNormal(formData.genito, 'Normal'), pelvic_e_a: checkNormal(formData.genito, 'Abnormal'),
      lymph_n: checkNormal(formData.ent, 'Normal'), lymph_a: checkNormal(formData.ent, 'Abnormal'),
      skin_n: checkNormal(formData.skin, 'Normal'), skin_a: checkNormal(formData.skin, 'Abnormal'),
      muscul_n: checkNormal(formData.musculo, 'Normal'), muscul_a: checkNormal(formData.musculo, 'Abnormal'),
      reflex_n: checkNormal(formData.c_n_s, 'Normal'), reflex_a: checkNormal(formData.c_n_s, 'Abnormal'),

      // ==========================================
      // SECTION 7: HASIL LAB & TES KHUSUS
      // ==========================================
      // Spirometri
      ft_fvc: formData.ft_fvc || "", pre_fvc: formData.pre_fvc || "", 
      ft_fev1: formData.ft_fev1 || "", pre_fev1: formData.pre_fev1 || "", 
      ev1_vc: formData.ev1_vc || "",
      
      // Audiometri
      l05: formData.l05 || "", l1: formData.l1 || "", l2: formData.l2 || "", l3: formData.l3 || "", l4: formData.l4 || "", l6: formData.l6 || "", l8: formData.l8 || "",
      r05: formData.r05 || "", r1: formData.r1 || "", r2: formData.r2 || "", r3: formData.r3 || "", r4: formData.r4 || "", r6: formData.r6 || "", r8: formData.r8 || "",
      oth_result: formData.oht_result || "", // Diubah menjadi oth_result sesuai dengan screenshot sebelumnya
      
      // EKG
      rate: formData.rate || "", rhyt: formData.rhyt || "", axis: formData.axis || "",
      pr: formData.pr || "", qrs: formData.qrs || "", twv: formData.twv || "", diag: formData.diag || "", 
      
      // Darah Lengkap (Hematologi)
      lab_hb: formData.lab_hb || "", lab_hct: formData.lab_hct || "", rbc_m: formData.rbc_m || "", 
      lab_wbc: formData.lab_wbc || "", pmn: formData.pmn || "", lymph: formData.lymph || "", 
      mono: formData.mono || "", eos: formData.eos || "", baso: formData.baso || "", band: formData.band || "",
      lab_platelet: formData.lab_platelet || "", rbc: formData.rbc || "", wbc: formData.wbc || "", 
      
      // Urinalisis
      albumin: formData.albumin || "", ur_sugar: formData.ur_sugar || "", urin_b: formData.urin_b || "", 
      casts: formData.casts || "", ur_others: formData.ur_others || "",
      
      // Kimia Darah
      lab_sugar: formData.lab_sugar || "", val_sugar: formData.val_sugar || "", 
      lab_chol: formData.lab_chol || "", val_chol: formData.val_chol || "", 
      lab_trig: formData.lab_trig || "", val_trig: formData.val_trig || "", 
      lab_hdl: formData.lab_hdl || "", val_hdl: formData.val_hdl || "", 
      lab_ldl: formData.lab_ldl || "", val_ldl: formData.val_ldl || "", 
      lab_bun: formData.lab_bun || "", val_bun: formData.val_bun || "", 
      lab_creat: formData.lab_creat || "", val_creat: formData.val_creat || "", 
      lab_sgot: formData.lab_sgot || "", val_sgot: formData.val_sgot || "", 
      lab_sgpt: formData.lab_sgpt || "", val_sgpt: formData.val_sgpt || "", 
      lab_uric: formData.lab_uric || "", val_urig: formData.val_urig || "", 
      
      // Temuan Lainnya & X-Ray
      only_cg: formData.only_cg || "", 
      detail_af: formData.detail_af || "",
      date_xray: formData.date_xray || "", 
      nor: checkNormal(formData.xray, 'Normal'), abnor: checkNormal(formData.xray, 'Abnormal'), 
      des_abnor: formData.des_abnor || "",
      
      // ==========================================
      // SECTION 8: KESIMPULAN & TANDA TANGAN
      // ==========================================
      summary: formData.summary || "", 
      suggestion: formData.suggestion || "", 
      eps: formData.eps || "", 
      hospital: formData.hospital || "", 
      comments: formData.comments || ""
    });

    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="chevron_terisi.docx"`,
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