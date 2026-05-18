# Log Monitor

Log Monitor is a full-stack app for browsing and reading `.txt` log files from a configured server folder.

## Stack

- **Backend:** Slim 4 (PHP)
- **Frontend:** React + TypeScript + Vite

## Project Structure

```text
.
├── backend/   # Slim API
└── frontend/  # React app
```

## Prerequisites

- [PHP](https://www.php.net/) 8.2+
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) 18+
- npm

## Backend Setup (`backend/`)

1. Install dependencies:
   ```bash
   cd backend
   composer install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Configure `.env`:
   - `LOG_FOLDER`: absolute path to the folder containing `.txt` log files
   - `FRONTEND_URL`: frontend origin for CORS (example: `http://localhost:5173`)
4. Start the API server:
   ```bash
   composer start
   ```

Backend runs on `http://localhost:8080` by default.

### Backend API

- `GET /api/logs` - list available log files
- `GET /api/logs/{fileName}` - get content for a specific file

## Frontend Setup (`frontend/`)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Confirm API URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173` by default.

## Frontend Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run format` - format TypeScript/TSX files with Prettier
- `npm run typecheck` - run TypeScript checks without emitting output
- `npm run preview` - preview production build locally
