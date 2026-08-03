'use client';
import { useState, useEffect } from 'react';

// Mengimpor semua komponen form yang sudah kita pisahkan
import FormatSelector from '@/components/forms/FormatSelector';
import IdentitySection from '@/components/forms/IdentitySection';
import BiometricVisionSection from '@/components/forms/BiometricVisionSection';
import PhysicalExamSection from '@/components/forms/PhysicalExamSection';
import MedicalHistorySection from '@/components/forms/MedicalHistorySection';
import LabSection from '@/components/forms/LabSection';
import ConclusionSection from '@/components/forms/ConclusionSection';

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // === MASTER STATE: 100% VARIABEL UTUH (Tidak ada yang dihapus) ===
  const [formData, setFormData] = useState<any>({
    // Identitas
    firstName: '', middleName: '', familyName: '', dob: '', pob: '', pob_city: '', pob_country: '', idPassport: '', nationality: '', gender: '', maritalStatus: '', address: '', contactNumber: '', email: '',
    position: '', department: '', company: '', workLocation: '', date: new Date().toLocaleDateString('id-ID'),
    serviceDate: '', medNo: '', typeOfShip: '', tradeArea: '', ilo_position: '', seaman_book: '', 
    reason_exam: 'Pre-Employment',
    
    // Biometrik & Tanda Vital
    height: '', weight: '', waist: '', bmi: '', pulse: '', bloodPressure: '', respiratoryRate: '', rr: '', temp: '', chest_exp: '', gen_app: 'Good', bloodGroupType: '', bloodGroupRh: '',
    
    // Kuesioner & Gaya Hidup
    q_illness: '', q_medevac: '', q_medevac_text: '', q_meds: '', q_meds_text: '', q_smoke: '', q_smoke_text: '', q_smoke_freq: '', q_alcohol: '', q_alcohol_text: '',
    q_fit: '', q_fear: '', q_stress: '', q_stressful: '', q_stress_score: '', q_omfc: '', q_omfc_text: '', nw_others: '', mh_others: '', fm_others: '', vaccinated: 'Yes',
    
    // Penglihatan & Pendengaran
    disr_unc: '', disl_unc: '', nearr_unc: '', nearl_unc: '', bv_unc: '', near_bv_unc: '', disr_cor: '', disl_cor: '', nearr_cor: '', nearl_cor: '', bv_cor: '', near_bv_cor: '', color_vision: '', color_test_type: 'Book', hear_r: '', hear_l: '',
    
    // Riwayat Merokok (Chevron)
    smoker_y: '', smoker_d: '', smoker_q: '', smoker_s_y: '', 
    
    // Spirometri, Audiometri, EKG
    ft_fvc: '', pre_fvc: '', ft_fev1: '', pre_fev1: '', ev1_vc: '', l05: '', l1: '', l2: '', l3: '', l4: '', l6: '', l8: '', r05: '', r1: '', r2: '', r3: '', r4: '', r6: '', r8: '', oht_result: '', rate: '', rhyt: '', axis: '', pr: '', qrs: '', twv: '', diag: '', 
    
    // Darah Lengkap & Urin
    lab_hb: '', lab_hct: '', rbc_m: '', lab_wbc: '', lab_platelet: '', pmn: '', lymph: '', mono: '', eos: '', baso: '', band: '', albumin: '', ur_sugar: '', urin_b: '', wbc: '', rbc: '', casts: '', ur_others: '', 
    
    // Kimia Darah
    lab_sugar: '', val_sugar: '', lab_chol: '', val_chol: '', lab_trig: '', val_trig: '', only_cg: '', lab_hdl: '', val_hdl: '', lab_ldl: '', val_ldl: '', lab_bun: '', val_bun: '', lab_creat: '', val_creat: '', lab_sgot: '', val_sgot: '', lab_sgpt: '', val_sgpt: '', lab_uric: '', val_urig: '', detail_af: '', 
    
    // Rontgen & Serologi & Khusus Makanan
    date_xray: '', xray: '', des_abnor: '', lab_sr: '', hep_b_ab: '', hep_b_ag: '', hep_c: '', hep_a: '', stool_bact: '', stool_para: '', hiv_res: '', vdrl_res: '', vac_status: '', vac_details: '',
    
    // Kesimpulan Kelaikan & Administrasi Sertifikat
    fit_lookout: '', fit_deck: '', fit_engine: '', fit_catering: '', fit_other: '', restrictions: '', free_cond: '', rest_desc: '', action_taken: '', exp_date: '',
    summary: '', suggestion: '', eps: '', hospital: '', cert_auth: '', comments: '',

    // Khusus Pelaut Wanita
    f_lmp: '', f_preg_no: '', f_live_birth: ''
  });

  const showForm = selectedFormats.length > 0;

  // Auto-kalkulasi BMI
  useEffect(() => {
    if (formData.height && formData.weight) {
      const h = parseFloat(formData.height) / 100; 
      const w = parseFloat(formData.weight);
      if (h > 0) setFormData((prev: any) => ({ ...prev, bmi: (w / (h * h)).toFixed(1) }));
    }
  }, [formData.height, formData.weight]);

  // Handler Umum untuk Inputan String/Teks
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handler Khusus untuk Checkbox Pilihan Format
  const handleCheckboxChange = (e: any) => {
    const value = e.target.value;
    setSelectedFormats((prev) => e.target.checked ? [...prev, value] : prev.filter((f) => f !== value));
  };

  // Fungsi Submit/Download Dokumen Terpusat
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFormats.length === 0) return;
    setIsLoading(true);
    
    // === LOGIKA PENGGABUNGAN GIVEN NAME ===
    const combinedGivenName = [formData.firstName, formData.middleName].filter(Boolean).join(' ');

    // === LOGIKA PENGGABUNGAN TEMPAT LAHIR (POB) ===
    // Menggabungkan Kota dan Negara menggunakan koma (Contoh: "Surabaya, Indonesia")
    const combinedPob = [formData.pob_city, formData.pob_country].filter(Boolean).join(', ');

    // Membuat salinan data khusus untuk dikirim ke API
    const payloadData = {
      ...formData,
      firstName: combinedGivenName, // Timpa firstName agar menjadi Given Name (Depan + Tengah)
      pob: combinedPob              // Timpa pob agar menjadi format satu baris
    };
    
    try {
      for (const format of selectedFormats) {
        let apiRoute = `/api/${format}`;
        if (format === 'qatarenergy') apiRoute = '/api/qatar';
        
        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: payloadData }), // Gunakan payloadData yang baru
        });
        
        if (!response.ok) throw new Error(`Gagal mencetak dokumen format: ${format.toUpperCase()}`);
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; 
        
        a.download = `${combinedGivenName || 'Pelaut'}_${format.toUpperCase()}_Medical_Report.docx`;
        
        document.body.appendChild(a); 
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
      }
    } catch (error: any) { 
      alert(error.message); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 selection:bg-slate-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header App */}
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Sistem Rekam Medis Terpadu</h1>
            <p className="text-slate-500">Cukup isi satu formulir master ini untuk menghasilkan dokumen Chevron, QatarEnergy, ILO, MLC, ADNOC, & Marshall Islands secara otomatis.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Komponen 1: Pemilihan Format */}
          <FormatSelector 
            selectedFormats={selectedFormats} 
            handleCheckboxChange={handleCheckboxChange} 
          />

          {/* Fallback Jika Belum Ada Format yang Dipilih */}
          {!showForm && (
            <div className="flex h-[200px] shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white shadow-sm">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <p className="mt-2 text-sm font-semibold text-slate-900">Belum ada format yang dipilih</p>
                    <p className="mb-4 mt-2 text-sm text-slate-500">Silakan pilih minimal satu format dokumen di atas untuk membuka isian rekam medis.</p>
                </div>
            </div>
          )}

          {/* Menampilkan Formulir Utama Berdasarkan Komponen */}
          {showForm && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Komponen 2: Identitas */}
              <IdentitySection 
                formData={formData} 
                handleChange={handleInputChange} 
                selectedFormats={selectedFormats} 
              />
              
              {/* Komponen 3: Biometrik & Mata */}
              <BiometricVisionSection 
                formData={formData} 
                handleChange={handleInputChange} 
                selectedFormats={selectedFormats} 
              />
              
              {/* Komponen 4: Pemeriksaan Fisik (Umum) */}
              <PhysicalExamSection 
                formData={formData} 
                handleChange={handleInputChange} 
              />
              
              {/* Komponen 5: Kuesioner Penyakit & Keluarga */}
              <MedicalHistorySection 
                formData={formData} 
                handleChange={handleInputChange} 
                selectedFormats={selectedFormats} 
              />
              
              {/* Komponen 6: Detail Laboratorium */}
              <LabSection 
                formData={formData} 
                handleChange={handleInputChange} 
                selectedFormats={selectedFormats} 
              />
              
              {/* Komponen 7: Kesimpulan Akhir Dokter */}
              <ConclusionSection 
                formData={formData} 
                handleChange={handleInputChange} 
              />

              {/* Tombol Eksekusi API */}
              <button 
                type="submit" 
                disabled={isLoading} 
                className={`flex w-full items-center justify-center rounded-md h-12 text-sm font-bold text-white shadow-md transition-colors ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {isLoading ? 'MENCETAK DOKUMEN...' : 'Generate Semua Dokumen Medis Terpilih Sekarang'}
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}