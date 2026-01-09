# Amity x ZMTedTech Landing Page

A modern, responsive edtech landing page built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Hero section with sky background
- 💼 Why Us section with feature grid
- 📊 Animated statistics counter
- 🎓 Course carousel
- 💬 Testimonials section
- 🏢 Placements showcase
- 🤝 Partnerships section
- 💬 WhatsApp integration button

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── WhyUs.tsx        # Why Us section
│   ├── Stats.tsx        # Statistics section
│   ├── CourseCarousel.tsx # Course carousel
│   ├── Testimonials.tsx # Testimonials section
│   ├── Placements.tsx   # Placements section
│   ├── Partnerships.tsx # Partnerships section
│   ├── Footer.tsx       # Footer
│   └── WhatsAppButton.tsx # WhatsApp button
└── lib/
    └── utils.ts         # Utility functions
```

## Customization

- Update WhatsApp number in `components/WhatsAppButton.tsx`
- Modify colors in `tailwind.config.ts`
- Update content in respective component files
- Replace placeholder images with actual assets

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)

