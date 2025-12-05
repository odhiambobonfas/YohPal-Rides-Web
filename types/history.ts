export type Trip = {
    id: string
    amount: number
    pickup: string
    destination: string
    distance: string
    date: string
}

export type HistoryData = {
    summary: {
        totalEarnings: number
        totalTrips: number
    }
    recentTrips: Trip[]
}
