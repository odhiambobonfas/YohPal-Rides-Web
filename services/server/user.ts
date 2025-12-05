import { db } from "@/lib/firebase/firebase.admin"
import { BaseUser } from "@/types/users"

export const getUserProfile = async (userId: string) => {
    const userDoc = await db
        .collection("rides")
        .doc("users")
        .collection("userIds")
        .doc(userId)
        .get()
    if (!userDoc.exists) return null
    const user = userDoc.data() as unknown as BaseUser

    return {
        uid: user.userId,
        displayName: user.displayName,
        email: user.email,
        userType: user.userType,
        phoneNumber: user.phone,
        photoURL: user.photoURL,
    } as unknown as BaseUser
}
