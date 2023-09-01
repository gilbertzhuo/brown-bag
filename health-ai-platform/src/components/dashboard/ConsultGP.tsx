"use client";
import { Cross } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Props = {};

const ConsultGP = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push("/virtual-clinic");
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Consult a Doctor</CardTitle>
        <Cross size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          See a Locally Licensed Doctor within Minutes Anytime, Anywhere.
        </p>
      </CardContent>
    </Card>
  );
};

export default ConsultGP;
