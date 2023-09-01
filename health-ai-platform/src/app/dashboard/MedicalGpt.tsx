import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CustomWordCloud from "@/components/CustomWordCloud";
import { prisma } from "@/lib/db";

type Props = {};

const MedicalGpt = async (props: Props) => {
  const topics = await prisma.topicCount.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Medical AI</CardTitle>
        <CardDescription>
          Large language Model aligned to the medical domain to more accurately
          and safely answer medical questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default MedicalGpt;
