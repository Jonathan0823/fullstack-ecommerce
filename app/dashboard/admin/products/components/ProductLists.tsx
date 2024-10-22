import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import { PopOverProduct } from "./PopOver";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListsProps {
  products: Product[];
}

const ProductLists: React.FC<ProductListsProps> = ({ products }) => {
  console.log(products);
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      <p className="font-semibold mb-2 border-b-2 pb-2">Product List</p>

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
                <PopOverProduct/>
                <button>
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
