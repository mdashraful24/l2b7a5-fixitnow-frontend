# FixItNow API Integration

This frontend talks to the backend service in `fixitnow-backend` through the endpoints below.

## Public Data

- Home and services pages use `GET /api/services`.
- Service filters use `GET /api/categories`.
- Technician browsing uses `GET /api/technicians`.
- Technician detail pages use `GET /api/technicians/:id`.

## Authentication

- Register uses `POST /api/auth/register`.
- Login uses `POST /api/auth/login`.
- Profile reads use `GET /api/auth/me`.

## Customer Flow

- Booking requests use `POST /api/bookings`.
- Customer booking history uses `GET /api/bookings`.
- Customer payment history uses `GET /api/payments`.
- Booking payment handoff uses `POST /api/payments/create`.
- Payment confirmation on the success page uses `POST /api/payments/confirm`.
- Review submission uses `POST /api/reviews`.

## Technician Flow

- `/dashboard/technician` uses `GET /api/auth/me`, `GET /api/technicians/:id`, and `GET /api/technicians/bookings` for dashboard stats and recent jobs.
- `/dashboard/technician/profile` uses `GET /api/auth/me`, `GET /api/technicians/:id`, and `PUT /api/technicians/profile`.
- `/dashboard/technician/availability` uses `GET /api/auth/me`, `GET /api/technicians/:id`, `POST /api/technicians/availability`, and `PUT /api/technicians/availability`.
- `/dashboard/technician/bookings` and `/dashboard/technician/bookings/[id]` use `GET /api/auth/me` and `GET /api/technicians/bookings`.
- Technician booking actions use `PATCH /api/technicians/bookings/:id`.

## Admin Flow

- Admin users list uses `GET /api/admin/users`.
- Admin bookings list uses `GET /api/admin/bookings`.
- Admin categories list uses `GET /api/admin/categories`.
- Category creation uses `POST /api/admin/categories`.
- Category updates use `PATCH /api/admin/categories/:id`.
- User status updates use `PATCH /api/admin/users/:id`.

## Payment

- Stripe Checkout is initiated from the customer payment page using the backend session URL returned by `POST /api/payments/create`.
- The success page confirms the payment with the backend and then routes the user back to the dashboard.
- The cancel page sends the user back to the dashboard or services page.
