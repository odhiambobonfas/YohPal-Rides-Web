"use client"

import RideMap from "@/components/app/RideMap"
import UserProfile from "@/components/app/UserProfile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LucideCar, LucideClock4, LucideMapPin, LucideMapPinCheck } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!mapsApiKey) throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [pickup, setPickup] = useState(searchParams.get("pickup") || "")
    const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
    const [schedule, setSchedule] = useState(searchParams.get("schedule") || "now")

    const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
    const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false)

    const handleFindRides = () => {
        const params = new URLSearchParams()
        if (pickup) params.set("pickup", pickup)
        if (dropoff) params.set("dropoff", dropoff)
        if (schedule) params.set("schedule", schedule)

        router.push(`/dashboard?${params.toString()}`)
    }

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <RideMap
                mapsApiKey={mapsApiKey!}
                pickup={searchParams.get("pickup") || ""}
                dropoff={searchParams.get("dropoff") || ""}
            />

            <div className="absolute top-0 left-0 right-0 inline-flex justify-between w-full p-2 z-10 pointer-events-none">
                <Card className="w-98 mt-4 ml-4 pointer-events-auto">
                    <CardContent className="w-full flex flex-col gap-4">
                        <div className="relative">
                            <InputGroup className="">
                                <InputGroupInput
                                    placeholder="Pickup location"
                                    className="text-sm sm:text-base md:text-lg text-slate-700"
                                    value={pickup}
                                    onChange={(e) => {
                                        setPickup(e.target.value)
                                    }}
                                />
                                <InputGroupAddon align="inline-start">
                                    <LucideMapPin />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        <div className="relative">
                            <InputGroup className="">
                                <InputGroupInput
                                    placeholder="Dropoff location"
                                    className="text-sm sm:text-base md:text-lg"
                                    value={dropoff}
                                    onChange={(e) => setDropoff(e.target.value)}
                                />
                                <InputGroupAddon align="inline-start">
                                    <LucideMapPinCheck className="text-green-700" />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        <div className="w-full inline-flex items-center justify-center gap-2">
                            <LucideClock4 />
                            <Select value={schedule} onValueChange={setSchedule}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="now">Pick up now</SelectItem>
                                    <SelectItem value="later">Schedule for later</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="m-0">
                        <Button
                            className="w-full hover:scale-101 transition-all"
                            onClick={handleFindRides}
                            disabled={!pickup.trim() || !dropoff.trim()}
                        >
                            <LucideCar className="fill-current" />
                            Find Rides
                        </Button>
                    </CardFooter>
                </Card>
                <div className="pointer-events-auto">
                    <UserProfile />
                </div>
            </div>
        </section>
    )
}
