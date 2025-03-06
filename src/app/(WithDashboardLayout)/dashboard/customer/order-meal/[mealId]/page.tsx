import MealDetails from "@/components/modules/meals/mealDetails";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { getSingleMeal } from "@/services/mealService";

const MealDetailsPage = async ({ params }: { params: Promise<{ mealId: string }> }) => {
  const { mealId } = await params;

  const { data: meal } = await getSingleMeal(mealId);
  //   console.log("🚀 ~ MealDetailsPage ~ meal:", meal);
  return (
    <CustomContainer>
      <h1>meal details</h1>
      <MealDetails meal={meal} />
    </CustomContainer>
  );
};

export default MealDetailsPage;
