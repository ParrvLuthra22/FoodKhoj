# FoodKhoj

A modern food discovery and ordering web app with a clean, responsive UI. Browse restaurants, add items to cart, checkout securely, and track orders. Built with a minimalist, premium design system.

## Key Features

- Fast, responsive UI with mobile-first layout
- Clean navigation with scroll-to-top on route change
- Auth modal (Sign In/Sign Up), user menu, and protected actions
- Cart sidebar with item count badge and checkout
- Checkout flow with professional “Payment Successful” screen
  - Track order
  - Download receipt (HTML)
  - Email receipt (prefilled in system mail app)
- Order tracking page
- Accessible components and sensible keyboard interactions

## Tech Stack

- React 18, React Router v6+
- Tailwind CSS (utility-first styling)
- Icons: lucide-react (clean, modern icons)
- State via React hooks and custom contexts (useAuth, useCart)
- Optional: Firebase/Auth or your backend for auth, orders, and payments
- Bundler: Vite (or CRA; check package.json scripts)

## Project Structure

```
/src
  /components
    /layout
      NavBar.jsx
    /auth
      AuthModal.jsx
    /cart
      CartSidebar.jsx
    /payment
      PaymentSuccess.jsx
  /context
    useAuth.js
    useCart.js
  /pages
    Home.jsx
    Restaurants.jsx
    CheckoutPage.jsx
    TrackOrder.jsx
    About.jsx
    Services.jsx
    Blog.jsx
  /utils
    receipt.js
  App.jsx
  main.jsx
  index.css
```

## Getting Started

Prerequisites
- Node.js >= 18
- npm, pnpm, or yarn

Installation
1) Clone and install
```
git clone <repo-url> foodkhoj
cd foodkhoj
npm install
```

2) Environment variables (create .env.local at project root)
```
# API
VITE_API_BASE_URL=http://localhost:4000

# Auth (example: Firebase – optional if you use another backend)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=

# Payments (set keys for your provider, e.g., Stripe/Razorpay)
VITE_PAYMENT_PUBLIC_KEY=
```

3) Run locally
- If Vite (most common):
```
npm run dev
```
- If CRA:
```
npm start
```

4) Production build
```
npm run build
# If Vite:
npm run preview
```

## Core Configuration

- Routing: App.jsx uses React Router. Add/edit routes there.
- Theme & Fonts: Tailwind configured in tailwind.config.js. For premium typography, add Inter (or Poppins) via index.html or your CSS and set as the base font.
- Auth: Wrap the app with useAuth provider (configure Firebase or your auth backend).
- Cart: useCart provider exposes getTotalItems and cart actions.

## “Payment Successful” Screen

Component: src/components/payment/PaymentSuccess.jsx

Props
- isVisible: boolean to show/hide modal
- onClose: function to close modal
- paymentData: object with payment status/meta (id, method, amount, time)
- orderData: object with order details (orderId, items, totals, address, customerEmail)
- onTrackOrder: callback to navigate to tracking
- onDownloadReceipt: optional override for custom download
- className: custom styles

Actions
- Track Order: calls onTrackOrder
- Download Receipt: generates a clean HTML receipt and triggers download
- Email Receipt: opens default mail app with subject/body prefilled

Receipt utilities: src/utils/receipt.js
- generateReceiptHtml(orderData, paymentData)
- downloadReceiptHtml(html, filename)
- buildEmailContent(orderData, paymentData)
- openEmailClient({ to, subject, body })

## Design System (summary)

- Palette: indigo (primary), slate (text/surfaces), subtle accents; avoids loud greens
- Typography: Inter (headings 600–700; body 400–500)
- Layout: spacious cards, consistent paddings, divide-y sections for grouping
- Icons: CheckCircle, MapPin, Clock, Download, Mail, ArrowRight from lucide-react
- Motion: subtle fade/slide; no distracting effects

## Scripts (check package.json)

- Dev: npm run dev (Vite) or npm start (CRA)
- Build: npm run build
- Preview: npm run preview (Vite)
- Test: npm test (if configured)

## Testing

- Recommended: Jest + React Testing Library
- Example: test rendering of PaymentSuccess with actions visible when isVisible=true

## Deployment

- Vercel/Netlify recommended
- Add your .env production keys in the platform dashboard
- Ensure correct base path and SPA fallback (serve index.html for unknown routes)

## Troubleshooting

- Download/Email receipt not working:
  - Ensure orderData and paymentData contain required fields (orderId, amount, timestamp)
  - Pop-up blockers can prevent download; try a user-initiated click
- Auth modal not opening:
  - Verify provider initialization and that useAuth is wrapped at the app root
- Styles look off:
  - Confirm Tailwind is configured and index.css imports Tailwind directives

## Contributing

1) Fork and create a feature branch
2) Commit with clear messages
3) Open a PR with context and screenshots for UI changes

## License

MIT. See LICENSE for details.

## Acknowledgements

- Icons by lucide.dev
- Tailwind CSS
- React community
