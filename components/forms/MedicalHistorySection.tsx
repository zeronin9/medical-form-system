import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
  checkboxGroupClass,
  checkboxClass,
  radioGroupClass,
  radioClass,
  natureOfWork,
  vaccines,
  medicalHistory,
  familyHistory,
  BadgeQatar,
  BadgeADNOC,
  BadgeChevron,
  BadgeMarshall,
  BadgeILO,
  BadgeMLC,
} from './FormConstants';

interface MedicalHistorySectionProps {
  formData: any;
  handleChange: (e: any) => void;
  selectedFormats: string[];
  activeFields: string[];
}

export default function MedicalHistorySection({
  formData,
  handleChange,
  selectedFormats = [],
  activeFields = [],
}: MedicalHistorySectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const isQatar = selectedFormats.includes('qatarenergy');
  const isChevron = selectedFormats.includes('chevron');
  const isAdnoc = selectedFormats.includes('adnoc');
  const isIlo = selectedFormats.includes('ilo');
  const isMlc = selectedFormats.includes('mlc');
  const isMarshall = selectedFormats.includes('marshall');

  const showNatureOfWork =
    natureOfWork.some((n: any) => isActive(n.id)) || isActive('nwothers');

  const previousExposureFields = [
    'expnoise',
    'expheavymetals',
    'expskininfections',
    'expcompensation',
    'expchemicals',
    'expradiation',
    'expdust',
    'expdisable',
    'expdisableno',
  ];
  const showPreviousExposure = previousExposureFields.some(isActive);

  const showPersonalHistory =
    medicalHistory.some((m: any) => isActive(m.id)) ||
    isActive('diabins') ||
    isActive('diabnon') ||
    isActive('mhothers');

  const familyTableFields = [
    'faage', 'fastate',
    'moage', 'mostate',
    'sibage', 'sibstate',
    'spoage', 'spostate',
    'chiage', 'chistate',
  ];

  const showFamilyHistory =
    familyHistory.some((f: any) => isActive(f.id)) ||
    isActive('fmothers') ||
    familyTableFields.some(isActive);

  const specificConditionFields = [
    'mhcardiacsurgery',
    'mhsurgery',
    'mhangina',
    'mhkidneystone',
    'mhanxiety',
    'mhsleep',
    'mhfainting',
  ];
  const showSpecificConditions = specificConditionFields.some(isActive);

  const lifestyleFields = [
    'qillness',
    'qhospwait',
    'qmeds',
    'qmedstext',
    'qsmoke',
    'qsmoketext',
    'qsmokefreq',
    'smokery',
    'smokerd',
    'smokerq',
    'smokersy',
    'qalcohol',
    'qalcoholtext',
    'qfit',
    'qcertrevoked',
    'qawaremedical',
    'qmedevac',
    'qmedevactext',
    'qomfc',
    'qomfctext',
    'qfear',
    'qstress',
    'qstressful',
    'qstressscore',
    'vaccinated',
    'illnesslast',
  ];
  const showLifestyle = lifestyleFields.some(isActive);

  const showVaccines = vaccines.some((v: any) => isActive(v.id));

  const femaleFields = [
    'mhpregnancy',
    'flmp',
    'fpregno',
    'flivebirth',
    'fheavy',
    'fregular',
    'fpain',
    'fpill',
  ];
  const showFemaleSection = femaleFields.some(isActive);

  const familyRows = [
    { id: 'fa', label: 'Ayah / Father' },
    { id: 'mo', label: 'Ibu / Mother' },
    { id: 'sib', label: 'Saudara / Siblings' },
    { id: 'spo', label: 'Suami/Istri / Spouse' },
    { id: 'chi', label: 'Anak / Children' },
  ];

  const handleSyntheticChange = (name: string, value: any) => {
    handleChange({
      target: {
        name,
        value,
        type: 'text',
      },
    });
  };

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Kuisioner Medis / Riwayat Penyakit</h3>
        <p className={cardDescClass}>
          Formulir riwayat pasien. Pengisian ini akan disinkronkan secara otomatis ke seluruh format yang relevan.
        </p>
      </div>

      <div className={cardContentClass}>
        <div className="space-y-6">

          {showNatureOfWork && (
            <div className="space-y-3">
              <label className={labelClass}>Sifat Pekerjaan / Paparan</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {natureOfWork
                  .filter((n: any) => isActive(n.id))
                  .map((n: any) => (
                    <label key={n.id} className={checkboxGroupClass}>
                      <input
                        type="checkbox"
                        name={n.id}
                        checked={formData[n.id] === true}
                        onChange={handleChange}
                        className={checkboxClass}
                      />
                      <span>{n.label}</span>
                    </label>
                  ))}
              </div>

              {isActive('nwothers') && (
                <div className="flex items-center gap-3 pt-2 w-full md:w-1/2">
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Lainnya</span>
                  <input
                    type="text"
                    name="nwothers"
                    value={formData.nwothers || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sebutkan paparan lainnya..."
                  />
                </div>
              )}
            </div>
          )}

          {showPreviousExposure && (
            <div className="rounded-lg border border-teal-200 bg-teal-50/30 p-4">
              <h4 className="text-sm font-bold text-teal-900 mb-4">
                Paparan Sebelumnya / Previous Exposure {isAdnoc && <BadgeADNOC />}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'expnoise', label: 'Bising / Noise' },
                  { id: 'expheavymetals', label: 'Logam Berat / Heavy Metals' },
                  { id: 'expskininfections', label: 'Infeksi Kulit / Skin Infections' },
                  { id: 'expcompensation', label: 'Kompensasi Kecelakaan Kerja / Accident Compensation' },
                  { id: 'expchemicals', label: 'Bahan Kimia / Chemicals' },
                  { id: 'expradiation', label: 'Radiasi / Radiation' },
                  { id: 'expdust', label: 'Debu / Dust' },
                ]
                  .filter((m) => isActive(m.id))
                  .map((m) => (
                    <div key={m.id} className="flex justify-between items-center rounded bg-white border border-teal-100 p-2 shadow-sm">
                      <span className="text-sm font-medium text-slate-700">{m.label}</span>
                      <div className="flex gap-3">
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={m.id}
                            value="Yes"
                            checked={formData[m.id] === 'Yes'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span className="text-xs">Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={m.id}
                            value="No"
                            checked={formData[m.id] === 'No'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span className="text-xs">Tidak</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>

              {(isActive('expdisable') || isActive('expdisableno')) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-white rounded border border-teal-100">
                  {isActive('expdisable') && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Terdaftar Cacat / Registered Disable?
                      </span>
                      <div className="flex gap-3">
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name="expdisable"
                            value="Yes"
                            checked={formData.expdisable === 'Yes'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span className="text-xs">Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name="expdisable"
                            value="No"
                            checked={formData.expdisable === 'No'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span className="text-xs">Tidak</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {isActive('expdisableno') && formData.expdisable === 'Yes' && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-slate-700">No</label>
                      <input
                        type="text"
                        name="expdisableno"
                        value={formData.expdisableno || ''}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Nomor Disabilitas..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {showPersonalHistory && (
            <div className="space-y-4">
              <label className={labelClass}>Riwayat Penyakit Diri Sendiri</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalHistory
                  .filter((m: any) => isActive(m.id))
                  .map((m: any) => (
                    <div
                      key={m.id}
                      className="rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">{m.label}</span>
                        <div className="flex gap-4">
                          <label className={radioGroupClass}>
                            <input
                              type="radio"
                              name={m.id}
                              value="Yes"
                              checked={formData[m.id] === 'Yes'}
                              onChange={handleChange}
                              className={radioClass}
                            />
                            <span>Ya</span>
                          </label>
                          <label className={radioGroupClass}>
                            <input
                              type="radio"
                              name={m.id}
                              value="No"
                              checked={formData[m.id] === 'No'}
                              onChange={(e) => {
                                handleChange(e);
                                if (m.id === 'mhdiabetes') {
                                  handleSyntheticChange('diabins', '');
                                  handleSyntheticChange('diabnon', '');
                                }
                              }}
                              className={radioClass}
                            />
                            <span>Tidak</span>
                          </label>
                        </div>
                      </div>

                      {m.id === 'mhdiabetes' &&
                        formData.mhdiabetes === 'Yes' &&
                        (isActive('diabins') || isActive('diabnon')) && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 mt-3 rounded-lg border border-blue-200 bg-blue-50/50">
                            <span className="text-sm font-medium text-blue-900 flex items-center gap-1">
                              Apakah Diabetes Anda bergantung pada Insulin? {isAdnoc && <BadgeADNOC />}
                            </span>
                            <div className="flex gap-4 shrink-0">
                              {isActive('diabins') && (
                                <label className={radioGroupClass}>
                                  <input
                                    type="radio"
                                    name="diabins"
                                    value="Yes"
                                    checked={formData.diabins === 'Yes'}
                                    onChange={(e) => {
                                      handleChange(e);
                                      handleSyntheticChange('diabnon', 'No');
                                    }}
                                    className={radioClass}
                                  />
                                  <span>Ya / Insulin</span>
                                </label>
                              )}
                              {isActive('diabnon') && (
                                <label className={radioGroupClass}>
                                  <input
                                    type="radio"
                                    name="diabnon"
                                    value="Yes"
                                    checked={formData.diabnon === 'Yes'}
                                    onChange={(e) => {
                                      handleChange(e);
                                      handleSyntheticChange('diabins', 'No');
                                    }}
                                    className={radioClass}
                                  />
                                  <span>Tidak / Non-Insulin</span>
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
              </div>

              {isActive('mhothers') && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className={labelClass}>Penyakit Lainnya</label>
                  <input
                    type="text"
                    name="mhothers"
                    value={formData.mhothers || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sebutkan jika ada riwayat penyakit lain..."
                  />
                </div>
              )}
            </div>
          )}

          {showFamilyHistory && (
            <div className="space-y-4 pb-4 border-t border-slate-100 pt-6">
              <label className={labelClass}>
                Riwayat Penyakit Keluarga {isQatar && <BadgeQatar />} {isAdnoc && <BadgeADNOC />}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {familyHistory
                  .filter((f: any) => isActive(f.id))
                  .map((f: any) => (
                    <div
                      key={f.id}
                      className="flex justify-between items-center rounded-lg border border-slate-200 p-3 shadow-sm bg-slate-50/30"
                    >
                      <span className="text-sm font-medium text-slate-700">{f.label}</span>
                      <div className="flex gap-4">
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={f.id}
                            value="Yes"
                            checked={formData[f.id] === 'Yes'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span>Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={f.id}
                            value="No"
                            checked={formData[f.id] === 'No'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span>Tidak</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>

              {isActive('fmothers') && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className={labelClass}>Penyakit Keluarga Lainnya</label>
                  <input
                    type="text"
                    name="fmothers"
                    value={formData.fmothers || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sebutkan..."
                  />
                </div>
              )}

              {familyTableFields.some(isActive) && (
                <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4 mt-6">
                  <h4 className="text-sm font-bold text-blue-900 mb-4">
                    Detail Umur / Kesehatan Keluarga {isAdnoc && <BadgeADNOC />}
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-600 bg-slate-100 uppercase">
                        <tr>
                          <th className="px-3 py-2 rounded-tl-lg">Anggota Keluarga</th>
                          <th className="px-3 py-2">Umur / Age</th>
                          <th className="px-3 py-2 rounded-tr-lg">Status Kesehatan / Kematian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {familyRows
                          .filter((fam) => isActive(`${fam.id}age`) || isActive(`${fam.id}state`))
                          .map((fam) => (
                            <tr key={fam.id} className="border-b border-slate-200/60">
                              <td className="px-3 py-2 font-medium text-slate-800">{fam.label}</td>
                              <td className="px-3 py-2">
                                {isActive(`${fam.id}age`) && (
                                  <input
                                    type="text"
                                    name={`${fam.id}age`}
                                    value={formData[`${fam.id}age`] || ''}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Umur"
                                  />
                                )}
                              </td>
                              <td className="px-3 py-2">
                                {isActive(`${fam.id}state`) && (
                                  <input
                                    type="text"
                                    name={`${fam.id}state`}
                                    value={formData[`${fam.id}state`] || ''}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Sehat / Penyebab Meninggal..."
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {showSpecificConditions && (
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <label className={labelClass}>
                Riwayat Kondisi Medis Spesifik {isAdnoc && <BadgeADNOC />} {isIlo && <BadgeILO />}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'mhcardiacsurgery', label: 'Operasi / Bedah Jantung' },
                  { id: 'mhsurgery', label: 'Operasi Besar Selain Jantung' },
                  { id: 'mhangina', label: 'Angina / Nyeri Dada' },
                  { id: 'mhkidneystone', label: 'Batu Ginjal / Kidney Stones' },
                  { id: 'mhanxiety', label: 'Kecemasan / Depresi / Panik' },
                  { id: 'mhsleep', label: 'Gangguan Tidur / Sleep Disturbance' },
                  { id: 'mhfainting', label: 'Pingsan / Hilang Kesadaran' },
                ]
                  .filter((m) => isActive(m.id))
                  .map((m) => (
                    <div
                      key={m.id}
                      className="flex justify-between items-center rounded-lg border border-orange-200 p-3 shadow-sm bg-orange-50/30"
                    >
                      <span className="text-sm font-medium text-slate-800">{m.label}</span>
                      <div className="flex gap-4">
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={m.id}
                            value="Yes"
                            checked={formData[m.id] === 'Yes'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span>Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input
                            type="radio"
                            name={m.id}
                            value="No"
                            checked={formData[m.id] === 'No'}
                            onChange={handleChange}
                            className={radioClass}
                          />
                          <span>Tidak</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {showLifestyle && (
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <label className={labelClass}>Pertanyaan Umum Gaya Hidup</label>

              <div className="space-y-3">
                {isActive('qillness') && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700">
                        1. Pernah menderita penyakit parah / dirawat di RS yang membuat absen kerja?
                      </span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="qillness" value="Yes" checked={formData.qillness === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="qillness" value="No" checked={formData.qillness === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  </div>
                )}

                {isActive('qhospwait') && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700">
                        2. Apakah saat ini Anda sedang menunggu perawatan Rumah Sakit? {isAdnoc && <BadgeADNOC />}
                      </span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="qhospwait" value="Yes" checked={formData.qhospwait === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="qhospwait" value="No" checked={formData.qhospwait === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  </div>
                )}

                {(isActive('qmeds') || isActive('qmedstext')) && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    {isActive('qmeds') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-700">
                          3. Apakah saat ini sedang rutin mengonsumsi obat-obatan?
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qmeds" value="Yes" checked={formData.qmeds === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qmeds" value="No" checked={formData.qmeds === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}
                    {isActive('qmedstext') && formData.qmeds === 'Yes' && (
                      <input
                        type="text"
                        name="qmedstext"
                        value={formData.qmedstext || ''}
                        placeholder="Sebutkan nama obat, dosis, dan frekuensi..."
                        onChange={handleChange}
                        className={`${inputClass} mt-4`}
                      />
                    )}
                  </div>
                )}

                {(isActive('qsmoke') ||
                  isActive('qsmoketext') ||
                  isActive('qsmokefreq') ||
                  isActive('smokery') ||
                  isActive('smokerd') ||
                  isActive('smokerq') ||
                  isActive('smokersy')) && (
                  <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                    {isActive('qsmoke') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-900">4. Apakah Anda merokok?</span>
                        <div className="flex flex-wrap items-center gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qsmoke" value="Yes" checked={formData.qsmoke === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qsmoke" value="No" checked={formData.qsmoke === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>

                          {isActive('smokerq') && (
                            <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 sm:ml-4 sm:pl-4 sm:border-l border-slate-300">
                              <input
                                type="checkbox"
                                name="smokerq"
                                checked={formData.smokerq === 'Yes'}
                                onChange={(e) =>
                                  handleSyntheticChange('smokerq', e.target.checked ? 'Yes' : 'No')
                                }
                                className={checkboxClass}
                              />
                              <span>Sudah Berhenti / Quit</span> {isChevron && <BadgeChevron />}
                            </label>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.qsmoke === 'Yes' && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {isActive('qsmoketext') && (
                            <div>
                              <label className={labelClass}>Jenis Rokok</label>
                              <input type="text" name="qsmoketext" value={formData.qsmoketext || ''} onChange={handleChange} className={inputClass} />
                            </div>
                          )}
                          {isActive('qsmokefreq') && (
                            <div>
                              <label className={labelClass}>Frekuensi btg/hari {isQatar && <BadgeQatar />}</label>
                              <input type="text" name="qsmokefreq" value={formData.qsmokefreq || ''} onChange={handleChange} className={inputClass} />
                            </div>
                          )}
                          {isActive('smokery') && (
                            <div>
                              <label className={labelClass}>Total tahun merokok {isChevron && <BadgeChevron />}</label>
                              <input type="number" name="smokery" value={formData.smokery || ''} onChange={handleChange} className={inputClass} />
                            </div>
                          )}
                          {isActive('smokerd') && (
                            <div>
                              <label className={labelClass}>Jumlah batang/hari {isChevron && <BadgeChevron />}</label>
                              <input type="number" name="smokerd" value={formData.smokerd || ''} onChange={handleChange} className={inputClass} />
                            </div>
                          )}
                        </div>

                        {isActive('smokersy') && formData.smokerq === 'Yes' && (
                          <div className="mt-4 sm:w-1/2">
                            <label className={labelClass}>Lama berhenti (tahun) {isChevron && <BadgeChevron />}</label>
                            <input type="number" name="smokersy" value={formData.smokersy || ''} onChange={handleChange} className={inputClass} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {(isActive('qalcohol') || isActive('qalcoholtext')) && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    {isActive('qalcohol') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-700">
                          5. Mengonsumsi alkohol atau narkoba / obat rekreasi?
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qalcohol" value="Yes" checked={formData.qalcohol === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qalcohol" value="No" checked={formData.qalcohol === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}
                    {isActive('qalcoholtext') && formData.qalcohol === 'Yes' && (
                      <input
                        type="text"
                        name="qalcoholtext"
                        value={formData.qalcoholtext || ''}
                        placeholder="Jenis, frekuensi, volume per minggu..."
                        onChange={handleChange}
                        className={`${inputClass} mt-4`}
                      />
                    )}
                  </div>
                )}

                {isActive('qfit') && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700">
                        6. Apakah Anda merasa sehat dan bugar saat ini? {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />} {isQatar && <BadgeQatar />}
                      </span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="qfit" value="Yes" checked={formData.qfit === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="qfit" value="No" checked={formData.qfit === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  </div>
                )}

                {(isActive('qcertrevoked') ||
                  isActive('qawaremedical') ||
                  isActive('qmedevac') ||
                  isActive('qmedevactext') ||
                  isActive('qomfc') ||
                  isActive('qomfctext') ||
                  isActive('qfear') ||
                  isActive('qstress') ||
                  isActive('qstressful') ||
                  isActive('qstressscore') ||
                  isActive('vaccinated') ||
                  isActive('illnesslast')) && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                    <label className="text-sm font-bold text-slate-900 mb-1 block">
                      Kuisioner Tambahan Kepatuhan / Mental
                    </label>

                    {isActive('qcertrevoked') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Pernahkah sertifikat medis Anda dibatasi atau dicabut? {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qcertrevoked" value="Yes" checked={formData.qcertrevoked === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qcertrevoked" value="No" checked={formData.qcertrevoked === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}

                    {isActive('qawaremedical') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Apakah Anda sadar memiliki masalah medis atau penyakit? {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qawaremedical" value="Yes" checked={formData.qawaremedical === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qawaremedical" value="No" checked={formData.qawaremedical === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}

                    {(isActive('qmedevac') || isActive('qmedevactext')) && (
                      <div className="space-y-3">
                        {isActive('qmedevac') && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                              Punya riwayat Evakuasi Medis / Dipulangkan karena sakit?
                            </span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="qmedevac" value="Yes" checked={formData.qmedevac === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="qmedevac" value="No" checked={formData.qmedevac === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>
                        )}
                        {isActive('qmedevactext') && formData.qmedevac === 'Yes' && (
                          <input
                            type="text"
                            name="qmedevactext"
                            value={formData.qmedevactext || ''}
                            placeholder="Jelaskan alasannya..."
                            onChange={handleChange}
                            className={inputClass}
                          />
                        )}
                      </div>
                    )}

                    {(isActive('qomfc') || isActive('qomfctext')) && (
                      <div className="space-y-3">
                        {isActive('qomfc') && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                              Pernah ditolak Sertifikat Medis / Unfit for Duty?
                            </span>
                            <div className="flex gap-4 shrink-0">
                              <label className={radioGroupClass}><input type="radio" name="qomfc" value="Yes" checked={formData.qomfc === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="qomfc" value="No" checked={formData.qomfc === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                            </div>
                          </div>
                        )}
                        {isActive('qomfctext') && formData.qomfc === 'Yes' && (
                          <input
                            type="text"
                            name="qomfctext"
                            value={formData.qomfctext || ''}
                            placeholder="Apa alasannya..."
                            onChange={handleChange}
                            className={inputClass}
                          />
                        )}
                      </div>
                    )}

                    {isActive('qfear') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Punya fobia? Ketinggian, laut, dll {isQatar && <BadgeQatar />} {isAdnoc && <BadgeADNOC />}
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qfear" value="Yes" checked={formData.qfear === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qfear" value="No" checked={formData.qfear === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}

                    {isActive('qstress') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Sedang mengalami stres yang tidak biasa / berat? {isQatar && <BadgeQatar />}
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="qstress" value="Yes" checked={formData.qstress === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="qstress" value="No" checked={formData.qstress === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}

                    {(isActive('qstressful') || isActive('qstressscore')) && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Apakah hidup Anda penuh tekanan? Skala 1-10 {isQatar && <BadgeQatar />}
                        </span>
                        <div className="flex items-center gap-4 shrink-0">
                          {isActive('qstressscore') && formData.qstressful === 'Yes' && (
                            <input
                              type="number"
                              name="qstressscore"
                              value={formData.qstressscore || ''}
                              min="1"
                              max="10"
                              placeholder="Skor"
                              onChange={handleChange}
                              className="flex h-8 w-20 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                            />
                          )}
                          {isActive('qstressful') && (
                            <>
                              <label className={radioGroupClass}><input type="radio" name="qstressful" value="Yes" checked={formData.qstressful === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                              <label className={radioGroupClass}><input type="radio" name="qstressful" value="No" checked={formData.qstressful === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {isActive('vaccinated') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Apakah sudah divaksin sesuai standar WHO? {isMarshall && <BadgeMarshall />}
                        </span>
                        <div className="flex gap-4 shrink-0">
                          <label className={radioGroupClass}><input type="radio" name="vaccinated" value="Yes" checked={formData.vaccinated === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="vaccinated" value="No" checked={formData.vaccinated === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </div>
                      </div>
                    )}

                    {isActive('illnesslast') && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 mt-4">
                        <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">
                          Penyakit sejak pemeriksaan terakhir / Illnesses since last exam {isAdnoc && <BadgeADNOC />}
                        </span>
                        <input
                          type="text"
                          name="illnesslast"
                          value={formData.illnesslast || ''}
                          onChange={handleChange}
                          className={`${inputClass} sm:w-1/2`}
                          placeholder="Kosongkan jika tidak ada"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {showVaccines && (
            <div className="rounded-lg border border-slate-200 p-4">
              <label className="text-sm font-bold text-slate-900 mb-4 block">
                Riwayat Vaksinasi Khusus {isQatar && <BadgeQatar />}
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {vaccines
                  .filter((v: any) => isActive(v.id))
                  .map((v: any) => (
                    <div
                      key={v.id}
                      className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100"
                    >
                      <span className="text-sm font-medium text-slate-700">{v.label}</span>
                      <div className="flex gap-3">
                        <label className={radioGroupClass}>
                          <input type="radio" name={v.id} value="Yes" checked={formData[v.id] === 'Yes'} onChange={handleChange} className={radioClass} />
                          <span className="text-xs">Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input type="radio" name={v.id} value="No" checked={formData[v.id] === 'No'} onChange={handleChange} className={radioClass} />
                          <span className="text-xs">Tidak</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input type="radio" name={v.id} value="Not Sure" checked={formData[v.id] === 'Not Sure'} onChange={handleChange} className={radioClass} />
                          <span className="text-xs text-slate-500">Not Sure</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {showFemaleSection && (
            <div className="rounded-lg border border-pink-200 bg-pink-50/30 p-4 mt-6">
              <h4 className="font-semibold text-sm text-pink-900 mb-4 pb-2 border-b border-pink-100">
                Khusus Pelaut Wanita / Female {isAdnoc && <BadgeADNOC />}
              </h4>

              {isActive('mhpregnancy') && (
                <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm mb-4">
                  <span className="text-sm text-slate-700">
                    Sedang Hamil / Pregnancy? {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}
                  </span>
                  <div className="flex gap-2">
                    <label className={radioGroupClass}><input type="radio" name="mhpregnancy" value="Yes" checked={formData.mhpregnancy === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                    <label className={radioGroupClass}><input type="radio" name="mhpregnancy" value="No" checked={formData.mhpregnancy === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {isActive('flmp') && (
                  <div>
                    <label className={labelClass}>Tanggal Haid Terakhir / LMP</label>
                    <input type="date" name="flmp" value={formData.flmp || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}
                {isActive('fpregno') && (
                  <div>
                    <label className={labelClass}>Jumlah Kehamilan</label>
                    <input type="number" name="fpregno" value={formData.fpregno || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}
                {isActive('flivebirth') && (
                  <div>
                    <label className={labelClass}>Jumlah Kelahiran Hidup</label>
                    <input type="number" name="flivebirth" value={formData.flivebirth || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-pink-200">
                {isActive('fheavy') && (
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                    <span className="text-sm text-slate-700">Pendarahan Berat / Heavy Periods?</span>
                    <div className="flex gap-2">
                      <label className={radioGroupClass}><input type="radio" name="fheavy" value="Yes" checked={formData.fheavy === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="fheavy" value="No" checked={formData.fheavy === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                    </div>
                  </div>
                )}

                {isActive('fregular') && (
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                    <span className="text-sm text-slate-700">Haid Teratur / Regular?</span>
                    <div className="flex gap-2">
                      <label className={radioGroupClass}><input type="radio" name="fregular" value="Yes" checked={formData.fregular === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="fregular" value="No" checked={formData.fregular === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                    </div>
                  </div>
                )}

                {isActive('fpain') && (
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                    <span className="text-sm text-slate-700">Nyeri Haid / Pain?</span>
                    <div className="flex gap-2">
                      <label className={radioGroupClass}><input type="radio" name="fpain" value="Yes" checked={formData.fpain === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="fpain" value="No" checked={formData.fpain === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                    </div>
                  </div>
                )}

                {isActive('fpill') && (
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                    <span className="text-sm text-slate-700">Menggunakan Kontrasepsi / Pill?</span>
                    <div className="flex gap-2">
                      <label className={radioGroupClass}><input type="radio" name="fpill" value="Yes" checked={formData.fpill === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="fpill" value="No" checked={formData.fpill === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}