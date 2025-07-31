"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUsers } from "@/lib/hooks/use-firebase-data"
import { Search, Users, UserCheck, Truck, ShoppingBag } from "lucide-react"

export default function UsersPage() {
  const { users, loading } = useUsers()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Debug: Log users data
  console.log("Users data:", users)
  console.log("Loading state:", loading)

  const getUsersByRole = (role: string) => {
    if (role === "all") return users
    return users.filter((user) => user.role === role)
  }

  const getFilteredUsers = (role: string) => {
    const roleUsers = getUsersByRole(role)
    if (!searchTerm) return roleUsers

    return roleUsers.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "vendor":
        return "default"
      case "biker":
        return "secondary"
      case "customer":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "vendor":
        return ShoppingBag
      case "biker":
        return Truck
      case "customer":
        return UserCheck
      default:
        return Users
    }
  }

  const renderUserTable = (role: string) => {
    const filteredUsers = getFilteredUsers(role)

    if (filteredUsers.length === 0) {
      return (
        <div className="text-center py-8">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            {searchTerm ? "No users found" : `No ${role === "all" ? "users" : role + "s"} yet`}
          </h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : `${role === "all" ? "Users" : role.charAt(0).toUpperCase() + role.slice(1) + "s"} will appear here once they sign up`
            }
          </p>
        </div>
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
              <TableCell>{user.email || "N/A"}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
              </TableCell>
              <TableCell>{user.location || "N/A"}</TableCell>
              <TableCell>
                {user.createdAt?.toDate?.()?.toLocaleDateString() ||
                 (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all registered users ({users.length} total)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        {["customer", "vendor", "biker"].map((role) => {
          const count = users.filter((user) => user.role === role).length
          const Icon = getRoleIcon(role)
          return (
            <Card key={role}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{role}s</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name, email, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="customer" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Customers ({users.filter(u => u.role === "customer").length})
          </TabsTrigger>
          <TabsTrigger value="vendor" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Vendors ({users.filter(u => u.role === "vendor").length})
          </TabsTrigger>
          <TabsTrigger value="biker" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Bikers ({users.filter(u => u.role === "biker").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of all registered users</CardDescription>
            </CardHeader>
            <CardContent>
              {renderUserTable("all")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Users who purchase products</CardDescription>
            </CardHeader>
            <CardContent>
              {renderUserTable("customer")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor">
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>Users who sell products</CardDescription>
            </CardHeader>
            <CardContent>
              {renderUserTable("vendor")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biker">
          <Card>
            <CardHeader>
              <CardTitle>Bikers</CardTitle>
              <CardDescription>Users who handle deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {renderUserTable("biker")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
