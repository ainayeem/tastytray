"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMeal } from "@/services/mealService";
import { BadgeIndianRupee, ChefHat, FileText, Gauge, ListChecks, Plus, Tag, Trash2, UtensilsCrossed } from "lucide-react";
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

  const { append: appendIngredient, fields: ingredientFields, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addIngredient = () => appendIngredient({ value: "" });

  const { append: appendDietary, fields: dietaryFields, remove: removeDietary } = useFieldArray({
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

    try {
      const res = await addMeal(formattedData);

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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Add New Meal
          </h1>
          <p className="text-gray-500 mt-2">Fill in the details to add a new meal to your menu</p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-primary" />
                      Meal Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter meal name" 
                        {...field}
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                      />
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
                    <FormLabel className="flex items-center gap-2">
                      <BadgeIndianRupee className="w-4 h-4 text-primary" />
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter price" 
                        {...field}
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                      />
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
                    <FormLabel className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter category" 
                        {...field}
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                      />
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
                    <FormLabel className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-primary" />
                      Portion Size
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter portion size" 
                        {...field}
                        className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                      />
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter meal description" 
                      className="h-36 resize-none bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 bg-gray-50/50 p-4 rounded-lg border border-gray-200">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                    />
                  </FormControl>
                  <FormLabel className="font-medium cursor-pointer">Available for Order</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Ingredients</h3>
                </div>
                <Button 
                  onClick={addIngredient} 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-primary/5 hover:text-primary transition-colors" 
                  type="button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-4">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <FormField
                      control={control}
                      name={`ingredients.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder={`Enter ingredient ${index + 1}`} 
                              {...field}
                              className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-rose-50 hover:text-rose-500"
                      onClick={() => removeIngredient(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Dietary Preferences</h3>
                </div>
                <Button 
                  onClick={addDietary} 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-primary/5 hover:text-primary transition-colors" 
                  type="button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Preference
                </Button>
              </div>

              <div className="space-y-4">
                {dietaryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <FormField
                      control={control}
                      name={`dietaryPreferences.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder={`Enter dietary preference ${index + 1}`} 
                              {...field}
                              className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-rose-50 hover:text-rose-500"
                      onClick={() => removeDietary(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Meal..." : "Add Meal"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
