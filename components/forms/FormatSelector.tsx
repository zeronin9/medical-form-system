import React from 'react';
import { cardClass, cardHeaderClass, cardTitleClass, cardDescClass, cardContentClass, checkboxClass } from './FormConstants';

export default function FormatSelector({ selectedFormats, handleCheckboxChange }: any) {
  const formats = [
    { id: 'chevron', label: 'Format Chevron', color: 'teal' },
    { id: 'qatarenergy', label: 'Format QatarEnergy', color: 'orange' },
    { id: 'ilo', label: 'Format ILO (Pelaut)', color: 'blue' },
    { id: 'mlc', label: 'Format MLC', color: 'purple' },
    { id: 'adnoc', label: 'Format ADNOC', color: 'indigo' },
    { id: 'marshall', label: 'Format Marshall', color: 'rose' }
  ];

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
          <h3 className={cardTitleClass}>Pemilihan Dokumen Cetak</h3>
          <p className={cardDescClass}>Pilih satu atau beberapa format yang akan dicetak sekaligus.</p>
      </div>
      <div className={cardContentClass}>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {formats.map(fmt => {
            const isSelected = selectedFormats.includes(fmt.id);
            return (
              <label key={fmt.id} className={`flex items-center space-x-3 border border-slate-200 rounded-lg p-4 cursor-pointer transition-colors w-full sm:w-64 ${isSelected ? `bg-${fmt.color}-50 border-${fmt.color}-300 ring-1 ring-${fmt.color}-300` : 'hover:bg-slate-50'}`}>
                <input type="checkbox" value={fmt.id} onChange={handleCheckboxChange} className={checkboxClass} checked={isSelected} />
                <span className={`font-semibold text-sm ${isSelected ? `text-${fmt.color}-900` : ''}`}>{fmt.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}