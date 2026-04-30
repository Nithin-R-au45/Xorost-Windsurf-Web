# PPC - Pay Per Category Application

## Project Overview
A React-based frontend application for pay-per-category subscription model. Users can select from 30 content categories and subscribe at ₹3 per category per month.

## Tech Stack
- **Framework**: React 19.2.5 with TypeScript
- **Build Tool**: Vite 8.0.10
- **Styling**: TailwindCSS
- **Package Manager**: npm

## Project Structure
```
PPC/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Component-specific styles
│   ├── index.css        # Global styles with Tailwind directives
│   ├── main.tsx         # Application entry point
│   └── assets/          # Static assets
├── public/              # Public assets
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Features

### Category Selection
- 30 predefined content categories
- Search/filter functionality
- Select All and Clear All buttons
- Visual feedback for selected items (purple highlight)
- Responsive grid layout (2 columns on mobile, auto on larger screens)

### Pricing Model
- **Rate**: ₹3 per category per month
- **Calculations**:
  - Monthly total = selected categories × ₹3
  - Yearly total = monthly total × 12
- Real-time price updates

### UI Components
- **Header**: Title, description, and pricing display
- **Category Grid**: Scrollable list with checkboxes
- **Summary Sidebar**: 
  - Selected category count
  - Monthly and yearly cost breakdown
  - Selected categories displayed as tags
  - Subscribe button with dynamic pricing

### Design
- Gradient background (purple to blue)
- Card-based layout with shadows
- Sticky summary panel
- Responsive design (mobile-first)
- Hover effects and transitions

## Categories List
1. Film & Animation
2. Auto & Vehicles
3. Music
4. Pets & Animals
5. Sports
6. Travel & Events
7. Gaming
8. People & blogs
9. Comedy
10. Entertainment
11. News & Politics
12. How to & style
13. Education
14. Science & tech
15. Fitness & Wellness
16. Business & Entrepreneurship
17. Personal Finance
18. Parenthood
19. Relationships
20. Case studies
21. Reaction Videos
22. Motivational & Self-Improvement
23. Horror & True Crime
24. Art
25. Video Podcasts
26. Programming & Development
27. Reviews
28. ASMR
29. Kids
30. Others

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Server
Run `npm run dev` to start the development server. The application will be available at `http://localhost:5173` (or the port shown in terminal).

## Key Constants
- `PRICE_PER_CATEGORY = 3` (Rupees per category per month)
- Category array defined in `App.tsx`

## State Management
- `selectedCategories`: Array of selected category names
- `searchTerm`: Current search filter value

## Future Enhancements
- Payment integration
- User authentication
- Category analytics
- Subscription management
- Category-specific content feeds
