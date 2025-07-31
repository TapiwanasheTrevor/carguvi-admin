"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase/config"
import { collection, getDocs } from "firebase/firestore"

export function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<"testing" | "connected" | "error">("testing")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try to read from a collection to test the connection
        const testCollection = collection(db, "users")
        await getDocs(testCollection)
        setConnectionStatus("connected")
      } catch (err) {
        console.error("Firebase connection error:", err)
        setConnectionStatus("error")
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Firebase Connection Test</h3>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            connectionStatus === "testing"
              ? "bg-yellow-500"
              : connectionStatus === "connected"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
        <span>
          {connectionStatus === "testing" && "Testing connection..."}
          {connectionStatus === "connected" && "Connected to Firebase"}
          {connectionStatus === "error" && "Connection failed"}
        </span>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          Error: {error}
        </div>
      )}
    </div>
  )
}
