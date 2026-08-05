'use client';

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

// Mengimpor Context Penanda Badge
import { FormatContext } from '@/components/forms/FormConstants';

// Mengimpor semua komponen form yang sudah dipisahkan
import FormatSelector from '@/components/forms/FormatSelector';
import IdentitySection from '@/components/forms/IdentitySection';
import BiometricVisionSection from '@/components/forms/BiometricVisionSection';
import PhysicalExamSection from '@/components/forms/PhysicalExamSection';
import MedicalHistorySection from '@/components/forms/MedicalHistorySection';
import LabSection from '@/components/forms/LabSection';
import ConclusionSection from '@/components/forms/ConclusionSection';

type FormatKey =
  | 'chevron'
  | 'qatarenergy'
  | 'ilo'
  | 'mlc'
  | 'adnoc'
  | 'marshall';

const INITIAL_FORM_DATA = {
  // Identitas & Pekerjaan Dasar
  firstName: '',
  middleName: '',
  familyName: '',
  dob: '',
  pob: '',
  pob_city: '',
  pob_country: '',
  idPassport: '',
  nationality: '',
  gender: '',
  maritalStatus: '',
  address: '',
  contactNumber: '',
  email: '',
  position: '',
  department: '',
  company: '',
  workLocation: '',
  date: new Date().toLocaleDateString('id-ID'),
  serviceDate: '',
  medNo: '',
  typeOfShip: '',
  tradeArea: '',
  ilo_position: '',
  seaman_book: '',
  reason_exam: '',

  // Previous employment ADNOC
  job1: '',
  comp1: '',
  from1: '',
  to1: '',
  job2: '',
  comp2: '',
  from2: '',
  to2: '',
  job3: '',
  comp3: '',
  from3: '',
  to3: '',
  job4: '',
  comp4: '',
  from4: '',
  to4: '',

  // Previous exposure ADNOC
  exp_noise: '',
  exp_heavy_metals: '',
  exp_skin_infections: '',
  exp_compensation: '',
  exp_chemicals: '',
  exp_radiation: '',
  exp_dust: '',
  exp_disable: '',
  exp_disable_no: '',

  // Biometrik & Tanda Vital
  height: '',
  weight: '',
  waist: '',
  bmi: '',
  pulse: '',
  bloodPressure: '',
  respiratoryRate: '',
  rr: '',
  temp: '',
  chest_exp: '',
  gen_app: '',
  bloodGroupType: '',
  bloodGroupRh: '',

  // Pemeriksaan fisik rinci
  cv_pulse: '',
  cv_bp: '',
  cv_apex: '',
  cv_sounds: '',
  cv_murmurs: '',
  cv_varicose: '',
  cv_comm: '',

  rs_nasal: '',
  rs_thyroid: '',
  rs_trachea: '',
  rs_chest: '',
  rs_perc: '',
  rs_air: '',
  rs_breath: '',
  rs_advent: '',
  rs_comm: '',

  al_teeth: '',
  al_tongue: '',
  al_abd: '',
  al_liver: '',
  al_spleen: '',
  al_lymph: '',
  al_hernia: '',
  al_anus: '',
  al_comm: '',

  gu_kidney: '',
  gu_gen: '',
  gu_comm: '',

  in_hair: '',
  in_skin: '',
  in_nails: '',
  in_comm: '',

  ms_hands: '',
  ms_limbs: '',
  ms_back: '',
  ms_joints: '',
  ms_inj: '',
  ms_comm: '',

  ns_power: '',
  ns_tone: '',
  ns_coord: '',
  ns_sens: '',
  ns_intel: '',
  ns_comm: '',

  ea_meatus: '',
  ea_drums: '',
  ea_comm: '',

  ey_light: '',
  ey_accom: '',
  ey_nyst: '',
  ey_fundi: '',
  ey_comm: '',

  // Penglihatan & Pendengaran
  disr_unc: '',
  disl_unc: '',
  nearr_unc: '',
  nearl_unc: '',
  bv_unc: '',
  near_bv_unc: '',
  disr_cor: '',
  disl_cor: '',
  nearr_cor: '',
  nearl_cor: '',
  bv_cor: '',
  near_bv_cor: '',
  color_vision: '',
  color_test_type: '',
  hear_r: '',
  hear_l: '',

  // Warna spesifik ILO
  color_y: false,
  color_r: false,
  color_g: false,
  color_b: false,

  // Spesifik ILO
  id_checked: '',
  hr_stcw: '',
  hr_unaid: '',
  vis_stcw: '',
  col_stcw: '',
  glasses_nec: '',
  watch_able: '',

  // Kuesioner spesifik ILO
  mh_varicose: '',
  mh_digestive: '',
  mh_infectious: '',
  mh_genital: '',
  mh_pregnancy: '',
  mh_loss_consc: '',
  mh_psychiatric: '',
  mh_depression: '',
  mh_suicide: '',
  mh_memory: '',
  mh_balance: '',
  mh_mobility: '',
  mh_back: '',
  mh_amputation: '',
  q_cert_revoked: '',
  q_aware_medical: '',

  // Kuesioner umum
  q_illness: '',
  q_hosp_wait: '',
  q_medevac: '',
  q_meds: '',
  q_smoke: '',
  q_alcohol: '',
  q_fit: '',
  q_fear: '',
  q_stress: '',
  q_stressful: '',
  q_omfc: '',
  nw_others: '',
  mh_others: '',
  fm_others: '',
  vaccinated: '',
  fm_tb: '',
  fm_allergy: '',
  fm_mental: '',
  fm_heart: '',
  fm_asthma: '',
  fm_diabetes: '',
  fm_hypertension: '',
  fm_cancer: '',
  illness_last: '',

  // Riwayat penyakit pribadi
  mh_hbp: '',
  mh_angina: '',
  mh_heart: '',
  mh_cardiac_surgery: '',
  mh_asthma: '',
  mh_bronchitis: '',
  mh_tb: '',
  mh_ulcer: '',
  mh_hep: '',
  mh_piles: '',
  mh_hernia: '',
  mh_constipation: '',
  mh_diarrhea: '',
  mh_bowel: '',
  mh_epilepsy: '',
  mh_stroke: '',
  mh_headache: '',
  mh_fainting: '',
  mh_musculo: '',
  mh_rheumatism: '',
  mh_accident: '',
  mh_eczema: '',
  mh_vitiligo: '',
  mh_skin: '',
  mh_kidney: '',
  mh_kidney_stone: '',
  mh_anxiety: '',
  mh_sleep: '',
  mh_eye: '',
  mh_eye2: '',
  mh_ear: '',
  mh_tinnitus: '',
  mh_ear2: '',
  diab_ins: '',
  diab_non: '',
  mh_diabetes: '',
  mh_thyroid: '',
  mh_blood: '',
  mh_drug: '',
  mh_surgery: '',

  // Tambahan ADNOC
  mh_anemia: '',
  mh_thal: '',
  mh_sickle: '',
  mh_allergy_med: '',

  // Khusus pelaut wanita
  f_lmp: '',
  f_preg_no: '',
  f_live_birth: '',
  f_heavy: '',
  f_reg: '',
  f_pain: '',
  f_pill: '',

  // Tabel keluarga ADNOC
  fa_age: '',
  fa_state: '',
  mo_age: '',
  mo_state: '',
  sib_age: '',
  sib_state: '',
  spo_age: '',
  spo_state: '',
  chi_age: '',
  chi_state: '',

  // Qatar & Chevron
  q_stress_score: '',
  q_smoke_freq: '',
  q_smoke_text: '',
  q_alcohol_text: '',
  q_medevac_text: '',
  q_omfc_text: '',
  q_meds_text: '',
  smoker_y: '',
  smoker_d: '',
  smoker_q: '',
  smoker_s_y: '',
  ft_fvc: '',
  pre_fvc: '',
  ft_fev1: '',
  pre_fev1: '',
  ev1_vc: '',
  l05: '',
  l1: '',
  l2: '',
  l3: '',
  l4: '',
  l6: '',
  l8: '',
  r05: '',
  r1: '',
  r2: '',
  r3: '',
  r4: '',
  r6: '',
  r8: '',
  oht_result: '',
  rate: '',
  rhyt: '',
  axis: '',
  pr: '',
  qrs: '',
  twv: '',
  diag: '',

  // Darah lengkap & urin
  lab_hb: '',
  lab_hct: '',
  rbc_m: '',
  lab_wbc: '',
  lab_platelet: '',
  pmn: '',
  lymph: '',
  mono: '',
  eos: '',
  baso: '',
  band: '',
  albumin: '',
  ur_sugar: '',
  urin_b: '',
  wbc: '',
  rbc: '',
  casts: '',
  ur_others: '',

  // Kimia darah
  lab_sugar: '',
  val_sugar: '',
  lab_chol: '',
  val_chol: '',
  lab_trig: '',
  val_trig: '',
  only_cg: '',
  lab_hdl: '',
  val_hdl: '',
  lab_ldl: '',
  val_ldl: '',
  lab_bun: '',
  val_bun: '',
  lab_creat: '',
  val_creat: '',
  lab_sgot: '',
  val_sgot: '',
  lab_sgpt: '',
  val_sgpt: '',
  lab_uric: '',
  val_urig: '',
  detail_af: '',

  // Rontgen & Serologi
  date_xray: '',
  xray: '',
  des_abnor: '',
  lab_sr: '',
  hep_b_ab: '',
  hep_b_ag: '',
  hep_c: '',
  hep_a: '',
  stool_bact: '',
  stool_para: '',
  hiv_res: '',
  vdrl_res: '',
  vac_status: '',
  vac_details: '',

  // Kesimpulan
  fit_lookout: '',
  fit_deck: '',
  fit_engine: '',
  fit_catering: '',
  fit_other: '',
  restrictions: '',
  free_cond: '',
  rest_desc: '',
  action_taken: '',
  exp_date: '',
  summary: '',
  suggestion: '',
  eps: '',
  hospital: '',
  cert_auth: '',
  comments: '',
};

type FormDataShape = typeof INITIAL_FORM_DATA;
type FieldKey = keyof FormDataShape;

const COMMON_IDENTITY_FIELDS: FieldKey[] = [
  'firstName',
  'middleName',
  'familyName',
  'dob',
  'pob',
  'pob_city',
  'pob_country',
  'idPassport',
  'nationality',
  'gender',
  'maritalStatus',
  'address',
  'contactNumber',
  'email',
  'position',
  'department',
  'company',
  'workLocation',
  'date',
  'reason_exam',
];

const MARITIME_ADMIN_FIELDS: FieldKey[] = [
  'serviceDate',
  'medNo',
  'typeOfShip',
  'tradeArea',
  'ilo_position',
  'seaman_book',
];

const COMMON_BIOMETRIC_FIELDS: FieldKey[] = [
  'height',
  'weight',
  'waist',
  'bmi',
  'pulse',
  'bloodPressure',
  'respiratoryRate',
  'rr',
  'temp',
  'chest_exp',
  'gen_app',
  'bloodGroupType',
  'bloodGroupRh',
];

const COMMON_PHYSICAL_FIELDS: FieldKey[] = [
  'cv_pulse',
  'cv_bp',
  'cv_apex',
  'cv_sounds',
  'cv_murmurs',
  'cv_varicose',
  'cv_comm',
  'rs_nasal',
  'rs_thyroid',
  'rs_trachea',
  'rs_chest',
  'rs_perc',
  'rs_air',
  'rs_breath',
  'rs_advent',
  'rs_comm',
  'al_teeth',
  'al_tongue',
  'al_abd',
  'al_liver',
  'al_spleen',
  'al_lymph',
  'al_hernia',
  'al_anus',
  'al_comm',
  'gu_kidney',
  'gu_gen',
  'gu_comm',
  'in_hair',
  'in_skin',
  'in_nails',
  'in_comm',
  'ms_hands',
  'ms_limbs',
  'ms_back',
  'ms_joints',
  'ms_inj',
  'ms_comm',
  'ns_power',
  'ns_tone',
  'ns_coord',
  'ns_sens',
  'ns_intel',
  'ns_comm',
  'ea_meatus',
  'ea_drums',
  'ea_comm',
  'ey_light',
  'ey_accom',
  'ey_nyst',
  'ey_fundi',
  'ey_comm',
];

const COMMON_VISION_HEARING_FIELDS: FieldKey[] = [
  'disr_unc',
  'disl_unc',
  'nearr_unc',
  'nearl_unc',
  'bv_unc',
  'near_bv_unc',
  'disr_cor',
  'disl_cor',
  'nearr_cor',
  'nearl_cor',
  'bv_cor',
  'near_bv_cor',
  'color_vision',
  'color_test_type',
  'hear_r',
  'hear_l',
];

const COMMON_HISTORY_FIELDS: FieldKey[] = [
  'q_illness',
  'q_hosp_wait',
  'q_medevac',
  'q_meds',
  'q_smoke',
  'q_alcohol',
  'q_fit',
  'q_fear',
  'q_stress',
  'q_stressful',
  'q_omfc',
  'nw_others',
  'mh_others',
  'fm_others',
  'vaccinated',
  'fm_tb',
  'fm_allergy',
  'fm_mental',
  'fm_heart',
  'fm_asthma',
  'fm_diabetes',
  'fm_hypertension',
  'fm_cancer',
  'illness_last',
  'mh_hbp',
  'mh_angina',
  'mh_heart',
  'mh_cardiac_surgery',
  'mh_asthma',
  'mh_bronchitis',
  'mh_tb',
  'mh_ulcer',
  'mh_hep',
  'mh_piles',
  'mh_hernia',
  'mh_constipation',
  'mh_diarrhea',
  'mh_bowel',
  'mh_epilepsy',
  'mh_stroke',
  'mh_headache',
  'mh_fainting',
  'mh_musculo',
  'mh_rheumatism',
  'mh_accident',
  'mh_eczema',
  'mh_vitiligo',
  'mh_skin',
  'mh_kidney',
  'mh_kidney_stone',
  'mh_anxiety',
  'mh_sleep',
  'mh_eye',
  'mh_eye2',
  'mh_ear',
  'mh_tinnitus',
  'mh_ear2',
  'diab_ins',
  'diab_non',
  'mh_diabetes',
  'mh_thyroid',
  'mh_blood',
  'mh_drug',
  'mh_surgery',
  'f_lmp',
  'f_preg_no',
  'f_live_birth',
  'f_heavy',
  'f_reg',
  'f_pain',
  'f_pill',
];

const COMMON_LAB_FIELDS: FieldKey[] = [
  'lab_hb',
  'lab_hct',
  'rbc_m',
  'lab_wbc',
  'lab_platelet',
  'pmn',
  'lymph',
  'mono',
  'eos',
  'baso',
  'band',
  'albumin',
  'ur_sugar',
  'urin_b',
  'wbc',
  'rbc',
  'casts',
  'ur_others',
  'lab_sugar',
  'val_sugar',
  'lab_chol',
  'val_chol',
  'lab_trig',
  'val_trig',
  'only_cg',
  'lab_hdl',
  'val_hdl',
  'lab_ldl',
  'val_ldl',
  'lab_bun',
  'val_bun',
  'lab_creat',
  'val_creat',
  'lab_sgot',
  'val_sgot',
  'lab_sgpt',
  'val_sgpt',
  'lab_uric',
  'val_urig',
  'detail_af',
  'date_xray',
  'xray',
  'des_abnor',
  'lab_sr',
  'hep_b_ab',
  'hep_b_ag',
  'hep_c',
  'hep_a',
  'stool_bact',
  'stool_para',
  'hiv_res',
  'vdrl_res',
  'vac_status',
  'vac_details',
];

const COMMON_CONCLUSION_FIELDS: FieldKey[] = [
  'fit_lookout',
  'fit_deck',
  'fit_engine',
  'fit_catering',
  'fit_other',
  'restrictions',
  'free_cond',
  'rest_desc',
  'action_taken',
  'exp_date',
  'summary',
  'suggestion',
  'eps',
  'hospital',
  'cert_auth',
  'comments',
];

const ADNOC_ONLY_FIELDS: FieldKey[] = [
  'job1',
  'comp1',
  'from1',
  'to1',
  'job2',
  'comp2',
  'from2',
  'to2',
  'job3',
  'comp3',
  'from3',
  'to3',
  'job4',
  'comp4',
  'from4',
  'to4',
  'exp_noise',
  'exp_heavy_metals',
  'exp_skin_infections',
  'exp_compensation',
  'exp_chemicals',
  'exp_radiation',
  'exp_dust',
  'exp_disable',
  'exp_disable_no',
  'mh_anemia',
  'mh_thal',
  'mh_sickle',
  'mh_allergy_med',
  'fa_age',
  'fa_state',
  'mo_age',
  'mo_state',
  'sib_age',
  'sib_state',
  'spo_age',
  'spo_state',
  'chi_age',
  'chi_state',
];

const ILO_ONLY_FIELDS: FieldKey[] = [
  'color_y',
  'color_r',
  'color_g',
  'color_b',
  'id_checked',
  'hr_stcw',
  'hr_unaid',
  'vis_stcw',
  'col_stcw',
  'glasses_nec',
  'watch_able',
  'mh_varicose',
  'mh_digestive',
  'mh_infectious',
  'mh_genital',
  'mh_pregnancy',
  'mh_loss_consc',
  'mh_psychiatric',
  'mh_depression',
  'mh_suicide',
  'mh_memory',
  'mh_balance',
  'mh_mobility',
  'mh_back',
  'mh_amputation',
  'q_cert_revoked',
  'q_aware_medical',
];

const QATAR_CHEVRON_ONLY_FIELDS: FieldKey[] = [
  'q_stress_score',
  'q_smoke_freq',
  'q_smoke_text',
  'q_alcohol_text',
  'q_medevac_text',
  'q_omfc_text',
  'q_meds_text',
  'smoker_y',
  'smoker_d',
  'smoker_q',
  'smoker_s_y',
  'ft_fvc',
  'pre_fvc',
  'ft_fev1',
  'pre_fev1',
  'ev1_vc',
  'l05',
  'l1',
  'l2',
  'l3',
  'l4',
  'l6',
  'l8',
  'r05',
  'r1',
  'r2',
  'r3',
  'r4',
  'r6',
  'r8',
  'oht_result',
  'rate',
  'rhyt',
  'axis',
  'pr',
  'qrs',
  'twv',
  'diag',
];

const COMMON_CORE_FIELDS: FieldKey[] = [
  ...COMMON_IDENTITY_FIELDS,
  ...COMMON_BIOMETRIC_FIELDS,
  ...COMMON_PHYSICAL_FIELDS,
  ...COMMON_VISION_HEARING_FIELDS,
  ...COMMON_HISTORY_FIELDS,
  ...COMMON_LAB_FIELDS,
  ...COMMON_CONCLUSION_FIELDS,
];

const FORMAT_FIELD_MAP: Record<FormatKey, FieldKey[]> = {
  chevron: [...COMMON_CORE_FIELDS, ...QATAR_CHEVRON_ONLY_FIELDS],
  qatarenergy: [...COMMON_CORE_FIELDS, ...QATAR_CHEVRON_ONLY_FIELDS],
  ilo: [...COMMON_CORE_FIELDS, ...MARITIME_ADMIN_FIELDS, ...ILO_ONLY_FIELDS],
  mlc: [...COMMON_CORE_FIELDS, ...MARITIME_ADMIN_FIELDS],
  adnoc: [...COMMON_CORE_FIELDS, ...ADNOC_ONLY_FIELDS],
  marshall: [...COMMON_CORE_FIELDS, ...MARITIME_ADMIN_FIELDS],
};

function uniqueFields(fields: FieldKey[]): FieldKey[] {
  return Array.from(new Set(fields));
}

function getAllowedFields(formats: FormatKey[]): FieldKey[] {
  if (formats.length === 0) return [];

  const merged = formats.flatMap((format) => FORMAT_FIELD_MAP[format] ?? []);
  return uniqueFields(merged);
}

function sanitizeDataByFormats(
  data: FormDataShape,
  formats: FormatKey[]
): FormDataShape {
  if (formats.length === 0) return data;

  const allowed = new Set<FieldKey>(getAllowedFields(formats));
  const sanitized: Record<string, string | boolean> = { ...data };

  (Object.keys(INITIAL_FORM_DATA) as FieldKey[]).forEach((key) => {
    if (!allowed.has(key)) {
      sanitized[key] = INITIAL_FORM_DATA[key];
    }
  });

  return sanitized as FormDataShape;
}

function buildPayloadForFormat(
  format: FormatKey,
  data: FormDataShape
): FormDataShape {
  const sanitized = sanitizeDataByFormats(data, [format]);

  const combinedGivenName = [sanitized.firstName, sanitized.middleName]
    .filter(Boolean)
    .join(' ')
    .trim();

  const combinedPob = [sanitized.pob_city, sanitized.pob_country]
    .filter(Boolean)
    .join(', ')
    .trim();

  return {
    ...sanitized,
    firstName: combinedGivenName,
    pob: combinedPob,
  };
}

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<FormatKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataShape>(INITIAL_FORM_DATA);

  const showForm = selectedFormats.length > 0;

  const activeFields = useMemo(
    () => getAllowedFields(selectedFormats),
    [selectedFormats]
  );

  // Auto-kalkulasi BMI
  useEffect(() => {
    const hasHeight = !!formData.height;
    const hasWeight = !!formData.weight;

    if (!hasHeight || !hasWeight) {
      if (formData.bmi !== '') {
        setFormData((prev) => ({ ...prev, bmi: '' }));
      }
      return;
    }

    const h = parseFloat(formData.height) / 100;
    const w = parseFloat(formData.weight);

    if (Number.isFinite(h) && Number.isFinite(w) && h > 0) {
      const nextBmi = (w / (h * h)).toFixed(1);
      if (formData.bmi !== nextBmi) {
        setFormData((prev) => ({ ...prev, bmi: nextBmi }));
      }
    }
  }, [formData.height, formData.weight, formData.bmi]);

  // Reset field yang tidak relevan saat format berubah
  useEffect(() => {
    if (selectedFormats.length === 0) return;

    setFormData((prev) => {
      const sanitized = sanitizeDataByFormats(prev, selectedFormats);

      const changed = (Object.keys(INITIAL_FORM_DATA) as FieldKey[]).some(
        (key) => prev[key] !== sanitized[key]
      );

      return changed ? sanitized : prev;
    });
  }, [selectedFormats]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const format = value as FormatKey;

    setSelectedFormats((prev) => {
      if (checked) {
        return prev.includes(format) ? prev : [...prev, format];
      }
      return prev.filter((f) => f !== format);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFormats.length === 0) return;

    setIsLoading(true);

    try {
      for (const format of selectedFormats) {
        const payloadData = buildPayloadForFormat(format, formData);
        const combinedGivenName =
          payloadData.firstName?.trim() || 'Pelaut';

        let apiRoute = `/api/${format}`;
        if (format === 'qatarenergy') apiRoute = '/api/qatar';

        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: payloadData }),
        });

        if (!response.ok) {
          throw new Error(
            `Gagal mencetak dokumen format: ${format.toUpperCase()}`
          );
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `${combinedGivenName}_${format.toUpperCase()}_Medical_Report.docx`;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Terjadi kesalahan saat generate dokumen.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 selection:bg-slate-200">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Sistem Rekam Medis Terpadu
          </h1>
          <p className="text-slate-500">
            Pilih format untuk memunculkan indikator Badge pada form inputan.
          </p>
          {showForm && (
            <p className="text-sm text-slate-600">
              Format aktif: {selectedFormats.join(', ').toUpperCase()} | Jumlah
              field aktif: {activeFields.length}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormatSelector
            selectedFormats={selectedFormats}
            handleCheckboxChange={handleCheckboxChange}
          />

          {!showForm && (
            <div className="flex h-[200px] shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white shadow-sm">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Belum ada format yang dipilih
                </p>
                <p className="mb-4 mt-2 text-sm text-slate-500">
                  Silakan pilih minimal satu format dokumen di atas untuk membuka
                  isian rekam medis.
                </p>
              </div>
            </div>
          )}

          {showForm && (
            <FormatContext.Provider value={selectedFormats}>
              <div className="animate-in space-y-8 fade-in slide-in-from-bottom-4 duration-500">
                <IdentitySection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                />

                <BiometricVisionSection
  formData={formData}
  handleChange={handleInputChange}
  selectedFormats={selectedFormats}
  activeFields={activeFields}
/>

                <PhysicalExamSection
                  formData={formData}
                  handleChange={handleInputChange}
                />

                <MedicalHistorySection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                />

                <LabSection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                />

                <ConclusionSection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex h-12 w-full items-center justify-center rounded-md text-sm font-bold text-white shadow-md transition-colors ${
                    isLoading
                      ? 'cursor-not-allowed bg-slate-400'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {isLoading
                    ? 'MENCETAK DOKUMEN...'
                    : 'Generate Semua Dokumen Medis Terpilih Sekarang'}
                </button>
              </div>
            </FormatContext.Provider>
          )}
        </form>
      </div>
    </main>
  );
}