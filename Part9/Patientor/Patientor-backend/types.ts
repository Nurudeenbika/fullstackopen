export type Code = string;

export type Name = string;

export interface DiagnosesEntry {
  code: Code;
  name: Name;
  latin?: string;

};

export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;



export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
};

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;
