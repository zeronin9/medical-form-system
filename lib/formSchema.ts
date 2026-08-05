/** Field wajib diisi sebelum generate dokumen ADNOC */
export const ADNOC_REQUIRED_FIELDS = [
  { key: 'firstName', label: 'Nama Depan' },
  { key: 'familyName', label: 'Nama Belakang' },
  { key: 'dob', label: 'Tanggal Lahir' },
  { key: 'gender', label: 'Jenis Kelamin' },
  { key: 'nationality', label: 'Kewarganegaraan' },
  { key: 'company', label: 'Nama Perusahaan' },
  { key: 'position', label: 'Posisi / Jabatan' },
  { key: 'fit_lookout', label: 'Status Kelaikan Kerja (Fit/Unfit)' },
  { key: 'eps', label: 'Nama Dokter Pemeriksa' },
  { key: 'hospital', label: 'Nama Klinik / RS' },
] as const;

export function validateAdnocForm(formData: Record<string, unknown>): string[] {
  const errors: string[] = [];

  for (const field of ADNOC_REQUIRED_FIELDS) {
    const value = formData[field.key];
    if (value === undefined || value === null || String(value).trim() === '') {
      errors.push(field.label);
    }
  }

  return errors;
}
