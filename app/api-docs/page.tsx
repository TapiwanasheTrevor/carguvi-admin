"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const SwaggerUI = dynamic(() => import("@/components/swagger-ui"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-muted-foreground">
          Complete API documentation for the Carguvi Admin Dashboard
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          This application uses Firebase as its backend service. The endpoints documented here 
          represent the Firebase Firestore collections and operations available in the application. 
          Actual API calls are made through the Firebase SDK, not traditional REST endpoints.
        </AlertDescription>
      </Alert>

      {process.env.NODE_ENV === 'development' && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle>Development Notice</AlertTitle>
          <AlertDescription className="text-sm">
            You may see React warnings about deprecated lifecycle methods from the Swagger UI library. 
            These are from the third-party library and don't affect functionality.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Authentication</CardTitle>
            <CardDescription>User authentication via Firebase Auth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge variant="secondary">JWT</Badge>
              <Badge variant="outline">Firebase</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Database</CardTitle>
            <CardDescription>Cloud Firestore NoSQL database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge variant="secondary">Firestore</Badge>
              <Badge variant="outline">Real-time</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Collections</CardTitle>
            <CardDescription>Available data collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Users</Badge>
              <Badge>Products</Badge>
              <Badge>Sales</Badge>
              <Badge>Deliveries</Badge>
              <Badge>Categories</Badge>
              <Badge>Vehicles</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>OpenAPI Specification</CardTitle>
          <CardDescription>
            Interactive API documentation powered by Swagger UI
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <SwaggerUI />
        </CardContent>
      </Card>
    </div>
  )
}