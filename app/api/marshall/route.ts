import { NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { formData = {} } = await request.json();

    const fileName = '3. MARSHALL.docx';
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

    const pick = (...keys: string[]) => {
      for (const key of keys) {
        const value = formData[key];
        if (value !== undefined && value !== null) return value;
      }
      return '';
    };

    const str = (...keys: string[]) => {
      const value = pick(...keys);
      return value === undefined || value === null ? '' : String(value).trim();
    };

    const mark = (condition: boolean) => (condition ? '☑' : '☐');

    const yesNoMark = (value: any, expected: 'Yes' | 'No') =>
      String(value || '').trim() === expected ? '☑' : '☐';

    const splitIsoDate = (value: string) => {
      if (!value || !value.includes('-')) {
        return { year: '', month: '', day: '' };
      }
      const [year, month, day] = value.split('-');
      return {
        year: year || '',
        month: month || '',
        day: day || '',
      };
    };

    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];

    const dobRaw = str('dob');
    const { year, month, day } = splitIsoDate(dobRaw);
    const month_text =
      month && Number(month) >= 1 && Number(month) <= 12
        ? monthNames[Number(month) - 1]
        : '';

    const getSystemDesc = (fields: string[], remark?: string) => {
      const isAbnormal = fields.some((field) => str(field) === 'Abnormal');
      return isAbnormal ? (remark?.trim() || 'Abnormal') : 'Normal';
    };

    const head_neck = getSystemDesc(
      [
        'rs_nasal',
        'rs_thyroid',
        'rs_trachea',
        'ea_meatus',
        'ea_drums',
        'ey_light',
        'ey_accom',
        'ey_nyst',
        'ey_fundi',
        'al_teeth',
        'al_tongue',
      ],
      [str('rs_comm'), str('ea_comm'), str('ey_comm'), str('al_comm')]
        .filter(Boolean)
        .join('. ')
    );

    const heart_desc = getSystemDesc(
      ['cv_pulse', 'cv_apex', 'cv_sounds', 'cv_murmurs', 'cv_varicose'],
      str('cv_comm')
    );

    const lungs_desc = getSystemDesc(
      ['rs_chest', 'rs_perc', 'rs_air', 'rs_breath', 'rs_advent'],
      str('rs_comm')
    );

    const ext_desc = getSystemDesc(
      ['ms_hands', 'ms_limbs', 'ms_joints', 'ms_inj'],
      str('ms_comm')
    );

    const earNormal = getSystemDesc(['ea_meatus', 'ea_drums'], str('ea_comm')) === 'Normal';

    const fullName = `${str('firstName', 'first_name')} ${str('familyName', 'family_name')}`.trim();
    const position = str('ilo_position', 'position');

    const renderData = {
      // Identitas dasar
      family_name: str('familyName', 'family_name'),
      first_name: str('firstName', 'first_name'),
      month_text,
      day,
      year,
      pob_city: str('pob_city', 'place_of_birth_city'),
      pob_country: str('pob_country', 'place_of_birth_country', 'nationality'),
      g_m: mark(str('gender') === 'Male'),
      g_f: mark(str('gender') === 'Female'),
      address: str('address'),

      // Position / duty as
      pos_mas: mark(position === 'Master'),
      pos_dec: mark(position === 'Deck Officer'),
      pos_eng: mark(position === 'Engineering Officer'),
      pos_rad: mark(position === 'Radio Officer' || position === 'Radio Operator'),
      pos_rat: mark(position === 'Rating'),
      pos_ccook: mark(position === 'Chief Cook'),
      pos_cook: mark(position === 'Cook'),

      // Vitals
      h: str('height'),
      w: str('weight'),
      bp: str('bloodPressure', 'blood_pressure'),
      p: str('pulse'),
      rr: str('rr', 'respiratoryRate', 'respiratory_rate') || '-',
      gen_app: str('gen_app') === 'Abnormal' ? 'Abnormal' : 'Good',

      // Vision / hearing
      disr_unc: str('disr_unc') || '-',
      disl_unc: str('disl_unc') || '-',
      disr_cor: str('disr_cor') || '-',
      disl_cor: str('disl_cor') || '-',
      hear_r: str('hear_r') || (earNormal ? 'Normal' : 'Abnormal'),
      hear_l: str('hear_l') || (earNormal ? 'Normal' : 'Abnormal'),

      // Color test / glasses
      col_book: mark(str('color_test_type') === 'Book'),
      col_lant: mark(str('color_test_type') === 'Lantern'),
      cv_y: mark(str('color_vision') === 'Normal'),
      cv_n: mark(str('color_vision') === 'Partial' || str('color_vision') === 'Total'),
      glass_y: mark(Boolean(str('disr_cor') || str('disl_cor'))),
      glass_n: mark(!(str('disr_cor') || str('disl_cor'))),

      // Systemic physical exam
      head_neck,
      heart_desc,
      lungs_desc,
      speech_desc: 'Yes',
      ext_up: ext_desc,
      ext_low: ext_desc,

      // Questionnaire
      vac_y: yesNoMark(pick('vaccinated'), 'Yes'),
      vac_n: yesNoMark(pick('vaccinated'), 'No'),

      suffer_y: yesNoMark(pick('free_cond'), 'No'),
      suffer_n: yesNoMark(pick('free_cond'), 'Yes'),

      meds_y: yesNoMark(pick('q_meds', 'qmeds'), 'Yes'),
      meds_n: yesNoMark(pick('q_meds', 'qmeds'), 'No'),

      // Signature and certification
      date: str('date') || new Date().toLocaleDateString('en-GB'),
      exp_date: str('exp_date'),
      name: fullName,

      com_y: yesNoMark(pick('free_cond'), 'Yes'),
      com_n: yesNoMark(pick('free_cond'), 'No'),

      fit_y: mark(str('fit_lookout') === 'Fit'),
      fit_n: mark(str('fit_lookout') === 'Unfit'),

      rest_no: mark(str('restrictions') === 'No'),
      rest_yes: mark(str('restrictions') === 'Yes'),
      rest_desc:
        str('restrictions') === 'Yes'
          ? str('rest_desc') || 'No Specific Restrictions'
          : 'Tidak ada',

      eps: str('eps'),
      hospital: str('hospital'),
      cert_auth: str('cert_auth') || 'Medical Council',
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
        'Content-Disposition': 'attachment; filename="Marshall_Report.docx"',
      },
    });
  } catch (error: any) {
    console.error('Error generating Marshall document:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan internal backend.' },
      { status: 500 }
    );
  }
}