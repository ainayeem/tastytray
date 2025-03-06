interface IFormattedMeal {
  meal: string;
  quantity: number;
}

export interface IFormattedData {
  meals: IFormattedMeal[];
  deliveryTime: string;
  customizations: string[];
}
