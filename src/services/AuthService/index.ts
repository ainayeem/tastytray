"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerCustomer = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/create-customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error) {
    return Error((error as Error).message);
  }
};

export const registerMealProvider = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/create-mealProvider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error) {
    return Error((error as Error).message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data);
    }

    return result;
  } catch (error) {
    return Error((error as Error).message);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};

//get my profile
export const getMyProfile = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["PROFILE"],
      },
    });

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// update profile
export const updateProfile = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/my-profile-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },

      body: JSON.stringify(userData),
    });
    revalidateTag("PROFILE");

    return res.json();
  } catch (error) {
    return Error((error as Error).message);
  }
};

// get meal provider profile
// export const getMealProviderProfile = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/my-profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: (await cookies()).get("accessToken")!.value,
//       },
//       next: {
//         tags: ["PROFILE"],
//       },
//     });

//     return res.json();
//   } catch (error) {
//     return Error((error as Error).message);
//   }
// };
