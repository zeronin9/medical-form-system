import React from 'react';

// === MASTER DATA ===
export const natureOfWork = [
  { id: 'nw_confined', label: 'Ruang Terbatas (Confined Space)' }, { id: 'nw_diving', label: 'Menyelam (Diving)' },
  { id: 'nw_height', label: 'Bekerja di Ketinggian' }, { id: 'nw_swing', label: 'Tali Ayun (Swing Rope)' },
  { id: 'nw_heavy', label: 'Operator Alat Berat/Derek' }, { id: 'nw_office', label: 'Pekerjaan Kantor' },
  { id: 'nw_hanging', label: 'Menggantung / Suspensi' }, { id: 'nw_sewage', label: 'Pembuangan Limbah' },
  { id: 'nw_emergency', label: 'Petugas Tanggap Darurat' }, { id: 'nw_food', label: 'Penjamah Makanan' },
  { id: 'nw_radiation', label: 'Radiasi Pengion' }
];

export const vaccines = [
  { id: 'vac_hepa', label: 'Hepatitis A' }, { id: 'vac_tet', label: 'Tetanus' },
  { id: 'vac_hepb', label: 'Hepatitis B' }, { id: 'vac_mea', label: 'Campak (Measles)' },
  { id: 'vac_c19', label: 'Covid-19' }, { id: 'vac_chick', label: 'Cacar Air (Chicken Pox)' },
  { id: 'vac_typh', label: 'Demam Tifoid' }
];

// PERBAIKAN: Daftar riwayat penyakit sudah dipisah 100% sesuai dengan form ADNOC
export const medicalHistory = [
  { id: 'mh_hbp', label: 'Darah Tinggi (High Blood Pressure)' },
  { id: 'mh_heart', label: 'Penyakit Jantung (Heart disease)' },
  { id: 'mh_asthma', label: 'Asma (Asthma)' },
  { id: 'mh_bronchitis', label: 'Bronkitis Kronis (Chronic Bronchitis)' },
  { id: 'mh_tb', label: 'TBC (Tuberculosis)' },
  { id: 'mh_ulcer', label: 'Tukak Lambung (Peptic ulcer)' },
  { id: 'mh_hep', label: 'Hepatitis B/C' },
  { id: 'mh_piles', label: 'Ambeien / Wasir (Piles / Hemorrhoids)' },
  { id: 'mh_hernia', label: 'Hernia' },
  { id: 'mh_constipation', label: 'Sembelit Kronis (Chronic constipation)' },
  { id: 'mh_diarrhea', label: 'Diare Kronis (Chronic diarrhea)' },
  { id: 'mh_bowel', label: 'Penyakit Usus Lainnya (Other bowel disease)' },
  { id: 'mh_epilepsy', label: 'Epilepsi / Ayan (Epilepsy)' },
  { id: 'mh_stroke', label: 'Stroke' },
  { id: 'mh_headache', label: 'Migrain (Migraine)' },
  { id: 'mh_musculo', label: 'Masalah Punggung/Leher (Back problems)' },
  { id: 'mh_rheumatism', label: 'Masalah Sendi/Kaki Datar (Joint problems)' },
  { id: 'mh_accident', label: 'Patah Tulang/Cacat (Fractures / Deformities)' },
  { id: 'mh_eczema', label: 'Eksim (Eczema)' },
  { id: 'mh_vitiligo', label: 'Vitiligo' },
  { id: 'mh_kidney', label: 'Penyakit Ginjal (Kidney disease)' },
  { id: 'mh_eye', label: 'Masalah Penglihatan (Tanpa Kacamata)' },
  { id: 'mh_eye2', label: 'Glaukoma / Keratoconus / Pandangan Terbatas' },
  { id: 'mh_ear', label: 'Masalah Pendengaran (Hear problems)' },
  { id: 'mh_tinnitus', label: 'Telinga Berdenging (Tinnitus)' },
  { id: 'mh_ear2', label: 'Infeksi Telinga Kronis (Chronic ear infection)' },
  { id: 'mh_diabetes', label: 'Kencing Manis (Diabetes)' },
  { id: 'mh_thyroid', label: 'Penyakit Tiroid (Thyroid Disease)' },
  { id: 'mh_anemia', label: 'Anemia' },
  { id: 'mh_thal', label: 'Thalasemia (Thalassemia)' },
  { id: 'mh_sickle', label: 'Sel Sabit (Sickle cell)' },
  { id: 'mh_allergy_med', label: 'Alergi Butuh Obat (Allergies req. medical advice)' },
  { id: 'mh_skin', label: 'Kondisi Kulit Lainnya (Other skin condition)' },
  { id: 'mh_drug', label: 'Penyalahgunaan Obat / Narkoba (Drugs)' },
];

export const familyHistory = [
  { id: 'fm_diabetes', label: 'Diabetes' }, { id: 'fm_hypertension', label: 'Darah Tinggi' },
  { id: 'fm_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'fm_heart', label: 'Penyakit Jantung' },
  { id: 'fm_asthma', label: 'Asma / Alergi' }, { id: 'fm_cancer', label: 'Kanker / Tumor' },
  { id: 'fm_tb', label: 'Tuberculosis (TBC)' },
  { id: 'fm_allergy', label: 'Alergi (Allergies)' },
  { id: 'fm_mental', label: 'Gangguan Mental (Mental Disorder)' },
];

// === CSS TOKENS ===
export const inputClass = "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950";
export const labelClass = "text-sm font-medium leading-none text-slate-700 mb-2 block flex items-center flex-wrap gap-1";
export const cardClass = "rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden animate-in fade-in duration-500";
export const cardHeaderClass = "flex flex-col space-y-1.5 p-6 border-b border-slate-100 bg-slate-50/50";
export const cardTitleClass = "font-semibold text-lg text-slate-900";
export const cardDescClass = "text-sm text-slate-500 mt-1";
export const cardContentClass = "p-6 space-y-6 bg-white";
export const radioGroupClass = "flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700";
export const radioClass = "h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer";
export const checkboxGroupClass = "flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 p-2 rounded-md hover:bg-slate-100 border border-transparent hover:border-slate-200";
export const checkboxClass = "h-4 w-4 shrink-0 rounded-sm border border-slate-300 accent-slate-900 cursor-pointer";
export const textareaClass = "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950";

// === BADGES ===
export const BadgeChevron = () => <span className="text-teal-600 font-normal text-[10px] bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">Chevron</span>;
export const BadgeQatar = () => <span className="text-orange-600 font-normal text-[10px] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">Qatar</span>;
export const BadgeILO = () => <span className="text-blue-500 font-normal text-[10px] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">ILO</span>;
export const BadgeMLC = () => <span className="text-purple-600 font-normal text-[10px] bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">MLC</span>;
export const BadgeADNOC = () => <span className="text-indigo-600 font-normal text-[10px] bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">ADNOC</span>;
export const BadgeMarshall = () => <span className="text-rose-600 font-normal text-[10px] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">Marshall</span>;