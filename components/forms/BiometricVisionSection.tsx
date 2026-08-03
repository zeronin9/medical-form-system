import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, labelClass, inputClass, radioGroupClass, radioClass, BadgeQatar, BadgeADNOC, BadgeMarshall } from './FormConstants';

export default function BiometricVisionSection({ formData, handleChange, selectedFormats }: any) {
  const isQatar = selectedFormats.includes('qatarenergy');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Biometrik Dasar & Penglihatan</h3>
          <p className={cardDescClass}>Tanda-tanda vital dan evaluasi ketajaman visual untuk semua format.</p>
      </div>
      <div className={cardContentClass}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div><label className={labelClass}>Tinggi (cm)</label><input type="number" name="height" value={formData.height} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Berat (kg)</label><input type="number" name="weight" value={formData.weight} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>BMI (Auto)</label><input type="text" value={formData.bmi} readOnly className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`} /></div>
          <div><label className={labelClass}>Tensi (120/80)</label><input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Nadi (Pulse)</label><input type="number" name="pulse" value={formData.pulse} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Pernapasan (RR)</label><input type="number" name="rr" value={formData.rr} onChange={handleChange} className={inputClass} /></div>
          
          {isQatar && <div><label className={labelClass}>Lingkar Pinggang <BadgeQatar/></label><input type="number" name="waist" value={formData.waist} onChange={handleChange} className={inputClass} /></div>}
          <div><label className={labelClass}>Suhu (°C)</label><input type="number" name="temp" value={formData.temp} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Ekspansi Dada <BadgeADNOC/></label><input type="text" name="chest_exp" value={formData.chest_exp} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Penampilan (Gen App)</label><input type="text" name="gen_app" value={formData.gen_app} onChange={handleChange} className={inputClass} /></div>

          <div>
            <label className={labelClass}>Gol. Darah</label>
            <select name="bloodGroupType" value={formData.bloodGroupType} onChange={handleChange} className={inputClass}>
              <option value="">-Pilih-</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Rhesus (Rh)</label>
            <select name="bloodGroupRh" value={formData.bloodGroupRh} onChange={handleChange} className={inputClass}>
              <option value="">-Pilih-</option><option value="+">Pos (+)</option><option value="-">Neg (-)</option>
            </select>
          </div>
        </div>

        <div className="border-t border-slate-100 my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-slate-200 p-5 shadow-sm">
            <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Tanpa Kacamata (Uncorrected)</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div><label className={labelClass}>Jauh (Kanan)</label><input type="text" name="disr_unc" value={formData.disr_unc} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Jauh (Kiri)</label><input type="text" name="disl_unc" value={formData.disl_unc} onChange={handleChange} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div><label className={labelClass}>Dekat (Kanan)</label><input type="text" name="nearr_unc" value={formData.nearr_unc} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Dekat (Kiri)</label><input type="text" name="nearl_unc" value={formData.nearl_unc} onChange={handleChange} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Penglihatan Binokular</label><input type="text" name="bv_unc" value={formData.bv_unc} onChange={handleChange} className={inputClass} /></div>
          </div>
          
          <div className="rounded-lg border border-slate-200 p-5 shadow-sm">
            <h4 className="font-semibold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">Dengan Kacamata (Corrected)</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div><label className={labelClass}>Jauh (Kanan)</label><input type="text" name="disr_cor" value={formData.disr_cor} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Jauh (Kiri)</label><input type="text" name="disl_cor" value={formData.disl_cor} onChange={handleChange} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div><label className={labelClass}>Dekat (Kanan)</label><input type="text" name="nearr_cor" value={formData.nearr_cor} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Dekat (Kiri)</label><input type="text" name="nearl_cor" value={formData.nearl_cor} onChange={handleChange} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Penglihatan Binokular</label><input type="text" name="bv_cor" value={formData.bv_cor} onChange={handleChange} className={inputClass} /></div>
          </div>

          <div className="md:col-span-2 rounded-lg border border-slate-200 p-5 shadow-sm bg-slate-50/50">
              <label className="font-semibold text-sm text-slate-900 mb-3 block">Tes Buta Warna & Pendengaran Dasar:</label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-2 block">Color Vision Hasil</label>
                    <div className="flex gap-4">
                        <label className={radioGroupClass}><input type="radio" name="color_vision" value="Normal" checked={formData.color_vision === 'Normal'} onChange={handleChange} className={radioClass} /> <span>Normal</span></label>
                        <label className={radioGroupClass}><input type="radio" name="color_vision" value="Partial" checked={formData.color_vision === 'Partial'} onChange={handleChange} className={radioClass} /> <span>Parsial</span></label>
                        <label className={radioGroupClass}><input type="radio" name="color_vision" value="Total" checked={formData.color_vision === 'Total'} onChange={handleChange} className={radioClass} /> <span>Total</span></label>
                    </div>
                  </div>
                  <div>
                     <label className="text-xs font-semibold text-slate-500 mb-2 block">Metode Tes Warna <BadgeMarshall/></label>
                     <select name="color_test_type" value={formData.color_test_type} onChange={handleChange} className={inputClass}>
                        <option value="Book">Buku (Ishihara)</option>
                        <option value="Lantern">Lantern</option>
                     </select>
                  </div>
                  <div className="flex gap-4">
                      <div><label className="text-xs font-semibold text-slate-500 mb-2 block">Dengar (Kanan)</label>
                        <select name="hear_r" value={formData.hear_r} onChange={handleChange} className={inputClass}><option value="">Pilih</option><option value="Normal">Normal</option><option value="Abnormal">Abnormal</option></select>
                      </div>
                      <div><label className="text-xs font-semibold text-slate-500 mb-2 block">Dengar (Kiri)</label>
                        <select name="hear_l" value={formData.hear_l} onChange={handleChange} className={inputClass}><option value="">Pilih</option><option value="Normal">Normal</option><option value="Abnormal">Abnormal</option></select>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}