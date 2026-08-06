import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
} from './FormConstants';

interface PhysicalExamSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  selectedFormats: string[];
  activeFields: string[];
}

export default function PhysicalExamSection({
  formData,
  handleChange,
  selectedFormats,
  activeFields,
}: PhysicalExamSectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const showCardiovascular =
    isActive('cv_pulse') ||
    isActive('cv_bp') ||
    isActive('cv_apex') ||
    isActive('cv_sounds') ||
    isActive('cv_murmurs') ||
    isActive('cv_varicose') ||
    isActive('cv_comm');

  const showRespiratory =
    isActive('rs_nasal') ||
    isActive('rs_thyroid') ||
    isActive('rs_trachea') ||
    isActive('rs_chest') ||
    isActive('rs_perc') ||
    isActive('rs_air') ||
    isActive('rs_breath') ||
    isActive('rs_advent') ||
    isActive('rs_comm');

  const showAbdominal =
    isActive('al_teeth') ||
    isActive('al_tongue') ||
    isActive('al_abd') ||
    isActive('al_liver') ||
    isActive('al_spleen') ||
    isActive('al_lymph') ||
    isActive('al_hernia') ||
    isActive('al_anus') ||
    isActive('al_comm');

  const showGenitourinary =
    isActive('gu_kidney') ||
    isActive('gu_gen') ||
    isActive('gu_comm');

  const showIntegument =
    isActive('in_hair') ||
    isActive('in_skin') ||
    isActive('in_nails') ||
    isActive('in_comm');

  const showMusculoskeletal =
    isActive('ms_hands') ||
    isActive('ms_limbs') ||
    isActive('ms_back') ||
    isActive('ms_joints') ||
    isActive('ms_inj') ||
    isActive('ms_comm');

  const showNeurological =
    isActive('ns_power') ||
    isActive('ns_tone') ||
    isActive('ns_coord') ||
    isActive('ns_sens') ||
    isActive('ns_intel') ||
    isActive('ns_emot') ||
    isActive('ns_comm') ||
    isActive('r_bl_r') ||
    isActive('r_tl_r') ||
    isActive('r_sup_r') ||
    isActive('r_kn_r') ||
    isActive('r_an_r') ||
    isActive('r_pl_r') ||
    isActive('r_bl_l') ||
    isActive('r_tl_l') ||
    isActive('r_sup_l') ||
    isActive('r_kn_l') ||
    isActive('r_an_l') ||
    isActive('r_pl_l');

  const showEar =
    isActive('ea_meatus') ||
    isActive('ea_drums') ||
    isActive('ea_comm') ||
    isActive('ea_wr_r') ||
    isActive('ea_wr_l') ||
    isActive('ea_hr_r') ||
    isActive('ea_hr_l');

  const showEye =
    isActive('ey_light') ||
    isActive('ey_accom') ||
    isActive('ey_nyst') ||
    isActive('ey_fundi') ||
    isActive('ey_comm');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Pemeriksaan Fisik</h3>
        <p className={cardDescClass}>
          Isi temuan pemeriksaan fisik sesuai kebutuhan format yang dipilih.
        </p>
      </div>

      <div className={cardContentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {showCardiovascular && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Kardiovaskular
              </h4>

              {(isActive('cv_pulse') || isActive('cv_bp')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('cv_pulse') && (
                    <div>
                      <label className={labelClass}>Pulse</label>
                      <input
                        type="text"
                        name="cv_pulse"
                        value={formData.cv_pulse || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                  {isActive('cv_bp') && (
                    <div>
                      <label className={labelClass}>Blood Pressure</label>
                      <input
                        type="text"
                        name="cv_bp"
                        value={formData.cv_bp || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {(isActive('cv_apex') || isActive('cv_sounds')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('cv_apex') && (
                    <div>
                      <label className={labelClass}>Apex Beat</label>
                      <input
                        type="text"
                        name="cv_apex"
                        value={formData.cv_apex || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                  {isActive('cv_sounds') && (
                    <div>
                      <label className={labelClass}>Heart Sounds</label>
                      <input
                        type="text"
                        name="cv_sounds"
                        value={formData.cv_sounds || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {(isActive('cv_murmurs') || isActive('cv_varicose')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('cv_murmurs') && (
                    <div>
                      <label className={labelClass}>Murmurs</label>
                      <input
                        type="text"
                        name="cv_murmurs"
                        value={formData.cv_murmurs || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                  {isActive('cv_varicose') && (
                    <div>
                      <label className={labelClass}>Varicose Veins</label>
                      <input
                        type="text"
                        name="cv_varicose"
                        value={formData.cv_varicose || ''}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {isActive('cv_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input
                    type="text"
                    name="cv_comm"
                    value={formData.cv_comm || ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          )}

          {showRespiratory && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Respirasi
              </h4>

              {(isActive('rs_nasal') || isActive('rs_thyroid')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('rs_nasal') && (
                    <div>
                      <label className={labelClass}>Nasal</label>
                      <input type="text" name="rs_nasal" value={formData.rs_nasal || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                  {isActive('rs_thyroid') && (
                    <div>
                      <label className={labelClass}>Thyroid</label>
                      <input type="text" name="rs_thyroid" value={formData.rs_thyroid || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              )}

              {(isActive('rs_trachea') || isActive('rs_chest')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('rs_trachea') && (
                    <div>
                      <label className={labelClass}>Trachea</label>
                      <input type="text" name="rs_trachea" value={formData.rs_trachea || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                  {isActive('rs_chest') && (
                    <div>
                      <label className={labelClass}>Chest</label>
                      <input type="text" name="rs_chest" value={formData.rs_chest || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              )}

              {(isActive('rs_perc') || isActive('rs_air')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('rs_perc') && (
                    <div>
                      <label className={labelClass}>Percussion</label>
                      <input type="text" name="rs_perc" value={formData.rs_perc || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                  {isActive('rs_air') && (
                    <div>
                      <label className={labelClass}>Air Entry</label>
                      <input type="text" name="rs_air" value={formData.rs_air || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              )}

              {(isActive('rs_breath') || isActive('rs_advent')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('rs_breath') && (
                    <div>
                      <label className={labelClass}>Breath Sounds</label>
                      <input type="text" name="rs_breath" value={formData.rs_breath || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                  {isActive('rs_advent') && (
                    <div>
                      <label className={labelClass}>Adventitious Sound</label>
                      <input type="text" name="rs_advent" value={formData.rs_advent || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  )}
                </div>
              )}

              {isActive('rs_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="rs_comm" value={formData.rs_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {showAbdominal && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Abdomen & Alimentari
              </h4>

              {(isActive('al_teeth') || isActive('al_tongue')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('al_teeth') && <div><label className={labelClass}>Teeth</label><input type="text" name="al_teeth" value={formData.al_teeth || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('al_tongue') && <div><label className={labelClass}>Tongue</label><input type="text" name="al_tongue" value={formData.al_tongue || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('al_abd') || isActive('al_liver')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('al_abd') && <div><label className={labelClass}>Abdomen</label><input type="text" name="al_abd" value={formData.al_abd || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('al_liver') && <div><label className={labelClass}>Liver</label><input type="text" name="al_liver" value={formData.al_liver || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('al_spleen') || isActive('al_lymph')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('al_spleen') && <div><label className={labelClass}>Spleen</label><input type="text" name="al_spleen" value={formData.al_spleen || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('al_lymph') && <div><label className={labelClass}>Lymph Nodes</label><input type="text" name="al_lymph" value={formData.al_lymph || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('al_hernia') || isActive('al_anus')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('al_hernia') && <div><label className={labelClass}>Hernia</label><input type="text" name="al_hernia" value={formData.al_hernia || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('al_anus') && <div><label className={labelClass}>Anus</label><input type="text" name="al_anus" value={formData.al_anus || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('al_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="al_comm" value={formData.al_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {showGenitourinary && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Genitourinary
              </h4>

              {(isActive('gu_kidney') || isActive('gu_gen')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('gu_kidney') && <div><label className={labelClass}>Kidney</label><input type="text" name="gu_kidney" value={formData.gu_kidney || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('gu_gen') && <div><label className={labelClass}>Genitalia</label><input type="text" name="gu_gen" value={formData.gu_gen || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('gu_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="gu_comm" value={formData.gu_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {showIntegument && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Integumen
              </h4>

              {(isActive('in_hair') || isActive('in_skin') || isActive('in_nails')) && (
                <div className="grid grid-cols-3 gap-4">
                  {isActive('in_hair') && <div><label className={labelClass}>Hair</label><input type="text" name="in_hair" value={formData.in_hair || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('in_skin') && <div><label className={labelClass}>Skin</label><input type="text" name="in_skin" value={formData.in_skin || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('in_nails') && <div><label className={labelClass}>Nails</label><input type="text" name="in_nails" value={formData.in_nails || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('in_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="in_comm" value={formData.in_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {showMusculoskeletal && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Muskuloskeletal
              </h4>

              {(isActive('ms_hands') || isActive('ms_limbs')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ms_hands') && <div><label className={labelClass}>Hands</label><input type="text" name="ms_hands" value={formData.ms_hands || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ms_limbs') && <div><label className={labelClass}>Limbs</label><input type="text" name="ms_limbs" value={formData.ms_limbs || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ms_back') || isActive('ms_joints')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ms_back') && <div><label className={labelClass}>Back</label><input type="text" name="ms_back" value={formData.ms_back || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ms_joints') && <div><label className={labelClass}>Joints</label><input type="text" name="ms_joints" value={formData.ms_joints || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ms_inj') || isActive('ms_comm')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ms_inj') && <div><label className={labelClass}>Injury</label><input type="text" name="ms_inj" value={formData.ms_inj || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ms_comm') && <div><label className={labelClass}>Komentar</label><input type="text" name="ms_comm" value={formData.ms_comm || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}
            </div>
          )}

          {showNeurological && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4 lg:col-span-2">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Neurologi
              </h4>

              {(isActive('ns_power') || isActive('ns_tone') || isActive('ns_coord')) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {isActive('ns_power') && <div><label className={labelClass}>Power</label><input type="text" name="ns_power" value={formData.ns_power || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ns_tone') && <div><label className={labelClass}>Tone</label><input type="text" name="ns_tone" value={formData.ns_tone || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ns_coord') && <div><label className={labelClass}>Coordination</label><input type="text" name="ns_coord" value={formData.ns_coord || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ns_sens') || isActive('ns_intel') || isActive('ns_emot')) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {isActive('ns_sens') && <div><label className={labelClass}>Sensation</label><input type="text" name="ns_sens" value={formData.ns_sens || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ns_intel') && <div><label className={labelClass}>Intellect</label><input type="text" name="ns_intel" value={formData.ns_intel || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ns_emot') && <div><label className={labelClass}>Emotion</label><input type="text" name="ns_emot" value={formData.ns_emot || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('ns_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="ns_comm" value={formData.ns_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}

              {(isActive('r_bl_r') ||
                isActive('r_tl_r') ||
                isActive('r_sup_r') ||
                isActive('r_kn_r') ||
                isActive('r_an_r') ||
                isActive('r_pl_r') ||
                isActive('r_bl_l') ||
                isActive('r_tl_l') ||
                isActive('r_sup_l') ||
                isActive('r_kn_l') ||
                isActive('r_an_l') ||
                isActive('r_pl_l')) && (
                <>
                  <label className="text-xs font-semibold text-slate-500 block uppercase tracking-wider border-t border-slate-100 pt-4">
                    Reflexes
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-sm font-semibold text-slate-700">Kanan</h5>
                      {isActive('r_bl_r') && <div><label className={labelClass}>Biceps</label><input type="text" name="r_bl_r" value={formData.r_bl_r || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_tl_r') && <div><label className={labelClass}>Triceps</label><input type="text" name="r_tl_r" value={formData.r_tl_r || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_sup_r') && <div><label className={labelClass}>Supinator</label><input type="text" name="r_sup_r" value={formData.r_sup_r || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_kn_r') && <div><label className={labelClass}>Knee</label><input type="text" name="r_kn_r" value={formData.r_kn_r || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_an_r') && <div><label className={labelClass}>Ankle</label><input type="text" name="r_an_r" value={formData.r_an_r || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_pl_r') && <div><label className={labelClass}>Plantar</label><input type="text" name="r_pl_r" value={formData.r_pl_r || ''} onChange={handleChange} className={inputClass} /></div>}
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-sm font-semibold text-slate-700">Kiri</h5>
                      {isActive('r_bl_l') && <div><label className={labelClass}>Biceps</label><input type="text" name="r_bl_l" value={formData.r_bl_l || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_tl_l') && <div><label className={labelClass}>Triceps</label><input type="text" name="r_tl_l" value={formData.r_tl_l || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_sup_l') && <div><label className={labelClass}>Supinator</label><input type="text" name="r_sup_l" value={formData.r_sup_l || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_kn_l') && <div><label className={labelClass}>Knee</label><input type="text" name="r_kn_l" value={formData.r_kn_l || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_an_l') && <div><label className={labelClass}>Ankle</label><input type="text" name="r_an_l" value={formData.r_an_l || ''} onChange={handleChange} className={inputClass} /></div>}
                      {isActive('r_pl_l') && <div><label className={labelClass}>Plantar</label><input type="text" name="r_pl_l" value={formData.r_pl_l || ''} onChange={handleChange} className={inputClass} /></div>}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {showEar && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Telinga
              </h4>

              {(isActive('ea_meatus') || isActive('ea_drums')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ea_meatus') && <div><label className={labelClass}>Meatus</label><input type="text" name="ea_meatus" value={formData.ea_meatus || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ea_drums') && <div><label className={labelClass}>Drums</label><input type="text" name="ea_drums" value={formData.ea_drums || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ea_wr_r') || isActive('ea_wr_l')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ea_wr_r') && <div><label className={labelClass}>Whisper Right</label><input type="text" name="ea_wr_r" value={formData.ea_wr_r || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ea_wr_l') && <div><label className={labelClass}>Whisper Left</label><input type="text" name="ea_wr_l" value={formData.ea_wr_l || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ea_hr_r') || isActive('ea_hr_l')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ea_hr_r') && <div><label className={labelClass}>Hearing Right</label><input type="text" name="ea_hr_r" value={formData.ea_hr_r || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ea_hr_l') && <div><label className={labelClass}>Hearing Left</label><input type="text" name="ea_hr_l" value={formData.ea_hr_l || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('ea_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="ea_comm" value={formData.ea_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {showEye && (
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Mata
              </h4>

              {(isActive('ey_light') || isActive('ey_accom')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ey_light') && <div><label className={labelClass}>Light Reflex</label><input type="text" name="ey_light" value={formData.ey_light || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ey_accom') && <div><label className={labelClass}>Accommodation</label><input type="text" name="ey_accom" value={formData.ey_accom || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {(isActive('ey_nyst') || isActive('ey_fundi')) && (
                <div className="grid grid-cols-2 gap-4">
                  {isActive('ey_nyst') && <div><label className={labelClass}>Nystagmus</label><input type="text" name="ey_nyst" value={formData.ey_nyst || ''} onChange={handleChange} className={inputClass} /></div>}
                  {isActive('ey_fundi') && <div><label className={labelClass}>Fundi</label><input type="text" name="ey_fundi" value={formData.ey_fundi || ''} onChange={handleChange} className={inputClass} /></div>}
                </div>
              )}

              {isActive('ey_comm') && (
                <div>
                  <label className={labelClass}>Komentar</label>
                  <input type="text" name="ey_comm" value={formData.ey_comm || ''} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}