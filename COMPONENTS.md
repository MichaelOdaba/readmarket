# Components Documentation

This document provides a comprehensive overview of all reusable UI components in the ReadMarket application.

## Component Overview

| Component                                       | Purpose                              | Location                    |
| ----------------------------------------------- | ------------------------------------ | --------------------------- |
| [Header](#header)                               | Main navigation and branding         | `Header.tsx`                |
| [Footer](#footer)                               | Social links and copyright           | `Footer.tsx`                |
| [Search](#search)                               | Dynamic search input with animations | `Search.tsx`                |
| [UserMenu](#usermenu)                           | Desktop user profile dropdown menu   | `UserMenu.tsx`              |
| [UserMenuMobile](#usermenumobile)               | Mobile responsive user menu overlay  | `UserMenuMobile.tsx`        |
| [NotificationsDropdown](#notificationsdropdown) | Real-time notifications panel        | `NotificationsDropdown.tsx` |

---

## Header

**File:** `Header.tsx`

### Purpose

The main navigation header component that displays the app branding, search functionality, navigation links, and user controls. It's responsive and adapts layout between desktop and mobile views.

### Props

None - uses Redux for state and React Router for navigation.

### Key Features

- **Responsive Layout**: Uses `useMobile()` hook to switch between mobile menu and desktop navigation
- **Dynamic Navigation**: Routes to Home, Library, and Upload pages
- **User Authentication**: Shows different UI based on user login state
- **Notifications Integration**: Displays unread notification count, refreshed every 30 seconds
- **Fixed Positioning**: Sticky header on mobile, fixed on desktop
- **Color Coding**: Uses primary (teal), secondary, and accent (gold) colors per design system

### State Management

- `openUserMenu`: Toggle for user profile dropdown (desktop)
- `openMobileMenu`: Toggle for mobile menu overlay
- `openNotifications`: Toggle for notifications panel
- `unreadCount`: Number of unread notifications fetched from API

### Dependencies

- `react-router-dom` for navigation
- `lucide-react` for icons
- Redux for user state
- `useMobile` hook for responsive detection
- `Search` component for search input
- `UserMenu` component (desktop menu)
- `UserMenuMobile` component (mobile menu)
- `NotificationsDropdown` component

### API Calls

- `summaryApi.getNotifications` - Fetches unread notification count every 30 seconds

---

## Footer

**File:** `Footer.tsx`

### Purpose

Simple footer component displaying social media links and copyright information.

### Props

None

### Key Features

- **Social Media Links**: Icons for Facebook, Instagram, Twitter, and GitHub
- **Copyright Info**: Year and "All Rights Reserved" text
- **Fixed Height**: Consistent 60px (h-15) footer
- **Centered Layout**: Evenly spaced content using flexbox
- **Primary Color**: Uses teal primary color for social icons

### Design

- White background with shadow effect
- Horizontal layout with social icons on left, copyright on right
- Uses Lucide React icons for consistency

---

## Search

**File:** `Search.tsx`

### Purpose

Dynamic search input component with animated placeholder text that cycles through popular book titles.

### Props

None - UI-only component, does not handle search logic.

### Key Features

- **Animated Placeholder**: Uses `react-type-animation` to cycle through book titles
  - Displays popular titles like "Game Of Thrones", "The Pragmatic Programmer", etc.
  - Auto-cycles with 1-second pause between titles
- **Focus State**: Transitions from animated placeholder to editable input when clicked
- **Responsive**: Full width on mobile, 50% width on desktop
- **Type Animation Speed**: 50ms per character for smooth typing effect

### Placeholder Titles (Rotation Sequence)

1. "Search Game Of Thrones"
2. "Search The Pragmatic Programmer"
3. "Search Woman Down"
4. "Search Anatomy Of an Alibi"
5. "Search Dear Debbie"
6. "Search Anatomy Of The Heart"
7. "Search Crime and Punishment"
8. "Search The Idea Of a University"

### State

- `isSearch`: Boolean to toggle between animated placeholder and editable input

### Dependencies

- `react-type-animation` for animated text effect
- `lucide-react` for search icon

**Note**: Currently does not perform actual search functionality - appears to be a UI placeholder.

---

## UserMenu

**File:** `UserMenu.tsx`

### Purpose

Desktop-only dropdown menu that displays user profile information and navigation links. Shows authenticated user options.

### Props

```typescript
{
  close: () => void  // Callback function to close the menu
}
```

### Key Features

- **Click-Outside Detection**: Automatically closes when clicking outside the menu
- **User Profile Section**: Displays avatar, first name, last name, and email
- **Navigation Links**:
  - View Profile (button with link icon)
  - Upload Resource
  - My Library
  - Collections
  - Add Collection
- **Logout Functionality**: API call to logout endpoint with success/error handling
- **Redux Integration**: Gets user data from Redux store

### User Display

Shows user avatar (if available) or generic user icon fallback, with user's first name, last name, and email address.

### State

- Uses `useRef` to detect clicks outside menu
- Uses `useEffect` to set up and clean up click-outside listener

### API Calls

- `summaryApi.logout` - Logs out the user, triggers page reload

### Error Handling

- Toast notifications for success/error messages
- Catches logout errors and displays user-friendly message

### Dependencies

- `lucide-react` for icons
- Redux for user state
- React Router for navigation
- `sonner` for toast notifications
- `customAxios` for API calls

---

## UserMenuMobile

**File:** `UserMenuMobile.tsx`

### Purpose

Mobile-specific overlay menu for user profile and navigation. Displays as a full-screen dark overlay with user options.

### Props

```typescript
{
  close: () => void  // Callback function to close the menu
}
```

### Key Features

- **Full-Screen Overlay**: Dark semi-transparent background (black at 70% opacity)
- **Responsive Layout**: Vertical stacking of menu items, optimized for mobile touch
- **User Profile Section**: Avatar, first/last name, and email at top
- **Enlarged Text**: 2xl font size for better mobile usability
- **Navigation Links**:
  - Upload Resource
  - My Library
  - Collections
  - Add Collection
  - Dashboard
  - Settings
- **Click-Outside Detection**: Closes menu when clicking outside
- **Logout Functionality**: Same logout flow as desktop UserMenu

### Layout

- Fixed positioning covering entire viewport
- Profile info centered at top
- Menu items in middle (vertically centered)
- Close button or logout at bottom

### API Calls

- `summaryApi.logout` - Logs out the user and reloads page

### State

- Uses `useRef` for click-outside detection
- Uses `useEffect` for event listener setup/cleanup

### Dependencies

- `lucide-react` for icons
- Redux for user state
- React Router for navigation
- `sonner` for toast notifications
- `customAxios` for API calls

---

## NotificationsDropdown

**File:** `NotificationsDropdown.tsx`

### Purpose

Real-time notifications panel displayed as a dropdown. Shows user notifications with read/unread states, timestamps, and type indicators.

### Props

```typescript
{
  isOpen: boolean        // Controls visibility of dropdown
  onClose: () => void    // Callback to close the dropdown
}
```

### Key Features

- **Dynamic Notification Fetching**: Loads notifications when dropdown opens
- **Unread Badge**: Red badge showing count of unread notifications
- **Notification Types**: Different emoji icons for various notification types:
  - 🔐 LOGIN
  - 🎉 REGISTER
  - 👤 PROFILE_UPDATE
  - 📤 UPLOAD
  - 🛍️ PURCHASE
  - ℹ️ DEFAULT
- **Smart Timestamps**: Displays relative time:
  - "Just now" for recent notifications
  - "Xm ago" for minutes
  - "Xh ago" for hours
  - "Xd ago" for days
  - Full date for older items
- **Mark as Read**: Click notification to mark as read (blue highlight disappears)
- **Responsive Positioning**: Fixed positioning on mobile (full width), dropdown on desktop
- **Loading State**: Spinner displayed while fetching notifications
- **Empty State**: Message shown when no notifications exist

### Data Structure

```typescript
interface Notification {
  _id: string;
  type: string; // Notification type (LOGIN, REGISTER, etc.)
  title: string; // Notification title
  message: string; // Notification message body
  isRead: boolean; // Read status
  createdAt: string; // ISO date string
}
```

### State Management

- `notifications`: Array of notification objects
- `unreadCount`: Integer count of unread notifications
- `isLoading`: Boolean for loading state during API calls

### API Calls

- `summaryApi.getNotifications` - Fetch all notifications
- `summaryApi.markNotificationAsRead` - Mark single notification as read

### UI Zones

- **Header**: Bell icon, "Notifications" title, unread count badge, close button (mobile only)
- **List Area**: Scrollable container with max height of 320px
- **Loading**: Centered spinner animation
- **Empty**: "No notifications yet" message
- **Notification Item**: Icon, title, message, timestamp, unread indicator dot

### Styling

- White background with rounded corners
- Border and shadow for depth
- Primary teal color for icons and active states
- Blue highlight for unread notifications
- Hover effects on notification items

### Dependencies

- `lucide-react` for icons (Bell, X, Loader)
- `customAxios` for API calls
- `sonner` for error toast notifications

---

## Component Integration

### Usage in Header

All navigation and user-related components are orchestrated in the Header:

- `Search` - In center for desktop view
- `UserMenu` - Desktop user dropdown
- `UserMenuMobile` - Mobile menu overlay
- `NotificationsDropdown` - Notifications panel

### Data Flow

1. User data flows from Redux store
2. Notification count fetches every 30 seconds in Header
3. Clicking notifications icon opens dropdown, which fetches full list
4. User actions (logout, mark as read) trigger API calls and state updates

### Responsive Breakpoints

- Mobile: Stack layout, menu overlays, single action icons
- Desktop (md breakpoint): Horizontal nav, dropdown menus, search bar centered
