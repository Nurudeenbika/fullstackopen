import { isNotNumber } from "./utils";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculatExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;


  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, you met your target!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to put in more effort";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

    const args = process.argv.slice(2);

  if (args.length < 2 || args.some(isNotNumber)) {
    console.error("Usage: npm run calculateExercises <target> <dailyHours...>");
    process.exit(1);
  }

  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(Number);


console.log(calculatExercises(dailyHours, target))
