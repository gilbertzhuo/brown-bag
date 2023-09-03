import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  let text =
    "It appears that you are exhibiting little to no symptoms. This suggests a low likelihood of having the disease. However, it's essential to consult a healthcare professional for a proper evaluation and advice on maintaining your health.";
  if (accuracy >= 40) {
    text =
      "You are exhibiting a moderate number of symptoms. While this may indicate a potential concern, it's not a definitive diagnosis. It's crucial to consult a healthcare professional for a comprehensive evaluation and further testing to determine the cause of these symptoms.";
  } else if (accuracy >= 70) {
    text =
      "You are exhibiting a high number of symptoms associated with the disease. This could be a cause for concern, and it's essential to seek immediate medical attention. Contact a healthcare professional or visit a medical facility for a thorough evaluation and diagnosis.";
  }

  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <HeartPulse />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex flex-col font-semibold">
          <span>You have {accuracy}% of the symptoms.</span>
          <span className="text-xs text-slate-600">{text}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
