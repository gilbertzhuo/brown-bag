import { z } from "zod";

export const QuizCreationSchema = z.object({
  topic: z.string(),
  type: z.enum(["symptoms"]),
  amount: z.number().min(1).max(10),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});
