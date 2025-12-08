import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface ProfileHeadProps {
    user: BaseUser | null
}
export default function ProfileHeader({ user }: ProfileHeadProps) {
    return (
        <div className="w-full min-h-screen bg-[#f5f6f8] p-10">
            <div className="w-full space-y-8">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <div className="flex items-start gap-6 mb-6">
                        <Avatar className="size-[120px]">
                            <AvatarImage
                                className="rounded-full object-cover"
                                src={user?.photoURL}
                                alt="user image"
                            />
                            <AvatarFallback>
                                {user?.displayName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h1 className="text-4xl font-semibold">@{user?.displayName}</h1>
                                    <span className="text-xl text-gray-500">{user?.email}</span>
                                </div>
                                {user?.userType === "driver" && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                                        <LucideCheckCircle className="size-5" />
                                        <span className="font-semibold">Verified Driver</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6 mt-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <LucideMapPin className="size-4" />
                                    <span>Nairobi, Kenya</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LucideCalendar className="size-4" />
                                    <span>Member since March 2022</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LucidePhone className="size-4" />
                                    <span>{user?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <LucideStar className="size-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-3xl font-bold text-gray-900">4.9</span>
                            </div>
                            <p className="text-sm text-gray-600">Rating (1,247)</p>
                        </div>

                        <div className="text-center p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-3xl font-bold text-gray-900 mb-2">2,847</div>
                            <p className="text-sm text-gray-600">Total Trips</p>
                        </div>

                        <div className="text-center p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl">
                            <div className="text-3xl font-bold text-gray-900 mb-2">98.5%</div>
                            <p className="text-sm text-gray-600">Acceptance Rate</p>
                        </div>

                        <div className="text-center p-4 bg-linear-to-br from-orange-50 to-orange-100 rounded-xl">
                            <div className="text-3xl font-bold text-gray-900 mb-2">3.2 yrs</div>
                            <p className="text-sm text-gray-600">Experience</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Driver Settings */}
                        {user?.userType === "driver" && (
                            <div className="bg-white rounded-2xl shadow p-8 space-y-6">
                                <h2 className="font-semibold text-lg">Driver Settings</h2>

                                <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                    <div className="flex items-center gap-4">
                                        <LucideCar className="text-red-500" />
                                        <div>
                                            <div className="text-lg font-medium">
                                                Vehicle Information
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Toyota Corolla 2020 - KCB 456X
                                            </div>
                                        </div>
                                    </div>
                                    <LucideChevronRight className="text-gray-400" />
                                </div>

                                <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                    <div className="flex items-center gap-4">
                                        <LucideCalendar className="text-red-500" />
                                        <div>
                                            <div className="text-lg font-medium">Work Schedule</div>
                                            <div className="text-sm text-gray-500">
                                                Mon-Fri, 8:00 AM - 6:00 PM
                                            </div>
                                        </div>
                                    </div>
                                    <LucideChevronRight className="text-gray-400" />
                                </div>
                            </div>
                        )}

                        {/* Preferences */}
                        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
                            <h2 className="font-semibold text-lg">Preferences</h2>

                            <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-4">
                                    <LucideBell className="text-red-500" />
                                    <div>
                                        <div className="text-lg font-medium">Notifications</div>
                                        <div className="text-sm text-gray-500">
                                            Push, Email & SMS alerts
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400" />
                            </div>

                            <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-4">
                                    <LucideShield className="text-red-500" />
                                    <div>
                                        <div className="text-lg font-medium">Privacy Policy</div>
                                        <div className="text-sm text-gray-500">
                                            Data & security settings
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400" />
                            </div>
                        </div>

                        {/* This Week Stats */}
                        <div className="bg-white rounded-2xl shadow p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg">This Week</h2>
                                <LucideTrendingUp className="text-green-500" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Trips Completed</span>
                                    <span className="font-semibold text-lg">47</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Hours Online</span>
                                    <span className="font-semibold text-lg">38.5 hrs</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Earnings</span>
                                    <span className="font-semibold text-lg text-green-600">
                                        KSh 24,850
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600">Average Trip</span>
                                    <span className="font-semibold text-lg">23 min</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* General */}
                        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
                            <h2 className="font-semibold text-lg">General</h2>

                            <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-4">
                                    <LucideCog className="text-red-500" />
                                    <div>
                                        <div className="text-lg font-medium">Settings</div>
                                        <div className="text-sm text-gray-500">
                                            App preferences & language
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400" />
                            </div>

                            <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                                <div className="flex items-center gap-4">
                                    <LucideSettings className="text-red-500" />
                                    <div>
                                        <div className="text-lg font-medium">
                                            Security & Permissions
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Password & 2FA settings
                                        </div>
                                    </div>
                                </div>
                                <LucideChevronRight className="text-gray-400" />
                            </div>
                        </div>

                        {/* Documents Status */}
                        {user?.userType === "driver" && (
                            <div className="bg-white rounded-2xl shadow p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-semibold text-lg">Documents</h2>
                                    <LucideFileText className="text-gray-400" />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <LucideAlertCircle className="text-yellow-600 size-5" />
                                            <div>
                                                <div className="font-medium">
                                                    Driver&apos;s License
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Expires Dec 15, 2025
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                                            Renew Soon
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <LucideCheckCircle className="text-green-600 size-5" />
                                            <div>
                                                <div className="font-medium">Vehicle Insurance</div>
                                                <div className="text-sm text-gray-600">
                                                    Expires Jun 30, 2026
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                            Valid
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <LucideCheckCircle className="text-green-600 size-5" />
                                            <div>
                                                <div className="font-medium">
                                                    Vehicle Registration
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Expires Mar 20, 2026
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                            Valid
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Logout */}
                        <div className="bg-white rounded-2xl shadow p-8 flex items-center justify-center">
                            <button className="text-red-600 text-xl font-semibold hover:underline">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
