import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
  radioGroupClass,
  radioClass,
  textareaClass,
  BadgeADNOC,
  BadgeChevron,
  BadgeILO,
  BadgeMLC,
} from './FormConstants';

interface LabSectionProps {
  formData: any;
  handleChange: (e: any) => void;
  selectedFormats: string[];
  activeFields: string[];
}

export default function LabSection({
  formData,
  handleChange,
  selectedFormats = [],
  activeFields = [],
}: LabSectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const isIlo = selectedFormats.includes('ilo');
  const isMlc = selectedFormats.includes('mlc');

  const leftAudiometryFields = ['l05', 'l1', 'l2', 'l3', 'l4', 'l6', 'l8'];
  const rightAudiometryFields = ['r05', 'r1', 'r2', 'r3', 'r4', 'r6', 'r8'];

  const showSpirometry =
    isActive('ft_fvc') ||
    isActive('pre_fvc') ||
    isActive('ft_fev1') ||
    isActive('pre_fev1') ||
    isActive('ev1_vc');

  const showAudiometry =
    leftAudiometryFields.some(isActive) ||
    rightAudiometryFields.some(isActive) ||
    isActive('oht_result');

  const showEcg =
    isActive('rate') ||
    isActive('rhyt') ||
    isActive('axis') ||
    isActive('pr') ||
    isActive('qrs') ||
    isActive('twv') ||
    isActive('diag');

  const showXray =
    isActive('xray') ||
    isActive('date_xray') ||
    isActive('des_abnor');

  const showHematology =
    isActive('lab_hb') ||
    isActive('lab_hct') ||
    isActive('rbc_m') ||
    isActive('lab_wbc') ||
    isActive('pmn') ||
    isActive('lymph') ||
    isActive('mono') ||
    isActive('eos') ||
    isActive('baso') ||
    isActive('band') ||
    isActive('lab_platelet');

  const showUrinalysisChemistry =
    isActive('albumin') ||
    isActive('ur_sugar') ||
    isActive('urin_b') ||
    isActive('wbc') ||
    isActive('rbc') ||
    isActive('casts') ||
    isActive('ur_others') ||
    isActive('val_sugar') ||
    isActive('val_chol') ||
    isActive('val_trig') ||
    isActive('val_hdl') ||
    isActive('val_ldl') ||
    isActive('val_urig') ||
    isActive('val_bun') ||
    isActive('val_creat') ||
    isActive('val_sgot') ||
    isActive('val_sgpt') ||
    isActive('lab_sr') ||
    isActive('hep_b_ab') ||
    isActive('hep_b_ag') ||
    isActive('hep_c') ||
    isActive('hep_a') ||
    isActive('hiv_res') ||
    isActive('vdrl_res') ||
    isActive('stool_bact') ||
    isActive('stool_para') ||
    isActive('only_cg') ||
    isActive('detail_af');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Detail Angka Laboratorium & Penunjang</h3>
        <p className={cardDescClass}>
          Masukan hasil tes kuantitatif secara presisi untuk lembar rekam medis Chevron, ADNOC, ILO, MLC, dll.
        </p>
      </div>

      <div className={cardContentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {showSpirometry && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Spirometri (Fungsi Paru)
                </h4>

                {(isActive('ft_fvc') || isActive('pre_fvc')) && (
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {isActive('ft_fvc') && (
                      <div>
                        <label className={labelClass}>FVC <BadgeADNOC /></label>
                        <input
                          type="text"
                          name="ft_fvc"
                          value={formData.ft_fvc || ''}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    )}
                    {isActive('pre_fvc') && (
                      <div>
                        <label className={labelClass}>% Predicted FVC <BadgeChevron /></label>
                        <input
                          type="text"
                          name="pre_fvc"
                          value={formData.pre_fvc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Cth: 85"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('ft_fev1') || isActive('pre_fev1')) && (
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {isActive('ft_fev1') && (
                      <div>
                        <label className={labelClass}>FEV1 <BadgeADNOC /></label>
                        <input
                          type="text"
                          name="ft_fev1"
                          value={formData.ft_fev1 || ''}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    )}
                    {isActive('pre_fev1') && (
                      <div>
                        <label className={labelClass}>% Predicted FEV1 <BadgeChevron /></label>
                        <input
                          type="text"
                          name="pre_fev1"
                          value={formData.pre_fev1 || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Cth: 90"
                        />
                      </div>
                    )}
                  </div>
                )}

                {isActive('ev1_vc') && (
                  <div>
                    <label className={labelClass}>FEV1 / FVC Ratio (%) <BadgeChevron /><BadgeMLC /></label>
                    <input
                      type="text"
                      name="ev1_vc"
                      value={formData.ev1_vc || ''}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Cth: 80"
                    />
                  </div>
                )}
              </div>
            )}

            {showAudiometry && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Audiometri (dB) <BadgeChevron /> {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}
                </h4>

                {leftAudiometryFields.some(isActive) && (
                  <>
                    <label className="text-xs font-semibold text-slate-500 mb-2 block uppercase tracking-wider">
                      Telinga Kiri (Left Ear)
                    </label>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {[
                        { label: '0.5', key: 'l05' },
                        { label: '1.0', key: 'l1' },
                        { label: '2.0', key: 'l2' },
                        { label: '3.0', key: 'l3' },
                        { label: '4.0', key: 'l4' },
                        { label: '6.0', key: 'l6' },
                        { label: '8.0', key: 'l8' },
                      ]
                        .filter((f) => isActive(f.key))
                        .map((f) => (
                          <div key={f.key}>
                            <label className="text-[11px] font-medium text-slate-600 block text-center mb-1">
                              {f.label}
                            </label>
                            <input
                              type="text"
                              name={f.key}
                              value={formData[f.key] || ''}
                              onChange={handleChange}
                              className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-center outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                            />
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {rightAudiometryFields.some(isActive) && (
                  <>
                    <label className="text-xs font-semibold text-slate-500 mb-2 block uppercase tracking-wider">
                      Telinga Kanan (Right Ear)
                    </label>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {[
                        { label: '0.5', key: 'r05' },
                        { label: '1.0', key: 'r1' },
                        { label: '2.0', key: 'r2' },
                        { label: '3.0', key: 'r3' },
                        { label: '4.0', key: 'r4' },
                        { label: '6.0', key: 'r6' },
                        { label: '8.0', key: 'r8' },
                      ]
                        .filter((f) => isActive(f.key))
                        .map((f) => (
                          <div key={f.key}>
                            <label className="text-[11px] font-medium text-slate-600 block text-center mb-1">
                              {f.label}
                            </label>
                            <input
                              type="text"
                              name={f.key}
                              value={formData[f.key] || ''}
                              onChange={handleChange}
                              className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-center outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                            />
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {isActive('oht_result') && (
                  <div>
                    <label className={labelClass}>Hasil Akhir Audiometri <BadgeADNOC /></label>
                    <input
                      type="text"
                      name="oht_result"
                      value={formData.oht_result || ''}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            )}

            {showEcg && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Elektrokardiogram / EKG
                </h4>

                {(isActive('rate') || isActive('rhyt') || isActive('axis')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('rate') && (
                      <div>
                        <label className={labelClass}>Rate</label>
                        <input type="text" name="rate" value={formData.rate || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('rhyt') && (
                      <div>
                        <label className={labelClass}>Rhythm</label>
                        <input type="text" name="rhyt" value={formData.rhyt || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('axis') && (
                      <div>
                        <label className={labelClass}>Axis</label>
                        <input type="text" name="axis" value={formData.axis || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('pr') || isActive('qrs') || isActive('twv')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('pr') && (
                      <div>
                        <label className={labelClass}>P-R interval</label>
                        <input type="text" name="pr" value={formData.pr || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('qrs') && (
                      <div>
                        <label className={labelClass}>QRS</label>
                        <input type="text" name="qrs" value={formData.qrs || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('twv') && (
                      <div>
                        <label className={labelClass}>T wave</label>
                        <input type="text" name="twv" value={formData.twv || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {isActive('diag') && (
                  <div>
                    <label className={labelClass}>Diagnosis EKG <BadgeADNOC />{isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}</label>
                    <input type="text" name="diag" value={formData.diag || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}
              </div>
            )}

            {showXray && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Rontgen Dada (Chest X-Ray)
                </h4>

                {isActive('xray') && (
                  <div className="flex gap-6 mb-4">
                    <label className={radioGroupClass}>
                      <input type="radio" name="xray" value="Normal" checked={formData.xray === 'Normal'} onChange={handleChange} className={radioClass} />
                      <span>Normal</span>
                    </label>
                    <label className={radioGroupClass}>
                      <input type="radio" name="xray" value="Abnormal" checked={formData.xray === 'Abnormal'} onChange={handleChange} className={radioClass} />
                      <span>Abnormal</span>
                    </label>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 mb-2">
                  {isActive('date_xray') && (
                    <div>
                      <label className={labelClass}>Tanggal Rontgen {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}</label>
                      <input type="date" name="date_xray" value={formData.date_xray || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                  {isActive('des_abnor') && (
                    <div>
                      <label className={labelClass}>Jelaskan Kelainan (Jika Ada)</label>
                      <input type="text" name="des_abnor" value={formData.des_abnor || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {showHematology && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Darah Lengkap (Hematologi)
                </h4>

                {(isActive('lab_hb') || isActive('lab_hct')) && (
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {isActive('lab_hb') && (
                      <div>
                        <label className={labelClass}>Hb <BadgeADNOC />{isIlo && <BadgeILO />}</label>
                        <input type="text" name="lab_hb" value={formData.lab_hb || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('lab_hct') && (
                      <div>
                        <label className={labelClass}>Hct</label>
                        <input type="text" name="lab_hct" value={formData.lab_hct || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {isActive('rbc_m') && (
                  <div className="mb-3">
                    <label className={labelClass}>Morfologi Sel Darah Merah (RBC Morphology)</label>
                    <input type="text" name="rbc_m" value={formData.rbc_m || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}

                {(isActive('lab_wbc') || isActive('pmn') || isActive('lymph')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('lab_wbc') && (
                      <div>
                        <label className={labelClass}>WBC</label>
                        <input type="text" name="lab_wbc" value={formData.lab_wbc || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('pmn') && (
                      <div>
                        <label className={labelClass}>PMN</label>
                        <input type="text" name="pmn" value={formData.pmn || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('lymph') && (
                      <div>
                        <label className={labelClass}>LYMPH</label>
                        <input type="text" name="lymph" value={formData.lymph || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('mono') || isActive('eos') || isActive('baso')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('mono') && (
                      <div>
                        <label className={labelClass}>MONO</label>
                        <input type="text" name="mono" value={formData.mono || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('eos') && (
                      <div>
                        <label className={labelClass}>EOS</label>
                        <input type="text" name="eos" value={formData.eos || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('baso') && (
                      <div>
                        <label className={labelClass}>BASO</label>
                        <input type="text" name="baso" value={formData.baso || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('band') || isActive('lab_platelet')) && (
                  <div className="grid grid-cols-2 gap-4">
                    {isActive('band') && (
                      <div>
                        <label className={labelClass}>BAND</label>
                        <input type="text" name="band" value={formData.band || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('lab_platelet') && (
                      <div>
                        <label className={labelClass}>Trombosit (Platelets)</label>
                        <input type="text" name="lab_platelet" value={formData.lab_platelet || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {showUrinalysisChemistry && (
              <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Urinalisis & Kimia Darah
                </h4>

                {(isActive('albumin') || isActive('ur_sugar') || isActive('urin_b')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('albumin') && (
                      <div>
                        <label className={labelClass}>Albumin <BadgeADNOC /></label>
                        <input type="text" name="albumin" value={formData.albumin || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('ur_sugar') && (
                      <div>
                        <label className={labelClass}>Gula (U) <BadgeADNOC /></label>
                        <input type="text" name="ur_sugar" value={formData.ur_sugar || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('urin_b') && (
                      <div>
                        <label className={labelClass}>Darah (U)</label>
                        <input type="text" name="urin_b" value={formData.urin_b || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('wbc') || isActive('rbc') || isActive('casts')) && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {isActive('wbc') && (
                      <div>
                        <label className={labelClass}>WBC</label>
                        <input type="text" name="wbc" value={formData.wbc || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('rbc') && (
                      <div>
                        <label className={labelClass}>RBC</label>
                        <input type="text" name="rbc" value={formData.rbc || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                    {isActive('casts') && (
                      <div>
                        <label className={labelClass}>Casts</label>
                        <input type="text" name="casts" value={formData.casts || ''} onChange={handleChange} className={inputClass} />
                      </div>
                    )}
                  </div>
                )}

                {isActive('ur_others') && (
                  <div className="mb-5">
                    <label className={labelClass}>Lainnya (Urinalisis)</label>
                    <input type="text" name="ur_others" value={formData.ur_others || ''} onChange={handleChange} className={inputClass} />
                  </div>
                )}

                {(isActive('val_sugar') ||
                  isActive('val_chol') ||
                  isActive('val_trig') ||
                  isActive('val_hdl') ||
                  isActive('val_ldl') ||
                  isActive('val_urig') ||
                  isActive('val_bun') ||
                  isActive('val_creat') ||
                  isActive('val_sgot') ||
                  isActive('val_sgpt')) && (
                  <>
                    <label className="text-xs font-semibold text-slate-500 mb-3 block uppercase tracking-wider border-t border-slate-100 pt-4">
                      Kimia Darah
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      {isActive('val_sugar') && <div><label className={labelClass}>Gula Darah (mg%)</label><input type="text" name="val_sugar" value={formData.val_sugar || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_chol') && <div><label className={labelClass}>Kolesterol (mg%)</label><input type="text" name="val_chol" value={formData.val_chol || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_trig') && <div><label className={labelClass}>Trigliserida (mg%)</label><input type="text" name="val_trig" value={formData.val_trig || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_hdl') && <div><label className={labelClass}>HDL (mg%)</label><input type="text" name="val_hdl" value={formData.val_hdl || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_ldl') && <div><label className={labelClass}>LDL (mg%)</label><input type="text" name="val_ldl" value={formData.val_ldl || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_urig') && <div><label className={labelClass}>Asam Urat (mg/dl)</label><input type="text" name="val_urig" value={formData.val_urig || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_bun') && <div><label className={labelClass}>BUN (mg/dl)</label><input type="text" name="val_bun" value={formData.val_bun || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_creat') && <div><label className={labelClass}>Kreatinin (mg/dl)</label><input type="text" name="val_creat" value={formData.val_creat || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_sgot') && <div><label className={labelClass}>SGOT (U/L)</label><input type="text" name="val_sgot" value={formData.val_sgot || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('val_sgpt') && <div><label className={labelClass}>SGPT (U/L)</label><input type="text" name="val_sgpt" value={formData.val_sgpt || ''} onChange={handleChange} className={inputClass} /></div>}
                    </div>
                  </>
                )}

                {(isActive('lab_sr') ||
                  isActive('hep_b_ab') ||
                  isActive('hep_b_ag') ||
                  isActive('hep_c') ||
                  isActive('hep_a') ||
                  isActive('hiv_res') ||
                  isActive('vdrl_res')) && (
                  <>
                    <label className="text-xs font-semibold text-slate-500 mb-3 block uppercase tracking-wider border-t border-slate-100 pt-4">
                      Serologi & Penyakit Menular
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {isActive('lab_sr') && <div><label className={labelClass}>Laju Endap Darah (SR)</label><input type="text" name="lab_sr" value={formData.lab_sr || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('hep_b_ab') && (
                        <div>
                          <label className={labelClass}>Hepatitis B (Ab) <BadgeADNOC /></label>
                          <select name="hep_b_ab" value={formData.hep_b_ab || ''} onChange={handleChange} className={inputClass}>
                            <option value="">- Pilih -</option>
                            <option value="Positive">Positif (+ve)</option>
                            <option value="Negative">Negatif (-ve)</option>
                          </select>
                        </div>
                      )}
                      {isActive('hep_b_ag') && (
                        <div>
                          <label className={labelClass}>Hepatitis B (Ag) <BadgeADNOC /></label>
                          <select name="hep_b_ag" value={formData.hep_b_ag || ''} onChange={handleChange} className={inputClass}>
                            <option value="">- Pilih -</option>
                            <option value="Positive">Positif (+ve)</option>
                            <option value="Negative">Negatif (-ve)</option>
                          </select>
                        </div>
                      )}
                      {isActive('hep_c') && <div><label className={labelClass}>Hepatitis C <BadgeADNOC /></label><input type="text" name="hep_c" value={formData.hep_c || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('hep_a') && <div><label className={labelClass}>Hepatitis A <BadgeADNOC /></label><input type="text" name="hep_a" value={formData.hep_a || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('hiv_res') && <div><label className={labelClass}>Hasil HIV (+ve/-ve)</label><input type="text" name="hiv_res" value={formData.hiv_res || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('vdrl_res') && <div><label className={labelClass}>Hasil VDRL (+ve/-ve)</label><input type="text" name="vdrl_res" value={formData.vdrl_res || ''} onChange={handleChange} className={inputClass} /></div>}
                    </div>
                  </>
                )}

                {(isActive('stool_bact') ||
                  isActive('stool_para') ||
                  isActive('only_cg') ||
                  isActive('detail_af')) && (
                  <>
                    <label className="text-xs font-semibold text-slate-500 mb-3 block uppercase tracking-wider border-t border-slate-100 pt-4">
                      Kultur Makanan (Khusus Katering)
                    </label>
                    <div className="space-y-4">
                      {(isActive('stool_bact') || isActive('stool_para')) && (
                        <div className="grid grid-cols-2 gap-4">
                          {isActive('stool_bact') && (
                            <div>
                              <label className={labelClass}>Kultur Bakteri (Feses)</label>
                              <select name="stool_bact" value={formData.stool_bact || ''} onChange={handleChange} className={inputClass}>
                                <option value="">- Pilih -</option>
                                <option value="Not Performed">Tidak Dilakukan</option>
                                <option value="Negative">Negatif</option>
                                <option value="Positive">Positif</option>
                              </select>
                            </div>
                          )}
                          {isActive('stool_para') && (
                            <div>
                              <label className={labelClass}>Kultur Parasit (Feses)</label>
                              <select name="stool_para" value={formData.stool_para || ''} onChange={handleChange} className={inputClass}>
                                <option value="">- Pilih -</option>
                                <option value="Not Performed">Tidak Dilakukan</option>
                                <option value="Negative">Negatif</option>
                                <option value="Positive">Positif</option>
                              </select>
                            </div>
                          )}
                        </div>
                      )}

                      {isActive('only_cg') && (
                        <div>
                          <label className={labelClass}>Kultur Feses Lainnya</label>
                          <input type="text" name="only_cg" value={formData.only_cg || ''} onChange={handleChange} className={inputClass} />
                        </div>
                      )}

                      {isActive('detail_af') && (
                        <div>
                          <label className={labelClass}>Rincian Temuan Abnormal</label>
                          <textarea name="detail_af" value={formData.detail_af || ''} onChange={handleChange} className={textareaClass}></textarea>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}