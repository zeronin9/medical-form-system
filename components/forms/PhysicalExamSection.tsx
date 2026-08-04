import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, radioGroupClass, radioClass, inputClass } from './FormConstants';

// Konfigurasi Kategori Pemeriksaan Fisik Spesifik (Smart UI)
const examCategories = [
  {
    title: 'Cardiovascular (Jantung & Pembuluh Darah)',
    remarkKey: 'cv_comm',
    items: [
      { id: 'cv_pulse', label: 'Pulse' },
      { id: 'cv_bp', label: 'Blood Pressure' },
      { id: 'cv_apex', label: 'Heart Apex' },
      { id: 'cv_sounds', label: 'Heart Sounds' },
      { id: 'cv_murmurs', label: 'Heart Murmurs' },
      { id: 'cv_varicose', label: 'Varicose Veins' },
    ],
  },
  {
    title: 'Respiratory & THT (Pernapasan & Leher)',
    remarkKey: 'rs_comm',
    items: [
      { id: 'rs_nasal', label: 'Nasal Airway' },
      { id: 'rs_thyroid', label: 'Thyroid' },
      { id: 'rs_trachea', label: 'Trachea' },
      { id: 'rs_chest', label: 'Chest Shape/Movement' },
      { id: 'rs_perc', label: 'Percussion' },
      { id: 'rs_air', label: 'Air Entry' },
      { id: 'rs_breath', label: 'Breath Sounds' },
      { id: 'rs_advent', label: 'Adventitia' },
    ],
  },
  {
    title: 'Alimentary (Pencernaan & Mulut)',
    remarkKey: 'al_comm',
    items: [
      { id: 'al_teeth', label: 'Teeth' },
      { id: 'al_tongue', label: 'Tongue/Fauces' },
      { id: 'al_abd', label: 'Abdomen' },
      { id: 'al_liver', label: 'Liver' },
      { id: 'al_spleen', label: 'Spleen' },
      { id: 'al_lymph', label: 'Lymphadenopathy' },
      { id: 'al_hernia', label: 'Hernial Orifices' },
      { id: 'al_anus', label: 'Anus, Rectum/P.R.' },
    ],
  },
  {
    title: 'Genito-Urinary (Alat Kelamin & Ginjal)',
    remarkKey: 'gu_comm',
    items: [
      { id: 'gu_kidney', label: 'Kidney' },
      { id: 'gu_gen', label: 'Genitalia' },
    ],
  },
  {
    title: 'Integumentary (Kulit, Rambut, Kuku)',
    remarkKey: 'in_comm',
    items: [
      { id: 'in_hair', label: 'Hair' },
      { id: 'in_skin', label: 'Skin' },
      { id: 'in_nails', label: 'Nails' },
    ],
  },
  {
    title: 'Musculo-skeletal (Otot & Tulang)',
    remarkKey: 'ms_comm',
    items: [
      { id: 'ms_hands', label: 'Hands' },
      { id: 'ms_limbs', label: 'Limbs' },
      { id: 'ms_back', label: 'Back' },
      { id: 'ms_joints', label: 'Joints' },
      { id: 'ms_inj', label: 'Injuries' },
    ],
  },
  {
    title: 'Nervous System (Saraf Pusat)',
    remarkKey: 'ns_comm',
    items: [
      { id: 'ns_power', label: 'Power' },
      { id: 'ns_tone', label: 'Tone' },
      { id: 'ns_coord', label: 'Coordination' },
      { id: 'ns_sens', label: 'Sensation' },
      { id: 'ns_intel', label: 'Intelligence' },
    ],
  },
  {
    title: 'Ears (Telinga)',
    remarkKey: 'ea_comm',
    items: [
      { id: 'ea_meatus', label: 'Meatus' },
      { id: 'ea_drums', label: 'Ear Drums' },
    ],
  },
  {
    title: 'Eyes (Mata Khusus Fisik)',
    remarkKey: 'ey_comm',
    items: [
      { id: 'ey_light', label: 'Light Reflexes' },
      { id: 'ey_accom', label: 'Accommodation' },
      { id: 'ey_nyst', label: 'Nystagmus' },
      { id: 'ey_fundi', label: 'Fundi' },
    ],
  },
];

export default function PhysicalExamSection({ formData, handleChange }: any) {
  
  // Fungsi Smart UI: Set semua item di dalam satu kategori menjadi 'Normal' sekaligus
  const handleSetAllNormal = (e: React.MouseEvent, items: any[]) => {
    e.preventDefault(); // Mencegah form tersubmit jika tombol ditekan
    items.forEach(item => {
      handleChange({ target: { name: item.id, value: 'Normal', type: 'radio', checked: true } });
    });
  };

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Pemeriksaan Klinis (Fisik) Rinci</h3>
        <p className={cardDescClass}>Rincian organ spesifik. Gunakan tombol "Set Semua Normal" untuk mempercepat pengisian.</p>
      </div>
      <div className={cardContentClass}>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examCategories.map((category, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col hover:border-slate-300 transition-colors">
              
              {/* Header Kategori */}
              <div className="bg-slate-50 border-b border-slate-200 p-3 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">{category.title}</span>
                <button 
                  onClick={(e) => handleSetAllNormal(e, category.items)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-3 rounded transition-colors shadow-sm"
                >
                  Set Semua Normal
                </button>
              </div>

              {/* List Sub-Organ */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                {category.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <div className="flex gap-4 shrink-0">
                      <label className={radioGroupClass}>
                        <input 
                          type="radio" 
                          name={item.id} 
                          value="Normal" 
                          checked={formData[item.id] === 'Normal'} 
                          onChange={handleChange} 
                          className={radioClass} 
                        />
                        <span className="text-sm">Normal</span>
                      </label>
                      <label className={radioGroupClass}>
                        <input 
                          type="radio" 
                          name={item.id} 
                          value="Abnormal" 
                          checked={formData[item.id] === 'Abnormal'} 
                          onChange={handleChange} 
                          className={radioClass} 
                        />
                        <span className="text-sm text-red-600">Abnormal</span>
                      </label>
                    </div>
                  </div>
                ))}
                
                {/* Input Catatan Kelainan (Komentar Abnormal) per Kategori */}
                <div className="pt-4 mt-auto border-t border-slate-100">
                  <input 
                    type="text" 
                    name={category.remarkKey} 
                    value={formData[category.remarkKey] || ''} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder={`Keterangan jika ada yang abnormal pada ${category.title.split(' ')[0]}...`} 
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}