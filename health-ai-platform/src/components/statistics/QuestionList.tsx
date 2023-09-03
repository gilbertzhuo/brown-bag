"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@prisma/client";
type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  console.log(questions);
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>What you indicated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map(({ question, haveSymptom }, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{question}</TableCell>

                <TableCell className={`font-semibold`}>
                  {haveSymptom ? (
                    <p className="text-rose-400">Experiencing Symptom</p>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
