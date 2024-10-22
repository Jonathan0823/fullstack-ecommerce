import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/lib/constant";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PopOverCategory } from "./PopOver";

interface Category {
  id: string;
  name: string;
  updatedAt: string;
}

interface CategoryListsProps {
  categories: Category[];
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
  refresh: () => void;
}

const CategoryLists = ({ categories, session, refresh }: CategoryListsProps) => {
  const sortedCategories = categories.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const [error, setError] = useState(false);
  const handleDelete = async (id: string) => {
    if (session) {
      const res = await fetch(`${BACKEND_URL}/categories/delete`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${session.backendTokens.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (res.ok) {
        await refresh();
      } else{
        setError(true);
      }
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
      <div className="bg-white p-5 rounded-xl shadow-md flex-1">
        <p className="font-semibold mb-2 border-b-2 pb-2">Category List</p>
        <p className="text-red-400">{error && "Failed to delete category"
          }</p>

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
                <TableCell>
                  <div className="flex gap-3 ml-24">
                    <PopOverCategory category={category} session={session} refresh={refresh}/>
                    <button onClick={() => handleDelete(category.id)}>
                      <Trash2 className="cursor-pointer text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryLists;
