"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SelectUserRole } from "./SelectButton";

export function TableUser() {
  const { data: session } = useSession();

  interface User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    createdAt: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    const res = await fetch(`${BACKEND_URL}/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  useEffect(() => {
    setLoading(false);
  }, [users]);

const sortUsersByCreatedAt = (users: User[]) => {
    return users.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};



  return (
    <div>
      {!loading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-[120px]">Email</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortUsersByCreatedAt(users).map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                {session && (
                  <SelectUserRole user={user} session={session} />
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
