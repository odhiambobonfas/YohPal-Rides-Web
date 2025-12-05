import { useCallback, useEffect, useRef, useState } from "react"

interface AutocompletePrediction {
    place_id: string
    description: string
    main_text: string
    secondary_text?: string
}

export function useAutocompleteSuggestions() {
    const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([])
    const [loading, setLoading] = useState(false)
    const serviceRef = useRef<google.maps.places.AutocompleteService | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Google Maps available:", !!window.google?.maps?.places)
            if (window.google?.maps?.places) {
                serviceRef.current = new google.maps.places.AutocompleteService()
                console.log("AutocompleteService initialized")
            }
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const getSuggestions = useCallback(async (input: string) => {
        console.log(
            "getSuggestions called with:",
            input,
            "service available:",
            !!serviceRef.current,
        )
        if (!input || input.length < 2) {
            setSuggestions([])
            return
        }

        if (!serviceRef.current) {
            console.error("AutocompleteService not initialized")
            return
        }

        setLoading(true)
        try {
            const response = await serviceRef.current.getPlacePredictions({
                input,
                language: "en",
            })

            if (response.predictions) {
                setSuggestions(
                    response.predictions.map((pred) => ({
                        place_id: pred.place_id,
                        description: pred.description,
                        main_text: pred.structured_formatting?.main_text || pred.description,
                        secondary_text: pred.structured_formatting?.secondary_text,
                    })),
                )
            }
        } catch (error) {
            console.error("Autocomplete error:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { suggestions, loading, getSuggestions, setSuggestions }
}
