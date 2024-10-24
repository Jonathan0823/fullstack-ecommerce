import EditProfileDialog from "@/app/components/EditProfileDialog";
import NavBar from "@/app/components/NavBar";
import PersonalInfoForm from "@/app/components/PersonalInfoForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { BACKEND_URL } from "@/lib/constant";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${BACKEND_URL}/user/${session.user.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return (
    <EdgeStoreProvider>
      <div>
        <NavBar />
        <div className="mt-4 w-full max-w-3xl flex justify-between gap-6 space-y-8 mx-auto">
          <div className="mt-4 w-full max-w-3xl flex items-center gap-6 space-y-8 mx-auto">
            <Image
              src={data.image || "/images/defaultProfile.svg"}
              width={100}
              height={100}
              alt="user-image"
              className="lg:w-32 lg:h-32 w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-gray-600">{data.email}</p>
              <div className=" w-full max-w-3xl flex flex-col space-y-8 mx-auto">
                {session?.user.isAdmin && (
                  <a href="/dashboard/admin">
                    <Button className="w-24">Admin Panel</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="mr-4">
            {session && <EditProfileDialog user={data} backendtoken={session.backendTokens.accessToken}/>}
          </div>
        </div>
        <PersonalInfoForm />
      </div>
    </EdgeStoreProvider>
  );
};

export default page;
