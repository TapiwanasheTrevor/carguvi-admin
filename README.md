# Carguvi Admin Dashboard

A modern, responsive admin dashboard for managing the Carguvi platform built with Next.js 15, TypeScript, and Firebase.

## 🚀 Features

### 🔐 Authentication System
- **Admin Login Protection** - Secure access to dashboard
- **Session Management** - Persistent login across browser sessions
- **Demo Credentials**: Username: `Admin`, Password: `Pass1234`

### 📊 Dashboard Overview
- **Real-time Statistics** - Live data from Firebase Firestore
- **User Management** - Tabbed interface for customers, vendors, and bikers
- **Product Management** - Complete CRUD operations for products
- **Sales Tracking** - Monitor sales performance and analytics
- **Delivery Management** - Track delivery status and assignments
- **Analytics** - Comprehensive data visualization and insights

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on all devices
- **Dark/Light Mode Support** - Built with Radix UI components
- **Professional Interface** - Clean, intuitive navigation
- **Real-time Updates** - Live data synchronization

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Custom admin auth system
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + Context

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TapiwanasheTrevor/carguvi-admin.git
   cd carguvi-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Admin Access

- **Username**: `Admin`
- **Password**: `Pass1234`

## 📁 Project Structure

```
carguvi-admin/
├── app/                    # Next.js app directory
│   ├── users/             # Users management page
│   ├── products/          # Products management page
│   ├── sales/             # Sales tracking page
│   ├── deliveries/        # Deliveries management page
│   ├── analytics/         # Analytics dashboard
│   └── layout.tsx         # Root layout with auth protection
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   ├── auth/             # Authentication components
│   └── app-sidebar.tsx   # Main navigation sidebar
├── lib/                  # Utility libraries
│   ├── firebase/         # Firebase configuration and utilities
│   ├── hooks/            # Custom React hooks
│   ├── auth/             # Authentication context
│   └── types.ts          # TypeScript type definitions
└── public/               # Static assets
```

## 🔥 Firebase Collections

The dashboard manages the following Firestore collections:

- **users** - Customer, vendor, and biker profiles
- **products** - Product catalog and inventory
- **sales** - Sales transactions and history
- **deliveries** - Delivery tracking and assignments
- **categories** - Product categories
- **vehicleMakes** - Vehicle manufacturer data
- **vehicleTypes** - Vehicle type classifications

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@carguvi.com or create an issue in this repository.

---

**Built with ❤️ for the Carguvi platform**
