# Anime Search App

A modern, responsive anime search application built with React, TypeScript, and Redux. 

Search, filter, and explore anime using the Jikan API.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The app will run on `http://localhost:4000`

## 📋 Core Requirements Fulfilled

- ✅ **React 18+** with hooks only (no class components)
- ✅ **TypeScript** throughout the application
- ✅ **react-router-dom** for navigation between search and detail pages
- ✅ **Redux Toolkit** for state management
- ✅ **Server-side pagination** with 20 items per page
- ✅ **Instant search with 250ms debouncing** and in-flight request cancellation
- ✅ **Single Page Application** (Vite + React, no Next.js)
- ✅ **Port 4000** configuration
- ✅ **No environment variables** 

## 🌟 Bonus Features Implemented

### User Experience Enhancements
- **Skeleton Loaders** - Smooth loading states during data fetching
- **Empty State Handling** - Helpful messaging when no results are found
- **Mobile Responsive Design** - Optimized for all screen sizes
- **Creative UI** - Smooth animations, transitions, and hover effects
- **Search Suggestions** - Quick access to popular anime titles
- **Anime Recommendations** - Related anime suggestions on detail pages

### Advanced Features
- **Comprehensive Filtering & Sorting**:
  - **Type Filter**: TV, Movie, OVA, Special, ONA, Music, CM, PV, TV Special
  - **Rating Filter**: G, PG, PG-13, R-17+, R+, Rx
  - **Order By**: MAL ID, Title, Start Date, End Date, Episodes, Score, Scored By, Rank, Popularity, Members, Favorites
  - **Sort Direction**: Ascending or Descending
- **Error Handling** - Network failures and API error handling
- **Race Condition Prevention** - AbortController cancels outdated requests

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **React Router v7** for navigation
- **Tailwind CSS v4** for styling
- **Radix UI** components
- **Axios** for API calls
- **Vite** as build tool
- **Jikan API v4** for anime data

## 📱 Features

### Search Page
- Instant search with debouncing
- Advanced filters (type, rating, sort options)
- Server-side pagination
- Results counter
- Responsive grid layout

### Detail Page
- Comprehensive anime information
- Embedded YouTube trailers
- Genres, themes, and demographics
- Production details (studios, producers)
- Streaming platform links
- Theme songs (openings/endings)
- Related anime recommendations

## 🌐 Live Demo

[Live Demo Link Netlify](https://animeskj.netlify.app/)

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # SearchPage & AnimeDetailPage
├── store/          # Redux slices and hooks
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 📝 Notes

- Uses npm package manager only
- No environment variables required
- API calls are automatically debounced and cancelable
- All TypeScript types properly defined