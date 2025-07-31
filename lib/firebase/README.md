# Firebase Configuration for Carguvi Admin

This directory contains the Firebase configuration and utilities for the Carguvi Admin dashboard.

## Files Overview

### `config.ts`
- Main Firebase configuration file
- Initializes Firebase app, Firestore, and Auth
- Uses environment variables for security

### `utils.ts`
- Utility functions for Firebase operations
- CRUD operations for all collections
- Analytics and reporting functions
- Status update functions for sales and deliveries

## Environment Variables

Make sure your `.env.local` file contains all the required Firebase configuration variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_DATABASE_URL="your-database-url"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

## Firestore Collections

The admin dashboard works with the following Firestore collections:

### Core Collections
- `users` - User profiles (customers, vendors, bikers)
- `products` - Product catalog
- `sales` - Sales transactions
- `deliveries` - Delivery jobs

### Taxonomy Collections
- `categories` - Product categories
- `vehicleMakes` - Vehicle manufacturers
- `vehicleTypes` - Types of vehicles

## Usage Examples

### Reading Data
```typescript
import { useUsers, useProducts, useSales } from '@/lib/hooks/use-firebase-data'

function MyComponent() {
  const { users, loading: usersLoading } = useUsers()
  const { products, loading: productsLoading } = useProducts()
  const { sales, loading: salesLoading } = useSales()
  
  // Use the data...
}
```

### Updating Data
```typescript
import { updateSaleStatus, updateDeliveryStatus } from '@/lib/firebase/utils'

// Update sale status
await updateSaleStatus(saleId, 'confirmed')

// Update delivery status
await updateDeliveryStatus(deliveryId, 'delivered')
```

### Analytics
```typescript
import { getUsersByRole, getSalesByStatus } from '@/lib/firebase/utils'

// Get all vendors
const vendors = await getUsersByRole('vendor')

// Get pending sales
const pendingSales = await getSalesByStatus('pending')
```

## Security Notes

- Environment variables are prefixed with `NEXT_PUBLIC_` as they need to be accessible in the browser
- The `.env.local` file is excluded from git via `.gitignore`
- Firebase security rules should be configured on the Firebase console to restrict access appropriately
- Consider implementing authentication checks in your admin routes

## Next Steps

1. Set up Firebase security rules for your collections
2. Implement authentication for admin access
3. Add real-time listeners for live data updates
4. Consider adding Firebase Storage for file uploads
5. Set up Firebase Functions for server-side operations if needed
