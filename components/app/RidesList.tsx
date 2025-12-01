"use client"

import { LucideStar } from "lucide-react"

interface Ride {
    id: string
    driver: string
    vehicle: string
    model: string
    plates: string
    rating: number
    price: number
    eta: number
}

interface RidesListProps {
    rides: Ride[]
    selectedRide: string | null
    onSelectRide: (rideId: string) => void
}

export default function RidesList({ rides, selectedRide, onSelectRide }: RidesListProps) {
    return (
        <div className="space-y-3 px-6 py-3">
            {rides.map((ride) => (
                <button
                    key={ride.id}
                    onClick={() => onSelectRide(ride.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedRide === ride.id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-md"
                    }`}
                >
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900">{ride.driver}</p>
                            <p className="text-xs text-gray-600 mt-1">{ride.vehicle} • {ride.model}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
                            <LucideStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-900">{ride.rating}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mb-3">{ride.plates}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-bold text-gray-900">${ride.price.toFixed(2)}</span>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-lg">{ride.eta} min</span>
                    </div>
                </button>
            ))}
        </div>
    )
}
