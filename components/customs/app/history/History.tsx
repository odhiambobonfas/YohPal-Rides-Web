'use client'
import { formatCurrency, formatDate } from "@/lib/utils";
import { Order } from "@/types/orders";


import { 
    LucideClock, 
    LucideDollarSign, 
    LucideMapPin, 
    LucideRulerDimensionLine, 
    LucideUserRound 
} from "lucide-react";
import NoHistory from "./NoHistory";
import PageLoading from "../PageLoading";

export default function History({history, loading}: {history: Order[], loading: boolean }) {

    if(loading) return <PageLoading />
    if(!loading && history.length === 0) return <NoHistory />

    const totalHistory = history.length;
    const totalEarnings = history.reduce((sum, o) => sum + (o.totalFare ?? 0), 0);

    return (
        <div className="h-full w-full">
            <h1 className="text-4xl font-bold w-full p-5">Trip History</h1>
            <div className="flex flex-col bg-[#f6fafd] h-full w-full m-5">
                <h1 className="flex text-2xl p-5 text-gray-600 w-full">View Your completed trips and earnings History</h1>
                <div className="flex w-full h-full">
                {/* SUMMARY CARD */}
                <div className="flex flex-col items-center justify-evenly w-1/4 h-[40dvh] m-5 rounded-4xl bg-[#e2f1ec] gap-5p-5">

                    <div className="flex bg-green-700 w-20 h-15 rounded-2xl items-center justify-center">
                        <LucideDollarSign className="text-background size-10"/> 
                    </div>

                    <div className="flex flex-col gap-5 items-center">
                        <h1 className="text-gray-600 text-2xl">Total Earning</h1>
                        <span className="text-green-600 text-2xl">{formatCurrency(totalEarnings)}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-gray-600 text-2xl">Total Trips</h1>
                        <span className="text-green-600 text-2xl">{totalHistory}</span>
                    </div>
                </div>

                {/* RECENT TRIPS */}
                <div className="flex flex-col w-3/4 h-full p-5 gap-5 ">
                    <h1 className="flex text-4xl text-gray-600">Recent Trips</h1>

                    {history.map((history) => (
                        <div 
                            key={history.id} 
                            className="flex flex-col bg-background w-[70%] p-5 gap-5 rounded-4xl"
                        >
                            <div className="flex w-full justify-between items-center">
                                <h1 className="text-gray-500 text-2xl">Order #{history.id}</h1>
                                <span className="text-green-700 text-3xl">{formatCurrency(history.totalFare)}</span>
                            </div>

                            <div className="flex gap-5">
                                <LucideMapPin className="text-blue-600" />
                                <span>{history.pickupLocation}</span>
                            </div>

                            <div className="flex gap-5">
                                <LucideMapPin className="text-red-500" />
                                <span>{history.destinationLocation}</span>
                            </div>

                            <div className="flex gap-5 justify-between">
                                <div className="flex gap-5">
                                    <LucideUserRound />
                                    <span>{history.customerName}</span>
                                </div>

                                <div className="flex gap-5">
                                    <LucideRulerDimensionLine />
                                    <span>{history.distance ? `${Number(history.distance).toFixed(1)} km` : "-"}</span>
                                </div>

                                <span className="flex gap-5">
                                    <LucideClock />
                                    <p>{formatDate(history.acceptedAt)}</p>
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}
