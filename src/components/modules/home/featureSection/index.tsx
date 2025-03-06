import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { ChefHat, Clock, Heart, Utensils } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Expert-Crafted Meals",
    description: "Quality meals prepared by professional chefs",
  },
  {
    icon: Heart,
    title: "Personalized Plans",
    description: "Customize meals based on your preferences",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Choose your preferred delivery times",
  },
  {
    icon: Utensils,
    title: "Diverse Menu",
    description: "Wide variety of cuisines and dietary options",
  },
];

const FeatureSection = () => {
  return (
    <CustomContainer>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose TastyTray?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <feature.icon className="h-8 w-8 text-rose-600 mb-2 mx-auto" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default FeatureSection;
