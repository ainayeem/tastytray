"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/services/AuthService";
import { IMealProvider } from "@/types";
import { Plus } from "lucide-react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateMealProviderProfileForm = ({ myProfile }: { myProfile: IMealProvider }) => {
  //   console.log("🚀 ~ UpdateMealProviderProfileForm ~ myProfile:", myProfile);
  const form = useForm({
    //   resolver: zodResolver(mealProviderRegistrationSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const { append: appendCuisineSpecialties, fields: cuisineSpecialtiesFields } = useFieldArray({
    control: form.control,
    name: "cuisineSpecialties",
  });

  const addCuisineSpecialties = () => {
    appendCuisineSpecialties({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:", data);
    const cuisineSpecialties = data.cuisineSpecialties.map((cuisineSpecialty: { value: string }) => cuisineSpecialty.value);

    const formatedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cuisineSpecialties: cuisineSpecialties,
      experience: Number(data.experience),
    };
    try {
      const res = await updateProfile(formatedData);

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
    <div>
      <h1>update profile</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={myProfile.name} {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={myProfile.email} type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder={myProfile.phone} {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder={myProfile.address} {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input placeholder={myProfile?.experience?.toString()} {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
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

              <div className="my-5">
                {cuisineSpecialtiesFields.map((cuisineSpecialtiesField, index) => (
                  <div key={cuisineSpecialtiesField.id}>
                    <FormField
                      control={form.control}
                      name={`cuisineSpecialties.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cuisine Specialties {index + 1}</FormLabel>
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
              {isSubmitting ? "Updating..." : "Update"}
              {/* register */}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateMealProviderProfileForm;
