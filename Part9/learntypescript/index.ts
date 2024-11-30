import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();
import { calculatExercises} from './exerciseCalculator';

app.use(express.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || 
      daily_exercises.some(h => isNaN(Number(h))) ||
      isNaN(Number(target))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculatExercises(daily_exercises.map(Number), Number(target));
    return res.send({ result });
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight: Number(weight), height: Number(height), bmi });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  } 
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});