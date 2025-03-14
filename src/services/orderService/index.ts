"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface MealItem {
  meal: string;
  quantity: number;
}

interface OrderData {
  meals: MealItem[];
  deliveryTime: string;
  customizations: string[];
}

// create order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (orderData: OrderData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(orderData),
    });

    revalidateTag("ORDER");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

//get all orders
export const getMyOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/customer-order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["ORDER"],
      },
    });

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// get meal provider orders
export const getMealProviderOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/meal-provider-order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["ORDER"],
      },
    });

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// update order status
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateOrderStatus = async (id: string, updateData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(updateData),
    });

    revalidateTag("ORDER");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};
