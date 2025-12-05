"use server"

interface GoogleAutocompletePrediction {
    place_id: string
    description: string
    structured_formatting?: {
        main_text: string
        secondary_text?: string
    }
}

interface AutocompletePrediction {
    place_id: string
    description: string
    main_text: string
    secondary_text?: string
}

export async function getAutocompleteSuggestions(
    input: string,
    apiKey: string,
): Promise<AutocompletePrediction[]> {
    if (!input || input.length < 2) return []

    try {
        if (!apiKey) {
            return []
        }

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}&language=en`
        console.log("Fetching autocomplete from:", url.replace(apiKey, "***"))

        const response = await fetch(url)
        const data = await response.json()

        console.log("Autocomplete API response:", data)

        if (data.predictions) {
            return data.predictions.map((pred: GoogleAutocompletePrediction) => ({
                place_id: pred.place_id,
                description: pred.description,
                main_text: pred.structured_formatting?.main_text || pred.description,
                secondary_text: pred.structured_formatting?.secondary_text,
            }))
        }

        return []
    } catch (error) {
        return []
    }
}
