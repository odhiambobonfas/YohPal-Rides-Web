import { LucideHistory } from "lucide-react";

export default function NoHistory() {
      return (
        <div className="flex w-full">
        <div className="flex flex-col m-5 p-5 w-full">
            <h1 className="flex text-4xl">Orders</h1>
            <div className="flex flex-col w-full m-5 bg-gray-100 rounded-4xl gap-8 h-[60dvh]">
            <h1 className="flex p-5 w-full h-20">View your Orders and details here</h1>
            <div className="flex flex-col items-center justify-center h-80 gap-8">
                <LucideHistory className="size-15 text-gray-500" />
                <h1 className="text-4xl">No Orders Yet</h1>
                <p className="text-2xl font-light">Your orders will appear here once they are created</p>
            </div>
            </div>
        </div>
        </div>
  );
}