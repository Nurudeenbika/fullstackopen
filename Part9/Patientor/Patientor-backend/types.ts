import { z } from "zod";

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

export const newEntrySchma = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchma.parse(object);
};

export type NewPatientEntry = z.infer<typeof newEntrySchma>;

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

