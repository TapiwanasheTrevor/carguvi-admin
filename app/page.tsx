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
      title: "Total Users",
      value: usersLoading ? "..." : users.length.toString(),
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Products",
      value: productsLoading ? "..." : products.length.toString(),
      description: "Available products",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: salesLoading ? "..." : sales.length.toString(),
      description: "All time sales",
      icon: ShoppingCart,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: salesLoading ? "..." : `$${totalRevenue.toLocaleString()}`,
      description: "Total confirmed sales",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Carguvi admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Sales</span>
              <Badge variant={pendingSales > 0 ? "destructive" : "secondary"}>{pendingSales}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Deliveries</span>
              <Badge variant={activeDeliveries > 0 ? "default" : "secondary"}>{activeDeliveries}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["customer", "vendor", "biker"].map((role) => {
              const count = users.filter((user) => user.role === role).length
              return (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{role}s</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
