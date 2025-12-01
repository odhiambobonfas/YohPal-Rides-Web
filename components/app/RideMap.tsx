"use client"
import { geocodeAddress } from "@/actions/geocode"
import { APIProvider, AdvancedMarker, InfoWindow, Map, Pin } from "@vis.gl/react-google-maps"
import { useEffect, useRef, useState } from "react"

interface RideMapProps {
    mapsApiKey: string
    pickup?: string
    dropoff?: string
}

interface LatLng {
    lat: number
    lng: number
}

export default function RideMap({ mapsApiKey, pickup, dropoff }: RideMapProps) {
    const [pickupLocation, setPickupLocation] = useState<LatLng | null>(null)
    const [dropoffLocation, setDropoffLocation] = useState<LatLng | null>(null)
    const [openDropoff, setOpenDropoff] = useState(false)
    const pickupMarkerRef = useRef(null)
    const dropoffMarkerRef = useRef(null)

    useEffect(() => {
        if (pickup) {
            geocodeAddress(pickup).then(setPickupLocation)
        }
        if (dropoff) {
            geocodeAddress(dropoff).then(setDropoffLocation)
        }
    }, [pickup, dropoff])

    return (
        <APIProvider apiKey={mapsApiKey}>
            <Map
                mapId={"RidesWeb"}
                style={{ width: "100vw", height: "100vh" }}
                defaultCenter={{ lat: -1.284433925239902, lng: 36.82603351204897 }}
                defaultZoom={15}
                gestureHandling="greedy"
                disableDefaultUI
            >
                {pickupLocation && (
                    <AdvancedMarker position={pickupLocation} ref={pickupMarkerRef}>
                        <Pin background={"#EF4444"} glyphColor={"#FFFFFF"} />
                        <InfoWindow
                            anchor={pickupMarkerRef.current}
                            maxWidth={280}
                            shouldFocus={false}
                        >
                            <div className="px-3 py-2">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-gray-900">
                                            Pickup
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                            {pickup}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-red-50 rounded px-2 py-1.5 mb-2">
                                    <p className="text-xs font-medium text-red-700">
                                        Estimated wait: 2 min
                                    </p>
                                </div>
                                <button className="w-full bg-red-500 text-white text-xs font-semibold py-2 rounded-md hover:bg-red-600 transition">
                                    Confirm Pickup
                                </button>
                            </div>
                        </InfoWindow>
                    </AdvancedMarker>
                )}
                {dropoffLocation && (
                    <AdvancedMarker
                        position={dropoffLocation}
                        ref={dropoffMarkerRef}
                        onClick={() => setOpenDropoff(!openDropoff)}
                    >
                        <Pin background={"#3B82F6"} glyphColor={"#FFFFFF"} />
                        {openDropoff && (
                            <InfoWindow
                                anchor={dropoffMarkerRef.current}
                                onClose={() => setOpenDropoff(false)}
                                maxWidth={280}
                                shouldFocus={false}
                            >
                                <div className="px-3 py-2">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm text-gray-900">
                                                Dropoff
                                            </h3>
                                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                                {dropoff}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded px-2 py-1.5 mb-2">
                                        <p className="text-xs font-medium text-blue-700">
                                            Estimated fare: $12.50
                                        </p>
                                    </div>
                                    <button className="w-full bg-blue-500 text-white text-xs font-semibold py-2 rounded-md hover:bg-blue-600 transition">
                                        Confirm Destination
                                    </button>
                                </div>
                            </InfoWindow>
                        )}
                    </AdvancedMarker>
                )}
            </Map>
        </APIProvider>
    )
}
