import React from 'react';
import {
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  cardDescClass,
  cardContentClass,
  labelClass,
  inputClass,
  BadgeADNOC,
  BadgeMarshall,
  BadgeChevron,
  BadgeQatar,
  BadgeILO,
  BadgeMLC,
} from './FormConstants';

interface IdentitySectionProps {
  formData: any;
  handleChange: (e: any) => void;
  selectedFormats: string[];
  activeFields: string[];
}

export default function IdentitySection({
  formData,
  handleChange,
  selectedFormats = [],
  activeFields = [],
}: IdentitySectionProps) {
  const isActive = (fieldName: string) => activeFields.includes(fieldName);

  const isChevron = selectedFormats.includes('chevron');
  const isQatar = selectedFormats.includes('qatarenergy');
  const isIlo = selectedFormats.includes('ilo');
  const isMlc = selectedFormats.includes('mlc');
  const isAdnoc = selectedFormats.includes('adnoc');
  const isMarshall = selectedFormats.includes('marshall');

  const showMaritimeSection =
    isActive('pob_city') ||
    isActive('pob_country') ||
    isActive('seaman_book') ||
    isActive('ilo_position') ||
    isActive('typeOfShip') ||
    isActive('tradeArea');

  return (
    <div className={cardClass}>
      <div className={cardHeaderClass}>
        <h3 className={cardTitleClass}>Identitas Diri & Pekerjaan</h3>
        <p className={cardDescClass}>Informasi dasar pegawai dan administrasi perusahaan.</p>
      </div>
      <div className={cardContentClass}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {isActive('firstName') && (
            <div><label className={labelClass}>Nama Depan <BadgeADNOC/><BadgeMarshall/></label><input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} className={inputClass} placeholder="First Name" /></div>
          )}
          {isActive('middleName') && (
            <div><label className={labelClass}>Nama Tengah <BadgeADNOC/><BadgeMarshall/></label><input type="text" name="middleName" value={formData.middleName || ''} onChange={handleChange} className={inputClass} placeholder="Middle Name (Opsional)" /></div>
          )}
          {isActive('familyName') && (
            <div><label className={labelClass}>Nama Belakang <BadgeADNOC/><BadgeMarshall/></label><input type="text" name="familyName" value={formData.familyName || ''} onChange={handleChange} className={inputClass} placeholder="Family/Last Name" /></div>
          )}

          {isActive('idPassport') && (
            <div><label className={labelClass}>No. KTP / Paspor</label><input type="text" name="idPassport" value={formData.idPassport || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('dob') && (
            <div><label className={labelClass}>Tgl Lahir</label><input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('gender') && (
            <div>
              <label className={labelClass}>Jenis Kelamin</label>
              <select name="gender" value={formData.gender || ''} onChange={handleChange} className={inputClass}>
                <option value="">- Pilih -</option><option value="Male">Laki-Laki (Male)</option><option value="Female">Perempuan (Female)</option>
              </select>
            </div>
          )}

          {isActive('nationality') && (
            <div><label className={labelClass}>Kewarganegaraan {isMlc && <BadgeMLC/>}</label><input type="text" name="nationality" value={formData.nationality || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('company') && (
            <div><label className={labelClass}>Nama Perusahaan {isMlc && <BadgeMLC/>}</label><input type="text" name="company" value={formData.company || ''} onChange={handleChange} className={inputClass} /></div>
          )}

          {isActive('maritalStatus') && (
            <div>
              <label className={labelClass}>Status Pernikahan <BadgeADNOC/></label>
              <select name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} className={inputClass}>
                <option value="">- Pilih -</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option>
              </select>
            </div>
          )}
          {isActive('position') && (
            <div><label className={labelClass}>Posisi / Jabatan (Selain Pelaut)</label><input type="text" name="position" value={formData.position || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('workLocation') && (
            <div><label className={labelClass}>Lokasi Kerja</label><input type="text" name="workLocation" value={formData.workLocation || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('contactNumber') && (
            <div><label className={labelClass}>No. Telepon / HP</label><input type="text" name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} className={inputClass} /></div>
          )}
          {isActive('email') && (
            <div><label className={labelClass}>Email Address <BadgeADNOC/></label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
          )}

          {isActive('reason_exam') && (
            <div>
              <label className={labelClass}>Tujuan Pemeriksaan <BadgeADNOC/><BadgeILO/><BadgeMLC/></label>
              <select name="reason_exam" value={formData.reason_exam || ''} onChange={handleChange} className={inputClass}>
                <option value="">- Pilih Tujuan -</option>
                <option value="Pre-Employment">Pre-Employment (Awal)</option>
                <option value="Periodic">Periodic (Berkala)</option>
                <option value="Other">Other (Lainnya)</option>
              </select>
            </div>
          )}

          {isActive('address') && (
            <div><label className={labelClass}>Alamat Lengkap</label><input type="text" name="address" value={formData.address || ''} onChange={handleChange} className={inputClass} /></div>
          )}

          {(isActive('serviceDate') || isActive('medNo')) && isChevron && (
            <>
              <div className="col-span-full border-t pt-4 mt-2 border-slate-100"></div>
              {isActive('serviceDate') && (
                <div><label className={labelClass}>Tanggal Mulai Kerja <BadgeChevron /></label><input type="date" name="serviceDate" value={formData.serviceDate || ''} onChange={handleChange} className={inputClass} /></div>
              )}
              {isActive('medNo') && (
                <div><label className={labelClass}>No. Rekam Medis <BadgeChevron /></label><input type="text" name="medNo" value={formData.medNo || ''} onChange={handleChange} className={inputClass} /></div>
              )}
            </>
          )}

          {isActive('department') && (
            <div><label className={labelClass}>Departemen {isQatar && <BadgeQatar />}{isMlc && <BadgeMLC />}</label><input type="text" name="department" value={formData.department || ''} onChange={handleChange} className={inputClass} /></div>
          )}

          {showMaritimeSection && (
            <>
              <div className="col-span-full border-t pt-4 mt-2 border-slate-100"></div>

              {isActive('pob_city') && (
                <div><label className={labelClass}>Kota Lahir <BadgeILO/><BadgeMLC/><BadgeMarshall/></label><input type="text" name="pob_city" value={formData.pob_city || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: Surabaya" /></div>
              )}
              {isActive('pob_country') && (
                <div><label className={labelClass}>Negara Lahir <BadgeILO/><BadgeMLC/><BadgeMarshall/></label><input type="text" name="pob_country" value={formData.pob_country || ''} onChange={handleChange} className={inputClass} placeholder="Contoh: Indonesia" /></div>
              )}

              {isActive('seaman_book') && (
                <div><label className={labelClass}>Buku Pelaut (Seaman Book) {isIlo && <BadgeILO />} {isMlc && <BadgeMLC />}</label><input type="text" name="seaman_book" value={formData.seaman_book || ''} onChange={handleChange} className={inputClass} /></div>
              )}
              {isActive('ilo_position') && (
                <div>
                  <label className={labelClass}>Posisi di Kapal {isIlo && <BadgeILO />}{isMlc && <BadgeMLC />}{isMarshall && <BadgeMarshall />}</label>
                  <select name="ilo_position" value={formData.ilo_position || ''} onChange={handleChange} className={inputClass}>
                    <option value="">- Pilih Posisi -</option>
                    <option value="Master">Master</option>
                    <option value="Deck Officer">Deck Officer</option>
                    <option value="Engineering Officer">Engineering Officer</option>
                    <option value="Radio Officer">Radio Officer</option>
                    <option value="Rating">Rating</option>
                    <option value="Chief Cook">Chief Cook</option>
                    <option value="Cook">Cook</option>
                  </select>
                </div>
              )}
              {isActive('typeOfShip') && (
                <div><label className={labelClass}>Tipe Kapal {isIlo && <BadgeILO />}{isMlc && <BadgeMLC />}</label><input type="text" name="typeOfShip" value={formData.typeOfShip || ''} onChange={handleChange} className={inputClass} /></div>
              )}
              {isActive('tradeArea') && (
                <div><label className={labelClass}>Area Pelayaran {isIlo && <BadgeILO />}{isMlc && <BadgeMLC />}</label><input type="text" name="tradeArea" value={formData.tradeArea || ''} onChange={handleChange} className={inputClass} /></div>
              )}
            </>
          )}

          {isActive('job1') && isAdnoc && (
            <div className="col-span-full mt-6 rounded-lg border border-slate-200 bg-slate-50/30 p-4">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Riwayat Pekerjaan Sebelumnya (Previous Employment) <BadgeADNOC /></h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-600 bg-slate-200 uppercase">
                    <tr>
                      <th className="px-3 py-2 rounded-tl-lg w-10">No</th>
                      <th className="px-3 py-2">Pekerjaan (Jobs)</th>
                      <th className="px-3 py-2">Perusahaan (Company)</th>
                      <th className="px-3 py-2 w-28">Dari (From)</th>
                      <th className="px-3 py-2 w-28 rounded-tr-lg">Sampai (To)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((num) => (
                      <tr key={num} className="border-b border-slate-200/60">
                        <td className="px-3 py-2 font-medium text-slate-800 text-center">{num}</td>
                        <td className="px-3 py-2">
                          <input type="text" name={`job${num}`} value={formData[`job${num}`] || ''} onChange={handleChange} className={inputClass} placeholder="Cth: Oiler" />
                        </td>
                        <td className="px-3 py-2">
                          <input type="text" name={`comp${num}`} value={formData[`comp${num}`] || ''} onChange={handleChange} className={inputClass} placeholder="Nama Perusahaan" />
                        </td>
                        <td className="px-3 py-2">
                          <input type="text" name={`from${num}`} value={formData[`from${num}`] || ''} onChange={handleChange} className={inputClass} placeholder="YYYY" />
                        </td>
                        <td className="px-3 py-2">
                          <input type="text" name={`to${num}`} value={formData[`to${num}`] || ''} onChange={handleChange} className={inputClass} placeholder="YYYY" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}