# Rudra Bhumi Realtors

A modern, full-stack real estate platform built with cutting-edge web technologies. Rudra Bhumi Realtors is a real estate agency based in Jaipur, India, specializing in luxury property buying and sales, land leasing, furnished property rentals, new construction sales, property development, and property management.

## 🌟 Features

- **Property Listings**: Browse featured properties with detailed information and images
- **Inquiry Form**: Submit property inquiries directly through the website
- **Contact Integration**: Multiple contact options including phone, WhatsApp, and email
- **Responsive Design**: Fully responsive UI optimized for desktop, tablet, and mobile devices
- **Interactive Map**: Embedded map showing property locations
- **Authentication**: User authentication powered by Supabase
- **Modern UI Components**: Beautiful, accessible UI built with Radix UI and Tailwind CSS
- **SEO Optimized**: Schema markup for search engine optimization
- **Real-time Data**: React Query for efficient server state management

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) 19.2.0
- **Routing**: [TanStack Router](https://tanstack.com/router) 1.170.18
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.2.1
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) 7.71.2
- **Validation**: [Zod](https://zod.dev/) 3.24.2
- **State Management**: [TanStack Query](https://tanstack.com/query) 5.101.1
- **Charts**: [Recharts](https://recharts.org/) 2.15.4
- **Icons**: [Lucide React](https://lucide.dev/) 0.575.0
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) 2.0.7

### Backend
- **Server Framework**: [TanStack Start](https://tanstack.com/start) 1.168.32
- **Server Runtime**: [Nitro](https://nitro.unjs.io/) 3.0.260603-beta
- **Backend as a Service**: [Supabase](https://supabase.com/)

### Database
- **Database**: PostgreSQL (via Supabase)
- **Migrations**: Supabase migrations system

### Development
- **Build Tool**: [Vite](https://vitejs.dev/) 8.2.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.8.3
- **Linting**: [ESLint](https://eslint.org/) 9.32.0
- **Code Formatting**: [Prettier](https://prettier.io/) 3.7.3

## 📦 Dependencies

### Core Dependencies

#### UI Components & Styling
- `@radix-ui/*`: Comprehensive set of unstyled, accessible components
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: CSS-in-JS utility for managing component variants
- `clsx`: Utility for constructing className strings conditionally
- `tailwind-merge`: Utility to merge Tailwind CSS classes

#### Forms & Validation
- `react-hook-form`: Performant, flexible form validation library
- `@hookform/resolvers`: Resolvers for various validation libraries
- `zod`: TypeScript-first schema validation

#### Data Fetching & State Management
- `@tanstack/react-query`: Powerful server state management
- `@supabase/supabase-js`: Supabase JavaScript client

#### UI Libraries
- `lucide-react`: Beautiful, consistent icon library
- `sonner`: Toast notification system
- `date-fns`: Modern date utility library
- `react-day-picker`: Flexible date picker component
- `embla-carousel-react`: Carousel/slider component
- `recharts`: Composable charting library
- `input-otp`: One-time password input component
- `react-resizable-panels`: Resizable panel layout component
- `cmdk`: Command menu component
- `vaul`: Drawer component library

#### Utilities
- `tw-animate-css`: Animation utilities for Tailwind

### Dev Dependencies

- `@types/*`: TypeScript type definitions
- `@vitejs/plugin-react`: React plugin for Vite
- `eslint-plugin-react-hooks`: ESLint rules for React Hooks
- `eslint-plugin-react-refresh`: ESLint rules for React Fast Refresh
- `typescript-eslint`: TypeScript support for ESLint
- `@lovable.dev/vite-tanstack-config`: Lovable's TanStack configuration for Vite
- `vite-tsconfig-paths`: Vite plugin for TypeScript path resolution

## 🚀 Installation

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** or **bun**: Package manager
- **Git**: Version control system

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Rudra-Bhumi
   ```

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Or using bun:
   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase (if running locally)**

   The project includes Supabase migrations. Run:

   ```bash
   supabase start
   ```

   Or use the Supabase dashboard to apply migrations.

## 💻 Development

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
npm run build
```

This generates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

### Linting

Check for code quality issues:

```bash
npm run lint
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

## 📁 Project Structure

```
Rudra-Bhumi/
├── src/
│   ├── routes/                 # TanStack Router route components
│   │   ├── __root.tsx         # Root layout component
│   │   ├── index.tsx          # Home page
│   │   ├── properties.tsx      # Properties listing page
│   │   ├── dashboard.tsx       # Dashboard page
│   │   ├── auth.tsx           # Authentication pages
│   │   ├── contact.tsx        # Contact page
│   │   └── sitemap[.]xml.ts   # Sitemap generation
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components (Radix UI based)
│   │   ├── inquiry-form.tsx   # Property inquiry form
│   │   ├── property-card.tsx  # Property listing card
│   │   ├── map-embed.tsx      # Google Maps embed
│   │   ├── site-header.tsx    # Navigation header
│   │   └── site-footer.tsx    # Site footer
│   ├── data/                   # Static data
│   │   └── properties.ts      # Featured properties data
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.tsx     # Mobile detection hook
│   ├── integrations/           # External service integrations
│   │   └── supabase/          # Supabase integration
│   │       ├── client.ts      # Supabase client
│   │       ├── client.server.ts
│   │       ├── auth-middleware.ts
│   │       ├── auth-attacher.ts
│   │       └── types.ts
│   ├── lib/                    # Utility functions
│   │   ├── contact.ts         # Contact information constants
│   │   ├── utils.ts           # Utility functions
│   │   ├── error-capture.ts   # Error handling
│   │   └── lovable-error-reporting.ts
│   ├── server.ts              # Server configuration
│   ├── start.ts               # Application entry point
│   └── styles.css             # Global styles
├── supabase/
│   ├── config.toml            # Supabase configuration
│   └── migrations/            # Database migrations
├── public/                     # Static assets
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── eslint.config.js           # ESLint configuration
├── prettier.config.js         # Prettier configuration
└── README.md                  # This file
```

## 🗄️ Database

The project uses PostgreSQL via Supabase. Database migrations are stored in `supabase/migrations/` directory.

### Key Tables/Schema
- User authentication tables (managed by Supabase Auth)
- Property listings
- User inquiries
- Contact information

## 🔐 Authentication

Authentication is powered by Supabase Auth. Users can:
- Sign up with email
- Sign in with email/password
- View their inquiry history in the dashboard

## 📧 Contact Integration

The application includes multiple contact methods:
- Phone calls
- WhatsApp integration
- Email inquiries
- Contact form submissions

Contact details and messaging templates are centralized in `src/lib/contact.ts`.

## 🚢 Deployment

This project is optimized for deployment on:
- **Vercel**: Recommended for TanStack Start projects
- **Netlify**: With proper configuration
- **Self-hosted**: Using Node.js with Nitro server

### Deployment Checklist

1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Deploy the built application
4. Ensure Supabase instance is accessible from deployment environment

## 📊 Performance

- **Lazy loading**: Routes are automatically code-split by TanStack Router
- **Image optimization**: Optimized images in `public/assets/`
- **Caching**: React Query handles server state caching efficiently
- **CSS optimization**: Tailwind CSS purges unused styles in production

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a pull request

## 📝 License

This project is connected to Lovable. Avoid rewriting published git history (force pushing, rebasing, or amending commits that are already pushed) as it may affect Lovable integration.

## 🆘 Support

For issues, feature requests, or questions:
1. Check existing documentation in `src/routes/README.md`
2. Review Supabase configuration in `supabase/config.toml`
3. Check error logs and browser console for debugging

## 📚 Additional Resources

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Start Documentation](https://tanstack.com/start)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [React Documentation](https://react.dev)

---

**Project Name**: Rudra Bhumi Realtors  
**Built with**: React, TypeScript, TanStack, Tailwind CSS, Supabase  
**Last Updated**: August 2026
