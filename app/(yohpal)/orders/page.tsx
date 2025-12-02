import { LucideCarFront } from "lucide-react";

export default function Page() {
    return (
        <div className="flex  w-full">
            <div className="flex flex-col w-full m-10 gap-5">
                <h1 className="flex text-4xl">Available Orders</h1>
                <div className="flex flex-col items-center justify-center w-full bg-gray-100 h-80 rounded-4xl ">
                    <LucideCarFront className="size-15 text-gray-500"/>
                    <h1 className="text-4xl">No Orders Available</h1>
                    <p className="text-2xl font-light">No Pending orders match your service Type within 10Km</p>
                </div>
             
            </div>
        </div>
    )
}