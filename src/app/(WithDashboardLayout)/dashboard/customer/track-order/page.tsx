import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { getMyOrders } from "@/services/orderService";
import { IOrder } from "@/types/order";
import { Clock, Package, User, Utensils } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TrackOrderPage = async () => {
  const { data: orders } = await getMyOrders();

  return (
    <CustomContainer>
      <h1 className="text-3xl font-bold mb-8">Track Orders</h1>
      {orders?.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order: IOrder) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-semibold">{order._id}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium">BDT {order.totalPrice}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium uppercase ${getStatusColor(order.status)}`}>{order.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Meals and Customizations Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Meals Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Utensils className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Ordered Items</h3>
                    </div>
                    <div className="grid gap-4">
                      {order.meals.map(({ meal, quantity }) => (
                        <div key={meal._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{meal.name}</p>
                            {/* <p className="text-sm text-gray-600 mt-1">{meal.description}</p> */}
                            <div className="mt-2">
                              <span className="text-sm font-medium text-primary">Quantity: {quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customizations Section - Only show if there are customizations */}
                  {order.customizations && order?.customizations?.length > 0 && (
                    <div className="">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">Special Instructions</h3>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="list-disc pl-5 space-y-2">
                          {order.customizations.map((customization, index: number) => (
                            <li key={index} className="text-gray-700">
                              {customization}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Meal Provider Section */}
                  {order.mealProvider && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">Meal Provider Details</h3>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-gray-900">{order.mealProvider.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{order.mealProvider.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No orders found.</p>
        </div>
      )}
    </CustomContainer>
  );
};

export default TrackOrderPage;
