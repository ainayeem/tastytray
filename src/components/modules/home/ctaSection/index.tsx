"use client";

import { Button } from "@/components/ui/button";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const CtaSection = () => {
  const { user } = useUser();
  return (
    <CustomContainer className="py-10">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-rose-600 text-white rounded-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Meal Planning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have simplified their meal planning journey.</p>
          {/* <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50">
            Start Your Journey Today
          </Button> */}
          <Link href={`/dashboard/${user?.role}`}>
            <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50 cursor-pointer">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>
    </CustomContainer>
  );
};

export default CtaSection;
