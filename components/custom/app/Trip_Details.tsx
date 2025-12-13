"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Order } from "@/types/orders"
import { Calendar, Clock, DollarSign, MapPin, Phone, Ruler, Truck, User } from "lucide-react"

interface OrderDetailsDialogProps {
    order: Order | null
    isOpen: boolean
    onClose: () => void
    isMobile?: boolean
}

function OrderContent({ order }: { order: Order }) {
    return (
        <div className="space-y-4 sm:space-y-6 py-4">
            <div className="bg-green-50 rounded-xl p-4 sm:p-6 text-center border border-green-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Total Fare</p>
                <p className="text-2xl sm:text-4xl font-bold text-green-700">
                    {formatCurrency(order.totalFare)}
                </p>
            </div>

            {order.acceptedDriverName && (
                <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <User className="size-4 sm:size-5 text-blue-600" />
                        Driver Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <p className="text-gray-700 font-medium text-base sm:text-lg">
                            {order.acceptedDriverName}
                        </p>
                        {order.acceptedDriverPhone && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="size-3 sm:size-4" />
                                <p className="text-sm sm:text-base">{order.acceptedDriverPhone}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {order.acceptedVehicleModel && (
                <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Truck className="size-4 sm:size-5 text-blue-600" />
                        Vehicle Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                        <p className="text-gray-700 font-medium text-sm sm:text-base">
                            {order.acceptedVehicleModel}
                        </p>
                        {order.acceptedVehicleNumber && (
                            <p className="text-xs sm:text-sm text-gray-600">
                                Plate: {order.acceptedVehicleNumber}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin className="size-4 sm:size-5 text-blue-600" />
                    Route
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                        <div className="flex flex-col items-center pt-1">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-600"></div>
                            <div className="w-0.5 h-12 sm:h-16 bg-gray-300 my-1"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
                        </div>
                        <div className="flex-1 space-y-8 sm:space-y-10">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                                <p className="text-gray-800 font-medium text-sm sm:text-base wrap-break-words">
                                    {order.pickupLocation ?? "Unknown pickup"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Destination</p>
                                <p className="text-gray-800 font-medium text-sm sm:text-base wrap-break-words">
                                    {order.destinationLocation ?? "Unknown destination"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Trip Information
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 sm:mb-2">
                            <Ruler className="size-3 sm:size-4" />
                            <span className="text-xs sm:text-sm">Distance</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm sm:text-lg">
                            {order.distance ? `${Number(order.distance).toFixed(1)} km` : "-"}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 sm:mb-2">
                            <Clock className="size-3 sm:size-4" />
                            <span className="text-xs sm:text-sm">Estimated Time</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm sm:text-lg">
                            {order.estimatedTime ? `${order.estimatedTime} mins` : "-"}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 sm:mb-2">
                            <DollarSign className="size-3 sm:size-4" />
                            <span className="text-xs sm:text-sm">Payment Status</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm sm:text-lg capitalize">
                            {order.status}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1 sm:mb-2">
                            <Calendar className="size-3 sm:size-4" />
                            <span className="text-xs sm:text-sm">Created</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                            {formatDate(order.createdAt)}
                        </span>
                    </div>
                </div>
            </div>

            {order.acceptedAt && (
                <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Calendar className="size-4 sm:size-5 text-blue-600" />
                        Timeline
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm sm:text-base">
                                Order Created
                            </span>
                            <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                {formatDate(order.createdAt)}
                            </span>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm sm:text-base">
                                Order Accepted
                            </span>
                            <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                {formatDate(order.acceptedAt)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function OrderDetailsDialog({
    order,
    isOpen,
    onClose,
    isMobile = false,
}: OrderDetailsDialogProps) {
    if (!order) return null

    // Return Drawer for mobile, Dialog for desktop
    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={onClose}>
                <DrawerContent className="max-h-[85vh]">
                    <DrawerHeader className="text-left">
                        <DrawerTitle className="text-xl sm:text-2xl">
                            Order Details - #{order.id}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="overflow-y-auto px-4 pb-8">
                        <OrderContent order={order} />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    // Desktop Dialog
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Order Details - #{order.id}</DialogTitle>
                </DialogHeader>
                <OrderContent order={order} />
            </DialogContent>
        </Dialog>
    )
}
