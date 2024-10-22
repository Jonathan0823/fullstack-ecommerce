"use client"
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import ProductForm from "./components/Form";
import ProductLists from "./components/ProductLists";
import { BACKEND_URL } from "@/lib/constant";

const Page = () => {
  const [products, setProducts] = React.useState([]);
  const getProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log('Form submitted');
    // After submission, refetch the products
    await getProducts();
  };
  return (
    <div>
      <div className="bg-white p-6 shadow-lg flex gap-5">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-2xl font-bold ">Categories</h1>
      </div>
      <div className="flex mt-2 gap-1 lg:flex-row flex-col ml-3">
        <ProductForm handleSubmit={handleSubmit} />
        <ProductLists products={products} />
      </div>
    </div>
  );
};

export default Page;
