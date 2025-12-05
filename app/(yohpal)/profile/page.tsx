import ProfileHeader from "@/components/customs/app/profile/profileHeader";
import { COOKIES } from "@/constants";
import NotLoggedIn from "@/constants/app/profile/NotLoggedIn";
import { getUserProfile } from "@/services/server/user";
import { cookies } from "next/headers";

export default async function Page(){
  const cookieStore = await cookies()
  const userId = cookieStore.get(COOKIES.User)?.value

  if (!userId) return <NotLoggedIn />

  const user  = await getUserProfile(userId)


  return (
    <ProfileHeader  user={user}/>
  )
}