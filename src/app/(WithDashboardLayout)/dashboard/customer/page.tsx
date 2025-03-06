import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import MealCard from "@/components/ui/core/mealCard/MealCard";
import { getAllMeals } from "@/services/mealService";
import { IMeal } from "@/types";

// type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const CustomerDashboardPage = async () => {
  //   const query = await searchParams;

  const { data: meals } = await getAllMeals(undefined, undefined, undefined);
  console.log("🚀 ~ CustomerDashboardPage ~ meals:", meals);
  return (
    <CustomContainer>
      <h2 className="text-2xl font-bold my-5 text-center">Explore Meal</h2>
      <div className="grid grid-cols-3 gap-8">
        {meals?.map((meal: IMeal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </CustomContainer>
  );
};

export default CustomerDashboardPage;
