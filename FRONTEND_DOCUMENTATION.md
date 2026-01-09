# Frontend Documentation - Amity x ZMT EdTech Landing Page

## Project Overview

A modern, responsive edtech landing page built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
AXZ/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Hero.tsx            # Hero section with CTA
│   ├── SearchSection.tsx   # Search bar with category filters
│   ├── WhyUs.tsx           # Why choose us section
│   ├── Stats.tsx           # Statistics section with animated counters
│   ├── CourseCarousel.tsx  # Course cards carousel
│   ├── Testimonials.tsx    # Student testimonials
│   ├── Placements.tsx      # Company placement logos
│   ├── Partnerships.tsx    # Partnership logos and joint initiative banner
│   ├── Footer.tsx          # Footer with links and contact info
│   └── WhatsAppButton.tsx  # Floating WhatsApp button
├── lib/
│   ├── utils.ts           # Utility functions (cn helper)
│   └── logos.tsx          # SVG logo components (legacy, now using images)
└── public/                 # Static assets (if any)
```

## Components Breakdown

### 1. Navbar Component (`components/Navbar.tsx`)

**Features:**
- Two-tier navigation system
- Top bar with dark background
- Main navigation bar with search
- Promotional banner
- Mobile responsive menu

**Sections:**
- **Top Bar**: "For Students", "For Colleges", "For Companies", "For Universities"
- **Main Nav**: Logo, "Explore", "Degrees", Search bar, "Log In", "Join for Free"
- **Promotional Banner**: Discount offer with close button

**Functionality:**
- ✅ All navigation links functional
- ✅ Search bar with query handling
- ✅ Login/Join buttons with click handlers
- ✅ Mobile menu with animations
- ✅ Banner close functionality

### 2. Hero Component (`components/Hero.tsx`)

**Features:**
- Two-column layout (content + student image)
- Light blue gradient background
- Brand badge with "Amity PLUS"
- Pricing information
- Call-to-action button

**Content:**
- Headline: "Achieve your career goals with Amity x ZMT EdTech"
- Subheadline: "Subscribe to build job-ready skills from world-class institutions"
- Pricing: ₹2,099/month or ₹13,999/year
- CTA: "Start 7-day Free Trial" button

**Functionality:**
- ✅ Trial button with click handler
- ✅ Student image with fallback
- ✅ Smooth animations on load

### 3. Search Section Component (`components/SearchSection.tsx`)

**Features:**
- Large search bar with icon
- Category filter buttons
- Active state management

**Categories:**
- Business (default active)
- Computer Science
- Data Science
- Health
- Information Technology
- Arts and Humanities

**Functionality:**
- ✅ Search form submission
- ✅ Category selection
- ✅ Active state highlighting
- ✅ Search query handling

### 4. Why Us Component (`components/WhyUs.tsx`)

**Features:**
- 6 feature cards in grid layout
- Icons for each feature
- Hover effects

**Features List:**
1. Quality Training
2. Updated Curriculum
3. Experienced Instructors
4. 250+ Courses
5. Dedicated Team
6. Helpline 24x7

**Functionality:**
- ✅ Scroll-triggered animations
- ✅ Hover effects on cards

### 5. Stats Component (`components/Stats.tsx`)

**Features:**
- Animated number counters
- 4 key statistics
- Descriptive text

**Statistics:**
- 30,000+ Learners Benefitted
- 2,000+ College Students Placed (Avg CTC 7 LPA)
- 1,000+ Internships Offered (Avg Stipend 25k/month)
- 500+ Reputed Organizations/Institutions

**Functionality:**
- ✅ Animated counters on scroll
- ✅ Smooth number transitions

### 6. Course Carousel Component (`components/CourseCarousel.tsx`)

**Features:**
- Interactive carousel with navigation
- Course cards with details
- Pagination dots

**Course Information:**
- Course title
- Type (Certificate Course, Project Based, etc.)
- Mode (Instructor-Led Online)
- Duration
- Hours
- Last date to apply
- Certification details
- Apply Now button

**Functionality:**
- ✅ Previous/Next navigation
- ✅ Dot indicators
- ✅ Smooth transitions
- ✅ Responsive design

### 7. Testimonials Component (`components/Testimonials.tsx`)

**Features:**
- 6 testimonial cards
- Student photos (using DiceBear API)
- Star ratings
- Student names and affiliations

**Testimonials:**
- Gulshan Insa (GEC Bikaner) - 5 stars
- Ayush Abhinav (IIT Roorkee) - 5 stars
- Shreya Pandoh (GCW Parade, Jammu) - 5 stars
- Ronak Lalwani (NIT Delhi) - 4 stars
- Pradip Singh Tomar (TCS) - 4 stars
- Adarsh Pal (RKGIT Ghaziabad) - 4 stars

**Functionality:**
- ✅ Scroll animations
- ✅ Hover effects
- ✅ Responsive grid

### 8. Placements Component (`components/Placements.tsx`)

**Features:**
- Company logo grid
- 8 placement companies
- Hover effects (grayscale to color)

**Companies:**
- Infosys
- Bank of America
- Flipkart
- TCS
- Wipro
- Accenture
- Microsoft
- Amazon

**Functionality:**
- ✅ Image loading with fallbacks
- ✅ Hover grayscale effect
- ✅ "See all Placements" button

### 9. Partnerships Component (`components/Partnerships.tsx`)

**Features:**
- Partnership logo cards
- Joint initiative banner
- Amity logo in circular icon

**Partners:**
- Amity (Leading Educational Institution)
- Microsoft (Certification Partner)
- AWS (Training and Certification)
- IBM (Technology Partner)

**Joint Initiative Banner:**
- Two circular icons (Amity logo + "Z")
- "Amity x ZMT EdTech" title
- "A Joint Initiative" subtitle
- Description text

**Functionality:**
- ✅ Logo images with fallbacks
- ✅ Scroll animations
- ✅ Hover effects

### 10. Footer Component (`components/Footer.tsx`)

**Features:**
- 4-column layout
- Email subscription
- Navigation links
- Contact information
- Social media icons

**Sections:**
- **Brand**: Logo, tagline, email subscription form
- **Programs**: FDPs, Workshops, Internship Programs, Placement Programs, Events
- **Company**: About Us, Clients, Gallery, Contact, Privacy, Terms
- **Connect**: Phone, Email, Social media icons (Facebook, Twitter, Instagram, LinkedIn, YouTube)

**Functionality:**
- ✅ Email subscription form
- ✅ All links functional
- ✅ Social media icons
- ✅ Responsive layout

### 11. WhatsApp Button Component (`components/WhatsAppButton.tsx`)

**Features:**
- Floating button (bottom-right)
- Green WhatsApp styling
- Tooltip on hover

**Functionality:**
- ✅ Opens WhatsApp chat
- ✅ Pre-filled message
- ✅ Smooth animations

## Design Features

### Color Scheme
- **Primary**: Blue (#1e40af, #1e3a8a)
- **Accent**: Orange/Amber (#f59e0b, #d97706)
- **Background**: White, light blue gradients
- **Text**: Gray-900, Gray-700, Gray-600

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes (3xl-7xl)
- **Body**: Regular, medium sizes (base-lg)

### Animations
- **Framer Motion**: Scroll-triggered fade-ins
- **Hover Effects**: Scale, shadow, color transitions
- **Number Counters**: Animated counting on scroll
- **Carousel**: Smooth slide transitions

### Responsive Design
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grids
- **Desktop**: 3-4 column grids
- **Breakpoints**: sm, md, lg, xl

## Image Sources

### Logo Images
All logos use external URLs from:
- Wikipedia Commons (primary)
- Logos-world.net (fallback)
- 1000logos.net (fallback)

**Placements:**
- Infosys, Bank of America, Flipkart, TCS, Wipro, Accenture, Microsoft, Amazon

**Partnerships:**
- Amity University, Microsoft, AWS, IBM

### Student Images
- Hero section: Unsplash API
- Testimonials: DiceBear Avataaars API

## Functionality Summary

### ✅ Working Features
- Navigation links with smooth scrolling
- Search functionality
- Category filters
- Login/Join buttons
- Email subscription form
- WhatsApp integration
- Course carousel navigation
- Animated statistics
- Responsive mobile menu
- Image loading with fallbacks
- Scroll-triggered animations

### 🔧 Ready for Integration
- Login page routing
- Signup page routing
- Search results page
- Course detail pages
- Contact form submission
- Email subscription backend

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Performance Features
- Lazy loading images
- Optimized animations
- Efficient re-renders
- Code splitting (Next.js)

## Accessibility
- Semantic HTML
- ARIA labels on buttons
- Keyboard navigation support
- Screen reader friendly

## Future Enhancements
- [ ] Add actual login/signup pages
- [ ] Implement search results page
- [ ] Add course detail pages
- [ ] Connect email subscription to backend
- [ ] Add more course cards
- [ ] Implement dropdown menus for navigation
- [ ] Add loading states
- [ ] Add error boundaries

