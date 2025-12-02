import { LucideHistory } from "lucide-react";

export default function Page() {
    return (
        <div className="flex w-full">
            <div className="flex flex-col m-5 p-5 w-full">
                <h1 className="flex text-4xl">Trip History</h1>
                <div className="flex flex-col w-full m-5 bg-gray-100 rounded-4xl gap-8 h-[60dvh]">
                    <h1 className="flex p-5 w-full h-20">View your Completed Trips and Earnings</h1>
                    <div className="flex flex-col items-center justify-center h-80 gap-8">
                        <LucideHistory className="size-15 text-gray-500"/>
                        <h1 className="text-4xl">No completed Trip Yet</h1>
                        <p className="text-2xl font-light">Your Completed trip will appear here once you start accepting and coompleting rides</p>
                    </div>
                </div>
            </div>
        </div>
    )
}