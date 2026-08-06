'use client';

import React, { createContext, useContext } from 'react';

// ==============================
// TYPES
// ==============================
export type SelectedFormat =
  | 'chevron'
  | 'qatarenergy'
  | 'ilo'
  | 'mlc'
  | 'adnoc'
  | 'marshall';

export interface OptionItem {
  id: string;
  label: string;
}

// ==============================
// CONTEXT UNTUK BADGE DINAMIS
// ==============================
export const FormatContext = createContext<SelectedFormat[]>([]);

export const useSelectedFormats = (): SelectedFormat[] => useContext(FormatContext);

// ==============================
// MASTER DATA
// ==============================
export const natureOfWork: OptionItem[] = [
  { id: 'nw_confined', label: 'Ruang Terbatas (Confined Space)' },
  { id: 'nw_diving', label: 'Menyelam (Diving)' },
  { id: 'nw_height', label: 'Bekerja di Ketinggian' },
  { id: 'nw_swing', label: 'Tali Ayun (Swing Rope)' },
  { id: 'nw_heavy', label: 'Operator Alat Berat/Derek' },
  { id: 'nw_office', label: 'Pekerjaan Kantor' },
  { id: 'nw_hanging', label: 'Menggantung / Suspensi' },
  { id: 'nw_sewage', label: 'Pembuangan Limbah' },
  { id: 'nw_emergency', label: 'Petugas Tanggap Darurat' },
  { id: 'nw_food', label: 'Penjamah Makanan' },
  { id: 'nw_radiation', label: 'Radiasi Pengion' },
];

export const vaccines: OptionItem[] = [
  { id: 'vac_hepa', label: 'Hepatitis A' },
  { id: 'vac_tet', label: 'Tetanus' },
  { id: 'vac_hepb', label: 'Hepatitis B' },
  { id: 'vac_mea', label: 'Campak (Measles)' },
  { id: 'vac_c19', label: 'Covid-19' },
  { id: 'vac_chick', label: 'Cacar Air (Chicken Pox)' },
  { id: 'vac_typh', label: 'Demam Tifoid' },
];

// CATATAN: mh_back & mh_musculo, serta mh_eye/mh_eye2 dan mh_ear/mh_ear2
// sengaja dipertahankan terpisah karena masing-masing punya konteks
// pemeriksaan berbeda di formulir sumber ADNOC/ILO/MLC/Chevron.
export const medicalHistory: OptionItem[] = [
  { id: 'mh_varicose', label: 'Varises (Varicose veins)' },
  { id: 'mh_digestive', label: 'Gangguan Pencernaan (Digestive disorder)' },
  { id: 'mh_infectious', label: 'Penyakit Menular (Infectious/contagious diseases)' },
  { id: 'mh_genital', label: 'Gangguan Kelamin (Genital disorders)' },
  { id: 'mh_loss_consc', label: 'Hilang Kesadaran (Loss of consciousness)' },
  { id: 'mh_psychiatric', label: 'Masalah Psikiatrik (Psychiatric problems)' },
  { id: 'mh_depression', label: 'Depresi (Depression)' },
  { id: 'mh_suicide', label: 'Percobaan Bunuh Diri (Attempted suicide)' },
  { id: 'mh_memory', label: 'Hilang Ingatan (Loss of memory)' },
  { id: 'mh_balance', label: 'Masalah Keseimbangan (Balance problem)' },
  { id: 'mh_mobility', label: 'Gerak Terbatas (Restricted mobility)' },
  { id: 'mh_back', label: 'Masalah Punggung (Back problems) — ILO/MLC' },
  { id: 'mh_amputation', label: 'Amputasi (Amputation)' },

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
  { id: 'mh_musculo', label: 'Masalah Punggung/Leher (Musculoskeletal) — ADNOC/Qatar/Chevron' },
  { id: 'mh_rheumatism', label: 'Masalah Sendi/Kaki Datar (Joint problems)' },
  { id: 'mh_accident', label: 'Patah Tulang/Cacat (Fractures / Deformities)' },
  { id: 'mh_eczema', label: 'Eksim (Eczema)' },
  { id: 'mh_vitiligo', label: 'Vitiligo' },
  { id: 'mh_kidney', label: 'Penyakit Ginjal (Kidney disease)' },
  { id: 'mh_eye', label: 'Masalah Penglihatan Umum (Tanpa Kacamata)' },
  { id: 'mh_eye2', label: 'Glaukoma / Keratoconus / Pandangan Terbatas' },
  { id: 'mh_ear', label: 'Masalah Pendengaran Umum (Hear problems)' },
  { id: 'mh_tinnitus', label: 'Telinga Berdenging (Tinnitus)' },
  { id: 'mh_ear2', label: 'Infeksi Telinga Kronis (Chronic ear infection)' },
  { id: 'mh_diabetes', label: 'Kencing Manis (Diabetes)' },
  { id: 'mh_thyroid', label: 'Penyakit Tiroid (Thyroid Disease)' },
  { id: 'mh_blood', label: 'Kelainan Darah (Blood Disease)' },
  { id: 'mh_anemia', label: 'Anemia' },
  { id: 'mh_thal', label: 'Thalasemia (Thalassemia)' },
  { id: 'mh_sickle', label: 'Sel Sabit (Sickle cell)' },
  { id: 'mh_allergy_med', label: 'Alergi Butuh Obat (Allergies req. medical advice)' },
  { id: 'mh_skin', label: 'Kondisi Kulit Lainnya (Other skin condition)' },
  { id: 'mh_drug', label: 'Penyalahgunaan Obat / Narkoba (Drugs)' },
];

export const familyHistory: OptionItem[] = [
  { id: 'fm_diabetes', label: 'Diabetes' },
  { id: 'fm_hypertension', label: 'Darah Tinggi' },
  { id: 'fm_epilepsy', label: 'Epilepsi / Kejang' },
  { id: 'fm_heart', label: 'Penyakit Jantung' },
  { id: 'fm_asthma', label: 'Asma / Alergi' },
  { id: 'fm_cancer', label: 'Kanker / Tumor' },
  { id: 'fm_tb', label: 'Tuberculosis (TBC)' },
  { id: 'fm_allergy', label: 'Alergi (Allergies)' },
  { id: 'fm_mental', label: 'Gangguan Mental (Mental Disorder)' },
];

// ==============================
// CSS TOKENS
// ==============================
export const inputClass =
  'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 transition-colors';

export const labelClass =
  'text-sm font-medium leading-none text-slate-700 mb-2 block flex items-center flex-wrap gap-1.5';

export const cardClass =
  'rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden animate-in fade-in duration-500';

export const cardHeaderClass =
  'flex flex-col space-y-1.5 p-6 border-b border-slate-100 bg-slate-50/50';

export const cardTitleClass = 'font-semibold text-lg text-slate-900';
export const cardDescClass = 'text-sm text-slate-500 mt-1';
export const cardContentClass = 'p-6 space-y-6 bg-white';

export const radioGroupClass =
  'flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700';

export const radioClass =
  'h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors';

export const checkboxGroupClass =
  'flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 p-2 rounded-md hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors';

export const checkboxClass =
  'h-4 w-4 shrink-0 rounded-sm border border-slate-300 accent-slate-900 cursor-pointer transition-colors';

export const textareaClass =
  'flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 transition-colors';

// ==============================
// BADGE BASE
// ==============================
interface BadgeProps {
  format: SelectedFormat;
  text: string;
  className: string;
}

function FormatBadge({ format, text, className }: BadgeProps) {
  const formats = useSelectedFormats();

  if (!formats.includes(format)) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${className}`}
    >
      {text}
    </span>
  );
}

// ==============================
// BADGE COMPONENTS
// ==============================
export const BadgeChevron = () => (
  <FormatBadge
    format="chevron"
    text="Chevron"
    className="bg-teal-100 text-teal-800 border border-teal-200"
  />
);

export const BadgeQatar = () => (
  <FormatBadge
    format="qatarenergy"
    text="Qatar"
    className="bg-orange-100 text-orange-800 border border-orange-200"
  />
);

export const BadgeILO = () => (
  <FormatBadge
    format="ilo"
    text="ILO"
    className="bg-blue-100 text-blue-800 border border-blue-200"
  />
);

export const BadgeMLC = () => (
  <FormatBadge
    format="mlc"
    text="MLC"
    className="bg-purple-100 text-purple-800 border border-purple-200"
  />
);

export const BadgeADNOC = () => (
  <FormatBadge
    format="adnoc"
    text="ADNOC"
    className="bg-indigo-100 text-indigo-800 border border-indigo-200"
  />
);

export const BadgeMarshall = () => (
  <FormatBadge
    format="marshall"
    text="Marshall"
    className="bg-rose-100 text-rose-800 border border-rose-200"
  />
);