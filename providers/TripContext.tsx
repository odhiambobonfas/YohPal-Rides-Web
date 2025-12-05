"use client"

import { createContext, ReactNode, useContext, useMemo, useState } from "react"

interface TripContextType {
    tripDuration: number | null
    setTripDuration: (duration: number | null) => void
    tripLoading: boolean
    setTripLoading: (loading: boolean) => void
    tripError: string | null
    setTripError: (error: string | null) => void
}

const TripContext = createContext<TripContextType | undefined>(undefined)

export function TripProvider({ children }: { children: ReactNode }) {
    const [tripDuration, setTripDuration] = useState<number | null>(null)
    const [tripLoading, setTripLoading] = useState(false)
    const [tripError, setTripError] = useState<string | null>(null)

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            tripDuration,
            setTripDuration,
            tripLoading,
            setTripLoading,
            tripError,
            setTripError,
        }),
        [tripDuration, tripLoading, tripError],
    )

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTripContext() {
    const context = useContext(TripContext)
    if (!context) {
        throw new Error("useTripContext must be used within TripProvider")
    }
    return context
}
