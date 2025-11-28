import { doc, getDoc } from "firebase/firestore";

import { BaseUser } from "#/users";
import { db } from "@/lib/firebase/firebase.browser";

export async function getUserProfile(userId: string) {
  const userDocRef = doc(db, "rides", "users", "userIds", userId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) return null;

  const data = userDoc.data();
  return {
    uid: userDoc.id,
    ...data,
    profile_picture: data.profile_picture,
  } as unknown as BaseUser;
}
