import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import Image from "next/image";

const meals = [
  {
    image: "https://thebigmansworld.com/wp-content/uploads/2024/01/mediterranean-bowl-recipe.jpg",
    alt: "Healthy bowl",
    title: "Mediterranean Bowl",
    description: "Fresh and healthy Mediterranean-inspired bowl",
  },
  {
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh47-G4k75sEhfQH8lQgCAW8tpNWSSfskY-F-YsKcBKhm_0ouVmtXCWn6O9DfcyZjYgU4MAPOjLuJx9R8aQMCXu2P3jIe_5t-W2QCMxti6LmQS2KImPpHhWbBW3kfo0OBu3D_3nNRbz2omf/s1600/powerplate1.jpeg",
    alt: "Protein plate",
    title: "Protein Power Plate",
    description: "High-protein meal perfect for fitness enthusiasts",
  },
  {
    image: "https://recipeswecherish.com/wp-content/uploads/2021/06/wp-1623811289735-scaled.jpg",
    alt: "Vegan delight",
    title: "Vegan Delight",
    description: "Plant-based meal packed with nutrients",
  },
];

const PopularMeals = () => {
  return (
    <CustomContainer>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Meal Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal, index) => (
              <Card key={index} className="overflow-hidden pt-0">
                <div className="relative h-50">
                  <Image src={meal.image} alt={meal.alt} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{meal.title}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default PopularMeals;
