import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { TableUser } from "./components/Table";

const page = () => {
  return (
    <div className="flex-col items-center justify-center">
      <div className="bg-white p-6 shadow-lg flex gap-5 min-h-screen">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold ">Users</h1>
        <div className="mt-12">
        <TableUser />
        </div>
      </div>
    </div>
  );
};

export default page;
