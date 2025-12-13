"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Order } from "@/types/orders"
import { useState } from "react"
import { OrderDetailsDialog } from "../Trip_Details"

import {
    LucideClock,
    LucideDollarSign,
    LucideMapPin,
    LucideRulerDimensionLine,
    LucideUserRound,
} from "lucide-react"
import PageLoading from "../PageLoading"
import NoHistory from "./NoHistory"

export default function History({ history, loading }: { history: Order[]; loading: boolean }) {
    const [selectedTrip, setSelectedTrip] = useState<Order | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isMobile = useIsMobile()

    if (loading) return <PageLoading />
    if (!loading && history.length === 0) return <NoHistory />

    const totalHistory = history.length
    const totalEarnings = history.reduce((sum, o) => sum + (o.totalFare ?? 0), 0)

    const handleTripClick = (trip: Order) => {
        setSelectedTrip(trip)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    return (
        <div className="h-full w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold w-full p-4 sm:p-5">
                Trip History
            </h1>

            <div className="flex flex-col bg-[#f6fafd] min-h-screen w-full p-4 sm:p-5">
                <h1 className="text-lg sm:text-xl lg:text-2xl p-4 sm:p-5 text-gray-600 w-full">
                    View Your completed trips and earnings History
                </h1>

                <div className="flex flex-col lg:flex-row w-full h-full gap-4 sm:gap-5">
                    {/* SUMMARY CARD */}
                    <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-evenly w-full lg:w-1/4 min-h-[150px] lg:h-[40dvh] rounded-2xl lg:rounded-4xl bg-[#e2f1ec] gap-4 sm:gap-5 p-4 sm:p-5">
                        <div className="flex bg-green-700 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-15 rounded-xl sm:rounded-2xl items-center justify-center shrink-0">
                            <LucideDollarSign className="text-background size-6 sm:size-8 lg:size-10" />
                        </div>

                        <div className="flex flex-row sm:flex-col lg:flex-col gap-3 sm:gap-6 lg:gap-5 items-start sm:items-center lg:items-center grow">
                            <div className="flex flex-col items-start sm:items-center">
                                <h2 className="text-gray-600 text-sm sm:text-lg lg:text-2xl">
                                    Total Earning
                                </h2>
                                <span className="text-green-600 text-lg sm:text-xl lg:text-2xl font-semibold">
                                    {formatCurrency(totalEarnings)}
                                </span>
                            </div>

                            <div className="flex flex-col items-start sm:items-center">
                                <h2 className="text-gray-600 text-sm sm:text-lg lg:text-2xl">
                                    Total Trips
                                </h2>
                                <span className="text-green-600 text-lg sm:text-xl lg:text-2xl font-semibold">
                                    {totalHistory}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RECENT TRIPS */}
                    <div className="flex flex-col w-full lg:w-3/4 h-full gap-4 sm:gap-5">
                        <h2 className="text-xl sm:text-2xl lg:text-4xl text-gray-600">
                            Recent Trips
                        </h2>

                        <div className="flex flex-col gap-4 sm:gap-5">
                            {history.map((trip) => (
                                <div
                                    key={trip.id}
                                    onClick={() => handleTripClick(trip)}
                                    className="flex flex-col bg-background w-full lg:w-[70%] p-4 sm:p-5 gap-3 sm:gap-5 rounded-2xl sm:rounded-3xl lg:rounded-4xl cursor-pointer hover:shadow-md transition-all border border-gray-100 hover:border-green-200"
                                >
                                    <div className="flex w-full justify-between items-start sm:items-center gap-2">
                                        <h3 className="text-gray-500 text-base sm:text-xl lg:text-2xl font-medium">
                                            Order #{trip.id}
                                        </h3>
                                        <span className="text-green-700 text-xl sm:text-2xl lg:text-3xl font-bold">
                                            {formatCurrency(trip.totalFare)}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 sm:gap-5 items-start">
                                        <LucideMapPin className="text-blue-600 shrink-0 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
                                        <span className="text-sm sm:text-base wrap-break-words">
                                            {trip.pickupLocation}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 sm:gap-5 items-start">
                                        <LucideMapPin className="text-red-500 shrink-0 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
                                        <span className="text-sm sm:text-base wrap-break-words">
                                            {trip.destinationLocation}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
                                        <div className="flex gap-2 sm:gap-3 items-center">
                                            <LucideUserRound className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-sm sm:text-base truncate">
                                                {trip.customerName}
                                            </span>
                                        </div>

                                        <div className="flex gap-2 sm:gap-3 items-center">
                                            <LucideRulerDimensionLine className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-sm sm:text-base">
                                                {trip.distance
                                                    ? `${Number(trip.distance).toFixed(1)} km`
                                                    : "-"}
                                            </span>
                                        </div>

                                        <div className="flex gap-2 sm:gap-3 items-center">
                                            <LucideClock className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <p className="text-sm sm:text-base truncate">
                                                {formatDate(trip.acceptedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <OrderDetailsDialog
                order={selectedTrip}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                isMobile={isMobile}
            />
        </div>
    )
}
