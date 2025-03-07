import CustomContainer from "@/components/ui/core/customContainer/CustomContainer";
import { getMyOrders } from "@/services/orderService";
import { IOrder } from "@/types";

const TrackOrderPage = async () => {
  const { data: orders } = await getMyOrders();
  console.log("🚀 ~ TrackOrderPage ~ orders:", orders);

  return (
    <CustomContainer>
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order: IOrder) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium text-blue-600">{order.status}</span>
              </p>
              <p className="text-sm text-gray-600">Total Price: ${order.totalPrice}</p>

              {/* Meal Details */}
              {order.meals?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium">Meals:</h3>
                  <ul className="list-disc pl-5">
                    {order.meals.map(({ meal, quantity }) => (
                      <li key={meal._id} className="mt-2">
                        <p className="text-sm font-semibold">
                          {meal.name} (x{quantity})
                        </p>
                        <p className="text-xs text-gray-500">{meal.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meal Provider Details */}
              {order.mealProvider && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <h3 className="font-medium">Meal Provider:</h3>
                  <p className="text-sm">{order.mealProvider.name}</p>
                  <p className="text-xs text-gray-600">{order.mealProvider.address}</p>
                  <p className="text-xs text-gray-600">Cuisine: {order.mealProvider.cuisineSpecialties?.join(", ")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </CustomContainer>
  );
};

export default TrackOrderPage;
