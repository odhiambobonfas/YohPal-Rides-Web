"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEmailAuth } from "@/hooks/auth/use-email-auth"
import { BaseUser } from "@/types/users"
import {
    LucideAlertCircle,
    LucideBell,
    LucideCalendar,
    LucideCar,
    LucideCheckCircle,
    LucideChevronRight,
    LucideCog,
    LucideFileText,
    LucideMapPin,
    LucidePhone,
    LucideSettings,
    LucideShield,
    LucideStar,
    LucideTrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileHeadProps {
    user: BaseUser | null
}

export default function ProfileHeader({ user }: ProfileHeadProps) {
    const { logOut } = useEmailAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await logOut()
        router.push("/")
    }

    return (
        <div className="w-full min-h-screen bg-[#f5f6f8] p-4 sm:p-6 lg:p-10">
            <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <Avatar className="size-20 sm:size-24 lg:size-[120px]">
                            <AvatarImage
                                className="rounded-full object-cover"
                                src={user?.photoURL}
                                alt="user image"
                            />
                            <AvatarFallback>
                                {user?.displayName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 w-full text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between mb-2 gap-2">
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
                                        @{user?.displayName}
                                    </h1>
                                    <span className="text-sm sm:text-base lg:text-xl text-gray-500">
                                        {user?.email}
                                    </span>
                                </div>
                                {user?.userType === "driver" && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-50 text-green-700 rounded-full">
                                        <LucideCheckCircle className="size-4 sm:size-5" />
                                        <span className="text-xs sm:text-sm font-semibold">
                                            Verified Driver
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
                                <div className="flex items-center gap-2">
                                    <LucideMapPin className="size-3 sm:size-4" />
                                    <span>Nairobi, Kenya</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LucideCalendar className="size-3 sm:size-4" />
                                    <span className="text-xs sm:text-base">
                                        Member since March 2022
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LucidePhone className="size-3 sm:size-4" />
                                    <span>{user?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="text-center p-3 sm:p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl">
                            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <LucideStar className="size-4 sm:size-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                    4.9
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Rating (1,247)</p>
                        </div>

                        <div className="text-center p-3 sm:p-4 bg-linear-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                                2,847
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Total Trips</p>
                        </div>

                        <div className="text-center p-3 sm:p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                                98.5%
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Acceptance Rate</p>
                        </div>

                        <div className="text-center p-3 sm:p-4 bg-linear-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                                3.2 yrs
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Experience</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* Driver Settings */}
                        {user?.userType === "driver" && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                                <h2 className="font-semibold text-base sm:text-lg">
                                    Driver Settings
                                </h2>

                                <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                        <LucideCar className="text-red-500 size-5 sm:size-6 shrink-0" />
                                        <div className="min-w-0">
                                            <div className="text-sm sm:text-base lg:text-lg font-medium truncate">
                                                Vehicle Information
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                                                Toyota Corolla 2020 - KCB 456X
                                            </div>
                                        </div>
                                    </div>
                                    <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                                </div>

                                <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                        <LucideCalendar className="text-red-500 size-5 sm:size-6 shrink-0" />
                                        <div className="min-w-0">
                                            <div className="text-sm sm:text-base lg:text-lg font-medium">
                                                Work Schedule
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                                                Mon-Fri, 8:00 AM - 6:00 PM
                                            </div>
                                        </div>
                                    </div>
                                    <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                                </div>
                            </div>
                        )}

                        {/* Preferences */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                            <h2 className="font-semibold text-base sm:text-lg">Preferences</h2>

                            <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    <LucideBell className="text-red-500 size-5 sm:size-6 shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-sm sm:text-base lg:text-lg font-medium">
                                            Notifications
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                                            Push, Email & SMS alerts
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                            </div>

                            <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    <LucideShield className="text-red-500 size-5 sm:size-6 shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-sm sm:text-base lg:text-lg font-medium">
                                            Privacy Policy
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                                            Data & security settings
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                            </div>
                        </div>

                        {/* This Week Stats */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="font-semibold text-base sm:text-lg">This Week</h2>
                                <LucideTrendingUp className="text-green-500 size-5 sm:size-6" />
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 text-sm sm:text-base">
                                        Trips Completed
                                    </span>
                                    <span className="font-semibold text-base sm:text-lg">47</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 text-sm sm:text-base">
                                        Hours Online
                                    </span>
                                    <span className="font-semibold text-base sm:text-lg">
                                        38.5 hrs
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 text-sm sm:text-base">
                                        Earnings
                                    </span>
                                    <span className="font-semibold text-base sm:text-lg text-green-600">
                                        KSh 24,850
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 text-sm sm:text-base">
                                        Average Trip
                                    </span>
                                    <span className="font-semibold text-base sm:text-lg">
                                        23 min
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* General */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                            <h2 className="font-semibold text-base sm:text-lg">General</h2>

                            <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    <LucideCog className="text-red-500 size-5 sm:size-6 shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-sm sm:text-base lg:text-lg font-medium">
                                            Settings
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                                            App preferences & language
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                            </div>

                            <div className="flex items-center justify-between py-2 sm:py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    <LucideSettings className="text-red-500 size-5 sm:size-6 shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-sm sm:text-base lg:text-lg font-medium">
                                            Security & Permissions
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-500 truncate">
                                            Password & 2FA settings
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400 size-5 shrink-0" />
                            </div>
                        </div>

                        {/* Documents Status */}
                        {user?.userType === "driver" && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8">
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <h2 className="font-semibold text-base sm:text-lg">
                                        Documents
                                    </h2>
                                    <LucideFileText className="text-gray-400 size-5 sm:size-6" />
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg gap-2">
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                            <LucideAlertCircle className="text-yellow-600 size-4 sm:size-5 shrink-0" />
                                            <div className="min-w-0">
                                                <div className="font-medium text-sm sm:text-base">
                                                    Driver&apos;s License
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-600 truncate">
                                                    Expires Dec 15, 2025
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                            Renew Soon
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg gap-2">
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                            <LucideCheckCircle className="text-green-600 size-4 sm:size-5 shrink-0" />
                                            <div className="min-w-0">
                                                <div className="font-medium text-sm sm:text-base">
                                                    Vehicle Insurance
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-600 truncate">
                                                    Expires Jun 30, 2026
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                            Valid
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg gap-2">
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                            <LucideCheckCircle className="text-green-600 size-4 sm:size-5 shrink-0" />
                                            <div className="min-w-0">
                                                <div className="font-medium text-sm sm:text-base">
                                                    Vehicle Registration
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-600 truncate">
                                                    Expires Mar 20, 2026
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                            Valid
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Logout */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                            <button
                                onClick={handleLogout}
                                className="text-red-600 text-base sm:text-lg lg:text-xl font-semibold hover:underline"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
