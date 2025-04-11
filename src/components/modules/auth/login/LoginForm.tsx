"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setIsLoading } = useUser();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDemoLogin = async (role: "customer" | "mealProvider") => {
    const credentials =
      role === "customer" ? { email: "customer@test.com", password: "123456789" } : { email: "mealProvider@test.com", password: "123456789" };

    setValue("email", credentials.email);
    setValue("password", credentials.password);

    await onSubmit(credentials);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-3xl max-w-lg w-full p-10">
      <div className="flex items-center space-x-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Login</h1>
          <p className="text-base text-gray-600">Welcome back! Please enter your details below.</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
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
                    className="border border-gray-300 rounded-lg p-3 focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-lg hover:bg-primary-dark transition-all cursor-pointer">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
          {/* Demo Login Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button onClick={() => handleDemoLogin("customer")} type="submit" className="cursor-pointer">
              Demo Customer
            </Button>
            <Button onClick={() => handleDemoLogin("mealProvider")} type="submit" className="cursor-pointer">
              Demo Mealprovider
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-base text-gray-600 text-center mt-6">
        Don&apos;t have an account?
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
