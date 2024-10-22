"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

interface refresh {
  refresh: () => void;
  session: {
    backendTokens: {
      accessToken: string;
    };
  }
}

const CategoryForm = ({ refresh, session }: refresh) => {
  
  
  const [name, setName] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  useEffect(() => {
    if (error) {
      setSuccess(false);
      const timer = setTimeout(() => {
        setError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (success){
      setError(false);
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name) return setError(true);
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
        setError(true);
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
          onChange={(e) => setName(e.target.value)}
        />
        {success && <p className="text-green-500">Category Created</p>}
        {error && <p className="text-red-500">Something went wrong, make sure theres no duplicate</p>}
        <Button className="mt-3" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CategoryForm;
