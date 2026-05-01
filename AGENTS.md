# Xorost Project Notes

## Overview
Xorost is a React and TypeScript video sharing platform UI. Users can browse 30 video categories, open category video pages, and add categories to a subscription plan priced at Rs.3/category/month.

## Tech Stack
- React 19 with TypeScript
- Vite
- TailwindCSS setup is present, with most current UI styling in `src/App.css`
- npm package manager

## Main Files
- `src/App.tsx` - main app component, page state, category data, subscription selection, auth pages, category video pages
- `src/App.css` - app-specific layout and visual styling
- `src/index.css` - global styles and Tailwind directives
- `src/assets/category-sprite.png` - generated 30-category visual sprite used for category thumbnails
- `index.html` - document shell and page title

## Current UI Behavior
- Home page shows Xorost hero, category marketplace, and subscription summary.
- Sign in and Sign up are in-app pages controlled by local `activePage` state.
- Category image or title opens that category's video page.
- Add button adds the category to the subscription plan.
- Subscribed category pages show ad-free access.
- Unsubscribed category pages show an advertisement panel and ad-supported previews.

## Pricing
- `PRICE_PER_CATEGORY = 3`
- Monthly total = selected categories x Rs.3
- Yearly total = monthly total x 12

## Categories
There are 30 categories:
Film & Animation, Auto & Vehicles, Music, Pets & Animals, Sports, Travel & Events, Gaming, People & blogs, Comedy, Entertainment, News & Politics, How to & style, Education, Science & tech, Fitness & Wellness, Business & Entrepreneurship, Personal Finance, Parenthood, Relationships, Case studies, Reaction Videos, Motivational & Self-Improvement, Horror & True Crime, Art, Video Podcasts, Programming & Development, Reviews, ASMR, Kids, Others.

## Scripts
- `npm run dev` - start local Vite dev server
- `npm run build` - production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

## Development Guidance
- Keep edits scoped to the requested UI behavior.
- Preserve the category list order because it maps to the sprite sheet positions.
- Do not remove `category-sprite.png` unless replacing the image mapping.
- Run `npm.cmd run build` and `npm.cmd run lint` after code changes on Windows if possible.
