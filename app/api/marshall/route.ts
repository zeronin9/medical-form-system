import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini persis dengan template Word Marshall Anda
    const fileName = '3. MARSHALL.docx'; 
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: function() { return ""; } // Mencegah munculnya teks "undefined" di Word
    });

    // --- PARSING TANGGAL LAHIR (Bulan Teks, Hari, Tahun) ---
    const dobDate = formData.dob ? new Date(formData.dob) : null;
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const dobMonth = dobDate ? monthNames[dobDate.getMonth()] : "";
    const dobDay = dobDate ? dobDate.getDate().toString().padStart(2, '0') : "";
    const dobYear = dobDate ? dobDate.getFullYear().toString() : "";

    // --- ROLL-UP LOGIC UNTUK DESKRIPSI SISTEMIK MARSHALL ---
    // Marshall meminta deskripsi teks "Normal" atau keterangan abnormalitasnya.
    const getSystemDesc = (fields: string[], remark: string) => {
        const isAbnormal = fields.some(field => formData[field] === 'Abnormal');
        return isAbnormal ? (remark || "Abnormal") : "Normal";
    };

    // Mapping berdasarkan organ spesifik Smart UI
    const headNeckDesc = getSystemDesc(['rs_nasal', 'rs_thyroid', 'rs_trachea', 'ea_meatus', 'ea_drums', 'ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi', 'al_teeth', 'al_tongue'], 
        [formData.rs_comm, formData.ea_comm, formData.ey_comm, formData.al_comm].filter(Boolean).join('. '));
    
    const heartDesc = getSystemDesc(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs', 'cv_varicose'], formData.cv_comm);
    const lungsDesc = getSystemDesc(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent'], formData.rs_comm);
    const extDesc = getSystemDesc(['ms_hands', 'ms_limbs', 'ms_joints'], formData.ms_comm);

    // --- RENDER VARIABEL KE TEMPLATE LENGKAP 100% ---
    doc.render({
      // 1. Identitas Dasar
      family_name: formData.familyName || "",
      first_name: formData.firstName || "", // Telah digabungkan dari UI
      month_text: dobMonth,
      day: dobDay,
      year: dobYear,
      pob_city: formData.pob_city || "",
      pob_country: formData.pob_country || formData.nationality || "",
      g_m: formData.gender === 'Male' ? '☑' : '☐',
      g_f: formData.gender === 'Female' ? '☑' : '☐',
      address: formData.address || "",

      // 2. Posisi Pekerjaan (EXAMINATION FOR DUTY AS)
      pos_mas: formData.ilo_position === 'Master' ? '☑' : '☐',
      pos_dec: formData.ilo_position === 'Deck Officer' ? '☑' : '☐',
      pos_eng: formData.ilo_position === 'Engineering Officer' ? '☑' : '☐',
      pos_rad: (formData.ilo_position === 'Radio Officer' || formData.ilo_position === 'Radio Operator') ? '☑' : '☐',
      pos_rat: formData.ilo_position === 'Rating' ? '☑' : '☐',
      pos_ccook: formData.ilo_position === 'Chief Cook' ? '☑' : '☐', 
      pos_cook: formData.ilo_position === 'Cook' ? '☑' : '☐', 

      // 3. Tanda-Tanda Vital & Penampilan Fisik
      h: formData.height || "",
      w: formData.weight || "",
      bp: formData.bloodPressure || "",
      p: formData.pulse || "",
      rr: formData.rr || formData.respiratoryRate || "-", 
      gen_app: formData.gen_app === 'Abnormal' ? 'Abnormal' : "Good", 

      // 4. Penglihatan & Pendengaran
      disr_unc: formData.disr_unc || "-",
      disl_unc: formData.disl_unc || "-",
      disr_cor: formData.disr_cor || "-",
      disl_cor: formData.disl_cor || "-",
      hear_r: formData.hear_r || (getSystemDesc(['ea_meatus', 'ea_drums'], '') === 'Normal' ? 'Normal' : 'Abnormal'),
      hear_l: formData.hear_l || (getSystemDesc(['ea_meatus', 'ea_drums'], '') === 'Normal' ? 'Normal' : 'Abnormal'),

      // 5. Tes Warna & Kacamata 
      col_book: formData.color_test_type === 'Book' ? '☑' : '☐', 
      col_lant: formData.color_test_type === 'Lantern' ? '☑' : '☐',
      cv_y: formData.color_vision === 'Normal' ? '☑' : '☐',
      cv_n: (formData.color_vision === 'Partial' || formData.color_vision === 'Total') ? '☑' : '☐',
      glass_y: (formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      glass_n: !(formData.disr_cor || formData.disl_cor) ? '☑' : '☐',

      // 6. Pemeriksaan Fisik Sistemik (MENGGUNAKAN SMART UI ROLL-UP)
      head_neck: headNeckDesc,
      heart_desc: heartDesc,
      lungs_desc: lungsDesc,
      speech_desc: "Yes", // Default Speech Unimpaired = Yes
      ext_up: extDesc,
      ext_low: extDesc,

      // 7. Kuesioner Medis
      vac_y: formData.vaccinated === 'Yes' ? '☑' : '☐', 
      vac_n: formData.vaccinated === 'No' ? '☑' : '☐',
      
      // Mencegah kontradiksi: Jika bebas penyakit menular (Yes), maka menderita penyakit (No)
      suffer_y: formData.free_cond === 'No' ? '☑' : '☐',
      suffer_n: formData.free_cond === 'Yes' ? '☑' : '☐',
      
      meds_y: formData.q_meds === 'Yes' ? '☑' : '☐',
      meds_n: formData.q_meds === 'No' ? '☑' : '☐',

      // 8. Bagian Tanda Tangan & Sertifikasi Dokter
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      date: formData.date || new Date().toLocaleDateString('en-GB'),
      exp_date: formData.exp_date || "", 
      
      com_y: formData.free_cond === 'Yes' ? '☑' : '☐',
      com_n: formData.free_cond === 'No' ? '☑' : '☐',
      
      fit_y: formData.fit_lookout === 'Fit' ? '☑' : '☐',
      fit_n: formData.fit_lookout === 'Unfit' ? '☑' : '☐',
      
      rest_no: formData.restrictions === 'No' ? '☑' : '☐', 
      rest_yes: formData.restrictions === 'Yes' ? '☑' : '☐',
      rest_desc: formData.restrictions === 'Yes' ? (formData.rest_desc || "No Specific Restrictions") : "Tidak ada",
      
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      cert_auth: formData.cert_auth || "Medical Council", 
    });

    // Menghasilkan dokumen biner
    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="Marshall_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan internal backend.' }, { status: 500 });
  }
}