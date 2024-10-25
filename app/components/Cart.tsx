"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/lib/constant";

export default function Cart() {
  const [open, setOpen] = useState(false);
  interface CartItem {
    product: {
      id: string;
      name: string;
      image: string;
      price: string;
    };
    productId: string;
    quantity: number;
  }

  const [carts, setCarts] = useState<CartItem[]>([]);
  const { data: session } = useSession();
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

  useEffect(() => {
    fetchCart();
  }, [session, open]);

  const formatPriceToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const subtotal = carts.reduce((acc, cart) => {
    return acc + parseInt(cart.product.price) * cart.quantity;
  }, 0);

  const totalItems = carts.length;

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (!session) return;
    try {
      const res = await fetch(`${BACKEND_URL}/carts/${session.user.id}/items`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      });
      if (!res.ok) {
        throw new Error('Error changing cart');
      }

      // Update the cart state directly to maintain the order
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.product.id === productId ? { ...cart, quantity: newQuantity } : cart
        )
      );
    } catch (error) {
      console.error('Error changing cart:', error);
    }
  };

  const handleDecrease = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  const handleIncrease = (productId: string, currentQuantity: number) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  const handleRemove = async (productId: string) => {
    if (!session) return;
    try {
      const res = await fetch(
        `${BACKEND_URL}/carts/${session.user.id}/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error deleting cart");
      }
      fetchCart();
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group p-2 flex items-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none "
      >
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {totalItems}
        </span>
        <span className="sr-only">Open shopping cart</span>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {!carts ? (
                            <li className="py-6 flex">
                              <p className="text-sm text-gray-500">
                                No items in your cart
                              </p>
                            </li>
                          ) : (
                            <div>
                              {carts.map((cart) => (
                                <li key={cart.product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Link href={`/product/${cart.productId}`}>
                                      <img
                                        alt={cart.product.name}
                                        src={cart.product.image}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </Link>
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            href={`/product/${cart.productId}`}
                                          >
                                            {cart.product.name}
                                          </Link>
                                          <p className=" text-sm font-bold">
                                            {formatPriceToIDR(
                                              parseInt(cart.product.price)
                                            )}
                                          </p>
                                        </h3>
                                        <p className="ml-4 text-sm font-bold">
                                          {formatPriceToIDR(
                                            parseInt(cart.product.price) *
                                              cart.quantity
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {cart.quantity}
                                      </p>

                                      <div className="flex">
                                        <div className="flex items-center">
                                          <button
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300"
                                            disabled={cart.quantity <= 1}
                                            onClick={() =>
                                              handleDecrease(
                                                cart.productId,
                                                cart.quantity
                                              )
                                            }
                                          >
                                            -
                                          </button>
                                          <input
                                            type="text"
                                            value={cart.quantity}
                                            disabled
                                            className="mx-2 w-10 h-10 text-center border rounded-lg"
                                            min="1"
                                          />
                                          <button
                                            onClick={() =>
                                              handleIncrease(
                                                cart.productId,
                                                cart.quantity
                                              )
                                            }
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300"
                                          >
                                            +
                                          </button>

                                          <button
                                            type="button"
                                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() =>
                                              handleRemove(cart.productId)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatPriceToIDR(subtotal)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
