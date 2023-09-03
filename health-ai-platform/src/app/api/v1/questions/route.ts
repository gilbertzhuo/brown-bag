import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { QuizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// POST /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in to create a quiz.",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { amount, topic } = QuizCreationSchema.parse(body);
    let questions: any;

    questions = await strict_output(
      `You are a helpful medical AI that is able to generate mcq questions that ask user if they are experiencing any symptoms, store all the questions in a JSON array.`,
      new Array(amount).fill(
        `You are to generate a random mcq question about ${topic}, to check if the user is experiencing the symptoms.`
      ),
      {
        question: "question",
      }
    );

    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
};
