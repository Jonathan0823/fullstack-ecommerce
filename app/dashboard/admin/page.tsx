import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import UploadBanner from "./components/UploadBanner";

const page = () => {
  return (
    <div>
    <div className="bg-white p-6 shadow-lg flex gap-5">
      <SidebarTrigger className="lg:hidden" />
      <h1 className="text-2xl font-bold ">Admin Dashboard</h1>
    </div>
    <div>
      <UploadBanner />
    </div>
  </div>
  );
};

export default page;
