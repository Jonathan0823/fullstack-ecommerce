import NavBar from "@/app/components/NavBar";
import { BACKEND_URL } from "@/lib/constant";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${BACKEND_URL}/products/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const formatPriceToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const product = await res.json();
  return (
    <div>
      <NavBar />
      <div className="bg-slate-50 p-6 shadow-lg flex flex-col md:flex-row gap-5 min-h-dvh">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={350}
          className="rounded-lg object-cover lg:w-2/5 lg:h-auto"
        />

        <div className="flex-1 mt-5 border p-8 rounded-xl shadow-xl">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="font-bold mb-3">Description</p>
            <p className="text-gray-700 mb-4 lg:text-base text-sm">
              {product.description}
            </p>
          </div>
          <p className="text-xl font-semibold mb-4">
            {formatPriceToIDR(product.price)}
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
