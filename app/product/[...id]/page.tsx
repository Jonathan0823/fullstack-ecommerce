import CheckoutOrderButton from "@/app/components/CheckoutOrderButton";
import NavBar from "@/app/components/NavBar";
import { BACKEND_URL } from "@/lib/constant";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${BACKEND_URL}/products/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
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
      <div className="bg-slate-50 p-6 shadow-lg flex flex-col md:flex-row justify-center mx-auto gap-5 min-h-dvh">
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
          <div className="lg:flex flex-row lg:gap-32 text-sm mt-10">
            <div>
              <p className="font-semibold mb-1">Category</p>
              <p className="text-gray-700 mb-4 text-sm">
                {product.categoryName}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Brand</p>
              <p className="text-gray-700 mb-4 text-sm">
                {product.brand}
              </p>
            </div>
            <div>
                <p className="font-semibold mb-1">Stock</p>
                <p className="text-gray-700 mb-4 lg:text-base text-sm">
                    {product.stock}
                </p>
            </div>
          </div>
          <p className="text-xl font-semibold mb-4 lg:mt-14">
            {formatPriceToIDR(product.price)}
          </p>
          <div>
            <CheckoutOrderButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
