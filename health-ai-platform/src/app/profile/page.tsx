import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import UserDetails from "@/components/user-details/UserDetails";

export const metadata = {
  title: "Profile | HealthAI",
};

const Profile = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-4 mt-4 grid-cols-2">
        <UserDetails user={session?.user} />
      </div>
    </main>
  );
};

export default Profile;
