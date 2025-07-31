"use client"

import { 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from "firebase/firestore"
import { db } from "./config"
import type { User, Product, Sale, Delivery, Category, VehicleMake, VehicleType } from "@/lib/types"

// User operations
export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, userData)
    return { success: true }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error }
  }
}

export const deleteUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, "users", userId))
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false, error }
  }
}

// Product operations
export const updateProduct = async (productId: string, productData: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", productId)
    await updateDoc(productRef, productData)
    return { success: true }
  } catch (error) {
    console.error("Error updating product:", error)
    return { success: false, error }
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(db, "products", productId))
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, error }
  }
}

// Sale operations
export const updateSaleStatus = async (saleId: string, status: Sale["status"]) => {
  try {
    const saleRef = doc(db, "sales", saleId)
    await updateDoc(saleRef, { status })
    return { success: true }
  } catch (error) {
    console.error("Error updating sale status:", error)
    return { success: false, error }
  }
}

// Delivery operations
export const updateDeliveryStatus = async (deliveryId: string, status: Delivery["status"]) => {
  try {
    const deliveryRef = doc(db, "deliveries", deliveryId)
    await updateDoc(deliveryRef, { status })
    return { success: true }
  } catch (error) {
    console.error("Error updating delivery status:", error)
    return { success: false, error }
  }
}

export const assignBikerToDelivery = async (deliveryId: string, bikerId: string) => {
  try {
    const deliveryRef = doc(db, "deliveries", deliveryId)
    await updateDoc(deliveryRef, { bikerId })
    return { success: true }
  } catch (error) {
    console.error("Error assigning biker to delivery:", error)
    return { success: false, error }
  }
}

// Taxonomy operations
export const addCategory = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, "categories"), { name })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error adding category:", error)
    return { success: false, error }
  }
}

export const addVehicleMake = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, "vehicleMakes"), { name })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error adding vehicle make:", error)
    return { success: false, error }
  }
}

export const addVehicleType = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, "vehicleTypes"), { name })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error adding vehicle type:", error)
    return { success: false, error }
  }
}

// Analytics and reporting functions
export const getUsersByRole = async (role: User["role"]) => {
  try {
    const q = query(collection(db, "users"), where("role", "==", role))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[]
  } catch (error) {
    console.error("Error fetching users by role:", error)
    return []
  }
}

export const getSalesByStatus = async (status: Sale["status"]) => {
  try {
    const q = query(collection(db, "sales"), where("status", "==", status))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Sale[]
  } catch (error) {
    console.error("Error fetching sales by status:", error)
    return []
  }
}

export const getDeliveriesByStatus = async (status: Delivery["status"]) => {
  try {
    const q = query(collection(db, "deliveries"), where("status", "==", status))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Delivery[]
  } catch (error) {
    console.error("Error fetching deliveries by status:", error)
    return []
  }
}

export const getProductsByVendor = async (vendorId: string) => {
  try {
    const q = query(collection(db, "products"), where("vendorId", "==", vendorId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[]
  } catch (error) {
    console.error("Error fetching products by vendor:", error)
    return []
  }
}

// Utility function to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate()
  }
  return new Date(timestamp)
}

// Utility function to create Firestore timestamp
export const createTimestamp = () => Timestamp.now()
