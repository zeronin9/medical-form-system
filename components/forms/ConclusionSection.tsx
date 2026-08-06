import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
  radioGroupClass,
  radioClass,
  textareaClass,
  BadgeADNOC,
  BadgeILO,
  BadgeMLC,
  BadgeMarshall,
} from './FormConstants';

interface ConclusionSectionProps {
  formData: any;
  handleChange: (e: any) => void;
  selectedFormats: string[];
  activeFields: string[];
}

export default function ConclusionSection({
  formData,
  handleChange,
  selectedFormats = [],
  activeFields = [],
}: ConclusionSectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const isIlo = selectedFormats.includes('ilo');
  const isMlc = selectedFormats.includes('mlc');

  const showFitSection =
    isActive('fit_lookout') ||
    isActive('fit_deck') ||
    isActive('fit_engine') ||
    isActive('fit_catering') ||
    isActive('fit_other');

  const showRestrictionSection =
    isActive('restrictions') ||
    isActive('rest_desc') ||
    isActive('free_cond') ||
    isActive('action_taken');

  const showIloMlcAdminSection =
    (isIlo || isMlc) &&
    (isActive('id_checked') || isActive('watch_able'));

  const showAdminFields =
    isActive('date') ||
    isActive('exp_date') ||
    isActive('eps') ||
    isActive('hospital') ||
    isActive('cert_auth');

  const showDoctorNotes =
    isActive('comments') || isActive('suggestion');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Kesimpulan & Rekomendasi Medis</h3>
        <p className={cardDescClass}>
          Deklarasi dokter dan status kelaikan kerja (Fitness for Duty) untuk sertifikat akhir.
        </p>
      </div>

      <div className={cardContentClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {showFitSection && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Status Kelaikan Kerja (Fit for Duty)
              </h4>

              {isActive('fit_lookout') && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <label className="text-sm text-slate-700 font-medium col-span-2">
                    Look-out Duty / General <BadgeADNOC />
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_lookout"
                      value="Fit"
                      checked={formData.fit_lookout === 'Fit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Fit (Laik)</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_lookout"
                      value="Unfit"
                      checked={formData.fit_lookout === 'Unfit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Unfit (Tidak Laik)</span>
                  </label>
                </div>
              )}

              {isActive('fit_deck') && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <label className="text-sm text-slate-700 font-medium col-span-2">
                    Deck Service <BadgeILO /><BadgeMLC />
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_deck"
                      value="Fit"
                      checked={formData.fit_deck === 'Fit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Fit</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_deck"
                      value="Unfit"
                      checked={formData.fit_deck === 'Unfit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Unfit</span>
                  </label>
                </div>
              )}

              {isActive('fit_engine') && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <label className="text-sm text-slate-700 font-medium col-span-2">
                    Engine Service <BadgeILO /><BadgeMLC />
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_engine"
                      value="Fit"
                      checked={formData.fit_engine === 'Fit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Fit</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_engine"
                      value="Unfit"
                      checked={formData.fit_engine === 'Unfit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Unfit</span>
                  </label>
                </div>
              )}

              {isActive('fit_catering') && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <label className="text-sm text-slate-700 font-medium col-span-2">
                    Catering Service <BadgeILO /><BadgeMLC />
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_catering"
                      value="Fit"
                      checked={formData.fit_catering === 'Fit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Fit</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_catering"
                      value="Unfit"
                      checked={formData.fit_catering === 'Unfit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Unfit</span>
                  </label>
                </div>
              )}

              {isActive('fit_other') && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  <label className="text-sm text-slate-700 font-medium col-span-2">
                    Other Services <BadgeILO /><BadgeMLC />
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_other"
                      value="Fit"
                      checked={formData.fit_other === 'Fit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Fit</span>
                  </label>
                  <label className={radioGroupClass}>
                    <input
                      type="radio"
                      name="fit_other"
                      value="Unfit"
                      checked={formData.fit_other === 'Unfit'}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    <span>Unfit</span>
                  </label>
                </div>
              )}
            </div>
          )}

          {showRestrictionSection && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                Restriksi & Deklarasi Medis
              </h4>

              {isActive('restrictions') && (
                <div>
                  <label className={labelClass}>Apakah ada Restriksi/Batasan Medis?</label>
                  <div className="flex gap-4 mt-1">
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="restrictions"
                        value="Yes"
                        checked={formData.restrictions === 'Yes'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Ya, Ada Batasan</span>
                    </label>
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="restrictions"
                        value="No"
                        checked={formData.restrictions === 'No'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Tidak Ada (Without Restrictions)</span>
                    </label>
                  </div>
                </div>
              )}

              {isActive('restrictions') &&
                formData.restrictions === 'Yes' &&
                isActive('rest_desc') && (
                  <div>
                    <label className={labelClass}>
                      Deskripsi Restriksi{' '}
                      <span className="text-[10px] text-slate-500 font-normal ml-1">
                        (Batas angkat beban, dsb)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="rest_desc"
                      value={formData.rest_desc || ''}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Jelaskan batasan medisnya..."
                    />
                  </div>
                )}

              {isActive('free_cond') && (
                <div className="pt-2">
                  <label className={labelClass}>
                    Bebas dari Kondisi Medis yang Membahayakan? <BadgeILO /><BadgeMLC /><BadgeMarshall />
                  </label>
                  <div className="flex gap-4 mt-1">
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="free_cond"
                        value="Yes"
                        checked={formData.free_cond === 'Yes'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Ya (Free from condition)</span>
                    </label>
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="free_cond"
                        value="No"
                        checked={formData.free_cond === 'No'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Tidak (Ada kondisi berbahaya)</span>
                    </label>
                  </div>
                </div>
              )}

              {isActive('action_taken') && (
                <div className="pt-2">
                  <label className={labelClass}>
                    Tindakan/Rujukan yang Diambil <BadgeILO /><BadgeMLC />
                  </label>
                  <input
                    type="text"
                    name="action_taken"
                    value={formData.action_taken || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Contoh: Tidak ada / Rujuk ke Spesialis"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h4 className="font-semibold text-slate-900 mb-4">
            Administrasi Dokter & Sertifikat
          </h4>

          {showIloMlcAdminSection && (
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-6 space-y-4">
              <h4 className="font-semibold text-sm text-blue-900 border-b border-blue-200 pb-2">
                Administrasi Khusus ILO / MLC {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}
              </h4>

              {isActive('id_checked') && (
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <span className="text-sm text-slate-700">
                    Dokumen identitas (KTP/Paspor) diperiksa saat ujian?
                  </span>
                  <div className="flex gap-4 shrink-0">
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="id_checked"
                        value="Yes"
                        checked={formData.id_checked === 'Yes'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Ya</span>
                    </label>
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="id_checked"
                        value="No"
                        checked={formData.id_checked === 'No'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Tidak</span>
                    </label>
                  </div>
                </div>
              )}

              {isActive('watch_able') && (
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <span className="text-sm text-slate-700">
                    Mampu untuk tugas jaga (Able for watchkeeping)?
                  </span>
                  <div className="flex gap-4 shrink-0">
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="watch_able"
                        value="Yes"
                        checked={formData.watch_able === 'Yes'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Ya</span>
                    </label>
                    <label className={radioGroupClass}>
                      <input
                        type="radio"
                        name="watch_able"
                        value="No"
                        checked={formData.watch_able === 'No'}
                        onChange={handleChange}
                        className={radioClass}
                      />
                      <span>Tidak</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {showAdminFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isActive('date') && (
                <div>
                  <label className={labelClass}>Tanggal Pemeriksaan</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date || ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}

              {isActive('exp_date') && (
                <div>
                  <label className={labelClass}>Tanggal Kedaluwarsa (Expiry)</label>
                  <input
                    type="date"
                    name="exp_date"
                    value={formData.exp_date || ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}

              {isActive('eps') && (
                <div>
                  <label className={labelClass}>Nama Dokter Pemeriksa</label>
                  <input
                    type="text"
                    name="eps"
                    value={formData.eps || ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}

              {isActive('hospital') && (
                <div>
                  <label className={labelClass}>Nama Klinik / RS</label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital || ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}

              {isActive('cert_auth') && (
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Otoritas Penerbit (Certificating Authority) <BadgeILO /><BadgeMarshall />
                  </label>
                  <input
                    type="text"
                    name="cert_auth"
                    value={formData.cert_auth || ''}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Contoh: Ministry of Health / RS Pelabuhan"
                  />
                </div>
              )}
            </div>
          )}

          {showDoctorNotes && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {isActive('comments') && (
                <div>
                  <label className={labelClass}>
                    Komentar Dokter (Comments) <BadgeMLC /><BadgeMarshall />
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments || ''}
                    onChange={handleChange}
                    className={`${textareaClass} h-20`}
                    placeholder="Komentar tambahan dokter..."
                  />
                </div>
              )}

              {isActive('suggestion') && (
                <div>
                  <label className={labelClass}>Saran Khusus</label>
                  <textarea
                    name="suggestion"
                    value={formData.suggestion || ''}
                    onChange={handleChange}
                    className={`${textareaClass} h-20`}
                    placeholder="Saran penanganan medis..."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}