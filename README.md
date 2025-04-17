Digital Menu – For Restaurants
A modern, QR-code accessible digital menu built with the MERN stack, initially tailored for restaurants. The app includes a mobile-friendly customer menu and a secure admin panel for full control over menu management.

📝 Overview
Digital Menu provides restaurants a simple way to display their menu to customers using their phones. With support for Ethiopian fasting options like ጾም (fasting) and ፍስክ (non-fasting), this system helps customers find the right dish fast—while giving restaurant owners full control through an intuitive admin dashboard.

🚀 Key Features
🧾 Customer View
Browse all currently available items.

Filter items by category:

ጾም (Fasting Food)

ፍስክ (Non-Fasting Food)

መጠጥ (Drinks)

Tap any item for details: image, description, price.

View notes like "Only available on weekends".

Optimized for mobile view.

Invalid/unknown URLs automatically redirect to the homepage.

🛠️ Admin Panel
Secure Login: Accessible via /login, secured with JWT and HttpOnly cookies.

Protected Routes: Only accessible to authenticated admins.

Dashboard Overview: Central place to manage everything.

🧆 Menu Management
Add/edit/delete menu items with:

Name, description, price, category, optional note

Image upload via Cloudinary

Toggle item availability:

"አለ" (Available) / "የለም" (Unavailable)

🔍 Search
Instantly filter menu items by name in the admin panel.

⚙️ Settings
Enable/disable daily auto-reset, which resets unavailable items to available at midnight (EAT).

👥 Admin Management
Register new admin accounts (only from within the admin panel).

🔁 Navigation
Easily return to the customer menu from admin pages.

🧱 Tech Stack
Frontend
React (Vite)

Zustand

React Router v6

Tailwind CSS

Axios

Headless UI

React Icons

Backend
Node.js

Express.js

Mongoose

MongoDB Atlas

JWT (Json Web Tokens)

bcryptjs

Cloudinary

Multer

node-cron

cookie-parser

cors

⚙️ Project Setup & Installation
1. Clone the Repository
bash
Copy
Edit
git clone <your-repository-url>
cd <your-folder-name>
2. Setup the Backend
bash
Copy
Edit
cd server
npm install
Create a .env file inside server/ (refer to .env.example if available).

Add the required environment variables (see below).

3. Setup the Frontend
bash
Copy
Edit
cd ../client
npm install
Create a .env file inside client/.

Add the required environment variables.

🔐 Environment Variables
server/.env
env
Copy
Edit
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_strong_jwt_secret
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN_DAYS=30
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173  # Replace with your frontend URL in production
NODE_ENV=development                # Change to 'production' on deployment
client/.env
env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5001/api  # Replace with your backend URL in production
⚠️ Do not commit .env files to version control!

🧪 Running the App Locally
Start Backend
bash
Copy
Edit
cd server
npm run dev
Runs on http://localhost:5001 (or the port you set in .env)

Start Frontend
bash
Copy
Edit
cd client
npm run dev
Opens the app at http://localhost:5173 (or the port Vite uses)

👤 Initial Admin Account Setup
Since registration is protected, the first admin must be manually created via a seed script.

Ensure your MongoDB URI is correctly set in server/.env.

Edit the server/seed.js file to set a strong admin password.

Run the script:

bash
Copy
Edit
cd server
node seed.js
Now you can log in via /login using the credentials defined in seed.js. After that, you can register more admins from the dashboard.
