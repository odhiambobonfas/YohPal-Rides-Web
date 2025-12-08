import type { HistoryData } from "@/types/history";

export const historyData: HistoryData = {
    summary: {
        totalEarnings: 45250,
        totalTrips: 128,
    },
    recentTrips: [
        {
            id: "TRH001",
            amount: 550,
            pickup: "Westlands, Nairobi",
            destination: "CBD, Nairobi",
            distance: "8.5 km",
            date: "2024-12-04",
        },
        {
            id: "TRH002",
            amount: 750,
            pickup: "Airport, Nairobi",
            destination: "Kilimani, Nairobi",
            distance: "18 km",
            date: "2024-12-03",
        },
        {
            id: "TRH003",
            amount: 450,
            pickup: "Karen, Nairobi",
            destination: "Upperhill, Nairobi",
            distance: "6.2 km",
            date: "2024-12-02",
        },
        {
            id: "TRH004",
            amount: 620,
            pickup: "Parklands, Nairobi",
            destination: "Lavington, Nairobi",
            distance: "9.8 km",
            date: "2024-12-01",
        },
        {
            id: "TRH005",
            amount: 500,
            pickup: "Embakasi, Nairobi",
            destination: "Donholm, Nairobi",
            distance: "5.5 km",
            date: "2024-11-30",
        },
    ],
};
