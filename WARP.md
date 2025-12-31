# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Next.js development server on http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Run production server
- `npm run typecheck` - Run TypeScript type checking without emitting files
- `npm run lint` - Run Biome linter

### Code Quality
The project uses **Biome** (not ESLint) for linting and formatting. Configuration is in `biome.json`:
- Indentation: 2 spaces
- Quote style: Single quotes
- Line width: 100 characters
- Import organization is enabled

## Architecture

### Project Type
This is a **Next.js 15 (App Router)** showcase website builder with an integrated admin panel. The project enables creation of customizable business websites (French: "site vitrine") that are fully configurable without touching code.

### Core Concept
The entire site content and styling is driven by a JSON configuration file (`data/site-config.json`), which can be edited via:
1. Admin interface at `/admin` (default code: `admin123`)
2. Direct JSON file editing
3. AI automation (the JSON structure is designed for programmatic generation)

### Key Directories

#### `/app`
- `page.tsx` - Main site page that loads configuration and renders sections dynamically
- `layout.tsx` - Root layout with Google Fonts (Oswald + Montserrat) and metadata
- `globals.css` - Global styles with CSS custom properties for theming
- `/admin/page.tsx` - Admin panel route (authentication required)
- `/api` - API routes for site configuration and admin authentication

#### `/components`
- **Public site components**: `hero.tsx`, `header.tsx`, `footer.tsx`, `services.tsx`, `about.tsx`, `gallery.tsx`, `contact.tsx`, `specializations.tsx`, `kinesitherapy.tsx`, `methodology.tsx`, `practical-info.tsx`
- **Admin components**: `/admin/admin-login.tsx`, `/admin/admin-dashboard.tsx`
- **Admin editors**: `/admin/editors/` - Individual editors for each site section (metadata, branding, hero, services, contact, gallery, footer, security, theme, specializations, kinesitherapy, methodology, practical-info)
- **UI components**: `/ui/` - Radix UI-based components (button, input, label, sheet, tabs, textarea, alert, badge, card)

#### `/data`
- `site-config.json` - **Primary configuration file** containing all site content and styling
- `admin-config.json` - Admin authentication settings (code, timeout, lockout)
- `admin-sessions.json` - Active admin sessions
- `login-attempts.json` - Login attempt tracking for security
- `ui-palettes.json` - Pre-defined color palettes
- `example-automation.json` - Example for AI-based site generation

#### `/lib`
- `site-data.ts` - Functions to load/save site configuration, generate defaults
- `admin-auth.ts` - Authentication logic (session management, IP lockout, token generation)
- `utils.ts` - Utility functions (cn helper for class merging)

#### `/types`
- `site-config.ts` - TypeScript interfaces for all configuration structures

### Data Flow

1. **Site Rendering**:
   - `app/page.tsx` calls `reloadSiteConfig()` from `lib/site-data.ts`
   - Config is fetched from `/api/site-config` (or falls back to JSON import)
   - Components receive config props and render accordingly
   - CSS custom properties in `globals.css` are updated based on theme colors

2. **Admin Editing**:
   - Admin logs in via `/admin` with access code
   - Session token is created and stored in `admin-sessions.json`
   - Dashboard loads current config via `/api/site-config`
   - Section editors modify config in memory
   - Changes are saved via POST to `/api/site-config`
   - Main site auto-reloads config on window focus

3. **Authentication Flow**:
   - Login attempts tracked per IP with rate limiting
   - Failed attempts trigger temporary IP lockout (configurable duration)
   - Sessions expire after timeout (default: 60 minutes)
   - Session tokens validated on each admin API request

### API Routes

- `GET /api/site-config` - Retrieve current site configuration
- `POST /api/site-config` - Save site configuration (requires valid session)
- `POST /api/admin/login` - Authenticate with admin code, returns session token
- `POST /api/admin/verify` - Validate session token
- `POST /api/admin/logout` - Revoke session token
- `POST /api/admin/change-code` - Update admin access code
- `POST /api/app/appointment` - Handle appointment requests (if applicable)

### Configuration Schema

The `site-config.json` follows a structured schema defined in `types/site-config.ts`:
- **metadata**: SEO metadata (title, description, keywords)
- **branding**: Company name, logo URLs
- **theme**: Color values (primary, secondary, etc.) applied as CSS variables
- **contact**: Phone, email, address information
- **hero**: Hero section content with CTA
- **specializations**: Main and secondary specialization lists (specific to this site)
- **kinesitherapy**: Content about kinesitherapy services (specific to this site)
- **methodology**: Methodology section with image and CTA (specific to this site)
- **practicalInfo**: Pricing, session info, reminders (specific to this site)
- **services**: Array of service offerings (may be empty if using specializations)
- **about**: Company/professional description with features
- **gallery**: Image gallery with categories
- **footer**: Footer content, social links, quick navigation

### Styling Approach

- **Tailwind CSS 4.x** with custom configuration
- **CSS Custom Properties** in `globals.css` for dynamic theming
- Theme colors from JSON config are injected as CSS variables
- Responsive design with mobile-first approach
- Framer Motion for animations

### Security Features

- **Session-based authentication** with token validation
- **IP-based rate limiting** to prevent brute force attacks
- **Automatic session expiration** after inactivity
- **Failed login attempt tracking** with temporary lockouts
- File-based session storage (production should use database)

### Tech Stack
- **Framework**: Next.js 15.2 with React 19
- **Styling**: Tailwind CSS 4.x + Tailwind Animate
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Oswald, Montserrat)
- **Code Quality**: Biome 2.x (replaces ESLint + Prettier)
- **Type Safety**: TypeScript 5.x with strict mode

## Development Guidelines

### Adding New Site Sections
1. Define section schema in `types/site-config.ts` (interface)
2. Add section data to `site-config.json`
3. Create component in `/components/{section-name}.tsx`
4. Create editor in `/components/admin/editors/{section-name}-editor.tsx`
5. Import and render in `app/page.tsx` and admin dashboard

### Modifying Configuration
- Always validate against TypeScript types when changing config structure
- Update both JSON file and TypeScript interfaces synchronously
- Ensure backward compatibility or provide migration strategy

### Testing Admin Features
1. Navigate to http://localhost:3000/admin
2. Use default code: `admin123` (or check `data/admin-config.json`)
3. Test rate limiting by attempting multiple failed logins
4. Verify session persistence across page refreshes

### Working with Themes
- Theme colors are defined in `site-config.json` under `theme` object
- Colors are applied to CSS custom properties in the app
- Update `globals.css` if adding new theme variables
- Use Tailwind classes that reference theme colors

## Project-Specific Notes

### Current Configuration
This instance is configured as a **physiotherapy practice website** (French: kinésithérapie) for "Olivia Jaumain". The site includes specialized sections:
- Specializations (kinésithérapie du sport, troubles musculo-squelettiques, ATM)
- Kinesitherapy explanation section
- Methodology section
- Practical info (pricing, session duration, reminders)
- Appointment booking via external link (doctoranytime.be)

### French Language
The project is currently in **French**. All user-facing text, comments, and error messages are in French. When adding features, maintain French language consistency.

### Deployment
- Ready for deployment on Vercel, Netlify, or similar Next.js hosts
- `next.config.mjs` has `images.unoptimized: true` for static export compatibility
- Build errors and linting are currently ignored in production builds (see config)
- Ensure `data/` directory is writable in production for admin features to work

### Image Handling
- Images are referenced by URL (no uploads)
- No image optimization in production (see `next.config.mjs`)
- SVG files in `/public` are used for hero banners and section illustrations

### Database Note
Currently using **file-based storage** for admin sessions and configuration. For production with multiple instances, consider:
- Migrating to database (PostgreSQL via Prisma recommended per user rules)
- Using Redis for session management
- Implementing proper concurrency handling for config updates
