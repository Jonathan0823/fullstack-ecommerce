"use client";
import {
  Table,
  TableBody,
  TableCell,
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

  
  const sortedUsersbyCreateAt = users.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
      {!loading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">Id</TableHead>
              <TableHead className="w-44">Email</TableHead>
              <TableHead className="w-64">Name</TableHead>
              <TableHead className="w-auto">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsersbyCreateAt.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="w-2">{user.name}</TableCell>
                {session && <SelectUserRole user={user} session={session} />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
