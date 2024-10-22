import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoryListsProps {
  categories: Category[];
}

const CategoryLists = ({ categories }: CategoryListsProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      <div className="bg-white p-5 rounded-xl shadow-md flex-1">
        <p className="font-semibold mb-2 border-b-2 pb-2">Product List</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: Category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="w-5">edit</TableCell>
                <TableCell>delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryLists;
