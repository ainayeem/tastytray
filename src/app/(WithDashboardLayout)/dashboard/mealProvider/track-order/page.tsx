import UpdateOrder from "@/components/modules/order/UpdateOrder";
import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { getMealProviderOrders } from "@/services/orderService";
import { IOrder } from "@/types/order";
import { Calendar, Clock, Leaf, Package, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

interface IMeal {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imgUrl?: string;
  ingredients?: string[];
  dietaryPreferences?: string[];
  category?: string;
  mealProvider?: string;
  availability?: boolean;
  portionSize?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IOrderMeal {
  meal: IMeal;
  quantity: number;
  _id: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-500 text-white";
    case "processing":
      return "bg-blue-500 text-white";
    case "delivered":
      return "bg-emerald-500 text-white";
    case "cancelled":
      return "bg-rose-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const TrackOrderPage = async () => {
  const { data: orders } = await getMealProviderOrders();

  return (
    <CustomContainer>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-1">Manage and track your orders</p>
          </div>
          <div className="bg-primary/5 px-6 py-3 rounded-xl">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-3xl font-bold text-primary">{orders?.length}</p>
          </div>
        </div>

        {orders?.length > 0 ? (
          <div className="grid gap-8">
            {orders.map((order: IOrder) => {
              const orderDate = formatDate(order.orderDate);
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 border-b px-6 py-4">
                    <div className="flex flex-wrap gap-6 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-mono text-sm font-medium">{order._id}</p>
                        </div>
                        <div className="h-8 w-px bg-gray-200" />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{orderDate.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{orderDate.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <UpdateOrder orderId={order._id} currentStatus={order.status} />
                        <span className={`uppercase px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rest of the order details */}
                  <div className="p-6">
                    {/* Order Items */}
                    <div className="grid gap-6">
                      {order.meals.map(({ meal, quantity, _id }: IOrderMeal) => (
                        <div key={_id} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex flex-wrap gap-6 items-start">
                            {/* Meal Image */}
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image src={meal?.imgUrl || "/default-image.jpg"} alt={meal?.name || "Meal Image"} width={100} height={100} />
                            </div>

                            {/* Meal Details */}
                            <div className="flex-1 min-w-[300px]">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h4 className="font-medium text-gray-900">{meal.name}</h4>
                                  <p className="text-sm text-gray-500 mt-1">{meal.description}</p>
                                </div>
                                <div className="bg-primary/10 text-primary font-medium px-3 py-1.5 rounded-lg text-sm">{quantity}x</div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Ingredients */}
                                {meal.ingredients && meal.ingredients?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <UtensilsCrossed className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-700">Ingredients</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {meal.ingredients.map((ingredient: string, idx: number) => (
                                        <span key={idx} className="text-xs bg-white px-2 py-1 rounded border text-gray-600">
                                          {ingredient}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Dietary Preferences */}
                                {meal.dietaryPreferences && meal.dietaryPreferences?.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Leaf className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-700">Dietary Info</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {meal.dietaryPreferences.map((pref: string, idx: number) => (
                                        <span key={idx} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                                          {pref}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                                <div>
                                  <p className="text-sm text-gray-500">Price per item</p>
                                  <p className="font-medium">BDT {meal.price}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Total</p>
                                  <p className="font-medium">BDT {(meal.price * quantity).toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Yet</h3>
            <p className="text-gray-500">Your orders will appear here once customers place them.</p>
          </div>
        )}
      </div>
    </CustomContainer>
  );
};

export default TrackOrderPage;
