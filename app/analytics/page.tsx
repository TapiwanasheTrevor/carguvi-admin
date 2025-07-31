"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUsers, useProducts, useSales, useDeliveries } from "@/lib/hooks/use-firebase-data"
import { BarChart3, TrendingUp, Users } from "lucide-react"

export default function AnalyticsPage() {
  const { users, loading: usersLoading } = useUsers()
  const { products, loading: productsLoading } = useProducts()
  const { sales, loading: salesLoading } = useSales()
  const { deliveries, loading: deliveriesLoading } = useDeliveries()

  const totalRevenue = sales.filter((s) => s.status === "confirmed").reduce((sum, sale) => sum + sale.price, 0)
  const conversionRate =
    sales.length > 0 ? ((sales.filter((s) => s.status === "confirmed").length / sales.length) * 100).toFixed(1) : "0"
  const avgOrderValue =
    sales.filter((s) => s.status === "confirmed").length > 0
      ? (totalRevenue / sales.filter((s) => s.status === "confirmed").length).toFixed(0)
      : "0"

  // Category analysis
  const categoryStats = products.reduce(
    (acc, product) => {
      acc[product.categoryName] = (acc[product.categoryName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Vehicle make analysis
  const vehicleMakeStats = products.reduce(
    (acc, product) => {
      acc[product.vehicleMakeName] = (acc[product.vehicleMakeName] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Sales by status
  const salesByStatus = sales.reduce(
    (acc, sale) => {
      acc[sale.status] = (acc[sale.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Delivery performance
  const deliveryStats = deliveries.reduce(
    (acc, delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  if (usersLoading || productsLoading || salesLoading || deliveriesLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From confirmed sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Sales to confirmed ratio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgOrderValue}</div>
            <p className="text-xs text-muted-foreground">Per confirmed sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
            <CardDescription>Distribution of products across categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(categoryStats)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm">{category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(categoryStats))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Status Distribution</CardTitle>
            <CardDescription>Breakdown of sales by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(salesByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize">{status}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(count / sales.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vehicle Makes</CardTitle>
            <CardDescription>Most popular vehicle makes for products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(vehicleMakeStats)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([make, count]) => (
                <div key={make} className="flex items-center justify-between">
                  <span className="text-sm">{make}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(vehicleMakeStats))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>Status breakdown of all deliveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(deliveryStats).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm capitalize">{status.replace("_", " ")}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(count / deliveries.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
