"use client";

import { updateOrderStatus } from "@/services/orderService";
import { toast } from "sonner";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

const UpdateOrder = ({ orderId, currentStatus }: OrderStatusSelectProps) => {
  const handleStatusUpdate = async (newStatus: string) => {
    const updateData = { status: newStatus };
    try {
      const res = await updateOrderStatus(orderId, updateData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error((err as Error)?.message);
    }
  };
  return (
    <div>
      <select
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => handleStatusUpdate(e.target.value)}
        defaultValue={currentStatus}
      >
        <option value="" disabled>
          Update Status
        </option>
        <option value="pending">Pending</option>
        <option value="inProgress">In Progress</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>
  );
};

export default UpdateOrder;
