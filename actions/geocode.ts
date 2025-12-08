"use server"

interface LatLng {
    lat: number
    lng: number
}

export async function geocodeAddress(address: string): Promise<LatLng | null> {
    if (!address) return null

    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

        if (!apiKey) {
            return null
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location
            return { lat, lng }
        }

        return null
    } catch (__error) {
        console.error("Geocoding failed:", __error)
        return null
    }
}
