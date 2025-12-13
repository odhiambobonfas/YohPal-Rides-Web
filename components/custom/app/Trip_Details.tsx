"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Order } from "@/types/orders"
import { Calendar, Clock, DollarSign, MapPin, Phone, Ruler, Truck, User } from "lucide-react"

interface OrderDetailsDialogProps {
    order: Order | null
    isOpen: boolean
    onClose: () => void
}

export function OrderDetailsDialog({ order, isOpen, onClose }: OrderDetailsDialogProps) {
    if (!order) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Order Details - #{order.id}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Fare */}
                    <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                        <p className="text-sm text-gray-600 mb-2">Total Fare</p>
                        <p className="text-4xl font-bold text-green-700">
                            {formatCurrency(order.totalFare)}
                        </p>
                    </div>

                    {/* Driver Info */}
                    {order.acceptedDriverName && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <User className="size-5 text-blue-600" />
                                Driver Information
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <p className="text-gray-700 font-medium text-lg">
                                    {order.acceptedDriverName}
                                </p>
                                {order.acceptedDriverPhone && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="size-4" />
                                        <p>{order.acceptedDriverPhone}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Vehicle Info */}
                    {order.acceptedVehicleModel && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Truck className="size-5 text-blue-600" />
                                Vehicle Information
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <p className="text-gray-700 font-medium">
                                    {order.acceptedVehicleModel}
                                </p>
                                {order.acceptedVehicleNumber && (
                                    <p className="text-sm text-gray-600">
                                        Plate: {order.acceptedVehicleNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Route */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <MapPin className="size-5 text-blue-600" />
                            Route
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                                    <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                </div>
                                <div className="flex-1 space-y-10">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Pickup Location
                                        </p>
                                        <p className="text-gray-800 font-medium text-base">
                                            {order.pickupLocation ?? "Unknown pickup"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Destination</p>
                                        <p className="text-gray-800 font-medium text-base">
                                            {order.destinationLocation ?? "Unknown destination"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trip Details Grid */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800">Trip Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Ruler className="size-4" />
                                    <span className="text-sm">Distance</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-lg">
                                    {order.distance
                                        ? `${Number(order.distance).toFixed(1)} km`
                                        : "-"}
                                </span>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Clock className="size-4" />
                                    <span className="text-sm">Estimated Time</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-lg">
                                    {order.estimatedTime ? `${order.estimatedTime} mins` : "-"}
                                </span>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <DollarSign className="size-4" />
                                    <span className="text-sm">Payment Status</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-lg capitalize">
                                    {order.status}
                                </span>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Calendar className="size-4" />
                                    <span className="text-sm">Created</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-sm">
                                    {formatDate(order.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    {order.acceptedAt && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Calendar className="size-5 text-blue-600" />
                                Timeline
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Order Created</span>
                                    <span className="font-medium text-gray-800 text-sm">
                                        {formatDate(order.createdAt)}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Order Accepted</span>
                                    <span className="font-medium text-gray-800 text-sm">
                                        {formatDate(order.acceptedAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
