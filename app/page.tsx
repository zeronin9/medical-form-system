'use client';
import { useState, useEffect } from 'react';

// === MASTER DATA UNTUK RENDERING OTOMATIS ===
const natureOfWork = [
  { id: 'nw_confined', label: 'Confined Space' }, { id: 'nw_diving', label: 'Diving' },
  { id: 'nw_height', label: 'Working at Height' }, { id: 'nw_swing', label: 'Swing Rope' },
  { id: 'nw_heavy', label: 'Operating Heavy Equip' }, { id: 'nw_office', label: 'Office Work' },
  { id: 'nw_hanging', label: 'Hanging/Suspension' }, { id: 'nw_sewage', label: 'Sewage Disposal' },
  { id: 'nw_emergency', label: 'Emergency Responder' }, { id: 'nw_food', label: 'Food Handlers' },
  { id: 'nw_radiation', label: 'Ionizing Radiation' }
];

const vaccines = [
  { id: 'vac_hepa', label: 'Hepatitis A' }, { id: 'vac_tet', label: 'Tetanus' },
  { id: 'vac_hepb', label: 'Hepatitis B' }, { id: 'vac_mea', label: 'Measles' },
  { id: 'vac_c19', label: 'Covid 19' }, { id: 'vac_chick', label: 'Chicken Pox' },
  { id: 'vac_typh', label: 'Typhoid Fever' }
];

const medicalHistory = [
  { id: 'mh_blood', label: 'Blood Disorder' }, { id: 'mh_ulcer', label: 'Peptic Ulcer/Bowel' },
  { id: 'mh_epilepsy', label: 'Epilepsy' }, { id: 'mh_accident', label: 'Work/Non-Work Accidents' },
  { id: 'mh_ear', label: 'Ear/Sinus Illnesses' }, { id: 'mh_headache', label: 'Recurrent Headache' },
  { id: 'mh_abd_pain', label: 'Recurrent Abdominal Pain' }, { id: 'mh_skin', label: 'Skin Diseases / Allergies' },
  { id: 'mh_musculo', label: 'Musculo-Skeletal' }, { id: 'mh_mental', label: 'Mental Illness (Anxiety)' },
  { id: 'mh_cns', label: 'CNS Condition (Brain Stroke)' }, { id: 'mh_heart', label: 'Heart Disease' },
  { id: 'mh_hbp', label: 'High Blood Pressure' }, { id: 'mh_diabetes', label: 'Diabetes Mellitus' },
  { id: 'mh_kidney', label: 'Kidney or Bladder Trouble' }, { id: 'mh_rheumatism', label: 'Rheumatism/Arthritis' },
  { id: 'mh_fainting', label: 'Fainting/Loss Consciousness' }, { id: 'mh_vascular', label: 'Vascular Disease' },
  { id: 'mh_eye', label: 'Eye Conditions (Cataracts)' }, { id: 'mh_asthma', label: 'Chest Disease (Asthma)' },
  { id: 'mh_std', label: 'Sexually Transmitted Diseases' }, { id: 'mh_hep', label: 'Hepatitis/Jaundice' },
  { id: 'mh_surgery', label: 'Major Surgery' }, { id: 'mh_cancer', label: 'Cancer/Tumors' },
  { id: 'mh_drug', label: 'Drug Abuse' }, { id: 'mh_thyroid', label: 'Thyroid Disease' },
  { id: 'mh_pregnancy', label: 'Current Pregnancy (Female)' }, { id: 'mh_hospital', label: 'Hospital Admission' },
];

const familyHistory = [
  { id: 'fm_diabetes', label: 'Diabetes' }, { id: 'fm_hypertension', label: 'Hypertension' },
  { id: 'fm_epilepsy', label: 'Epilepsy/Fits' }, { id: 'fm_heart', label: 'Heart Diseases' },
  { id: 'fm_asthma', label: 'Asthma/Allergies' }, { id: 'fm_cancer', label: 'Cancer/Tumor' },
];

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State Input: Mencakup 100% field yang diperlukan oleh backend
  const [formData, setFormData] = useState<any>({
    // Basic fields
    firstName: '', familyName: '', dob: '', idPassport: '', nationality: '', gender: '', address: '', contactNumber: '',
    position: '', department: '', company: '', workLocation: '', date: new Date().toLocaleDateString('id-ID'),
    serviceDate: '', medNo: '',
    // Biometrics
    height: '', weight: '', waist: '', bmi: '', pulse: '', bloodPressure: '', respiratoryRate: '', bloodGroupType: '', bloodGroupRh: '',
    // General Questions
    q_illness: '', q_medevac: '', q_medevac_text: '', q_meds: '', q_meds_text: '',
    q_smoke: '', q_smoke_text: '', q_smoke_freq: '', q_alcohol: '', q_alcohol_text: '',
    q_fit: '', q_fear: '', q_stress: '', q_stressful: '', q_omfc: '', q_omfc_text: '',
    // Additional Text Inputs
    nw_others: '', mh_others: '', fm_others: ''
  });

  const isQatar = selectedFormats.includes('qatarenergy');
  const isChevron = selectedFormats.includes('chevron');
  const showForm = isQatar || isChevron;

  // Efek Samping: Hitung BMI otomatis
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
        const response = await fetch('/api/generate-docx', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, selectedFormat: format }),
        });
        
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Gagal generate ${format}: ${errorResponse.error}`);
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
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-300">
        <h1 className="text-2xl font-extrabold text-black mb-6 border-b-2 border-blue-600 pb-3">
            Sistem Formulir Medis (SSOT)
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: PILIH DOKUMEN */}
          <div className="p-4 border border-blue-300 rounded bg-blue-50">
            <h2 className="text-sm font-bold text-black mb-3">1. Pilih Dokumen Cetak:</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="chevron" onChange={handleCheckboxChange} className="w-5 h-5 text-blue-600" />
                <span className="text-black font-extrabold">Chevron</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="qatarenergy" onChange={handleCheckboxChange} className="w-5 h-5 text-blue-600" />
                <span className="text-black font-extrabold">QatarEnergy</span>
              </label>
            </div>
          </div>

          {!showForm && (
            <div className="text-center p-8 text-gray-600 font-bold border-2 border-dashed border-gray-400 rounded-lg">
                Silakan centang dokumen di atas untuk mulai mengisi data.
            </div>
          )}

          {showForm && (
            <>
              {/* SECTION 2: IDENTITAS & PEKERJAAN */}
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-lg font-extrabold text-black border-b border-gray-400 pb-1">2. Identitas Diri & Pekerjaan</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div><label className="block text-xs font-extrabold mb-1 text-black">First Name</label><input type="text" name="firstName" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Family Name</label><input type="text" name="familyName" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">No. ID / Paspor</label><input type="text" name="idPassport" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Tgl Lahir (DD/MM/YYYY)</label><input type="text" name="dob" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  
                  <div>
                    <label className="block text-xs font-extrabold mb-1 text-black">Jenis Kelamin</label>
                    <select name="gender" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">-- Pilih --</option>
                      <option value="Male">Laki-Laki (Male)</option><option value="Female">Perempuan (Female)</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Posisi / Pekerjaan</label><input type="text" name="position" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Perusahaan</label><input type="text" name="company" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Lokasi Kerja</label><input type="text" name="workLocation" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>

                  {isChevron && (
                    <>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Service Date</label><input type="text" name="serviceDate" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-blue-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Medical No.</label><input type="text" name="medNo" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-blue-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    </>
                  )}

                  {isQatar && (
                    <>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Kewarganegaraan</label><input type="text" name="nationality" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Departemen</label><input type="text" name="department" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">No. Telepon</label><input type="text" name="contactNumber" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Alamat Lengkap</label><input type="text" name="address" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                    </>
                  )}
                </div>
              </div>

              {/* SECTION 3: BIOMETRIK */}
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-lg font-extrabold text-black border-b border-gray-400 pb-1">3. Biometrik & Fisik Dasar</h2>
                <div className="grid grid-cols-6 gap-4">
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Tinggi (cm)</label><input type="number" name="height" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Berat (kg)</label><input type="number" name="weight" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">BMI (Otomatis)</label><input type="text" value={formData.bmi} readOnly className="w-full border border-gray-400 p-2 rounded text-sm text-black font-bold bg-gray-200 cursor-not-allowed outline-none" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Tensi (120/80)</label><input type="text" name="bloodPressure" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-xs font-extrabold mb-1 text-black">Nadi (Pulse)</label><input type="number" name="pulse" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  
                  {isChevron && (
                    <div><label className="block text-xs font-extrabold mb-1 text-black">Resp. Rate (RR)</label><input type="number" name="respiratoryRate" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-blue-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  )}

                  {isQatar && (
                    <>
                      <div><label className="block text-xs font-extrabold mb-1 text-black">Lingkar Pinggang</label><input type="number" name="waist" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                      <div>
                        <label className="block text-xs font-extrabold mb-1 text-black">Golongan Darah</label>
                        <select name="bloodGroupType" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500"><option value="">-Pilih-</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option></select>
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold mb-1 text-black">Rhesus (Rh)</label>
                        <select name="bloodGroupRh" onChange={handleInputChange} className="w-full border border-gray-400 p-2 rounded text-sm text-black font-semibold bg-yellow-50 outline-none focus:ring-2 focus:ring-yellow-500"><option value="">-Pilih-</option><option value="+">+</option><option value="-">-</option></select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SECTIONS KHUSUS QATARENERGY (Formulir Checkbox) */}
              {isQatar && (
                <div className="p-6 border-2 border-yellow-400 rounded-lg bg-yellow-50 space-y-8 shadow-sm">
                  <h2 className="text-xl font-extrabold text-black border-b border-gray-400 pb-2">Borang Medis Tambahan (Khusus QatarEnergy)</h2>
                  
                  {/* Nature of Work */}
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-3">Nature of Work (Bisa pilih lebih dari satu):</label>
                    <div className="grid grid-cols-4 gap-4">
                      {natureOfWork.map(n => (
                        <label key={n.id} className="flex items-center gap-2 text-sm text-black font-bold cursor-pointer">
                          <input type="checkbox" name={n.id} onChange={handleInputChange} className="w-4 h-4" /> {n.label}
                        </label>
                      ))}
                      <div className="col-span-4 flex items-center gap-3">
                        <span className="text-sm font-extrabold text-black">Others:</span>
                        <input type="text" name="nw_others" onChange={handleInputChange} className="border border-gray-400 p-2 rounded w-96 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Sebutkan jika ada..." />
                      </div>
                    </div>
                  </div>

                  {/* Vaccination */}
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-3">Vaccination History:</label>
                    <div className="grid grid-cols-2 gap-4">
                      {vaccines.map(v => (
                        <div key={v.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                          <span className="text-sm font-extrabold text-black w-1/2">{v.label}</span>
                          <div className="flex gap-4 w-1/2 text-sm text-black font-bold">
                            <label className="cursor-pointer"><input type="radio" name={v.id} value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                            <label className="cursor-pointer"><input type="radio" name={v.id} value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                            <label className="cursor-pointer"><input type="radio" name={v.id} value="Not Sure" onChange={handleInputChange} className="mr-1" /> Not Sure</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medical History */}
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-3">Medical History (Diri Sendiri):</label>
                    <div className="grid grid-cols-2 gap-4">
                      {medicalHistory.map(m => (
                        <div key={m.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                          <span className="text-sm font-extrabold text-black w-3/4">{m.label}</span>
                          <div className="flex gap-6 w-1/4 justify-end text-sm text-black font-bold">
                            <label className="cursor-pointer"><input type="radio" name={m.id} value="Yes" onChange={handleInputChange} className="mr-1" /> Ya</label>
                            <label className="cursor-pointer"><input type="radio" name={m.id} value="No" onChange={handleInputChange} className="mr-1" /> Tidak</label>
                          </div>
                        </div>
                      ))}
                      <div className="col-span-2 flex items-center gap-3">
                        <span className="text-sm font-extrabold text-black">Others (if any):</span>
                        <input type="text" name="mh_others" onChange={handleInputChange} className="border border-gray-400 p-2 rounded flex-1 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Jelaskan riwayat lain..." />
                      </div>
                    </div>
                  </div>

                  {/* Family History */}
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-3">Family History (Keluarga):</label>
                    <div className="grid grid-cols-2 gap-4">
                      {familyHistory.map(f => (
                        <div key={f.id} className="flex justify-between items-center bg-white p-3 border border-gray-300 rounded shadow-sm">
                          <span className="text-sm font-extrabold text-black w-3/4">{f.label}</span>
                          <div className="flex gap-6 w-1/4 justify-end text-sm text-black font-bold">
                            <label className="cursor-pointer"><input type="radio" name={f.id} value="Yes" onChange={handleInputChange} className="mr-1" /> Ya</label>
                            <label className="cursor-pointer"><input type="radio" name={f.id} value="No" onChange={handleInputChange} className="mr-1" /> Tidak</label>
                          </div>
                        </div>
                      ))}
                      <div className="col-span-2 flex items-center gap-3">
                        <span className="text-sm font-extrabold text-black">Others (if any):</span>
                        <input type="text" name="fm_others" onChange={handleInputChange} className="border border-gray-400 p-2 rounded flex-1 text-sm text-black font-semibold outline-none focus:ring-2 focus:ring-yellow-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* General Questions */}
                  <div>
                    <label className="block text-sm font-extrabold text-black mb-3">General Questions:</label>
                    <div className="space-y-3">
                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold mb-2">
                          <span className="w-1/2">Have severe illness/absent from work?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_illness" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_illness" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                      </div>

                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold">
                          <span className="w-1/2">Any history of MEDEVAC?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_medevac" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_medevac" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                        {formData.q_medevac === 'Yes' && <input type="text" name="q_medevac_text" placeholder="Why?..." onChange={handleInputChange} className="border border-gray-400 p-2 mt-2 rounded w-full outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />}
                      </div>

                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold">
                          <span className="w-1/2">Taking any medications currently?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_meds" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_meds" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                        {formData.q_meds === 'Yes' && <input type="text" name="q_meds_text" placeholder="Name & Dose..." onChange={handleInputChange} className="border border-gray-400 p-2 mt-2 rounded w-full outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />}
                      </div>

                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold">
                          <span className="w-1/2">Do you smoke?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_smoke" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_smoke" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                        {formData.q_smoke === 'Yes' && (
                          <div className="flex gap-3 mt-2">
                            <input type="text" name="q_smoke_text" placeholder="What type?..." onChange={handleInputChange} className="border border-gray-400 p-2 rounded w-1/2 outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />
                            <input type="text" name="q_smoke_freq" placeholder="How long & frequent?..." onChange={handleInputChange} className="border border-gray-400 p-2 rounded w-1/2 outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold">
                          <span className="w-1/2">Drink Alcohol/Drugs?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_alcohol" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_alcohol" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                        {formData.q_alcohol === 'Yes' && <input type="text" name="q_alcohol_text" placeholder="Type, freq, volume..." onChange={handleInputChange} className="border border-gray-400 p-2 mt-2 rounded w-full outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />}
                      </div>

                      <div className="flex items-center gap-6 bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black font-extrabold">
                        <span className="w-1/2">Feel fit & healthy at present?</span>
                        <label className="cursor-pointer"><input type="radio" name="q_fit" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                        <label className="cursor-pointer"><input type="radio" name="q_fit" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                      </div>

                      <div className="flex items-center gap-6 bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black font-extrabold">
                        <span className="w-1/2">Sources of fears? (heights, flying, etc)</span>
                        <label className="cursor-pointer"><input type="radio" name="q_fear" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                        <label className="cursor-pointer"><input type="radio" name="q_fear" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                      </div>

                      <div className="flex items-center gap-6 bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black font-extrabold">
                        <span className="w-1/2">Suffer from unusual stress?</span>
                        <label className="cursor-pointer"><input type="radio" name="q_stress" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                        <label className="cursor-pointer"><input type="radio" name="q_stress" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                      </div>

                      <div className="flex items-center gap-6 bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black font-extrabold">
                        <span className="w-1/2">How stressful is your life (1-10)?</span>
                        <label className="cursor-pointer"><input type="radio" name="q_stressful" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                        <label className="cursor-pointer"><input type="radio" name="q_stressful" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                      </div>

                      <div className="flex flex-col bg-white p-3 border border-gray-300 rounded shadow-sm text-sm text-black">
                        <div className="flex items-center gap-6 font-extrabold">
                          <span className="w-1/2">Refused OMFC by QE/QELNG in past?</span>
                          <label className="cursor-pointer"><input type="radio" name="q_omfc" value="Yes" onChange={handleInputChange} className="mr-1" /> Yes</label>
                          <label className="cursor-pointer"><input type="radio" name="q_omfc" value="No" onChange={handleInputChange} className="mr-1" /> No</label>
                        </div>
                        {formData.q_omfc === 'Yes' && <input type="text" name="q_omfc_text" placeholder="Why?..." onChange={handleInputChange} className="border border-gray-400 p-2 mt-2 rounded w-full outline-none focus:ring-2 focus:ring-yellow-500 font-semibold" />}
                      </div>

                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading} 
                className={`w-full py-4 rounded font-extrabold text-white text-lg transition-colors shadow-md ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                {isLoading ? 'Mencetak Dokumen...' : 'GENERATE DOKUMEN 100%'}
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}