import NotLoggedIn from "@/components/custom/app/NotLoggedIn";
import History from "@/components/custom/app/history/History";
import { COOKIES } from "@/constants";
import { getDriversHistory } from "@/services/client/history";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies()
    const userId = cookieStore.get(COOKIES.User)?.value

    if(!userId) return <NotLoggedIn />

    const history = await getDriversHistory(userId);

    const loading =!history
    return (
        <History history={history} loading={loading}/>
    )
}
