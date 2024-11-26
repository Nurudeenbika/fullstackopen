import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight: Number(weight), height: Number(height), bmi })
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  } 
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});