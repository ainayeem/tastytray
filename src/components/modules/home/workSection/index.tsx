import enjoyDelivery from "@/assets/delivery.jpg";
import selectMeals from "@/assets/select-meal.jpg";
import setPreference from "@/assets/set-preferences.jpg";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import Image from "next/image";

const steps = [
  {
    image: setPreference,
    alt: "Set your preferences",
    title: "1. Set Your Preferences",
    description: "Choose your dietary restrictions, favorite cuisines, and meal preferences.",
  },
  {
    image: selectMeals,
    alt: "Select your meals",
    title: "2. Select Your Meals",
    description: "Browse our curated menu and select meals that match your preferences.",
  },
  {
    image: enjoyDelivery,
    alt: "Enjoy delivery",
    title: "3. Enjoy Delivery",
    description: "Get your meals delivered fresh and ready to enjoy at your preferred time.",
  },
];

const WorkSection = () => {
  return (
    <section className="bg-rose-50">
      <CustomContainer>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image src={step.image} alt={step.alt} fill className="object-cover rounded-full" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default WorkSection;
