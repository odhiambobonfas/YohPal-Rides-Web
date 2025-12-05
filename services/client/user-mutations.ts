import { db } from "@/lib/firebase/firebase.browser"
import { BaseUser } from "@/types/users"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

export async function createUser(user: BaseUser) {
    // const newUserRef = doc(db, "users", userId)
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

// additionalData null
// (null)
// createdAt "2025-06-28T23:53:38.977427"
// (string)
// displayName "Kingori"
// (string)
// email "mutheedavid12@gmail.com"
// (string)
// isEmailVerified true
// (boolean)
// lastLoginAt "2025-11-26T12:52:45.358124"
// (string)
// phoneNumber "0791387154"
// (string)
// photoURL "https://firebasestorage.googleapis.com/v0/b/yohlab.firebasestorage.app/o/profile_pictures%2F0znaOPtwZDSPrlCtTEnfxy7T2Wx1%2Fprofile_image.jpg?alt=media&token=d28d9505-f9eb-46ec-b8b5-6365ab620104"
// (string)
// uid "0znaOPtwZDSPrlCtTEnfxy7T2Wx1"
// (string)
// userType "driver"
