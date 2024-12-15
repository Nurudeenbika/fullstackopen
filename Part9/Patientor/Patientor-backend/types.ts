export type Code = string;

export type Name = string;

export interface DiagnosesEntry {
  code: Code;
  name: Name;
  latin?: string;

};

export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;




export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
};

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
