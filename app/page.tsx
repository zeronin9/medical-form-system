'use client';

import { useEffect, useMemo, useState } from 'react';
import type React from 'react';

import {
  FormatContext,
  type SelectedFormat,
} from '@/components/forms/FormConstants';

import FormatSelector from '@/components/forms/FormatSelector';
import IdentitySection from '@/components/forms/IdentitySection';
import BiometricVisionSection from '@/components/forms/BiometricVisionSection';
import PhysicalExamSection from '@/components/forms/PhysicalExamSection';
import MedicalHistorySection from '@/components/forms/MedicalHistorySection';
import LabSection from '@/components/forms/LabSection';
import ConclusionSection from '@/components/forms/ConclusionSection';

import { getVisibleFields } from '@/lib/fieldRegistry';

type FormValue = string | boolean;
type FormDataState = Record<string, FormValue>;

const initialFormData: FormDataState = {
  // --- IDENTITAS & PEKERJAAN ---
  firstName: '',
  middleName: '',
  familyName: '',
  dob: '',
  pob_city: '',
  pob_country: '',
  pob: '',
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
  date: '',
  serviceDate: '',
  medNo: '',
  typeOfShip: '',
  tradeArea: '',
  ilo_position: '',
  seaman_book: '',
  reason_exam: '',

  // --- RIWAYAT PEKERJAAN (Adnoc) ---
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

  // --- PAPARAN (Exposure) ---
  expnoise: '',
  expheavymetals: '',
  expskininfections: '',
  expcompensation: '',
  expchemicals: '',
  expradiation: '',
  expdust: '',
  expdisable: '',
  expdisableno: '',

  // --- BIOMETRIK & TANDA VITAL ---
  height: '',
  weight: '',
  waist: '',
  bmi: '',
  pulse: '',
  bloodPressure: '',
  rr: '',
  temp: '',
  chest_exp: '',
  gen_app: '',
  bloodGroupType: '',
  bloodGroupRh: '',

  // --- PEMERIKSAAN FISIK ---
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
  ns_emot: '',
  ns_comm: '',
  r_bl_r: '',
  r_tl_r: '',
  r_sup_r: '',
  r_kn_r: '',
  r_an_r: '',
  r_pl_r: '',
  r_bl_l: '',
  r_tl_l: '',
  r_sup_l: '',
  r_kn_l: '',
  r_an_l: '',
  r_pl_l: '',

  // --- MATA & TELINGA (Fisik Dasar) ---
  ea_meatus: '',
  ea_drums: '',
  ea_comm: '',
  ea_wr_r: '',
  ea_wr_l: '',
  ea_hr_r: '',
  ea_hr_l: '',
  ey_light: '',
  ey_accom: '',
  ey_nyst: '',
  ey_fundi: '',
  ey_comm: '',

  // --- KETAJAMAN PENGLIHATAN & PENDENGARAN ---
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
  vf_r: '',
  vf_l: '',
  bv_cor: '',
  near_bv_cor: '',
  color_vision: '',
  color_test_type: '',
  colortesttype: '',
  hear_r: '',
  hear_l: '',
  color_y: false,
  color_r: false,
  color_g: false,
  color_b: false,

  // --- ADMINISTRASI MEDIS STCW ---
  id_checked: '',
  hr_stcw: '',
  hr_unaid: '',
  vis_stcw: '',
  col_stcw: '',
  glasses_nec: '',
  watch_able: '',

  // --- RIWAYAT KESEHATAN ---
  mh_varicose: '',
  mh_digestive: '',
  mh_infectious: '',
  mh_genital: '',
  mh_loss_consc: '',
  mh_psychiatric: '',
  mh_depression: '',
  mh_suicide: '',
  mh_memory: '',
  mh_balance: '',
  mh_mobility: '',
  mh_back: '',
  mh_amputation: '',
  mh_hbp: '',
  mh_heart: '',
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
  mh_musculo: '',
  mh_rheumatism: '',
  mh_accident: '',
  mh_eczema: '',
  mh_vitiligo: '',
  mh_kidney: '',
  mh_eye: '',
  mh_eye2: '',
  mh_ear: '',
  mh_tinnitus: '',
  mh_ear2: '',
  mh_diabetes: '',
  mh_thyroid: '',
  mh_blood: '',
  mh_anemia: '',
  mh_thal: '',
  mh_sickle: '',
  mh_allergy_med: '',
  mh_skin: '',
  mh_drug: '',
  mhpregnancy: '',
  mhcardiacsurgery: '',
  mhsurgery: '',
  mhangina: '',
  mhkidneystone: '',
  mhanxiety: '',
  mhsleep: '',
  mhfainting: '',
  diabins: '',
  diabnon: '',

  // --- KUISIONER GAYA HIDUP & MENTAL ---
  qcertrevoked: '',
  qawaremedical: '',
  qillness: '',
  qhospwait: '',
  qmedevac: '',
  qmeds: '',
  qsmoke: '',
  qalcohol: '',
  qfit: '',
  qfear: '',
  qstress: '',
  qstressful: '',
  qomfc: '',
  nwothers: '',
  mhothers: '',
  fmothers: '',
  vaccinated: '',
  illnesslast: '',
  qstressscore: '',
  qsmokefreq: '',
  qsmoketext: '',
  qalcoholtext: '',
  qmedevactext: '',
  qomfctext: '',
  qmedstext: '',
  smokery: '',
  smokerd: '',
  smokerq: '',
  smokersy: '',

  // --- RIWAYAT KELUARGA & VAKSIN ---
  fm_diabetes: '',
  fm_hypertension: '',
  fm_epilepsy: '',
  fm_heart: '',
  fm_asthma: '',
  fm_cancer: '',
  fm_tb: '',
  fm_allergy: '',
  fm_mental: '',
  vac_hepa: '',
  vac_tet: '',
  vac_hepb: '',
  vac_mea: '',
  vac_c19: '',
  vac_chick: '',
  vac_typh: '',
  nw_confined: '',
  nw_diving: '',
  nw_height: '',
  nw_swing: '',
  nw_heavy: '',
  nw_office: '',
  nw_hanging: '',
  nw_sewage: '',
  nw_emergency: '',
  nw_food: '',
  nw_radiation: '',

  // --- DATA KHUSUS WANITA & KELUARGA ---
  flmp: '',
  fpregno: '',
  flivebirth: '',
  fheavy: '',
  fregular: '',
  fpain: '',
  fpill: '',
  faage: '',
  fastate: '',
  moage: '',
  mostate: '',
  sibage: '',
  sibstate: '',
  spoage: '',
  spostate: '',
  chiage: '',
  chistate: '',

  // --- HASIL LABORATORIUM (Spirometri, Audio, EKG) ---
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

  // --- HASIL LABORATORIUM (Darah & Urin) ---
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
  val_sugar: '',
  val_chol: '',
  val_trig: '',
  val_hdl: '',
  val_ldl: '',
  val_bun: '',
  val_creat: '',
  val_sgot: '',
  val_sgpt: '',
  val_urig: '',
  detail_af: '',

  // --- RONTGEN & SEROLOGI ---
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
  only_cg: '',

  // --- KESIMPULAN / CONCLUSION ---
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

export default function Home() {
  const [selectedFormats, setSelectedFormats] = useState<SelectedFormat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  const showForm = selectedFormats.length > 0;

  const activeFields = useMemo(
    () => getVisibleFields(selectedFormats),
    [selectedFormats]
  );

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      date: prev.date || formattedDate,
    }));
  }, []);

  useEffect(() => {
    const heightRaw = String(formData.height ?? '').trim();
    const weightRaw = String(formData.weight ?? '').trim();

    if (!heightRaw || !weightRaw) {
      setFormData((prev) => {
        if (prev.bmi === '') return prev;
        return { ...prev, bmi: '' };
      });
      return;
    }

    const h = Number.parseFloat(heightRaw) / 100;
    const w = Number.parseFloat(weightRaw);

    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
      setFormData((prev) => {
        if (prev.bmi === '') return prev;
        return { ...prev, bmi: '' };
      });
      return;
    }

    const nextBmi = (w / (h * h)).toFixed(1);

    setFormData((prev) => {
      if (prev.bmi === nextBmi) return prev;
      return { ...prev, bmi: nextBmi };
    });
  }, [formData.height, formData.weight]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  };

  const handleFormatToggle = (format: SelectedFormat, checked: boolean) => {
    setSelectedFormats((prev) => {
      if (checked) {
        if (prev.includes(format)) return prev;
        return [...prev, format];
      }
      return prev.filter((item) => item !== format);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFormats.length === 0) return;

    setIsLoading(true);

    const combinedGivenName = [formData.firstName, formData.middleName]
      .map((item) => String(item ?? '').trim())
      .filter(Boolean)
      .join(' ');

    const combinedPob = [formData.pob_city, formData.pob_country]
      .map((item) => String(item ?? '').trim())
      .filter(Boolean)
      .join(', ');

    const syncedColorTestType =
      String(formData.color_test_type ?? '').trim() ||
      String(formData.colortesttype ?? '').trim();

    const payloadData: FormDataState = {
      ...formData,
      firstName: combinedGivenName || String(formData.firstName ?? ''),
      pob: combinedPob || '',
      color_test_type: syncedColorTestType,
      colortesttype: syncedColorTestType,
    };

    try {
      for (const format of selectedFormats) {
        const apiRoute = format === 'qatarenergy' ? '/api/qatar' : `/api/${format}`;

        const response = await fetch(apiRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: payloadData }),
        });

        if (!response.ok) {
          throw new Error(`Gagal mencetak dokumen format: ${format.toUpperCase()}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `${combinedGivenName || 'Pelaut'}_${format.toUpperCase()}_Medical_Report.docx`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat membuat dokumen.';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">
            Sistem Rekam Medis Terpadu
          </h1>
          <p className="text-sm text-slate-500">
            Pilih format untuk memunculkan indikator badge pada form inputan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormatSelector
            selectedFormats={selectedFormats}
            handleCheckboxChange={handleFormatToggle}
          />

          {!showForm && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
              <h3 className="text-sm font-semibold text-slate-700">
                Belum ada format yang dipilih
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Silakan pilih minimal satu format dokumen di atas untuk membuka
                isian rekam medis.
              </p>
            </div>
          )}

          {showForm && (
            <FormatContext.Provider value={selectedFormats}>
              <div className="animate-in slide-in-from-bottom-4 fade-in space-y-8 duration-500">
                <IdentitySection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                  activeFields={activeFields}
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
                  selectedFormats={selectedFormats}
                  activeFields={activeFields}
                />

                <MedicalHistorySection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                  activeFields={activeFields}
                />

                <LabSection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                  activeFields={activeFields}
                />

                <ConclusionSection
                  formData={formData}
                  handleChange={handleInputChange}
                  selectedFormats={selectedFormats}
                  activeFields={activeFields}
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