import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
  BadgeADNOC,
  BadgeQatar,
  BadgeChevron,
  BadgeILO,
  BadgeMLC,
  BadgeMarshall,
} from './FormConstants';

interface BiometricVisionSectionProps {
  formData: any;
  handleChange: (e: any) => void;
  selectedFormats: string[];
  activeFields: string[];
}

const audioRightFields = [
  { id: 'r05', label: '0.5 kHz' },
  { id: 'r1', label: '1 kHz' },
  { id: 'r2', label: '2 kHz' },
  { id: 'r3', label: '3 kHz' },
  { id: 'r4', label: '4 kHz' },
  { id: 'r6', label: '6 kHz' },
];

const audioLeftFields = [
  { id: 'l05', label: '0.5 kHz' },
  { id: 'l1', label: '1 kHz' },
  { id: 'l2', label: '2 kHz' },
  { id: 'l3', label: '3 kHz' },
  { id: 'l4', label: '4 kHz' },
  { id: 'l6', label: '6 kHz' },
];

export default function BiometricVisionSection({
  formData,
  handleChange,
  selectedFormats,
  activeFields,
}: BiometricVisionSectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const isIlo = selectedFormats.includes('ilo');
  const isMlc = selectedFormats.includes('mlc');
  const isIloOnly = selectedFormats.length === 1 && selectedFormats[0] === 'ilo';

  const showBiometricSection =
    isActive('height') ||
    isActive('weight') ||
    isActive('bmi') ||
    isActive('waist') ||
    isActive('bloodPressure') ||
    isActive('pulse') ||
    isActive('rr') ||
    isActive('temp') ||
    isActive('bloodGroupType') ||
    isActive('bloodGroupRh') ||
    isActive('chest_exp') ||
    isActive('gen_app');

  const showVisionSection =
    isActive('disr_unc') ||
    isActive('disl_unc') ||
    isActive('bv_unc') ||
    isActive('disr_cor') ||
    isActive('disl_cor') ||
    isActive('bv_cor') ||
    isActive('nearr_unc') ||
    isActive('nearl_unc') ||
    isActive('near_bv_unc') ||
    isActive('nearr_cor') ||
    isActive('nearl_cor') ||
    isActive('near_bv_cor') ||
    isActive('vf_r') ||
    isActive('vf_l') ||
    isActive('color_vision') ||
    isActive('color_test_type') ||
    isActive('color_y') ||
    isActive('color_r') ||
    isActive('color_g') ||
    isActive('color_b') ||
    isActive('vis_stcw') ||
    isActive('col_stcw') ||
    isActive('glasses_nec');

  const showHearingSection =
    isActive('hear_r') ||
    isActive('hear_l') ||
    isActive('hr_stcw') ||
    isActive('hr_unaid') ||
    audioRightFields.some((f) => isActive(f.id)) ||
    audioLeftFields.some((f) => isActive(f.id));

  // ===============================================
  // TAMPILAN KHUSUS JIKA HANYA ILO YANG DIPILIH
  // ===============================================
  if (isIloOnly) {
    return (
      <div className={cardClass}>
        <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>
            Biometrik, Vision & Hearing ILO <BadgeILO />
          </h3>
          <p className={cardDescClass}>
            Input yang tampil mengikuti kebutuhan pemeriksaan visual, colour vision, hearing, dan STCW untuk format ILO.
          </p>
        </div>

        <div className={cardContentClass}>
          <div className="space-y-8">
            {showBiometricSection && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                  Vital Signs & General
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {isActive('height') && (
                    <div>
                      <label className={labelClass}>Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {isActive('weight') && (
                    <div>
                      <label className={labelClass}>Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {isActive('bmi') && (
                    <div>
                      <label className={labelClass}>BMI</label>
                      <input
                        type="text"
                        name="bmi"
                        value={formData.bmi || ''}
                        readOnly
                        className={`${inputClass} bg-slate-100 font-semibold text-slate-600`}
                      />
                    </div>
                  )}

                  {isActive('pulse') && (
                    <div>
                      <label className={labelClass}>Pulse</label>
                      <input
                        type="number"
                        name="pulse"
                        value={formData.pulse || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {isActive('bloodPressure') && (
                    <div>
                      <label className={labelClass}>Blood Pressure</label>
                      <input
                        type="text"
                        name="bloodPressure"
                        value={formData.bloodPressure || ''}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="120/80"
                      />
                    </div>
                  )}

                  {isActive('gen_app') && (
                    <div>
                      <label className={labelClass}>General Appearance</label>
                      <select
                        name="gen_app"
                        value={formData.gen_app || ''}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">- Select -</option>
                        <option value="Good">Good</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showVisionSection && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                  Vision
                </h4>

                {(isActive('disr_unc') || isActive('disl_unc') || isActive('bv_unc')) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isActive('disr_unc') && (
                      <div>
                        <label className={labelClass}>Distance Vision Right Uncorrected</label>
                        <input
                          type="text"
                          name="disr_unc"
                          value={formData.disr_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                    {isActive('disl_unc') && (
                      <div>
                        <label className={labelClass}>Distance Vision Left Uncorrected</label>
                        <input
                          type="text"
                          name="disl_unc"
                          value={formData.disl_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                    {isActive('bv_unc') && (
                      <div>
                        <label className={labelClass}>Binocular Uncorrected</label>
                        <input
                          type="text"
                          name="bv_unc"
                          value={formData.bv_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('disr_cor') || isActive('disl_cor') || isActive('bv_cor')) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isActive('disr_cor') && (
                      <div>
                        <label className={labelClass}>Distance Vision Right Corrected</label>
                        <input
                          type="text"
                          name="disr_cor"
                          value={formData.disr_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                    {isActive('disl_cor') && (
                      <div>
                        <label className={labelClass}>Distance Vision Left Corrected</label>
                        <input
                          type="text"
                          name="disl_cor"
                          value={formData.disl_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                    {isActive('bv_cor') && (
                      <div>
                        <label className={labelClass}>Binocular Corrected</label>
                        <input
                          type="text"
                          name="bv_cor"
                          value={formData.bv_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="6/6"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('nearr_unc') || isActive('nearl_unc') || isActive('near_bv_unc')) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isActive('nearr_unc') && (
                      <div>
                        <label className={labelClass}>Near Vision Right Uncorrected</label>
                        <input
                          type="text"
                          name="nearr_unc"
                          value={formData.nearr_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                    {isActive('nearl_unc') && (
                      <div>
                        <label className={labelClass}>Near Vision Left Uncorrected</label>
                        <input
                          type="text"
                          name="nearl_unc"
                          value={formData.nearl_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                    {isActive('near_bv_unc') && (
                      <div>
                        <label className={labelClass}>Near Binocular Uncorrected</label>
                        <input
                          type="text"
                          name="near_bv_unc"
                          value={formData.near_bv_unc || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(isActive('nearr_cor') || isActive('nearl_cor') || isActive('near_bv_cor')) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isActive('nearr_cor') && (
                      <div>
                        <label className={labelClass}>Near Vision Right Corrected</label>
                        <input
                          type="text"
                          name="nearr_cor"
                          value={formData.nearr_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                    {isActive('nearl_cor') && (
                      <div>
                        <label className={labelClass}>Near Vision Left Corrected</label>
                        <input
                          type="text"
                          name="nearl_cor"
                          value={formData.nearl_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                    {isActive('near_bv_cor') && (
                      <div>
                        <label className={labelClass}>Near Binocular Corrected</label>
                        <input
                          type="text"
                          name="near_bv_cor"
                          value={formData.near_bv_cor || ''}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="N6"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* VISUAL FIELDS (LAPANG PANDANG) DI SINI */}
                {(isActive('vf_r') || isActive('vf_l')) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                    <label className="text-sm font-semibold text-slate-700 col-span-full border-b border-slate-200 pb-2">
                      Visual Fields (Lapang Pandang)
                    </label>
                    {isActive('vf_r') && (
                      <div>
                        <label className={labelClass}>Right Eye</label>
                        <select name="vf_r" value={formData.vf_r || ''} onChange={handleChange} className={inputClass}>
                          <option value="">- Select -</option>
                          <option value="Normal">Normal</option>
                          <option value="Defective">Defective</option>
                        </select>
                      </div>
                    )}
                    {isActive('vf_l') && (
                      <div>
                        <label className={labelClass}>Left Eye</label>
                        <select name="vf_l" value={formData.vf_l || ''} onChange={handleChange} className={inputClass}>
                          <option value="">- Select -</option>
                          <option value="Normal">Normal</option>
                          <option value="Defective">Defective</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {(isActive('color_vision') || isActive('color_test_type')) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isActive('color_vision') && (
                      <div>
                        <label className={labelClass}>Colour Vision Result</label>
                        <select
                          name="color_vision"
                          value={formData.color_vision || ''}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">- Select -</option>
                          <option value="Normal">Normal</option>
                          <option value="Partial">Partial Defect</option>
                          <option value="Total">Total Defect</option>
                        </select>
                      </div>
                    )}

                    {isActive('color_test_type') && (
                      <div>
                        <label className={labelClass}>Colour Test Type</label>
                        <select
                          name="color_test_type"
                          value={formData.color_test_type || ''}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">- Select -</option>
                          <option value="Ishihara">Ishihara</option>
                          <option value="Lantern">Lantern</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {(isActive('color_y') || isActive('color_r') || isActive('color_g') || isActive('color_b')) && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                    <label className={labelClass}>Can distinguish signal colours</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {isActive('color_y') && (
                        <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                          <input
                            type="checkbox"
                            name="color_y"
                            checked={formData.color_y === true}
                            onChange={handleChange}
                            className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900"
                          />
                          <span>Yellow</span>
                        </label>
                      )}
                      {isActive('color_r') && (
                        <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                          <input
                            type="checkbox"
                            name="color_r"
                            checked={formData.color_r === true}
                            onChange={handleChange}
                            className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900"
                          />
                          <span>Red</span>
                        </label>
                      )}
                      {isActive('color_g') && (
                        <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                          <input
                            type="checkbox"
                            name="color_g"
                            checked={formData.color_g === true}
                            onChange={handleChange}
                            className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900"
                          />
                          <span>Green</span>
                        </label>
                      )}
                      {isActive('color_b') && (
                        <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                          <input
                            type="checkbox"
                            name="color_b"
                            checked={formData.color_b === true}
                            onChange={handleChange}
                            className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900"
                          />
                          <span>Blue</span>
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {(isActive('vis_stcw') || isActive('col_stcw') || isActive('glasses_nec')) && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4 space-y-4">
                    <h4 className="text-sm font-bold text-blue-900 border-b border-blue-100 pb-2">
                      STCW Assessment <BadgeILO />
                    </h4>

                    {isActive('vis_stcw') && (
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <span className="text-sm text-slate-700">
                          Visual acuity meets standards in STCW Code, section A-I/9?
                        </span>
                        <div className="flex gap-3">
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="vis_stcw" value="Yes" checked={formData.vis_stcw === 'Yes'} onChange={handleChange} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="vis_stcw" value="No" checked={formData.vis_stcw === 'No'} onChange={handleChange} />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {isActive('col_stcw') && (
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <span className="text-sm text-slate-700">
                          Colour vision meets standards in STCW Code, section A-I/9?
                        </span>
                        <div className="flex gap-3">
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="col_stcw" value="Yes" checked={formData.col_stcw === 'Yes'} onChange={handleChange} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="col_stcw" value="No" checked={formData.col_stcw === 'No'} onChange={handleChange} />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {isActive('glasses_nec') && (
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <span className="text-sm text-slate-700">
                          Are glasses or contact lenses necessary?
                        </span>
                        <div className="flex gap-3">
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="glasses_nec" value="Yes" checked={formData.glasses_nec === 'Yes'} onChange={handleChange} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="glasses_nec" value="No" checked={formData.glasses_nec === 'No'} onChange={handleChange} />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {showHearingSection && (
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                  Hearing
                </h4>

                {(isActive('hear_r') || isActive('hear_l')) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isActive('hear_r') && (
                      <div>
                        <label className={labelClass}>Hearing Right</label>
                        <select
                          name="hear_r"
                          value={formData.hear_r || ''}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">- Select -</option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </select>
                      </div>
                    )}

                    {isActive('hear_l') && (
                      <div>
                        <label className={labelClass}>Hearing Left</label>
                        <select
                          name="hear_l"
                          value={formData.hear_l || ''}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">- Select -</option>
                          <option value="Normal">Normal</option>
                          <option value="Abnormal">Abnormal</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {(audioRightFields.some((f) => isActive(f.id)) || audioLeftFields.some((f) => isActive(f.id))) && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                    <h5 className="text-sm font-bold text-slate-800">Pure Tone Audiometry</h5>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-700">Right Ear</div>
                        {audioRightFields
                          .filter((f) => isActive(f.id))
                          .map((f) => (
                            <div key={f.id}>
                              <label className={labelClass}>{f.label}</label>
                              <input
                                type="number"
                                name={f.id}
                                value={formData[f.id] || ''}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="dB"
                              />
                            </div>
                          ))}
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-700">Left Ear</div>
                        {audioLeftFields
                          .filter((f) => isActive(f.id))
                          .map((f) => (
                            <div key={f.id}>
                              <label className={labelClass}>{f.label}</label>
                              <input
                                type="number"
                                name={f.id}
                                value={formData[f.id] || ''}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="dB"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {(isActive('hr_stcw') || isActive('hr_unaid')) && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4 space-y-4">
                    <h4 className="text-sm font-bold text-blue-900 border-b border-blue-100 pb-2">
                      STCW Hearing Assessment <BadgeILO />
                    </h4>

                    {isActive('hr_stcw') && (
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <span className="text-sm text-slate-700">
                          Hearing meets the standards in STCW Code, section A-I/9?
                        </span>
                        <div className="flex gap-3">
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="hr_stcw" value="Yes" checked={formData.hr_stcw === 'Yes'} onChange={handleChange} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="hr_stcw" value="No" checked={formData.hr_stcw === 'No'} onChange={handleChange} />
                            <span>No</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="hr_stcw" value="NA" checked={formData.hr_stcw === 'NA'} onChange={handleChange} />
                            <span>N/A</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {isActive('hr_unaid') && (
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <span className="text-sm text-slate-700">
                          Unaided hearing satisfactory?
                        </span>
                        <div className="flex gap-3">
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="hr_unaid" value="Yes" checked={formData.hr_unaid === 'Yes'} onChange={handleChange} />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <input type="radio" name="hr_unaid" value="No" checked={formData.hr_unaid === 'No'} onChange={handleChange} />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===============================================
  // TAMPILAN DEFAULT UNTUK MULTI-FORMAT
  // ===============================================
  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Biometrik, Penglihatan & Pendengaran</h3>
        <p className={cardDescClass}>
          Tanda-tanda vital dan tes sensorik dasar. (Hanya masukkan angka murni untuk pengukuran)
        </p>
      </div>

      <div className={cardContentClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showBiometricSection && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Tanda Vital & Biometrik
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {isActive('height') && (
                  <div>
                    <label className={labelClass}>Tinggi Badan (cm)</label>
                    <input type="number" name="height" value={formData.height || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 170" />
                  </div>
                )}

                {isActive('weight') && (
                  <div>
                    <label className={labelClass}>Berat Badan (kg)</label>
                    <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 70" />
                  </div>
                )}

                {isActive('bmi') && (
                  <div>
                    <label className={labelClass}>BMI (Otomatis)</label>
                    <input type="text" name="bmi" value={formData.bmi || ''} readOnly className={`${inputClass} bg-slate-100 font-semibold text-slate-600`} />
                  </div>
                )}

                {isActive('waist') && (
                  <div>
                    <label className={labelClass}>Lingkar Pinggang (cm) <BadgeQatar /></label>
                    <input type="number" name="waist" value={formData.waist || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 85" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {isActive('bloodPressure') && (
                  <div>
                    <label className={labelClass}>Tekanan Darah (mmHg)</label>
                    <input type="text" name="bloodPressure" value={formData.bloodPressure || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 120/80" />
                  </div>
                )}

                {isActive('pulse') && (
                  <div>
                    <label className={labelClass}>Denyut Nadi (x/mnt)</label>
                    <input type="number" name="pulse" value={formData.pulse || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 80" />
                  </div>
                )}

                {isActive('rr') && (
                  <div>
                    <label className={labelClass}>Pernapasan (RR)</label>
                    <input type="number" name="rr" value={formData.rr || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 18" />
                  </div>
                )}

                {isActive('temp') && (
                  <div>
                    <label className={labelClass}>Suhu Tubuh (°C)</label>
                    <input type="number" step="0.1" name="temp" value={formData.temp || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 36.5" />
                  </div>
                )}
              </div>

              {(isActive('bloodGroupType') || isActive('bloodGroupRh')) && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {isActive('bloodGroupType') && (
                    <div>
                      <label className={labelClass}>Golongan Darah</label>
                      <select name="bloodGroupType" value={formData.bloodGroupType || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                  )}

                  {isActive('bloodGroupRh') && (
                    <div>
                      <label className={labelClass}>Rhesus (Rh)</label>
                      <select name="bloodGroupRh" value={formData.bloodGroupRh || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="+">Positif (+)</option>
                        <option value="-">Negatif (-)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                {isActive('chest_exp') && (
                  <div>
                    <label className={labelClass}>Ekspansi Dada (Chest Exp) <BadgeADNOC /></label>
                    <input type="number" name="chest_exp" value={formData.chest_exp || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 5" />
                  </div>
                )}

                {isActive('gen_app') && (
                  <div>
                    <label className={labelClass}>Penampilan Umum (Gen. App)</label>
                    <select name="gen_app" value={formData.gen_app || ''} onChange={handleChange} className={inputClass}>
                      <option value="">- Pilih -</option>
                      <option value="Good">Normal / Good</option>
                      <option value="Abnormal">Abnormal</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {showVisionSection && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Penglihatan (Visual Acuity)
              </h4>

              {(isActive('disr_unc') || isActive('disl_unc') || isActive('bv_unc')) && (
                <div className="grid grid-cols-3 gap-2">
                  <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Jauh (Tanpa Kacamata)</label>
                  {isActive('disr_unc') && <div><label className={labelClass}>Kanan</label><input type="text" name="disr_unc" value={formData.disr_unc || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                  {isActive('disl_unc') && <div><label className={labelClass}>Kiri</label><input type="text" name="disl_unc" value={formData.disl_unc || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                  {isActive('bv_unc') && <div><label className={labelClass}>Binocular <BadgeMLC /><BadgeChevron /></label><input type="text" name="bv_unc" value={formData.bv_unc || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                </div>
              )}

              {(isActive('disr_cor') || isActive('disl_cor') || isActive('bv_cor')) && (
                <div className="grid grid-cols-3 gap-2">
                  <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Jauh (Dengan Kacamata)</label>
                  {isActive('disr_cor') && <div><label className={labelClass}>Kanan</label><input type="text" name="disr_cor" value={formData.disr_cor || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                  {isActive('disl_cor') && <div><label className={labelClass}>Kiri</label><input type="text" name="disl_cor" value={formData.disl_cor || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                  {isActive('bv_cor') && <div><label className={labelClass}>Binocular <BadgeMLC /><BadgeChevron /></label><input type="text" name="bv_cor" value={formData.bv_cor || ''} onChange={handleChange} className={inputClass} placeholder="6/6" /></div>}
                </div>
              )}

              {(isActive('nearr_unc') || isActive('nearl_unc') || isActive('near_bv_unc')) && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Dekat (Tanpa Kacamata)</label>
                  {isActive('nearr_unc') && <div><label className={labelClass}>Kanan</label><input type="text" name="nearr_unc" value={formData.nearr_unc || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                  {isActive('nearl_unc') && <div><label className={labelClass}>Kiri</label><input type="text" name="nearl_unc" value={formData.nearl_unc || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                  {isActive('near_bv_unc') && <div><label className={labelClass}>Binocular <BadgeMLC /></label><input type="text" name="near_bv_unc" value={formData.near_bv_unc || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                </div>
              )}

              {(isActive('nearr_cor') || isActive('nearl_cor') || isActive('near_bv_cor')) && (
                <div className="grid grid-cols-3 gap-2">
                  <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Dekat (Dengan Kacamata)</label>
                  {isActive('nearr_cor') && <div><label className={labelClass}>Kanan</label><input type="text" name="nearr_cor" value={formData.nearr_cor || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                  {isActive('nearl_cor') && <div><label className={labelClass}>Kiri</label><input type="text" name="nearl_cor" value={formData.nearl_cor || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                  {isActive('near_bv_cor') && <div><label className={labelClass}>Binocular <BadgeMLC /></label><input type="text" name="near_bv_cor" value={formData.near_bv_cor || ''} onChange={handleChange} className={inputClass} placeholder="N6" /></div>}
                </div>
              )}

              {/* VISUAL FIELDS (LAPANG PANDANG) DI SINI JUGA UNTUK FORMAT LAIN SEPERTI MLC */}
              {(isActive('vf_r') || isActive('vf_l')) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                  <label className="text-sm font-semibold text-slate-700 col-span-full border-b border-slate-200 pb-2">
                    Visual Fields (Lapang Pandang)
                  </label>
                  {isActive('vf_r') && (
                    <div>
                      <label className={labelClass}>Right Eye</label>
                      <select name="vf_r" value={formData.vf_r || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Select -</option>
                        <option value="Normal">Normal</option>
                        <option value="Defective">Defective</option>
                      </select>
                    </div>
                  )}
                  {isActive('vf_l') && (
                    <div>
                      <label className={labelClass}>Left Eye</label>
                      <select name="vf_l" value={formData.vf_l || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Select -</option>
                        <option value="Normal">Normal</option>
                        <option value="Defective">Defective</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {(isActive('color_vision') || isActive('color_test_type')) && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {isActive('color_vision') && (
                    <div>
                      <label className={labelClass}>Tes Buta Warna</label>
                      <select name="color_vision" value={formData.color_vision || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="Normal">Normal</option>
                        <option value="Partial">Parsial (Partial Defect)</option>
                        <option value="Total">Total (Total Defect)</option>
                      </select>
                    </div>
                  )}

                  {isActive('color_test_type') && (
                    <div>
                      <label className={labelClass}>Tipe Tes Warna <BadgeILO /><BadgeMarshall /></label>
                      <select name="color_test_type" value={formData.color_test_type || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="Book">Ishihara Book</option>
                        <option value="Lantern">Lantern</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {isActive('color_y') && (
                <div className="pt-4 mt-2 border-t border-slate-100 animate-in fade-in zoom-in duration-300">
                  <label className={labelClass}>Kemampuan Membedakan Warna <BadgeILO /><BadgeMLC /></label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                      <input type="checkbox" name="color_y" checked={formData.color_y === true} onChange={handleChange} className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900" />
                      <span>Kuning (Yellow)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                      <input type="checkbox" name="color_r" checked={formData.color_r === true} onChange={handleChange} className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900" />
                      <span>Merah (Red)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                      <input type="checkbox" name="color_g" checked={formData.color_g === true} onChange={handleChange} className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900" />
                      <span>Hijau (Green)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-slate-700">
                      <input type="checkbox" name="color_b" checked={formData.color_b === true} onChange={handleChange} className="h-4 w-4 rounded-sm border-slate-300 accent-slate-900" />
                      <span>Biru (Blue)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {showHearingSection && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Pendengaran (Bicara/Bisik)
              </h4>

              {(isActive('hear_r') || isActive('hear_l')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('hear_r') && (
                    <div>
                      <label className={labelClass}>Telinga Kanan</label>
                      <select name="hear_r" value={formData.hear_r || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </div>
                  )}

                  {isActive('hear_l') && (
                    <div>
                      <label className={labelClass}>Telinga Kiri</label>
                      <select name="hear_l" value={formData.hear_l || ''} onChange={handleChange} className={inputClass}>
                        <option value="">- Pilih -</option>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {isActive('hr_stcw') && (
                <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4 mt-6 space-y-4 animate-in fade-in zoom-in duration-300">
                  <h4 className="text-sm font-bold text-blue-900 border-b border-blue-100 pb-2">
                    Standar STCW Code, Section A-I/9 <BadgeILO /><BadgeMLC />
                  </h4>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-sm text-slate-700">Hearing meets the standards in STCW?</span>
                    <div className="flex gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="hr_stcw" value="Yes" checked={formData.hr_stcw === 'Yes'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">Yes</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="hr_stcw" value="No" checked={formData.hr_stcw === 'No'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">No</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="hr_stcw" value="NA" checked={formData.hr_stcw === 'NA'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">N/A</span></label>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-sm text-slate-700">Unaided hearing satisfactory?</span>
                    <div className="flex gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="hr_unaid" value="Yes" checked={formData.hr_unaid === 'Yes'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">Yes</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="hr_unaid" value="No" checked={formData.hr_unaid === 'No'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">No</span></label>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-sm text-slate-700">Visual acuity meets standards in STCW?</span>
                    <div className="flex gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="vis_stcw" value="Yes" checked={formData.vis_stcw === 'Yes'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">Yes</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="vis_stcw" value="No" checked={formData.vis_stcw === 'No'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">No</span></label>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-sm text-slate-700">Colour vision meets standards in STCW?</span>
                    <div className="flex gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="col_stcw" value="Yes" checked={formData.col_stcw === 'Yes'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">Yes</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="col_stcw" value="No" checked={formData.col_stcw === 'No'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">No</span></label>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <span className="text-sm text-slate-700">Are glasses or contact lenses necessary?</span>
                    <div className="flex gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="glasses_nec" value="Yes" checked={formData.glasses_nec === 'Yes'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">Yes</span></label>
                      <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700"><input type="radio" name="glasses_nec" value="No" checked={formData.glasses_nec === 'No'} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-full border border-slate-300 text-slate-900 accent-slate-900 cursor-pointer transition-colors" /><span className="text-xs">No</span></label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}