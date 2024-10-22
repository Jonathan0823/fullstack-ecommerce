"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import CategoryForm from "./components/Form";
import CategoryLists from "./components/CategoryLists";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    const res = await fetch(`${BACKEND_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
    setLoading(false);
  }, []);

  const refresh = async () => {
    await getCategories();
  };

  return (
    <div>
      <div className="bg-white p-6 shadow-lg flex gap-5">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold ">Categories</h1>
      </div>
      <div className="flex mt-2 gap-1 lg:flex-row flex-col ml-3">
        {loading ? (
          <></>
        ) : (
          <>
            {session && <CategoryForm refresh={refresh} session={session} />}
            {session && <CategoryLists categories={categories} session={session} refresh={refresh} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
