"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUsers, useProducts, useSales, useDeliveries } from "@/lib/hooks/use-firebase-data"
import { Users, Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react"

export default function Dashboard() {
  const { users, loading: usersLoading } = useUsers()
  const { products, loading: productsLoading } = useProducts()
  const { sales, loading: salesLoading } = useSales()
  const { deliveries, loading: deliveriesLoading } = useDeliveries()

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.status === "confirmed" ? sale.price : 0), 0)
  const pendingSales = sales.filter((sale) => sale.status === "pending").length
  const activeDeliveries = deliveries.filter((delivery) => delivery.status !== "delivered").length

  const stats = [
    {
      title: "TOTAL AGENTS",
      value: usersLoading ? "..." : users.length.toString(),
      description: "REGISTERED",
      icon: Users,
      color: "text-orange-500",
    },
    {
      title: "INVENTORY",
      value: productsLoading ? "..." : products.length.toString(),
      description: "ASSETS TRACKED",
      icon: Package,
      color: "text-orange-500",
    },
    {
      title: "OPERATIONS",
      value: salesLoading ? "..." : sales.length.toString(),
      description: "COMPLETED",
      icon: ShoppingCart,
      color: "text-orange-500",
    },
    {
      title: "REVENUE",
      value: salesLoading ? "..." : `$${totalRevenue.toLocaleString()}`,
      description: "CONFIRMED",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-700 pb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-orange-500 font-bold text-2xl tracking-wider">COMMAND CENTER</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-neutral-400">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
        <p className="text-neutral-400 text-sm mt-2">Tactical overview of Carguvi operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-neutral-800 border-neutral-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-neutral-500 tracking-wider">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500 tracking-wider">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              PRIORITY ALERTS
            </CardTitle>
            <CardDescription className="text-neutral-400">REQUIRES IMMEDIATE ATTENTION</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-neutral-900 border border-neutral-600 rounded">
              <span className="text-sm text-white tracking-wider">PENDING SALES</span>
              <Badge variant={pendingSales > 0 ? "destructive" : "secondary"} className="font-mono">
                {pendingSales}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-900 border border-neutral-600 rounded">
              <span className="text-sm text-white tracking-wider">ACTIVE DELIVERIES</span>
              <Badge variant={activeDeliveries > 0 ? "default" : "secondary"} className="font-mono bg-orange-500">
                {activeDeliveries}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-orange-500 tracking-wider">AGENT DISTRIBUTION</CardTitle>
            <CardDescription className="text-neutral-400">PERSONNEL BY CLASSIFICATION</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["customer", "vendor", "biker"].map((role) => {
              const count = users.filter((user) => user.role === role).length
              return (
                <div key={role} className="flex items-center justify-between p-2 bg-neutral-900 border border-neutral-600 rounded">
                  <span className="text-sm text-white tracking-wider uppercase">{role}S</span>
                  <Badge variant="outline" className="font-mono border-orange-500 text-orange-500">
                    {count}
                  </Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
