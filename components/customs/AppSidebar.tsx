"use client"
import {
    LucideCarFront,
    LucideHistory,
    LucideHome,
    LucideList,
    LucideUser,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
    { icon: LucideHome, title: "Home", link: "/dashboard" },
    {icon: LucideUser, title: "Profile", link: "/profile"},
    {icon: LucideList, title: "Orders", link: "/orders"},
    {icon: LucideHistory, title: "History", link: "/history"},
    {icon: LucideCarFront, title: "My Rides", link: "/rides"}

]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    const isActive = (itemLink: string) => {
        if (itemLink === "/") {
            console.log("active")
            return pathname === "/"
        }
        return pathname.startsWith(itemLink)
    }

    return (
        <Sidebar collapsible="icon" className="group/sidebar" {...props}>
            <SidebarHeader className="flex justify-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    priority={true}
                                    src="/logo_circular.png"
                                    className="size-8 shrink-0"
                                    width={100}
                                    height={100}
                                    alt="Yohpal's logo"
                                />
                                <span className="font-black text-2xl">Yohpal Rides</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item, idx) =>
                        (
                            <Link
                                href={item.link}
                                // target={item.target}
                                className="w-full inline-flex items-center p-1"
                                key={idx}
                            >
                                <SidebarMenuItem className="w-full">
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive(item.link)}
                                        className="hover:bg-primary/5 cursor-pointer"
                                    >
                                        <item.icon />
                                        <span className="text-lg group-data-[collapsible=icon]/sidebar:hidden">
                                            {item.title}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </Link>
                        )
                    )}
                </SidebarMenu>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}
