// lib/fieldRegistry.ts

import type { SelectedFormat } from '@/components/forms/FormConstants';

export type FieldDefinition = {
  label: string;
  formats: SelectedFormat[];
};

export const fieldRegistry: Record<string, FieldDefinition> = {
  // ==========================================
  // 1. IDENTITAS & PEKERJAAN
  // ==========================================
  firstName: { label: 'First Name', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  middleName: { label: 'Middle Name', formats: ['chevron', 'adnoc', 'qatarenergy', 'marshall'] },
  familyName: { label: 'Family Name', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  dob: { label: 'Date of Birth', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  pob_city: { label: 'Place of Birth City', formats: ['chevron', 'ilo', 'mlc', 'marshall'] },
  pob_country: { label: 'Place of Birth Country', formats: ['chevron', 'ilo', 'mlc', 'marshall'] },
  nationality: { label: 'Nationality', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  idPassport: { label: 'ID / Passport', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  gender: { label: 'Gender', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  maritalStatus: { label: 'Marital Status', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  address: { label: 'Address', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  contactNumber: { label: 'Contact Number', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  email: { label: 'Email', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  company: { label: 'Company', formats: ['chevron', 'adnoc', 'mlc', 'qatarenergy', 'marshall'] },
  department: { label: 'Department', formats: ['chevron', 'qatarenergy', 'mlc'] },
  position: { label: 'Position', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  ilo_position: { label: 'ILO Position', formats: ['ilo', 'mlc', 'marshall', 'adnoc', 'chevron'] },
  workLocation: { label: 'Work Location', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  serviceDate: { label: 'Service Date', formats: ['chevron'] },
  medNo: { label: 'Medical Number', formats: ['chevron'] },
  typeOfShip: { label: 'Type of Ship', formats: ['ilo', 'mlc'] },
  tradeArea: { label: 'Trade Area', formats: ['ilo', 'mlc'] },
  seaman_book: { label: 'Seaman Book', formats: ['mlc', 'ilo'] },
  reason_exam: { label: 'Reason for Exam', formats: ['adnoc', 'ilo', 'mlc'] },

  // ==========================================
  // 2. BIOMETRIK & PENGLIHATAN
  // ==========================================
  height: { label: 'Height', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  weight: { label: 'Weight', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  bmi: { label: 'BMI', formats: ['chevron', 'adnoc', 'qatarenergy', 'marshall'] },
  waist: { label: 'Waist', formats: ['qatarenergy'] },
  pulse: { label: 'Pulse', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  bloodPressure: { label: 'Blood Pressure', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  rr: { label: 'Respiratory Rate', formats: ['chevron', 'marshall', 'qatarenergy'] },
  temp: { label: 'Temperature', formats: ['chevron'] },
  bloodGroupType: { label: 'Blood Group', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  bloodGroupRh: { label: 'Rhesus', formats: ['chevron', 'adnoc', 'qatarenergy'] },
  chest_exp: { label: 'Chest Expansion', formats: ['adnoc'] },
  gen_app: { label: 'General Appearance', formats: ['adnoc', 'marshall', 'ilo', 'mlc'] },
  
  disr_unc: { label: 'Distance Vision Right Uncorrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  disl_unc: { label: 'Distance Vision Left Uncorrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  nearr_unc: { label: 'Near Vision Right Uncorrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  nearl_unc: { label: 'Near Vision Left Uncorrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  bv_unc: { label: 'Binocular Vision Uncorrected', formats: ['chevron', 'ilo', 'mlc', 'qatarenergy'] },
  disr_cor: { label: 'Distance Vision Right Corrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  disl_cor: { label: 'Distance Vision Left Corrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  nearr_cor: { label: 'Near Vision Right Corrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  nearl_cor: { label: 'Near Vision Left Corrected', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall', 'qatarenergy'] },
  bv_cor: { label: 'Binocular Vision Corrected', formats: ['chevron', 'ilo', 'mlc', 'qatarenergy'] },
  near_bv_unc: { label: 'Near Binocular Uncorrected', formats: ['ilo', 'mlc', 'qatarenergy'] },
  near_bv_cor: { label: 'Near Binocular Corrected', formats: ['ilo', 'mlc', 'qatarenergy'] },
  color_vision: { label: 'Color Vision', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  color_test_type: { label: 'Color Test Type', formats: ['ilo', 'marshall', 'qatarenergy'] },
  color_y: { label: 'Color Yellow', formats: ['ilo', 'mlc'] },
  color_r: { label: 'Color Red', formats: ['ilo', 'mlc'] },
  color_g: { label: 'Color Green', formats: ['ilo', 'mlc'] },
  color_b: { label: 'Color Blue', formats: ['ilo', 'mlc'] },
  
  hear_r: { label: 'Hearing Right', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall'] },
  hear_l: { label: 'Hearing Left', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'marshall'] },
  hr_stcw: { label: 'STCW Hearing', formats: ['ilo', 'mlc'] },
  hr_unaid: { label: 'Unaided Hearing', formats: ['ilo', 'mlc'] },
  vis_stcw: { label: 'STCW Vision', formats: ['ilo', 'mlc'] },
  col_stcw: { label: 'STCW Color', formats: ['ilo', 'mlc'] },
  glasses_nec: { label: 'Glasses Necessary', formats: ['ilo', 'mlc'] },

  // ==========================================
  // 3. KUISIONER MEDIS & GAYA HIDUP
  // ==========================================
  // --- RIWAYAT PENYAKIT (Medical History 1 - 34 untuk ILO & MLC) ---
  mh_eye: { label: 'Eye/vision', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy'] },
  mh_hbp: { label: 'High BP', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_heart: { label: 'Heart disease', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mhcardiacsurgery: { label: 'Heart surgery', formats: ['ilo', 'mlc', 'qatarenergy', 'adnoc'] },
  mh_varicose: { label: 'Varicose veins', formats: ['ilo', 'mlc'] },
  mh_asthma: { label: 'Asthma/bronchitis', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_blood: { label: 'Blood disorder', formats: ['ilo', 'mlc'] },
  mh_diabetes: { label: 'Diabetes', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_thyroid: { label: 'Thyroid', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_digestive: { label: 'Digestive', formats: ['ilo', 'mlc'] },
  mh_kidney: { label: 'Kidney', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_skin: { label: 'Skin', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_allergy_med: { label: 'Allergies', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_infectious: { label: 'Infectious', formats: ['ilo', 'mlc'] },
  mh_hernia: { label: 'Hernia', formats: ['ilo', 'mlc', 'adnoc'] },
  mh_genital: { label: 'Genital', formats: ['ilo', 'mlc'] },
  mhpregnancy: { label: 'Pregnancy', formats: ['ilo', 'mlc', 'adnoc'] },
  mhsleep: { label: 'Sleep', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mhsurgery: { label: 'Surgery', formats: ['ilo', 'mlc', 'qatarenergy', 'adnoc'] },
  mh_epilepsy: { label: 'Epilepsy', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mhfainting: { label: 'Fainting', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_loss_consc: { label: 'Loss consciousness', formats: ['ilo', 'mlc'] },
  mh_psychiatric: { label: 'Psychiatric', formats: ['ilo', 'mlc'] },
  mh_depression: { label: 'Depression', formats: ['ilo', 'mlc'] },
  mh_suicide: { label: 'Suicide', formats: ['ilo', 'mlc'] },
  mh_memory: { label: 'Memory loss', formats: ['ilo', 'mlc'] },
  mh_balance: { label: 'Balance', formats: ['ilo', 'mlc'] },
  mh_headache: { label: 'Headaches', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_ear: { label: 'Ear/Nose/Throat', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },
  mh_mobility: { label: 'Mobility', formats: ['ilo', 'mlc'] },
  mh_back: { label: 'Back', formats: ['ilo', 'mlc'] },
  mh_amputation: { label: 'Amputation', formats: ['ilo', 'mlc'] },
  mh_accident: { label: 'Fractures', formats: ['ilo', 'mlc', 'chevron', 'qatarenergy', 'adnoc'] },

  // ==========================================
  // 4. PEMERIKSAAN FISIK
  // ==========================================
  cv_pulse: { label: 'CV Pulse', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_bp: { label: 'CV BP', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_apex: { label: 'CV Apex', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_sounds: { label: 'CV Sounds', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_murmurs: { label: 'CV Murmurs', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_varicose: { label: 'CV Varicose', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  cv_comm: { label: 'CV Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  
  rs_nasal: { label: 'RS Nasal', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_thyroid: { label: 'RS Thyroid', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_trachea: { label: 'RS Trachea', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_chest: { label: 'RS Chest', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_perc: { label: 'RS Percussion', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_air: { label: 'RS Air Entry', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_breath: { label: 'RS Breath', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_advent: { label: 'RS Adventitious', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  rs_comm: { label: 'RS Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },

  al_teeth: { label: 'AL Teeth', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  al_tongue: { label: 'AL Tongue', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  al_abd: { label: 'AL Abdomen', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_liver: { label: 'AL Liver', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_spleen: { label: 'AL Spleen', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_lymph: { label: 'AL Lymph', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_hernia: { label: 'AL Hernia', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_anus: { label: 'AL Anus', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  al_comm: { label: 'AL Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },

  gu_kidney: { label: 'GU Kidney', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  gu_gen: { label: 'GU Genitalia', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  gu_comm: { label: 'GU Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },

  in_hair: { label: 'IN Hair', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  in_skin: { label: 'IN Skin', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  in_nails: { label: 'IN Nails', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  in_comm: { label: 'IN Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },

  ms_hands: { label: 'MS Hands', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ms_limbs: { label: 'MS Limbs', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ms_back: { label: 'MS Back', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ms_joints: { label: 'MS Joints', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ms_inj: { label: 'MS Injury', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ms_comm: { label: 'MS Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },

  ns_power: { label: 'NS Power', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  ns_tone: { label: 'NS Tone', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  ns_coord: { label: 'NS Coordination', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  ns_sens: { label: 'NS Sensation', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  ns_intel: { label: 'NS Intellect', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  ns_emot: { label: 'NS Emotion', formats: ['chevron', 'adnoc'] },
  ns_comm: { label: 'NS Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc'] },
  r_bl_r: { label: 'Reflex Biceps R', formats: ['adnoc'] },
  r_tl_r: { label: 'Reflex Triceps R', formats: ['adnoc'] },
  r_sup_r: { label: 'Reflex Supinator R', formats: ['adnoc'] },
  r_kn_r: { label: 'Reflex Knee R', formats: ['adnoc'] },
  r_an_r: { label: 'Reflex Ankle R', formats: ['adnoc'] },
  r_pl_r: { label: 'Reflex Plantar R', formats: ['adnoc'] },
  r_bl_l: { label: 'Reflex Biceps L', formats: ['adnoc'] },
  r_tl_l: { label: 'Reflex Triceps L', formats: ['adnoc'] },
  r_sup_l: { label: 'Reflex Supinator L', formats: ['adnoc'] },
  r_kn_l: { label: 'Reflex Knee L', formats: ['adnoc'] },
  r_an_l: { label: 'Reflex Ankle L', formats: ['adnoc'] },
  r_pl_l: { label: 'Reflex Plantar L', formats: ['adnoc'] },

  ea_meatus: { label: 'EA Meatus', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ea_drums: { label: 'EA Drums', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ea_wr_r: { label: 'EA Whisper R', formats: ['adnoc'] },
  ea_wr_l: { label: 'EA Whisper L', formats: ['adnoc'] },
  ea_hr_r: { label: 'EA Hearing R', formats: ['adnoc'] },
  ea_hr_l: { label: 'EA Hearing L', formats: ['adnoc'] },
  ea_comm: { label: 'EA Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },

  ey_light: { label: 'EY Light', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ey_accom: { label: 'EY Accom', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ey_nyst: { label: 'EY Nystagmus', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ey_fundi: { label: 'EY Fundi', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },
  ey_comm: { label: 'EY Comments', formats: ['chevron', 'adnoc', 'qatarenergy', 'ilo', 'mlc', 'marshall'] },

  // ==========================================
  // 5. LABORATORIUM & PENUNJANG
  // ==========================================
  ft_fvc: { label: 'FVC', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  pre_fvc: { label: 'Predicted FVC', formats: ['chevron', 'qatarenergy'] },
  ft_fev1: { label: 'FEV1', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  pre_fev1: { label: 'Predicted FEV1', formats: ['chevron', 'qatarenergy'] },
  ev1_vc: { label: 'FEV1/FVC', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  
  l05: { label: 'Audio L05', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l1: { label: 'Audio L1', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l2: { label: 'Audio L2', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l3: { label: 'Audio L3', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l4: { label: 'Audio L4', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l6: { label: 'Audio L6', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  l8: { label: 'Audio L8', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r05: { label: 'Audio R05', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r1: { label: 'Audio R1', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r2: { label: 'Audio R2', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r3: { label: 'Audio R3', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r4: { label: 'Audio R4', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r6: { label: 'Audio R6', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  r8: { label: 'Audio R8', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  oht_result: { label: 'Audiometry Result', formats: ['chevron', 'qatarenergy', 'adnoc'] },

  rate: { label: 'ECG Rate', formats: ['chevron', 'qatarenergy'] },
  rhyt: { label: 'ECG Rhythm', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  axis: { label: 'ECG Axis', formats: ['chevron', 'qatarenergy'] },
  pr: { label: 'ECG PR', formats: ['chevron', 'qatarenergy'] },
  qrs: { label: 'ECG QRS', formats: ['chevron', 'qatarenergy'] },
  twv: { label: 'ECG Twv', formats: ['chevron', 'qatarenergy'] },
  diag: { label: 'ECG Diagnosis', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },

  xray: { label: 'Chest X-Ray', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  date_xray: { label: 'X-Ray Date', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  des_abnor: { label: 'X-Ray Abnormalities', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },

  lab_hb: { label: 'Hb', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  lab_hct: { label: 'Hct', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  rbc_m: { label: 'RBC Morphology', formats: ['chevron', 'qatarenergy'] },
  lab_wbc: { label: 'WBC', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  pmn: { label: 'PMN', formats: ['chevron', 'qatarenergy'] },
  lymph: { label: 'Lymph', formats: ['chevron', 'qatarenergy'] },
  mono: { label: 'Mono', formats: ['chevron', 'qatarenergy'] },
  eos: { label: 'Eos', formats: ['chevron', 'qatarenergy'] },
  baso: { label: 'Baso', formats: ['chevron', 'qatarenergy'] },
  band: { label: 'Band', formats: ['chevron', 'qatarenergy'] },
  lab_platelet: { label: 'Platelet', formats: ['chevron', 'qatarenergy'] },

  albumin: { label: 'Albumin', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  ur_sugar: { label: 'Urine Sugar', formats: ['chevron', 'qatarenergy', 'adnoc', 'ilo', 'mlc'] },
  urin_b: { label: 'Urine Blood', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  wbc: { label: 'Urine WBC', formats: ['chevron', 'qatarenergy'] },
  rbc: { label: 'Urine RBC', formats: ['chevron', 'qatarenergy'] },
  casts: { label: 'Urine Casts', formats: ['chevron', 'qatarenergy'] },
  ur_others: { label: 'Urine Others', formats: ['chevron', 'qatarenergy'] },

  val_sugar: { label: 'Blood Sugar', formats: ['chevron', 'qatarenergy'] },
  val_chol: { label: 'Cholesterol', formats: ['chevron', 'qatarenergy'] },
  val_trig: { label: 'Triglycerides', formats: ['chevron', 'qatarenergy'] },
  val_hdl: { label: 'HDL', formats: ['chevron', 'qatarenergy'] },
  val_ldl: { label: 'LDL', formats: ['chevron', 'qatarenergy'] },
  val_urig: { label: 'Uric Acid', formats: ['chevron', 'qatarenergy'] },
  val_bun: { label: 'BUN', formats: ['chevron', 'qatarenergy'] },
  val_creat: { label: 'Creatinine', formats: ['chevron', 'qatarenergy'] },
  val_sgot: { label: 'SGOT', formats: ['chevron', 'qatarenergy'] },
  val_sgpt: { label: 'SGPT', formats: ['chevron', 'qatarenergy'] },

  lab_sr: { label: 'ESR (SR)', formats: ['chevron', 'ilo'] },
  hep_b_ab: { label: 'Hep B Ab', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  hep_b_ag: { label: 'Hep B Ag', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  hep_c: { label: 'Hep C', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  hep_a: { label: 'Hep A', formats: ['chevron', 'qatarenergy', 'adnoc'] },
  hiv_res: { label: 'HIV', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },
  vdrl_res: { label: 'VDRL', formats: ['chevron', 'qatarenergy', 'ilo', 'mlc'] },

  stool_bact: { label: 'Stool Bacteria', formats: ['chevron', 'qatarenergy', 'ilo'] },
  stool_para: { label: 'Stool Parasites', formats: ['chevron', 'qatarenergy', 'ilo'] },
  only_cg: { label: 'Other Stool Tests', formats: ['chevron', 'qatarenergy'] },
  detail_af: { label: 'Abnormal Detail', formats: ['chevron', 'qatarenergy'] },

  // ==========================================
  // 6. KESIMPULAN & ADMINISTRASI (CONCLUSION)
  // ==========================================
  fit_lookout: { label: 'Fitness Lookout', formats: ['ilo', 'mlc', 'adnoc', 'marshall'] },
  fit_deck: { label: 'Fitness Deck', formats: ['ilo', 'mlc'] },
  fit_engine: { label: 'Fitness Engine', formats: ['ilo', 'mlc'] },
  fit_catering: { label: 'Fitness Catering', formats: ['ilo', 'mlc'] },
  fit_other: { label: 'Fitness Other', formats: ['ilo', 'mlc'] },
  restrictions: { label: 'Restrictions', formats: ['ilo', 'mlc', 'qatarenergy', 'marshall'] },
  free_cond: { label: 'Free From Condition', formats: ['ilo', 'mlc', 'marshall'] },
  rest_desc: { label: 'Restriction Description', formats: ['ilo', 'mlc', 'qatarenergy', 'marshall'] },
  action_taken: { label: 'Action Taken', formats: ['ilo', 'mlc'] },
  id_checked: { label: 'ID Checked', formats: ['ilo', 'mlc'] },
  watch_able: { label: 'Watchkeeping Able', formats: ['ilo', 'mlc'] },
  
  date: { label: 'Exam Date', formats: ['chevron', 'adnoc', 'ilo', 'mlc', 'qatarenergy', 'marshall'] },
  exp_date: { label: 'Expiry Date', formats: ['ilo', 'mlc', 'marshall'] },
  eps: { label: 'Examining Physician Stamp', formats: ['chevron', 'ilo', 'mlc', 'adnoc', 'marshall', 'qatarenergy'] },
  hospital: { label: 'Hospital', formats: ['chevron', 'ilo', 'adnoc', 'marshall'] },
  cert_auth: { label: 'Certifying Authority', formats: ['ilo', 'marshall'] },
  comments: { label: 'Comments', formats: ['ilo', 'mlc', 'qatarenergy', 'chevron'] },
  summary: { label: 'Summary', formats: ['chevron', 'qatarenergy'] },
  suggestion: { label: 'Suggestion', formats: ['chevron', 'qatarenergy'] },
};

export function getVisibleFields(selectedFormats: SelectedFormat[]): string[] {
  if (selectedFormats.length === 0) return [];

  return Object.entries(fieldRegistry)
    .filter(([, config]) =>
      config.formats.some((format) => selectedFormats.includes(format))
    )
    .map(([fieldName]) => fieldName);
}