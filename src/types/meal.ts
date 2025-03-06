interface IMealProvider {
  address: string;
  availableMeals: string[]; // Can be further typed if necessary
  createdAt: string;
  cuisineSpecialties: string[];
  email: string;
  experience: number;
  name: string;
  phone: string;
  reviews: string[]; // Can be further typed if necessary
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export interface IMeal {
  availability: boolean;
  category: string;
  createdAt: string;
  description: string;
  dietaryPreferences: string[];
  imgUrl: string;
  ingredients: string[];
  mealProvider: IMealProvider;
  name: string;
  portionSize: string;
  price: number;
  updatedAt: string;
  _id: string;
}
