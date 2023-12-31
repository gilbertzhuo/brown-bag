"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {};
const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card className="hover:cursor-pointer hover:opacity-75">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent
        onClick={() => {
          router.push("/history");
        }}
      >
        <p className="text-sm text-muted-foreground">View past quiz content</p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
