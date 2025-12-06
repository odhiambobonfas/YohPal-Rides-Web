"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
    return (
        <div className="h-full w-full">
            <Skeleton className="h-10 w-40 m-5" /> {/* Trip History Title */}

            <div className="flex flex-col bg-[#f6fafd] h-full w-full m-5">
                <Skeleton className="h-6 w-[50%] m-5" /> {/* Subtitle */}

                <div className="flex w-full h-full">

                    {/* SUMMARY CARD SKELETON */}
                    <div className="flex flex-col items-center justify-evenly w-1/4 h-[40dvh] m-5 rounded-4xl bg-[#e2f1ec] gap-5 p-5">
                        
                        <Skeleton className="w-20 h-20 rounded-2xl" /> {/* Icon */}
                        
                        <div className="flex flex-col gap-3 items-center">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>

                        <div className="flex flex-col gap-3 items-center">
                            <Skeleton className="h-6 w-28" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>

                    {/* RECENT TRIPS SKELETON LIST */}
                    <div className="flex flex-col w-3/4 p-5 gap-5">

                        <Skeleton className="h-8 w-40" /> {/* Recent Trips Title */}

                        {[1,2,3,4].map((i) => (
                            <div key={i} className="flex flex-col bg-background w-[70%] p-5 gap-5 rounded-4xl">

                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-6 w-24" />
                                </div>

                                <Skeleton className="h-5 w-[60%]" />
                                <Skeleton className="h-5 w-[60%]" />

                                <div className="flex justify-between w-full">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}
