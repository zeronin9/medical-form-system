// lib/fieldRegistry.ts
export const fieldRegistry = {
  firstName:       { label: "First Name",   formats: ["chevron","adnoc","ilo","mlc","qatar","marshall"] },
  nationality:     { label: "Nationality",  formats: ["chevron","adnoc","ilo","mlc","qatar","marshall"] },
  ilo_position:    { label: "ILO Position", formats: ["ilo", "mlc"] }, // hanya muncul di ILO & MLC
  exp_noise:       { label: "Exp. Noise",   formats: ["adnoc"] },      // hanya muncul di ADNOC
  q_stress_score:  { label: "Stress Score", formats: ["qatar","chevron"] },
  // ... dst
};