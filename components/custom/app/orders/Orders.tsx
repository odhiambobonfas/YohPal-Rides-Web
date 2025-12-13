"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import { formatCurrency, formatDate, prettyStatus } from "@/lib/utils"
import { Order } from "@/types/orders"
import { useState } from "react"
import { OrderDetailsDialog } from "../Trip_Details"

import {
    LucideClock,
    LucideDollarSign,
    LucideHistory,
    LucideMapPin,
    LucideRulerDimensionLine,
    LucideTruck,
    LucideUserRound,
} from "lucide-react"

export default function Orders({ orders }: { orders: Order[] }) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isMobile = useIsMobile()

    const totalOrders = orders.length
    const totalEarnings = orders.reduce((sum, o) => sum + (o.totalFare ?? 0), 0)

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    if (totalOrders === 0) {
        return <NoOrders />
    }

    return (
        <div className="h-full w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold p-4 sm:p-5">Orders</h1>

            <div className="flex flex-col bg-[#f6fafd] min-h-screen w-full p-4 sm:p-5">
                <h1 className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-4 sm:mb-5">
                    View Your Orders History
                </h1>

                <div className="flex flex-col lg:flex-row w-full gap-4 sm:gap-5">
                    <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-evenly w-full lg:w-1/4 min-h-[150px] lg:h-[40dvh] p-4 sm:p-5 rounded-2xl lg:rounded-4xl bg-[#e2f1ec] gap-4 sm:gap-5">
                        <div className="flex bg-green-700 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-15 rounded-xl sm:rounded-2xl items-center justify-center shrink-0">
                            <LucideDollarSign className="text-background size-6 sm:size-8 lg:size-10" />
                        </div>

                        <div className="flex flex-row sm:flex-col lg:flex-col gap-3 sm:gap-6 lg:gap-5 items-start sm:items-center lg:items-center grow">
                            <div className="flex flex-col items-start sm:items-center">
                                <h2 className="text-gray-600 text-sm sm:text-lg lg:text-2xl">
                                    Total Earnings
                                </h2>
                                <span className="text-green-600 text-lg sm:text-xl lg:text-2xl font-semibold">
                                    {formatCurrency(totalEarnings)}
                                </span>
                            </div>

                            <div className="flex flex-col items-start sm:items-center">
                                <h2 className="text-gray-600 text-sm sm:text-lg lg:text-2xl">
                                    Total Orders
                                </h2>
                                <span className="text-green-600 text-lg sm:text-xl lg:text-2xl font-semibold">
                                    {totalOrders}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="flex flex-col w-full lg:w-3/4 gap-4 sm:gap-5">
                        <h2 className="text-xl sm:text-2xl lg:text-4xl text-gray-600">Orders</h2>

                        <div className="flex flex-col gap-4 sm:gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => handleOrderClick(order)}
                                    className="flex flex-col bg-background w-full lg:w-[70%] p-4 sm:p-5 gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-sm cursor-pointer hover:shadow-md transition-all border border-gray-100 hover:border-green-200"
                                >
                                    <div className="flex w-full justify-between items-start sm:items-center gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-gray-500 text-base sm:text-xl lg:text-2xl font-medium">
                                                Order #{order.id}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>

                                        <div className="flex items-end flex-col">
                                            <span className="text-green-700 text-xl sm:text-2xl lg:text-3xl font-bold">
                                                {formatCurrency(order.totalFare)}
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                {prettyStatus(order.status)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 sm:gap-5 items-start">
                                        <LucideMapPin className="text-blue-600 shrink-0 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
                                        <span className="text-sm sm:text-base wrap-break-words">
                                            {order.pickupLocation ?? "Unknown pickup"}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 sm:gap-5 items-start">
                                        <LucideMapPin className="text-red-500 shrink-0 w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
                                        <span className="text-sm sm:text-base wrap-break-words">
                                            {order.destinationLocation ?? "Unknown destination"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <LucideUserRound className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <div className="min-w-0">
                                                <div className="text-xs sm:text-sm font-medium truncate">
                                                    {order.acceptedDriverName ?? "No driver"}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">
                                                    {order.acceptedDriverPhone ?? ""}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <LucideTruck className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <div className="text-xs sm:text-sm min-w-0">
                                                <div className="truncate">
                                                    {order.acceptedVehicleModel ?? "-"}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">
                                                    {order.acceptedVehicleNumber ?? "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <LucideRulerDimensionLine className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-xs sm:text-sm">
                                                {order.distance
                                                    ? `${Number(order.distance).toFixed(1)} km`
                                                    : "-"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <LucideClock className="shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                            <div className="text-xs sm:text-sm min-w-0">
                                                <div className="truncate">
                                                    {order.acceptedAt
                                                        ? formatDate(order.acceptedAt)
                                                        : "-"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ETA: {order.estimatedTime ?? "-"} mins
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <OrderDetailsDialog
                order={selectedOrder}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                isMobile={isMobile}
            />
        </div>
    )
}

function NoOrders() {
    return (
        <div className="flex w-full">
            <div className="flex flex-col p-4 sm:p-5 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Orders</h1>
                <div className="flex flex-col w-full bg-gray-100 rounded-2xl sm:rounded-3xl lg:rounded-4xl gap-6 sm:gap-8 min-h-[50vh] sm:min-h-[60dvh] p-4 sm:p-6">
                    <h2 className="text-sm sm:text-base lg:text-lg text-gray-600">
                        View your Orders and details here
                    </h2>
                    <div className="flex flex-col items-center justify-center grow gap-4 sm:gap-6 lg:gap-8 py-8">
                        <LucideHistory className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-500" />
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
                            No Orders Yet
                        </h2>
                        <p className="text-base sm:text-xl lg:text-2xl font-light text-center text-gray-600 px-4">
                            Your orders will appear here once they are created
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
