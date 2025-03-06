"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/services/orderService";
import { IMeal } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const MealDetails = ({ meal }: { meal: IMeal }) => {
  const mealId = "67c7f8c0da22f4e024a817c2";

  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendCustomizations, fields: customizationsFields } = useFieldArray({
    control: form.control,
    name: "customizations",
  });

  const addCustomizations = () => {
    appendCustomizations({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const customizations = data.customizations.map((customization: { value: string }) => customization.value);

    const formatedTime = data?.deliveryTime?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formatedData = {
      meals: [
        {
          meal: mealId,
          quantity: Number(data.quantity),
        },
      ],
      deliveryTime: formatedTime,
      customizations: customizations,
    };

    console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ formatedData:", formatedData);
    const res = await createOrder(formatedData);
    console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

    // try {
    //   const res = await createOrder(formatedData);
    //   console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

    //   if (res?.success) {
    //     toast.success(res?.message);
    //   } else {
    //     toast.error(res?.message);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="grid grid-cols-2 gap-4 border border-white p-4 rounded-md my-5 shadow-sm">
      <div>
        <Image src={meal?.imgUrl} alt="product image" width={500} height={500} className="rounded-md w-full object-cover h-80" />
      </div>
      <div className="bg-white rounded-md p-4">
        <h2 className="font-bold text-xl mb-4">{meal?.name}</h2>
        <p className="text-justify text-gray-500 font-light text-sm">{meal?.description}</p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
          <p className="rounded-full px-4 py-1 bg-gray-100">Stock: {meal?.availability}</p>
          <p className="rounded-full px-4 py-1 bg-gray-100">Category: {meal?.category}</p>
        </div>
        <hr />
        <p className="my-2 font-bold">
          Price: <span className="font-semibold">$ {meal?.price}</span>
        </p>
        <hr />

        {/* take order */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15} // Allows selection every 15 minutes
                      timeCaption="Schedule"
                      dateFormat="hh:mm aa" // 12-hour format with AM/PM
                      className="border p-2 rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="flex justify-between items-center my-5">
                <p className="text-primary font-bold text-xl">Customizations</p>
                <Button onClick={addCustomizations} variant="outline" className="size-10" type="button">
                  <Plus className="text-primary" />
                </Button>
              </div>

              <div className="my-5">
                {customizationsFields.map((customizationsField, index) => (
                  <div key={customizationsField.id}>
                    <FormField
                      control={form.control}
                      name={`customizations.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customizations {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Placing Order..." : "Order Now"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MealDetails;
