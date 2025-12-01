"use client"
import Link from "next/link"
import { useAuth } from "@/providers/Auth"

export default function UserProfile() {
    const {profile} = useAuth()
    const userInitial = profile?.email ? profile?.email[0] : "YP"
    return (
        <Link href={"/profile"} className="size-10 bg-accent rounded-full capitalize flex items-center justify-center">
            {userInitial}
        </Link>
    );
}
