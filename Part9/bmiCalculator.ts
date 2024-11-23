const calculateBmi = (heightCm: number, weightKg: number) => {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return "Please provide valid height and weight.";
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return `Your BMI is ${bmi.toFixed(1)}. You are underweight.`;
  } else if (bmi < 24.9) {
    return `Your BMI is ${bmi.toFixed(1)}. Normal range.`;
  } else if (bmi < 29.9) {
    return `Your BMI is ${bmi.toFixed(1)}. You are overweight.`;
  } else {
    return `Your BMI is ${bmi.toFixed(1)}. You are obese`
  }
}

console.log(calculateBmi(180, 74))

