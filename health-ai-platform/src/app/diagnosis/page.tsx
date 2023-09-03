import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/QuizCreation";
import UserDetails from "@/components/user-details/UserDetails";

type Props = {};

export const metadata = {
  title: "Quick Diagnosis | HealthAI",
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
          Quick Diagnosis
        </h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <UserDetails />
        <QuizCreation />
      </div>
    </main>
  );
};

export default QuizPage;
