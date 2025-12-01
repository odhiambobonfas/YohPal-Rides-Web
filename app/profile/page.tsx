import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LucideBell,
  LucideCalendar,
  LucideCar,
  LucideChevronRight,
  LucideCog,
  LucideSettings,
  LucideShield
} from "lucide-react"

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] p-10">
      <div className="max-w-6xl mx-auto space-y-10">

        <div className="flex items-center gap-6 bg-white rounded-2xl shadow p-8">
          <Avatar className="size-[120px]">
            <AvatarImage
              className="rounded-full object-cover"
              src="/logo_circular.png"
              alt="user image"
            />
            <AvatarFallback>John Doe</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">@Wamuthende</h1>
            <span className="text-xl text-gray-500">wamuthende@gmail.com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">

          <div className="space-y-10">

            <div className="bg-white rounded-2xl shadow p-8 space-y-6">
              <h2 className="font-semibold text-lg">Driver Settings</h2>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideCar className="text-red-500" />
                  <span className="text-lg">Vehicle Information</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideCalendar className="text-red-500" />
                  <span className="text-lg">Work Schedule</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 space-y-6">
              <h2 className="font-semibold text-lg">Preferences</h2>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideBell className="text-red-500" />
                  <span className="text-lg">Notifications</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideShield className="text-red-500" />
                  <span className="text-lg">Privacy Policy</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-10">

            <div className="bg-white rounded-2xl shadow p-8 space-y-6">
              <h2 className="font-semibold text-lg">General</h2>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideCog className="text-red-500" />
                  <span className="text-lg">Settings</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>

              <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                <div className="flex items-center gap-4">
                  <LucideSettings className="text-red-500" />
                  <span className="text-lg">Security & Permissions</span>
                </div>
                <LucideChevronRight className="text-gray-400" />
              </div>
            </div>

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
