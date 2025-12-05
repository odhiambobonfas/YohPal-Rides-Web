import NotLoggedIn from "@/components/customs/app/NotLoggedIn";
import Orders from "@/components/customs/app/orders/Orders";
import { COOKIES } from "@/constants";
import { getUserOrders } from "@/services/client/orders";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies()
  const userId =cookieStore.get(COOKIES.User)?.value

  if(!userId) return  <NotLoggedIn />

      const orders = await getUserOrders(userId);
      
  return (
    <Orders orders={orders} />
  )
}