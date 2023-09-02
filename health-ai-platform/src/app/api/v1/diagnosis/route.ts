import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { QuizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    const originalCookies = req.headers.get("cookie");
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { amount, topic, type } = QuizCreationSchema.parse(body);
    const diagnosis = await prisma.diagnosis.create({
      data: {
        diagnosisType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });
    await prisma.topicCount.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });
    const { data } = await axios.post(
      `${process.env.API_URL}/api/v1/questions`,
      {
        amount,
        topic,
        type,
      },
      {
        headers: {
          cookie: originalCookies,
        },
        withCredentials: true,
      }
    );
    if (type == "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      let manyData = data.questions.map((question: mcqQuestion) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          diagnosisId: diagnosis.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({ data: manyData });
    } else if (type === "open_ended") {
      type openQuestion = {
        question: string;
        answer: string;
      };
      let manyData = data.questions.map((question: openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          diagnosisId: diagnosis.id,
          questionType: "open_ended",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json({
      diagnosisId: diagnosis.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
