 # Is ADHD a Disability?
 
 A static informational website answering whether ADHD qualifies as a disability under US law.
 
 **Tech Stack:** Astro 7 + Tailwind CSS v4
 **Pages:** 14 static pages
 **Deploy:** Cloudflare Pages (SSG output in `dist/`)
 
 ## Getting Started
 
 ```bash
 npm install
 npm run dev
 ```
 
 Dev server at http://localhost:4321
 
 ```bash
 npm run build     # Build for production
 npm run preview   # Preview production build
 ```
 
 ## Site Structure
 
 | Page | Path | Topic |
 |---|---|---|
 | Home | `/` | Main guide: Is ADHD a disability? |
 | ADA | `/ada/` | ADHD under the Americans with Disabilities Act |
 | School | `/school/` | ADHD in school (Section 504, IEP) |
 | Workplace | `/workplace/` | ADHD at work, accommodations, disclosure |
 | SSDI | `/ssdi/` | Disability benefits for ADHD |
 | FAQ | `/faq/` | 50+ frequently asked questions |
 | Accommodations | `/accommodations/` | Workplace accommodations guide |
 | Rights | `/rights/` | Legal rights checklist |
 | Section 504 | `/section-504/` | Section 504 deep dive |
 | By Country | `/by-country/` | International comparison |
 | Blog | `/blog/` | Blog index |
 | Blog posts | `/blog/myths/`, `/blog/doctor-note/`, `/blog/ada-cases/` | Articles |
 
 ## SEO Features
 
 - JSON-LD structured data on every page (FAQPage, Article schemas)
 - Auto-generated sitemap (`@astrojs/sitemap`)
 - Semantic HTML with proper heading hierarchy
 - Descriptive meta titles and descriptions
 - FAQ accordions with FAQPage schema on homepage and FAQ page
 
 ## Design
 
 - **Font:** Inter (accessibility-canonical for health/legal content)
 - **Palette:** Zinc neutral base + Emerald accent (#059669)
 - **Density:** 5/10 (information-dense, trust-first)
 - **Layout:** Left-aligned content, max-width containment, border-based separators
 
 The full keyword site plan and SEO strategy is at [BUILD_PLAN.md](./BUILD_PLAN.md).
