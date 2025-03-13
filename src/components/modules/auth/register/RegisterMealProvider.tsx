"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { registerMealProvider } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mealProviderRegistrationSchema } from "./registerValidation";

const RegisterMealProvider = () => {
  const form = useForm({
    resolver: zodResolver(mealProviderRegistrationSchema),
  });

  const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  //   console.log(password, passwordConfirm);

  const { append: appendCuisineSpecialties, fields: cuisineSpecialtiesFields } = useFieldArray({
    control: form.control,
    name: "cuisineSpecialties",
  });

  const addCuisineSpecialties = () => {
    appendCuisineSpecialties({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const cuisineSpecialties = data.cuisineSpecialties.map((cuisineSpecialty: { value: string }) => cuisineSpecialty.value);

    const formatedData = {
      password: data.password,
      mealProvider: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        cuisineSpecialties: cuisineSpecialties,
        experience: Number(data.experience),
      },
    };
    try {
      const res = await registerMealProvider(formatedData);

      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message);
        reset();
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl max-w-lg w-full p-10">
      <div className="flex items-center space-x-4 mb-8">
        
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage className="text-rose-500"> Password does not match </FormMessage>
                ) : (
                  <FormMessage className="text-rose-500" />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Phone</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Experience</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    value={field.value || ""} 
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          <div>
            <div className="flex justify-between items-center my-5">
              <p className="text-primary font-bold text-xl">Cuisine Specialties</p>
              <Button onClick={addCuisineSpecialties} variant="outline" className="size-10" type="button">
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5 space-y-4">
              {cuisineSpecialtiesFields.map((cuisineSpecialtiesField, index) => (
                <div key={cuisineSpecialtiesField.id}>
                  <FormField
                    control={form.control}
                    name={`cuisineSpecialties.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine Specialties {index + 1}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            value={field.value || ""} 
                            className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button 
            disabled={!passwordConfirm || password !== passwordConfirm} 
            type="submit" 
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterMealProvider;
