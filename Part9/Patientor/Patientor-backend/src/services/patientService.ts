import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatientEntry, PatientsEntry } from '../../types';

const getEntries = (): PatientsEntry[] => {
  return patients;
};

const findById = (id: string): PatientsEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const getNonSensitivePatientEntries = (): PatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry): PatientsEntry => {

 const newPatientEntry = {
  id: uuid(),
  ...entry
 };

 patients.push(newPatientEntry);
 return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientEntries,
  findById
};