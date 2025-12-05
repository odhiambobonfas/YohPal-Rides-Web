import { db } from "@/lib/firebase/firebase.browser"
import { BaseUser } from "@/types/users"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

export async function createUser(user: BaseUser) {
    const newUserRef = doc(db, "rides", "users", "userIds", user.userId)

    await setDoc(newUserRef, {
        uid: user.userId,
        displayName: user.displayName,
        email: user.email,
        userType: user.userType,
        photoURL: user.photoURL,
        phoneNumber: user.phone,
        isEmailVerified: user.verified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
    })
}
