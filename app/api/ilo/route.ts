import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '1. ILO.docx';
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
      return v === undefined || v === null ? '' : String(v);
    };

    const yn = (input: any): 'Yes' | 'No' | '' => {
      if (input === true || input === 'true' || input === 'Yes') return 'Yes';
      if (input === false || input === 'false' || input === 'No') return 'No';
      return '';
    };

    const fitStatus = (input: any): 'Fit' | 'Unfit' | '' => {
      if (input === 'Fit') return 'Fit';
      if (input === 'Unfit') return 'Unfit';
      return '';
    };

    const isY = (input: any) => (yn(input) === 'Yes' ? '☑' : '☐');
    const isN = (input: any) => (yn(input) === 'No' ? '☑' : '☐');
    const isFit = (input: any) => (fitStatus(input) === 'Fit' ? '☑' : '☐');
    const isUnfit = (input: any) => (fitStatus(input) === 'Unfit' ? '☑' : '☐');

    const ex = (input: any): 'Normal' | 'Abnormal' | null => {
      if (input === 'Normal') return 'Normal';
      if (input === 'Abnormal') return 'Abnormal';
      return null;
    };

    const isExN = (input: any) => (ex(input) === 'Normal' ? '☑' : '☐');
    const isExA = (input: any) => (ex(input) === 'Abnormal' ? '☑' : '☐');

    const splitDate = (value: string) => {
      if (!value || !value.includes('-')) {
        return { year: '', month: '', day: '', ddmmyyyy: '' };
      }
      const [year, month, day] = value.split('-');
      return {
        year: year || '',
        month: month || '',
        day: day || '',
        ddmmyyyy: `${day || ''}/${month || ''}/${year || ''}`, // Format ddmmyyyy
      };
    };

    const formatDob = (dateValue: string) => {
      const { year, month, day } = splitDate(dateValue);
      if (!year || !month || !day) return '';
      return `${year}/${month}/${day}`;
    };

    const splitBloodPressure = (bpValue: string) => {
      const cleaned = (bpValue || '').trim();
      if (!cleaned) return { sys: '', dia: '' };
      const parts = cleaned.split('/');
      return {
        sys: parts[0]?.trim() || '',
        dia: parts[1]?.trim() || '',
      };
    };

    const evaluateExam = (fields: string[]) => {
      const values = fields
        .map((field) => formData[field])
        .filter((v) => v !== undefined && v !== null && v !== '');

      if (values.length === 0) return null;
      if (values.some((v) => v === 'Abnormal')) return 'Abnormal';
      if (values.some((v) => v === 'Normal')) return 'Normal';
      return null;
    };

    const dob = str('dob');
    const { year: dobY, month: dobM, day: dobD } = splitDate(dob);
    const ddmmyy = formatDob(dob);

    const { sys: bp_sys, dia: bp_dia } = splitBloodPressure(
      str('bloodPressure', 'blood_pressure')
    );

    const gender = str('gender');
    const isFemale = gender === 'Female';

    const reasonExam = str('reason_exam', 'reasonExam');
    const colorVision = str('color_vision', 'colorVision');
    const xray = str('xray');
    const restrictions = str('restrictions');
    const colorTestType = str('color_test_type', 'colortesttype');

    // Variabel evaluasi lama dibiarkan untuk menjaga stabilitas file jika ada yg bergantung padanya
    const headStatus = evaluateExam(['rs_nasal','al_teeth','al_tongue','ea_meatus','ea_drums','ey_light','ey_accom','ey_nyst','ey_fundi']);
    const entStatus = evaluateExam(['rs_nasal','rs_thyroid','rs_trachea','ea_meatus','ea_drums']);
    const oralStatus = evaluateExam(['al_teeth', 'al_tongue']);
    const earStatus = evaluateExam(['ea_meatus', 'ea_drums']);
    const tympStatus = evaluateExam(['ea_drums']);
    const eyeStatus = evaluateExam(['ey_light', 'ey_accom', 'ey_nyst', 'ey_fundi']);
    const ophStatus = evaluateExam(['ey_fundi']);
    const pupilStatus = evaluateExam(['ey_light', 'ey_accom']);
    const eyemStatus = evaluateExam(['ey_nyst']);
    const lungStatus = evaluateExam(['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent']);
    const breastStatus = null;
    const heartStatus = evaluateExam(['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs']);
    const varStatus = evaluateExam(['cv_varicose']);
    const vascStatus = evaluateExam(['cv_varicose', 'cv_bp']);
    const abdStatus = evaluateExam(['al_abd', 'al_liver', 'al_spleen', 'al_lymph']);
    const hernStatus = evaluateExam(['al_hernia']);
    const anusStatus = evaluateExam(['al_anus']);
    const guStatus = evaluateExam(['gu_kidney', 'gu_gen']);
    const extStatus = evaluateExam(['ms_hands', 'ms_limbs', 'ms_inj']);
    const spineStatus = evaluateExam(['ms_back', 'ms_joints']);
    const neuroStatus = evaluateExam(['ns_power', 'ns_tone', 'ns_coord', 'ns_sens', 'ns_intel']);
    const skinStatus = evaluateExam(['in_hair', 'in_skin', 'in_nails']);

    const genAppRaw = str('gen_app', 'genApp');
    const genStatus =
      genAppRaw === 'Abnormal'
        ? 'Abnormal'
        : genAppRaw
        ? 'Normal'
        : null;

    const renderData = {
      // =========================
      // IDENTITAS - placeholder template ILO
      // =========================
      familyname: str('familyName', 'family_name', 'familyname'),
      firstname: str('firstName', 'first_name', 'firstname'),
      family_name: str('familyName', 'family_name', 'familyname'),
      first_name: str('firstName', 'first_name', 'firstname'),

      day: dobD,
      month: dobM,
      year: dobY,
      pobcity: str('pob_city', 'pobCity'),
      pobcountry: str('pob_country', 'pobCountry'),
      pob_city: str('pob_city', 'pobCity'),
      pob_country: str('pob_country', 'pobCountry'),

      gm: gender === 'Male' ? '☑' : '☐',
      gf: gender === 'Female' ? '☑' : '☐',
      g_m: gender === 'Male' ? '☑' : '☐',
      g_f: gender === 'Female' ? '☑' : '☐',

      address: str('address'),
      idpassport: str('idPassport', 'id_passport', 'idpassport'),
      id_passport: str('idPassport', 'id_passport', 'idpassport'),
      typeofship: str('typeOfShip', 'type_of_ship', 'typeofship'),
      tradearea: str('tradeArea', 'trade_area', 'tradearea'),
      type_of_ship: str('typeOfShip', 'type_of_ship', 'typeofship'),
      trade_area: str('tradeArea', 'trade_area', 'tradearea'),

      posmas: str('ilo_position') === 'Master' ? '☑' : '☐',
      posdec: str('ilo_position') === 'Deck Officer' ? '☑' : '☐',
      poseng: str('ilo_position') === 'Engineering Officer' ? '☑' : '☐',
      posrad: ['Radio Officer', 'Radio Operator'].includes(str('ilo_position')) ? '☑' : '☐',
      posrat: str('ilo_position') === 'Rating' ? '☑' : '☐',
      pos_mas: str('ilo_position') === 'Master' ? '☑' : '☐',
      pos_dec: str('ilo_position') === 'Deck Officer' ? '☑' : '☐',
      pos_eng: str('ilo_position') === 'Engineering Officer' ? '☑' : '☐',
      pos_rad: ['Radio Officer', 'Radio Operator'].includes(str('ilo_position')) ? '☑' : '☐',
      pos_rat: str('ilo_position') === 'Rating' ? '☑' : '☐',

      // =========================
      // DECLARATION OF AUTHORIZED PHYSICIAN
      // =========================
      disrunc: str('disr_unc'),
      dislunc: str('disl_unc'),
      discr: str('disr_cor'),
      dislcr: str('disl_cor'),
      disr_unc: str('disr_unc'),
      disl_unc: str('disl_unc'),
      disr_cor: str('disr_cor'),
      disl_cor: str('disl_cor'),

      colbook: colorTestType === 'Book' || colorTestType === 'Ishihara' ? '☑' : '☐',
      collant: colorTestType === 'Lantern' ? '☑' : '☐',
      col_book: colorTestType === 'Book' || colorTestType === 'Ishihara' ? '☑' : '☐',
      col_lant: colorTestType === 'Lantern' ? '☑' : '☐',

      coly: isY(val('color_y')),
      colr: isY(val('color_r')),
      colg: isY(val('color_g')),
      colb: isY(val('color_b')),
      col_y: isY(val('color_y')),
      col_r: isY(val('color_r')),
      col_g: isY(val('color_g')),
      col_b: isY(val('color_b')),

      hearr: str('hear_r'),
      hearl: str('hear_l'),
      hear_r: str('hear_r'),
      hear_l: str('hear_l'),

      idy: isY(val('id_checked')),
      idn: isN(val('id_checked')),
      id_y: isY(val('id_checked')),
      id_n: isN(val('id_checked')),

      hrstcwy: isY(val('hr_stcw')),
      hrstcwn: isN(val('hr_stcw')),
      hrstcwna: str('hr_stcw') === 'NA' ? '☑' : '☐',
      hr_stcw_y: isY(val('hr_stcw')),
      hr_stcw_n: isN(val('hr_stcw')),
      hr_stcw_na: str('hr_stcw') === 'NA' ? '☑' : '☐',

      hrunaidy: isY(val('hr_unaid')),
      hrunaidn: isN(val('hr_unaid')),
      hr_unaid_y: isY(val('hr_unaid')),
      hr_unaid_n: isN(val('hr_unaid')),

      visstcwy: isY(val('vis_stcw')),
      visstcwn: isN(val('vis_stcw')),
      vis_stcw_y: isY(val('vis_stcw')),
      vis_stcw_n: isN(val('vis_stcw')),

      colstcwy: isY(val('col_stcw')),
      colstcwn: isN(val('col_stcw')),
      col_stcw_y: isY(val('col_stcw')),
      col_stcw_n: isN(val('col_stcw')),

      datevt: str('date_vt', 'date'),
      date_vt: str('date_vt', 'date'),

      glassy: isY(val('glasses_nec')),
      glassn: isN(val('glasses_nec')),
      glass_y: isY(val('glasses_nec')),
      glass_n: isN(val('glasses_nec')),

      watchy: isY(val('watch_able')),
      watchn: isN(val('watch_able')),
      watch_y: isY(val('watch_able')),
      watch_n: isN(val('watch_able')),

      medsy: isY(val('q_meds', 'qmeds')),
      medsn: isN(val('q_meds', 'qmeds')),
      meds_y: isY(val('q_meds', 'qmeds')),
      meds_n: isN(val('q_meds', 'qmeds')),

      freey: isY(val('free_cond')),
      freen: isN(val('free_cond')),
      free_y: isY(val('free_cond')),
      free_n: isN(val('free_cond')),

      restdesc: restrictions === 'Yes' ? str('rest_desc', 'restdesc') : '',
      rest_desc: restrictions === 'Yes' ? str('rest_desc', 'restdesc') : '',

      eps: str('eps'),
      hospital: str('hospital'),
      certauth: str('cert_auth', 'certauth'),
      cert_auth: str('cert_auth', 'certauth'),
      date: str('date'),
      expdate: str('exp_date', 'expdate'),
      exp_date: str('exp_date', 'expdate'),

      // =========================
      // EXAMINEE PERSONAL DECLARATION
      // =========================
      ddmmyy,
      ddmmyyyy: str('date'),

      iq1y: isY(val('mh_eye')),
      iq1n: isN(val('mh_eye')),
      iq2y: isY(val('mh_hbp')),
      iq2n: isN(val('mh_hbp')),
      iq3y: isY(val('mh_heart')),
      iq3n: isN(val('mh_heart')),
      iq4y: isY(val('mhcardiacsurgery')),
      iq4n: isN(val('mhcardiacsurgery')),
      iq5y: isY(val('mh_varicose')),
      iq5n: isN(val('mh_varicose')),
      iq6y: isY(val('mh_asthma')),
      iq6n: isN(val('mh_asthma')),
      iq7y: isY(val('mh_blood')),
      iq7n: isN(val('mh_blood')),
      iq8y: isY(val('mh_diabetes')),
      iq8n: isN(val('mh_diabetes')),
      iq9y: isY(val('mh_thyroid')),
      iq9n: isN(val('mh_thyroid')),
      iq10y: isY(val('mh_digestive')),
      iq10n: isN(val('mh_digestive')),
      iq11y: isY(val('mh_kidney')),
      iq11n: isN(val('mh_kidney')),
      iq12y: isY(val('mh_skin')),
      iq12n: isN(val('mh_skin')),
      iq13y: isY(val('mh_allergy_med')),
      iq13n: isN(val('mh_allergy_med')),
      iq14y: isY(val('mh_infectious')),
      iq14n: isN(val('mh_infectious')),
      iq15y: isY(val('mh_hernia')),
      iq15n: isN(val('mh_hernia')),
      iq16y: isY(val('mh_genital')),
      iq16n: isN(val('mh_genital')),
      iq17y: isY(val('mhpregnancy')),
      iq17n: isN(val('mhpregnancy')),
      iq18y: isY(val('mhsleep')),
      iq18n: isN(val('mhsleep')),
      iq19y: isY(val('q_smoke', 'qsmoke')),
      iq19n: isN(val('q_smoke', 'qsmoke')),
      iq20y: isY(val('mhsurgery')),
      iq20n: isN(val('mhsurgery')),
      iq21y: isY(val('mh_epilepsy')),
      iq21n: isN(val('mh_epilepsy')),
      iq22y: isY(val('mhfainting')),
      iq22n: isN(val('mhfainting')),
      iq23y: isY(val('mh_loss_consc')),
      iq23n: isN(val('mh_loss_consc')),
      iq24y: isY(val('mh_psychiatric')),
      iq24n: isN(val('mh_psychiatric')),
      iq25y: isY(val('mh_depression')),
      iq25n: isN(val('mh_depression')),
      iq26y: isY(val('mh_suicide')),
      iq26n: isN(val('mh_suicide')),
      iq27y: isY(val('mh_memory')),
      iq27n: isN(val('mh_memory')),
      iq28y: isY(val('mh_balance')),
      iq28n: isN(val('mh_balance')),
      iq29y: isY(val('mh_headache')),
      iq29n: isN(val('mh_headache')),
      iq30y: isY(val('mh_ear')),
      iq30n: isN(val('mh_ear')),
      iq31y: isY(val('mh_mobility')),
      iq31n: isN(val('mh_mobility')),
      iq32y: isY(val('mh_back')),
      iq32n: isN(val('mh_back')),
      iq33y: isY(val('mh_amputation')),
      iq33n: isN(val('mh_amputation')),
      iq34y: isY(val('mh_accident')),
      iq34n: isN(val('mh_accident')),
      iq35y: isY(val('q_medevac', 'qmedevac')),
      iq35n: isN(val('q_medevac', 'qmedevac')),
      iq36y: isY(val('q_illness', 'qillness')),
      iq36n: isN(val('q_illness', 'qillness')),
      iq37y: isY(val('q_omfc', 'qomfc')),
      iq37n: isN(val('q_omfc', 'qomfc')),
      iq38y: isY(val('q_cert_revoked', 'qcertrevoked')),
      iq38n: isN(val('q_cert_revoked', 'qcertrevoked')),
      iq39y: isY(val('q_aware_medical', 'qawaremedical')),
      iq39n: isN(val('q_aware_medical', 'qawaremedical')),
      iq40y: isY(val('q_fit', 'qfit')),
      iq40n: isN(val('q_fit', 'qfit')),
      iq41y: isY(val('mh_drug', 'mh_allergy_med')),
      iq41n: isN(val('mh_drug', 'mh_allergy_med')),
      iq42y: isY(val('q_meds', 'qmeds')),
      iq42n: isN(val('q_meds', 'qmeds')),

      i_q1_y: isY(val('mh_eye')),
      i_q1_n: isN(val('mh_eye')),
      i_q2_y: isY(val('mh_hbp')),
      i_q2_n: isN(val('mh_hbp')),
      i_q3_y: isY(val('mh_heart')),
      i_q3_n: isN(val('mh_heart')),
      i_q4_y: isY(val('mhcardiacsurgery')),
      i_q4_n: isN(val('mhcardiacsurgery')),
      i_q5_y: isY(val('mh_varicose')),
      i_q5_n: isN(val('mh_varicose')),
      i_q6_y: isY(val('mh_asthma')),
      i_q6_n: isN(val('mh_asthma')),
      i_q7_y: isY(val('mh_blood')),
      i_q7_n: isN(val('mh_blood')),
      i_q8_y: isY(val('mh_diabetes')),
      i_q8_n: isN(val('mh_diabetes')),
      i_q9_y: isY(val('mh_thyroid')),
      i_q9_n: isN(val('mh_thyroid')),
      i_q10_y: isY(val('mh_digestive')),
      i_q10_n: isN(val('mh_digestive')),
      i_q11_y: isY(val('mh_kidney')),
      i_q11_n: isN(val('mh_kidney')),
      i_q12_y: isY(val('mh_skin')),
      i_q12_n: isN(val('mh_skin')),
      i_q13_y: isY(val('mh_allergy_med')),
      i_q13_n: isN(val('mh_allergy_med')),
      i_q14_y: isY(val('mh_infectious')),
      i_q14_n: isN(val('mh_infectious')),
      i_q15_y: isY(val('mh_hernia')),
      i_q15_n: isN(val('mh_hernia')),
      i_q16_y: isY(val('mh_genital')),
      i_q16_n: isN(val('mh_genital')),
      i_q17_y: isY(val('mhpregnancy')),
      i_q17_n: isN(val('mhpregnancy')),
      i_q18_y: isY(val('mhsleep')),
      i_q18_n: isN(val('mhsleep')),
      i_q19_y: isY(val('q_smoke', 'qsmoke')),
      i_q19_n: isN(val('q_smoke', 'qsmoke')),
      i_q20_y: isY(val('mhsurgery')),
      i_q20_n: isN(val('mhsurgery')),
      i_q21_y: isY(val('mh_epilepsy')),
      i_q21_n: isN(val('mh_epilepsy')),
      i_q22_y: isY(val('mhfainting')),
      i_q22_n: isN(val('mhfainting')),
      i_q23_y: isY(val('mh_loss_consc')),
      i_q23_n: isN(val('mh_loss_consc')),
      i_q24_y: isY(val('mh_psychiatric')),
      i_q24_n: isN(val('mh_psychiatric')),
      i_q25_y: isY(val('mh_depression')),
      i_q25_n: isN(val('mh_depression')),
      i_q26_y: isY(val('mh_suicide')),
      i_q26_n: isN(val('mh_suicide')),
      i_q27_y: isY(val('mh_memory')),
      i_q27_n: isN(val('mh_memory')),
      i_q28_y: isY(val('mh_balance')),
      i_q28_n: isN(val('mh_balance')),
      i_q29_y: isY(val('mh_headache')),
      i_q29_n: isN(val('mh_headache')),
      i_q30_y: isY(val('mh_ear')),
      i_q30_n: isN(val('mh_ear')),
      i_q31_y: isY(val('mh_mobility')),
      i_q31_n: isN(val('mh_mobility')),
      i_q32_y: isY(val('mh_back')),
      i_q32_n: isN(val('mh_back')),
      i_q33_y: isY(val('mh_amputation')),
      i_q33_n: isN(val('mh_amputation')),
      i_q34_y: isY(val('mh_accident')),
      i_q34_n: isN(val('mh_accident')),
      i_q35_y: isY(val('q_medevac', 'qmedevac')),
      i_q35_n: isN(val('q_medevac', 'qmedevac')),
      i_q36_y: isY(val('q_illness', 'qillness')),
      i_q36_n: isN(val('q_illness', 'qillness')),
      i_q37_y: isY(val('q_omfc', 'qomfc')),
      i_q37_n: isN(val('q_omfc', 'qomfc')),
      i_q38_y: isY(val('q_cert_revoked', 'qcertrevoked')),
      i_q38_n: isN(val('q_cert_revoked', 'qcertrevoked')),
      i_q39_y: isY(val('q_aware_medical', 'qawaremedical')),
      i_q39_n: isN(val('q_aware_medical', 'qawaremedical')),
      i_q40_y: isY(val('q_fit', 'qfit')),
      i_q40_n: isN(val('q_fit', 'qfit')),
      i_q41_y: isY(val('mh_drug', 'mh_allergy_med')),
      i_q41_n: isN(val('mh_drug', 'mh_allergy_med')),
      i_q42_y: isY(val('q_meds', 'qmeds')),
      i_q42_n: isN(val('q_meds', 'qmeds')),

      epdcomments: str('comments', 'epd_comments'),
      epd_comments: str('comments', 'epd_comments'),
      medstext: str('q_meds_text', 'qmedstext'),
      meds_text: str('q_meds_text', 'qmedstext'),

      // =========================
      // MEDICAL EXAMINATION
      // =========================
      mepsea: reasonExam === 'Pre-Employment' ? '☑' : '☐',
      meperiodic: reasonExam === 'Periodic' ? '☑' : '☐',
      meother: reasonExam === 'Other' ? '☑' : '☐',
      me_psea: reasonExam === 'Pre-Employment' ? '☑' : '☐',
      me_periodic: reasonExam === 'Periodic' ? '☑' : '☐',
      me_other: reasonExam === 'Other' ? '☑' : '☐',

      bvunc: str('bv_unc'),
      bvcor: str('bv_cor'),
      nearrunc: str('nearr_unc'),
      nearlunc: str('nearl_unc'),
      nearbvunc: str('near_bv_unc'),
      nearrcor: str('nearr_cor'),
      nearlcor: str('nearl_cor'),
      nearbvcor: str('near_bv_cor'),
      bv_unc: str('bv_unc'),
      bv_cor: str('bv_cor'),
      nearr_unc: str('nearr_unc'),
      nearl_unc: str('nearl_unc'),
      near_bv_unc: str('near_bv_unc'),
      nearr_cor: str('nearr_cor'),
      nearl_cor: str('nearl_cor'),
      near_bv_cor: str('near_bv_cor'),

      vfrn: formData.vf_r === 'Normal' ? '☑' : '☐',
      vfrd: formData.vf_r === 'Defective' ? '☑' : '☐',
      vfln: formData.vf_l === 'Normal' ? '☑' : '☐',
      vfld: formData.vf_l === 'Defective' ? '☑' : '☐',
      vf_r_n: formData.vf_r === 'Normal' ? '☑' : '☐',
      vf_r_d: formData.vf_r === 'Defective' ? '☑' : '☐',
      vf_l_n: formData.vf_l === 'Normal' ? '☑' : '☐',
      vf_l_d: formData.vf_l === 'Defective' ? '☑' : '☐',

      cvn: colorVision === 'Normal' ? '☑' : '☐',
      cvdb: '☐',
      cvdf: ['Partial', 'Total'].includes(colorVision) ? '☑' : '☐',
      cv_n: colorVision === 'Normal' ? '☑' : '☐',
      cv_db: '☐',
      cv_df: ['Partial', 'Total'].includes(colorVision) ? '☑' : '☐',

      r05: str('r05'),
      r1: str('r1'),
      r2: str('r2'),
      r3: str('r3'),
      r4: str('r4'),
      r6: str('r6'),
      r8: str('r8'),
      l05: str('l05'),
      l1: str('l1'),
      l2: str('l2'),
      l3: str('l3'),
      l4: str('l4'),
      l6: str('l6'),
      l8: str('l8'),

      swrn: str('hear_r') === 'Normal' ? '☑' : '☐',
      swrw: str('hear_r') === 'Abnormal' ? '☑' : '☐',
      swln: str('hear_l') === 'Normal' ? '☑' : '☐',
      swlw: str('hear_l') === 'Abnormal' ? '☑' : '☐',
      sw_r_n: str('hear_r') === 'Normal' ? '☑' : '☐',
      sw_r_w: str('hear_r') === 'Abnormal' ? '☑' : '☐',
      sw_l_n: str('hear_l') === 'Normal' ? '☑' : '☐',
      sw_l_w: str('hear_l') === 'Abnormal' ? '☑' : '☐',

      h: str('height'),
      w: str('weight'),
      p: str('pulse'),
      rhyt: str('rhyt'),
      bp_sys: bp_sys,
      bp_dia: bp_dia,
      bpsys: bp_sys,
      bpdia: bp_dia,

      ursugar: str('ur_sugar'),
      albumin: str('albumin'),
      ur_sugar: str('ur_sugar'),

      // --- PEMERIKSAAN FISIK KHUSUS ILO DIRECT MAPPING ---
      head_n: formData.ilo_head === 'Normal' ? '☑' : '☐',
      head_a: formData.ilo_head === 'Abnormal' ? '☑' : '☐',
      headn: formData.ilo_head === 'Normal' ? '☑' : '☐',
      heada: formData.ilo_head === 'Abnormal' ? '☑' : '☐',

      ent_n: formData.ilo_ent === 'Normal' ? '☑' : '☐',
      ent_a: formData.ilo_ent === 'Abnormal' ? '☑' : '☐',
      entn: formData.ilo_ent === 'Normal' ? '☑' : '☐',
      enta: formData.ilo_ent === 'Abnormal' ? '☑' : '☐',

      oral_n: formData.ilo_oral === 'Normal' ? '☑' : '☐',
      oral_a: formData.ilo_oral === 'Abnormal' ? '☑' : '☐',
      oraln: formData.ilo_oral === 'Normal' ? '☑' : '☐',
      orala: formData.ilo_oral === 'Abnormal' ? '☑' : '☐',

      ear_n: formData.ilo_ear === 'Normal' ? '☑' : '☐',
      ear_a: formData.ilo_ear === 'Abnormal' ? '☑' : '☐',
      earn: formData.ilo_ear === 'Normal' ? '☑' : '☐',
      eara: formData.ilo_ear === 'Abnormal' ? '☑' : '☐',

      tymp_n: formData.ilo_tymp === 'Normal' ? '☑' : '☐',
      tymp_a: formData.ilo_tymp === 'Abnormal' ? '☑' : '☐',
      tympn: formData.ilo_tymp === 'Normal' ? '☑' : '☐',
      tympa: formData.ilo_tymp === 'Abnormal' ? '☑' : '☐',

      eye_n: formData.ilo_eye === 'Normal' ? '☑' : '☐',
      eye_a: formData.ilo_eye === 'Abnormal' ? '☑' : '☐',
      eyen: formData.ilo_eye === 'Normal' ? '☑' : '☐',
      eyea: formData.ilo_eye === 'Abnormal' ? '☑' : '☐',

      oph_n: formData.ilo_oph === 'Normal' ? '☑' : '☐',
      oph_a: formData.ilo_oph === 'Abnormal' ? '☑' : '☐',
      ophn: formData.ilo_oph === 'Normal' ? '☑' : '☐',
      opha: formData.ilo_oph === 'Abnormal' ? '☑' : '☐',

      pupil_n: formData.ilo_pupil === 'Normal' ? '☑' : '☐',
      pupil_a: formData.ilo_pupil === 'Abnormal' ? '☑' : '☐',
      pupiln: formData.ilo_pupil === 'Normal' ? '☑' : '☐',
      pupila: formData.ilo_pupil === 'Abnormal' ? '☑' : '☐',

      eyem_n: formData.ilo_eyem === 'Normal' ? '☑' : '☐',
      eyem_a: formData.ilo_eyem === 'Abnormal' ? '☑' : '☐',
      eyemn: formData.ilo_eyem === 'Normal' ? '☑' : '☐',
      eyema: formData.ilo_eyem === 'Abnormal' ? '☑' : '☐',

      lung_n: formData.ilo_lung === 'Normal' ? '☑' : '☐',
      lung_a: formData.ilo_lung === 'Abnormal' ? '☑' : '☐',
      lungn: formData.ilo_lung === 'Normal' ? '☑' : '☐',
      lunga: formData.ilo_lung === 'Abnormal' ? '☑' : '☐',

      breast_n: formData.ilo_breast === 'Normal' ? '☑' : '☐',
      breast_a: formData.ilo_breast === 'Abnormal' ? '☑' : '☐',
      breastn: formData.ilo_breast === 'Normal' ? '☑' : '☐',
      breasta: formData.ilo_breast === 'Abnormal' ? '☑' : '☐',

      heart_n: formData.ilo_heart === 'Normal' ? '☑' : '☐',
      heart_a: formData.ilo_heart === 'Abnormal' ? '☑' : '☐',
      heartn: formData.ilo_heart === 'Normal' ? '☑' : '☐',
      hearta: formData.ilo_heart === 'Abnormal' ? '☑' : '☐',

      var_n: formData.ilo_var === 'Normal' ? '☑' : '☐',
      var_a: formData.ilo_var === 'Abnormal' ? '☑' : '☐',
      varn: formData.ilo_var === 'Normal' ? '☑' : '☐',
      vara: formData.ilo_var === 'Abnormal' ? '☑' : '☐',

      vasc_n: formData.ilo_vasc === 'Normal' ? '☑' : '☐',
      vasc_a: formData.ilo_vasc === 'Abnormal' ? '☑' : '☐',
      vascn: formData.ilo_vasc === 'Normal' ? '☑' : '☐',
      vasca: formData.ilo_vasc === 'Abnormal' ? '☑' : '☐',

      abd_n: formData.ilo_abd === 'Normal' ? '☑' : '☐',
      abd_a: formData.ilo_abd === 'Abnormal' ? '☑' : '☐',
      abdn: formData.ilo_abd === 'Normal' ? '☑' : '☐',
      abda: formData.ilo_abd === 'Abnormal' ? '☑' : '☐',

      hern_n: formData.ilo_hern === 'Normal' ? '☑' : '☐',
      hern_a: formData.ilo_hern === 'Abnormal' ? '☑' : '☐',
      hernn: formData.ilo_hern === 'Normal' ? '☑' : '☐',
      herna: formData.ilo_hern === 'Abnormal' ? '☑' : '☐',

      anus_n: formData.ilo_anus === 'Normal' ? '☑' : '☐',
      anus_a: formData.ilo_anus === 'Abnormal' ? '☑' : '☐',
      anusn: formData.ilo_anus === 'Normal' ? '☑' : '☐',
      anusa: formData.ilo_anus === 'Abnormal' ? '☑' : '☐',

      gu_n: formData.ilo_gu === 'Normal' ? '☑' : '☐',
      gu_a: formData.ilo_gu === 'Abnormal' ? '☑' : '☐',
      gun: formData.ilo_gu === 'Normal' ? '☑' : '☐',
      gua: formData.ilo_gu === 'Abnormal' ? '☑' : '☐',

      ext_n: formData.ilo_ext === 'Normal' ? '☑' : '☐',
      ext_a: formData.ilo_ext === 'Abnormal' ? '☑' : '☐',
      extn: formData.ilo_ext === 'Normal' ? '☑' : '☐',
      exta: formData.ilo_ext === 'Abnormal' ? '☑' : '☐',

      spine_n: formData.ilo_spine === 'Normal' ? '☑' : '☐',
      spine_a: formData.ilo_spine === 'Abnormal' ? '☑' : '☐',
      spinen: formData.ilo_spine === 'Normal' ? '☑' : '☐',
      spinea: formData.ilo_spine === 'Abnormal' ? '☑' : '☐',

      neuro_n: formData.ilo_neuro === 'Normal' ? '☑' : '☐',
      neuro_a: formData.ilo_neuro === 'Abnormal' ? '☑' : '☐',
      neuron: formData.ilo_neuro === 'Normal' ? '☑' : '☐',
      neuroa: formData.ilo_neuro === 'Abnormal' ? '☑' : '☐',

      psych_n: formData.ilo_psych === 'Normal' ? '☑' : '☐',
      psych_a: formData.ilo_psych === 'Abnormal' ? '☑' : '☐',
      psychn: formData.ilo_psych === 'Normal' ? '☑' : '☐',
      psycha: formData.ilo_psych === 'Abnormal' ? '☑' : '☐',

      gen_n: formData.ilo_gen === 'Normal' ? '☑' : '☐',
      gen_a: formData.ilo_gen === 'Abnormal' ? '☑' : '☐',
      genn: formData.ilo_gen === 'Normal' ? '☑' : '☐',
      gena: formData.ilo_gen === 'Abnormal' ? '☑' : '☐',

      skin_n: formData.ilo_skin === 'Normal' ? '☑' : '☐',
      skin_a: formData.ilo_skin === 'Abnormal' ? '☑' : '☐',
      skinn: formData.ilo_skin === 'Normal' ? '☑' : '☐',
      skina: formData.ilo_skin === 'Abnormal' ? '☑' : '☐',

      xraynp: !xray ? '☑' : '☐',
      xrayn: xray === 'Normal' ? '☑' : '☐',
      xraya: xray === 'Abnormal' ? '☑' : '☐',
      xray_np: !xray ? '☑' : '☐',
      xray_n: xray === 'Normal' ? '☑' : '☐',
      xray_a: xray === 'Abnormal' ? '☑' : '☐',
      datexray: str('date_xray', 'date'),
      date_xray: str('date_xray', 'date'),
      xrayres: str('des_abnor'),
      xray_res: str('des_abnor'),

      labhb: str('lab_hb'),
      labsr: str('lab_sr'),
      lab_hb: str('lab_hb'),
      lab_sr: str('lab_sr'),

      hbabp: str('hep_b_ab') === 'Positive' ? '☑' : '☐',
      hbabn: str('hep_b_ab') === 'Negative' ? '☑' : '☐',
      hbagp: str('hep_b_ag') === 'Positive' ? '☑' : '☐',
      hbagn: str('hep_b_ag') === 'Negative' ? '☑' : '☐',
      hbab_p: str('hep_b_ab') === 'Positive' ? '☑' : '☐',
      hbab_n: str('hep_b_ab') === 'Negative' ? '☑' : '☐',
      hbag_p: str('hep_b_ag') === 'Positive' ? '☑' : '☐',
      hbag_n: str('hep_b_ag') === 'Negative' ? '☑' : '☐',

      bsnp: str('stool_bact') === 'Not Performed' || !str('stool_bact') ? '☑' : '☐',
      bsneg: str('stool_bact') === 'Negative' ? '☑' : '☐',
      bspos: str('stool_bact') === 'Positive' ? '☑' : '☐',
      bs_np: str('stool_bact') === 'Not Performed' || !str('stool_bact') ? '☑' : '☐',
      bs_neg: str('stool_bact') === 'Negative' ? '☑' : '☐',
      bs_pos: str('stool_bact') === 'Positive' ? '☑' : '☐',

      psnp: str('stool_para') === 'Not Performed' || !str('stool_para') ? '☑' : '☐',
      psneg: str('stool_para') === 'Negative' ? '☑' : '☐',
      pspos: str('stool_para') === 'Positive' ? '☑' : '☐',
      ps_np: str('stool_para') === 'Not Performed' || !str('stool_para') ? '☑' : '☐',
      ps_neg: str('stool_para') === 'Negative' ? '☑' : '☐',
      ps_pos: str('stool_para') === 'Positive' ? '☑' : '☐',

      diag: str('diag'),
      hivres: str('hiv_res'),
      hiv_res: str('hiv_res'),
      comments: str('comments'),

      vacsat: str('vaccinated') === 'Yes' ? '☑' : '☐',
      vacren: str('vaccinated') === 'No' ? '☑' : '☐',
      vacdetails: str('vac_details'),
      vac_sat: str('vaccinated') === 'Yes' ? '☑' : '☐',
      vac_ren: str('vaccinated') === 'No' ? '☑' : '☐',
      vac_details: str('vac_details'),

      // =========================
      // ASSESSMENT OF FITNESS
      // =========================
      lof: isFit(val('fit_lookout')),
      lou: isUnfit(val('fit_lookout')),
      lo_f: isFit(val('fit_lookout')),
      lo_u: isUnfit(val('fit_lookout')),

      dkf: isFit(val('fit_deck')),
      dku: isUnfit(val('fit_deck')),
      dk_f: isFit(val('fit_deck')),
      dk_u: isUnfit(val('fit_deck')),

      enf: isFit(val('fit_engine')),
      enu: isUnfit(val('fit_engine')),
      en_f: isFit(val('fit_engine')),
      en_u: isUnfit(val('fit_engine')),

      ctf: isFit(val('fit_catering')),
      ctu: isUnfit(val('fit_catering')),
      ct_f: isFit(val('fit_catering')),
      ct_u: isUnfit(val('fit_catering')),

      otf: isFit(val('fit_other')),
      otu: isUnfit(val('fit_other')),
      ot_f: isFit(val('fit_other')),
      ot_u: isUnfit(val('fit_other')),

      restno: restrictions === 'No' ? '☑' : '☐',
      restyes: restrictions === 'Yes' ? '☑' : '☐',
      rest_no: restrictions === 'No' ? '☑' : '☐',
      rest_yes: restrictions === 'Yes' ? '☑' : '☐',

      actiontaken: str('action_taken'),
      action_taken: str('action_taken'),
    };

    doc.render(renderData);

    const buf = doc.getZip().generate({
      type: 'uint8array',
      compression: 'DEFLATE',
    });

    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="ILO_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating ILO document:', error);

    return NextResponse.json(
      {
        error: error?.message || 'Terjadi kesalahan internal backend saat generate ILO.',
      },
      { status: 500 }
    );
  }
}