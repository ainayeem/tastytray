export interface IUser {
  _id: string;
  email: string;
  role: "customer" | "mealProvider";
  iat?: number;
  exp?: number;
}
