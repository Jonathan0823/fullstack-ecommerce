"use client";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";
import React from "react";

interface CheckoutOrderButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    categoryName: string;
    image: string;
  };
}

const CheckoutOrderButton = ({ product }: CheckoutOrderButtonProps) => {
  const { data: session } = useSession();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleAddToCart = async () => {
    if (!session) return;
    try {
      const res = await fetch(`${BACKEND_URL}/carts/${session.user.id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      setError(true);
    }
  };



  return (
    <div className="flex-col gap-4">
      {success && <p className="text-green-500">Added to cart</p>}
      {error && <p className="text-red-500">Error adding to cart</p>}
      <div className="flex  gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        
      </div>
    </div>
  );
};

export default CheckoutOrderButton;
