import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConsultationHistory = async () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CopyCheck className="mr-3" />
          <div className="ml-4 space-y-1">
            <Link
              className="text-base font-medium leading-none underline"
              href={`/`}
            >
              Supervised Antigen Rapid Test (ART)
            </Link>

            <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
              <Clock className="w-4 h-4 mr-1" />
              08:28 AM, 06 April 2023
            </p>
            <p className="text-sm font-medium">Marcus Yep (GP)</p>
            <p className="text-sm text-muted-foreground">Clinic @ Sembawang</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CopyCheck className="mr-3" />
          <div className="ml-4 space-y-1">
            <Link
              className="text-base font-medium leading-none underline"
              href={`/`}
            >
              Medical Certificate
            </Link>
            <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
              <Clock className="w-4 h-4 mr-1" />
              02:24 PM, 05 March 2023
            </p>
            <p className="text-sm font-medium">Diana Sam (GP)</p>
            <p className="text-sm text-muted-foreground">Clinic @ Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationHistory;
