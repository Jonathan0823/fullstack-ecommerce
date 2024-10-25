import React from "react";
import NavBar from "../components/NavBar";
import { BACKEND_URL } from "@/lib/constant";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  interface Order {
    status: string;
    id: string;
    total: number;
    orderItems: {
      product: {
        id: string;
        name: string;
        image: string;
        price: number;
      };
      quantity: number;
    }[];
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const res = await fetch(`${BACKEND_URL}/orders/user/${session.user.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const orders = await res.json();

  const formatPriceToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div>
      <NavBar />
      <div className="bg-white p-6 shadow-lg gap-5 min-h-dvh">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                My Orders
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {orders.map((order: Order) => (
                  <li className="flex items-center gap-4" key={order.id}>
                    <div>
                      <h3 className="text-sm text-gray-900 lg:max-w-full max-w-56">
                        {order.id}
                      </h3>

                      <dl className="mt-0.5 space-y-px flex lg:flex-row flex-col text-[10px] text-gray-600">
                        <div className="text-base flex">
                          <dt className=" mr-3">Total:</dt>
                          <dd className=" font-bold w-36">
                            {formatPriceToIDR(order.total)}
                          </dd>
                        </div>
                        <div className="flex text-base">
                          <dt className=" mr-3 lg:ml-10 ml-0">Status:</dt>
                          <dd className=" font-bold w-24">{order.status}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-5">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Items{" "}
                        </label>
                        <label className="mr-3">Items</label>
                        <input
                          type="number"
                          min="1"
                          value={order.orderItems.length}
                          disabled
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
