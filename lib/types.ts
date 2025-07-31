export interface User {
  id: string
  createdAt: any
  email: string
  location: string
  name: string
  role: "customer" | "vendor" | "biker"
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  vendorId: string
  categoryId: string
  categoryName: string
  vehicleMakeId: string
  vehicleMakeName: string
  vehicleTypeId: string
  vehicleTypeName: string
}

export interface Sale {
  id: string
  productId: string
  productName: string
  price: number
  vendorId: string
  customerId: string
  customerAddress: string
  status: "pending" | "confirmed" | "declined"
  timestamp: any
}

export interface Delivery {
  id: string
  saleId: string
  productName: string
  customerId: string
  customerAddress: string
  vendorAddress: string
  bikerId: string
  status: "awaiting_pickup" | "picked_up" | "delivered"
  timestamp: any
}

export interface Category {
  id: string
  name: string
}

export interface VehicleMake {
  id: string
  name: string
}

export interface VehicleType {
  id: string
  name: string
}
