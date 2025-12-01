"use client"
import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';

const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!mapsApiKey) throw new Error("Missing GOOGLE_MAPS_API_KEY")

interface RideMapProps {
    pickup?: string;
}

export default function RideMap({ pickup }: RideMapProps) {
    console.log(pickup)

    return (
        <APIProvider apiKey={mapsApiKey!}>
            <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: -1.284433925239902, lng:  36.82603351204897}}
                defaultZoom={15}
                gestureHandling='greedy'
                disableDefaultUI
            >
            </Map>
        </APIProvider>
    );
}
