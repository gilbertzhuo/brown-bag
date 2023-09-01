import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import ConsultationHistory from "@/components/ConsultationHistory";
import { FileHeart } from "lucide-react";

type Props = {};

const RecentConsultation = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">
          <Link href="/">Recent Consultations</Link>
        </CardTitle>
        <FileHeart size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          View your consultation history.
        </p>
      </CardContent>
      <CardContent className="max-h-[580px] overflow-scroll">
        <ConsultationHistory />
      </CardContent>
    </Card>
  );
};

export default RecentConsultation;
