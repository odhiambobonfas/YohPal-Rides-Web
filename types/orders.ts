export interface Order {
    id: string
    status?: string
    totalFare?: number
    distance?: number
    estimatedTime?: number
    baseFare?: number
    cancellationFee?: number
    createdAt?: number | string
    acceptedAt?: number | string
    customerName?: string
    customerPhone?: string
    acceptedDriverName?: string
    acceptedDriverPhone?: string
    acceptedVehicleModel?: string
    acceptedVehicleNumber?: string
    Location?: {
        pickupLocation?: string
        pickupLatitude?: number
        pickupLongitude?: number
    }
    destinationLocation?: string
    serviceCategory?: string
    vehicleType?: string
}
