import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, inputClass, radioGroupClass, radioClass, physicalExams } from './FormConstants';

export default function PhysicalExamSection({ formData, handleChange }: any) {
  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Pemeriksaan Klinis (Fisik)</h3>
          <p className={cardDescClass}>Pemeriksaan sistemik tubuh. Jika "Abnormal", pastikan mengisi kolom keterangan.</p>
      </div>
      <div className={cardContentClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {physicalExams.map(p => (
            <div key={p.id} className="rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col gap-3 hover:border-slate-300 transition-colors">
              <span className="text-sm font-medium text-slate-900">{p.label}</span>
              <div className="flex flex-col xl:flex-row xl:items-center gap-4 justify-between">
                <div className="flex gap-4 shrink-0">
                  <label className={radioGroupClass}>
                    <input type="radio" name={p.id} value="Normal" checked={formData[p.id] === 'Normal'} onChange={handleChange} className={radioClass} /><span>Normal</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input type="radio" name={p.id} value="Abnormal" checked={formData[p.id] === 'Abnormal'} onChange={handleChange} className={radioClass} /><span>Abnormal</span>
                  </label>
                </div>
                {/* PERBAIKAN DI SINI: Menambahkan || '' agar tidak undefined */}
                <input 
                  type="text" 
                  name={`${p.id}_r`} 
                  value={formData[`${p.id}_r`] || ''} 
                  placeholder="Keterangan kelainan..." 
                  onChange={handleChange} 
                  className={inputClass} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}