import { db } from "@/lib/firebase/firebase.browser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Order } from "@/types/orders";

export async function getDriversHistory(userId: string): Promise<Order[]> {
    try {
        const historyRef = collection(db, 'rides', 'orders', 'orderIds');

        const q = query(
            historyRef,
            where('acceptedDriverId', '==', userId),
            where('status', '==', 'OrderStatus.completed')
        )

        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            return []
        }

        const history: Order[] = [];

        querySnapshot.forEach((doc) => {
            history.push({
                id:doc.id,
                ...doc.data()
            } as Order);
        });

        history.sort((a, b) => {
            const aTime = typeof a.createdAt === 'number' ? a.createdAt : 0;
            const bTime = typeof b.createdAt === 'number' ? b.createdAt : 0;
            return bTime - aTime;
        });

        return history;
    } catch (error) {
        console.error("Error fetching orders from Firestore:", error);
        throw error;
    }
}