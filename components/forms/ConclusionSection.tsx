import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, labelClass, inputClass, textareaClass, radioGroupClass, radioClass, BadgeILO, BadgeMLC, BadgeADNOC, BadgeMarshall } from './FormConstants';

export default function ConclusionSection({ formData, handleChange }: any) {
  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Kesimpulan Dokter & Administrasi Sertifikat</h3>
          <p className={cardDescClass}>Status kelaikan akhir pelaut/pegawai yang akan dicetak di semua format.</p>
      </div>
      <div className={cardContentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kolom Kiri: Status Kelaikan */}
          <div className="space-y-6">
             <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Status Kelaikan Utama</h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Merasa sehat saat ini? (Fit)</span>
                      <div className="flex gap-4">
                        <label className={radioGroupClass}><input type="radio" name="q_fit" value="Yes" checked={formData.q_fit === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="q_fit" value="No" checked={formData.q_fit === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Bebas dari kondisi menular?</span>
                      <div className="flex gap-4">
                        <label className={radioGroupClass}><input type="radio" name="free_cond" value="Yes" checked={formData.free_cond === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya</span></label>
                        <label className={radioGroupClass}><input type="radio" name="free_cond" value="No" checked={formData.free_cond === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak</span></label>
                      </div>
                   </div>
                </div>
             </div>

             <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">Rincian Kelaikan Kerja <BadgeILO/><BadgeMLC/><BadgeADNOC/><BadgeMarshall/></h4>
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2">
                      <label className={labelClass}>Status Kelaikan Umum (ADNOC & Marshall)</label>
                      <select name="fit_lookout" value={formData.fit_lookout} onChange={handleChange} className={`${inputClass} font-bold text-slate-900 bg-slate-50`}><option value="">- Pilih -</option><option value="Fit">Laik (Fit for duty)</option><option value="Unfit">Tidak Laik (Unfit)</option></select>
                   </div>
                   <div className="border-t border-slate-100 col-span-2 my-1"></div>
                   <div>
                      <label className={labelClass}>Dinas Dek (Deck)</label>
                      <select name="fit_deck" value={formData.fit_deck} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Fit">Laik (Fit)</option><option value="Unfit">Tidak Laik</option></select>
                   </div>
                   <div>
                      <label className={labelClass}>Dinas Mesin (Engine)</label>
                      <select name="fit_engine" value={formData.fit_engine} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Fit">Laik (Fit)</option><option value="Unfit">Tidak Laik</option></select>
                   </div>
                   <div>
                      <label className={labelClass}>Dinas Katering</label>
                      <select name="fit_catering" value={formData.fit_catering} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Fit">Laik (Fit)</option><option value="Unfit">Tidak Laik</option></select>
                   </div>
                </div>
             </div>

             <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Pembatasan Medis (Restrictions)</h4>
                <div className="flex gap-4 mb-4">
                   <label className={radioGroupClass}><input type="radio" name="restrictions" value="No" checked={formData.restrictions === 'No'} onChange={handleChange} className={radioClass} /><span>Tanpa Pembatasan</span></label>
                   <label className={radioGroupClass}><input type="radio" name="restrictions" value="Yes" checked={formData.restrictions === 'Yes'} onChange={handleChange} className={radioClass} /><span>Dengan Pembatasan</span></label>
                </div>
                <div className="space-y-4">
                   <div><label className={labelClass}>Detail Pembatasan</label><input type="text" name="rest_desc" value={formData.rest_desc} placeholder="Jelaskan pembatasan jika ada..." onChange={handleChange} className={inputClass} /></div>
                   <div><label className={labelClass}>Tindakan Medis yang Diambil</label><input type="text" name="action_taken" value={formData.action_taken} placeholder="Tindakan/Resep..." onChange={handleChange} className={inputClass} /></div>
                </div>
             </div>
          </div>

          {/* Kolom Kanan: Narasi Dokter & TTD */}
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
              <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Catatan Medis</h4>
              <div className="space-y-4">
                <div><label className={labelClass}>Kesimpulan Medis (Summary)</label><textarea name="summary" value={formData.summary} onChange={handleChange} className={textareaClass}></textarea></div>
                <div><label className={labelClass}>Saran Tindak Lanjut (Suggestion)</label><textarea name="suggestion" value={formData.suggestion} onChange={handleChange} className={textareaClass}></textarea></div>
                <div><label className={labelClass}>Komentar Khusus / Tindakan Tambahan</label><textarea name="comments" value={formData.comments} onChange={handleChange} className={textareaClass}></textarea></div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 p-5 shadow-sm bg-blue-50/50">
              <h4 className="font-semibold text-sm text-blue-900 mb-4 pb-2 border-b border-blue-200">Administrasi & Pengesahan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Tanggal Pemeriksaan</label><input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} /></div>
                <div><label className={`${labelClass} text-blue-700`}>Masa Berlaku (Expiry Date)</label><input type="date" name="exp_date" value={formData.exp_date} onChange={handleChange} className={`${inputClass} border-blue-300 focus-visible:ring-blue-500`} /></div>
                <div><label className={labelClass}>Nama Dokter Pemeriksa</label><input type="text" name="eps" value={formData.eps} onChange={handleChange} className={inputClass} placeholder="Contoh: dr. Andi" /></div>
                <div><label className={labelClass}>Nama Klinik / RS</label><input type="text" name="hospital" value={formData.hospital} onChange={handleChange} className={inputClass} placeholder="Nama Fasilitas" /></div>
                <div className="sm:col-span-2"><label className={labelClass}>Otoritas Penerbit (Contoh: Kemenkes RI)</label><input type="text" name="cert_auth" value={formData.cert_auth} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}