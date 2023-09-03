import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import MCQ from "@/components/MCQ";

type Props = {
  params: {
    diagnosisId: string;
  };
};

const QuizPage = async ({ params: { diagnosisId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const diagnosis = await prisma.diagnosis.findUnique({
    where: {
      id: diagnosisId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
        },
      },
    },
  });
  if (!diagnosis) {
    return redirect("/diagnosis");
  }
  return <MCQ diagnosis={diagnosis} />;
};

export default QuizPage;
