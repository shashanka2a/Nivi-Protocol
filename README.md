# Nivi Protocol - Next.js Application

A production-ready Next.js application for the Nivi Protocol platform, featuring content verification, minting, and rental capabilities.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Getting Started

### Installation

Install all dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

Start the production server:

```bash
npm start
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout with fonts and metadata
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ui/          # UI component library
│   │   └── ...          # Feature components
│   ├── data/            # Mock data and types
│   └── styles/          # Global styles
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS v4
- ✅ ESLint configuration
- ✅ Optimized font loading with `next/font`
- ✅ Image optimization with `next/image`
- ✅ Client components properly marked
- ✅ SEO metadata configured
- ✅ Production-ready build configuration

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Notes

- All client components are marked with `"use client"` directive
- Images use Next.js Image component for optimization
- Fonts are loaded via `next/font` for optimal performance
- ESLint is configured to ignore during builds (can be adjusted)

## License

Private - All rights reserved
