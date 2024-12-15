import patients from '../../data/patients';

import { PatientsEntry } from '../../types';

const getEntries = (): PatientsEntry[] => {
  return patients;
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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientEntries
};