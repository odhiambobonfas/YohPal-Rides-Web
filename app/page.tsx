import Image from "next/image";
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
  return (
    <main className="min-h-screen text-slate-900">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(101%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <header>
        <nav className="max-w-7xl mx-auto py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex-1 font-mono">Yohpal Rides</h1>

          <div className="inline-flex gap-5 flex-1 justify-end">
            <Link href="/auth/login" className="hover:underline transition-all inline-flex items-center justify-center">Sign In</Link>
            <Link href="/auth/register" className="hover:scale-105 transition-all bg-slate-800 px-6 py-2 rounded-full text-slate-50">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-2 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="bg-primary/50 rounded-full w-16 inline-flex px-1 py-0.5 text-sm font-semibold font-mono items-center justify-center">ke</div>
              <h2 className="text-7xl font-black tracking-tight leading-tight mb-6">
                Ride Safely
                <br />
                at a Low Cost
              </h2>
              <p className="text-2xl text-slate-800">
                Enjoy safe, smooth rides wherever you’re headed.<br/>
                Verified drivers, transparent fares.<br/>
                Travel without worry.</p>
            </div>

            <div className="flex gap-4">
              <InputGroup className="md:max-w-lg rounded-xl">
                <InputGroupInput placeholder="Pickup location" className="text-lg"/>

                <InputGroupAddon align="inline-start">
                  <LucideMapPin/>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <InputGroupButton variant="ghost" className="!pr-1.5 text-xs">
                        <LucideClock4/>Schedule<LucideChevronDown className="" />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="rounded-lg">Schedule for later</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg">Pick up now</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>

            </div>
            <Button className="px-8 py-6 text-lg rounded-xl hover:bg-primary/90 transition-all">View Prices</Button>
          </div>

          <div className="h-[70svh] flex items-center justify-center">
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

      <section className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="relative h-32 rounded-2xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                <LucideCarFront className="fill-current" />
              </div>
              {/* /economy.jpg */}
              <h3 className="text-white text-xl font-semibold">Economy Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 rounded-2xl overflow-hidden bg-linear-to-br from-gray-700 to-gray-800 flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xl">
                <LucideCar className="fill-current" />
              </div>

              {/* /premium.jpg */}
              <h3 className="text-white text-xl font-semibold">Luxury Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 rounded-2xl overflow-hidden bg-linear-to-br from-gray-700 to-gray-800 flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                <LucideMotorbike />
              </div>
              {/* /bike.jpg */}
              <h3 className="text-white text-xl font-semibold">Bikes</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
