# Digital Menu - Restaurant Pilot

A MERN stack web application providing a simple, QR-code accessible digital menu solution designed initially for Ethiopian restaurants in Adama. Includes a customer-facing menu and a comprehensive admin panel for management.

## Overview

This project provides restaurants with an easy way to offer customers a digital view of their menu via mobile devices. Customers can filter food items, including specific Ethiopian fasting options (ጾም/ፍስክ). Restaurant administrators have a secure panel to manage menu items, control daily availability, upload images via Cloudinary, manage settings like auto-reset, and add other administrators.

## Key Features

**Customer View:**

*   View currently available menu items.
*   Items categorized as ጾም (Fasting Food), ፍስክ (Non-Fasting Food), or መጠጥ (Drinks).
*   Filter menu by category or view all items.
*   Click on an item to view details (image, description, price).
*   View special availability notes set by the admin (e.g., "Only on weekends").
*   Responsive design optimized for mobile phones.
*   Direct access to invalid URLs redirects to the homepage.

**Admin Panel:**

*   **Secure Login:** Separate login page (`/login`) for administrators.
*   **Protected Routes:** Admin dashboard and actions are protected via JWT authentication (HttpOnly cookies).
*   **Dashboard Overview:** Central place for management actions.
*   **Menu Item Management:**
    *   Add new menu items (name, category, price, description, optional note, image upload).
    *   Edit existing item details.
    *   Permanently delete items.
    *   Upload item images directly (stored on Cloudinary).
*   **Availability Control:**
    *   View items based on current status: "አለ" (Available) or "የለም" (Unavailable).
    *   Toggle item availability with one click.
*   **Search:** Filter admin menu item list by name.
*   **Settings:**
    *   Enable/disable daily auto-reset feature (marks all "የለም" items back to "አለ" at midnight EAT).
*   **Admin Management:**
    *   Register additional admin accounts (only possible when logged in as an admin).
*   **Navigation:** Includes a "Back to Menu" link when viewing admin pages.

## Technology Stack

*   **Frontend:** React (Vite), Zustand, React Router v6, Tailwind CSS, Axios, Headless UI, React Icons
*   **Backend:** Node.js, Express.js, Mongoose, MongoDB Atlas, JSON Web Tokens (JWT), bcryptjs, Cloudinary, Multer, `node-cron`, `cookie-parser`, `cors`
*   **Database:** MongoDB
*   **Image Hosting:** Cloudinary

## Project Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd root folder name you want
    ```

2.  **Setup Backend:**
    *   `cd server`
    *   `npm install`
    *   Create a `.env` file in `server/` (use `.env.example` if provided, or create manually).
    *   Fill in the required environment variables (see below).

3.  **Setup Frontend:**
    *   `cd ../client`
    *   `npm install`
    *   Create a `.env` file in `client/`.
    *   Fill in the required environment variables (see below).

## Environment Variables

Create `.env` files in `server/` and `client/` directories. **Do not commit `.env` files to Git.**

**`server/.env`:**

```dotenv
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_strong_jwt_secret
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN_DAYS=30
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173 # For local dev; use Vercel URL for production variable on Render
NODE_ENV=development # Use 'production' for production variable on Render


client/.env:
VITE_API_BASE_URL=http://localhost:5001/api # For local dev; use Render URL for production variable on Vercel
Use code with caution.
Dotenv
Running Locally
Start Backend:
cd server
npm run dev
(Backend runs on port specified in .env or 5001)
Start Frontend:
Open a new terminal.
cd client
npm run dev
(Frontend runs on port specified by Vite, often 5173)
Access: Open http://localhost:5173 (or the Vite port) in your browser.
Initial Admin User Setup
The first admin account must be created manually using the seed script, as registration is protected.
Configure: Ensure MONGODB_URI in server/.env points to your target database. Set a strong password inside server/seed.js.
Run Script: From the server directory, execute:
node seed.js
