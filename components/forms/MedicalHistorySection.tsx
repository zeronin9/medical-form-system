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

const ADNOC_EXPOSURE_FIELDS = [
  { id: 'exp_noise', label: 'Bising (Noise)' },
  { id: 'exp_heavy_metals', label: 'Logam Berat (Heavy Metals)' },
  { id: 'exp_skin_infections', label: 'Infeksi Kulit (Skin Infections)' },
  { id: 'exp_compensation', label: 'Kompensasi Kecelakaan Kerja (Accident compensation)' },
  { id: 'exp_chemicals', label: 'Bahan Kimia (Chemicals)' },
  { id: 'exp_radiation', label: 'Radiasi (Radiation)' },
  { id: 'exp_dust', label: 'Debu (Dust)' },
];

const SPECIFIC_CONDITION_FIELDS = [
  { id: 'mh_cardiac_surgery', label: 'Operasi / Bedah Jantung' },
  { id: 'mh_surgery', label: 'Operasi Besar (Selain Jantung)' },
  { id: 'mh_angina', label: 'Angina (Nyeri Dada)' },
  { id: 'mh_kidney_stone', label: 'Batu Ginjal (Kidney Stones)' },
  { id: 'mh_anxiety', label: 'Kecemasan / Depresi / Panik' },
  { id: 'mh_sleep', label: 'Gangguan Tidur (Sleep Disturbance)' },
  { id: 'mh_fainting', label: 'Pingsan / Hilang Kesadaran' },
];

const FAMILY_DETAIL_FIELDS = [
  { id: 'fa', label: 'Ayah (Father)' },
  { id: 'mo', label: 'Ibu (Mother)' },
  { id: 'sib', label: 'Saudara (Siblings)' },
  { id: 'spo', label: 'Suami/Istri (Spouse)' },
  { id: 'chi', label: 'Anak (Children)' },
];

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

  const showNatureOfWork =
    natureOfWork.some((n) => isActive(n.id)) || isActive('nw_others');

  const showPreviousExposure =
    ADNOC_EXPOSURE_FIELDS.some((m) => isActive(m.id)) ||
    isActive('exp_disable') ||
    isActive('exp_disable_no');

  const showMedicalHistory =
    medicalHistory.some((m) => isActive(m.id)) ||
    isActive('diab_ins') ||
    isActive('diab_non') ||
    isActive('mh_others');

  const showFamilyHistory =
    familyHistory.some((f) => isActive(f.id)) ||
    isActive('fm_others') ||
    FAMILY_DETAIL_FIELDS.some(
      (fam) => isActive(`${fam.id}_age`) || isActive(`${fam.id}_state`)
    );

  const showSpecificConditions =
    SPECIFIC_CONDITION_FIELDS.some((m) => isActive(m.id));

  const showGeneralLifestyle =
    isActive('q_illness') ||
    isActive('q_hosp_wait') ||
    isActive('q_meds') ||
    isActive('q_meds_text') ||
    isActive('q_smoke') ||
    isActive('smoker_q') ||
    isActive('q_smoke_text') ||
    isActive('q_smoke_freq') ||
    isActive('smoker_y') ||
    isActive('smoker_d') ||
    isActive('smoker_s_y') ||
    isActive('q_alcohol') ||
    isActive('q_alcohol_text') ||
    isActive('q_fit') ||
    isActive('q_cert_revoked') ||
    isActive('q_aware_medical') ||
    isActive('q_medevac') ||
    isActive('q_medevac_text') ||
    isActive('q_omfc') ||
    isActive('q_omfc_text') ||
    isActive('q_fear') ||
    isActive('q_stress') ||
    isActive('q_stressful') ||
    isActive('q_stress_score') ||
    isActive('vaccinated') ||
    isActive('illness_last');

  const showVaccines =
    vaccines.some((v) => isActive(v.id));

  const showExtraLifestyle =
    isActive('q_stress_score') ||
    isActive('q_alcohol_text') ||
    isActive('q_medevac_text') ||
    isActive('q_omfc_text') ||
    isActive('smoker_y') ||
    isActive('smoker_d') ||
    isActive('smoker_q') ||
    isActive('smoker_s_y');

  const showFemaleSection =
    isActive('mh_pregnancy') ||
    isActive('f_lmp') ||
    isActive('f_preg_no') ||
    isActive('f_live_birth') ||
    isActive('f_heavy') ||
    isActive('f_reg') ||
    isActive('f_pain') ||
    isActive('f_pill');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Kuisioner Medis & Riwayat Penyakit</h3>
        <p className={cardDescClass}>
          Formulir riwayat pasien. Pengisian ini akan disinkronkan secara otomatis ke seluruh format.
        </p>
      </div>

      <div className={cardContentClass}>
        {showNatureOfWork && (
          <>
            <div className="space-y-3">
              <label className={labelClass}>Sifat Pekerjaan / Paparan (Centang yang sesuai):</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {natureOfWork
                  .filter((n) => isActive(n.id))
                  .map((n) => (
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

              {isActive('nw_others') && (
                <div className="flex items-center gap-3 pt-2 w-full md:w-1/2">
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Lainnya:</span>
                  <input
                    type="text"
                    name="nw_others"
                    value={formData.nw_others || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sebutkan paparan lainnya..."
                  />
                </div>
              )}
            </div>
            <div className="border-t border-slate-100 my-6"></div>
          </>
        )}

        {showPreviousExposure && isAdnoc && (
          <div className="rounded-lg border border-teal-200 bg-teal-50/30 p-4 mt-6 mb-6">
            <h4 className="text-sm font-bold text-teal-900 mb-4">
              Paparan Sebelumnya (Previous Exposure) <BadgeADNOC />
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ADNOC_EXPOSURE_FIELDS
                .filter((m) => isActive(m.id))
                .map((m) => (
                  <div key={m.id} className="flex justify-between items-center rounded bg-white border border-teal-100 p-2 shadow-sm">
                    <span className="text-sm font-medium text-slate-700">{m.label}</span>
                    <div className="flex gap-3">
                      <label className={radioGroupClass}>
                        <input type="radio" name={m.id} value="Yes" checked={formData[m.id] === 'Yes'} onChange={handleChange} className={radioClass} />
                        <span className="text-xs">Ya</span>
                      </label>
                      <label className={radioGroupClass}>
                        <input type="radio" name={m.id} value="No" checked={formData[m.id] === 'No'} onChange={handleChange} className={radioClass} />
                        <span className="text-xs">Tidak</span>
                      </label>
                    </div>
                  </div>
                ))}
            </div>

            {(isActive('exp_disable') || (formData.exp_disable === 'Yes' && isActive('exp_disable_no'))) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-3 bg-white rounded border border-teal-100">
                {isActive('exp_disable') && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Terdaftar Cacat (Registered Disable)?</span>
                    <div className="flex gap-3">
                      <label className={radioGroupClass}>
                        <input type="radio" name="exp_disable" value="Yes" checked={formData.exp_disable === 'Yes'} onChange={handleChange} className={radioClass} />
                        <span className="text-xs">Ya</span>
                      </label>
                      <label className={radioGroupClass}>
                        <input type="radio" name="exp_disable" value="No" checked={formData.exp_disable === 'No'} onChange={handleChange} className={radioClass} />
                        <span className="text-xs">Tidak</span>
                      </label>
                    </div>
                  </div>
                )}

                {formData.exp_disable === 'Yes' && isActive('exp_disable_no') && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">No:</label>
                    <input
                      type="text"
                      name="exp_disable_no"
                      value={formData.exp_disable_no || ''}
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

        {showMedicalHistory && (
          <>
            <div className="space-y-4">
              <label className={labelClass}>Riwayat Penyakit Diri Sendiri:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalHistory
                  .filter((m: any) => isActive(m.id))
                  .map((m: any) => (
                    <div key={m.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow">
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
                              if (m.id === 'mh_diabetes') {
                                handleChange({ target: { name: 'diab_ins', value: '' } });
                                handleChange({ target: { name: 'diab_non', value: '' } });
                              }
                            }}
                            className={radioClass}
                          />
                          <span>Tidak</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>

              {formData.mh_diabetes === 'Yes' && isAdnoc && (isActive('diab_ins') || isActive('diab_non')) && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 mt-3 rounded-lg border border-blue-200 bg-blue-50/50">
                  <span className="text-sm font-medium text-blue-900 flex items-center gap-1">
                    Apakah Diabetes Anda bergantung pada Insulin? (Insulin dependent) <BadgeADNOC/>
                  </span>
                  <div className="flex gap-4 shrink-0">
                    {isActive('diab_ins') && (
                      <label className={radioGroupClass}>
                        <input
                          type="radio"
                          name="diab_ins"
                          value="Yes"
                          checked={formData.diab_ins === 'Yes'}
                          onChange={(e) => {
                            handleChange(e);
                            handleChange({ target: { name: 'diab_non', value: 'No' } });
                          }}
                          className={radioClass}
                        />
                        <span>Ya (Insulin)</span>
                      </label>
                    )}
                    {isActive('diab_non') && (
                      <label className={radioGroupClass}>
                        <input
                          type="radio"
                          name="diab_non"
                          value="Yes"
                          checked={formData.diab_non === 'Yes'}
                          onChange={(e) => {
                            handleChange(e);
                            handleChange({ target: { name: 'diab_ins', value: 'No' } });
                          }}
                          className={radioClass}
                        />
                        <span>Tidak (Non-Insulin)</span>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {isActive('mh_others') && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className={labelClass}>Penyakit Lainnya:</label>
                  <input
                    type="text"
                    name="mh_others"
                    value={formData.mh_others || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Sebutkan jika ada riwayat penyakit lain..."
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 my-6"></div>
          </>
        )}

        {showFamilyHistory && (
          <>
            <div className="space-y-4 pb-4">
              <label className={labelClass}>Riwayat Penyakit Keluarga <BadgeQatar /><BadgeADNOC/></label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {familyHistory
                  .filter((f: any) => isActive(f.id))
                  .map((f: any) => (
                    <div key={f.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-3 shadow-sm bg-slate-50/30">
                      <span className="text-sm font-medium text-slate-700">{f.label}</span>
                      <div className="flex gap-4">
                        <label className={radioGroupClass}>
                          <input type="radio" name={f.id} value="Yes" checked={formData[f.id] === 'Yes'} onChange={handleChange} className={radioClass} />
                          <span>Ya</span>
                        </label>
                        <label className={radioGroupClass}>
                          <input type="radio" name={f.id} value="No" checked={formData[f.id] === 'No'} onChange={handleChange} className={radioClass} />
                          <span>Tidak</span>
                        </label>
                      </div>
                    </div>
                  ))}
              </div>

              {isActive('fm_others') && (
                <div className="flex flex-col space-y-2 mt-4">
                  <label className={labelClass}>Penyakit Keluarga Lainnya:</label>
                  <input type="text" name="fm_others" value={formData.fm_others || ''} onChange={handleChange} className={inputClass} placeholder="Sebutkan..." />
                </div>
              )}

              {isAdnoc &&
                FAMILY_DETAIL_FIELDS.some((fam) => isActive(`${fam.id}_age`) || isActive(`${fam.id}_state`)) && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4 mt-6">
                    <h4 className="text-sm font-bold text-blue-900 mb-4">Detail Umur & Kesehatan Keluarga <BadgeADNOC /></h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-600 bg-slate-100 uppercase">
                          <tr>
                            <th className="px-3 py-2 rounded-tl-lg">Anggota Keluarga</th>
                            <th className="px-3 py-2">Umur (Age)</th>
                            <th className="px-3 py-2 rounded-tr-lg">Status Kesehatan / Kematian</th>
                          </tr>
                        </thead>
                        <tbody>
                          {FAMILY_DETAIL_FIELDS
                            .filter((fam) => isActive(`${fam.id}_age`) || isActive(`${fam.id}_state`))
                            .map((fam) => (
                              <tr key={fam.id} className="border-b border-slate-200/60">
                                <td className="px-3 py-2 font-medium text-slate-800">{fam.label}</td>
                                <td className="px-3 py-2">
                                  {isActive(`${fam.id}_age`) && (
                                    <input
                                      type="text"
                                      name={`${fam.id}_age`}
                                      value={formData[`${fam.id}_age`] || ''}
                                      onChange={handleChange}
                                      className={inputClass}
                                      placeholder="Umur"
                                    />
                                  )}
                                </td>
                                <td className="px-3 py-2">
                                  {isActive(`${fam.id}_state`) && (
                                    <input
                                      type="text"
                                      name={`${fam.id}_state`}
                                      value={formData[`${fam.id}_state`] || ''}
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

            <div className="border-t border-slate-100 my-6"></div>
          </>
        )}

        {showSpecificConditions && (
          <div className="space-y-4">
            <label className={labelClass}>Riwayat Kondisi Medis Spesifik <BadgeADNOC/><BadgeILO/></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPECIFIC_CONDITION_FIELDS
                .filter((m) => isActive(m.id))
                .map((m) => (
                  <div key={m.id} className="flex justify-between items-center rounded-lg border border-orange-200 p-3 shadow-sm bg-orange-50/30">
                    <span className="text-sm font-medium text-slate-800">{m.label}</span>
                    <div className="flex gap-4">
                      <label className={radioGroupClass}><input type="radio" name={m.id} value="Yes" checked={formData[m.id] === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name={m.id} value="No" checked={formData[m.id] === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {showGeneralLifestyle && (
          <div className="space-y-4">
            <label className={labelClass}>Pertanyaan Umum & Gaya Hidup:</label>
            <div className="space-y-3">
              {isActive('q_illness') && (
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-700">
                      1. Pernah menderita penyakit parah / dirawat di RS yang membuat absen kerja?
                    </span>
                    <div className="flex gap-4 shrink-0">
                      <label className={radioGroupClass}><input type="radio" name="q_illness" value="Yes" checked={formData.q_illness === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="q_illness" value="No" checked={formData.q_illness === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                    </div>
                  </div>
                </div>
              )}

              {isActive('q_hosp_wait') && (
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-700">
                      2. Apakah saat ini Anda sedang menunggu perawatan Rumah Sakit? <BadgeADNOC/>
                    </span>
                    <div className="flex gap-4 shrink-0">
                      <label className={radioGroupClass}><input type="radio" name="q_hosp_wait" value="Yes" checked={formData.q_hosp_wait === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="q_hosp_wait" value="No" checked={formData.q_hosp_wait === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                    </div>
                  </div>
                </div>
              )}

              {(isActive('q_meds') || (formData.q_meds === 'Yes' && isActive('q_meds_text'))) && (
                <div className="rounded-lg border border-slate-200 p-4 transition-all">
                  {isActive('q_meds') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700">3. Apakah saat ini sedang rutin mengonsumsi obat-obatan?</span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_meds" value="Yes" checked={formData.q_meds === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_meds" value="No" checked={formData.q_meds === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}
                  {formData.q_meds === 'Yes' && isActive('q_meds_text') && (
                    <input type="text" name="q_meds_text" value={formData.q_meds_text || ''} placeholder="Sebutkan nama obat, dosis, dan frekuensi..." onChange={handleChange} className={`${inputClass} mt-4`} />
                  )}
                </div>
              )}

              {(isActive('q_smoke') ||
                isActive('smoker_q') ||
                (formData.q_smoke === 'Yes' && (
                  isActive('q_smoke_text') ||
                  isActive('q_smoke_freq') ||
                  isActive('smoker_y') ||
                  isActive('smoker_d')
                )) ||
                (formData.smoker_q === 'Yes' && isActive('smoker_s_y'))) && (
                <div className="rounded-lg border border-slate-200 p-4 transition-all bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-900">4. Apakah Anda merokok?</span>
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                      {isActive('q_smoke') && (
                        <>
                          <label className={radioGroupClass}><input type="radio" name="q_smoke" value="Yes" checked={formData.q_smoke === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                          <label className={radioGroupClass}><input type="radio" name="q_smoke" value="No" checked={formData.q_smoke === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                        </>
                      )}

                      {isActive('smoker_q') && (
                        <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 sm:ml-4 sm:pl-4 sm:border-l border-slate-300">
                          <input
                            type="checkbox"
                            name="smoker_q"
                            checked={formData.smoker_q === 'Yes'}
                            onChange={(e) => handleChange({ target: { name: 'smoker_q', value: e.target.checked ? 'Yes' : 'No' } })}
                            className={checkboxClass}
                          />
                          <span>Sudah Berhenti (Quit)</span> <BadgeChevron />
                        </label>
                      )}
                    </div>
                  </div>

                  {formData.q_smoke === 'Yes' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {isActive('q_smoke_text') && <div><label className={labelClass}>Jenis Rokok</label><input type="text" name="q_smoke_text" value={formData.q_smoke_text || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('q_smoke_freq') && <div><label className={labelClass}>Frekuensi: btg/hari <BadgeQatar /></label><input type="text" name="q_smoke_freq" value={formData.q_smoke_freq || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('smoker_y') && <div><label className={labelClass}>Total tahun merokok <BadgeChevron /></label><input type="number" name="smoker_y" value={formData.smoker_y || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('smoker_d') && <div><label className={labelClass}>Jumlah batang/hari <BadgeChevron /></label><input type="number" name="smoker_d" value={formData.smoker_d || ''} onChange={handleChange} className={inputClass} /></div>}
                    </div>
                  )}

                  {formData.smoker_q === 'Yes' && isActive('smoker_s_y') && (
                    <div className="mt-4 sm:w-1/2">
                      <label className={labelClass}>Lama berhenti (tahun) <BadgeChevron /></label>
                      <input type="number" name="smoker_s_y" value={formData.smoker_s_y || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              )}

              {(isActive('q_alcohol') || (formData.q_alcohol === 'Yes' && isActive('q_alcohol_text'))) && (
                <div className="rounded-lg border border-slate-200 p-4 transition-all">
                  {isActive('q_alcohol') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-700">5. Mengonsumsi alkohol atau narkoba (obat rekreasi)?</span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="Yes" checked={formData.q_alcohol === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="No" checked={formData.q_alcohol === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}
                  {formData.q_alcohol === 'Yes' && isActive('q_alcohol_text') && (
                    <input type="text" name="q_alcohol_text" value={formData.q_alcohol_text || ''} placeholder="Jenis, frekuensi, & volume per minggu..." onChange={handleChange} className={`${inputClass} mt-4`} />
                  )}
                </div>
              )}

              {isActive('q_fit') && (
                <div className="rounded-lg border border-slate-200 p-4 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-700">6. Apakah Anda merasa sehat dan bugar saat ini (Fit and well)? <BadgeILO/><BadgeMLC/><BadgeQatar/></span>
                    <div className="flex gap-4 shrink-0">
                      <label className={radioGroupClass}><input type="radio" name="q_fit" value="Yes" checked={formData.q_fit === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                      <label className={radioGroupClass}><input type="radio" name="q_fit" value="No" checked={formData.q_fit === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                    </div>
                  </div>
                </div>
              )}

              {(isActive('q_cert_revoked') ||
                isActive('q_aware_medical') ||
                isActive('q_medevac') ||
                isActive('q_medevac_text') ||
                isActive('q_omfc') ||
                isActive('q_omfc_text') ||
                isActive('q_fear') ||
                isActive('q_stress') ||
                isActive('q_stressful') ||
                isActive('q_stress_score') ||
                isActive('vaccinated') ||
                isActive('illness_last')) && (
                <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                  <label className="text-sm font-bold text-slate-900 mb-1 block">Kuisioner Tambahan Kepatuhan & Mental:</label>

                  {(isIlo || isMlc) && isActive('q_cert_revoked') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Pernahkah sertifikat medis Anda dibatasi atau dicabut? <BadgeILO/><BadgeMLC/></span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_cert_revoked" value="Yes" checked={formData.q_cert_revoked === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_cert_revoked" value="No" checked={formData.q_cert_revoked === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}

                  {(isIlo || isMlc) && isActive('q_aware_medical') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Apakah Anda sadar memiliki masalah medis atau penyakit? <BadgeILO/><BadgeMLC/></span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_aware_medical" value="Yes" checked={formData.q_aware_medical === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_aware_medical" value="No" checked={formData.q_aware_medical === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}

                  {(isActive('q_medevac') || (formData.q_medevac === 'Yes' && isActive('q_medevac_text'))) && (
                    <>
                      {isActive('q_medevac') && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Punya riwayat Evakuasi Medis / Dipulangkan karena sakit?</span>
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_medevac" value="Yes" checked={formData.q_medevac === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_medevac" value="No" checked={formData.q_medevac === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                      )}
                      {formData.q_medevac === 'Yes' && isActive('q_medevac_text') && (
                        <input type="text" name="q_medevac_text" value={formData.q_medevac_text || ''} placeholder="Jelaskan alasannya..." onChange={handleChange} className={inputClass} />
                      )}
                    </>
                  )}

                  {(isActive('q_omfc') || (formData.q_omfc === 'Yes' && isActive('q_omfc_text'))) && (
                    <>
                      {isActive('q_omfc') && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                          <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Pernah ditolak Sertifikat Medis (Unfit for Duty)?</span>
                          <div className="flex gap-4 shrink-0">
                            <label className={radioGroupClass}><input type="radio" name="q_omfc" value="Yes" checked={formData.q_omfc === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_omfc" value="No" checked={formData.q_omfc === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                          </div>
                        </div>
                      )}
                      {formData.q_omfc === 'Yes' && isActive('q_omfc_text') && (
                        <input type="text" name="q_omfc_text" value={formData.q_omfc_text || ''} placeholder="Apa alasannya..." onChange={handleChange} className={inputClass} />
                      )}
                    </>
                  )}

                  {isActive('q_fear') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Punya fobia? (Ketinggian, laut, dll) <BadgeQatar /><BadgeADNOC/></span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_fear" value="Yes" checked={formData.q_fear === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_fear" value="No" checked={formData.q_fear === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}

                  {isActive('q_stress') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Sedang mengalami stres yang tidak biasa / berat? <BadgeQatar /></span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="q_stress" value="Yes" checked={formData.q_stress === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_stress" value="No" checked={formData.q_stress === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}

                  {(isActive('q_stressful') || (formData.q_stressful === 'Yes' && isActive('q_stress_score'))) && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Apakah hidup Anda penuh tekanan? (Skala 1-10) <BadgeQatar /></span>
                      <div className="flex items-center gap-4 shrink-0">
                        {formData.q_stressful === 'Yes' && isActive('q_stress_score') && (
                          <input type="number" name="q_stress_score" value={formData.q_stress_score || ''} min="1" max="10" placeholder="Skor" onChange={handleChange} className="flex h-8 w-20 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-950" />
                        )}
                        {isActive('q_stressful') && (
                          <>
                            <label className={radioGroupClass}><input type="radio" name="q_stressful" value="Yes" checked={formData.q_stressful === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                            <label className={radioGroupClass}><input type="radio" name="q_stressful" value="No" checked={formData.q_stressful === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {isActive('vaccinated') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Apakah sudah divaksin sesuai standar WHO? <BadgeMarshall /></span>
                      <div className="flex gap-4 shrink-0">
                        <label className={radioGroupClass}><input type="radio" name="vaccinated" value="Yes" checked={formData.vaccinated === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="vaccinated" value="No" checked={formData.vaccinated === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                    </div>
                  )}

                  {isAdnoc && isActive('illness_last') && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 mt-4">
                      <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Penyakit sejak pemeriksaan terakhir (Illnesses since last exam) <BadgeADNOC /></span>
                      <input type="text" name="illness_last" value={formData.illness_last || ''} onChange={handleChange} className={`${inputClass} sm:w-1/2`} placeholder="Kosongkan jika tidak ada" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {showVaccines && isQatar && (
          <div className="rounded-lg border border-slate-200 p-4">
            <label className="text-sm font-bold text-slate-900 mb-4 block">Riwayat Vaksinasi Khusus <BadgeQatar /></label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {vaccines
                .filter((v) => isActive(v.id))
                .map((v) => (
                  <div key={v.id} className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100">
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

        {showExtraLifestyle && (isQatar || isChevron) && (
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 mt-6">
            <h4 className="text-sm font-bold text-indigo-900 mb-4">Detail Tambahan (Khusus QatarEnergy & Chevron)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isQatar && (
                <>
                  {isActive('q_stress_score') && <div><label className={labelClass}>Skor Tingkat Stres (1-10) <BadgeQatar/></label><input type="number" min="1" max="10" name="q_stress_score" value={formData.q_stress_score || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: 4" /></div>}
                  {isActive('q_alcohol_text') && <div><label className={labelClass}>Detail Konsumsi Alkohol <BadgeQatar/><BadgeChevron/></label><input type="text" name="q_alcohol_text" value={formData.q_alcohol_text || ''} onChange={handleChange} className={inputClass} placeholder="Qatar: Jenis & Volume | Chevron: Jml Gelas/Minggu" /></div>}
                  {isActive('q_medevac_text') && <div><label className={labelClass}>Alasan MEDEVAC (Jika Pernah) <BadgeQatar/></label><input type="text" name="q_medevac_text" value={formData.q_medevac_text || ''} onChange={handleChange} className={inputClass} placeholder="Kosongkan jika tidak pernah" /></div>}
                  {isActive('q_omfc_text') && <div><label className={labelClass}>Alasan Penolakan OMFC (Jika Pernah) <BadgeQatar/></label><input type="text" name="q_omfc_text" value={formData.q_omfc_text || ''} onChange={handleChange} className={inputClass} placeholder="Kosongkan jika tidak pernah" /></div>}
                </>
              )}

              {isChevron && (isActive('smoker_y') || isActive('smoker_d') || isActive('smoker_q') || isActive('smoker_s_y')) && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-3 rounded border border-slate-200">
                  <div className="md:col-span-4"><label className="text-xs font-bold text-slate-700">Detail Merokok <BadgeChevron/></label></div>
                  {isActive('smoker_y') && <div><label className={labelClass}>Lama Merokok (Tahun)</label><input type="text" name="smoker_y" value={formData.smoker_y || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 5" /></div>}
                  {isActive('smoker_d') && <div><label className={labelClass}>Batang per Hari</label><input type="text" name="smoker_d" value={formData.smoker_d || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 10" /></div>}
                  {isActive('smoker_q') && (
                    <div>
                      <label className={labelClass}>Sudah Berhenti?</label>
                      <select name="smoker_q" value={formData.smoker_q || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="Yes">Ya (Quit)</option>
                        <option value="No">Masih Merokok</option>
                      </select>
                    </div>
                  )}
                  {isActive('smoker_s_y') && (
                    <div>
                      <label className={labelClass}>Berhenti Sejak (Tahun)</label>
                      <input type="text" name="smoker_s_y" value={formData.smoker_s_y || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 2" disabled={formData.smoker_q !== 'Yes'} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {showFemaleSection && (
          <div className="rounded-lg border border-slate-200 p-4 bg-pink-50/30 border-pink-200 mt-6">
            <h4 className="font-semibold text-sm text-pink-900 mb-4 pb-2 border-b border-pink-100">Khusus Pelaut Wanita (Female) <BadgeADNOC/></h4>

            {(isIlo || isMlc) && isActive('mh_pregnancy') && (
              <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm mb-4">
                <span className="text-sm text-slate-700">Sedang Hamil (Pregnancy)? <BadgeILO/><BadgeMLC/></span>
                <div className="flex gap-2">
                  <label className={radioGroupClass}><input type="radio" name="mh_pregnancy" value="Yes" checked={formData.mh_pregnancy === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="mh_pregnancy" value="No" checked={formData.mh_pregnancy === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {isActive('f_lmp') && <div><label className={labelClass}>Tanggal Haid Terakhir (LMP)</label><input type="date" name="f_lmp" value={formData.f_lmp || ''} onChange={handleChange} className={inputClass} /></div>}
              {isActive('f_preg_no') && <div><label className={labelClass}>Jumlah Kehamilan</label><input type="number" name="f_preg_no" value={formData.f_preg_no || ''} onChange={handleChange} className={inputClass} /></div>}
              {isActive('f_live_birth') && <div><label className={labelClass}>Jumlah Kelahiran Hidup</label><input type="number" name="f_live_birth" value={formData.f_live_birth || ''} onChange={handleChange} className={inputClass} /></div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-pink-200">
              {isActive('f_heavy') && (
                <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                  <span className="text-sm text-slate-700">Pendarahan Berat (Heavy Periods)?</span>
                  <div className="flex gap-2">
                    <label className={radioGroupClass}><input type="radio" name="f_heavy" value="Yes" checked={formData.f_heavy === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                    <label className={radioGroupClass}><input type="radio" name="f_heavy" value="No" checked={formData.f_heavy === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                  </div>
                </div>
              )}

              {isActive('f_reg') && (
                <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                  <span className="text-sm text-slate-700">Haid Teratur (Regular)?</span>
                  <div className="flex gap-2">
                    <label className={radioGroupClass}><input type="radio" name="f_reg" value="Yes" checked={formData.f_reg === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                    <label className={radioGroupClass}><input type="radio" name="f_reg" value="No" checked={formData.f_reg === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                  </div>
                </div>
              )}

              {isActive('f_pain') && (
                <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                  <span className="text-sm text-slate-700">Haid Nyeri (Painful)?</span>
                  <div className="flex gap-2">
                    <label className={radioGroupClass}><input type="radio" name="f_pain" value="Yes" checked={formData.f_pain === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                    <label className={radioGroupClass}><input type="radio" name="f_pain" value="No" checked={formData.f_pain === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                  </div>
                </div>
              )}

              {isActive('f_pill') && (
                <div className="flex justify-between items-center bg-white p-2 rounded border border-pink-100 shadow-sm">
                  <span className="text-sm text-slate-700">Konsumsi Pil KB (Contraceptive Pill)?</span>
                  <div className="flex gap-2">
                    <label className={radioGroupClass}><input type="radio" name="f_pill" value="Yes" checked={formData.f_pill === 'Yes'} onChange={handleChange} className={radioClass} /><span className="text-xs">Ya</span></label>
                    <label className={radioGroupClass}><input type="radio" name="f_pill" value="No" checked={formData.f_pill === 'No'} onChange={handleChange} className={radioClass} /><span className="text-xs">Tidak</span></label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}