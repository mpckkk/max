# Max's Shiba Inu Website

## Overview

This is a personal website dedicated to Max, a 9-year-old Shiba Inu. The site serves as a photo gallery and storytelling platform showcasing Max's daily adventures, with integrated donation functionality to support his care. The application follows a photo-first design approach inspired by Instagram-style layouts and warm pet-focused platforms, emphasizing clean, uncluttered interfaces that let Max's personality shine through.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (Home, Gallery, About, Donate, NotFound pages)
- **TanStack Query v5** for server state management, data fetching, and caching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Design system follows warm, Shiba Inu-inspired color palette (cream, sand, terracotta tones)
- Typography system uses Google Fonts: Poppins (headings), Inter (body), Caveat (accents)
- Responsive design with mobile-first approach

**State Management Pattern**
- Server state managed through TanStack Query with infinite stale time
- Local UI state handled with React hooks
- Toast notifications for user feedback via custom toast hook

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running in ESM mode
- Middleware for JSON parsing, URL encoding, and request/response logging
- Custom error handling middleware for consistent error responses

**API Design**
- RESTful API structure under `/api` prefix
- Photo endpoints: GET /api/photos, GET /api/photos/:id, POST /api/photos
- Story endpoints: GET /api/stories, GET /api/stories/:id, POST /api/stories
- Payment endpoints: POST /api/create-payment-intent, POST /api/webhooks/stripe

**Storage Layer**
- In-memory storage implementation (`MemStorage` class) with pre-seeded sample data
- Interface-based storage design (`IStorage`) allows future database integration
- Uses Maps for efficient key-value storage of photos and stories
- UUID generation for entity IDs

**Development vs Production**
- Vite middleware integration in development for SSR and HMR
- Static file serving in production from built assets
- Environment-based configuration switching

### Data Schema & Validation

**ORM & Schema Definition**
- **Drizzle ORM** configured for PostgreSQL (ready for database migration)
- Schema defined with tables for photos and stories
- **Zod** for runtime validation of insert operations
- Type-safe schema inference for TypeScript

**Data Models**
- Photos: id, imageUrl, caption, category (Adventures/Naps/Play/Meals/Silly), date
- Stories: id, title, description, imageUrl, date
- All entities use UUID primary keys and timestamp tracking

### External Dependencies

**Payment Processing**
- **Stripe** integration for donation functionality
- Stripe API version: 2025-09-30.clover
- Client-side: @stripe/stripe-js, @stripe/react-stripe-js for payment UI
- Server-side: Stripe Node SDK for payment intent creation and webhook handling
- Requires STRIPE_SECRET_KEY and VITE_STRIPE_PUBLIC_KEY environment variables

**Database**
- **Neon Database** (@neondatabase/serverless) configured as PostgreSQL provider
- Connection via DATABASE_URL environment variable
- Migration system ready via drizzle-kit

**Asset Management**
- Static images stored in `/attached_assets/stock_images/` directory
- Direct file serving for Shiba Inu photos
- Image references stored as URLs in database schema

**Development Tools**
- Replit-specific plugins for development banner and error overlay
- tsx for TypeScript execution in development
- esbuild for production bundling

**Design Resources**
- Google Fonts API for web typography (Poppins, Inter, Caveat)
- Design guidelines documented in design_guidelines.md with specific color values and spacing primitives