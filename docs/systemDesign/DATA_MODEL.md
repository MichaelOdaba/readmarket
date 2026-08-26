# ReadMarket — Data Model

This is the source of truth for how ReadMarket's entities are shaped and how they relate to each other. Update this file whenever a schema changes — code should follow this document, not the other way around.

## Core principle: two separate identity systems

**Firebase owns:** authentication credentials, `email_verified` status, `uid`.
**MongoDB owns:** everything else — app profile data, products, orders, notifications, reviews.

Every Mongo document that needs to reference "which user" uses Mongo's own `_id` (an `ObjectId`), **never** the Firebase `uid` directly. The bridge between the two is the `User.firebaseUid` field — look up the Mongo `User` by `firebaseUid` first, then use that document's `_id` everywhere else.

> This distinction caused real bugs during the Firebase migration (Notification.user_id was mistakenly set to a Firebase uid twice). Any new feature that stores "which user did this" must use `User._id`, sourced via a `UserModel.findOne({ firebaseUid: req.user.uid })` lookup.

---

## User

Represents a person's app profile. Created once, right after Firebase account creation, via the register sync flow.

```
User {
  _id: ObjectId
  firebaseUid: string       (unique, indexed — the bridge to Firebase)
  email: string              (unique)
  username: string           (unique)
  firstName: string
  lastName: string
  role: "student" | "admin"  (default: "student")
  createdAt: Date
}
```

**Open question:** Google sign-in doesn't provide a `username` — needs either a generated placeholder + edit-later flow, or a "complete your profile" step post-signup. Not yet decided.

---

## Product

A single ebook / digital resource listed for sale.

```
Product {
  _id: ObjectId
  seller: ObjectId (ref: User)
  title: string
  description: string
  coverImageUrl: string        (Cloudinary — folder: readmarket/product-covers)
  fileUrl: string              (Cloudinary — folder: readmarket/product-files, resource_type: raw)
  price: number
  discountPrice: number | null
  collection: ObjectId | null (ref: Collection)
  createdAt: Date
  updatedAt: Date
}
```

---

## Collection

A themed grouping of Products (e.g. "2024 First Semester Past Questions").

```
Collection {
  _id: ObjectId
  name: string
  description: string
  imageUrl: string             (Cloudinary — folder: readmarket/collection-images)
  createdBy: ObjectId (ref: User)   — admin who created it
  createdAt: Date
}
```

---

## Order

A record of a completed purchase. This is the entity that proves "this transaction actually happened" — Reviews reference this, not Product directly, to prove the reviewer actually bought the item.

```
Order {
  _id: ObjectId
  buyer: ObjectId (ref: User)
  seller: ObjectId (ref: User)
  product: ObjectId (ref: Product)
  amount: number
  status: "pending" | "completed" | "failed"
  paymentReference: string      (from Paystack, once integrated)
  createdAt: Date
}
```

---

## Review

One review per completed Order — covers both the product and the seller in a single document, since both are rated at the same moment by the same buyer.

```
Review {
  _id: ObjectId
  order: ObjectId (ref: Order, unique — one review per order)
  buyer: ObjectId (ref: User)
  seller: ObjectId (ref: User)
  product: ObjectId (ref: Product)
  productRating: number (1-5)
  sellerRating: number (1-5)
  comment: string
  createdAt: Date
}
```

---

## Notification

```
Notification {
  _id: ObjectId
  user_id: ObjectId (ref: User)   — always a Mongo _id, never a Firebase uid
  type: "REGISTER" | "PROFILE_UPDATE" | "UPLOAD" | "PURCHASE" | "EMAIL VERIFICATION"
  title: string
  message: string
  isRead: boolean (default: false)
  data: object (optional extra context, e.g. { productId })
  createdAt: Date
  updatedAt: Date
}
```

**Who gets notified for each type:**

- `REGISTER` → the new user (welcome message)
- `EMAIL VERIFICATION` → the user, if `email_verified` is false at login time
- `UPLOAD` → the seller, confirming their own upload succeeded
- `PURCHASE` → **two notifications created from one event** — one to the buyer (confirmation), one to the seller (someone bought your product)
- `PROFILE_UPDATE` → the user, confirming their own change went through

---

## Auth & permission boundaries (soft-gate plan)

- **Browsing, viewing products/collections:** no authentication required at all — anyone, logged in or not, can view these. Only routes that create/modify data require a logged-in user.
- **Purchasing, uploading a product:** requires being logged in AND `req.user.email_verified === true`, enforced via a `requireVerifiedEmail` middleware. This reads **directly off the decoded Firebase token on every request** — it is intentionally NOT stored as a field on the `User` document in Mongo, because the backend has no way to know the moment a user clicks the verification link, so a stored copy could silently go stale. The token always carries the live, current value for free.
- **Admin-only actions** (creating/editing/deleting Collections, moderating content): requires `User.role === "admin"`, checked via a separate `requireAdmin` middleware that looks up the Mongo user's role after `verifyFirebaseToken` runs.

> **Action item:** the current `User` schema in the live codebase has an `isEmailVerified` field stored in Mongo — this contradicts the design above and should be removed. Verification status should only ever be read live from `req.user.email_verified` (the decoded Firebase token), never persisted.

---

## Status

This document reflects the **intended** design as of this migration. `User` and `Notification` are implemented and match this shape (aside from `role`, not yet added to the live schema — needs a migration/default value added). `Product`, `Collection`, `Order`, and `Review` are not yet implemented — this document is the spec to build them against.
