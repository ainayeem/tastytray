import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import RegisterCustomer from "./RegisterCustomer";
import RegisterMealProvider from "./RegisterMealProvider";

const RegisterForm = () => {
  return (
    <section className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm">Join us today and start your journey!</p>
        </div>
      </div>
      {/* tabs */}
      <Tabs defaultValue="customer" className="mt-5">
        <TabsList className="w-full">
          <TabsTrigger value="customer">As Customer</TabsTrigger>
          <TabsTrigger value="mealProvider">As Meal Provider</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <RegisterCustomer />
        </TabsContent>
        <TabsContent value="mealProvider">
          <RegisterMealProvider />
        </TabsContent>
      </Tabs>

      {/*  */}
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterForm;
