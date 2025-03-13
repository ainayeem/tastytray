interface IFormattedMeal {
  meal: string;
  quantity: number;
}

export interface IFormattedData {
  meals: IFormattedMeal[];
  deliveryTime: string;
  customizations: string[];
}
export interface IMeal {
  _id: string;
  mealProvider: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMealOrder {
  meal: IMeal;
  quantity: number;
  _id: string;
}

export interface IMealProvider {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cuisineSpecialties: string[];
  experience: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  _id: string;
  user: IUser;
  meals: Array<{
    meal: IMeal;
    quantity: number;
    _id: string;
  }>;
  mealProvider: IMealProvider;
  status: string;
  orderDate: string;
  totalPrice: number;
  customizations?: string[];
  createdAt: string;
  updatedAt: string;
}
