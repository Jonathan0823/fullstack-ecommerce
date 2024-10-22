"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";
import React from "react";

interface refresh {
  refresh: () => void;
}

const CategoryForm = ({ refresh }: refresh) => {
  const { data: session } = useSession();

  const [name, setName] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(session);
    if (session) {
      try {
        const response = await fetch(`${BACKEND_URL}/categories/create`, {
          method: "POST",
          body: JSON.stringify({
            name: name,
          }),
          headers: {
            authorization: `Bearer ${session.backendTokens.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setSuccess(true);
        await refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full lg:w-[400px]">
      <form onSubmit={handleSubmit}>
        <p className="font-semibold mb-2">Create Category</p>
        <p className="text-sm">Name</p>
        <Input
          placeholder="Category Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        {success && <p className="text-green-500">Category Created</p>}
        <Button className="mt-3" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CategoryForm;
