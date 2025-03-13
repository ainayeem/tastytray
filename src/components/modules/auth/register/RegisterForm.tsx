import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import RegisterCustomer from "./RegisterCustomer";
import RegisterMealProvider from "./RegisterMealProvider";

const RegisterForm = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-3xl max-w-xl w-full p-12">
      <div className="flex items-center space-x-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Register</h1>
          <p className="text-base text-gray-600">Join us today and start your journey!</p>
        </div>
      </div>
      {/* tabs */}
      <Tabs defaultValue="customer" className="mt-5">
        <TabsList className="w-full flex justify-center space-x-4">
          <TabsTrigger value="customer" className="cursor-pointer">As Customer</TabsTrigger>
          <TabsTrigger value="mealProvider" className="cursor-pointer">As Meal Provider</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <RegisterCustomer />
        </TabsContent>
        <TabsContent value="mealProvider">
          <RegisterMealProvider />
        </TabsContent>
      </Tabs>

      <p className="text-base text-gray-600 text-center mt-6">
        Already have an account? 
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterForm;
