import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import CategoryForm from "./components/Form";
import CategoryLists from "./components/CategoryLists";

const page = () => {
  return (
    <div>
      <div className="bg-white p-6 shadow-lg flex gap-5">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold ">Categories</h1>
      </div>
      <div className="flex mt-2 gap-1 lg:flex-row flex-col ml-3">
      <CategoryForm />
      <CategoryLists />
      </div>
    </div>
  );
};

export default page;
