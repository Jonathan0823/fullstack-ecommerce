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
  updatedAt: string;
}

interface CategoryListsProps {
  categories: Category[];
}

const CategoryLists = ({ categories }: CategoryListsProps) => {
  const sortedCategories = categories.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      <div className="bg-white p-5 rounded-xl shadow-md flex-1">
        <p className="font-semibold mb-2 border-b-2 pb-2">Category List</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCategories.map((category: Category) => (
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
