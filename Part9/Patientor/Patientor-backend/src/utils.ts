import { newEntrySchma } from './../types';
//import { z } from "zod";
import { NewPatientEntry } from "../types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchma.parse(object);
};


export default toNewPatientEntry;