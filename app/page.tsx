'use client';
import { useState, useEffect } from 'react';

// Mengimpor semua komponen form yang sudah dipisahkan
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
  
  // === MASTER STATE: 100% VARIABEL UTUH TERMASUK PEMISAHAN PENYAKIT ADNOC ===
  const [formData, setFormData] = useState<any>({
    // Identitas & Pekerjaan Dasar
    firstName: '', middleName: '', familyName: '', dob: '', pob: '', pob_city: '', pob_country: '', idPassport: '', nationality: '', gender: '', maritalStatus: '', address: '', contactNumber: '', email: '',
    position: '', department: '', company: '', workLocation: '', date: new Date().toLocaleDateString('id-ID'),
    serviceDate: '', medNo: '', typeOfShip: '', tradeArea: '', ilo_position: '', seaman_book: '', 
    reason_exam: 'Pre-Employment', // Tujuan Pemeriksaan

    // --- VARIABEL PREVIOUS EMPLOYMENT ADNOC ---
    job1: '', comp1: '', from1: '', to1: '',
    job2: '', comp2: '', from2: '', to2: '',
    job3: '', comp3: '', from3: '', to3: '',
    job4: '', comp4: '', from4: '', to4: '',

    // --- VARIABEL PREVIOUS EXPOSURE (KHUSUS ADNOC) ---
    exp_noise: '', exp_heavy_metals: '', exp_skin_infections: '', exp_compensation: '', 
    exp_chemicals: '', exp_radiation: '', exp_dust: '', exp_disable: '', exp_disable_no: '',
    
    // Biometrik & Tanda Vital
    height: '', weight: '', waist: '', bmi: '', pulse: '', bloodPressure: '', respiratoryRate: '', rr: '', temp: '', chest_exp: '', gen_app: 'Good', bloodGroupType: '', bloodGroupRh: '',
    
    // --- VARIABEL RINCIAN PEMERIKSAAN FISIK (SMART UI) ---
    cv_pulse: '', cv_bp: '', cv_apex: '', cv_sounds: '', cv_murmurs: '', cv_varicose: '', cv_comm: '',
    rs_nasal: '', rs_thyroid: '', rs_trachea: '', rs_chest: '', rs_perc: '', rs_air: '', rs_breath: '', rs_advent: '', rs_comm: '',
    al_teeth: '', al_tongue: '', al_abd: '', al_liver: '', al_spleen: '', al_lymph: '', al_hernia: '', al_anus: '', al_comm: '',
    gu_kidney: '', gu_gen: '', gu_comm: '',
    in_hair: '', in_skin: '', in_nails: '', in_comm: '',
    ms_hands: '', ms_limbs: '', ms_back: '', ms_joints: '', ms_inj: '', ms_comm: '',
    ns_power: '', ns_tone: '', ns_coord: '', ns_sens: '', ns_intel: '', ns_comm: '',
    ea_meatus: '', ea_drums: '', ea_comm: '',
    ey_light: '', ey_accom: '', ey_nyst: '', ey_fundi: '', ey_comm: '',

    // Penglihatan & Pendengaran
    disr_unc: '', disl_unc: '', nearr_unc: '', nearl_unc: '', bv_unc: '', near_bv_unc: '', disr_cor: '', disl_cor: '', nearr_cor: '', nearl_cor: '', bv_cor: '', near_bv_cor: '', color_vision: '', color_test_type: 'Book', hear_r: '', hear_l: '',
    
    // Kuesioner Medis & Gaya Hidup Umum
    q_illness: '', q_hosp_wait: '', q_medevac: '', q_meds: '', q_smoke: '', q_alcohol: '', q_fit: '', q_fear: '', q_stress: '', q_stressful: '', q_omfc: '', nw_others: '', mh_others: '', fm_others: '', vaccinated: 'Yes', 
    fm_tb: '', fm_allergy: '', fm_mental: '', fm_heart: '', fm_asthma: '', fm_diabetes: '', fm_hypertension: '', fm_cancer: '', illness_last: '', 

    // --- VARIABEL RIWAYAT PENYAKIT PRIBADI ---
    mh_hbp: '', mh_angina: '', mh_heart: '', mh_cardiac_surgery: '', mh_asthma: '',
    mh_bronchitis: '', mh_tb: '', mh_ulcer: '', mh_hep: '',
    mh_piles: '', mh_hernia: '', mh_constipation: '', mh_diarrhea: '', mh_bowel: '',
    mh_epilepsy: '', mh_stroke: '', mh_headache: '', mh_fainting: '',
    mh_musculo: '', mh_rheumatism: '', mh_accident: '',
    mh_eczema: '', mh_vitiligo: '', mh_skin: '',
    mh_kidney: '', mh_kidney_stone: '', mh_anxiety: '', mh_sleep: '',
    mh_eye: '', mh_eye2: '', mh_ear: '', mh_tinnitus: '', mh_ear2: '',
    diab_ins: '', diab_non: '', mh_diabetes: '', mh_thyroid: '', mh_blood: '', mh_drug: '',
    mh_surgery: '',
    
    // --- VARIABEL TAMBAHAN BARU SESUAI UPDATE ADNOC ---
    mh_anemia: '', mh_thal: '', mh_sickle: '', mh_allergy_med: '',
    
    // Khusus Pelaut Wanita
    f_lmp: '', f_preg_no: '', f_live_birth: '', f_heavy: '', f_reg: '', f_pain: '', f_pill: '',

    // --- VARIABEL TABEL KELUARGA ADNOC ---
    fa_age: '', fa_state: '', mo_age: '', mo_state: '', sib_age: '', sib_state: '', spo_age: '', spo_state: '', chi_age: '', chi_state: '',

    // --- VARIABEL QATAR & CHEVRON ---
    q_stress_score: '', q_smoke_freq: '', q_smoke_text: '', q_alcohol_text: '', q_medevac_text: '', q_omfc_text: '', q_meds_text: '',
    smoker_y: '', smoker_d: '', smoker_q: '', smoker_s_y: '', 
    ft_fvc: '', pre_fvc: '', ft_fev1: '', pre_fev1: '', ev1_vc: '', 
    l05: '', l1: '', l2: '', l3: '', l4: '', l6: '', l8: '', r05: '', r1: '', r2: '', r3: '', r4: '', r6: '', r8: '', oht_result: '', 
    rate: '', rhyt: '', axis: '', pr: '', qrs: '', twv: '', diag: '', 
    
    // Darah Lengkap & Urin
    lab_hb: '', lab_hct: '', rbc_m: '', lab_wbc: '', lab_platelet: '', pmn: '', lymph: '', mono: '', eos: '', baso: '', band: '', albumin: '', ur_sugar: '', urin_b: '', wbc: '', rbc: '', casts: '', ur_others: '', 
    
    // Kimia Darah & Hasil Laboratorium
    lab_sugar: '', val_sugar: '', lab_chol: '', val_chol: '', lab_trig: '', val_trig: '', only_cg: '', lab_hdl: '', val_hdl: '', lab_ldl: '', val_ldl: '', lab_bun: '', val_bun: '', lab_creat: '', val_creat: '', lab_sgot: '', val_sgot: '', lab_sgpt: '', val_sgpt: '', lab_uric: '', val_urig: '', detail_af: '', 
    
    // Rontgen & Serologi
    date_xray: '', xray: '', des_abnor: '', lab_sr: '', hep_b_ab: '', hep_b_ag: '', hep_c: '', hep_a: '', stool_bact: '', stool_para: '', hiv_res: '', vdrl_res: '', vac_status: '', vac_details: '',
    
    // Kesimpulan Kelaikan
    fit_lookout: '', fit_deck: '', fit_engine: '', fit_catering: '', fit_other: '', restrictions: '', free_cond: '', rest_desc: '', action_taken: '', exp_date: '',
    summary: '', suggestion: '', eps: '', hospital: '', cert_auth: '', comments: '',
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
    const combinedPob = [formData.pob_city, formData.pob_country].filter(Boolean).join(', ');

    // Membuat salinan data khusus untuk dikirim ke API
    const payloadData = {
      ...formData,
      firstName: combinedGivenName, 
      pob: combinedPob              
    };
    
    try {
      for (const format of selectedFormats) {
        let apiRoute = `/api/${format}`;
        if (format === 'qatarenergy') apiRoute = '/api/qatar';
        
        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: payloadData }),
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