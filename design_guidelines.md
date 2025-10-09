# Design Guidelines for Max's Shiba Inu Website

## Design Approach

**Selected Approach**: Reference-Based (Experience-Focused)

Drawing inspiration from Instagram's photo-centric layouts, personal portfolio sites, and warm pet-focused platforms. The design should feel personal, inviting, and celebration of Max's personality while maintaining modern web aesthetics.

**Key Design Principles**:
- Photo-first storytelling with generous image displays
- Warm, approachable personality matching Shiba Inu charm
- Clean, uncluttered layouts that let Max's photos shine
- Subtle playfulness without being overly cartoonish
- Easy, frictionless donation experience

## Color Palette

**Primary Colors** (inspired by Shiba Inu coat):
- Cream Base: 35 25% 92% (light backgrounds)
- Warm Sand: 30 35% 85% (secondary backgrounds)
- Shiba Orange: 25 85% 60% (primary accents, CTAs)
- Deep Terracotta: 15 70% 45% (hover states, emphasis)

**Neutral Colors**:
- Charcoal: 220 15% 25% (headings, primary text)
- Slate Gray: 215 10% 50% (body text)
- Soft White: 40 15% 98% (cards, elevated surfaces)

**Accent**:
- Warm Coral: 12 75% 65% (donation CTAs, special highlights)

## Typography

**Font Families** (via Google Fonts):
- Headings: 'Poppins' - friendly, modern, slightly rounded
- Body: 'Inter' - clean, highly readable
- Accents: 'Caveat' - handwritten style for personal touches (sparingly in quotes or captions)

**Type Scale**:
- Hero Heading: text-6xl md:text-7xl, font-bold (Poppins)
- Section Headings: text-4xl md:text-5xl, font-semibold
- Subheadings: text-2xl md:text-3xl, font-medium
- Body Large: text-lg, font-normal (photo captions)
- Body: text-base, leading-relaxed
- Small: text-sm (metadata, dates)

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24
- Grid gaps: gap-6 to gap-8
- Container: max-w-6xl with px-6

**Breakpoint Strategy**:
- Mobile-first with natural content flow
- Tablet (md): 2-column layouts for features
- Desktop (lg): 3-column photo grids, wider containers

## Component Library

### Navigation
- Sticky header with blurred backdrop (backdrop-blur-md)
- Logo/Max's name on left, navigation links on right
- Mobile: Hamburger menu with slide-in drawer
- Links: Home, Gallery, About, Donate (emphasized)

### Hero Section
- Full-width hero with large background image of Max
- Centered content overlay with semi-transparent dark gradient
- Hero content: Max's name (huge), tagline ("9 years of joy and fluff"), age badge, primary CTA ("See My Adventures")
- Buttons on images use backdrop-blur-sm with subtle borders

### Photo Gallery
- Masonry/Grid layout switching between 2-3 columns
- Card-based with hover zoom effect (scale-105 transition)
- Each photo has: image, caption, date badge
- Lazy loading for performance
- "Load More" functionality or infinite scroll

### Story/Daily Life Cards
- Timeline-style layout with alternating image positions
- Each entry: date, title, photo(s), short description
- Warm card backgrounds (Soft White) with subtle shadows

### About Section
- Split layout: Large photo of Max on one side, bio on other
- Fun facts in grid cards (favorite toys, quirks, personality traits)
- Icons for activities (Font Awesome paw prints, hearts, etc.)

### Donation Section
- Centered card layout with warm coral accent
- Heading: "Support Max's Adventures"
- Preset amounts as button chips ($5, $10, $25, Custom)
- Stripe payment form integrated
- Thank you message post-donation with Max's photo

### Footer
- Simple, warm design
- Social links if applicable
- "Made with ❤️ for Max" tagline
- Copyright year

## Images

**Hero Image**: Full-width hero image of Max in a natural, happy setting (outdoors, sunlight, showing his Shiba personality). Image should be high-quality, landscape oriented, with Max positioned slightly off-center to allow space for overlay text.

**Gallery Images**: 15-20 photos showcasing Max's daily life - playing, sleeping, eating, outdoor adventures, silly moments, seasonal photos. Mix of close-ups and environmental shots.

**About Section Image**: Portrait-style photo of Max, warm and inviting, high resolution.

**Donation Section**: Small, endearing photo of Max (circular crop) above the donation form.

**Background Patterns**: Subtle paw print pattern or texture as section dividers (very light opacity, 5-10%).

## Animation & Interactions

**Minimal, purposeful animations**:
- Smooth scroll behavior
- Photo hover: gentle scale (1.05) with transition-transform duration-300
- Button hover: slight lift (shadow increase) - using default Button hover states
- Page transitions: fade-in on load
- Donation success: confetti or hearts animation (brief celebration)

## Accessibility

- All images have descriptive alt text about Max
- Color contrast meets WCAG AA standards
- Focus states clearly visible on all interactive elements
- Donation form fully keyboard accessible
- Responsive text sizing

## Key Page Sections

1. **Hero**: Large image, Max's introduction, age, primary CTA
2. **Latest Updates**: 3-4 recent photos/stories in card grid
3. **Photo Gallery**: Masonry grid with filtering by category (play, naps, adventures, meals)
4. **About Max**: Bio, fun facts, personality traits, favorite things
5. **Daily Life Stories**: Timeline of memorable moments
6. **Support Max**: Donation section with Stripe integration, explaining how funds are used (treats, toys, vet care)
7. **Footer**: Simple, warm sign-off

This design creates a warm, photo-rich tribute to Max that feels personal, modern, and makes donating easy and joyful.