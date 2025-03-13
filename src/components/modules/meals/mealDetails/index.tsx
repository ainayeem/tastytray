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
import { toast } from "sonner";

interface OrderFormValues {
  quantity: string;
  deliveryTime: Date | null;
  customizations?: { value: string }[];
}

const MealDetails = ({ meal }: { meal: IMeal }) => {
  const form = useForm<OrderFormValues>({
    defaultValues: {
      quantity: "",
      deliveryTime: null,
      customizations: [],
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const quantity = watch("quantity");
  const deliveryTime = watch("deliveryTime");

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
          meal: meal?._id,
          quantity: Number(data.quantity),
        },
      ],
      deliveryTime: formatedTime,
      customizations: customizations,
    };

    // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ formatedData:", formatedData);
    // const res = await createOrder(formatedData);
    // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

    try {
      const res = await createOrder(formatedData);
      console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[40vh] mb-8">
        <Image src={meal?.imgUrl} alt={meal?.name} fill className="object-cover rounded-lg" priority />
        {!meal?.availability && (
          <div className="absolute top-6 left-6 bg-red-500 text-white px-6 py-2 rounded-full text-base font-medium">Out of Stock</div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{meal?.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{meal?.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {meal?.dietaryPreferences?.map((pref, index) => (
                <span key={index} className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
                  {pref}
                </span>
              ))}
            </div>

            {/* Price and Category Section */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-gradient-to-br from-primary/5 to-primary/10 p-3 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Price</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">BDT {meal?.price}</span>
                  <span className="text-gray-500">/meal</span>
                </div>
              </div>

              <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Category</p>
                </div>
                <p className="text-2xl font-semibold text-gray-800">{meal?.category}</p>
              </div>
            </div>

            {/* Meal Provider Section */}
            <div className="bg-gradient-to-br from-gray-50 via-gray-50 to-primary/5 p-3 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                      {meal?.mealProvider?.name?.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{meal?.mealProvider?.name}</p>
                    <p className="text-gray-500">Professional Meal Provider</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
                  <div className="bg-white/60 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-lg font-semibold">{meal?.mealProvider?.experience} Years</p>
                  </div>
                  <div className="bg-white/60 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Specialties</p>
                    <p className="text-lg font-semibold">{meal?.mealProvider?.cuisineSpecialties?.length} Cuisines</p>
                  </div>
                  {/* <div className="bg-white/60 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold truncate" title={meal?.mealProvider?.address}>Local Chef</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value || ""} className="focus:ring-primary h-12" min="1" />
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
                        <FormLabel className="text-gray-700 font-medium">Delivery Time</FormLabel>
                        <FormControl>
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                            className="w-full border rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                            // placeholderText="Select time"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Special Instructions</h3>
                        <p className="text-sm text-gray-500">Add any customizations</p>
                      </div>
                      <Button onClick={addCustomizations} variant="outline" size="sm" className="hover:bg-primary/10" type="button">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {customizationsFields.map((customizationsField, index) => (
                        <FormField
                          key={customizationsField.id}
                          control={form.control}
                          name={`customizations.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} value={field.value || ""} placeholder="E.g., Extra spicy" className="focus:ring-primary" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-medium mt-6" 
                    disabled={isSubmitting || !meal?.availability || !quantity || !deliveryTime}
                  >
                    {isSubmitting 
                      ? "Placing Order..." 
                      : !meal?.availability 
                      ? "Out of Stock" 
                      : !quantity || !deliveryTime 
                      ? "Please fill required fields" 
                      : "Place Order"
                    }
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
