import { isNotNumber } from "./utils";

export const calculateBmi = (heightCm: number, weightKg: number) => {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return "Please provide valid height and weight.";
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return `Underweight.`;
  } else if (bmi < 24.9) {
    return `Normal weight.`;
  } else if (bmi < 29.9) {
    return `Overweight.`;
  } else {
    return `Obese`;
  }

};

export const isMain = require.main === module ;
if (isMain) {
  const args = process.argv.slice(2);

  if (args.length !== 2 || args.some(isNotNumber)) {
    console.error("Usage: npm run calculateBmi <heightCm> <weightKg>");
    process.exit(1);
  }

  const [height, weight] = args.map(Number);
  console.log(calculateBmi(height, weight));
}


