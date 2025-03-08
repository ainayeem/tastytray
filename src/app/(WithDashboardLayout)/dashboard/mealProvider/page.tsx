import MealList from "@/components/modules/meals/mealList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllMeals } from "@/services/mealService";

const MealProviderDashboardPage = async () => {
  const { data, meta } = await getAllMeals();
  return (
    <div>
      <Tabs defaultValue="meals" className="">
        <TabsList className="w-full flex justify-center">
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="meals">
          <MealList meals={data} meta={meta} />
        </TabsContent>
        <TabsContent value="orders">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default MealProviderDashboardPage;
