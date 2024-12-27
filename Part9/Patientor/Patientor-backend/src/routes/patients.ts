import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

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
  try {

  
  const newPatientEntry = toNewPatientEntry(req.body);

  const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;