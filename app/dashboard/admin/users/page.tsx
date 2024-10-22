import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { TableUser } from "./components/Table";

const page = () => {
  return (
    <div>
      <div className="bg-white p-6 shadow-lg flex-col gap-5">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold ">Users</h1>
        <div className="mt-5">
        <TableUser />
        </div>
      </div>
    </div>
  );
};

export default page;
