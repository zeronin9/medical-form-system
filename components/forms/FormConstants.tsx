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

export const medicalHistory = [
  { id: 'mh_blood', label: 'Kelainan Darah' }, { id: 'mh_ulcer', label: 'Tukak Lambung' },
  { id: 'mh_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'mh_accident', label: 'Kecelakaan Kerja' },
  { id: 'mh_ear', label: 'Penyakit Telinga' }, { id: 'mh_headache', label: 'Sakit Kepala Berulang' },
  { id: 'mh_abd_pain', label: 'Sakit Perut Berulang' }, { id: 'mh_skin', label: 'Penyakit Kulit' },
  { id: 'mh_musculo', label: 'Gangguan Tulang' }, { id: 'mh_mental', label: 'Gangguan Mental' },
  { id: 'mh_cns', label: 'Saraf Pusat / Stroke' }, { id: 'mh_heart', label: 'Penyakit Jantung' },
  { id: 'mh_hbp', label: 'Darah Tinggi' }, { id: 'mh_diabetes', label: 'Diabetes' },
  { id: 'mh_kidney', label: 'Masalah Ginjal' }, { id: 'mh_rheumatism', label: 'Rematik / Sendi' },
  { id: 'mh_fainting', label: 'Pingsan' }, { id: 'mh_vascular', label: 'Pembuluh Darah' },
  { id: 'mh_eye', label: 'Kondisi Mata' }, { id: 'mh_asthma', label: 'Paru (Asma, TBC)' },
  { id: 'mh_std', label: 'Penyakit Menular Seks' }, { id: 'mh_hep', label: 'Hepatitis' },
  { id: 'mh_surgery', label: 'Pernah Operasi' }, { id: 'mh_cancer', label: 'Kanker / Tumor' },
  { id: 'mh_drug', label: 'Narkoba' }, { id: 'mh_thyroid', label: 'Penyakit Tiroid' },
];

export const familyHistory = [
  { id: 'fm_diabetes', label: 'Diabetes' }, { id: 'fm_hypertension', label: 'Darah Tinggi' },
  { id: 'fm_epilepsy', label: 'Epilepsi / Kejang' }, { id: 'fm_heart', label: 'Penyakit Jantung' },
  { id: 'fm_asthma', label: 'Asma / Alergi' }, { id: 'fm_cancer', label: 'Kanker / Tumor' },
];

export const physicalExams = [
  { id: 'eyes', label: 'Mata' }, { id: 'ent', label: 'THT' },
  { id: 'oral_c', label: 'Rongga Mulut' }, { id: 'chest', label: 'Dada / Paru' },
  { id: 'cardio', label: 'Jantung & Vaskular' }, { id: 'abdom', label: 'Perut (Abdomen)' },
  { id: 'her_or', label: 'Lubang Hernia' }, { id: 'anus_r', label: 'Anus dan Rektum' },
  { id: 'genito', label: 'Saluran Kemih' }, { id: 'extrem', label: 'Anggota Gerak' },
  { id: 'musculo', label: 'Otot dan Tulang' }, { id: 'skin', label: 'Kulit' },
  { id: 'vas_s', label: 'Varises' }, { id: 'c_n_s', label: 'Sistem Saraf Pusat' }
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