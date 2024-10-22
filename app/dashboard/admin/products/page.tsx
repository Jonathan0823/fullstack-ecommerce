"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import ProductForm from "./components/Form";
import ProductLists from "./components/ProductLists";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";

const Page = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { data: session } = useSession();
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
    Promise.all([getProducts(), getCategories()]);
    setLoading(false);
  }, []);

  const refresh = async () => {
    await getProducts();
  }

  return (
    <div className="flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 shadow-lg flex gap-5">
        <SidebarTrigger className="lg:hidden" />
        <div className="text-2xl font-bold">Categories</div>
      </div>
      <div className="flex mt-2 gap-1 lg:flex-row flex-col ml-3">
        {loading ? (
          <></>
        ) : (
          <>
            {session && (
              <>
                <ProductForm categories={categories} />
                <ProductLists
                  products={products}
                  session={session}
                  refresh={refresh}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
