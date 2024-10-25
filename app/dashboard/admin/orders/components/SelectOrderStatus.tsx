"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constant";

interface SelectOrderStatusProps {
  status: string;
  orderId: string;
  session: {
    backendTokens: {
      accessToken: string;
    };
  };
}

const SelectOrderStatus = ({
  status,
  orderId,
  session,
}: SelectOrderStatusProps) => {
  const handleChange = async (status: string) => {
    await fetch(`${BACKEND_URL}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${session.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`${status}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="processing">processing</SelectItem>
          <SelectItem value="shipped">shipped</SelectItem>
          <SelectItem value="delivered">delivered</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOrderStatus;
