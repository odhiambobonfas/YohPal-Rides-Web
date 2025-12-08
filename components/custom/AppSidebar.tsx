"use client"
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
import { LucideHistory, LucideHome, LucideList, LucideUser } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const navItems = [
    { icon: LucideHome, title: "Home", link: "/dashboard" },
    { icon: LucideUser, title: "Profile", link: "/profile" },
    { icon: LucideList, title: "Orders", link: "/orders" },
    { icon: LucideHistory, title: "History", link: "/history" },
]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    const isActive = (itemLink: string) => {
        if (itemLink === "/dashboard") {
            return pathname === "/dashboard"
        }
        return pathname.startsWith(itemLink)
    }

    return (
        <Sidebar collapsible="icon" className="group/sidebar border-r" {...props}>
            <SidebarHeader className="border-b border-sidebar-border py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-sidebar-accent transition-colors duration-200"
                        >
                            <Link href="/" className="flex items-center gap-3 px-2">
                                <div className="relative size-8 shrink-0 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center">
                                    <Image
                                        priority={true}
                                        src="/logo_circular.png"
                                        className="object-cover"
                                        width={32}
                                        height={32}
                                        alt="Yohpal's logo"
                                    />
                                </div>
                                <div className="flex flex-col group-data-[collapsible=icon]/sidebar:hidden">
                                    <span className="font-bold text-xl tracking-tight">
                                        Yohpal Rides
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Ride with comfort
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <SidebarMenu className="space-y-1">
                    {navItems.map((item, idx) => {
                        const active = isActive(item.link)
                        return (
                            <SidebarMenuItem key={idx}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={active}
                                    className={`
                                        h-11 transition-all duration-200
                                        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                                        ${active ? "bg-sidebar-accent font-medium shadow-sm" : ""}
                                    `}
                                >
                                    <Link href={item.link} className="flex items-center gap-3 px-3">
                                        <item.icon
                                            className={`size-5 shrink-0 ${active ? "text-primary" : ""}`}
                                        />
                                        <span className="text-base group-data-[collapsible=icon]/sidebar:hidden">
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="text-xs text-muted-foreground text-center group-data-[collapsible=icon]/sidebar:hidden">
                    <p className="font-medium">&copy; {new Date().getFullYear()} Yohpal Rides</p>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
