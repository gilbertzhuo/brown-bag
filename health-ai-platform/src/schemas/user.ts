import { z } from "zod";

export const userSchema = z.object({
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  location: z.string().optional(),
  bloodPressure: z.string().optional(),
  medicalHistory: z.string().optional(),
  familyHistory: z.string().optional(),
});
