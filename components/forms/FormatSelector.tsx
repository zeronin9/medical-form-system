import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  checkboxClass,
} from './FormConstants';

interface FormatSelectorProps {
  selectedFormats: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Peta warna statis agar Tailwind bisa mendeteksi class saat build
const COLOR_STYLES: Record<
  string,
  { container: string; text: string }
> = {
  teal: {
    container: 'bg-teal-50 border-teal-300 ring-1 ring-teal-300',
    text: 'text-teal-900',
  },
  orange: {
    container: 'bg-orange-50 border-orange-300 ring-1 ring-orange-300',
    text: 'text-orange-900',
  },
  blue: {
    container: 'bg-blue-50 border-blue-300 ring-1 ring-blue-300',
    text: 'text-blue-900',
  },
  purple: {
    container: 'bg-purple-50 border-purple-300 ring-1 ring-purple-300',
    text: 'text-purple-900',
  },
  indigo: {
    container: 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300',
    text: 'text-indigo-900',
  },
  rose: {
    container: 'bg-rose-50 border-rose-300 ring-1 ring-rose-300',
    text: 'text-rose-900',
  },
};

const FORMATS = [
  { id: 'chevron', label: 'Format Chevron', color: 'teal' },
  { id: 'qatarenergy', label: 'Format QatarEnergy', color: 'orange' },
  { id: 'ilo', label: 'Format ILO (Pelaut)', color: 'blue' },
  { id: 'mlc', label: 'Format MLC', color: 'purple' },
  { id: 'adnoc', label: 'Format ADNOC', color: 'indigo' },
  { id: 'marshall', label: 'Format Marshall', color: 'rose' },
] as const;

export default function FormatSelector({
  selectedFormats,
  handleCheckboxChange,
}: FormatSelectorProps) {
  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Pemilihan Dokumen Cetak</h3>
        <p className={cardDescClass}>
          Pilih satu atau beberapa format yang akan dicetak sekaligus.
        </p>
      </div>
      <div className={cardContentClass}>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {FORMATS.map((fmt) => {
            const isSelected = selectedFormats.includes(fmt.id);
            const colorStyle = COLOR_STYLES[fmt.color];

            return (
              <label
                key={fmt.id}
                className={`flex items-center space-x-3 border border-slate-200 rounded-lg p-4 cursor-pointer transition-colors w-full sm:w-64 ${
                  isSelected
                    ? colorStyle.container
                    : 'hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  value={fmt.id}
                  onChange={handleCheckboxChange}
                  className={checkboxClass}
                  checked={isSelected}
                />
                <span
                  className={`font-semibold text-sm ${
                    isSelected ? colorStyle.text : ''
                  }`}
                >
                  {fmt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}