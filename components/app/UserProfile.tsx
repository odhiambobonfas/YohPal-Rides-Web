"use client"
import { useAuth } from "@/providers/Auth"
import Link from "next/link"

export default function UserProfile() {
    const { profile } = useAuth()
    const userInitial = profile?.email ? profile?.email[0] : "YP"
    return (
        <Link
            href={"/profile"}
            className="size-10 bg-accent border-2 border-primary/60 shadow-md shadow-primary/30 rounded-full capitalize flex items-center justify-center"
        >
            {userInitial}
        </Link>
    )
}
