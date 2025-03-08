import MealList from "@/components/modules/meals/mealList";
import { getAllMeals } from "@/services/mealService";

const MealProviderDashboardPage = async () => {
  const { data, meta } = await getAllMeals();
  return (
    <div>
      <MealList meals={data} meta={meta} />
    </div>
  );
};

export default MealProviderDashboardPage;
