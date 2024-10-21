import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/lib/constant";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListsProps {
  products: Product[];
}

const ProductLists: React.FC<ProductListsProps> = ({ products }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      <p className="font-semibold mb-2 border-b-2 pb-2">Product List</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-80">Name</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductLists;
