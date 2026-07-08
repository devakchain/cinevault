# CineVault

CineVault is a modern movie and TV discovery platform built with React, TypeScript, and modern frontend technologies.

The application provides users with a premium cinematic experience for discovering movies and TV shows, viewing detailed information, managing personal watchlists, saving favorites, and rating content.

The project focuses on clean architecture, responsive design, smooth user interactions, and scalable frontend development practices.

---

## Features

### Movie & TV Discovery

- Browse trending movies and TV shows
- Explore popular, top-rated, and upcoming content
- Search for movies and series
- View detailed information about titles

### Personal Content Management

- Add movies to a personal watchlist
- Mark movies as watched
- Save favorite movies
- Rate movies with a custom rating system

### Movie Details

- Detailed movie information
- Cast information
- Genres
- Ratings
- Runtime
- Trailers
- Recommended movies

### User Experience

- Responsive design for desktop, tablet, and mobile
- Smooth animations and transitions
- Modern dark cinematic interface
- Optimized loading states
- Interactive movie cards

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Zustand
- Framer Motion

### API

- TMDB API

### Development Tools

- Vite
- Git
- GitHub
- ESLint

---

## Project Structure

```
src
|
├── api
|   └── tmdb.ts
|
├── components
|   ├── Hero
|   ├── MovieCard
|   ├── MovieRow
|   ├── Navbar
|   └── CastCard
|
├── hooks
|
├── layouts
|
├── pages
|   ├── Home
|   ├── MovieDetails
|   ├── TVDetails
|   ├── Search
|   └── Profile
|
├── store
|
└── types
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/devakchain/cinevault.git
```

Navigate to the client directory:

```bash
cd cinevault/client
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

---

## Architecture

CineVault follows a component-based architecture with clear separation between:

- UI components
- Pages
- API services
- State management
- Custom hooks
- Shared types

The application uses React Query for server-state management and Zustand for client-side state management.

---

## Future Improvements

Planned improvements:

- Backend authentication system
- User accounts and profiles
- Database integration
- Social features
- AI-powered recommendations
- Advanced search and filtering
- Deployment pipeline

---

## Author

Shmuel Yitzhak

Full Stack Developer focused on building modern web applications with scalable architecture and high-quality user experiences.

---

## Status

Active development.
