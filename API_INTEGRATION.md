# FixItNow API Integration

This frontend consumes the backend service in `fixitnow-backend`. The table below maps the actual frontend pages, components, and server actions to the backend endpoints they call.

## Public Pages

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(publicGroup)/page.tsx` and `app/(publicGroup)/_actions/allServices.ts` | `GET /api/services` |
| `app/(publicGroup)/services/page.tsx` | `GET /api/services`, `GET /api/categories` |
| `app/(publicGroup)/_actions/allCategories.ts` | `GET /api/categories` |
| `app/(publicGroup)/_actions/getTechnician.ts` | `GET /api/technicians/:id` |
| `app/(publicGroup)/technicians/[id]/page.tsx` | `GET /api/technicians/:id` |
| `app/(publicGroup)/booking/page.tsx` and `BookingWrapper` | `GET /api/services/:id`, `GET /api/technicians/:id` |

## Authentication

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(authGroup)/_actions/authActions.ts` login form | `POST /api/auth/login` |
| `app/(authGroup)/_actions/authActions.ts` register form | `POST /api/auth/register` |
| Protected layouts, dashboards, and profile reads | `GET /api/auth/me` |
| Session refresh utilities in `services/refreshToken.ts` | `POST /api/auth/refresh-token` |

## Customer Flow

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(publicGroup)/_components/bookingInfo/BookingFormDialog.tsx` | `POST /api/bookings` |
| `app/(dashboardGroup)/_actions/getBookings.ts` | `GET /api/bookings`, `GET /api/bookings/:id` |
| `app/(dashboardGroup)/dashboard/customer/page.tsx` | `GET /api/bookings` |
| `app/(dashboardGroup)/dashboard/customer/bookings/page.tsx` | `GET /api/bookings` |
| `app/(dashboardGroup)/dashboard/customer/bookings/[id]/page.tsx` | `GET /api/bookings/:id` |
| `app/(dashboardGroup)/dashboard/customer/_components/EditBookingModal.tsx` | `GET /api/technicians/:id/availability?date=...`, `GET /api/availability-slots/:slotId`, `PATCH /api/bookings/:id` |
| `app/(dashboardGroup)/_actions/cancelBooking.ts` and cancel button UI | `PATCH /api/bookings/status/:bookingId` |
| `app/(dashboardGroup)/_actions/customer.ts` payment actions | `POST /api/payments/create`, `POST /api/payments/confirm`, `GET /api/payments`, `GET /api/payments/:paymentId` |
| `app/(dashboardGroup)/dashboard/customer/_components/payment/PaymentHistory.tsx` | `GET /api/payments` |
| `app/(dashboardGroup)/dashboard/customer/bookings/[id]/pay/page.tsx` | `GET /api/bookings/:id` and `POST /api/payments/create` |
| `app/(dashboardGroup)/dashboard/customer/bookings/[id]/payment-details/page.tsx` | `GET /api/bookings/:id` and `GET /api/payments/:paymentId` |
| `app/payment/success/PaymentSuccessContent.tsx` | `POST /api/payments/confirm`, `GET /api/bookings/:id` |
| `app/payment/cancel/page.tsx` | `GET /api/bookings/:id` |
| `review` forms and dialogs | `POST /api/reviews`, `PATCH /api/reviews/:reviewId` |

## Technician Flow

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(dashboardGroup)/_actions/technician.ts` dashboard and booking lists | `GET /api/technicians/bookings` |
| `app/(dashboardGroup)/dashboard/technician/page.tsx` | `GET /api/auth/me`, `GET /api/technicians/bookings` |
| `app/(dashboardGroup)/dashboard/technician/layout.tsx` and profile screens | `GET /api/auth/me` |
| `app/(dashboardGroup)/_actions/technician.ts` profile actions | `PUT /api/technicians/profile` |
| `app/(dashboardGroup)/_actions/technician.ts` availability actions | `POST /api/technicians/availability`, `PUT /api/technicians/availability` |
| `app/(dashboardGroup)/dashboard/technician/availability/page.tsx` | `GET /api/auth/me`, `GET /api/technicians/:id`, `POST /api/technicians/availability`, `PUT /api/technicians/availability` |
| `app/(dashboardGroup)/dashboard/technician/bookings/page.tsx` and `[id]/page.tsx` | `GET /api/technicians/bookings` |
| `app/(dashboardGroup)/_actions/technician.ts` booking status actions | `PATCH /api/technicians/bookings/:id` |
| `app/(dashboardGroup)/dashboard/technician/_components/techService/*` and service actions | `GET /api/services`, `GET /api/services/my-services`, `GET /api/services/:serviceId`, `POST /api/services`, `PATCH /api/services/:serviceId`, `DELETE /api/services/:serviceId` |

## Admin Flow

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(dashboardGroup)/_actions/admin.ts` users list | `GET /api/admin/users` |
| `app/(dashboardGroup)/_actions/admin.ts` user stats | `GET /api/admin/users/stats` |
| `app/(dashboardGroup)/_actions/admin.ts` user detail and status update | `GET /api/admin/users/:id`, `PATCH /api/admin/users/:id` |
| `app/(dashboardGroup)/dashboard/admin/page.tsx` | `GET /api/admin/users/stats`, `GET /api/admin/bookings` |
| `app/(dashboardGroup)/dashboard/admin/_components/bookings/BookingList.tsx` | `GET /api/admin/bookings` |
| `app/(dashboardGroup)/_actions/admin.ts` category management | `GET /api/admin/categories`, `POST /api/admin/categories`, `PATCH /api/admin/categories/:id`, `DELETE /api/admin/categories/:id` |

## Payment Flow

| Frontend surface | Backend endpoint(s) |
|---|---|
| `app/(dashboardGroup)/dashboard/customer/bookings/[id]/pay/page.tsx` | `GET /api/bookings/:id`, `POST /api/payments/create` |
| `app/payment/success/page.tsx` and `PaymentSuccessContent.tsx` | `POST /api/payments/confirm` |
| `app/payment/cancel/page.tsx` | `GET /api/bookings/:id` |

## Notes

- All authenticated requests send the access token cookie through server actions.
- The frontend uses Next.js middleware/proxy protection for auth and role-based routing.
- The backend base URL is configured through `BACKEND_API_URL` and `NEXT_PUBLIC_BACKEND_API_URL`.
