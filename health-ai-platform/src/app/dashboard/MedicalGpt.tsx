import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import GPTChat from "@/components/GPTChat";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const MedicalGpt = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Medical AI</CardTitle>
        <Bot size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          An advanced AI language model specialized in healthcare, offering
          precise and rapid medical insights based on your medical profile.
        </p>
      </CardContent>
      <CardContent className="pl-2">
        <GPTChat />
      </CardContent>
    </Card>
  );
};

export default MedicalGpt;
