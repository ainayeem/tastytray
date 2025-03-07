import SearchBar from "@/components/modules/meals/searchBar";
import MealCard from "@/components/ui/core/mealCard/MealCard";
import { getAllMeals } from "@/services/mealService";
import { IMeal } from "@/types";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FindMealsPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = await searchParams;
  const { data: meals } = await getAllMeals(undefined, undefined, query);
  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals?.length > 0 ? (
          meals.map((meal: IMeal) => <MealCard key={meal._id} meal={meal} />)
        ) : (
          <h1 className="text-center text-5xl font-semibold">No meal found</h1>
        )}
      </div>
    </div>
  );
};

export default FindMealsPage;
