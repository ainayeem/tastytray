"use client";

import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { useUser } from "@/context/UserContext";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const { user } = useUser();
  return (
    <CustomContainer className="pt-10">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 h-96">
        <div className="absolute inset-0 overflow-hidden rounded-lg h-full">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={hero}
            alt="Delicious healthy meals"
            fill
            className="object-cover"
            // priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Your Personalized Meal Planning Solution</h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Discover delicious meals tailored to your preferences. Plan, customize, and enjoy hassle-free meal delivery.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/dashboard/${user?.role}`}>
              <Button size="lg" className="cursor-pointer">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default HeroSection;
