import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import UserDetails from "@/components/user-details/UserDetails";
import ConsultationForm from "@/components/ConsultationForm";

type Props = {};

export const metadata = {
  title: "Virtual Clinic | HealthAI",
};
const QuizPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">
          Consult Doctor
        </h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <UserDetails />
        <ConsultationForm />
      </div>
    </main>
  );
};

export default QuizPage;
