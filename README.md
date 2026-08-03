# FixItNow Frontend

**FixItNow** is a modern Next.js frontend for a full-stack home services marketplace. Customers can browse services, discover technicians, book appointments, make secure payments through Stripe Checkout, and manage their booking history.

Technicians can manage availability, services, profiles, and bookings, while administrators can oversee users, categories, and platform-wide operations through dedicated dashboards.

The application works with the companion **FixItNow Backend** and implements secure authentication, role-based authorization, API integration, payment processing, protected routes, and responsive user experiences.

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=1d5jTMB4bT40idwTtkWgun0Cg-gLXIru9" alt="FixItNow" />
</div>

---

# Live Demo & Documentation

* Frontend: https://fixitnow-frontend-six.vercel.app
* Backend API: https://fixitnow-blush.vercel.app
* API Documentation: https://documenter.getpostman.com/view/54687734/2sBY4LQMTR
* Integration Guide: [API_INTEGRATION.md](./API_INTEGRATION.md)

---

# Table of Contents

* [Project Highlights](#project-highlights)
* [Architecture Overview](#architecture-overview)
* [Overview](#overview)
* [API Documentation](#api-documentation)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Security](#security)
* [Local Development](#local-development)
* [Routes](#important-routes)
* [Deployment](#deployment)
* [Future Enhancements](#future-enhancements)

---

# Project Highlights

* Full-stack home services marketplace
* Role-based authentication and authorization
* Customer, Technician, and Admin dashboards
* Stripe Checkout payment integration
* Booking lifecycle management
* Availability and slot scheduling
* Review and rating system
* Middleware-based route protection
* Zod-powered validation
* Responsive UI design
* Next.js App Router architecture
* Server Actions integration

---

# Architecture Overview

```text
Customer / Technician / Admin
              │
              ▼
      Next.js Frontend
              │
              ▼
     Server Actions / API Calls
              │
              ▼
       Express Backend
              │
      ┌───────┴────────┐
      ▼                ▼
 Prisma ORM       Stripe Checkout
      │
      ▼
 PostgreSQL
```

---

# Overview

FixItNow provides three role-based experiences.

## Customer

Customers can:

* Browse available services
* Discover technicians
* View technician profiles
* Select available time slots
* Create bookings
* Complete payments through Stripe Checkout
* Track booking history
* View payment records
* Submit reviews after completed services

---

## Technician

Technicians can:

* Manage profiles
* Create and update services
* Manage availability slots
* View booking requests
* Accept or decline bookings
* Start and complete services

---

## Admin

Administrators can:

* Manage users
* Manage service categories
* Monitor bookings
* View platform statistics
* Moderate user activity

---

# API Documentation

This frontend communicates with the FixItNow backend through REST APIs.

## Resources

* Backend Repository: https://github.com/mdashraful24/L2B7-Assignment-4
* API Integration Guide: [API_INTEGRATION.md](./API_INTEGRATION.md)
* Postman Documentation:
  https://documenter.getpostman.com/view/54687734/2sBY4LQMTR
* Production API:
  https://fixitnow-blush.vercel.app

## Covered Endpoints

* Authentication
* Users
* Technicians
* Services
* Categories
* Availability Slots
* Bookings
* Payments
* Reviews
* Admin Operations

Detailed request payloads, responses, authentication flow, and frontend integration details are documented in:

```
API_INTEGRATION.md
```

---

# Tech Stack

## Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS 4
* Shadcn UI
* Radix UI
* Sonner
* Lucide React
* Phosphor Icons

---

## Backend Integration

The frontend integrates with a backend built using:

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Stripe Payment Gateway

---

## Validation & Application Logic

* Zod
* Next.js Server Actions

---

## Authentication & Security

* JWT authentication
* Role-based authorization
* Middleware route protection

---

## Payment

* Stripe Checkout

---

## Key Features

### Public Experience

* Service browsing and filtering
* Technician discovery
* Technician profile pages
* Ratings and reviews
* Responsive design
* Loading and empty states

### Customer Experience

* Secure registration and login
* Service booking workflow
* Slot selection
* Booking management
* Stripe payment processing
* Booking history
* Payment history
* Review submission

### Technician Experience

* Profile management
* Service management
* Availability scheduling
* Booking request management
* Booking status updates

### Admin Experience

* User management
* Category management
* Booking oversight
* Platform analytics
* Administrative moderation tools

---

## Role Permission Matrix

| Feature             | Customer | Technician | Admin |
| ------------------- | -------- | ---------- | ----- |
| Browse Services     | ✅        | ✅          | ✅     |
| View Technicians    | ✅        | ✅          | ✅     |
| Create Booking      | ✅        | ❌          | ❌     |
| Make Payments       | ✅        | ❌          | ❌     |
| Submit Reviews      | ✅        | ❌          | ❌     |
| Manage Availability | ❌        | ✅          | ❌     |
| Accept Bookings     | ❌        | ✅          | ❌     |
| Complete Services   | ❌        | ✅          | ❌     |
| Manage Users        | ❌        | ❌          | ✅     |
| Manage Categories   | ❌        | ❌          | ✅     |
| View Platform Data  | ❌        | ❌          | ✅     |

---

## Technical Decisions

### Next.js App Router

App Router was selected to leverage server components, improved routing patterns, and enhanced performance.

### Server Actions

Server Actions simplify data mutations while reducing client-side complexity.

### Zod Validation

Zod ensures consistent validation and type safety across forms and server actions.

### Middleware Authorization

Middleware protects routes before rendering, preventing unauthorized dashboard access.

### Stripe Checkout

Stripe Checkout provides secure, PCI-compliant payment processing and simplifies payment workflows.

---

## Security Features

* JWT-based authentication
* Role-based authorization
* Protected routes using middleware
* Server-side validation
* Ownership verification for bookings
* Secure payment redirection through Stripe Checkout
* Protected dashboard experiences
* API request validation

---

## Performance & User Experience

* Mobile-first responsive design
* Optimized component rendering
* Loading skeletons
* Error boundaries
* Empty-state handling
* Toast notifications
* Server-side rendering where appropriate
* Fast page transitions
* Accessible UI components

---

## Requirement Coverage

This project satisfies the assignment requirements:

* API integration documented in `API_INTEGRATION.md`
* Zod-powered validation
* Structured form error handling
* Protected routes and role-based authorization
* Stripe Checkout integration
* Payment success and cancellation flows
* Server Actions implementation
* Responsive user interface
* Error handling and fallback states

---

## Dependencies

### Runtime Dependencies

```bash
next
react
react-dom
zod
sonner
lucide-react
@phosphor-icons/react
next-themes
class-variance-authority
clsx
tailwind-merge
radix-ui
jsonwebtoken
```

### Development Dependencies

```bash
typescript
eslint
eslint-config-next
tailwindcss
@tailwindcss/postcss
@types/node
@types/react
@types/react-dom
@types/jsonwebtoken
```

---

## Backend Integration

The frontend communicates with the companion backend API.

### Backend Repository

fixitnow-backend

### API Base URL

```text
https://fixitnow-blush.vercel.app
```

### API Usage

The frontend consumes backend APIs for:

* Authentication
* Services
* Technicians
* Availability slots
* Bookings
* Reviews
* Payments
* Categories
* Administrative operations

---

## Local Development Setup

### Prerequisites

* Node.js 18+
* npm, pnpm, or yarn
* Running FixItNow backend

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
BACKEND_API_URL=https://fixitnow-blush.vercel.app
NEXT_PUBLIC_BACKEND_API_URL=https://fixitnow-blush.vercel.app

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

MIN_BUFFER_MINUTES=30
TIME_INTERVAL_MINUTES=30
NEXT_PUBLIC_MIN_BUFFER_MINUTES=30
NEXT_PUBLIC_TIME_INTERVAL_MINUTES=30

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Important Routes

### Public Routes

```text
/
/services
/technicians/[id]
/auth/login
/auth/register
```

### Customer Routes

```text
/dashboard/customer
/dashboard/customer/bookings/[id]/pay
/payment/success
/payment/cancel
```

### Technician Routes

```text
/dashboard/technician
```

### Admin Routes

```text
/dashboard/admin
```

---

## Deployment

### Production Infrastructure

| Service  | Provider      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Vercel        |
| Database | PostgreSQL    |
| ORM      | Prisma ORM    |
| Payments | Stripe        |

### Production URLs

Frontend:
https://fixitnow-frontend-six.vercel.app

Backend:
https://fixitnow-blush.vercel.app

---

## Key Achievements

* Developed a complete role-based marketplace platform.
* Implemented secure Stripe payment workflows.
* Built protected dashboards for three distinct user roles.
* Integrated a production-ready backend API.
* Designed responsive interfaces using modern Next.js architecture.
* Implemented booking lifecycle management with real-time status updates.
* Applied secure authentication and authorization practices.

---

## Future Enhancements

* Real-time booking notifications
* In-app messaging system
* Advanced analytics dashboard
* Technician verification workflow
* Service recommendations
* Multi-language support
* Push notifications
* Mobile application support

---

## Notes

* Route protection is handled through middleware (`proxy.ts`).
* Booking ownership rules are enforced by the backend.
* Payment processing uses Stripe Checkout redirection flows.
* The frontend follows a role-based architecture for Customers, Technicians, and Admins.

---

## License

This project was developed for educational and portfolio purposes.
