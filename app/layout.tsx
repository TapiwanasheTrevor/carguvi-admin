import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/lib/auth/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Carguvi Admin Dashboard",
  description: "Admin dashboard for managing Carguvi platform",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedRoute>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1">
                <div className="border-b px-6 py-3">
                  <SidebarTrigger />
                </div>
                <div className="p-6">{children}</div>
              </main>
            </SidebarProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  )
}
