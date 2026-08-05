import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '6. ADNOC Medical Form.docx';
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: `Template tidak ditemukan: ${fileName}` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // @ts-ignore
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: () => '',
    });

    const val = (...keys: string[]) => {
      for (const key of keys) {
        const v = formData[key];
        if (v !== undefined && v !== null) return v;
      }
      return '';
    };

    const str = (...keys: string[]) => {
      const v = val(...keys);
      return v === undefined || v === null ? '' : String(v).trim();
    };

    const isY = (v: any) =>
      String(v).trim() === 'Yes' || v === true ? '☑' : '☐';

    const isN = (v: any) =>
      String(v).trim() === 'No' || v === false ? '☑' : '☐';

    const formatDate = (dateStr: string) => {
      if (!dateStr || !dateStr.includes('-')) return dateStr || '';
      const [yyyy, mm, dd] = dateStr.split('-');
      if (!yyyy || !mm || !dd) return dateStr || '';
      return `${dd}/${mm}/${yyyy}`;
    };

    const cleanJoinedName = (firstNameRaw: string, middleNameRaw: string) => {
      const first = String(firstNameRaw || '').trim();
      const middle = String(middleNameRaw || '').trim();
      if (!first || !middle) return { first, middle };

      const full = `${first} ${middle}`.trim();
      if (first === full) return { first, middle };

      if (first.endsWith(` ${middle}`)) {
        return {
          first: first.slice(0, -(middle.length + 1)).trim(),
          middle,
        };
      }

      return { first, middle };
    };

    const { first: realFirstName, middle: middleName } = cleanJoinedName(
      str('firstName'),
      str('middleName')
    );

    const bpRaw = str('bloodPressure', 'blood_pressure', 'cv_bp');
    const bpParts = bpRaw.split('/');
    const bp_sys = bpParts[0]?.trim() || '';
    const bp_dia = bpParts[1]?.trim() || '';

    const isFemale = str('gender') === 'Female';
    const isDiabetes = str('mh_diabetes') === 'Yes';

    const hepBValue =
      str('hep_b_ag') ||
      str('hep_b_ab') ||
      '';

    const bgRh = `${str('bloodGroupType', 'bg_type')}${str('bloodGroupRh', 'bg_rh')}`.trim();

    const examDate = formatDate(str('date'));
    const dobFormatted = formatDate(str('dob'));

    doc.render({
      // 1. IDENTITAS & PEKERJAAN
      first_name: realFirstName,
      middle_name: middleName,
      family_name: str('familyName'),
      dob: dobFormatted,
      gender: str('gender'),
      nationality: str('nationality'),
      company: str('company'),
      position: str('position', 'ilo_position'),
      marital_status: str('maritalStatus', 'marital_status'),
      address: str('address'),
      contact_number: str('contactNumber', 'contact_number'),
      email: str('email'),
      reason_exam: str('reason_exam'),

      // Previous Employment
      job1: str('job1'), comp1: str('comp1'), from1: str('from1'), to1: str('to1'),
      job2: str('job2'), comp2: str('comp2'), from2: str('from2'), to2: str('to2'),
      job3: str('job3'), comp3: str('comp3'), from3: str('from3'), to3: str('to3'),
      job4: str('job4'), comp4: str('comp4'), from4: str('from4'), to4: str('to4'),

      // 2. EXPOSURE & KELUARGA
      ex_noise: isY(val('exp_noise')),
      ex_metal: isY(val('exp_heavy_metals')),
      ex_skin: isY(val('exp_skin_infections')),
      ex_comp: isY(val('exp_compensation')),
      ex_chem: isY(val('exp_chemicals')),
      ex_rad: isY(val('exp_radiation')),
      ex_dust: isY(val('exp_dust')),
      ex_unfit: isY(val('q_omfc')),
      ex_dis: isY(val('exp_disable')),
      dis_no: str('exp_disable_no'),

      fh_heart: isY(val('fm_heart')),
      fh_asthma: isY(val('fm_asthma')),
      fh_diab: isY(val('fm_diabetes')),
      fh_hbp: isY(val('fm_hypertension')),
      fh_tb: isY(val('fm_tb')),
      fh_allergy: isY(val('fm_allergy')),
      fh_mental: isY(val('fm_mental')),
      fh_cancer: isY(val('fm_cancer')),
      fh_other: str('fm_others') ? '☑' : '☐',
      fm_others: str('fm_others'),

      fa_age: str('fa_age'),
      fa_state: str('fa_state'),
      spo_age: str('spo_age'),
      spo_state: str('spo_state'),
      mo_age: str('mo_age'),
      mo_state: str('mo_state'),
      chi_age: str('chi_age'),
      chi_state: str('chi_state'),
      sib_age: str('sib_age'),
      sib_state: str('sib_state'),

      // 3. PERSONAL HISTORY
      ph_hbp_y: isY(val('mh_hbp')), ph_hbp_n: isN(val('mh_hbp')),
      ph_ang_y: isY(val('mh_angina')), ph_ang_n: isN(val('mh_angina')),
      ph_hrt_y: isY(val('mh_heart')), ph_hrt_n: isN(val('mh_heart')),
      ph_csurg_y: isY(val('mh_cardiac_surgery')), ph_csurg_n: isN(val('mh_cardiac_surgery')),
      ph_asthma_y: isY(val('mh_asthma')), ph_asthma_n: isN(val('mh_asthma')),

      ph_bron_y: isY(val('mh_bronchitis')), ph_bron_n: isN(val('mh_bronchitis')),
      ph_tb_y: isY(val('mh_tb')), ph_tb_n: isN(val('mh_tb')),
      ph_ulcer_y: isY(val('mh_ulcer')), ph_ulcer_n: isN(val('mh_ulcer')),
      ph_hep_y: isY(val('mh_hep')), ph_hep_n: isN(val('mh_hep')),

      ph_piles_y: isY(val('mh_piles')), ph_piles_n: isN(val('mh_piles')),
      ph_hernia_y: isY(val('mh_hernia')), ph_hernia_n: isN(val('mh_hernia')),
      ph_const_y: isY(val('mh_constipation')), ph_const_n: isN(val('mh_constipation')),
      ph_diar_y: isY(val('mh_diarrhea')), ph_diar_n: isN(val('mh_diarrhea')),
      ph_bowel_y: isY(val('mh_bowel')), ph_bowel_n: isN(val('mh_bowel')),

      ph_epil_y: isY(val('mh_epilepsy')), ph_epil_n: isN(val('mh_epilepsy')),
      ph_stroke_y: isY(val('mh_stroke')), ph_stroke_n: isN(val('mh_stroke')),
      ph_mig_y: isY(val('mh_headache')), ph_mig_n: isN(val('mh_headache')),
      ph_vert_y: isY(val('mh_fainting')), ph_vert_n: isN(val('mh_fainting')),
      ph_back_y: isY(val('mh_musculo')), ph_back_n: isN(val('mh_musculo')),
      ph_joint_y: isY(val('mh_rheumatism')), ph_joint_n: isN(val('mh_rheumatism')),
      ph_frac_y: isY(val('mh_accident')), ph_frac_n: isN(val('mh_accident')),

      ph_ecz_y: isY(val('mh_eczema')), ph_ecz_n: isN(val('mh_eczema')),
      ph_viti_y: isY(val('mh_vitiligo')), ph_viti_n: isN(val('mh_vitiligo')),

      ph_kid_y: isY(val('mh_kidney')), ph_kid_n: isN(val('mh_kidney')),
      ph_ksto_y: isY(val('mh_kidney_stone')), ph_ksto_n: isN(val('mh_kidney_stone')),
      ph_anx_y: isY(val('mh_anxiety')), ph_anx_n: isN(val('mh_anxiety')),
      ph_slp_y: isY(val('mh_sleep')), ph_slp_n: isN(val('mh_sleep')),

      ph_eye1_y: isY(val('mh_eye')), ph_eye1_n: isN(val('mh_eye')),
      ph_eye2_y: isY(val('mh_eye2')), ph_eye2_n: isN(val('mh_eye2')),
      ph_hear1_y: isY(val('mh_ear')), ph_hear1_n: isN(val('mh_ear')),
      ph_tin_y: isY(val('mh_tinnitus')), ph_tin_n: isN(val('mh_tinnitus')),
      ph_ear2_y: isY(val('mh_ear2')), ph_ear2_n: isN(val('mh_ear2')),

      diab_ins: isDiabetes && str('diab_ins') === 'Yes' ? '☑' : '☐',
      diab_non: isDiabetes && str('diab_non') === 'Yes' ? '☑' : '☐',
      ph_diab_y: isY(val('mh_diabetes')),
      ph_diab_n: isN(val('mh_diabetes')),

      ph_thyr_y: isY(val('mh_thyroid')), ph_thyr_n: isN(val('mh_thyroid')),

      ph_ane_y: isY(val('mh_anemia')), ph_ane_n: isN(val('mh_anemia')),
      ph_thal_y: isY(val('mh_thal')), ph_thal_n: isN(val('mh_thal')),
      ph_sick_y: isY(val('mh_sickle')), ph_sick_n: isN(val('mh_sickle')),
      ph_alrg_y: isY(val('mh_allergy_med')), ph_alrg_n: isN(val('mh_allergy_med')),

      ph_meds_y: isY(val('q_meds')), ph_meds_n: isN(val('q_meds')),
      ph_hosp1_y: isY(val('q_illness')), ph_hosp1_n: isN(val('q_illness')),
      ph_hosp2_y: isY(val('q_hosp_wait')), ph_hosp2_n: isN(val('q_hosp_wait')),
      ph_oth_y: str('mh_others') ? '☑' : '☐',
      ph_oth_n: str('mh_others') ? '☐' : '☑',
      ph_smoke_y: isY(val('q_smoke')), ph_smoke_n: isN(val('q_smoke')),
      ph_alc_y: isY(val('q_alcohol')), ph_alc_n: isN(val('q_alcohol')),
      ph_drug_y: isY(val('mh_drug')), ph_drug_n: isN(val('mh_drug')),
      ph_skin_y: isY(val('mh_skin')), ph_skin_n: isN(val('mh_skin')),

      // 4. FEMALES
      f_lmp: isFemale ? str('f_lmp') : '',
      f_heavy_y: isFemale ? isY(val('f_heavy')) : '☐',
      f_heavy_n: isFemale ? isN(val('f_heavy')) : '☐',
      f_reg_y: isFemale ? isY(val('f_reg')) : '☐',
      f_reg_n: isFemale ? isN(val('f_reg')) : '☐',
      f_pain_y: isFemale ? isY(val('f_pain')) : '☐',
      f_pain_n: isFemale ? isN(val('f_pain')) : '☐',
      f_pill_y: isFemale ? isY(val('f_pill')) : '☐',
      f_pill_n: isFemale ? isN(val('f_pill')) : '☐',
      f_preg_no: isFemale ? str('f_preg_no') : '',
      f_live_birth: isFemale ? str('f_live_birth') : '',

      date: examDate,

      // 5. FORM B
      g_m: str('gender') === 'Male' ? '☑' : '☐',
      g_f: isFemale ? '☑' : '☐',
      illness_last: str('illness_last'),

      cv_pulse: str('cv_pulse'),
      cv_comm: str('cv_comm'),
      cv_bp: str('cv_bp') || bpRaw,
      cv_apex: str('cv_apex'),
      cv_sounds: str('cv_sounds'),
      cv_murmurs: str('cv_murmurs'),
      cv_varicose: str('cv_varicose'),

      rs_nasal: str('rs_nasal'),
      rs_comm: str('rs_comm'),
      rs_thyroid: str('rs_thyroid'),
      rs_trachea: str('rs_trachea'),
      rs_chest: str('rs_chest'),
      rs_perc: str('rs_perc'),
      rs_air: str('rs_air'),
      rs_breath: str('rs_breath'),
      rs_advent: str('rs_advent'),

      al_teeth: str('al_teeth'),
      al_comm: str('al_comm'),
      al_tongue: str('al_tongue'),
      al_abd: str('al_abd'),
      al_liver: str('al_liver'),
      al_spleen: str('al_spleen'),
      al_lymph: str('al_lymph'),
      al_hernia: str('al_hernia'),
      al_anus: str('al_anus'),

      gu_kidney: str('gu_kidney'),
      gu_comm: str('gu_comm'),
      gu_gen: str('gu_gen'),

      in_hair: str('in_hair'),
      in_comm: str('in_comm'),
      in_skin: str('in_skin'),
      in_nails: str('in_nails'),

      ms_hands: str('ms_hands'),
      ms_comm: str('ms_comm'),
      ms_limbs: str('ms_limbs'),
      ms_back: str('ms_back'),
      ms_joints: str('ms_joints'),
      ms_inj: str('ms_inj'),

      ns_comm: str('ns_comm'),
      r_bl_r: str('r_bl_r'),
      r_tl_r: str('r_tl_r'),
      r_sup_r: str('r_sup_r'),
      r_kn_r: str('r_kn_r'),
      r_an_r: str('r_an_r'),
      r_pl_r: str('r_pl_r'),
      r_bl_l: str('r_bl_l'),
      r_tl_l: str('r_tl_l'),
      r_sup_l: str('r_sup_l'),
      r_kn_l: str('r_kn_l'),
      r_an_l: str('r_an_l'),
      r_pl_l: str('r_pl_l'),
      ns_power: str('ns_power'),
      ns_tone: str('ns_tone'),
      ns_coord: str('ns_coord'),
      ns_sens: str('ns_sens'),
      ns_emot: str('ns_emot') || str('mh_mental'),
      ns_intel: str('ns_intel'),

      ea_meatus: str('ea_meatus'),
      ea_comm: str('ea_comm'),
      ea_drums: str('ea_drums'),
      ea_wr_r: str('ea_wr_r') || str('hear_r'),
      ea_wr_l: str('ea_wr_l') || str('hear_l'),
      ea_hr_r: str('ea_hr_r') || str('hear_r'),
      ea_hr_l: str('ea_hr_l') || str('hear_l'),

      ey_light: str('ey_light'),
      ey_comm: str('ey_comm'),
      ey_accom: str('ey_accom'),
      ey_nyst: str('ey_nyst'),
      ey_fundi: str('ey_fundi'),

      // 6. VISUAL ACUITY & LAB
      nearr_unc: str('nearr_unc'),
      nearl_unc: str('nearl_unc'),
      disr_unc: str('disr_unc'),
      disl_unc: str('disl_unc'),
      nearr_cor: str('nearr_cor'),
      nearl_cor: str('nearl_cor'),
      disr_cor: str('disr_cor'),
      disl_cor: str('disl_cor'),

      cv_n: str('color_vision') === 'Normal' ? '☑' : '☐',
      cv_df: (str('color_vision') === 'Partial' || str('color_vision') === 'Total') ? '☑' : '☐',

      height: str('height') ? `${str('height')} cm` : '',
      weight: str('weight') ? `${str('weight')} kg` : '',
      bmi: str('bmi'),
      pulse: str('pulse') ? `${str('pulse')} bpm` : '',
      bp_sys,
      bp_dia,

      chest_exp: str('chest_exp'),
      ft_fvc: str('ft_fvc'),
      ft_fev1: str('ft_fev1'),
      xray_res: str('xray') || str('xray_res'),
      oht_result: str('oht_result'),
      diag: str('diag'),
      bg_rh: bgRh,
      lab_hb: str('lab_hb'),
      ur_sugar: str('ur_sugar'),
      albumin: str('albumin'),
      hep_b: hepBValue,
      hep_c: str('hep_c'),
      hep_a: str('hep_a'),

      // 7. FITNESS
      fit_job: str('fit_lookout') === 'Fit' ? '☑' : '☐',
      unfit_job: str('fit_lookout') === 'Unfit' ? '☑' : '☐',
      temp_unfit: str('fit_lookout') === 'Temp Unfit' ? '☑' : '☐',

      eps: str('eps'),
      doc_contact: str('doc_contact') || str('contactNumber', 'contact_number') || str('email'),
      hospital: str('hospital'),
    });

    const buf = doc.getZip().generate({
      type: 'uint8array',
      compression: 'DEFLATE',
    });

    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="ADNOC_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan internal backend.' },
      { status: 500 }
    );
  }
}