export type Code = string;

export type Name = string;

export interface DiagnosesEntry {
  code: Code;
  name: Name;
  latin?: string;

};

export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

