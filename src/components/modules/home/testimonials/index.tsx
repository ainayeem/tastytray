import { Card, CardContent } from "@/components/ui/card";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    image:
      "https://media.istockphoto.com/id/653052274/photo/female-model-with-beautiful-smile.jpg?s=1024x1024&w=is&k=20&c=4ubCo2WCQ3MsqsBQe1YFRDk2KH09Rwfd3mwbYD68rrQ=",
    feedback:
      "TastyTray has completely transformed my meal planning. The variety of options and flexibility in scheduling make it perfect for my busy lifestyle.",
  },
  {
    name: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    feedback:
      "The quality of meals is outstanding, and the customer service is exceptional. I love how I can customize my meal plan based on my dietary needs.",
  },
  {
    name: "Emma Davis",
    image: "https://www.wigs.com/cdn/shop/articles/Untitled_design-17_65415afc-b891-4b87-af73-fb6da71e3cde.jpg?v=1563406666",
    feedback: "As a vegan, I appreciate the wide range of plant-based options. The meals are always fresh and delicious!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-rose-50">
      <CustomContainer>
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                   <div className="flex justify-between items-center">
                   <div>
                     <div>
                        <p className="font-semibold pb-4">{testimonial.name}</p>
                      </div>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                     </div>

                      <div className="mb-4">
                      <Image src={testimonial.image} className="rounded-full" alt={testimonial.name} width={50} height={50} />
                    </div>
                   </div>
                   
                     
                   
                    <q className="text-gray-600 mb-4">{testimonial.feedback}</q>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default Testimonials;
