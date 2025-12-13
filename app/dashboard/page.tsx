"use client"

import RideMap from "@/components/app/RideMap"
import UserProfile from "@/components/app/UserProfile"
import { DEBOUNCE_TIMING } from "@/constants/debounce"
import { TripProvider } from "@/providers/TripContext"
import { APIProvider } from "@vis.gl/react-google-maps"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!mapsApiKey) throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")

const DUMMY_RIDES = [
    {
        id: "1",
        driver: "John Davis",
        vehicle: "Toyota Prius",
        model: "2023",
        plates: "KEN-4729-A",
        rating: 4.8,
        price: 12.5,
        eta: 4,
    },
    {
        id: "2",
        driver: "Sarah Mitchell",
        vehicle: "Honda Civic",
        model: "2022",
        plates: "KEN-7382-B",
        rating: 4.9,
        price: 14.0,
        eta: 6,
    },
    {
        id: "3",
        driver: "Mike Khan",
        vehicle: "Tesla Model 3",
        model: "2024",
        plates: "KEN-1905-C",
        rating: 5.0,
        price: 18.5,
        eta: 3,
    },
]

function PageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Raw input state - updates immediately as user types
    const [pickup, setPickup] = useState(searchParams.get("pickup") || "")
    const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
    const [schedule, setSchedule] = useState(searchParams.get("schedule") || "now")

    // Debounced map state - only updates after 500ms of no changes
    const [mapPickup, setMapPickup] = useState(searchParams.get("pickup") || "")
    const [mapDropoff, setMapDropoff] = useState(searchParams.get("dropoff") || "")

    const [showRides, setShowRides] = useState(false)
    const [selectedRide, setSelectedRide] = useState<string | null>(null)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    // Debounce map state updates - prevents polyline from jumping
    useEffect(() => {
        const timer = setTimeout(() => {
            setMapPickup(pickup)
            setMapDropoff(dropoff)
        }, DEBOUNCE_TIMING.LOCATION_INPUT)

        return () => clearTimeout(timer)
    }, [pickup, dropoff])

    const updateUrl = useCallback((p: string, d: string, s: string) => {
        const params = new URLSearchParams()
        if (p) params.set("pickup", p)
        if (d) params.set("dropoff", d)
        if (s) params.set("schedule", s)

        router.push(`/dashboard?${params.toString()}`)
    }, [router])

    // Debounce URL updates when pickup/dropoff change
    useEffect(() => {
        const timer = setTimeout(() => {
            updateUrl(pickup, dropoff, schedule)
        }, DEBOUNCE_TIMING.LOCATION_INPUT)

        return () => clearTimeout(timer)
    }, [pickup, dropoff, schedule, updateUrl])

    const handlePickupChange = (value: string) => {
        setPickup(value)
    }

    const handleDropoffChange = (value: string) => {
        setDropoff(value)
    }

    const handleScheduleChange = (value: string) => {
        setSchedule(value)
    }

    const handleFindRides = () => {
        updateUrl(pickup, dropoff, schedule)
        setShowRides(true)
    }

    const handleSelectRide = (rideId: string) => {
        setSelectedRide(rideId)
        setShowMobileMenu(false)
    }

    return (
        <TripProvider>
            <APIProvider apiKey={mapsApiKey!}>
                <section className="relative w-full h-screen overflow-hidden">
                    <RideMap
                         mapsApiKey={mapsApiKey!}
                         pickup={mapPickup}
                         dropoff={mapDropoff}
                         inputPickup={pickup}
                         inputDropoff={dropoff}
                         onPickupChange={handlePickupChange}
                         onDropoffChange={handleDropoffChange}
                         onScheduleChange={handleScheduleChange}
                         schedule={schedule}
                         onFindRides={handleFindRides}
                         showRides={showRides}
                         selectedRide={selectedRide}
                         onSelectRide={handleSelectRide}
                         rides={DUMMY_RIDES}
                         showMobileMenu={showMobileMenu}
                         onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
                     />

                    <div className="absolute top-4 right-4 z-10 pointer-events-auto">
                        <UserProfile
                            driverEta={
                                selectedRide
                                    ? `${DUMMY_RIDES.find((r) => r.id === selectedRide)?.eta} min`
                                    : null
                            }
                        />
                    </div>
                </section>
            </APIProvider>
        </TripProvider>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    )
}
