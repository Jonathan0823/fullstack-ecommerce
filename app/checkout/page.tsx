"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/lib/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data: session } = useSession();
  interface CartItem {
    product: {
      id: string;
      name: string;
      image: string;
      price: string;
    };
    quantity: number;
    productId: string;
  }

  const [carts, setCarts] = useState<CartItem[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const fetchCart = async () => {
    if (!session) return;
    try {
      const res = await fetch(`${BACKEND_URL}/carts/${session.user.id}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      const data = await res.json();
      const dataLength = data.length;
      setCarts(data[dataLength - 1].cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const formatPriceToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    fetchCart();
  }, [session]);

  const totalPrice = carts.reduce(
    (total, cart) => total + parseInt(cart.product.price) * cart.quantity,
    0
  );

  const handleOrder = async () => {
    if (!session) return;
    try {
      const res = await fetch(`${BACKEND_URL}/orders/user/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify({
          items: carts.map((cart) => ({
            productId: cart.productId,
            quantity: cart.quantity,
            price: cart.product.price,
          })),
          total: totalPrice,
        }),
      });
      if (res.ok) {
        const res = await fetch(
          `${BACKEND_URL}/carts/${session.user.id}/items`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );
        if (res.ok) {
          setSuccess(true);
          setCarts([]);
        } else {
          setError(true);
          console.error("Error deleting cart:", res);
        }
      } else {
        setError(true);
        console.error("Error creating order:", res);
      }
    } catch (error) {
      setError(true);
      console.error("Error creating order:", error);
    }
  };

  return (
    <section>
      <NavBar />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {carts.map((cart) => (
                <li className="flex items-center gap-4" key={cart.productId}>
                  <Link href={`/product/${cart.productId}`}>
                    <img
                      src={cart.product.image}
                      alt=""
                      className="size-16 rounded object-cover"
                    />
                  </Link>

                  <div>
                    <h3 className="text-sm text-gray-900 lg:max-w-full max-w-56">
                      <Link href={`/product/${cart.productId}`}>
                        {cart.product.name}
                      </Link>
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dd className="inline">
                          {formatPriceToIDR(parseInt(cart.product.price))}
                        </dd>
                      </div>

                      <div className="text-base">
                        <dt className="inline">Total:</dt>
                        <dd className="inline font-bold">
                          {formatPriceToIDR(
                            parseInt(cart.product.price) * cart.quantity
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="Line1Qty" className="sr-only">
                        {" "}
                        Quantity{" "}
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={cart.quantity}
                        disabled
                        id="Line1Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </form>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd className="font-bold">
                      {formatPriceToIDR(totalPrice)}
                      {success && (
                        <div className="text-green-500 mt-4">Order success</div>
                      )}
                      {error && (
                        <div className="text-red-500 mt-4">Order failed</div>
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <Button onClick={handleOrder}>Pay</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
