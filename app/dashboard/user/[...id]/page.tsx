import NavBar from "@/app/components/NavBar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { BACKEND_URL } from "@/lib/constant";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${BACKEND_URL}/user/${params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();
  let address: { state?: string } = {};
  if (user.address) {
    try {
      address = JSON.parse(user.address);
    } catch (error) {
      console.error("Error parsing address:", error);
    }
  }

  return (
    <EdgeStoreProvider>
      <div>
        <NavBar />
        <div className="p-6">
          {session?.user.isAdmin && (
            <Link href="/dashboard/admin">
              <Button className="w-24">Admin Panel</Button>
            </Link>
          )}
        </div>
        <p>{user.name}</p>
        <p>{address.state || ""}</p>
      </div>
    </EdgeStoreProvider>
  );
};

export default page;
