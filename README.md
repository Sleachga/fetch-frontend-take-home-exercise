# Sanford's Strays 🐕

A delightful web application for finding and favoriting adoptable dogs, built with React and TypeScript. Made with ❤️ for Fetch.

## Features

- **Dog Search**: Browse through a curated list of adoptable dogs
- **Filtering**: Filter dogs by breed and location
- **Sorting**: Sort dogs by age, breed, or name
- **Favorites**: Save your favorite dogs for later
- **Match Making**: Get matched with a dog based on your favorites
- **Authentication**: Secure login system
- **Responsive Design**: Works great on both desktop and mobile

## Tech Stack

- React 18
- TypeScript
- Vite
- Radix UI for components
- Styled Components for styling
- React Router for navigation
- React Confetti for celebrations
- Masonic for responsive grid layouts

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/sanfords-strays.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Visit `http://localhost:5173` in your browser

## Project Structure

```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── assets/        # Static assets
└── App.tsx        # Root component
```

## API Integration

The app integrates with the Fetch API for:

- Dog search and filtering
- Location-based searches
- Dog matching algorithm
- Authentication
