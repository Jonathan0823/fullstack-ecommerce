import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React, { useEffect } from "react";
import { PopOverProduct } from "./PopOver";
import { Trash2 } from "lucide-react";
import { BACKEND_URL } from "@/lib/constant";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  stock: number;
  description: string;
  category: string;
}

interface ProductListsProps {
  products: Product[];
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
  refresh: () => void;
  categories: {
    id: string;
    name: string;
  }[];
}

const ProductLists: React.FC<ProductListsProps> = ({
  products,
  session,
  refresh,
  categories
}) => {
  const [error, setError] = React.useState(false);

  const handleDelete = async (id: string) => {
    const res = await fetch(`${BACKEND_URL}/products/delete`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      await refresh();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      <p className="font-semibold mb-2 border-b-2 pb-2">Product List</p>
      {error && <p className="text-red-500">Failed to delete product</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28">Image</TableHead>
            <TableHead className="w-64">Name</TableHead>
            <TableHead className="w-auto">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-20 object-cover"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="w-2">{product.price}</TableCell>
              <div className="flex gap-3 ml-24 mt-3">
                <PopOverProduct categories={categories} product={product} refresh={refresh} session={session} />
                <button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  <Trash2 className="cursor-pointer text-red-500" />
                </button>
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductLists;
