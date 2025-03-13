"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getMyProfile, updateProfile } from "@/services/AuthService";
import { ChefHat, Mail, MapPin, Phone, Plus, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type CuisineSpecialty = {
  value: string;
};

const UpdateMealProviderProfileForm = () => {
  const [myProfile, setMyProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: 0,
    cuisineSpecialties: [] as string[],
  });

  const form = useForm({
    defaultValues: {
      name: myProfile.name,
      email: myProfile.email,
      phone: myProfile.phone,
      address: myProfile.address,
      experience: myProfile.experience?.toString(),
      cuisineSpecialties: myProfile.cuisineSpecialties?.map((specialty) => ({ value: specialty })) || ([] as CuisineSpecialty[]),
    },
  });

  useEffect(() => {
    (async () => {
      const myProfile = (await getMyProfile()).data;
      setMyProfile(myProfile);
      console.log("🚀 ~ myProfile:", myProfile);

      form.reset({
        name: myProfile.name,
        email: myProfile.email,
        phone: myProfile.phone,
        address: myProfile.address,
        experience: myProfile.experience?.toString(),
        cuisineSpecialties: myProfile.cuisineSpecialties?.map((value: string) => ({ value })) || ([] as CuisineSpecialty[]),
      });
    })();
  }, []);

  const {
    formState: { isSubmitting },
  } = form;

  const {
    append: appendCuisineSpecialties,
    fields: cuisineSpecialtiesFields,
    remove: removeCuisineSpecialty,
  } = useFieldArray({
    control: form.control,
    name: "cuisineSpecialties",
  });

  const addCuisineSpecialties = () => {
    appendCuisineSpecialties({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const cuisineSpecialties = (data.cuisineSpecialties as CuisineSpecialty[]).map((cuisineSpecialty) => cuisineSpecialty.value);

    const formatedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cuisineSpecialties: cuisineSpecialties,
      experience: Number(data.experience),
    };
    // form.reset(formatedData);

    try {
      const res = await updateProfile(formatedData);

      if (res?.success) {
        toast.success(res?.message);
        // reset();
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Update Profile</h1>
        <p className="text-gray-500 mt-2">Update your profile information below</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                    />
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                    />
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
                  <FormLabel className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    Experience (Years)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Years of experience"
                      type="number"
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
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Cuisine Specialties</h3>
              </div>
              <Button
                onClick={addCuisineSpecialties}
                variant="outline"
                size="sm"
                className="hover:bg-primary/5 hover:text-primary transition-colors"
                type="button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Specialty
              </Button>
            </div>

            <div className="space-y-4">
              {cuisineSpecialtiesFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <FormField
                    control={form.control}
                    name={`cuisineSpecialties.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Cuisine specialty ${index + 1}`}
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
                    className="hover:bg-rose-50 hover:text-rose-500 -mt-1"
                    onClick={() => removeCuisineSpecialty(index)}
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
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateMealProviderProfileForm;
