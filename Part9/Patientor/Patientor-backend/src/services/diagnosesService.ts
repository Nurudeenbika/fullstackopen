import diagnoses from '../../data/entries';

import { DiagnosesEntry } from '../../types';

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const getNonSensitiveDiagnosesEntries = (): DiagnosesEntry[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin
  }));
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses,
  getNonSensitiveDiagnosesEntries
};