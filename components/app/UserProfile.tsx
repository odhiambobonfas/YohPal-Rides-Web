"use client"

import Link from "next/link"
import { LucideClock4, LucideNavigation } from "lucide-react"
import { formatDuration } from "@/lib/duration"
import { useAuth } from "@/providers/Auth"
import { useTripContext } from "@/providers/TripContext"

interface UserProfileProps {
    driverEta?: string | null
}

export default function UserProfile({ driverEta = null }: UserProfileProps) {
    const { profile } = useAuth()
    const { tripDuration } = useTripContext()
    const userInitial = profile?.email ? profile?.email[0] : "YP"

    return (
        <div className="flex items-center gap-3">
            {tripDuration && (
                <div className="bg-white border border-gray-200 rounded-full px-3 py-2 flex items-center gap-1.5 shadow-md">
                    <LucideNavigation className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-gray-900">
                        {formatDuration(tripDuration)}
                    </span>
                </div>
            )}
            {driverEta && (
                <div className="bg-white border border-gray-200 rounded-full px-3 py-2 flex items-center gap-1.5 shadow-md">
                    <LucideClock4 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-gray-900">{driverEta}</span>
                </div>
            )}
            <Link
                href={"/profile"}
                className="size-10 bg-accent border-2 border-primary/60 shadow-md shadow-primary/30 rounded-full capitalize flex items-center justify-center hover:shadow-lg transition-shadow"
            >
                {userInitial}
            </Link>
        </div>
    )
}
