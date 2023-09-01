import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomWordCloud from "@/components/CustomWordCloud";
import { prisma } from "@/lib/db";
import { Bot } from "lucide-react";
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
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Medical AI</CardTitle>
        <Bot size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Large Language Model aligned to the medical domain to more accurately
          and safely answer medical questions.
        </p>
      </CardContent>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default MedicalGpt;
