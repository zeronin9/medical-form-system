'use client';
import { useState, useEffect } from 'react';

// === MASTER DATA ===
const natureOfWork = [
  { id: 'nw_confined', label: 'Ruang Terbatas (Confined Space)' }, { id: 'nw_diving', label: 'Menyelam (Diving)' },
  { id: 'nw_height', label: 'Bekerja di Ketinggian' }, { id: 'nw_swing', label: 'Tali Ayun (Swing Rope)' },
  { id: 'nw_heavy', label: 'Operator Alat Berat/Derek' }, { id: 'nw_office', label: 'Pekerjaan Kantor' },
  { id: 'nw_hanging', label: 'Menggantung / Suspensi' }, { id: 'nw_sewage', label: 'Pembuangan Limbah' },
  { id: 'nw_emergency', label: 'Petugas Tanggap Darurat' }, { id: 'nw_food', label: 'Penjamah Makanan' },
  { id: 'nw_radiation', label: 'Radiasi Pengion' }
];

const vaccines = [
  { id: 'vac_hepa', label: 'Hepatitis A' }, { id: 'vac_tet', label: 'Tetanus' },
  { id: 'vac_hepb', label: 'Hepatitis B' }, { id: 'vac_mea', label: 'Campak (Measles)' },
  { id: 'vac_c19', label: 'Covid-19' }, { id: 'vac_chick', label: 'Cacar Air (Chicken Pox)' },
  { id: 'vac_typh', label: 'Demam Tifoid' }
];

const medicalHistory = [
  { id: 'mh_blood', label: 'Kelainan Darah (Anemia, dll)' }, { id: 'mh_ulcer', label: 'Tukak Lambung / Usus' },
  { id: 'mh_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'mh_accident', label: 'Kecelakaan Kerja / Non-Kerja' },
  { id: 'mh_ear', label: 'Penyakit Telinga / Sinus' }, { id: 'mh_headache', label: 'Sakit Kepala Berulang' },
  { id: 'mh_abd_pain', label: 'Sakit Perut Berulang' }, { id: 'mh_skin', label: 'Penyakit Kulit / Alergi' },
  { id: 'mh_musculo', label: 'Gangguan Otot & Tulang' }, { id: 'mh_mental', label: 'Gangguan Mental (Cemas/Depresi)' },
  { id: 'mh_cns', label: 'Saraf Pusat / Stroke' }, { id: 'mh_heart', label: 'Penyakit Jantung' },
  { id: 'mh_hbp', label: 'Tekanan Darah Tinggi (Hipertensi)' }, { id: 'mh_diabetes', label: 'Diabetes (Kencing Manis)' },
  { id: 'mh_kidney', label: 'Masalah Ginjal / Kandung Kemih' }, { id: 'mh_rheumatism', label: 'Rematik / Radang Sendi' },
  { id: 'mh_fainting', label: 'Pingsan / Hilang Kesadaran' }, { id: 'mh_vascular', label: 'Penyakit Pembuluh Darah' },
  { id: 'mh_eye', label: 'Kondisi Mata (Katarak/Glaukoma)' }, { id: 'mh_asthma', label: 'Penyakit Paru (Asma, TBC)' },
  { id: 'mh_std', label: 'Penyakit Menular Seksual' }, { id: 'mh_hep', label: 'Hepatitis / Penyakit Kuning' },
  { id: 'mh_surgery', label: 'Pernah Operasi Besar' }, { id: 'mh_cancer', label: 'Kanker / Tumor' },
  { id: 'mh_drug', label: 'Penyalahgunaan Narkoba' }, { id: 'mh_thyroid', label: 'Penyakit Tiroid' },
  { id: 'mh_pregnancy', label: 'Sedang Hamil (Khusus Wanita)' }, { id: 'mh_hospital', label: 'Pernah Dirawat di RS' },
];

const familyHistory = [
  { id: 'fm_diabetes', label: 'Diabetes (Kencing Manis)' }, { id: 'fm_hypertension', label: 'Tekanan Darah Tinggi' },
  { id: 'fm_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'fm_heart', label: 'Penyakit Jantung' },
  { id: 'fm_asthma', label: 'Asma / Alergi' }, { id: 'fm_cancer', label: 'Kanker / Tumor' },
];

const physicalExams = [
  { id: 'eyes', label: 'Mata' }, { id: 'ent', label: 'Telinga, Hidung, Tenggorokan (THT)' },
  { id: 'oral_c', label: 'Rongga Mulut' }, { id: 'chest', label: 'Dada / Paru-paru' },
  { id: 'cardio', label: 'Sistem Kardiovaskular' }, { id: 'abdom', label: 'Perut (Abdomen)' },
  { id: 'her_or', label: 'Lubang Hernia' }, { id: 'anus_r', label: 'Anus dan Rektum' },
  { id: 'genito', label: 'Saluran Kemih & Kelamin' }, { id: 'extrem', label: 'Anggota Gerak (Ekstremitas)' },
  { id: 'musculo', label: 'Otot dan Tulang' }, { id: 'skin', label: 'Kulit' },
  { id: 'vas_s', label: 'Pembuluh Darah' }, { id: 'c_n_s', label: 'Sistem Saraf Pusat' }
];

const labReports = [
  { id: 'fbg', label: 'Gula Darah Puasa' }, { id: 'cbc', label: 'Darah Lengkap (CBC)' },
  { id: 'tcho', label: 'Kolesterol Total' }, { id: 'lft', label: 'Fungsi Hati (ALT, AST, dll)' },
  { id: 'rft', label: 'Fungsi Ginjal (Ureum, Kreatinin)' }, { id: 'urin', label: 'Urinalisis (Urin Rutin)' },
  { id: 'audi', label: 'Audiometri (Pendengaran)' }, { id: 'spir', label: 'Spirometri (Fungsi Paru)' },
  { id: 'ecg', label: 'Elektrokardiogram (EKG)' }, { id: 'xrey', label: 'Rontgen Dada (X-Ray)' },
  { id: 'idt', label: 'Tes Penyakit Menular (HIV, VDRL)' }, { id: 'hha1', label: 'HbA1c & Gula Darah 2 Jam PP' },
  { id: 'ffh', label: 'Tes Dahak/Feses (Khusus Makanan)' }
];

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<any>({
    firstName: '', familyName: '', dob: '', idPassport: '', nationality: '', gender: '', address: '', contactNumber: '',
    position: '', department: '', company: '', workLocation: '', date: new Date().toLocaleDateString('id-ID'),
    serviceDate: '', medNo: '',
    height: '', weight: '', waist: '', bmi: '', pulse: '', bloodPressure: '', respiratoryRate: '', bloodGroupType: '', bloodGroupRh: '',
    q_illness: '', q_medevac: '', q_medevac_text: '', q_meds: '', q_meds_text: '',
    q_smoke: '', q_smoke_text: '', q_smoke_freq: '', q_alcohol: '', q_alcohol_text: '',
    q_fit: '', q_fear: '', q_stress: '', q_stressful: '', q_stress_score: '', q_omfc: '', q_omfc_text: '',
    nw_others: '', mh_others: '', fm_others: '',
    disr_unc: '', disl_unc: '', nearr_unc: '', nearl_unc: '', bv_unc: '',
    disr_cor: '', disl_cor: '', nearr_cor: '', nearl_cor: '', bv_cor: '', color_vision: '',
    smoker_y: '', smoker_d: '', smoker_q: '', smoker_s_y: '', ft_fvc: '', pre_fvc: '', ft_fev1: '', pre_fev1: '', ev1_vc: '',
    l05: '', l1: '', l2: '', l3: '', l4: '', l6: '', l8: '', r05: '', r1: '', r2: '', r3: '', r4: '', r6: '', r8: '', oht_result: '',
    rate: '', rhyt: '', axis: '', pr: '', qrs: '', twv: '', diag: '', lab_hb: '', lab_hct: '', rbc_m: '', lab_wbc: '', lab_platelet: '',
    pmn: '', lymph: '', mono: '', eos: '', baso: '', band: '', albumin: '', ur_sugar: '', urin_b: '', wbc: '', rbc: '', casts: '', ur_others: '',
    lab_sugar: '', val_sugar: '', lab_chol: '', val_chol: '', lab_trig: '', val_trig: '', only_cg: '', lab_hdl: '', val_hdl: '', lab_ldl: '', val_ldl: '', lab_bun: '', val_bun: '', lab_creat: '', val_creat: '',
    lab_sgot: '', val_sgot: '', lab_sgpt: '', val_sgpt: '', lab_uric: '', val_urig: '', detail_af: '',
    date_xray: '', xray: '', des_abnor: '', summary: '', suggestion: '', eps: '', hospital: '', comments: ''
  });

  const isQatar = selectedFormats.includes('qatarenergy');
  const isChevron = selectedFormats.includes('chevron');
  const showForm = isQatar || isChevron;

  useEffect(() => {
    if (formData.height && formData.weight) {
      const h = parseFloat(formData.height) / 100; 
      const w = parseFloat(formData.weight);
      if (h > 0) setFormData((prev: any) => ({ ...prev, bmi: (w / (h * h)).toFixed(1) }));
    }
  }, [formData.height, formData.weight]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCheckboxChange = (e: any) => {
    const value = e.target.value;
    setSelectedFormats((prev) => e.target.checked ? [...prev, value] : prev.filter((f) => f !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFormats.length === 0) return alert("Pilih minimal satu format dokumen!");
    setIsLoading(true);
    
    try {
      for (const format of selectedFormats) {
        const apiRoute = format === 'chevron' ? '/api/chevron' : '/api/qatar';
        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData }), 
        });
        
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Gagal mencetak ${format}: ${errorResponse.error}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${format}_terisi.docx`;
        document.body.appendChild(a); a.click();
        window.URL.revokeObjectURL(url); document.body.removeChild(a);
      }
    } catch (error: any) { 
        alert(error.message); 
    } finally { 
        setIsLoading(false); 
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-black text-gray-900 mb-8 border-b-4 border-blue-600 pb-4">
            Sistem Formulir Medis Digital (SSOT)
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* PILIH DOKUMEN */}
          <div className="p-5 border border-blue-300 rounded-lg bg-blue-50">
            <h2 className="text-lg font-bold text-gray-900 mb-4">1. Pilih Dokumen yang Akan Dicetak:</h2>
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" value="chevron" onChange={handleCheckboxChange} className="w-6 h-6 text-blue-600" />
                <span className="text-gray-900 font-extrabold text-lg">Chevron</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" value="qatarenergy" onChange={handleCheckboxChange} className="w-6 h-6 text-blue-600" />
                <span className="text-gray-900 font-extrabold text-lg">QatarEnergy</span>
              </label>
            </div>
          </div>

          {!showForm && (
            <div className="text-center p-12 text-gray-600 font-bold border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 text-lg">
                👆 Silakan centang salah satu atau kedua dokumen di atas untuk mulai mengisi data.
            </div>
          )}

          {showForm && (
            <>
              {/* BAGIAN 1: IDENTITAS & PEKERJAAN (SHARED) */}
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-bold text-white bg-blue-700 px-4 py-3 rounded-md shadow">BAGIAN 1: Identitas Diri & Pekerjaan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 border border-gray-300 rounded-lg bg-white shadow-sm">
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Nama Depan</label><input type="text" name="firstName" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Contoh: Budi" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Nama Belakang / Marga</label><input type="text" name="familyName" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Contoh: Santoso" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">No. KTP / Paspor</label><input type="text" name="idPassport" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Tgl Lahir (DD/MM/YYYY)</label><input type="text" name="dob" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Contoh: 15/08/1990" /></div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900">Jenis Kelamin</label>
                    <select name="gender" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">-- Pilih --</option>
                      <option value="Male">Laki-Laki</option><option value="Female">Perempuan</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Posisi / Jabatan</label><input type="text" name="position" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Nama Perusahaan</label><input type="text" name="company" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Lokasi Kerja</label><input type="text" name="workLocation" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">No. Telepon / HP</label><input type="text" name="contactNumber" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div className="md:col-span-3 lg:col-span-3"><label className="block text-sm font-bold mb-1 text-gray-900">Alamat Lengkap</label><input type="text" name="address" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>

                  {/* KHUSUS CHEVRON ONLY */}
                  {isChevron && (
                    <>
                      <div><label className="block text-sm font-bold mb-1 text-teal-700">Tanggal Mulai Kerja (Service Date)</label><input type="text" name="serviceDate" onChange={handleInputChange} className="w-full border border-teal-400 p-2.5 rounded text-sm text-black font-semibold bg-white outline-none focus:ring-2 focus:ring-teal-500" /></div>
                      <div><label className="block text-sm font-bold mb-1 text-teal-700">No. Rekam Medis (Chevron)</label><input type="text" name="medNo" onChange={handleInputChange} className="w-full border border-teal-400 p-2.5 rounded text-sm text-black font-semibold bg-white outline-none focus:ring-2 focus:ring-teal-500" /></div>
                    </>
                  )}

                  {/* KHUSUS QATAR ONLY */}
                  {isQatar && (
                    <>
                      <div><label className="block text-sm font-bold mb-1 text-orange-700">Kewarganegaraan</label><input type="text" name="nationality" onChange={handleInputChange} className="w-full border border-orange-400 p-2.5 rounded text-sm text-black font-semibold bg-white outline-none focus:ring-2 focus:ring-orange-500" /></div>
                      <div><label className="block text-sm font-bold mb-1 text-orange-700">Departemen</label><input type="text" name="department" onChange={handleInputChange} className="w-full border border-orange-400 p-2.5 rounded text-sm text-black font-semibold bg-white outline-none focus:ring-2 focus:ring-orange-500" /></div>
                    </>
                  )}
                </div>
              </div>

              {/* BAGIAN 2: KUESIONER MEDIS */}
              <div className="space-y-6">
                <div className="p-6 border-2 border-indigo-300 rounded-xl bg-indigo-50 space-y-8 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-extrabold text-indigo-900 border-b-2 border-indigo-300 pb-2">BAGIAN 2: Kuisioner Medis & Riwayat Penyakit</h2>
                  <p className="text-sm text-indigo-700 font-semibold mb-4">Catatan: Pengisian bagian ini terhubung cerdas sebagai (Single Source of Truth) untuk mengisi tabel QatarEnergy dan 43 Pertanyaan Chevron.</p>
                  
                  {/* Sifat Pekerjaan (Shared) */}
                  <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">Sifat Pekerjaan (Bisa pilih lebih dari satu):</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {natureOfWork.map(n => (
                        <label key={n.id} className="flex items-center gap-2 text-sm text-gray-900 font-semibold cursor-pointer hover:bg-indigo-100 p-1 rounded">
                          <input type="checkbox" name={n.id} onChange={handleInputChange} className="w-5 h-5 accent-indigo-600" /> {n.label}
                        </label>
                      ))}
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row md:items-center gap-3 mt-2">
                        <span className="text-sm font-bold text-gray-900">Lainnya (Sebutkan):</span>
                        <input type="text" name="nw_others" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full md:w-2/3 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Vaksinasi (QATAR ONLY) */}
                  {isQatar && (
                    <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg">
                      <label className="block text-base font-bold text-orange-900 mb-3 border-b border-orange-200 pb-1">Riwayat Vaksinasi (Khusus QatarEnergy):</label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {vaccines.map(v => (
                          <div key={v.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                            <span className="text-sm font-bold text-gray-900 w-1/2">{v.label}</span>
                            <div className="flex gap-4 w-1/2 text-sm text-gray-900 font-semibold">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={v.id} value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={v.id} value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={v.id} value="Not Sure" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ragu</label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Riwayat Medis Diri Sendiri (Shared - Mapping ke 43 soal Chevron) */}
                  <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">Riwayat Penyakit (Diri Sendiri):</label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {medicalHistory.map(m => (
                        <div key={m.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                          <span className="text-sm font-bold text-gray-900 w-3/4">{m.label}</span>
                          <div className="flex gap-6 w-1/4 justify-end text-sm text-gray-900 font-semibold">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={m.id} value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={m.id} value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                          </div>
                        </div>
                      ))}
                      <div className="col-span-1 lg:col-span-2 flex flex-col md:flex-row md:items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">Penyakit Lainnya:</span>
                        <input type="text" name="mh_others" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded flex-1 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-indigo-500 bg-white" placeholder="Sebutkan jika ada riwayat penyakit lain..." />
                      </div>
                    </div>
                  </div>

                  {/* Riwayat Medis Keluarga (QATAR ONLY) */}
                  {isQatar && (
                    <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg">
                      <label className="block text-base font-bold text-orange-900 mb-3 border-b border-orange-200 pb-1">Riwayat Penyakit Keluarga (Khusus QatarEnergy):</label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {familyHistory.map(f => (
                          <div key={f.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                            <span className="text-sm font-bold text-gray-900 w-3/4">{f.label}</span>
                            <div className="flex gap-6 w-1/4 justify-end text-sm text-gray-900 font-semibold">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={f.id} value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={f.id} value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-1 lg:col-span-2 flex flex-col md:flex-row md:items-center gap-3">
                          <span className="text-sm font-bold text-gray-900">Penyakit Keluarga Lainnya:</span>
                          <input type="text" name="fm_others" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded flex-1 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pertanyaan Umum & Gaya Hidup */}
                  <div>
                    <label className="block text-base font-bold text-gray-900 mb-3">Pertanyaan Umum & Gaya Hidup:</label>
                    <div className="space-y-4">
                      {/* Shared (Chevron & Qatar) */}
                      <div className="flex flex-col bg-white p-4 border border-gray-300 rounded shadow-sm text-sm text-gray-900">
                        <div className="flex flex-col md:flex-row md:items-center justify-between font-bold mb-2">
                          <span className="mb-2 md:mb-0">1. Pernah menderita penyakit parah / cedera / dirawat di RS yang membuat absen kerja?</span>
                          <div className="flex gap-4">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_illness" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_illness" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col bg-white p-4 border border-gray-300 rounded shadow-sm text-sm text-gray-900">
                        <div className="flex flex-col md:flex-row md:items-center justify-between font-bold">
                          <span className="mb-2 md:mb-0">2. Apakah saat ini sedang rutin mengonsumsi obat-obatan?</span>
                          <div className="flex gap-4">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_meds" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_meds" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                          </div>
                        </div>
                        {formData.q_meds === 'Yes' && <input type="text" name="q_meds_text" placeholder="Sebutkan nama obat, dosis, dan frekuensi..." onChange={handleInputChange} className="border border-gray-400 p-2.5 mt-3 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />}
                      </div>

                      <div className="flex flex-col bg-white p-4 border border-gray-300 rounded shadow-sm text-sm text-gray-900">
                        <div className="flex flex-col md:flex-row md:items-center justify-between font-bold">
                          <span className="mb-2 md:mb-0">3. Apakah Anda merokok?</span>
                          <div className="flex gap-4 items-center">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_smoke" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_smoke" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            
                            {isChevron && (
                              <label className="cursor-pointer flex items-center gap-1 ml-4 border-l pl-4 border-gray-300 text-teal-700">
                                <input type="checkbox" name="smoker_q" onChange={(e) => setFormData({...formData, smoker_q: e.target.checked ? 'Yes' : 'No'})} className="w-4 h-4 accent-teal-600" /> Sudah Berhenti (Quit)
                              </label>
                            )}
                          </div>
                        </div>
                        
                        {formData.q_smoke === 'Yes' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <input type="text" name="q_smoke_text" placeholder="Jenis (Rokok, Vape)..." onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />
                            <input type="text" name="q_smoke_freq" placeholder="Berapa lama & batang/hari (Untuk Qatar)..." onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />
                            
                            {isChevron && <input type="number" name="smoker_y" placeholder="Berapa tahun merokok? (Khusus Chevron)" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-teal-500 font-semibold bg-white" />}
                            {isChevron && <input type="number" name="smoker_d" placeholder="Jml batang/hari? (Khusus Chevron)" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-teal-500 font-semibold bg-white" />}
                          </div>
                        )}

                        {formData.smoker_q === 'Yes' && isChevron && (
                          <div className="flex mt-3">
                            <input type="number" name="smoker_s_y" placeholder="Sudah berhenti berapa tahun? (Khusus Chevron)" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full md:w-1/2 outline-none focus:ring-2 focus:ring-teal-500 font-semibold bg-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col bg-white p-4 border border-gray-300 rounded shadow-sm text-sm text-gray-900">
                        <div className="flex flex-col md:flex-row md:items-center justify-between font-bold">
                          <span className="mb-2 md:mb-0">4. Mengonsumsi alkohol atau narkoba (obat rekreasi)?</span>
                          <div className="flex gap-4">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_alcohol" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_alcohol" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                          </div>
                        </div>
                        {formData.q_alcohol === 'Yes' && <input type="text" name="q_alcohol_text" placeholder="Jenis apa, frekuensi, dan seberapa banyak per minggu..." onChange={handleInputChange} className="border border-gray-400 p-2.5 mt-3 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />}
                      </div>

                      {/* Khusus Qatar Only Questions */}
                      {isQatar && (
                        <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg space-y-4">
                          <label className="block text-sm font-bold text-orange-900 border-b border-orange-200 pb-1 mb-2">Pertanyaan Gaya Hidup Khusus QatarEnergy:</label>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <span className="mb-2 md:mb-0">Punya riwayat Evakuasi Medis Darurat (MEDEVAC)?</span>
                            <div className="flex gap-4">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_medevac" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_medevac" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>
                          {formData.q_medevac === 'Yes' && <input type="text" name="q_medevac_text" placeholder="Jika Ya, jelaskan alasannya..." onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />}

                          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <span className="mb-2 md:mb-0">Merasa bugar dan sehat saat ini?</span>
                            <div className="flex gap-4">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_fit" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_fit" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <span className="mb-2 md:mb-0">Punya fobia? (Ketinggian, ruang sempit, terbang, dll)</span>
                            <div className="flex gap-4">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_fear" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_fear" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <span className="mb-2 md:mb-0">Sedang mengalami stres yang tidak biasa / berat?</span>
                            <div className="flex gap-4">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_stress" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_stress" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <span className="mb-2 md:mb-0">Apakah hidup Anda penuh tekanan? (Skala 1-10)</span>
                            <div className="flex gap-4 items-center">
                              {formData.q_stressful === 'Yes' && (
                                <input type="number" name="q_stress_score" min="1" max="10" placeholder="Skor" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-20 text-center outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />
                              )}
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_stressful" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_stressful" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                            </div>
                          </div>

                          <div className="flex flex-col bg-white p-3 border border-gray-300 rounded text-sm text-gray-900 font-bold">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <span className="mb-2 md:mb-0">Pernah ditolak Sertifikat Medis (OMFC) oleh QatarEnergy?</span>
                              <div className="flex gap-4">
                                <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_omfc" value="Yes" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Ya</label>
                                <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="q_omfc" value="No" onChange={handleInputChange} className="w-4 h-4 accent-indigo-600" /> Tidak</label>
                              </div>
                            </div>
                            {formData.q_omfc === 'Yes' && <input type="text" name="q_omfc_text" placeholder="Jika Ya, apa alasannya..." onChange={handleInputChange} className="border border-gray-400 p-2.5 mt-3 rounded w-full outline-none focus:ring-2 focus:ring-indigo-500 font-semibold bg-white" />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN 3: PEMERIKSAAN DOKTER UMUM (SHARED) */}
              <div className="p-6 border-2 border-red-400 rounded-xl bg-red-50 space-y-6 shadow-sm animate-fade-in">
                <h2 className="text-xl font-extrabold text-red-900 border-b-2 border-red-300 pb-2">BAGIAN 3: Pemeriksaan Dokter Umum (Fisik)</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pemeriksaan Fisik (Shared) */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {physicalExams.map(p => (
                        <div key={p.id} className="bg-white p-3 border border-red-300 rounded flex flex-col gap-2 shadow-sm">
                          <span className="text-sm font-bold text-gray-900">{p.label}</span>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex gap-4 text-sm font-bold text-gray-900 shrink-0">
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={p.id} value="Normal" onChange={handleInputChange} className="w-4 h-4 accent-red-600" /> Normal</label>
                              <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={p.id} value="Abnormal" onChange={handleInputChange} className="w-4 h-4 accent-red-600" /> Abnormal</label>
                            </div>
                            <input type="text" name={`${p.id}_r`} placeholder="Keterangan..." onChange={handleInputChange} className="border border-gray-400 rounded p-2.5 w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-red-500 bg-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN 4A: HASIL LAB KHUSUS QATARENERGY */}
              {isQatar && (
                <div className="p-6 border-2 border-orange-400 rounded-xl bg-orange-50 space-y-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-extrabold text-orange-900 border-b-2 border-orange-300 pb-2">BAGIAN 4A: Status Laboratorium (Khusus QatarEnergy)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {labReports.map(l => (
                      <div key={l.id} className="bg-white p-3 border border-orange-300 rounded flex flex-col gap-2 shadow-sm">
                        <span className="text-sm font-bold text-gray-900">{l.label}</span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex gap-4 text-sm font-bold text-gray-900 shrink-0">
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={l.id} value="Normal" onChange={handleInputChange} className="w-4 h-4 accent-orange-600" /> Normal</label>
                            <label className="cursor-pointer flex items-center gap-1"><input type="radio" name={l.id} value="Abnormal" onChange={handleInputChange} className="w-4 h-4 accent-orange-600" /> Abnormal</label>
                          </div>
                          <input type="text" name={`${l.id}_r`} placeholder="Keterangan..." onChange={handleInputChange} className="border border-gray-400 rounded p-2.5 w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-orange-500 bg-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BAGIAN 4B: HASIL LAB KHUSUS CHEVRON */}
              {isChevron && (
                <div className="p-6 border-2 border-teal-400 rounded-xl bg-teal-50 space-y-6 shadow-sm animate-fade-in">
                  <h2 className="text-xl font-extrabold text-teal-900 border-b-2 border-teal-300 pb-2">BAGIAN 4B: Detail Angka Laboratorium (Khusus Chevron)</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Spirometri & Audiometri & EKG */}
                    <div className="space-y-6">
                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Spirometri (Fungsi Paru)</h3>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">FVC</label><input type="text" name="ft_fvc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">% Predicted FVC</label><input type="text" name="pre_fvc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">FEV1</label><input type="text" name="ft_fev1" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">% Predicted FEV1</label><input type="text" name="pre_fev1" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div><label className="text-xs font-bold text-gray-700">FEV1 / FVC (%)</label><input type="text" name="ev1_vc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                      </div>

                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Audiometri (Telinga Kiri - Left Ear dB)</h3>
                        <div className="grid grid-cols-7 gap-2">
                          <div><label className="text-xs font-bold text-gray-700 block text-center">0.5</label><input type="text" name="l05" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">1.0</label><input type="text" name="l1" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">2.0</label><input type="text" name="l2" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">3.0</label><input type="text" name="l3" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">4.0</label><input type="text" name="l4" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">6.0</label><input type="text" name="l6" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">8.0</label><input type="text" name="l8" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <h3 className="font-bold text-sm text-teal-900 mt-4 mb-3 border-b pb-1">Audiometri (Telinga Kanan - Right Ear dB)</h3>
                        <div className="grid grid-cols-7 gap-2">
                          <div><label className="text-xs font-bold text-gray-700 block text-center">0.5</label><input type="text" name="r05" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">1.0</label><input type="text" name="r1" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">2.0</label><input type="text" name="r2" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">3.0</label><input type="text" name="r3" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">4.0</label><input type="text" name="r4" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">6.0</label><input type="text" name="r6" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700 block text-center">8.0</label><input type="text" name="r8" onChange={handleInputChange} className="border border-gray-400 p-1.5 rounded w-full text-sm text-center text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="mt-3"><label className="text-xs font-bold text-gray-700 block">Hasil Akhir Audiometri</label><input type="text" name="oht_result" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                      </div>

                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">EKG (&gt;35 Tahun)</h3>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">Rate</label><input type="text" name="rate" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Rhythm</label><input type="text" name="rhyt" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Axis</label><input type="text" name="axis" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">P-R interval</label><input type="text" name="pr" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">QRS</label><input type="text" name="qrs" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">T wave</label><input type="text" name="twv" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div><label className="text-xs font-bold text-gray-700">Diagnosis EKG</label><input type="text" name="diag" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                      </div>
                      
                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Chest X-Ray</h3>
                        <div className="flex gap-4 mb-2 text-sm font-bold text-gray-900">
                           <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="xray" value="Normal" onChange={handleInputChange} className="w-4 h-4 accent-teal-600" /> Normal</label>
                           <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="xray" value="Abnormal" onChange={handleInputChange} className="w-4 h-4 accent-teal-600" /> Abnormal</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">Tanggal X-Ray</label><input type="text" name="date_xray" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div className="col-span-2"><label className="text-xs font-bold text-gray-700">Describe Abnormalities</label><input type="text" name="des_abnor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                      </div>
                    </div>

                    {/* Hematologi & Urinalisis & Summary */}
                    <div className="space-y-6">
                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Darah Lengkap (Hematologi)</h3>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">Hb</label><input type="text" name="lab_hb" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Hct</label><input type="text" name="lab_hct" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="mb-2"><label className="text-xs font-bold text-gray-700">RBC Morphology</label><input type="text" name="rbc_m" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">WBC</label><input type="text" name="lab_wbc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">PMN</label><input type="text" name="pmn" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">LYMPH</label><input type="text" name="lymph" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div><label className="text-xs font-bold text-gray-700">MONO</label><input type="text" name="mono" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">EOS</label><input type="text" name="eos" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">BASO</label><input type="text" name="baso" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="mt-2"><label className="text-xs font-bold text-gray-700">BAND</label><input type="text" name="band" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        <div className="mt-2"><label className="text-xs font-bold text-gray-700">Platelets</label><input type="text" name="lab_platelet" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                      </div>

                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Urinalisis & Kimia Darah</h3>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">Albumin</label><input type="text" name="albumin" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Sugar (Urine)</label><input type="text" name="ur_sugar" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Blood</label><input type="text" name="urin_b" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">WBC</label><input type="text" name="wbc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">RBC</label><input type="text" name="rbc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Casts</label><input type="text" name="casts" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                        <div className="mb-2"><label className="text-xs font-bold text-gray-700">Lainnya (Urinalysis)</label><input type="text" name="ur_others" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        
                        {/* KIMIA DARAH KHUSUS CHEVRON YANG SEBELUMNYA HILANG */}
                        <h3 className="font-bold text-sm text-teal-900 mt-4 mb-3 border-b pb-1">Kimia Darah (mg% / mg/dl)</h3>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div><label className="text-xs font-bold text-gray-700">Blood Sugar (mg%)</label><input type="text" name="val_sugar" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Cholesterol (mg%)</label><input type="text" name="val_chol" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Triglyceride (mg%)</label><input type="text" name="val_trig" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">HDL (mg%)</label><input type="text" name="val_hdl" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">LDL (mg%)</label><input type="text" name="val_ldl" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Uric Acid (mg/dl)</label><input type="text" name="val_urig" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4 pt-2 border-t">
                          <div><label className="text-xs font-bold text-gray-700">BUN (mg/dl)</label><input type="text" name="val_bun" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">Creatinine (mg/dl)</label><input type="text" name="val_creat" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">SGOT (U/L)</label><input type="text" name="val_sgot" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                          <div><label className="text-xs font-bold text-gray-700">SGPT (U/L)</label><input type="text" name="val_sgpt" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>

                        {/* STOOL CULTURE & DETAILS ABNORMAL FINDINGS */}
                        <div className="mt-4 pt-2 border-t space-y-2">
                           <div><label className="text-xs font-bold text-gray-700">Stool Culture (Only for Catering Group)</label><input type="text" name="only_cg" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                           <div><label className="text-xs font-bold text-gray-700">Details of Abnormal Findings</label><textarea name="detail_af" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold h-16 outline-none focus:ring-2 focus:ring-teal-500 bg-white"></textarea></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 border border-teal-300 rounded shadow-sm">
                        <h3 className="font-bold text-sm text-teal-900 mb-3 border-b pb-1">Keterangan Dokter / Summary</h3>
                        <textarea name="summary" onChange={handleInputChange} placeholder="Summary..." className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold h-20 outline-none focus:ring-2 focus:ring-teal-500 bg-white mb-2"></textarea>
                        <textarea name="suggestion" onChange={handleInputChange} placeholder="Suggestion..." className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold h-20 outline-none focus:ring-2 focus:ring-teal-500 bg-white mb-2"></textarea>
                        <textarea name="comments" onChange={handleInputChange} placeholder="Comments untuk Fitness-for-Duty (Part I & II)..." className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold h-20 outline-none focus:ring-2 focus:ring-teal-500 bg-white"></textarea>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                           <div><label className="text-xs font-bold text-gray-700">Nama Rumah Sakit</label><input type="text" name="hospital" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                           <div><label className="text-xs font-bold text-gray-700">Nama Dokter</label><input type="text" name="eps" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-white" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BAGIAN 5: BIOMETRIK & VISION UMUM (SHARED) */}
              <div className="space-y-4 animate-fade-in mt-10">
                <h2 className="text-xl font-extrabold text-white bg-blue-700 px-4 py-3 rounded-md shadow">BAGIAN 5: Biometrik & Penglihatan</h2>
                
                {/* Biometrik Dasar */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5 border border-gray-300 rounded-lg bg-white shadow-sm">
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Tinggi (cm)</label><input type="number" name="height" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Berat (kg)</label><input type="number" name="weight" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">BMI (Otomatis)</label><input type="text" value={formData.bmi} readOnly className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-bold bg-gray-200 cursor-not-allowed outline-none" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Tensi (120/80)</label><input type="text" name="bloodPressure" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  <div><label className="block text-sm font-bold mb-1 text-gray-900">Nadi (Pulse)</label><input type="number" name="pulse" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  
                  {isChevron && <div><label className="block text-sm font-bold mb-1 text-teal-700">Resp. Rate (RR)</label><input type="number" name="respiratoryRate" onChange={handleInputChange} className="w-full border border-teal-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-teal-500 bg-teal-50" /></div>}
                  
                  {/* Lingkar Pinggang Khusus Qatar */}
                  {isQatar && (
                    <div><label className="block text-sm font-bold mb-1 text-orange-700">Lingkar Pinggang</label><input type="number" name="waist" onChange={handleInputChange} className="w-full border border-orange-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50" /></div>
                  )}

                  {/* Golongan Darah Shared (Chevron & Qatar Membutuhkan Ini) */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900">Golongan Darah</label>
                    <select name="bloodGroupType" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option value="">-Pilih-</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option></select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900">Rhesus (Rh)</label>
                    <select name="bloodGroupRh" onChange={handleInputChange} className="w-full border border-gray-400 p-2.5 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option value="">-Pilih-</option><option value="+">Positif (+)</option><option value="-">Negatif (-)</option></select>
                  </div>
                </div>

                {/* Tes Mata (Shared) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 border border-blue-300 rounded-lg bg-blue-50 shadow-sm mt-4">
                  {/* Tanpa Kacamata */}
                  <div className="bg-white p-4 border border-gray-300 rounded">
                    <h3 className="font-extrabold text-base mb-4 text-blue-900 border-b-2 border-blue-200 pb-1">Penglihatan Tanpa Kacamata (Uncorrected)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Jauh (Kanan / R)</label><input type="text" name="disr_unc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Jauh (Kiri / L)</label><input type="text" name="disl_unc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Dekat (Kanan / R)</label><input type="text" name="nearr_unc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Dekat (Kiri / L)</label><input type="text" name="nearl_unc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                    </div>
                    <div><label className="text-sm font-bold text-gray-900 block mb-1">Penglihatan Binokular</label><input type="text" name="bv_unc" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  </div>
                  
                  {/* Dengan Kacamata */}
                  <div className="bg-white p-4 border border-gray-300 rounded">
                    <h3 className="font-extrabold text-base mb-4 text-blue-900 border-b-2 border-blue-200 pb-1">Penglihatan Dengan Kacamata (Corrected)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Jauh (Kanan / R)</label><input type="text" name="disr_cor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Jauh (Kiri / L)</label><input type="text" name="disl_cor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Dekat (Kanan / R)</label><input type="text" name="nearr_cor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                      <div><label className="text-sm font-bold text-gray-900 block mb-1">Dekat (Kiri / L)</label><input type="text" name="nearl_cor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                    </div>
                    <div><label className="text-sm font-bold text-gray-900 block mb-1">Penglihatan Binokular</label><input type="text" name="bv_cor" onChange={handleInputChange} className="border border-gray-400 p-2.5 rounded w-full text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500 bg-white" /></div>
                  </div>

                  {/* Buta Warna (Color Vision) */}
                  <div className="md:col-span-2 bg-white p-4 border border-gray-300 rounded shadow-sm">
                      <label className="font-extrabold text-base block mb-3 text-blue-900 border-b-2 border-blue-200 pb-1">Tes Buta Warna (Color Vision):</label>
                      <div className="flex flex-col md:flex-row gap-6 font-bold text-sm text-gray-900 bg-blue-100 p-3 rounded-lg border border-blue-300">
                          <label className="cursor-pointer flex items-center gap-2"><input type="radio" name="color_vision" value="Normal" onChange={handleInputChange} className="w-5 h-5 accent-blue-700" /> Normal</label>
                          <label className="cursor-pointer flex items-center gap-2"><input type="radio" name="color_vision" value="Partial" onChange={handleInputChange} className="w-5 h-5 accent-blue-700" /> Buta Warna Parsial</label>
                          <label className="cursor-pointer flex items-center gap-2"><input type="radio" name="color_vision" value="Total" onChange={handleInputChange} className="w-5 h-5 accent-blue-700" /> Buta Warna Total</label>
                      </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className={`w-full py-5 mt-10 rounded-xl font-black text-white text-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isLoading ? 'MENCETAK DOKUMEN...' : 'Cetak Dokumen Sekarang (GENERATE)'}
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}