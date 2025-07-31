"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { User, Product, Sale, Delivery, Category, VehicleMake, VehicleType } from "@/lib/types"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[]
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"))
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading }
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const q = query(collection(db, "sales"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q)
        const salesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Sale[]
        setSales(salesData)
      } catch (error) {
        console.error("Error fetching sales:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  return { sales, loading }
}

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const q = query(collection(db, "deliveries"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q)
        const deliveriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Delivery[]
        setDeliveries(deliveriesData)
      } catch (error) {
        console.error("Error fetching deliveries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeliveries()
  }, [])

  return { deliveries, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"))
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[]
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}

export function useVehicleMakes() {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicleMakes"))
        const vehicleMakesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as VehicleMake[]
        setVehicleMakes(vehicleMakesData)
      } catch (error) {
        console.error("Error fetching vehicle makes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleMakes()
  }, [])

  return { vehicleMakes, loading }
}

export function useVehicleTypes() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicleTypes"))
        const vehicleTypesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as VehicleType[]
        setVehicleTypes(vehicleTypesData)
      } catch (error) {
        console.error("Error fetching vehicle types:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleTypes()
  }, [])

  return { vehicleTypes, loading }
}
