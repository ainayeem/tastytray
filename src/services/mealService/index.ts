"use server";

import { ICreateMeal } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all meals
export const getAllMeals = async (
  //
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  //   if (query?.price) {
  //     params.append("minPrice", "0");
  //     params.append("maxPrice", query?.price.toString());
  //   }
  //   if (query?.category) {
  //     params.append("categories", query?.category.toString());
  //   }
  //   if (query?.brand) {
  //     params.append("brands", query?.brand.toString());
  //   }
  //   if (query?.rating) {
  //     params.append("ratings", query?.rating.toString());
  //   }
  if (query?.searchTerm) {
    params.append("searchTerm", query?.searchTerm.toString());
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers?limit=${limit}&page=${page}&${params}`, {
      next: {
        tags: ["MEAL"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return Error((error as Error).message);
  }
};

// get single meal
export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/${mealId}`, {
      next: {
        tags: ["MEAL"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return Error((error as Error).message);
  }
};

// add meal
export const addMeal = async (data: ICreateMeal) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("MEAL");
    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};
