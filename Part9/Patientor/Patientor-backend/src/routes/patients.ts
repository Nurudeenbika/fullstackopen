/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/:id', (req, res) => {
  const Patient = patientService.findById(String(req.params.id));

  if (Patient) {
    res.send(Patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;
  const newPatientEntry = patientService.addPatient({ 
     name,
     dateOfBirth, 
     gender,
     ssn, 
     occupation
});
  res.json(newPatientEntry);
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;