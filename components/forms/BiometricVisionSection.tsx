import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, labelClass, inputClass, radioGroupClass, radioClass, BadgeADNOC, BadgeQatar, BadgeChevron, BadgeILO, BadgeMLC, BadgeMarshall } from './FormConstants';

export default function BiometricVisionSection({ formData, handleChange, selectedFormats }: any) {
  const isChevron = selectedFormats.includes('chevron');
  const isQatar = selectedFormats.includes('qatarenergy');
  const isMlc = selectedFormats.includes('mlc');
  const isIlo = selectedFormats.includes('ilo');
  const isMarshall = selectedFormats.includes('marshall');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Biometrik, Penglihatan & Pendengaran</h3>
          <p className={cardDescClass}>Tanda-tanda vital dan tes sensorik dasar.</p>
      </div>
      <div className={cardContentClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Biometrik Dasar */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Tanda Vital & Biometrik</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Tinggi Badan (cm)</label><input type="number" name="height" value={formData.height || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Berat Badan (kg)</label><input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>BMI (Otomatis)</label><input type="text" name="bmi" value={formData.bmi || ''} readOnly className={`${inputClass} bg-slate-100 font-semibold text-slate-600`} /></div>
              {(isQatar || isChevron) && (
                <div><label className={labelClass}>Lingkar Pinggang (cm) <BadgeQatar/></label><input type="text" name="waist" value={formData.waist || ''} onChange={handleChange} className={inputClass} /></div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Tekanan Darah (mmHg)</label><input type="text" name="bloodPressure" value={formData.bloodPressure || ''} onChange={handleChange} className={inputClass} placeholder="Cth: 120/80" /></div>
              <div><label className={labelClass}>Denyut Nadi (x/mnt)</label><input type="text" name="pulse" value={formData.pulse || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Pernapasan (RR)</label><input type="text" name="rr" value={formData.rr || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Suhu Tubuh (°C)</label><input type="text" name="temp" value={formData.temp || ''} onChange={handleChange} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className={labelClass}>Golongan Darah</label>
                <select name="bloodGroupType" value={formData.bloodGroupType || ''} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option></select>
              </div>
              <div>
                <label className={labelClass}>Rhesus (Rh)</label>
                <select name="bloodGroupRh" value={formData.bloodGroupRh || ''} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="+">Positif (+)</option><option value="-">Negatif (-)</option></select>
              </div>
            </div>
            <div className="pt-2">
              <div><label className={labelClass}>Ekspansi Dada (Chest Exp) <BadgeADNOC/></label><input type="text" name="chest_exp" value={formData.chest_exp || ''} onChange={handleChange} className={inputClass} /></div>
            </div>
          </div>

          {/* Penglihatan & Pendengaran */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Penglihatan (Visual Acuity)</h4>
            
            <div className="grid grid-cols-3 gap-2">
              <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Jauh (Tanpa Kacamata)</label>
              <div><label className={labelClass}>Kanan</label><input type="text" name="disr_unc" value={formData.disr_unc || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Kiri</label><input type="text" name="disl_unc" value={formData.disl_unc || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Binocular <BadgeMLC/><BadgeChevron/></label><input type="text" name="bv_unc" value={formData.bv_unc || ''} onChange={handleChange} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Jauh (Dengan Kacamata)</label>
              <div><label className={labelClass}>Kanan</label><input type="text" name="disr_cor" value={formData.disr_cor || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Kiri</label><input type="text" name="disl_cor" value={formData.disl_cor || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Binocular <BadgeMLC/><BadgeChevron/></label><input type="text" name="bv_cor" value={formData.bv_cor || ''} onChange={handleChange} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Dekat (Tanpa Kacamata)</label>
              <div><label className={labelClass}>Kanan</label><input type="text" name="nearr_unc" value={formData.nearr_unc || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Kiri</label><input type="text" name="nearl_unc" value={formData.nearl_unc || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Binocular <BadgeMLC/></label><input type="text" name="near_bv_unc" value={formData.near_bv_unc || ''} onChange={handleChange} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <label className="text-xs font-semibold text-slate-500 col-span-3">Jarak Dekat (Dengan Kacamata)</label>
              <div><label className={labelClass}>Kanan</label><input type="text" name="nearr_cor" value={formData.nearr_cor || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Kiri</label><input type="text" name="nearl_cor" value={formData.nearl_cor || ''} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Binocular <BadgeMLC/></label><input type="text" name="near_bv_cor" value={formData.near_bv_cor || ''} onChange={handleChange} className={inputClass} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className={labelClass}>Tes Buta Warna</label>
                <select name="color_vision" value={formData.color_vision || ''} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Normal">Normal</option><option value="Partial">Parsial (Partial Defect)</option><option value="Total">Total (Total Defect)</option></select>
              </div>
              <div>
                <label className={labelClass}>Tipe Tes Warna <BadgeILO/><BadgeMarshall/></label>
                <select name="color_test_type" value={formData.color_test_type || ''} onChange={handleChange} className={inputClass}><option value="Book">Ishihara Book</option><option value="Lantern">Lantern</option></select>
              </div>
            </div>

            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2 mt-6">Pendengaran (Bicara/Bisik)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Telinga Kanan</label>
                <select name="hear_r" value={formData.hear_r || ''} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Normal">Normal</option><option value="Abnormal">Abnormal</option></select>
              </div>
              <div>
                <label className={labelClass}>Telinga Kiri</label>
                <select name="hear_l" value={formData.hear_l || ''} onChange={handleChange} className={inputClass}><option value="">- Pilih -</option><option value="Normal">Normal</option><option value="Abnormal">Abnormal</option></select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}