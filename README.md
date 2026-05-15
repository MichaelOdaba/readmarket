# ReadMarket

> A fullstack MERN marketplace for buying and selling ebooks and digital resources

**Live Demo:** [Coming Soon]  
**API Documentation:** [docs/API.md](./docs/API.md)  
**Issues:** [Report a Bug](https://github.com/yourusername/readmarket/issues)

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

**ReadMarket** is a modern, fullstack ebook marketplace platform designed to solve the problem of manual PDF distribution in educational settings. Built with MERN stack (MongoDB, Express, React, Node.js), it enables users to:

- **Buy** digital resources (ebooks, PDFs, study materials)
- **Sell** their own content to a growing community
- **Manage** inventory and view purchase history
- **Collaborate** through secure transactions and notifications

Originally created to help students in school buy and sell past question papers and books digitally, ReadMarket now serves as a complete platform for digital resource commerce.

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

---

## 📦 Project Structure

```
readmarket/
├── client/                          # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Header.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   ├── ProductsGrid.jsx
│   │   │   ├── CollectionGrid.tsx
│   │   │   └── ...
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── UploadPage.tsx
│   │   │   └── ...
│   │   ├── services/                # API call definitions
│   │   │   └── SummaryAPI.ts
│   │   ├── store/                   # Redux store
│   │   │   ├── index.ts
│   │   │   └── slice/
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── utils/                   # Helper functions
│   │   │   ├── cloudinaryUpload.ts
│   │   │   ├── customAxios.ts
│   │   │   └── fetchUser.ts
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Backend (Node.js + Express)
│   ├── controllers/                 # Route controllers
│   │   ├── userController.js
│   │   ├── productsController.js
│   │   ├── collectionController.js
│   │   └── ...
│   ├── models/                      # MongoDB schemas
│   │   ├── userModel.js
│   │   ├── productsModel.js
│   │   ├── collectionModel.js
│   │   └── ...
│   ├── routes/                      # API routes
│   │   ├── userRoutes.js
│   │   ├── productsRoutes.js
│   │   └── ...
│   ├── middleware/                  # Express middleware
│   │   ├── Auth.js                  # JWT authentication
│   │   └── RoleAuth.js              # Role-based access
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── utils/
│   │   ├── generateAccessToken.js
│   │   ├── generateRefreshToken.js
│   │   └── initAdmin.js
│   ├── server.js                    # Express app entry point
│   └── package.json
│
├── docs/                            # Documentation
│   └── API.md                       # API endpoint documentation
│
├── README.md                        # This file
└── LICENSE

```

---

## 🛠 Tech Stack

### Frontend

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| **React 18**      | UI library              |
| **TypeScript**    | Type safety             |
| **Vite**          | Build tool & dev server |
| **Redux Toolkit** | State management        |
| **Tailwind CSS**  | Styling                 |
| **Lucide Icons**  | Icon library            |
| **Sonner**        | Toast notifications     |
| **Axios**         | HTTP client             |

### Backend

| Technology        | Purpose                      |
| ----------------- | ---------------------------- |
| **Node.js**       | JavaScript runtime           |
| **Express.js**    | Web framework                |
| **MongoDB**       | Database                     |
| **Mongoose**      | ODM (Object Document Mapper) |
| **JWT**           | Authentication tokens        |
| **Cloudinary**    | Image hosting                |
| **Cors**          | Cross-origin requests        |
| **Cookie-parser** | Cookie parsing               |

---

## 📋 Prerequisites

Before installation, ensure you have:

- **Node.js** >= 16.0.0
- **npm** or **yarn** package manager
- **MongoDB** Atlas account or local MongoDB instance
- **Cloudinary** account for image uploads
- **Git** for version control

---

## 💾 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/readmarket.git
cd readmarket
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations (see Configuration section)
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and fill in your actual values:

```bash
# Backend
cd server
cp .env.example .env

# Frontend
cd ../client
cp .env.example .env
```

**Required environment variables:**

**Backend (.env):**

- `PORT` - Server port (default: 8009)
- `MONGODB_URL` - MongoDB connection string
- `SECRET_KEY` - JWT secret for access tokens
- `REFRESH_SECRET_KEY` - JWT secret for refresh tokens
- `FRONTEND_URL` - Frontend URL for CORS
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ADMIN_EMAIL` - Admin account email
- `ADMIN_PASSWORD` - Admin account password

**Frontend (.env):**

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset

**⚠️ Security Note:** Never commit your `.env` files to version control. They are already included in `.gitignore`.

---

## 🚀 Getting Started

### Development Mode

**Terminal 1 - Start Backend:**

```bash
cd server
npm start
# Server running on http://localhost:8009
```

**Terminal 2 - Start Frontend:**

```bash
cd client
npm run dev
# Frontend running on http://localhost:5173
```

### Production Build

```bash
# Backend - no build needed, runs directly with Node.js

# Frontend - Create optimized build
cd client
npm run build
npm run preview  # Preview production build locally
```

---

## 📡 API Endpoints

### Authentication

```
POST   /api/user/register       - Register new user
POST   /api/user/login          - Login user
GET    /api/user/logout         - Logout user
GET    /api/user/get-user       - Get current user
PUT    /api/user/edit           - Update user details
PUT    /api/user/change-password - Change password
```

### Products

```
GET    /api/products            - Get all products
GET    /api/products/:productId - Get single product
POST   /api/products/upload     - Upload product (authenticated)
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

---

## 📝 Project Convention

### Code Style

- Use **TypeScript** for type safety (Frontend strongly encouraged)
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
- Test your changes before submitting PR
- Follow the project's code style
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🙋 Support

For questions or issues:

- 📧 Email: support@readmarket.com
- 🐛 [Report Bug](https://github.com/yourusername/readmarket/issues)
- 💡 [Request Feature](https://github.com/yourusername/readmarket/issues)

---

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/Razorpay)
- [ ] User ratings and reviews system
- [ ] Advanced search and filtering
- [ ] Mobile native apps (React Native)
- [ ] Wishlist and recommendations
- [ ] author Dashboard analytics
- [ ] DRM for purchased ebooks
- [ ] API Rate limiting and caching

---

## 👥 Author

**Created by:** [Your Name]  
**GitHub:** [@yourusername](https://github.com/yourusername)

---

**Thank you for using ReadMarket!** 🎉

---

### 📚 Card & Content Layout

Book and content cards follow a minimal reading-focused layout:

- Background: White
- Border: Soft Gray (`#E3E8EA`)
- Shadow: Subtle elevation
- Hover: Slight lift with teal highlight

This approach maintains focus on content while preserving visual hierarchy.

---

### 🎯 Color Usage Principle

The interface follows the **60–30–10 rule**:

- **60%** Neutral backgrounds and surfaces
- **30%** Brand teal colors
- **10%** Accent color for key actions

This ensures balance, readability, and strong action visibility.

---

### ✨ Design Philosophy

Read Market’s UI emphasizes:

- Clarity over decoration
- Calm reading environments
- Consistent interaction feedback
- Conversion without visual overload

The goal is to create a trustworthy and distraction-free digital bookstore experience.

[Add 2-3 screenshots when you have UI]

## Installation

### Prerequisites

- Node.js v[version]
- MongoDB
- Cloudinary account

### Setup

```bash
# Clone repo
git clone [your-repo]

# Install dependencies
cd client && npm install
cd ../server && npm install

# Environment variables
# Create .env in server folder with:
# MONGODB_URI=
# JWT_SECRET=
# CLOUDINARY_CLOUD_NAME=
# etc.

# Run
npm run dev
```

### What was done every day

# day one:

so today i started building "readmarket" an online ebooks and PDF makertplace, here is what was achieved today,

- i created the folder structure for the backend of aplication
- i intialized an express server and successfully connected to a mongoDB database
- i created the required database models
- i finished the register functionality on the backend, users can now register
  -i also finished the login functionality on the backend, users can now login
  -designed the database tables and struture

## Lessons Learned

[Add this section later - talk about challenges you faced]

## Future Improvements

- Stripe payment integration
- Review system
- Advanced search/filtering

## License

MIT
