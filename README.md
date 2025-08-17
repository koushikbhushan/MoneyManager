
# MoneyManager

## Environment Variables

Before running the backend, you must set the following environment variables in your shell or system environment:

- `MONGODB_URI` — MongoDB connection string (e.g. from MongoDB Atlas)
- `JWT_SECRET` — Secret key for JWT authentication
- `PORT` — (optional) Port for the backend server (default: 5000)

Example (macOS/Linux):
```bash
export MONGODB_URI='your-mongodb-uri'
export JWT_SECRET='your-secret'
export PORT=5000
npm run dev
```
Or in one line:
```bash
MONGODB_URI='your-mongodb-uri' JWT_SECRET='your-secret' PORT=5000 npm run dev
```

## .env File (Optional)
You may use a `.env` file for local development, but **do not commit it**. The project `.gitignore` already excludes `.env` files by default.

## .env.example
A `.env.example` file is provided to show the required variables. Copy and fill it as needed for your local setup.

---


---

## Running the Application

### 1. Backend (API Server)

Open a terminal and run the following commands:

```bash
cd backend
# Install dependencies (first time only)
npm install
# Start in development mode (auto-reloads on changes)
npm run dev
# Or build and run in production mode:
npm run build
npm start
```

The backend will start on `http://localhost:5000` by default.

### 2. Frontend (React Native/Expo App)

Open a new terminal in the project root and run:

```bash
# Install dependencies (first time only)
npm install
# Start the Expo app (choose platform in Expo UI)
npm start
# Or run directly on a device/emulator:
npm run android   # for Android
npm run ios       # for iOS
npm run web       # for Web
```

The Expo Dev Tools UI will open in your browser. Follow the instructions to run on your device, simulator, or web browser.

---

**Tip:** Ensure your backend is running before using the app, so the frontend can connect to the API.
