# Astra Commerce Suite

Astra Commerce Suite is a full-stack, multi-page ecommerce platform featuring a premium animated UI, 17 custom pages, modular components, theme switching, authentication (user/admin/developer), order management, wishlist engine, blog module, upload system, and integrated payments (Stripe/PayPal).  
Built for performance, extensibility, and modern UX standards.

---

## 🚀 Features

- 17 Fully Responsive Pages  
- Dynamic Product Catalog  
- Product Filtering + Live Search  
- Cart System with Quantity Control  
- Checkout Flow with Order Engine  
- Promo Code Discounts  
- Wishlist System  
- User / Admin / Developer Authentication  
- Profile Management  
- Blog Module  
- Theme Switching (Light / Dark / Neon)  
- Reusable Components (Header, Footer, Cards, Widgets, Modals)  
- File Upload System (Images)  
- Stripe / PayPal / Mock Payment Gateways  
- REST API with Modular Routes  
- In-Memory Database Models (easily upgradeable)  
- Cloudinary Integration Option  
- PM2 + NGINX Deployment Ready  
- Vite + Tailwind + Storybook Support  

---

## 📂 Project Structure

```plaintext
astra-ecommerce-system/
├─ client/
│  ├─ pages/
│  ├─ components/
│  ├─ css/
│  ├─ js/
│  └─ assets/
├─ server/
│  ├─ routes/
│  ├─ controllers/
│  ├─ models/
│  ├─ middleware/
│  ├─ config/
│  └─ utils/
├─ integrations/
├─ dev-tools/
├─ docs/
└─ ops/
------------------------------------------------------------

## FEATURES

• 17 fully responsive multi-page frontend screens  
• Advanced animated UI components  
• Rich product catalog with filters, sorting, and live search  
• Shopping cart with add/remove/update quantity  
• Checkout flow with shipping + promo codes  
• Order confirmation, order history  
• Wishlist system  
• Multi-role authentication (User, Admin, Developer)  
• Profile management  
• Blog system  
• File upload engine  
• Stripe, PayPal, and mock payments  
• Theme switching (Light / Dark / Neon)  
• Modular components (header, footer, product card, modals, widgets)  
• REST API (Node.js + Express)  
• In-memory models (database-ready)  
• Cloudinary integration ready  
• PM2 + NGINX production deployment  
• Dev tools: Vite, Tailwind, Storybook

------------------------------------------------------------

## INSTALLATION

```bash
npm install
```

------------------------------------------------------------

## ENVIRONMENT SETUP

Create a `.env` file with:

```
PORT=4000
STRIPE_SECRET=sk_test_12345
PAYPAL_CLIENT=
PAYPAL_SECRET=
CLOUDINARY_CLOUD=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
JWT_SECRET=astra_jwt_secret
```

------------------------------------------------------------

## RUNNING THE SERVER

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

------------------------------------------------------------

## OPEN IN BROWSER

```
http://localhost:4000
```

------------------------------------------------------------

## DEMO LOGIN ACCOUNTS

```
Admin:
email: admin@example.com
password: admin123

Developer:
email: dev@example.com
password: dev123

User:
any email + any password
```

------------------------------------------------------------

## API ENDPOINTS

```
/api/auth
/api/register
/api/products
/api/cart
/api/orders
/api/profile
/api/blog
/api/wishlist
/api/uploads
/api/admin
/api/developer
/api/confirmation
```

Full API documentation: `docs/api-spec.md`

------------------------------------------------------------

## UX GUIDELINES

`docs/ux-style-guidelines.md`

------------------------------------------------------------

## FRONTEND BUILD

```bash
npm run build
```

Output directory: `/dist`

------------------------------------------------------------

## DEPLOYMENT FILES

PM2 configuration: `ops/pm2.config.js`  
NGINX configuration: `ops/nginx.conf`

------------------------------------------------------------

## DEVELOPER TOOLS

`vite.config.js`  
`tailwind.config.js`  
`storybook.config.js`

------------------------------------------------------------

## LICENSE

MIT License (see LICENSE file)

------------------------------------------------------------

## AUTHOR

Shahriyarrr — 2025  
Astra Commerce Suite
