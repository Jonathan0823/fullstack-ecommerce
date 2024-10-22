"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constant";

interface SelectUserRoleProps {
  user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  }
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
}

export function SelectUserRole({ user, session }: SelectUserRoleProps) {
  const status = user.isAdmin ? "Admin" : "User";
  const handleChange = async (value: string) => { 
    const status = value === "admin" ? true : false;
    await fetch(`${BACKEND_URL}/user/${user.id}`, {
      method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
        body: JSON.stringify({ isAdmin: status }),
    });

  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="user">
            User
          </SelectItem>
          <SelectItem value="admin">
            Admin
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
