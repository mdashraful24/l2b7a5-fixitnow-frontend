# FixItNow Frontend

**FixItNow** is a modern Next.js frontend for a home services marketplace. Customers can browse services, view technician profiles, choose time slots, book appointments, and complete payment through Stripe Checkout. Technicians manage their availability and bookings through protected dashboards, while admins can oversee users, bookings, and categories through role-based admin pages.

This frontend is built to work with the companion backend in `fixitnow-backend` and follows the mandatory requirements, including API integration, protected routes, validation, and payment redirects.

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=1d5jTMB4bT40idwTtkWgun0Cg-gLXIru9" alt="FixItNow" />
</div>

## Overview

FixItNow delivers three role-based experiences:

- Customers browse services, book slots, pay for accepted bookings, review completed jobs, and manage booking history.
- Technicians manage their profile, services, availability slots, and incoming bookings.
- Admins manage users, categories, and platform-wide booking data.

The app uses Next.js App Router, server actions, middleware-based authentication, and Stripe Checkout redirect flows for a secure booking experience.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI / Radix UI primitives
- Zod for validation
- Next.js Server Actions
- Next.js Middleware / proxy route protection
- Stripe Checkout integration
- Sonner for toast notifications
- Lucide React and Phosphor Icons

## Main Features

### Public Experience

- Service browsing with filters and service/technician discovery.
- Technician profile pages with ratings, services, reviews, and booking entry points.
- Responsive UI with loading and empty states.

### Customer Experience

- Role-based login and registration flows.
- Booking flow with slot selection and booking summaries.
- Booking detail page with payment, cancel, and edit actions.
- Stripe payment handoff with `/payment/success` and `/payment/cancel` return pages.
- Booking history, payment history, and review submission after completion.

### Technician Experience

- Technician dashboard and profile management.
- Availability scheduling and time-slot management.
- Booking management actions such as accept, decline, start, and complete.

### Admin Experience

- Admin dashboard and user statistics.
- User moderation actions.
- Booking and category management screens.

## Requirement Coverage

This project is aligned with the mandatory requirements from the assignment docs:

- API integration is documented in [API_INTEGRATION.md](API_INTEGRATION.md).
- Form and action validation uses Zod-powered checks and structured UI feedback.
- Error handling uses toast messages, route guards, and empty-state fallbacks.
- Stripe Checkout is integrated for the customer payment flow with success and cancel pages.
- Routes are protected by the Next.js proxy middleware based on authentication and role.

## Dependencies

Main runtime dependencies used in this frontend:

- `next`
- `react`
- `react-dom`
- `zod`
- `sonner`
- `lucide-react`
- `@phosphor-icons/react`
- `next-themes`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `radix-ui`
- `jsonwebtoken`

Main development dependencies:

- `typescript`
- `eslint`
- `eslint-config-next`
- `tailwindcss`
- `@tailwindcss/postcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@types/jsonwebtoken`

## Backend Integration

This frontend consumes the deployed FixItNow backend API from the companion project.

- Backend source: `fixitnow-backend`
- API integration guide: [API_INTEGRATION.md](API_INTEGRATION.md)
- API base URL: `https://fixitnow-blush.vercel.app`

The frontend uses server actions and fetch calls to communicate with the backend for:

- authentication
- services and technicians
- bookings and slot availability
- payment creation and confirmation
- reviews and admin actions

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm, pnpm, or yarn
- A running FixItNow backend API

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with the values below:

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

### Run the App

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Important Routes

- `/` - Home page
- `/services` - Browse services
- `/technicians/[id]` - Technician profile
- `/auth/login` - Login page
- `/auth/register` - Register page
- `/dashboard/customer` - Customer dashboard
- `/dashboard/customer/bookings/[id]/pay` - Payment initiation page
- `/payment/success` - Stripe success redirect page
- `/payment/cancel` - Stripe cancel redirect page
- `/dashboard/technician` - Technician dashboard
- `/dashboard/admin` - Admin dashboard

## Live Links

- Frontend app: https://fixitnow-frontend-six.vercel.app
- Backend API: https://fixitnow-blush.vercel.app
- API documentation: https://documenter.getpostman.com/view/54687734/2sBY4LQMTR
- API integration file: [API_INTEGRATION.md](API_INTEGRATION.md)

## Default Admin Credentials

A default admin account is created automatically on startup if none exists.

- Email: `admin@fixitnow.com`
- Password: `admin123` 

## Notes

- The app uses role-based route protection through `proxy.ts`.
- The booking and payment flows are designed around the backend booking ownership rules.
- If you add a production deployment for this frontend, replace the frontend live link above with the deployed URL.
