import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, labelClass, inputClass, checkboxGroupClass, checkboxClass, radioGroupClass, radioClass, natureOfWork, vaccines, medicalHistory, familyHistory, BadgeQatar, BadgeADNOC, BadgeChevron, BadgeMarshall } from './FormConstants';

export default function MedicalHistorySection({ formData, handleChange, selectedFormats }: any) {
  const isQatar = selectedFormats.includes('qatarenergy');
  const isChevron = selectedFormats.includes('chevron');
  const isAdnoc = selectedFormats.includes('adnoc');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Kuisioner Medis & Riwayat Penyakit</h3>
          <p className={cardDescClass}>Formulir riwayat pasien. Pengisian ini akan disinkronkan secara otomatis ke seluruh format.</p>
      </div>
      <div className={cardContentClass}>
        
        {/* Sifat Pekerjaan */}
        <div className="space-y-3">
          <label className={labelClass}>Sifat Pekerjaan / Paparan (Centang yang sesuai):</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {natureOfWork.map(n => (
              <label key={n.id} className={checkboxGroupClass}>
                <input type="checkbox" name={n.id} checked={formData[n.id] === true} onChange={handleChange} className={checkboxClass} />
                <span>{n.label}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2 w-full md:w-1/2">
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Lainnya:</span>
              <input type="text" name="nw_others" value={formData.nw_others} onChange={handleChange} className={inputClass} placeholder="Sebutkan paparan lainnya..." />
          </div>
        </div>

        <div className="border-t border-slate-100 my-6"></div>

        {/* Riwayat Penyakit Pribadi */}
        <div className="space-y-4">
          <label className={labelClass}>Riwayat Penyakit Diri Sendiri:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalHistory.map(m => (
              <div key={m.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-slate-700">{m.label}</span>
                <div className="flex gap-4">
                  <label className={radioGroupClass}><input type="radio" name={m.id} value="Yes" checked={formData[m.id] === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name={m.id} value="No" checked={formData[m.id] === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
              <label className={labelClass}>Penyakit Lainnya:</label>
              <input type="text" name="mh_others" value={formData.mh_others} onChange={handleChange} className={inputClass} placeholder="Sebutkan jika ada riwayat penyakit lain..." />
          </div>
        </div>

        <div className="border-t border-slate-100 my-6"></div>

        {/* Riwayat Keluarga */}
        <div className="space-y-4 pb-4">
          <label className={labelClass}>Riwayat Penyakit Keluarga <BadgeQatar /><BadgeADNOC/></label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyHistory.map(f => (
              <div key={f.id} className="flex justify-between items-center rounded-lg border border-slate-200 p-3 shadow-sm bg-slate-50/30">
                <span className="text-sm font-medium text-slate-700">{f.label}</span>
                <div className="flex gap-4">
                  <label className={radioGroupClass}><input type="radio" name={f.id} value="Yes" checked={formData[f.id] === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name={f.id} value="No" checked={formData[f.id] === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label className={labelClass}>Penyakit Keluarga Lainnya:</label>
            <input type="text" name="fm_others" value={formData.fm_others} onChange={handleChange} className={inputClass} placeholder="Sebutkan..." />
          </div>
        </div>
        
        <div className="border-t border-slate-100 my-6"></div>

        {/* Pertanyaan Umum & Gaya Hidup */}
        <div className="space-y-4">
          <label className={labelClass}>Pertanyaan Umum & Gaya Hidup:</label>
          <div className="space-y-3">
            
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-700">1. Pernah menderita penyakit parah / dirawat di RS yang membuat absen kerja?</span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_illness" value="Yes" checked={formData.q_illness === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_illness" value="No" checked={formData.q_illness === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-700">2. Apakah saat ini sedang rutin mengonsumsi obat-obatan?</span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_meds" value="Yes" checked={formData.q_meds === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_meds" value="No" checked={formData.q_meds === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
              {formData.q_meds === 'Yes' && <input type="text" name="q_meds_text" value={formData.q_meds_text} placeholder="Sebutkan nama obat, dosis, dan frekuensi..." onChange={handleChange} className={`${inputClass} mt-4`} />}
            </div>

            <div className="rounded-lg border border-slate-200 p-4 transition-all bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-900">3. Apakah Anda merokok?</span>
                <div className="flex flex-wrap items-center gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_smoke" value="Yes" checked={formData.q_smoke === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_smoke" value="No" checked={formData.q_smoke === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                  <label className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700 sm:ml-4 sm:pl-4 sm:border-l border-slate-300">
                    <input type="checkbox" name="smoker_q" checked={formData.smoker_q === 'Yes'} onChange={(e) => handleChange({ target: { name: 'smoker_q', value: e.target.checked ? 'Yes' : 'No' } })} className={checkboxClass} /> <span>Sudah Berhenti (Quit)</span> <BadgeChevron />
                  </label>
                </div>
              </div>
              
              {formData.q_smoke === 'Yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div><label className={labelClass}>Jenis Rokok</label><input type="text" name="q_smoke_text" value={formData.q_smoke_text} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Frekuensi: btg/hari <BadgeQatar /></label><input type="text" name="q_smoke_freq" value={formData.q_smoke_freq} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Total tahun merokok <BadgeChevron /></label><input type="number" name="smoker_y" value={formData.smoker_y} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Jumlah batang/hari <BadgeChevron /></label><input type="number" name="smoker_d" value={formData.smoker_d} onChange={handleChange} className={inputClass} /></div>
                </div>
              )}
              {formData.smoker_q === 'Yes' && (
                <div className="mt-4 sm:w-1/2">
                  <label className={labelClass}>Lama berhenti (tahun) <BadgeChevron /></label>
                  <input type="number" name="smoker_s_y" value={formData.smoker_s_y} onChange={handleChange} className={inputClass} />
                </div>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 p-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-700">4. Mengonsumsi alkohol atau narkoba (obat rekreasi)?</span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="Yes" checked={formData.q_alcohol === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_alcohol" value="No" checked={formData.q_alcohol === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
              {formData.q_alcohol === 'Yes' && <input type="text" name="q_alcohol_text" value={formData.q_alcohol_text} placeholder="Jenis, frekuensi, & volume per minggu..." onChange={handleChange} className={`${inputClass} mt-4`} />}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
              <label className="text-sm font-bold text-slate-900 mb-1 block">Kuisioner Tambahan Kepatuhan & Mental:</label>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Punya riwayat Evakuasi Medis / Dipulangkan karena sakit?</span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_medevac" value="Yes" checked={formData.q_medevac === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_medevac" value="No" checked={formData.q_medevac === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
              {formData.q_medevac === 'Yes' && <input type="text" name="q_medevac_text" value={formData.q_medevac_text} placeholder="Jelaskan alasannya..." onChange={handleChange} className={inputClass} />}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Pernah ditolak Sertifikat Medis (Unfit for Duty)?</span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_omfc" value="Yes" checked={formData.q_omfc === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_omfc" value="No" checked={formData.q_omfc === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
              {formData.q_omfc === 'Yes' && <input type="text" name="q_omfc_text" value={formData.q_omfc_text} placeholder="Apa alasannya..." onChange={handleChange} className={inputClass} />}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Punya fobia? (Ketinggian, laut, dll) <BadgeQatar /><BadgeADNOC/></span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_fear" value="Yes" checked={formData.q_fear === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_fear" value="No" checked={formData.q_fear === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Sedang mengalami stres yang tidak biasa / berat? <BadgeQatar /></span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="q_stress" value="Yes" checked={formData.q_stress === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_stress" value="No" checked={formData.q_stress === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Apakah hidup Anda penuh tekanan? (Skala 1-10) <BadgeQatar /></span>
                <div className="flex items-center gap-4 shrink-0">
                  {formData.q_stressful === 'Yes' && (
                    <input type="number" name="q_stress_score" value={formData.q_stress_score} min="1" max="10" placeholder="Skor" onChange={handleChange} className="flex h-8 w-20 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-950" />
                  )}
                  <label className={radioGroupClass}><input type="radio" name="q_stressful" value="Yes" checked={formData.q_stressful === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="q_stressful" value="No" checked={formData.q_stressful === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 mt-2">
                <span className="text-sm font-medium text-slate-700 flex items-center flex-wrap gap-1">Apakah sudah divaksin sesuai standar WHO? <BadgeMarshall /></span>
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}><input type="radio" name="vaccinated" value="Yes" checked={formData.vaccinated === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                  <label className={radioGroupClass}><input type="radio" name="vaccinated" value="No" checked={formData.vaccinated === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                </div>
              </div>
            </div>

            {/* Vaksinasi Khusus (Qatar) */}
            {isQatar && (
              <div className="rounded-lg border border-slate-200 p-4">
                <label className="text-sm font-bold text-slate-900 mb-4 block">Riwayat Vaksinasi Khusus <BadgeQatar /></label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {vaccines.map(v => (
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
                        {/* PENAMBAHAN OPSI NOT SURE DI SINI */}
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

            <div className="rounded-lg border border-slate-200 p-4 bg-pink-50/30 border-pink-200">
              <h4 className="font-semibold text-sm text-pink-900 mb-4 pb-2 border-b border-pink-100">Khusus Pelaut Wanita (Female)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className={labelClass}>Tanggal Haid Terakhir (LMP)</label><input type="date" name="f_lmp" value={formData.f_lmp} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Jumlah Kehamilan</label><input type="number" name="f_preg_no" value={formData.f_preg_no} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Jumlah Kelahiran Hidup</label><input type="number" name="f_live_birth" value={formData.f_live_birth} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}