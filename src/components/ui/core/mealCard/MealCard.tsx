"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IMeal } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../button";

const MealCard = ({ meal }: { meal: IMeal }) => {
  const handleAddProduct = (meal: IMeal) => {
    console.log("🚀 ~ handleAddProduct ~ meal:", meal);
  };

  return (
    <Card className="p-3">
      <CardHeader className="relative p-0 h-48">
        <Image
          src={meal?.imgUrl || "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
          width={500}
          height={500}
          alt={meal?.name}
          className="rounded-sm h-48 object-cover"
        />
        {meal?.availability === false && <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">Out of Stock</div>}
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        {/* <Link href={`/products/${meal?._id}`} passHref> */}
        <CardTitle title={meal?.name} className="font-semibold text-sm">
          {meal?.name.length > 30 ? meal?.name?.slice(0, 30) + "..." : meal?.name}
        </CardTitle>
        {/* </Link> */}

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">Price:{meal?.price}</p>
          <p className="text-sm text-gray-600">Category:{meal?.category}</p>
          <p className="text-sm text-gray-600">meal provider name:{meal?.mealProvider.name}</p>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
          <Link href={`/dashboard/customer/order-meal/${meal?._id}`} passHref>
            <Button disabled={meal?.availability === true} size="sm" variant="outline" className="w-32">
              View
            </Button>
          </Link>
          {/* <Button
            onClick={() => handleAddProduct(meal)}
            disabled={meal?.availability === false}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            Order Now
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
