import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, labelClass, inputClass, radioGroupClass, radioClass, textareaClass, BadgeADNOC, BadgeQatar, BadgeChevron, BadgeILO, BadgeMLC, BadgeMarshall } from './FormConstants';

export default function ConclusionSection({ formData, handleChange }: any) {
  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Kesimpulan & Rekomendasi Medis</h3>
          <p className={cardDescClass}>Deklarasi dokter dan status kelaikan kerja (Fitness for Duty) untuk sertifikat akhir.</p>
      </div>
      <div className={cardContentClass}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Status Kelaikan Kerja (Fit for Duty)</h4>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <label className="text-sm text-slate-700 font-medium col-span-2">Look-out Duty / General <BadgeADNOC/><BadgeQatar/></label>
              <label className={radioGroupClass}><input type="radio" name="fit_lookout" value="Fit" checked={formData.fit_lookout === 'Fit'} onChange={handleChange} className={radioClass} /><span>Fit (Laik)</span></label>
              <label className={radioGroupClass}><input type="radio" name="fit_lookout" value="Unfit" checked={formData.fit_lookout === 'Unfit'} onChange={handleChange} className={radioClass} /><span>Unfit (Tidak Laik)</span></label>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <label className="text-sm text-slate-700 font-medium col-span-2">Deck Service <BadgeILO/><BadgeMLC/></label>
              <label className={radioGroupClass}><input type="radio" name="fit_deck" value="Fit" checked={formData.fit_deck === 'Fit'} onChange={handleChange} className={radioClass} /><span>Fit</span></label>
              <label className={radioGroupClass}><input type="radio" name="fit_deck" value="Unfit" checked={formData.fit_deck === 'Unfit'} onChange={handleChange} className={radioClass} /><span>Unfit</span></label>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <label className="text-sm text-slate-700 font-medium col-span-2">Engine Service <BadgeILO/><BadgeMLC/></label>
              <label className={radioGroupClass}><input type="radio" name="fit_engine" value="Fit" checked={formData.fit_engine === 'Fit'} onChange={handleChange} className={radioClass} /><span>Fit</span></label>
              <label className={radioGroupClass}><input type="radio" name="fit_engine" value="Unfit" checked={formData.fit_engine === 'Unfit'} onChange={handleChange} className={radioClass} /><span>Unfit</span></label>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <label className="text-sm text-slate-700 font-medium col-span-2">Catering Service <BadgeILO/><BadgeMLC/></label>
              <label className={radioGroupClass}><input type="radio" name="fit_catering" value="Fit" checked={formData.fit_catering === 'Fit'} onChange={handleChange} className={radioClass} /><span>Fit</span></label>
              <label className={radioGroupClass}><input type="radio" name="fit_catering" value="Unfit" checked={formData.fit_catering === 'Unfit'} onChange={handleChange} className={radioClass} /><span>Unfit</span></label>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <label className="text-sm text-slate-700 font-medium col-span-2">Other Services <BadgeILO/><BadgeMLC/></label>
              <label className={radioGroupClass}><input type="radio" name="fit_other" value="Fit" checked={formData.fit_other === 'Fit'} onChange={handleChange} className={radioClass} /><span>Fit</span></label>
              <label className={radioGroupClass}><input type="radio" name="fit_other" value="Unfit" checked={formData.fit_other === 'Unfit'} onChange={handleChange} className={radioClass} /><span>Unfit</span></label>
            </div>

          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Restriksi & Deklarasi Medis</h4>
            
            <div>
              <label className={labelClass}>Apakah ada Restriksi/Batasan Medis?</label>
              <div className="flex gap-4 mt-1">
                <label className={radioGroupClass}><input type="radio" name="restrictions" value="Yes" checked={formData.restrictions === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya, Ada Batasan</span></label>
                <label className={radioGroupClass}><input type="radio" name="restrictions" value="No" checked={formData.restrictions === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak Ada (Without Restrictions)</span></label>
              </div>
            </div>
            
            {formData.restrictions === 'Yes' && (
              <div>
                <label className={labelClass}>Deskripsi Restriksi <span className="text-[10px] text-slate-500 font-normal ml-1">(Batas angkat beban, dsb)</span></label>
                <input type="text" name="rest_desc" value={formData.rest_desc || ''} onChange={handleChange} className={inputClass} placeholder="Jelaskan batasan medisnya..." />
              </div>
            )}

            <div className="pt-2">
              <label className={labelClass}>Bebas dari Kondisi Medis yang Membahayakan? <BadgeILO/><BadgeMLC/><BadgeMarshall/></label>
              <div className="flex gap-4 mt-1">
                <label className={radioGroupClass}><input type="radio" name="free_cond" value="Yes" checked={formData.free_cond === 'Yes'} onChange={handleChange} className={radioClass} /><span>Ya (Free from condition)</span></label>
                <label className={radioGroupClass}><input type="radio" name="free_cond" value="No" checked={formData.free_cond === 'No'} onChange={handleChange} className={radioClass} /><span>Tidak (Ada kondisi berbahaya)</span></label>
              </div>
            </div>

            <div className="pt-2">
              <label className={labelClass}>Tindakan/Rujukan yang Diambil <BadgeILO/><BadgeMLC/></label>
              <input type="text" name="action_taken" value={formData.action_taken || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: Tidak ada / Rujuk ke Spesialis" />
            </div>

          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h4 className="font-semibold text-slate-900 mb-4">Administrasi Dokter & Sertifikat</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><label className={labelClass}>Tanggal Pemeriksaan</label><input type="date" name="date" value={formData.date || ''} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Tanggal Kedaluwarsa (Expiry)</label><input type="date" name="exp_date" value={formData.exp_date || ''} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Nama Dokter Pemeriksa</label><input type="text" name="eps" value={formData.eps || ''} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Nama Klinik / RS</label><input type="text" name="hospital" value={formData.hospital || ''} onChange={handleChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Otoritas Penerbit (Certificating Authority) <BadgeILO/><BadgeMarshall/></label><input type="text" name="cert_auth" value={formData.cert_auth || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: Ministry of Health / RS Pelabuhan" /></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div><label className={labelClass}>Komentar Dokter (Comments) <BadgeChevron/><BadgeMLC/><BadgeMarshall/></label><textarea name="comments" value={formData.comments || ''} onChange={handleChange} className={`${textareaClass} h-20`} placeholder="Komentar tambahan dokter..."></textarea></div>
            <div><label className={labelClass}>Saran Khusus (Suggestion) <BadgeChevron/></label><textarea name="suggestion" value={formData.suggestion || ''} onChange={handleChange} className={`${textareaClass} h-20`} placeholder="Saran penanganan medis..."></textarea></div>
          </div>
        </div>

      </div>
    </div>
  );
}