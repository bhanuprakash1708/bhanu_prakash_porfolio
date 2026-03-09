# Bhanu Prakash Portfolio

Personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- Responsive single-page portfolio sections (About, Experience, Skills, Projects, Education, Contact)
- Theme toggle (light/dark)
- Resume download from local static file
- Contact form integration with Resend
- Custom favicon (`BPK`)

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui primitives
- Framer Motion
- Zod validation
- Resend (email delivery)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root.

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=bhanu.prakash1708@gmail.com
```

You can copy from `.env.example`.

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run build:dev` - Development-mode build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Contact Form Notes

- Frontend form is in `src/components/ContactSection.tsx`.
- In local development, `/api/contact` is handled by Vite middleware in `vite.config.ts`.
- For production serverless deployment, `api/contact.ts` is provided.
- If email sending fails, verify:
  - `RESEND_API_KEY` is valid and active
  - `RESEND_FROM_EMAIL` is allowed by your Resend setup
  - target email (`CONTACT_TO_EMAIL`) is correct

## Resume File

Resume is served from:

- `public/bhanu_prakash_kanakamedala_resume.pdf`

The Resume section download button links to this file directly.

## Project Structure (high level)

- `src/components/` - UI sections and reusable components
- `public/` - static assets (resume, favicon, robots)
- `api/` - serverless API route(s)
- `vite.config.ts` - Vite configuration and dev API middleware

## License

Private project.
