# CMS Frontend

Modern, responsive content management system frontend built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (Login/Register)
- Browse and search articles
- Category filtering
- Responsive design
- Protected dashboard routes
- Article management
- Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Vite

## Installation

```bash
# Install dependencies
npm install

# Create environment file
# Copy env.example.txt to .env and update the API URL if needed
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

## Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable components
├── context/       # React context (Auth)
├── pages/         # Page components
├── types/         # TypeScript interfaces
├── utils/         # Utility functions
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/articles` - Articles list
- `/articles/:slug` - Article detail
- `/categories` - Categories list
- `/dashboard` - User dashboard (protected)

## API Integration

The frontend connects to the backend API running on `http://localhost:5000/api` by default. Make sure the backend server is running before starting the frontend.

## Default Credentials

After setting up the backend with the sample database, you can use:

- Email: admin@example.com
- Password: admin123
