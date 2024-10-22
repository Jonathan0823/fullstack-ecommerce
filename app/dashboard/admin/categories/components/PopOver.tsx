import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BACKEND_URL } from "@/lib/constant";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  updatedAt: string;
}


interface PopOverCategoryProps {

  category: Category;
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
  refresh: () => void; 
}

export function PopOverCategory({category, session, refresh}: PopOverCategoryProps) {

  const [name, setName] = useState("");

  const handleEdit = async (id: string) => { 
    const res = await fetch(`${BACKEND_URL}/categories/update`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: name }),
    });
    if (res.ok) {
      await refresh();
    } else {
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Pencil className="cursor-pointer text-blue-500" />{" "}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                defaultValue={category.name}
                className="col-span-2 h-8"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button className="mt-3" type="submit" onClick={() => {handleEdit(category.id)}}>Edit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
