import { LucideCar, LucideCarFront, LucideMotorbike } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header>
        <nav className="max-w-7xl mx-auto py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex-1 font-mono">Yohpal Rides</h1>

          <div className="inline-flex gap-5 flex-1 justify-end">
            <button>Sign In</button>
            <button className="bg-slate-800 px-6 py-2 rounded-full text-slate-50">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-2 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-7xl font-black tracking-tight leading-tight mb-6">
                Ride Safely
                <br />
                at a Low Cost
              </h2>
              <p className="font-mono">Go anywhere with Us</p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition">
                Join Waitlist
              </button>
              <button className="px-8 py-3 text-black hover:text-gray-700 transition">
                Contact Us
              </button>
            </div>
          </div>

          <div className="h-[70svh] flex items-center justify-center">
            <Image
              src="/rides.svg"
              height={1000}
              width={1000}
              quality={100}
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
              <h3 className="text-white text-xl font-semibold">Economy Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 rounded-2xl overflow-hidden bg-linear-to-br from-gray-700 to-gray-800 flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xl">
                <LucideCar className="fill-current" />
              </div>
              <h3 className="text-white text-xl font-semibold">Luxury Cabs</h3>
            </div>
          </div>

          <div className="relative h-32 rounded-2xl overflow-hidden bg-linear-to-br from-gray-700 to-gray-800 flex items-end p-6">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
            <div className="relative flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                <LucideMotorbike />
              </div>
              <h3 className="text-white text-xl font-semibold">Bikes</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
