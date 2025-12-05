import { db } from "@/lib/firebase/firebase.browser";
import { Order } from "@/types/orders"
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'rides', 'orders', 'orderIds');
    
    const q = query(
      ordersRef,
      where('acceptedDriverId', '==', userId)
    //   orderBy('createdAt', 'desc') 
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No orders found for this user.");
      return [];
    }
    
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      } as Order);
    });
    
    // Sort client-side by createdAt descending
    orders.sort((a, b) => {
      const aTime = typeof a.createdAt === 'number' ? a.createdAt : 0;
      const bTime = typeof b.createdAt === 'number' ? b.createdAt : 0;
      return bTime - aTime;
    });
    
    console.log(`Fetched ${orders.length} orders for user ${userId}`);
    return orders;
    
  } catch (error) {
    console.error("Error fetching orders from Firestore:", error);
    throw error; 
  }
}