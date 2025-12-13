"use client"
import { geocodeAddress } from "@/actions/geocode"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTripContext } from "@/providers/TripContext"
import type { AdvancedMarkerRef } from "@vis.gl/react-google-maps"
import {
    AdvancedMarker,
    ControlPosition,
    InfoWindow,
    Map,
    MapControl,
    Pin,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps"
import { LucideCar, LucideClock4 } from "lucide-react"
import { memo, useEffect, useRef, useState } from "react"
import RidesList from "./RidesList"

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

interface RideMapProps {
    mapsApiKey: string
    pickup?: string // Debounced value for map rendering
    dropoff?: string // Debounced value for map rendering
    inputPickup?: string // Raw input value for display
    inputDropoff?: string // Raw input value for display
    schedule?: string
    onPickupChange?: (value: string) => void
    onDropoffChange?: (value: string) => void
    onScheduleChange?: (value: string) => void
    onFindRides?: () => void
    showRides?: boolean
    selectedRide?: string | null
    onSelectRide?: (rideId: string) => void
    rides?: Ride[]
}

interface LatLng {
    lat: number
    lng: number
}

function RideMapComponent({
    mapsApiKey,
    pickup,
    dropoff,
    inputPickup = "",
    inputDropoff = "",
    schedule = "now",
    onPickupChange,
    onDropoffChange,
    onScheduleChange,
    onFindRides,
    showRides = false,
    selectedRide = null,
    onSelectRide,
    rides = [],
}: RideMapProps) {
    const [pickupLocation, setPickupLocation] = useState<LatLng | null>(null)
    const [dropoffLocation, setDropoffLocation] = useState<LatLng | null>(null)
    const [openDropoff, setOpenDropoff] = useState(false)
    const pickupMarkerRef = useRef<AdvancedMarkerRef>(null)
    const dropoffMarkerRef = useRef<AdvancedMarkerRef>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let isMounted = true

        const loadLocations = async () => {
            if (!pickup || !dropoff) {
                if (isMounted) {
                    setPickupLocation(null)
                    setDropoffLocation(null)
                }
                return
            }

            const pickupLoc = await geocodeAddress(pickup)
            const dropoffLoc = await geocodeAddress(dropoff)

            if (isMounted) {
                setPickupLocation(pickupLoc)
                setDropoffLocation(dropoffLoc)
            }
        }

        loadLocations()

        return () => {
            isMounted = false
        }
    }, [pickup, dropoff])

    return (
        <div ref={mapContainerRef}>
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

                {selectedRide && pickupLocation && dropoffLocation && (
                    <RidePolyline
                        pickup={pickupLocation}
                        dropoff={dropoffLocation}
                        mapsApiKey={mapsApiKey}
                    />
                )}

                <MapControl position={ControlPosition.TOP_LEFT}>
                    <Card className="w-96 mt-4 ml-4 shadow-lg border-0 flex flex-col max-h-[70vh]">
                        <CardContent className="w-full flex flex-col gap-4 pt-6">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                                        Pickup
                                    </label>
                                    <PlaceAutocompleteSearch
                                        placeholder="Enter pickup location"
                                        value={inputPickup}
                                        onChange={onPickupChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                                        Dropoff
                                    </label>
                                    <PlaceAutocompleteSearch
                                        placeholder="Enter dropoff location"
                                        value={inputDropoff}
                                        onChange={onDropoffChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full inline-flex items-center justify-center gap-2">
                                <LucideClock4 />
                                <Select value={schedule} onValueChange={onScheduleChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="now">Pick up now</SelectItem>
                                        <SelectItem value="later">Schedule for later</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                className="w-full hover:scale-101 transition-all"
                                onClick={onFindRides}
                                disabled={!pickup?.trim() || !dropoff?.trim()}
                            >
                                <LucideCar className="fill-current" />
                                Find Rides
                            </Button>
                        </CardContent>

                        {showRides && rides.length > 0 && (
                            <div className="w-full flex flex-col items-center">
                                <hr className="h-2 w-11/12" />
                                <div className="py-3">
                                    <h4 className="font-bold text-sm text-gray-900 mb-3">
                                        Available Rides ({rides.length})
                                    </h4>
                                </div>

                                <ScrollArea className="h-60 w-full">
                                    <RidesList
                                        rides={rides}
                                        selectedRide={selectedRide || null}
                                        onSelectRide={onSelectRide || (() => {})}
                                    />
                                </ScrollArea>
                            </div>
                        )}
                    </Card>
                </MapControl>
            </Map>
        </div>
    )
}

export default memo(RideMapComponent)

interface RidePolylineProps {
    pickup: LatLng
    dropoff: LatLng
    mapsApiKey: string
}

function RidePolyline({ pickup, dropoff, mapsApiKey }: RidePolylineProps) {
    const map = useMap()
    const mapsLibrary = useMapsLibrary("maps")
    const geometryLibrary = useMapsLibrary("geometry")
    const { setTripDuration, setTripLoading, setTripError } = useTripContext()
    const mainPolylineRef = useRef<google.maps.Polyline | null>(null)
    const glowPolylineRef = useRef<google.maps.Polyline | null>(null)
    const [encodedPath, setEncodedPath] = useState<string>("")

    // Fetch route from Routes API
    useEffect(() => {
        if (!pickup || !dropoff) return

        const fetchRoute = async () => {
            // Clear old polyline path while fetching new route
            setEncodedPath("")
            setTripLoading(true)
            setTripError(null)
            try {
                const routeRequest = {
                    origin: {
                        location: {
                            latLng: { latitude: pickup.lat, longitude: pickup.lng },
                        },
                    },
                    destination: {
                        location: {
                            latLng: { latitude: dropoff.lat, longitude: dropoff.lng },
                        },
                    },
                    travelMode: "DRIVE",
                }

                const url = new URL("https://routes.googleapis.com/directions/v2:computeRoutes")
                url.searchParams.set("fields", "routes.polyline,routes.duration")

                const response = await fetch(url.toString(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": mapsApiKey,
                    },
                    body: JSON.stringify(routeRequest),
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    console.error("Routes API error:", response.status, errorText)
                    setTripError("Failed to fetch route")
                    setTripLoading(false)
                    return
                }

                const data = await response.json()
                if (data.routes && data.routes[0]) {
                    const polylineData = data.routes[0].polyline
                    if (polylineData?.encodedPolyline) {
                        setEncodedPath(polylineData.encodedPolyline)
                    }

                    // Extract duration in seconds and convert to minutes
                    const route = data.routes[0]

                    // Handle both string and number duration formats
                    const durationValue = route.duration?.seconds || route.duration
                    if (durationValue) {
                        const durationSeconds =
                            typeof durationValue === "string"
                                ? parseInt(durationValue)
                                : durationValue
                        const durationMinutes = Math.ceil(durationSeconds / 60)
                        setTripDuration(durationMinutes)
                    }
                }
                setTripLoading(false)
            } catch (error) {
                console.error("Error fetching route:", error)
                setTripError("Error fetching route")
                setTripLoading(false)
            }
        }

        fetchRoute()
    }, [pickup, dropoff, mapsApiKey, setTripDuration, setTripLoading, setTripError])

    // Create polylines once maps library is available
    useEffect(() => {
        if (!mapsLibrary) return
        glowPolylineRef.current = new mapsLibrary.Polyline()
        mainPolylineRef.current = new mapsLibrary.Polyline()
    }, [mapsLibrary])

    // Decode and set the path from encoded polyline
    useEffect(() => {
        if (!mainPolylineRef.current || !glowPolylineRef.current || !geometryLibrary) return

        // Clear polyline when no encoded path (location changed but route not fetched yet)
        if (!encodedPath) {
            mainPolylineRef.current.setPath([])
            glowPolylineRef.current.setPath([])
            return
        }

        const decodedPath = geometryLibrary.encoding.decodePath(encodedPath)
        mainPolylineRef.current.setPath(decodedPath)
        glowPolylineRef.current.setPath(decodedPath)
    }, [encodedPath, geometryLibrary])

    // Set polyline options - glow layer (thicker, more transparent)
    useEffect(() => {
        if (!glowPolylineRef.current) return
        glowPolylineRef.current.setOptions({
            strokeColor: "#2563EB",
            strokeOpacity: 0.25,
            strokeWeight: 12,
        })
    }, [])

    // Set polyline options - main layer (solid, bright)
    useEffect(() => {
        if (!mainPolylineRef.current) return
        mainPolylineRef.current.setOptions({
            strokeColor: "#1D4ED8",
            strokeOpacity: 1,
            strokeWeight: 5,
        })
    }, [])

    // Add polylines to map
    useEffect(() => {
        if (!map || !mainPolylineRef.current || !glowPolylineRef.current) return
        glowPolylineRef.current.setMap(map)
        mainPolylineRef.current.setMap(map)
        return () => {
            if (glowPolylineRef.current) glowPolylineRef.current.setMap(null)
            if (mainPolylineRef.current) mainPolylineRef.current.setMap(null)
        }
    }, [map])

    // Cleanup trip duration when route is unmounted
    useEffect(() => {
        return () => {
            setTripDuration(null)
        }
    }, [setTripDuration])

    return null
}

interface PlaceAutocompleteSearchProps {
    placeholder: string
    value?: string
    onChange?: (value: string) => void
}

function PlaceAutocompleteSearch({ placeholder, value, onChange }: PlaceAutocompleteSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const places = useMapsLibrary("places")
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null)

    useEffect(() => {
        if (!places || !inputRef.current) return

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        }

        // Using google.maps.places.Autocomplete
        // Note: This API is deprecated as of March 1, 2025, but will continue to receive bug fixes
        // for major regressions. PlaceAutocompleteElement web component is recommended for new customers.
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
    }, [places])

    useEffect(() => {
        if (!placeAutocomplete) return

        const listener = placeAutocomplete.addListener("place_changed", () => {
            const place = placeAutocomplete.getPlace()
            if (place.name && onChange) {
                onChange(place.name)
            }
        })

        return () => {
            google.maps.event.removeListener(listener)
        }
    }, [placeAutocomplete, onChange])

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full px-5 py-3 bg-white text-gray-900 placeholder-gray-500 rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
                style={{ zIndex: 1000 }}
            />
        </div>
    )
}
