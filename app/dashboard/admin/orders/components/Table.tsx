import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { BACKEND_URL } from "@/lib/constant";
import { getServerSession } from "next-auth";
import SelectOrderStatus from "./SelectOrderStatus";

  export async function TableOrders() {
    const session = await getServerSession(authOptions);

    interface Order {
      user: {
        name: string;
      };
      userid: string;
      id: string;
      total: number;
      status: string;
      createdAt: string;
    }
    if (!session) return;

    const res = await fetch(`${BACKEND_URL}/orders`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${session.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        },
        });
        const orders = await res.json();

        const sortedOrdersbyCreateAt = orders.sort((a: Order, b: Order) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const formatpricetoidr = (price: number) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price);
          }
    return (
        <div className="bg-white p-5 rounded-xl shadow-md flex-1 overflow-x-auto min-h-svh">
            <Table className="mx-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Id</TableHead>
                  <TableHead className="w-44">Name</TableHead>
                  <TableHead className="w-64">Total</TableHead>
                  <TableHead className="w-20">Status</TableHead>
                  <TableHead className="w-32">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrdersbyCreateAt.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell className="w-2">{formatpricetoidr(order.total)}</TableCell>
                    <TableCell>
                        <SelectOrderStatus status={order.status} orderId={order.id} session={session} />
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      );
  }