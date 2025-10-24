# AI Prompts Documentation

This document tracks all AI assistance used during the development of the Anime Search App project.

---

## Project Setup & Planning

### Initial Project Structure
**Prompt:**
```
I need guidance on building an Anime Search App with React, TypeScript, Redux, and Tailwind CSS. 
I have just created an empty GitHub repo and cloned it. I'm not confident with having
no experience with Redux. Can you show me the steps and what I should be aware of?
```

**Context:** Understanding project requirements and setup steps  
**AI Tool:** GitHub Copilot  
**Outcome:** Received step-by-step guide for project initialization, folder structure, and technology stack setup

---

### Project Structure Clarification
**Prompt:**
```
Could you show me the completed project structure, and provide me a step-by-step guide that 
I can follow and refer to?
```

**Context:** Needed a clear roadmap for building the entire application  
**AI Tool:** GitHub Copilot  
**Outcome:** Received detailed folder structure and sequential development steps (1-19 steps covering setup to deployment)

---

## TypeScript Type Definitions

### Jikan API Type Interfaces
**Prompt:**
```
Please create the interfaces for me: [provided Jikan API response schema]
```

**Context:** Creating TypeScript interfaces for the Jikan API search endpoint response  
**AI Tool:** GitHub Copilot  
**Outcome:** Generated comprehensive TypeScript interfaces including:
- `AnimeImage`, `AnimeImages`
- `AnimeTrailer`, `AnimeTitle`
- `AnimeAired`, `AnimeBroadcast`
- `AnimeEntity` (for producers, studios, genres, etc.)
- `Anime` (main anime object)
- `AnimePagination`, `AnimePaginationItems`
- `AnimeSearchResponse`

---

### Full Anime Detail Types
**Prompt:**
```
Is this API to query a list of anime and comes with the pagination details? [provided getAnimeSearch API documentation]
```

**Context:** Understanding which Jikan API endpoint to use for search functionality  
**AI Tool:** GitHub Copilot  
**Outcome:** Confirmed the `/anime` endpoint with pagination support, extended types to include:
- `AnimeSearchParams`
- `AnimeRelation`, `AnimeTheme`
- `AnimeExternal`, `AnimeStreaming`
- `FullAnime` (extended from base Anime)
- `FullAnimeResponse`

---

### Recommendations API Types
**Prompt:**
```
[Discussing anime recommendations feature]
Please provide TypeScript types for the Jikan API endpoint /anime/{id}/recommendations
```

**Context:** Adding recommendations feature to detail page  
**AI Tool:** GitHub Copilot  
**Outcome:** Generated interfaces:
- `RecommendationImage`, `RecommendationImages`
- `RecommendationEntry`
- `AnimeRecommendation`
- `AnimeRecommendationsResponse`

---

## Redux State Management

### Learning Redux Toolkit
**Prompt:**
```
Please teach me the latest Redux, I have never used it before
```

**Context:** Needed to understand Redux Toolkit from scratch as I have Vue/Pinia experience  
**AI Tool:** GitHub Copilot  
**Outcome:** Received beginner-friendly explanation with:
- Core concepts (Store, Slice, Actions, Reducers, Dispatch, Selectors)
- Setup steps for Redux Toolkit
- Code examples for store configuration
- Comparison to Pinia (Vue state management) to help me understand

---

### Redux Store Configuration
**Prompt:**
```
Explain each file you provided, and try to relate to Pinia so that I can understand
```

**Context:** Understanding Redux architecture by comparing to familiar Vue/Pinia patterns  
**AI Tool:** GitHub Copilot  
**Outcome:** Learned:
- `store.ts` = Pinia's `createPinia()`
- `animeSlice.ts` = Pinia's `defineStore`
- `hooks.ts` = Pinia's `useStore()`
- How to use Redux hooks in components

---

### Store Organization
**Prompt:**
```
Is having an index.ts better? Rather than having store.ts that doesn't have exports?
```

**Context:** Learning best practices for Redux store organization  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented centralized `store/index.ts` for cleaner imports and better scalability

---

## Redux Implementation

### Async Thunks & API Integration
**Prompt:**
```
[Working through Redux slice implementation]
Help me implement searchAnime and fetchAnimeById with createAsyncThunk
```

**Context:** Implementing API calls with Redux Toolkit's async thunk pattern  
**AI Tool:** GitHub Copilot (inline suggestions + chat)  
**Outcome:** Created three async thunks in `animeSlice.ts`:
- `searchAnime` - with debouncing and AbortController support
- `fetchAnimeById` - fetching full anime details
- `fetchRecommendations` - fetching related anime

---

### State Management Actions
**Prompt:**
```
[Reviewing Redux reducers]
I need actions to handle filters, pagination, and clearing state
```

**Context:** Adding synchronous actions for UI state management  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented reducers:
- `setSearchQuery`, `setCurrentPage`
- `setFilter`, `resetFilters`
- `clearAnimeList`, `clearError`, `clearSelectedAnime`

---

## Component Development

### Detail Page Information Display
**Prompt:**
```
I need help displaying all the anime detail values in the detail page using shadcn and lucide react.
```

**Context:** Efficiently laying out comprehensive anime information on the detail page  
**AI Tool:** GitHub Copilot  
**Outcome:** Generated `AnimeDetailPage.tsx` with:
- Hero section with image and title
- Stats cards (score, rank, popularity, etc.)
- Synopsis and background sections
- Genres, themes, demographics badges
- Studios, producers, and licensors lists
- Broadcast and airing information
- Related anime relations
- Theme songs (openings/endings)
- Streaming platform links
- Proper loading and error states

---

### API Endpoint Selection
**Prompt:**
```
There's getAnimeSearch and getAnimeFullById APIs. Which one should we use (industry standard) 
to allow users to view the details of the anime after clicking it?
```

**Context:** Choosing the right API endpoint for detail page  
**AI Tool:** GitHub Copilot  
**Outcome:** Learned to use `/anime/{id}/full` endpoint for complete anime data in one request (industry standard approach)

---

### Navigation Implementation
**Prompt:**
```
Is it the industry standard to use this? [showing handleAnimeClick with console.log]
```

**Context:** Understanding proper React Router navigation patterns  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented proper navigation:
- Used React Router's `useNavigate()` hook
- Created dynamic routes (`/anime/:id`)
- Proper URL-based routing (not modal/drawer)

---

### Anime Recommendations Feature
**Prompt:**
```
Can you add anime recommendations to the detail page using the Jikan API 
/anime/{id}/recommendations endpoint?
```

**Context:** Enhancing detail page with related anime suggestions  
**AI Tool:** GitHub Copilot  
**Outcome:** Created `AnimeRecommendations.tsx` component with:
- Fetching recommendations via Redux thunk
- Responsive grid layout (2-6 columns)
- Clickable cards navigating to recommended anime
- Loading skeleton states
- Error handling
- Limited to 12 recommendations
- Smooth hover effects and lazy loading

Fix by Khai Jun: Had to change the use of fetch to axios, as the AI wasn't using the created axios jikanApi

---

## UI/UX Enhancements

### Filter Persistence
**Prompt:**
```
I need to save the filters show and hide state. What's the best approach?
```

**Context:** Persisting filter panel visibility across page refreshes  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented localStorage for filter visibility state in `FilterBar.tsx`:
- Saves visibility state to localStorage
- Restores state on component mount
- Used `FILTER_VISIBILITY_KEY` constant

---

### Search Bar Focus Management
**Prompt:**
```
How can I make sure when my component is changing from middle to the top header, 
the input doesn't lose focus?
```

**Context:** Maintaining focus during layout transitions (centered to header)  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented:
- Used `forwardRef` for SearchBar component
- Used `useRef` and programmatic focus with `useEffect`
- Avoided remounting by using CSS transitions instead of conditional rendering
- Stable component keys to prevent React remounting

---

### Make components in SearchPage reusable
**Prompt:**
```
Create a reusable empty state component for when no results are found
```

**Context:** Better UX for empty search results  
**AI Tool:** GitHub Copilot  
**Outcome:** Created `EmptyState.tsx` with customizable title and description

---

## Styling & Animations

## Debugging & Optimization

### AbortController for Request Cancellation
**Prompt:**
```
How do I cancel in-flight API requests when the user continues typing?
```

**Context:** Preventing race conditions and unnecessary API calls  
**AI Tool:** GitHub Copilot  
**Outcome:** Implemented:
- `AbortController` in `SearchPage.tsx`
- Request cancellation on new searches
- Proper cleanup in `useEffect`
- Ignored "CanceledError" in Redux reducer

---

### Pagination Implementation
**Prompt:**
```
Implement server-side pagination using the Jikan API pagination response
```

**Context:** Required feature for project submission  
**AI Tool:** GitHub Copilot  
**Outcome:** Created custom `Pagination.tsx` component with:
- Page numbers with ellipsis
- Previous/Next buttons
- Current page highlighting
- Configurable sibling and boundary counts
- Scroll to top on page change

---

## Additional Features

### Scroll to Top Utility
**Prompt:**
```
Add scroll to top functionality when navigating between pages
```

**Context:** Better UX for page navigation  
**AI Tool:** GitHub Copilot  
**Outcome:** Created `ScrollToTop.tsx` utility component

---

## General Development Notes

Throughout the development process, I extensively used AI assistance for:

1. **Learning Redux Toolkit** - As someone with Vue/Pinia experience, AI helped translate concepts
2. **TypeScript Type Safety** - Ensuring proper typing with minimal `any` usage
3. **Component Architecture** - Following React best practices and patterns
4. **API Integration** - Proper error handling, loading states, and data fetching
5. **Responsive Design** - Tailwind CSS utility classes and mobile-first approach
6. **Code Organization** - Folder structure and separation of concerns

### "Vibe Coding" Acknowledgment
I admittedly "vibe coded" some parts where I wasn't fully confident, especially:
- Complex Redux async thunk implementations
- Layout transition animations
- Some Tailwind CSS utility combinations

AI tools were crucial in helping me understand and implement these features correctly while learning React and Redux simultaneously.

---

## AI Tools Used
- **Primary:** GitHub Copilot (inline suggestions + chat)
- **For explanations:** GitHub Copilot Chat
- **Learning resources:** Provided by AI when asking "teach me" questions

---

## Conclusion

AI assistance was instrumental in completing this project within the time constraint. It helped me:
- Learn Redux Toolkit from scratch
- Implement industry-standard patterns
- Write TypeScript with proper type safety
- Follow React best practices
- Create a polished, professional application

This project demonstrates my ability to leverage AI tools effectively to learn new technologies and deliver quality results—a valuable skill in modern software development.
