"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMeal } from "@/services/mealService";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddMealForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      portionSize: "",
      availability: false,
      ingredients: [{ value: "" }],
      dietaryPreferences: [{ value: "" }],
      imgUrl: "",
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = form;

  const { append: appendIngredient, fields: ingredientFields } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addIngredient = () => appendIngredient({ value: "" });

  const { append: appendDietary, fields: dietaryFields } = useFieldArray({
    control,
    name: "dietaryPreferences",
  });

  const addDietary = () => appendDietary({ value: "" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedData = {
      name: data.name,
      category: data.category,
      description: data.description,
      portionSize: data.portionSize,
      availability: data.availability,
      ingredients: data.ingredients.map((ingredient: { value: string }) => ingredient.value),
      dietaryPreferences: data.dietaryPreferences.map((pref: { value: string }) => pref.value),
      price: parseFloat(data.price),
      imgUrl: "https://www.crowdedkitchen.com/wp-content/uploads/2020/07/vegan-breakfast-bowl.jpg",
    };

    console.log("Form Submitted Data:", formattedData);
    try {
      const res = await addMeal(formattedData);
      console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/mealProvider");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <h1 className="text-xl font-bold mb-5">Add Product</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="portionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portion Size</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="h-36 resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-5">
            <div className="flex justify-between items-center border-t border-b py-3">
              <p className="text-primary font-bold text-xl">Ingredients</p>
              <Button variant="outline" className="size-10" onClick={addIngredient} type="button">
                <Plus className="text-primary" />
              </Button>
            </div>
            {ingredientFields.map((ingredientField, index) => (
              <FormField
                key={ingredientField.id}
                control={control}
                name={`ingredients.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredient {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="my-5">
            <div className="flex justify-between items-center border-t border-b py-3">
              <p className="text-primary font-bold text-xl">Dietary Preferences</p>
              <Button onClick={addDietary} variant="outline" className="size-10" type="button">
                <Plus className="text-primary" />
              </Button>
            </div>
            {dietaryFields.map((dietaryField, index) => (
              <FormField
                key={dietaryField.id}
                control={control}
                name={`dietaryPreferences.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preference {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Meal..." : "Add Meal"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
