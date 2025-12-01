"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LucideCar, LucideCarFront, LucideChevronDown, LucideClock4, LucideMapPin, LucideMotorbike } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [schedule, setSchedule] = useState("now");
  return (
    <main className="min-h-screen text-slate-900">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(101%_50%_at_50%_0%,rgba(239,68,68,0.15)_0,rgba(239,68,68,0)_50%,rgba(239,68,68,0)_100%)]"></div>
      <header>
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold font-mono">Yohpal Rides</h1>

          <div className="inline-flex gap-2 sm:gap-5">
            <Link href="/auth/login" className="hover:underline transition-all inline-flex items-center justify-center text-sm sm:text-base">Sign In</Link>
            <Link href="/auth/register" className="hover:scale-105 transition-all bg-slate-800 px-4 sm:px-6 py-2 rounded-full text-slate-50 text-sm sm:text-base">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="bg-primary/50 rounded-full w-16 inline-flex px-1 py-0.5 text-sm font-semibold font-mono items-center justify-center">ke</div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
                Ride Safely
                <br />
                at a Low Cost
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-800">
                Enjoy safe, smooth rides wherever you’re headed.<br/>
                Verified drivers, transparent fares.<br/>
                Travel without worry.</p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <InputGroup className="md:max-w-lg rounded-xl">
                <InputGroupInput
                  placeholder="Pickup location"
                  className="text-sm sm:text-base md:text-lg"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />

                <InputGroupAddon align="inline-start">
                  <LucideMapPin/>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                         <LucideClock4/>{schedule === "now" ? "Pick up now" : "Schedule for later"}<LucideChevronDown className="" />
                       </InputGroupButton>
                     </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                       <DropdownMenuItem className="rounded-lg" onClick={() => setSchedule("later")}>Schedule for later</DropdownMenuItem>
                       <DropdownMenuItem className="rounded-lg" onClick={() => setSchedule("now")}>Pick up now</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>

            </div>
            <Button
              onClick={() => router.push(`/dashboard?pickup=${encodeURIComponent(pickupLocation)}&schedule=${schedule}`)}
              className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg rounded-xl hover:bg-primary/90 transition-all w-full sm:w-auto"
            >
              View Prices
            </Button>
          </div>

          <div className="hidden md:flex h-[50svh] md:h-[70svh] items-center justify-center">
            <Image
              src="/rides.svg"
              height={1000}
              width={1000}
              alt="stuff"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden bg-cover bg-center flex items-end p-4 sm:p-6" style={{ backgroundImage: "url('/economy.jpg')" }}>
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-3 sm:gap-4 w-full">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                <LucideCarFront className="fill-current" />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold">Economy Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden bg-cover bg-center flex items-end p-4 sm:p-6" style={{ backgroundImage: "url('/premium.jpg')" }}>
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-3 sm:gap-4 w-full">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                <LucideCar className="fill-current" />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold">Luxury Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden bg-cover bg-center flex items-end p-4 sm:p-6" style={{ backgroundImage: "url('/bike.jpg')" }}>
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-3 sm:gap-4 w-full">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                <LucideMotorbike />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-semibold">Bikes</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
