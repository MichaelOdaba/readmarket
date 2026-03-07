# readmarket

An Ebook marketplace

# ReadMarket

> A fullstack MERN marketplace for buying and selling ebooks

[Live Demo](your-deployed-link) | [API Documentation](if-applicable)

## Overview

This app is a pdf marketplace place where users can buy and sell Ebooks, i built this as a solution to sellers manually selling hardcopies of past questions and books in my school, so i am building this platform for users to buy and sell Ebooks and PDFs online.

## Features

- User authentication (JWT)
- Seller dashboard for PDF uploads
- Browse and purchase ebooks
- Secure file storage with Cloudinary

## Tech Stack

**Frontend:** React, [other libraries]
**Backend:** Node.js, Express, MongoDB
**Other:** Cloudinary, JWT, etc.

## Screenshots

## 🎨 UI Color System — Read Market

The **Read Market** interface is built from the brand identity defined in the logo, ensuring visual consistency across all product surfaces.
The color system focuses on **trust, readability, and conversion**, aligning with a modern digital bookstore experience.

---

### ✅ Brand Color Palette

| Role           | Color          | Hex       | Usage                                          |
| -------------- | -------------- | --------- | ---------------------------------------------- |
| Primary        | Trust Teal     | `#1F6F78` | Primary actions, active states, navigation     |
| Secondary      | Bright Teal    | `#2FA4A9` | Hover states, highlights, interactive elements |
| Accent         | Knowledge Gold | `#F4A641` | Purchase actions, badges, promotions           |
| Background     | Light Neutral  | `#F7F9FA` | Application background                         |
| Surface        | White          | `#FFFFFF` | Cards, modals, containers                      |
| Border         | Soft Gray      | `#E3E8EA` | Dividers and outlines                          |
| Primary Text   | Dark Slate     | `#1A2B32` | Main readable text                             |
| Secondary Text | Muted Gray     | `#6B7C85` | Supporting information                         |

---

### 🧱 Button Design System

#### Primary Button

Used for main actions across the platform.

* Background: `#1F6F78`
* Text: White
* Hover: `#2FA4A9`
* Usage: Login, Continue, Submit, Save

---

#### Secondary Button

Used for optional or supporting actions.

* Background: Transparent
* Border/Text: `#1F6F78`
* Hover: Light teal tint

---

#### Accent Button (Conversion Action)

Reserved for revenue-driving interactions.

* Background: `#F4A641`
* Text: White
* Usage: Buy Book, Checkout, Subscribe

---

#### Danger Button

Used only for destructive actions.

* Background: `#D9534F`
* Text: White
* Usage: Delete, Remove

---

### 🧭 Navigation Styling

* Navigation background uses white or light neutral surfaces.
* Active navigation items use **Primary Teal** indicators.
* Icons transition from muted gray to teal when active.
* Visual feedback prioritizes clarity over visual noise.

---

### 📚 Card & Content Layout

Book and content cards follow a minimal reading-focused layout:

* Background: White
* Border: Soft Gray (`#E3E8EA`)
* Shadow: Subtle elevation
* Hover: Slight lift with teal highlight

This approach maintains focus on content while preserving visual hierarchy.

---

### 🎯 Color Usage Principle

The interface follows the **60–30–10 rule**:

* **60%** Neutral backgrounds and surfaces
* **30%** Brand teal colors
* **10%** Accent color for key actions

This ensures balance, readability, and strong action visibility.

---

### ✨ Design Philosophy

Read Market’s UI emphasizes:

* Clarity over decoration
* Calm reading environments
* Consistent interaction feedback
* Conversion without visual overload

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
