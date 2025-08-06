"use client"

import { BarChart3, Package, ShoppingCart, Truck, Users, Home, LogOut, FileCode2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Deliveries",
    url: "/deliveries",
    icon: Truck,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "API Docs",
    url: "/api-docs",
    icon: FileCode2,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar className="bg-neutral-900 border-r border-neutral-700">
      <SidebarHeader className="border-b border-neutral-700 px-6 py-4">
        <div>
          <h2 className="text-orange-500 font-bold text-lg tracking-wider">CARGUVI OPS</h2>
          <p className="text-neutral-500 text-xs">v1.0.0 SECURE</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-500 text-xs font-medium tracking-wider mb-4">COMMAND MODULES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                      pathname === item.url
                        ? "bg-orange-500 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title.toUpperCase()}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-neutral-700 p-4">
        <div className="mb-4 p-4 bg-neutral-800 border border-neutral-700 rounded">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs text-white">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs text-neutral-500">
            <div>UPTIME: 24:07:15</div>
            <div>USERS: 1,247 ACTIVE</div>
            <div>ORDERS: 89 PENDING</div>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              className="w-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">LOGOUT</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
