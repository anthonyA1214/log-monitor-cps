# Log Monitor

This project contains two main applications: a Laravel backend and a React frontend.

## Prerequisites

- [PHP](https://www.php.net/) (>= 8.2)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (>= 18)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

---

## Backend (Laravel)

The backend is a Laravel application providing an API.

### Setup & Run

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   composer install
   ```
3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   *(Be sure to adjust your database credentials and other settings in the `.env` file)*
4. **Generate App Key:**
   ```bash
   php artisan key:generate
   ```
5. **Run Migrations:**
   ```bash
   php artisan migrate
   ```
6. **Start the local server:**
   ```bash
   php artisan serve
   ```
   By default, this will run on [http://localhost:8000](http://localhost:8000).

---

## Frontend (React + Vite)

The frontend is built with React, Vite, Tailwind CSS, and Shadcn UI components.

### Setup & Run

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   By default, this will run on [http://localhost:5173](http://localhost:5173).

### Available Scripts

- `npm run dev` - Starts the Vite dev server
- `npm run build` - Typechecks and builds the app for production
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code with Prettier
