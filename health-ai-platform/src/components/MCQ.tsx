"use client";

import { Diagnosis, Question } from "@prisma/client";
import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import MCQCounter from "./MCQCounter";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema } from "@/schemas/questions";
import { z } from "zod";
import axios from "axios";

type Props = {
  diagnosis: Diagnosis & {
    questions: Pick<Question, "id" | "question">[];
  };
};

const MCQ = ({ diagnosis }: Props) => {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = React.useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = React.useState<number>(0);

  const currentQuestion = React.useMemo(() => {
    return diagnosis.questions[questionIndex];
  }, [questionIndex, diagnosis.questions]);

  const { mutate: submitAnswer, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: selectedChoice === 0,
      };
      axios
        .post("/api/v1/checkAnswer", payload, {
          withCredentials: true,
        })
        .then(() => {
          if (selectedChoice === 0) {
            setCorrectAnswers((prev) => prev + 1);
          } else {
            setWrongAnswers((prev) => prev + 1);
          }
          if (questionIndex + 1 >= diagnosis.questions.length) {
            router.push(`/statistics/${diagnosis.id}`);
          } else {
            setQuestionIndex((prev) => prev + 1);
          }
        });
    },
  });

  const handleNext = React.useCallback(() => {
    if (isLoading) return;
    submitAnswer();
  }, [isLoading, submitAnswer]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setSelectedChoice(0);
      } else if (event.key === "2") {
        setSelectedChoice(1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <p>
            <span className="text-slate-400 mr-2">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {diagnosis.topic}
            </span>
          </p>
        </div>
        <MCQCounter
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {diagnosis.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <Button
          className="justify-start w-full py-8 mb-4"
          variant={selectedChoice === 0 ? "default" : "secondary"}
          onClick={() => {
            setSelectedChoice(0);
          }}
        >
          <div className="flex items-center justify-start">
            <div className="text-start">True</div>
          </div>
        </Button>
        <Button
          className="justify-start w-full py-8 mb-4"
          variant={selectedChoice === 1 ? "default" : "secondary"}
          onClick={() => {
            setSelectedChoice(1);
          }}
        >
          <div className="flex items-center justify-start">
            <div className="text-start">False</div>
          </div>
        </Button>
        <Button
          onClick={() => {
            handleNext();
          }}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
