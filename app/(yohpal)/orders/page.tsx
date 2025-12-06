import NotLoggedIn from "@/components/customs/app/NotLoggedIn";
import Orders from "@/components/customs/app/orders/Orders";
import { COOKIES } from "@/constants";
import { getDriverOrders } from "@/services/client/orders";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies()
  const userId =cookieStore.get(COOKIES.User)?.value

  if(!userId) return  <NotLoggedIn />

      const orders = await getDriverOrders(userId);
      
  return (
    <Orders orders={orders} />
  )
}