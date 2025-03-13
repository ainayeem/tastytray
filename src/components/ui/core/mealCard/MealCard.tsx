"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IMeal } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../button";

const MealCard = ({ meal }: { meal: IMeal }) => {
  // const handleAddProduct = (meal: IMeal) => {
  //   console.log("🚀 ~ handleAddProduct ~ meal:", meal);
  // };

  return (
    <Card className="group overflow-hidden hover:shadow-md transition-all p-2">
      <div className="relative aspect-square">
        <Image
          src={meal?.imgUrl || "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
          fill
          alt={meal?.name}
          className="object-cover transition-transform group-hover:scale-105 rounded-lg"
        />
        {!meal?.availability && <div className="absolute left-0 top-0 bg-red-500 text-white px-3 py-1 text-sm">Out of Stock</div>}
      </div>

      <CardContent className="p-2">
        <div className="mb-3">
          <CardTitle className="text-lg font-semibold mb-1 line-clamp-1">{meal?.name}</CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">BDT {meal?.price}</p>
            <div className="flex items-center gap-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm">{meal?.category}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">{meal?.mealProvider?.name?.charAt(0)}</div>
            <p className="text-sm text-gray-600">{meal?.mealProvider?.name}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {meal?.dietaryPreferences?.map((pref, index) => (
              <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-md">
                {pref}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/dashboard/customer/order-meal/${meal?._id}`} className="flex-1">
            <Button disabled={!meal?.availability} className="w-full cursor-pointer" variant={meal?.availability ? "default" : "outline"}>
              {meal?.availability ? "Order Now" : "Out of Stock"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
