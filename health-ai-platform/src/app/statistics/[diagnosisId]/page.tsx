import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionList from "@/components/statistics/QuestionList";

type Props = {
  params: {
    diagnosisId: string;
  };
};

const StatisticsPage = async ({ params: { diagnosisId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const diagnosisResult = await prisma.diagnosis.findUnique({
    where: { id: diagnosisId },
    include: { questions: true },
  });
  if (!diagnosisResult) {
    return redirect("/diagnosis");
  }

  let accuracy: number = 0;
  const totalSymptoms: number = diagnosisResult.questions.reduce(
    (acc, question) => {
      if (question.haveSymptom) {
        return acc + 1;
      }
      return acc;
    },
    0
  );
  accuracy = (totalSymptoms / diagnosisResult.questions.length) * 100;
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
        </div>
        <QuestionList questions={diagnosisResult.questions} />
      </div>
    </>
  );
};

export default StatisticsPage;
