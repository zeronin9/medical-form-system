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
  { id: 'mh_blood', label: 'Kelainan Darah (Anemia)' }, { id: 'mh_ulcer', label: 'Tukak Lambung / Usus' },
  { id: 'mh_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'mh_accident', label: 'Kecelakaan Kerja' },
  { id: 'mh_ear', label: 'Penyakit Telinga / Sinus' }, { id: 'mh_headache', label: 'Sakit Kepala Berulang' },
  { id: 'mh_abd_pain', label: 'Sakit Perut Berulang' }, { id: 'mh_skin', label: 'Penyakit Kulit / Alergi' },
  { id: 'mh_musculo', label: 'Gangguan Otot & Tulang' }, { id: 'mh_mental', label: 'Gangguan Mental' },
  { id: 'mh_cns', label: 'Saraf Pusat / Stroke' }, { id: 'mh_heart', label: 'Penyakit Jantung' },
  { id: 'mh_hbp', label: 'Tekanan Darah Tinggi' }, { id: 'mh_diabetes', label: 'Diabetes (Kencing Manis)' },
  { id: 'mh_kidney', label: 'Masalah Ginjal' }, { id: 'mh_rheumatism', label: 'Rematik / Sendi' },
  { id: 'mh_fainting', label: 'Pingsan / Hilang Kesadaran' }, { id: 'mh_vascular', label: 'Pembuluh Darah' },
  { id: 'mh_eye', label: 'Kondisi Mata' }, { id: 'mh_asthma', label: 'Penyakit Paru (Asma, TBC)' },
  { id: 'mh_std', label: 'Penyakit Menular Seksual' }, { id: 'mh_hep', label: 'Hepatitis' },
  { id: 'mh_surgery', label: 'Pernah Operasi Besar' }, { id: 'mh_cancer', label: 'Kanker / Tumor' },
  { id: 'mh_drug', label: 'Penyalahgunaan Narkoba' }, { id: 'mh_thyroid', label: 'Penyakit Tiroid' },
  { id: 'mh_pregnancy', label: 'Hamil (Wanita)' }, { id: 'mh_hospital', label: 'Pernah Dirawat di RS' },
];

const familyHistory = [
  { id: 'fm_diabetes', label: 'Diabetes' }, { id: 'fm_hypertension', label: 'Tekanan Darah Tinggi' },
  { id: 'fm_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'fm_heart', label: 'Penyakit Jantung' },
  { id: 'fm_asthma', label: 'Asma / Alergi' }, { id: 'fm_cancer', label: 'Kanker / Tumor' },
];

const physicalExams = [
  { id: 'eyes', label: 'Mata' }, { id: 'ent', label: 'Telinga, Hidung, Tenggorokan' },
  { id: 'oral_c', label: 'Rongga Mulut' }, { id: 'chest', label: 'Dada / Paru-paru' },
  { id: 'cardio', label: 'Sistem Kardiovaskular' }, { id: 'abdom', label: 'Perut (Abdomen)' },
  { id: 'her_or', label: 'Lubang Hernia' }, { id: 'anus_r', label: 'Anus dan Rektum' },
  { id: 'genito', label: 'Saluran Kemih & Kelamin' }, { id: 'extrem', label: 'Anggota Gerak' },
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

// === SHADCN DESIGN TOKENS (TAILWIND) ===
const inputClass = "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
const labelClass = "text-sm font-medium leading-none text-slate-700 mb-2 block";
const cardClass = "rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden";
const cardHeaderClass = "flex flex-col space-y-1.5 p-6 border-b border-slate-100 bg-slate-50/50";
const cardTitleClass = "font-semibold leading-none tracking-tight text-lg text-slate-900";
const cardDescClass = "text-sm text-slate-500 mt-1";
const cardContentClass = "p-6 space-y-6 bg-white";
const radioGroupClass = "flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700";
const radioClass = "h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 accent-slate-900 cursor-pointer transition-all";
const checkboxGroupClass = "flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 p-2 rounded-md hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200";
const checkboxClass = "h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 accent-slate-900 cursor-pointer transition-all";
const textareaClass = "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
const btnPrimary = "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-11 px-8 shadow-md mt-8";
const btnDisabled = "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-400 h-11 px-8 border border-slate-200 mt-8";

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<any>({
    // Identitas
    firstName: '', familyName: '', dob: '', pob: '', idPassport: '', nationality: '', gender: '', address: '', contactNumber: '',
    position: '', department: '', company: '', workLocation: '', date: new Date().toLocaleDateString('id-ID'),
    serviceDate: '', medNo: '', typeOfShip: '', tradeArea: '', ilo_position: '',
    
    // Biometrik
    height: '', weight: '', waist: '', bmi: '', pulse: '', bloodPressure: '', respiratoryRate: '', bloodGroupType: '', bloodGroupRh: '',
    
    // Kuesioner
    q_illness: '', q_medevac: '', q_medevac_text: '', q_meds: '', q_meds_text: '', q_smoke: '', q_smoke_text: '', q_smoke_freq: '', q_alcohol: '', q_alcohol_text: '',
    q_fit: '', q_fear: '', q_stress: '', q_stressful: '', q_stress_score: '', q_omfc: '', q_omfc_text: '', nw_others: '', mh_others: '', fm_others: '',
    
    // Mata & Audiometri
    disr_unc: '', disl_unc: '', nearr_unc: '', nearl_unc: '', bv_unc: '', near_bv_unc: '',
    disr_cor: '', disl_cor: '', nearr_cor: '', nearl_cor: '', bv_cor: '', near_bv_cor: '', color_vision: '',
    l05: '', l1: '', l2: '', l3: '', l4: '', l6: '', l8: '', r05: '', r1: '', r2: '', r3: '', r4: '', r6: '', r8: '', oht_result: '',
    
    // Lab Tambahan & Khusus
    smoker_y: '', smoker_d: '', smoker_q: '', smoker_s_y: '', ft_fvc: '', pre_fvc: '', ft_fev1: '', pre_fev1: '', ev1_vc: '',
    rate: '', rhyt: '', axis: '', pr: '', qrs: '', twv: '', diag: '', lab_hb: '', lab_hct: '', rbc_m: '', lab_wbc: '', lab_platelet: '',
    pmn: '', lymph: '', mono: '', eos: '', baso: '', band: '', albumin: '', ur_sugar: '', urin_b: '', wbc: '', rbc: '', casts: '', ur_others: '',
    lab_sugar: '', val_sugar: '', lab_chol: '', val_chol: '', lab_trig: '', val_trig: '', only_cg: '', lab_hdl: '', val_hdl: '', lab_ldl: '', val_ldl: '', lab_bun: '', val_bun: '', lab_creat: '', val_creat: '',
    lab_sgot: '', val_sgot: '', lab_sgpt: '', val_sgpt: '', lab_uric: '', val_urig: '', detail_af: '', date_xray: '', xray: '', des_abnor: '', 
    
    // Form Khusus ILO
    lab_sr: '', hep_b_ab: '', hep_b_ag: '', stool_bact: '', stool_para: '', hiv_res: '', vac_status: '', vac_details: '',
    fit_lookout: '', fit_deck: '', fit_engine: '', fit_catering: '', fit_other: '', restrictions: '', free_cond: '', rest_desc: '', action_taken: '', exp_date: '',
    
    // Kesimpulan
    summary: '', suggestion: '', eps: '', hospital: '', cert_auth: '', comments: ''
  });

  const isQatar = selectedFormats.includes('qatarenergy');
  const isChevron = selectedFormats.includes('chevron');
  const isIlo = selectedFormats.includes('ilo');
  const showForm = isQatar || isChevron || isIlo;

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
    if (selectedFormats.length === 0) return;
    setIsLoading(true);
    try {
      for (const format of selectedFormats) {
        const apiRoute = format === 'chevron' ? '/api/chevron' : format === 'qatarenergy' ? '/api/qatar' : '/api/ilo';
        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData }), 
        });
        if (!response.ok) throw new Error(`Gagal mencetak ${format}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${format}_terisi.docx`;
        document.body.appendChild(a); a.click();
        window.URL.revokeObjectURL(url); document.body.removeChild(a);
      }
    } catch (error: any) { alert(error.message); } finally { setIsLoading(false); }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 selection:bg-slate-200">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Sistem Rekam Medis</h1>
            <p className="text-slate-500">Isi satu formulir untuk menghasilkan berbagai dokumen medis perusahaan secara otomatis.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* CARD: PILIH DOKUMEN */}
          <div className={cardClass}>
            <div className={cardHeaderClass}>
                <h3 className={cardTitleClass}>Pemilihan Dokumen</h3>
                <p className={cardDescClass}>Centang format dokumen yang ingin Anda cetak (bisa lebih dari satu).</p>
            </div>
            <div className={cardContentClass}>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <label className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors w-full sm:w-64">
                  <input type="checkbox" value="chevron" onChange={handleCheckboxChange} className={checkboxClass} />
                  <span className="font-semibold text-sm">Format Chevron</span>
                </label>
                <label className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors w-full sm:w-64">
                  <input type="checkbox" value="qatarenergy" onChange={handleCheckboxChange} className={checkboxClass} />
                  <span className="font-semibold text-sm">Format QatarEnergy</span>
                </label>
                <label className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors w-full sm:w-64 bg-blue-50/30 border-blue-200">
                  <input type="checkbox" value="ilo" onChange={handleCheckboxChange} className={`${checkboxClass} border-blue-400`} />
                  <span className="font-semibold text-sm text-blue-900">Format ILO (Pelaut)</span>
                </label>
              </div>
            </div>
          </div>

          {!showForm && (
            <div className="flex h-[200px] shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <p className="mt-2 text-sm font-semibold text-slate-900">Belum ada format yang dipilih</p>
                    <p className="mb-4 mt-2 text-sm text-slate-500">Silakan pilih minimal satu format dokumen di atas untuk mulai mengisi data medis.</p>
                </div>
            </div>
          )}

          {showForm && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* CARD: IDENTITAS & PEKERJAAN */}
              <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className={cardTitleClass}>Identitas Diri & Pekerjaan</h3>
                    <p className={cardDescClass}>Informasi dasar pegawai dan administrasi perusahaan.</p>
                </div>
                <div className={cardContentClass}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className={labelClass}>Nama Depan</label><input type="text" name="firstName" onChange={handleInputChange} className={inputClass} placeholder="Contoh: Budi" /></div>
                    <div><label className={labelClass}>Nama Belakang / Marga</label><input type="text" name="familyName" onChange={handleInputChange} className={inputClass} placeholder="Contoh: Santoso" /></div>
                    <div><label className={labelClass}>No. KTP / Paspor</label><input type="text" name="idPassport" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>Tgl Lahir</label><input type="text" name="dob" onChange={handleInputChange} className={inputClass} placeholder="DD/MM/YYYY" /></div>
                    <div>
                      <label className={labelClass}>Jenis Kelamin</label>
                      <select name="gender" onChange={handleInputChange} className={inputClass}>
                        <option value="">- Pilih -</option><option value="Male">Laki-Laki</option><option value="Female">Perempuan</option>
                      </select>
                    </div>
                    <div><label className={labelClass}>Posisi / Jabatan</label><input type="text" name="position" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>Nama Perusahaan</label><input type="text" name="company" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>Lokasi Kerja</label><input type="text" name="workLocation" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>No. Telepon / HP</label><input type="text" name="contactNumber" onChange={handleInputChange} className={inputClass} /></div>
                    <div className="md:col-span-3"><label className={labelClass}>Alamat Lengkap</label><input type="text" name="address" onChange={handleInputChange} className={inputClass} /></div>

                    {isChevron && (
                      <>
                        <div className="col-span-full border-t pt-4 mt-2"></div>
                        <div><label className={labelClass}>Tanggal Mulai Kerja <span className="text-slate-400 font-normal">(Chevron)</span></label><input type="text" name="serviceDate" onChange={handleInputChange} className={inputClass} placeholder="DD/MM/YYYY" /></div>
                        <div><label className={labelClass}>No. Rekam Medis <span className="text-slate-400 font-normal">(Chevron)</span></label><input type="text" name="medNo" onChange={handleInputChange} className={inputClass} /></div>
                      </>
                    )}

                    {isQatar && (
                      <>
                        <div className={`col-span-full border-t pt-4 mt-2 ${!isChevron && 'hidden'}`}></div>
                        <div><label className={labelClass}>Kewarganegaraan <span className="text-slate-400 font-normal">(Qatar)</span></label><input type="text" name="nationality" onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Departemen <span className="text-slate-400 font-normal">(Qatar)</span></label><input type="text" name="department" onChange={handleInputChange} className={inputClass} /></div>
                      </>
                    )}

                    {isIlo && (
                      <>
                        <div className={`col-span-full border-t pt-4 mt-2 border-blue-100`}></div>
                        <div><label className={labelClass}>Tempat Lahir <span className="text-blue-500 font-normal">(ILO)</span></label><input type="text" name="pob" onChange={handleInputChange} className={`${inputClass} border-blue-200 focus-visible:ring-blue-500`} placeholder="Kota, Negara" /></div>
                        <div>
                            <label className={labelClass}>Posisi di Kapal <span className="text-blue-500 font-normal">(ILO)</span></label>
                            <select name="ilo_position" onChange={handleInputChange} className={`${inputClass} border-blue-200 focus-visible:ring-blue-500`}>
                                <option value="">- Pilih Posisi -</option>
                                <option value="Master">Master</option>
                                <option value="Deck Officer">Deck Officer</option>
                                <option value="Engineering Officer">Engineering Officer</option>
                                <option value="Radio Operator">Radio Operator</option>
                                <option value="Rating">Rating</option>
                            </select>
                        </div>
                        <div><label className={labelClass}>Tipe Kapal <span className="text-blue-500 font-normal">(ILO)</span></label><input type="text" name="typeOfShip" onChange={handleInputChange} className={`${inputClass} border-blue-200 focus-visible:ring-blue-500`} placeholder="Kontainer, Tanker..." /></div>
                        <div><label className={labelClass}>Area Pelayaran <span className="text-blue-500 font-normal">(ILO)</span></label><input type="text" name="tradeArea" onChange={handleInputChange} className={`${inputClass} border-blue-200 focus-visible:ring-blue-500`} placeholder="Pesisir (Coastal), Sedunia..." /></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD: KUESIONER MEDIS */}
              <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className={cardTitleClass}>Kuisioner Medis & Riwayat Penyakit</h3>
                    <p className={cardDescClass}>Formulir riwayat pasien. Pengisian ini akan disinkronkan secara otomatis ke seluruh format dokumen yang Anda pilih.</p>
                </div>
                <div className={cardContentClass}>
                  
                  {/* Sifat Pekerjaan */}
                  <div className="space-y-3">
                    <label className={labelClass}>Sifat Pekerjaan (Centang yang sesuai):</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {natureOfWork.map(n => (
                        <label key={n.id} className={checkboxGroupClass}>
                          <input type="checkbox" name={n.id} onChange={handleInputChange} className={checkboxClass} />
                          <span>{n.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-2 w-full md:w-1/2">
                        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Lainnya:</span>
                        <input type="text" name="nw_others" onChange={handleInputChange} className={inputClass} placeholder="Sebutkan..." />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 my-6"></div>

                  {/* Vaksinasi (QATAR ONLY) */}
                  {isQatar && (
                    <div className="space-y-4 pb-6">
                      <label className={labelClass}>Riwayat Vaksinasi (Khusus QatarEnergy):</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vaccines.map(v => (
                          <div key={v.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-4 shadow-sm bg-slate-50/30">
                            <span className="text-sm font-semibold text-slate-700">{v.label}</span>
                            <div className="flex gap-4">
                              <label className={radioGroupClass}><input type="radio" name={v.id} value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name={v.id} value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                              <label className={radioGroupClass}><input type="radio" name={v.id} value="Not Sure" onChange={handleInputChange} className={radioClass} /><span>Ragu</span></label>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 mt-6"></div>
                    </div>
                  )}

                  {/* Riwayat Penyakit Diri */}
                  <div className="space-y-4">
                    <label className={labelClass}>Riwayat Penyakit Diri Sendiri:</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {medicalHistory.map(m => (
                        <div key={m.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-sm font-medium text-slate-700">{m.label}</span>
                          <div className="flex gap-4">
                            <label className={radioGroupClass}><input type="radio" name={m.id} value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name={m.id} value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <label className={labelClass}>Penyakit Lainnya:</label>
                        <input type="text" name="mh_others" onChange={handleInputChange} className={inputClass} placeholder="Sebutkan jika ada riwayat penyakit lain..." />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 my-6"></div>

                  {/* Riwayat Keluarga (QATAR ONLY) */}
                  {isQatar && (
                    <div className="space-y-4 pb-6">
                      <label className={labelClass}>Riwayat Penyakit Keluarga (Khusus QatarEnergy):</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {familyHistory.map(f => (
                          <div key={f.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-4 shadow-sm bg-slate-50/30">
                            <span className="text-sm font-medium text-slate-700">{f.label}</span>
                            <div className="flex gap-4">
                              <label className={radioGroupClass}><input type="radio" name={f.id} value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name={f.id} value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col space-y-2 mt-4">
                        <label className={labelClass}>Penyakit Keluarga Lainnya:</label>
                        <input type="text" name="fm_others" onChange={handleInputChange} className={inputClass} placeholder="Sebutkan..." />
                      </div>
                      <div className="border-t border-slate-100 mt-6"></div>
                    </div>
                  )}
                  
                  {/* Pertanyaan Umum & Gaya Hidup */}
                  <div className="space-y-4">
                    <label className={labelClass}>Pertanyaan Umum & Gaya Hidup:</label>
                    <div className="space-y-3">
                      
                      <div className="rounded-lg border border-slate-200 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-700">1. Pernah menderita penyakit parah / cedera / dirawat di RS yang membuat absen kerja?</span>
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_illness" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_illness" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 p-4 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-700">2. Apakah saat ini sedang rutin mengonsumsi obat-obatan?</span>
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_meds" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_meds" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                        {formData.q_meds === 'Yes' && <input type="text" name="q_meds_text" placeholder="Sebutkan nama obat, dosis, dan frekuensi..." onChange={handleInputChange} className={`${inputClass} mt-4`} />}
                      </div>

                      {/* Merokok */}
                      <div className="rounded-lg border border-slate-200 p-4 transition-all bg-slate-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-900">3. Apakah Anda merokok?</span>
                          <div className="flex flex-wrap items-center gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_smoke" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_smoke" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            {isChevron && (
                              <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 sm:ml-4 sm:pl-4 sm:border-l border-slate-300">
                                <input type="checkbox" name="smoker_q" onChange={(e) => setFormData({...formData, smoker_q: e.target.checked ? 'Yes' : 'No'})} className={checkboxClass} /> <span>Sudah Berhenti (Quit)</span>
                              </label>
                            )}
                          </div>
                        </div>
                        
                        {formData.q_smoke === 'Yes' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <input type="text" name="q_smoke_text" placeholder="Jenis (Rokok, Vape)..." onChange={handleInputChange} className={inputClass} />
                            <input type="text" name="q_smoke_freq" placeholder="Frekuensi: btg/hari (Qatar)" onChange={handleInputChange} className={inputClass} />
                            {isChevron && <input type="number" name="smoker_y" placeholder="Total tahun merokok? (Chevron)" onChange={handleInputChange} className={inputClass} />}
                            {isChevron && <input type="number" name="smoker_d" placeholder="Jml batang/hari? (Chevron)" onChange={handleInputChange} className={inputClass} />}
                          </div>
                        )}
                        {formData.smoker_q === 'Yes' && isChevron && (
                          <div className="mt-4 sm:w-1/2">
                            <input type="number" name="smoker_s_y" placeholder="Lama berhenti (tahun)?" onChange={handleInputChange} className={inputClass} />
                          </div>
                        )}
                      </div>

                      <div className="rounded-lg border border-slate-200 p-4 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-700">4. Mengonsumsi alkohol atau narkoba (obat rekreasi)?</span>
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                        {formData.q_alcohol === 'Yes' && <input type="text" name="q_alcohol_text" placeholder="Jenis, frekuensi, & volume per minggu..." onChange={handleInputChange} className={`${inputClass} mt-4`} />}
                      </div>

                      {/* Khusus Qatar Only Questions */}
                      {isQatar && (
                        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                          <label className="text-sm font-bold text-slate-900 mb-1 block">Kuisioner Tambahan (Khusus QatarEnergy):</label>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-sm font-medium text-slate-700">Punya riwayat Evakuasi Medis Darurat (MEDEVAC)?</span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="q_medevac" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_medevac" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>
                          {formData.q_medevac === 'Yes' && <input type="text" name="q_medevac_text" placeholder="Jelaskan alasannya..." onChange={handleInputChange} className={inputClass} />}

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <span className="text-sm font-medium text-slate-700">Merasa bugar dan sehat saat ini?</span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="q_fit" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_fit" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <span className="text-sm font-medium text-slate-700">Punya fobia? (Ketinggian, laut, terbang, dll)</span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="q_fear" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_fear" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <span className="text-sm font-medium text-slate-700">Sedang mengalami stres yang tidak biasa / berat?</span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="q_stress" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_stress" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <span className="text-sm font-medium text-slate-700">Apakah hidup Anda penuh tekanan? (Skala 1-10)</span>
                            <div className="flex items-center gap-4 shrink-0">
                              {formData.q_stressful === 'Yes' && (
                                <input type="number" name="q_stress_score" min="1" max="10" placeholder="Skor" onChange={handleInputChange} className="flex h-8 w-20 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-950" />
                              )}
                              <label className={radioGroupClass}><input type="radio" name="q_stressful" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_stressful" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <span className="text-sm font-medium text-slate-700">Pernah ditolak Sertifikat Medis (OMFC) oleh QatarEnergy?</span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="q_omfc" value="Yes" onChange={handleInputChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="q_omfc" value="No" onChange={handleInputChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>
                          {formData.q_omfc === 'Yes' && <input type="text" name="q_omfc_text" placeholder="Apa alasannya..." onChange={handleInputChange} className={inputClass} />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD: PEMERIKSAAN DOKTER UMUM */}
              <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className={cardTitleClass}>Pemeriksaan Dokter (Fisik)</h3>
                    <p className={cardDescClass}>Bagian ini diisi oleh dokter pemeriksa.</p>
                </div>
                <div className={cardContentClass}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {physicalExams.map(p => (
                      <div key={p.id} className="rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col gap-3 hover:border-slate-300 transition-colors">
                        <span className="text-sm font-medium text-slate-900">{p.label}</span>
                        <div className="flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name={p.id} value="Normal" onChange={handleInputChange} className={radioClass} /><span>Normal</span></label>
                            <label className={radioGroupClass}><input type="radio" name={p.id} value="Abnormal" onChange={handleInputChange} className={radioClass} /><span>Abnormal</span></label>
                          </div>
                          <input type="text" name={`${p.id}_r`} placeholder="Keterangan kelainan..." onChange={handleInputChange} className={inputClass} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD: HASIL LAB QATARENERGY */}
              {isQatar && (
                <div className={cardClass}>
                  <div className={cardHeaderClass}>
                      <h3 className={cardTitleClass}>Status Laboratorium (Khusus QatarEnergy)</h3>
                      <p className={cardDescClass}>Evaluasi status Normal/Abnormal khusus untuk lembar Qatar.</p>
                  </div>
                  <div className={cardContentClass}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {labReports.map(l => (
                        <div key={l.id} className="rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
                          <span className="text-sm font-medium text-slate-900">{l.label}</span>
                          <div className="flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name={l.id} value="Normal" onChange={handleInputChange} className={radioClass} /><span>Normal</span></label>
                              <label className={radioGroupClass}><input type="radio" name={l.id} value="Abnormal" onChange={handleInputChange} className={radioClass} /><span>Abnormal</span></label>
                            </div>
                            <input type="text" name={`${l.id}_r`} placeholder="Keterangan..." onChange={handleInputChange} className={inputClass} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARD: HASIL LAB CHEVRON */}
              {isChevron && (
                <div className={cardClass}>
                  <div className={cardHeaderClass}>
                      <h3 className={cardTitleClass}>Detail Angka Laboratorium (Khusus Chevron)</h3>
                      <p className={cardDescClass}>Masukan hasil tes kuantitatif secara presisi untuk lembar rekam medis Chevron.</p>
                  </div>
                  <div className={cardContentClass}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Kolom 1 */}
                      <div className="space-y-6">
                        {/* Spirometri */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Spirometri (Fungsi Paru)</h4>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div><label className={labelClass}>FVC</label><input type="text" name="ft_fvc" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>% Predicted FVC</label><input type="text" name="pre_fvc" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div><label className={labelClass}>FEV1</label><input type="text" name="ft_fev1" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>% Predicted FEV1</label><input type="text" name="pre_fev1" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div><label className={labelClass}>FEV1 / FVC (%)</label><input type="text" name="ev1_vc" onChange={handleInputChange} className={inputClass} /></div>
                        </div>

                        {/* Audiometri */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Audiometri (dB)</h4>
                          <label className="text-xs font-semibold text-slate-500 mb-2 block uppercase tracking-wider">Telinga Kiri (Left Ear)</label>
                          <div className="grid grid-cols-7 gap-2 mb-4">
                            {['0.5','1.0','2.0','3.0','4.0','6.0','8.0'].map((f, i) => (
                               <div key={f}><label className="text-[11px] font-medium text-slate-600 block text-center mb-1">{f}</label><input type="text" name={`l${[0.5, 1, 2, 3, 4, 6, 8][i].toString().replace('.','0')}`} onChange={handleInputChange} className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-center focus-visible:ring-1 focus-visible:ring-slate-950 outline-none" /></div>
                            ))}
                          </div>
                          <label className="text-xs font-semibold text-slate-500 mb-2 block uppercase tracking-wider">Telinga Kanan (Right Ear)</label>
                          <div className="grid grid-cols-7 gap-2 mb-4">
                            {['0.5','1.0','2.0','3.0','4.0','6.0','8.0'].map((f, i) => (
                               <div key={f}><label className="text-[11px] font-medium text-slate-600 block text-center mb-1">{f}</label><input type="text" name={`r${[0.5, 1, 2, 3, 4, 6, 8][i].toString().replace('.','0')}`} onChange={handleInputChange} className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-center focus-visible:ring-1 focus-visible:ring-slate-950 outline-none" /></div>
                            ))}
                          </div>
                          <div><label className={labelClass}>Hasil Akhir Audiometri</label><input type="text" name="oht_result" onChange={handleInputChange} className={inputClass} /></div>
                        </div>

                        {/* EKG */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Elektrokardiogram / EKG (&gt;35 Tahun)</h4>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>Rate</label><input type="text" name="rate" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Rhythm</label><input type="text" name="rhyt" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Axis</label><input type="text" name="axis" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>P-R interval</label><input type="text" name="pr" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>QRS</label><input type="text" name="qrs" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>T wave</label><input type="text" name="twv" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div><label className={labelClass}>Diagnosis EKG</label><input type="text" name="diag" onChange={handleInputChange} className={inputClass} /></div>
                        </div>
                        
                        {/* X-Ray */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Rontgen Dada (Chest X-Ray)</h4>
                          <div className="flex gap-6 mb-4">
                             <label className={radioGroupClass}><input type="radio" name="xray" value="Normal" onChange={handleInputChange} className={radioClass} /> <span>Normal</span></label>
                             <label className={radioGroupClass}><input type="radio" name="xray" value="Abnormal" onChange={handleInputChange} className={radioClass} /> <span>Abnormal</span></label>
                          </div>
                          <div className="grid grid-cols-1 gap-4 mb-2">
                            <div><label className={labelClass}>Tanggal Rontgen</label><input type="text" name="date_xray" onChange={handleInputChange} className={inputClass} placeholder="DD/MM/YYYY" /></div>
                            <div><label className={labelClass}>Jelaskan Kelainan (Abnormalitas)</label><input type="text" name="des_abnor" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                        </div>
                      </div>

                      {/* Kolom 2 */}
                      <div className="space-y-6">
                        {/* Hematologi */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Darah Lengkap (Hematologi)</h4>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div><label className={labelClass}>Hb</label><input type="text" name="lab_hb" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Hct</label><input type="text" name="lab_hct" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="mb-3"><label className={labelClass}>Morfologi Sel Darah Merah (RBC Morphology)</label><input type="text" name="rbc_m" onChange={handleInputChange} className={inputClass} /></div>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>WBC</label><input type="text" name="lab_wbc" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>PMN</label><input type="text" name="pmn" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>LYMPH</label><input type="text" name="lymph" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>MONO</label><input type="text" name="mono" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>EOS</label><input type="text" name="eos" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>BASO</label><input type="text" name="baso" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div><label className={labelClass}>BAND</label><input type="text" name="band" onChange={handleInputChange} className={inputClass} /></div>
                              <div><label className={labelClass}>Trombosit (Platelets)</label><input type="text" name="lab_platelet" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                        </div>

                        {/* Urinalisis & Kimia Darah */}
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Urinalisis & Kimia Darah</h4>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>Albumin</label><input type="text" name="albumin" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Gula (Urine)</label><input type="text" name="ur_sugar" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Darah (Urine)</label><input type="text" name="urin_b" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div><label className={labelClass}>WBC</label><input type="text" name="wbc" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>RBC</label><input type="text" name="rbc" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Casts</label><input type="text" name="casts" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          <div className="mb-5"><label className={labelClass}>Lainnya (Urinalisis)</label><input type="text" name="ur_others" onChange={handleInputChange} className={inputClass} /></div>
                          
                          <label className="text-xs font-semibold text-slate-500 mb-3 block uppercase tracking-wider border-t border-slate-100 pt-4">Kimia Darah</label>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div><label className={labelClass}>Gula Darah (mg%)</label><input type="text" name="val_sugar" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Kolesterol (mg%)</label><input type="text" name="val_chol" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Trigliserida (mg%)</label><input type="text" name="val_trig" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>HDL (mg%)</label><input type="text" name="val_hdl" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>LDL (mg%)</label><input type="text" name="val_ldl" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Asam Urat (mg/dl)</label><input type="text" name="val_urig" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>BUN (mg/dl)</label><input type="text" name="val_bun" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Kreatinin (mg/dl)</label><input type="text" name="val_creat" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>SGOT (U/L)</label><input type="text" name="val_sgot" onChange={handleInputChange} className={inputClass} /></div>
                            <div><label className={labelClass}>SGPT (U/L)</label><input type="text" name="val_sgpt" onChange={handleInputChange} className={inputClass} /></div>
                          </div>
                          
                          <label className="text-xs font-semibold text-slate-500 mb-3 block uppercase tracking-wider border-t border-slate-100 pt-4">Kultur (Khusus Katering)</label>
                          <div className="space-y-4">
                             <div><label className={labelClass}>Kultur Feses</label><input type="text" name="only_cg" onChange={handleInputChange} className={inputClass} /></div>
                             <div><label className={labelClass}>Rincian Temuan Abnormal</label><textarea name="detail_af" onChange={handleInputChange} className={textareaClass}></textarea></div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD: BIOMETRIK & VISION */}
              <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className={cardTitleClass}>Biometrik Dasar & Pemeriksaan Penglihatan</h3>
                    <p className={cardDescClass}>Tanda-tanda vital dan evaluasi ketajaman visual.</p>
                </div>
                <div className={cardContentClass}>
                  
                  {/* Biometrik Dasar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div><label className={labelClass}>Tinggi (cm)</label><input type="number" name="height" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>Berat (kg)</label><input type="number" name="weight" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>BMI (Otomatis)</label><input type="text" value={formData.bmi} readOnly className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed" /></div>
                    <div><label className={labelClass}>Tensi (120/80)</label><input type="text" name="bloodPressure" onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className={labelClass}>Nadi (Pulse)</label><input type="number" name="pulse" onChange={handleInputChange} className={inputClass} /></div>
                    
                    {isChevron && <div><label className="text-sm font-medium leading-none text-teal-700 mb-2 block">Laju Pernapasan</label><input type="number" name="respiratoryRate" onChange={handleInputChange} className={inputClass} /></div>}
                    {isQatar && <div><label className="text-sm font-medium leading-none text-orange-700 mb-2 block">Lingkar Pinggang</label><input type="number" name="waist" onChange={handleInputChange} className={inputClass} /></div>}

                    <div>
                      <label className={labelClass}>Gol. Darah</label>
                      <select name="bloodGroupType" onChange={handleInputChange} className={inputClass}><option value="">-Pilih-</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option></select>
                    </div>
                    <div>
                      <label className={labelClass}>Rhesus (Rh)</label>
                      <select name="bloodGroupRh" onChange={handleInputChange} className={inputClass}><option value="">-Pilih-</option><option value="+">Positif (+)</option><option value="-">Negatif (-)</option></select>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 my-6"></div>

                  {/* Tes Mata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                      <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Tanpa Kacamata (Uncorrected)</h4>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div><label className={labelClass}>Jauh (Kanan)</label><input type="text" name="disr_unc" onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Jauh (Kiri)</label><input type="text" name="disl_unc" onChange={handleInputChange} className={inputClass} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div><label className={labelClass}>Dekat (Kanan)</label><input type="text" name="nearr_unc" onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Dekat (Kiri)</label><input type="text" name="nearl_unc" onChange={handleInputChange} className={inputClass} /></div>
                      </div>
                      <div><label className={labelClass}>Penglihatan Binokular</label><input type="text" name="bv_unc" onChange={handleInputChange} className={inputClass} /></div>
                    </div>
                    
                    <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                      <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Dengan Kacamata (Corrected)</h4>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div><label className={labelClass}>Jauh (Kanan)</label><input type="text" name="disr_cor" onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Jauh (Kiri)</label><input type="text" name="disl_cor" onChange={handleInputChange} className={inputClass} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div><label className={labelClass}>Dekat (Kanan)</label><input type="text" name="nearr_cor" onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Dekat (Kiri)</label><input type="text" name="nearl_cor" onChange={handleInputChange} className={inputClass} /></div>
                      </div>
                      <div><label className={labelClass}>Penglihatan Binokular</label><input type="text" name="bv_cor" onChange={handleInputChange} className={inputClass} /></div>
                    </div>

                    <div className="md:col-span-2 rounded-lg border border-slate-200 p-5 shadow-sm bg-slate-50/50">
                        <label className="font-semibold text-sm text-slate-900 mb-3 block">Tes Buta Warna (Color Vision):</label>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <label className={radioGroupClass}><input type="radio" name="color_vision" value="Normal" onChange={handleInputChange} className={radioClass} /> <span>Normal</span></label>
                            <label className={radioGroupClass}><input type="radio" name="color_vision" value="Partial" onChange={handleInputChange} className={radioClass} /> <span>Buta Warna Parsial</span></label>
                            <label className={radioGroupClass}><input type="radio" name="color_vision" value="Total" onChange={handleInputChange} className={radioClass} /> <span>Buta Warna Total</span></label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD: KHUSUS PELAUT (ILO ONLY) */}
              {isIlo && (
                <div className={`${cardClass} border-blue-200 animate-in fade-in slide-in-from-bottom-4`}>
                  <div className={`${cardHeaderClass} bg-blue-50/50 border-blue-100`}>
                      <h3 className={cardTitleClass}>Sertifikasi Medis Pelaut (Khusus Format ILO)</h3>
                      <p className={cardDescClass}>Hasil uji laboratorium tambahan, status kelaikan layar, dan rincian pembatasan tugas dinas laut.</p>
                  </div>
                  <div className={cardContentClass}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Kolom 1: Lab Tambahan ILO */}
                      <div className="space-y-6">
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Tes Diagnostik Tambahan</h4>
                          
                          <div className="mb-4">
                            <label className={labelClass}>Laju Endap Darah (SR) - mm/hr</label>
                            <input type="text" name="lab_sr" onChange={handleInputChange} className={inputClass} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className={labelClass}>Hepatitis B (ab)</label>
                              <select name="hep_b_ab" onChange={handleInputChange} className={inputClass}>
                                <option value="">- Pilih -</option><option value="Positive">Positif (+ve)</option><option value="Negative">Negatif (-ve)</option>
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Hepatitis B (ag)</label>
                              <select name="hep_b_ag" onChange={handleInputChange} className={inputClass}>
                                <option value="">- Pilih -</option><option value="Positive">Positif (+ve)</option><option value="Negative">Negatif (-ve)</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className={labelClass}>Kultur Feses Bakteriologis</label>
                              <select name="stool_bact" onChange={handleInputChange} className={inputClass}>
                                <option value="">- Pilih -</option><option value="Not Performed">Tidak Dilakukan</option><option value="Negative">Negatif</option><option value="Positive">Positif</option>
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Kultur Feses Parasitologis</label>
                              <select name="stool_para" onChange={handleInputChange} className={inputClass}>
                                <option value="">- Pilih -</option><option value="Not Performed">Tidak Dilakukan</option><option value="Negative">Negatif</option><option value="Positive">Positif</option>
                              </select>
                            </div>
                          </div>

                          <div><label className={labelClass}>Hasil HIV (+ve / -ve)</label><input type="text" name="hiv_res" onChange={handleInputChange} className={inputClass} placeholder="Contoh: Negatif" /></div>
                        </div>

                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Status Vaksinasi (Khusus ILO)</h4>
                          <div className="flex gap-4 mb-3">
                            <label className={radioGroupClass}><input type="radio" name="vac_status" value="Satisfactory" onChange={handleInputChange} className={radioClass} /><span>Memuaskan (Satisfactory)</span></label>
                            <label className={radioGroupClass}><input type="radio" name="vac_status" value="Renewed" onChange={handleInputChange} className={radioClass} /><span>Perlu Diperbarui</span></label>
                          </div>
                          <div><label className={labelClass}>Rincian Vaksin</label><input type="text" name="vac_details" onChange={handleInputChange} className={inputClass} /></div>
                        </div>
                      </div>

                      {/* Kolom 2: Fitness Assessment */}
                      <div className="space-y-6">
                        <div className="rounded-lg border border-slate-200 p-5 shadow-sm bg-blue-50/30">
                          <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-blue-100">Penilaian Kelaikan (Assessment of Fitness)</h4>
                          
                          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4">
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                               <span className="text-xs font-semibold text-slate-700">Tugas Jaga (Look-out)</span>
                               <div className="flex gap-2"><label className={radioGroupClass}><input type="radio" name="fit_lookout" value="Fit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Laik (Fit)</span></label><label className={radioGroupClass}><input type="radio" name="fit_lookout" value="Unfit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Tidak Laik</span></label></div>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                               <span className="text-xs font-semibold text-slate-700">Dinas Dek (Deck)</span>
                               <div className="flex gap-2"><label className={radioGroupClass}><input type="radio" name="fit_deck" value="Fit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Laik (Fit)</span></label><label className={radioGroupClass}><input type="radio" name="fit_deck" value="Unfit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Tidak Laik</span></label></div>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                               <span className="text-xs font-semibold text-slate-700">Dinas Mesin (Engine)</span>
                               <div className="flex gap-2"><label className={radioGroupClass}><input type="radio" name="fit_engine" value="Fit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Laik (Fit)</span></label><label className={radioGroupClass}><input type="radio" name="fit_engine" value="Unfit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Tidak Laik</span></label></div>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                               <span className="text-xs font-semibold text-slate-700">Dinas Katering</span>
                               <div className="flex gap-2"><label className={radioGroupClass}><input type="radio" name="fit_catering" value="Fit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Laik (Fit)</span></label><label className={radioGroupClass}><input type="radio" name="fit_catering" value="Unfit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Tidak Laik</span></label></div>
                            </div>
                            <div className="col-span-2 flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                               <span className="text-xs font-semibold text-slate-700">Dinas Lainnya</span>
                               <div className="flex gap-2"><label className={radioGroupClass}><input type="radio" name="fit_other" value="Fit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Laik (Fit)</span></label><label className={radioGroupClass}><input type="radio" name="fit_other" value="Unfit" onChange={handleInputChange} className={radioClass} /><span className="text-xs">Tidak Laik</span></label></div>
                            </div>
                          </div>

                          <div className="flex gap-6 mb-4 bg-white p-3 rounded border border-slate-200">
                             <label className={radioGroupClass}><input type="radio" name="restrictions" value="Without" onChange={handleInputChange} className={radioClass} /> <span>Tanpa Pembatasan</span></label>
                             <label className={radioGroupClass}><input type="radio" name="restrictions" value="With" onChange={handleInputChange} className={radioClass} /> <span>Dengan Pembatasan</span></label>
                          </div>

                          <div className="mb-4 bg-white p-3 rounded border border-slate-200">
                             <label className="text-xs font-semibold text-slate-700 block mb-2 leading-tight">Apakah pelaut bebas dari kondisi medis yang dapat memburuk akibat dinas di laut?</label>
                             <div className="flex gap-4">
                               <label className={radioGroupClass}><input type="radio" name="free_cond" value="Yes" onChange={handleInputChange} className={radioClass} /> <span>Ya</span></label>
                               <label className={radioGroupClass}><input type="radio" name="free_cond" value="No" onChange={handleInputChange} className={radioClass} /> <span>Tidak</span></label>
                             </div>
                          </div>

                          <div className="space-y-3">
                             <div><label className={labelClass}>Jelaskan pembatasan (jika ada)</label><input type="text" name="rest_desc" onChange={handleInputChange} className={inputClass} /></div>
                             <div><label className={labelClass}>Tindakan medis yang diambil (jika ada)</label><input type="text" name="action_taken" onChange={handleInputChange} className={inputClass} /></div>
                             <div className="border-t border-blue-100 pt-3"><label className="text-sm font-bold text-blue-800 mb-2 block">Masa Berlaku Sertifikat (Expiry Date)</label><input type="text" name="exp_date" onChange={handleInputChange} className={`${inputClass} border-blue-300 focus-visible:ring-blue-500`} placeholder="DD/MM/YYYY" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* KESIMPULAN DOKTER */}
              <div className="rounded-lg border border-slate-200 p-6 shadow-sm bg-slate-900 text-slate-50">
                <h4 className="font-semibold text-lg text-slate-50 mb-4 pb-2 border-b border-slate-700">Kesimpulan Dokter & Administrasi Sertifikat</h4>
                <div className="space-y-4">
                    {/* Summary & Suggestion (muncul untuk Chevron, dll) */}
                    <div><label className="text-sm font-medium text-slate-300 mb-2 block">Kesimpulan Medis (Summary)</label><textarea name="summary" onChange={handleInputChange} className={`${textareaClass} bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-400`}></textarea></div>
                    <div><label className="text-sm font-medium text-slate-300 mb-2 block">Saran Tindak Lanjut (Suggestion)</label><textarea name="suggestion" onChange={handleInputChange} className={`${textareaClass} bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-400`}></textarea></div>
                    <div><label className="text-sm font-medium text-slate-300 mb-2 block">Komentar Khusus (Catatan untuk Fitness-for-Duty)</label><textarea name="comments" onChange={handleInputChange} className={`${textareaClass} bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-400`}></textarea></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                      <div><label className="text-sm font-medium text-slate-300 mb-2 block">Nama Klinik / Rumah Sakit</label><input type="text" name="hospital" onChange={handleInputChange} className={`${inputClass} bg-slate-800 border-slate-700 text-slate-100 focus-visible:ring-slate-400`} /></div>
                      <div><label className="text-sm font-medium text-slate-300 mb-2 block">Nama Dokter Pemeriksa</label><input type="text" name="eps" onChange={handleInputChange} className={`${inputClass} bg-slate-800 border-slate-700 text-slate-100 focus-visible:ring-slate-400`} /></div>
                      <div><label className="text-sm font-medium text-slate-300 mb-2 block">Otoritas Penerbit Sertifikat <span className="font-normal text-slate-500">(Khusus ILO)</span></label><input type="text" name="cert_auth" onChange={handleInputChange} className={`${inputClass} bg-slate-800 border-slate-700 text-slate-100 focus-visible:ring-slate-400`} placeholder="Contoh: Kemenkes RI" /></div>
                    </div>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className={isLoading ? btnDisabled : btnPrimary}>
                {isLoading ? 'MENCETAK DOKUMEN...' : 'Generate Dokumen Medis Sekarang'}
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}