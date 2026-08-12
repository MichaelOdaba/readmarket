# ReadMarket

> A fullstack marketplace for buying and selling ebooks and digital resources, built for Nigerian university students.

**Live Demo:** [https://readmarket.netlify.app](https://readmarket.netlify.app)
**API Documentation:** [docs/API.md](./docs/API.md)
**Issues:** [Report a Bug](https://github.com/MichaelOdaba/readmarket/issues)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Design System](#-design-system)
- [Project Convention](#-project-convention)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ReadMarket** is a modern, fullstack ebook marketplace platform designed to solve the problem of manual PDF distribution in educational settings. Built with React, TypeScript, Express, and MongoDB, it enables users to:

- **Buy** digital resources (ebooks, PDFs, study materials)
- **Sell** their own content to a growing community
- **Manage** inventory and view purchase history
- **Collaborate** through secure transactions and notifications

Originally created to help students buy and sell past question papers and books digitally, ReadMarket now serves as a complete platform for digital resource commerce, targeting the Nigerian and African university market.

---

## ✨ Features

### For Buyers

- ✅ Browse and search ebooks by title, description, and collection
- ✅ View detailed product information and seller profiles
- ✅ Add items to cart and manage wishlist
- ✅ Secure checkout and payment processing
- ✅ Download purchased ebooks instantly
- ✅ Track purchase history and order status
- ✅ Read and leave seller reviews

### For Sellers

- ✅ Upload and manage digital products with rich descriptions
- ✅ Organize products into multiple collections
- ✅ Set pricing with optional discount options
- ✅ Track sales and earnings analytics
- ✅ Manage seller profile and address information
- ✅ Receive notifications for new orders
- ✅ View buyer feedback and ratings

### For Admins

- ✅ Create and manage product collections
- ✅ Monitor platform activity and transactions
- ✅ Manage user roles and permissions
- ✅ View system analytics and reports
- ✅ Moderate user content

### Account & Security

- ✅ Authentication via Firebase (Email/Password + Google Sign-In)
- ✅ Email verification, required before purchasing or uploading content
- ✅ Backend token verification via Firebase Admin SDK on every protected route

---

## 📦 Project Structure

```
readmarket/
├── client/                          # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Header.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   ├── NotificationsDropdown.tsx
│   │   │   ├── ProductsGrid.tsx
│   │   │   ├── CollectionGrid.tsx
│   │   │   └── ...
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── UploadPage.tsx
│   │   │   └── ...
│   │   ├── config/                  # Firebase client config
│   │   │   └── firebase.ts
│   │   ├── services/                # API and auth service definitions
│   │   │   ├── SummaryAPI.ts
│   │   │   └── authService.ts
│   │   ├── store/                   # Redux store
│   │   │   ├── index.ts
│   │   │   └── slice/
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── utils/                   # Helper functions
│   │   │   ├── cloudinaryUpload.ts
│   │   │   ├── customAxios.ts
│   │   │   └── fetchUser.ts
│   │   ├── public/
│   │   │   └── _redirects           # SPA fallback routing for Netlify
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Legacy backend (kept for reference only — not deployed)
│   (legacy Node/Express JavaScript server using JWT auth — superseded by server2)
│
├── server2/                         # Active backend (TypeScript + Express + Firebase Auth)
│   ├── src/
│   │   ├── config/                  # DB and Firebase Admin config
│   │   │   ├── db.ts
│   │   │   └── firebaseAdmin.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   ├── verifyFirebaseToken.ts
│   │   │   └── requireVerifiedEmail.ts
│   │   ├── models/
│   │   ├── routes/
│   │   └── types/
│   └── package.json
│
├── docs/                            # Documentation
│   └── API.md                       # API endpoint documentation
│
├── README.md                        # This file
├── .env.example                     # Example environment variables (placeholders)
└── LICENSE
```

---

## 🛠 Tech Stack

### Frontend

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| **React 19**        | UI library                 |
| **TypeScript**      | Type safety                |
| **Vite**            | Build tool & dev server    |
| **Redux Toolkit**   | State management           |
| **Tailwind CSS**    | Styling                    |
| **Lucide Icons**    | Icon library               |
| **Sonner**          | Toast notifications        |
| **Axios**           | HTTP client                |
| **Firebase JS SDK** | Client-side authentication |

### Backend

| Technology             | Purpose                             |
| ---------------------- | ----------------------------------- |
| **Node.js**            | JavaScript runtime                  |
| **Express.js**         | Web framework                       |
| **MongoDB**            | Database                            |
| **Mongoose**           | ODM (Object Document Mapper)        |
| **Firebase Admin SDK** | Server-side auth token verification |
| **Cloudinary**         | File/image hosting                  |
| **Cors**               | Cross-origin requests               |

> **Note:** Authentication is fully delegated to Firebase Authentication. The backend never stores or handles passwords — it only verifies Firebase-issued ID tokens on protected routes and stores app-specific profile data (linked by Firebase UID) in MongoDB.

---

## 📋 Prerequisites

Before installation, ensure you have:

- **Node.js** >= 20.0.0
- **pnpm** package manager (recommended)
- **MongoDB** Atlas account or local MongoDB instance
- **Firebase** project with Email/Password and Google sign-in enabled
- **Cloudinary** account for file uploads
- **Git** for version control

---

## 💾 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MichaelOdaba/readmarket.git
cd readmarket
```

### 2. Backend Setup

```bash
cd server2

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations (see Configuration section)
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` in both `server2` and `client`, then fill in your actual values.

**Backend (`server2/.env`):**

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Get the three `FIREBASE_*` values from Firebase console → Project Settings → Service Accounts → Generate new private key. Keep the `\n` characters as literal escaped text in the private key, wrapped in double quotes.

**Frontend (`client/.env`):**

```
VITE_API_BASE_URL=http://localhost:3000

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Get the six `VITE_FIREBASE_*` values from Firebase console → Project Settings → General → Your apps → Web app SDK config. These are safe to be public; they identify your project, not grant admin access.

**⚠️ Security Note:**

- Keep only placeholders in `.env.example`; never commit real secrets.
- **Never** put the Firebase Admin private key (or any `FIREBASE_PRIVATE_KEY`-style value) in a `VITE_`-prefixed variable — anything prefixed `VITE_` is bundled into the public frontend JavaScript and exposed to anyone who visits the site.
- Do not paste secrets into issue trackers or public PRs.
- Use your hosting platform's environment variable manager (Render, Netlify, etc.) for production, and rotate keys if one is ever exposed.

---

## 🚀 Getting Started

### Development Mode

**Terminal 1 - Start Backend (server2):**

```bash
cd server2
pnpm run dev
# Server running on http://localhost:3000 (default)
```

**Terminal 2 - Start Frontend:**

```bash
cd client
pnpm run dev
# Frontend running on http://localhost:5173
```

### Production Build

```bash
# Backend
cd server2
pnpm run build   # compiles TypeScript to dist/
pnpm run start   # runs dist/index.js

# Frontend
cd client
pnpm run build
pnpm run preview  # Preview production build locally
```

---

## 📡 API Endpoints

### Authentication & Users

Login and registration credentials are handled entirely client-side by Firebase Authentication — the backend never receives or stores a password. The routes below only run _after_ Firebase has already authenticated the request, verified via a `Bearer` ID token on every call.

```
POST   /api/user/register       - Create the Mongo profile for a newly-registered Firebase user
GET    /api/user/get-user       - Get the current authenticated user's profile
PUT    /api/user/edit           - Update user details
```

### Products

```
GET    /api/products            - Get all products
GET    /api/products/:productId - Get single product
POST   /api/products/upload     - Upload product (authenticated, requires verified email)
```

### Collections

```
GET    /api/collection          - Get all collections
GET    /api/collection/:id      - Get collection by ID
POST   /api/collection/add      - Create collection (admin only)
PUT    /api/collection/:id      - Update collection (admin only)
DELETE /api/collection/:id      - Delete collection (admin only)
```

### Notifications

```
GET    /api/notification/       - Get user notifications
PUT    /api/notification/mark-as-read - Mark notification as read
```

**Full API Documentation:** See [docs/API.md](./docs/API.md)

---

## 🎨 Design System

ReadMarket follows a cohesive design system to ensure consistency across all interfaces.

### Color Palette

| Role               | Color          | Hex       | Usage                                  |
| ------------------ | -------------- | --------- | -------------------------------------- |
| **Primary**        | Trust Teal     | `#1F6F78` | Main actions, navigation, primary text |
| **Secondary**      | Bright Teal    | `#2FA4A9` | Hover states, highlights               |
| **Accent**         | Knowledge Gold | `#F4A641` | Purchase actions, badges, CTAs         |
| **Background**     | Light Neutral  | `#F7F9FA` | Page backgrounds                       |
| **Surface**        | White          | `#FFFFFF` | Cards, containers                      |
| **Text Primary**   | Dark Slate     | `#1A2B32` | Main text                              |
| **Text Secondary** | Muted Gray     | `#6B7C85` | Supporting text                        |

### Button Types

- **Primary** - Main actions (Submit, Continue, Save)
- **Secondary** - Secondary actions (Cancel, Back)
- **Accent** - Revenue-driving actions (Buy, Checkout)
- **Danger** - Destructive actions (Delete, Remove)

### Card & Content Layout

Book and content cards follow a minimal reading-focused layout:

- Background: White
- Border: Soft Gray (`#E3E8EA`)
- Shadow: Subtle elevation
- Hover: Slight lift with teal highlight

### Color Usage Principle

The interface follows the **60–30–10 rule**:

- **60%** Neutral backgrounds and surfaces
- **30%** Brand teal colors
- **10%** Accent color for key actions

### Design Philosophy

ReadMarket's UI emphasizes:

- Clarity over decoration
- Calm reading environments
- Consistent interaction feedback
- Conversion without visual overload

The goal is to create a trustworthy and distraction-free digital bookstore experience.

---

## 📝 Project Convention

### Code Style

- Use **TypeScript** for type safety across both frontend and backend
- Use **ESLint** for code linting
- Follow **Prettier** formatting rules
- Use camelCase for variables/functions, PascalCase for components/classes
- Document complex functions with JSDoc comments

### Component Structure

```tsx
// Example component structure
interface Props {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

### Naming Conventions

- React components: `PascalCase` (e.g., `ProductCard.tsx`)
- Functions/utilities: `camelCase` (e.g., `uploadToCloudinary.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- React hooks: Start with `use` (e.g., `usePagination`)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Write clear commit messages
- Update documentation for new features
- Test your changes before submitting a PR
- Follow the project's code style
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🙋 Support

For questions or issues:

- 🐛 [Report Bug](https://github.com/MichaelOdaba/readmarket/issues)
- 💡 [Request Feature](https://github.com/MichaelOdaba/readmarket/issues)

---

## 🗺️ Roadmap

- [ ] Payment integration (Paystack)
- [ ] Sign in with Google (find-or-create backend flow)
- [ ] User ratings and reviews system
- [ ] Advanced search and filtering
- [ ] Mobile native apps (React Native)
- [ ] Wishlist and recommendations
- [ ] Author dashboard analytics
- [ ] DRM for purchased ebooks
- [ ] API rate limiting and caching

---

## 👥 Author

**Created by:** Michael Odaba Adeyi
**GitHub:** [@MichaelOdaba](https://github.com/MichaelOdaba)

---

**Thank you for using ReadMarket!** 🎉
