# SedMina Studio - Corporate Agency Website

Welcome to the technical documentation for the **SedMina Studio** corporate website. This project is a robust, highly optimized, and fully dynamic web application built for a modern creative agency. It showcases the agency's services, projects, blog, and references, featuring seamless internationalization and a powerful custom-tailored Content Management System (CMS).

## 🚀 Overview & Architecture

The SedMina Studio website is architected as a **Jamstack** application leveraging server-side rendering (SSR), static site generation (SSG), and edge middleware to deliver unparalleled performance and SEO. 

The core of the frontend is built on **Next.js (App Router)**, providing an intuitive routing system and React Server Components (RSC) for minimized client-side JavaScript. The content is completely decoupled and managed via a headless **Sanity Studio v3** setup that is natively embedded into the project route structure.

### Key Capabilities
- **Fully Localized Content**: Supports multi-language delivery (Turkish `tr` and English `en`) at both the structural (routing/UI tags) and content levels.
- **Dynamic Content Management**: Everything from the hero section, site settings, dynamic SEO metadata, up to deep nested service and project pages are managed inside the visual Sanity Studio.
- **Auto-Translation Pipeline**: Integrated custom Sanity actions that allow administrators to instantly machine-translate content streams between languages.
- **Fluid UI & Micro-interactions**: Smooth page transitions, scroll-linked animations, and highly responsive components.

---

## 🛠️ Technology Stack

The project embraces a modern React ecosystem, carefully selecting specialized tools for styling, state, content, and deliverability:

### Core Frameworks
* **[Next.js 16](https://nextjs.org/)**: The backbone of the application. It utilizes the modern `app/` directory paradigm, advanced layouts, and optimized image/font delivery.
* **[React 19](https://react.dev/)**: For building interactive UI components with concurrent features and server components.

### Content Management (CMS)
* **[Sanity Studio v3](https://www.sanity.io/)**: A highly customizable, real-time headless CMS. Integrated directly into the Next.js app on the `/studio` route.
* **`next-sanity` & `@portabletext/react`**: Ensures deeply structured rich text data from Sanity is elegantly parsed into customizable React components on the frontend.

### Internationalization (i18n)
* **[next-intl](https://next-intl-docs.vercel.app/)**: Handles the localized routing, translation dictionaries (`messages/`), and edge middleware for language detection and path redirection.
* **`@sanity/document-internationalization`**: A dedicated plugin in Sanity managing language variations at the document level for singletons and collections alike.

### Styling & Animation
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid, responsive UI development. Configured with a distinct agency-focused design system.
* **[Framer Motion](https://www.framer.com/motion/)**: Powers complex kinetic typography, scroll reveal animations, staggering lists, and sophisticated page transitions.
* **[styled-components](https://styled-components.com/)**: Used alongside for specialized component scoping and dynamic CSS-in-JS features when necessary.
* **Icons**: `lucide-react` and `react-icons` for a diverse and lightweight iconography system.

### Forms & Utilities
* **Nodemailer**: Server-side setup to process and relay contact form entries securely directly from API routes.
* **`react-hot-toast`**: For providing elegant, non-intrusive notification toasts across the app (e.g., mail success/error messages).
* **Vercel Analytics (`@vercel/analytics`)**: Privacy-friendly audience tracking integrated natively.

---

## 📂 Project Structure & Logic

The repository follows a clean, highly modular architecture, primarily inside the `src/` directory.

### 1. The `src/app` Directory (Routing)
* **`[locale]/`**: The localized wrapper route. All pages live inside this dynamic segment to ensure valid `tr` or `en` prefixed structures (e.g., `/tr/hizmetler`). Contains the main layout `layout.jsx` handling localized HTML meta context.
* **`api/`**: Serverless functions, including endpoints handling webhook events or `nodemailer` form submissions.
* **`studio/`**: The isolated route embedding the Sanity workspace into the domain.

### 2. Components Structure (`src/components/`)
Abstracted to enforce high reusability and isolated testing:
* **`common/`**: Granular, atomic UI elements (Buttons, Inputs, Cards).
* **`layout/`**: Global scaffolding structures (Navbar, Footer, Mega Menu).
* **`sections/`**: Macro-level assemblies representing functional horizontal slices of a page (e.g., `HeroSection`, `ServicesSection`, `AboutMetricsSection`).
* **`seo/`**: Dynamic meta tag generators and JSON-LD schema injectors adjusting programmatically per localized request.

### 3. CMS Architecture (`src/sanity/`)
The data-layer philosophy strictly divides content into two patterns:
* **Singletons**: Unique pages where only one instance exists. The structure defines schemas for global `siteAyarlari` (Site Settings), and dedicated page constructs like `anaSayfa` (Home), `iletisimSayfasi` (Contact), ensuring no accidental duplication by admins.
* **Collections (Lists)**: Models like `proje` (Projects), `hizmet` (Services), `altHizmet` (Sub-services), `blogYazisi` (Blog Posts), and `referans` (References). These schemas are interlinked through rich references.
* **Actions (`src/sanity/actions/`)**: Contains custom workflow logic, notably the powerful `AutoTranslateAction` injected into translatable types to streamline the editorial process.

### 4. Internationalization Logic (`src/i18n/` & `messages/`)
* **`messages/`**: Static JSON dictionaries for hardcoded UI strings (buttons, placeholders, generic error messages).
* **Middleware (`middleware.js`)**: Edge function intercepting navigation to ensure the user is matched with a supported locale, respecting browser preferences or saved cookies.

---

## 🧠 Rendering & Performance Logic

1. **Image Optimization**: Sanity's `@sanity/image-url` builder works intimately with `next/image`, allowing dynamic cropping, hotspot focusing, and automatic webp/avif generation directly from the Sanity CDN before hitting the client.
2. **SEO & Schemas**: The system auto-generates dynamic `sitemap.js` and `robots.js`. Localized pages output unique `<meta>` descriptions, open-graph imagery, and semantic JSON-LD structures to maintain high visibility in global search engines.
3. **Draft Mode**: Native Sanity presentation tools are integrated, allowing editors to view draft changes live in the Next.js frontend context before publishing. 
4. **Hydration Security**: RSC separates static content fetching from stateful client utilities (like Framer Motion components marked with `"use client"`), resulting in an optimal Time to Interactive (TTI) and passing Core Web Vitals comfortably.
