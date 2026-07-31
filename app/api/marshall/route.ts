import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    
    // Pastikan nama file ini sama persis dengan template Word Marshall Anda
    // Sesuaikan dengan nama file yang ada di dalam folder public/templates
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

    // --- HELPER FUNCTIONS ---
    // 1. Helper Checkbox Marshall (☑ / ☐)
    const check = (val: any, expected: string | boolean) => val === expected ? '☑' : '☐';
    const checkYes = (val: any) => (val === 'Yes' || val === true) ? '☑' : '☐';
    const checkNo = (val: any) => (val === 'No' || val === false || val === undefined || val === '') ? '☑' : '☐'; 
    
    // 2. Helper Smart Grouping untuk Deskripsi Sistemik
    const getDesc = (status: string, remark: string) => status === 'Normal' ? 'Normal' : (remark || status || "");

    // --- PARSING TANGGAL LAHIR ---
    const dobDate = formData.dob ? new Date(formData.dob) : null;
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const dobMonth = dobDate ? monthNames[dobDate.getMonth()] : "";
    const dobDay = dobDate ? dobDate.getDate().toString().padStart(2, '0') : "";
    const dobYear = dobDate ? dobDate.getFullYear().toString() : "";

    // --- RENDER VARIABEL KE TEMPLATE ---
    doc.render({
      // 1. Identitas Dasar
      family_name: formData.familyName || "",
      first_name: formData.firstName || "",
      month_text: dobMonth,
      day: dobDay,
      year: dobYear,
      pob_city: formData.pob_city || formData.placeOfBirth?.split(',')[0] || "",
      pob_country: formData.pob_country || formData.nationality || "",
      g_m: check(formData.gender, 'Male'),
      g_f: check(formData.gender, 'Female'),
      address: formData.address || "",

      // 2. Posisi Pekerjaan (EXAMINATION FOR DUTY AS)
      pos_mas: check(formData.position, 'Master'),
      pos_dec: check(formData.position, 'Deck Officer'),
      pos_eng: check(formData.position, 'Engineering Officer'),
      pos_rad: check(formData.position, 'Radio Officer'),
      pos_rat: check(formData.position, 'Rating'),
      pos_ccook: check(formData.position, 'Chief Cook'), 
      pos_cook: check(formData.position, 'Cook'), 

      // 3. Tanda-Tanda Vital & Penampilan Fisik
      h: formData.height || "",
      w: formData.weight || "",
      bp: formData.bloodPressure || "",
      p: formData.pulse || "",
      rr: formData.rr || "", // Respiration
      gen_app: formData.gen_app || "Good", // Default 'Good' jika data kosong

      // 4. Penglihatan & Pendengaran
      disr_unc: formData.disr_unc || "",
      disl_unc: formData.disl_unc || "",
      disr_cor: formData.disr_cor || "",
      disl_cor: formData.disl_cor || "",
      // Jika data hearing tidak spesifik per telinga, ambil dari status THT (ent)
      hear_r: formData.hear_r || (formData.ent === 'Normal' ? 'Normal' : ''),
      hear_l: formData.hear_l || (formData.ent === 'Normal' ? 'Normal' : ''),

      // 5. Tes Warna & Kacamata
      col_book: check(formData.color_test_type, 'Book') || '☑', // Default ke Book/Ishihara
      col_lant: check(formData.color_test_type, 'Lantern'),
      cv_y: check(formData.color_vision, 'Normal'),
      cv_n: check(formData.color_vision, 'Total') || check(formData.color_vision, 'Partial') ? '☑' : '☐',
      // Logika Kacamata: Jika vision corrected terisi, maka Yes.
      glass_y: (formData.disr_cor || formData.disl_cor) ? '☑' : '☐',
      glass_n: !(formData.disr_cor || formData.disl_cor) ? '☑' : '☐',

      // 6. Pemeriksaan Fisik Sistemik
      head_neck: getDesc(formData.ent, formData.ent_r),
      heart_desc: getDesc(formData.cardio, formData.cardio_r),
      lungs_desc: getDesc(formData.chest, formData.chest_r),
      speech_desc: getDesc(formData.ent, formData.ent_r),
      ext_up: getDesc(formData.extrem, formData.extrem_r),
      ext_low: getDesc(formData.extrem, formData.extrem_r),

      // 7. Kuesioner Medis (Yes / No)
      vac_y: checkYes(formData.vaccinated), // Pemetaan dari UI
      vac_n: checkNo(formData.vaccinated),
      suffer_y: checkYes(formData.q_illness),
      suffer_n: checkNo(formData.q_illness),
      meds_y: checkYes(formData.q_meds),
      meds_n: checkNo(formData.q_meds),

      // 8. Bagian Tanda Tangan & Sertifikasi Dokter
      name: `${formData.firstName || ""} ${formData.familyName || ""}`.trim(),
      date: formData.date || new Date().toLocaleDateString('en-GB'),
      exp_date: formData.exp_date || "", // Sesuai isian di form aplikasi
      
      com_y: check(formData.free_cond, 'Yes') || '☑', // Default ke Yes
      com_n: check(formData.free_cond, 'No'),
      
      fit_y: check(formData.fit_lookout, 'Fit') || check(formData.q_fit, 'Yes') ? '☑' : '☐',
      fit_n: check(formData.fit_lookout, 'Unfit') || check(formData.q_fit, 'No') ? '☑' : '☐',
      
      rest_no: check(formData.restrictions, 'No') || '☑', // Default Without restrictions
      rest_yes: check(formData.restrictions, 'Yes'),
      rest_desc: formData.restrictions_desc || "",
      
      eps: formData.eps || "",
      hospital: formData.hospital || "",
      cert_auth: formData.cert_auth || "Medical Council", 
    });

    // Menghasilkan dokumen biner (ZIP format untuk DOCX)
    const buf = doc.getZip().generate({ type: 'uint8array', compression: 'DEFLATE' });
    
    // Mengembalikan dokumen sebagai attachment yang bisa di-download
    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="Marshall_Report.docx"',
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