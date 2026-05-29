# Log Monitor

Log Monitor is a full-stack application for managing, browsing, and reading log files. It provides a modern web interface for viewing, synchronizing, and organizing log files stored in a database.

## Stack

- **Backend:** Slim 4 (PHP) with MySQL
- **Frontend:** React 19 + TypeScript + Vite with TailwindCSS
- **State Management:** Zustand, TanStack React Query
- **Routing:** TanStack React Router

## Project Structure

```text
.
├── backend/   # Slim API
└── frontend/  # React app
```

## Prerequisites

- [PHP](https://www.php.net/) 8.2 or higher
- [Composer](https://getcomposer.org/) (latest)
- [Node.js](https://nodejs.org/) 18 or higher
- [MySQL](https://www.mysql.com/) 8 or [Docker](https://www.docker.com/)
- npm (included with Node.js)

## Database Setup

1. Using Docker Compose (recommended):

   ```bash
   docker-compose up -d
   ```

   This starts MySQL and phpMyAdmin on ports 3306 and 8080.

2. Or manually set up MySQL:
   - Create database `mydb`
   - Update `backend/.env` with your database credentials

3. Import database schema:
   ```bash
   mysql -u root -p mydb < backend/database/database.sql
   ```

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
   - `DB_HOST`: MySQL host (default: `127.0.0.1`)
   - `DB_USER`: MySQL user (default: `root`)
   - `DB_PASS`: MySQL password (default: `example`)
   - `DB_NAME`: Database name (default: `mydb`)
   - `DB_PORT`: MySQL port (default: `3306`)

4. Start the API server:
   ```bash
   composer start
   ```

Backend API runs on `http://localhost:3000` by default.

### Available Endpoints

- `GET /api/logs` - List all log files
- `POST /api/logs` - Add log files manually
- `POST /api/logs/sync` - Sync log files from configured directory
- `GET /api/logs/{logId}` - Get log file details and content
- `PATCH /api/logs/{logId}` - Update log file information
- `GET /api/settings` - Get application settings
- `PATCH /api/settings` - Update application settings

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
3. Configure API URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173` by default.

## Frontend Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Type-check and build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format TypeScript/TSX files with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run preview` - Preview production build locally

## Running Both Services

1. Start MySQL:

   ```bash
   docker-compose up -d
   ```

2. In one terminal, start the backend:

   ```bash
   cd backend
   composer start
   ```

3. In another terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser
