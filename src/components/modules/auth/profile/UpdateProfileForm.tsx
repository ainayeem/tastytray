"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getMyProfile, updateProfile } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateProfileForm = () =>
  // { myProfile }: { myProfile: IMyProfileData }
  {
    const [myProfile, setMyProfile] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    const form = useForm({
      // resolver: zodResolver(customerRegistrationSchema),
    });
    useEffect(() => {
      (async () => {
        const myProfile = (await getMyProfile()).data;
        setMyProfile(myProfile);
      })();
    }, []);

    const {
      formState: { isSubmitting },
      reset,
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:", data);

      try {
        const res = await updateProfile(data);

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
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={myProfile.name}
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
                        placeholder={myProfile.email}
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={myProfile.phone}
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
                    <FormLabel className="text-gray-800">Delivery Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={myProfile.address}
                        {...field}
                        value={field.value || ""}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-5 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  };

export default UpdateProfileForm;
