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

For more details, see the backend setup section in this README or ask for help.
