export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const parseArguments = (args: string[]): number[] => {
  const numbers = args.map(arg => {
    const number = Number(arg);
    if (isNaN(number)) {
      throw new Error(`Provided value "${arg}" is not a valid number`);
    }
    return number;
  })
  return numbers;
}