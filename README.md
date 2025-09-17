# Great Catholic Book Club Website

A modern website for the Great Catholic Book Club, built with Astro and deployed on Netlify.

## 🎨 Design Philosophy

The website embodies an "ancient library" aesthetic - evoking the feeling of a timeless archive filled with old books, pipe smoke, and scholarly wisdom. The design uses a carefully crafted color palette inspired by classical Catholic imagery:

- **Black Olive** (#393d32) - Primary background
- **Champaign** (#f1e3c8, #b49a67) - Text and accents
- **Rust Red** (#aa3d1d) - Call-to-action elements

## 🏗️ Architecture

- **Framework**: Astro (Static Site Generator)
- **Styling**: Tailwind CSS with custom color palette
- **Typography**: Cinzel (headlines) + Inter (body text)
- **Hosting**: Netlify with form handling
- **Content Management**: Sanity CMS fully integrated

## 📂 Project Structure

```text
/
├── public/
│   ├── images/
│   │   ├── 2025BookImages/     # Book cover images
│   │   └── SiteImages/         # Hero and background images
│   ├── GCBC.png               # Favicon
│   └── GCBC_Logo_ForDarkBG.png # Header logo
├── src/
│   ├── components/
│   │   └── NextEventBanner.astro
│   ├── layouts/
│   │   └── Layout.astro       # Main layout with navigation
│   ├── lib/
│   │   ├── currentEvent.ts    # Dynamic event management
│   │   └── sanity.ts          # CMS client and TypeScript types
│   ├── pages/
│   │   ├── index.astro        # Homepage (CMS-powered)
│   │   ├── about.astro        # About page
│   │   ├── books.astro        # 2025 book list (CMS-powered)
│   │   ├── join.astro         # Membership form
│   │   ├── contact.astro      # Contact form
│   │   ├── events.astro       # Events page
│   │   ├── blog.astro         # Blog listing (CMS-powered)
│   │   ├── blog/[slug].astro  # Individual blog posts (CMS-powered)
│   │   └── shop.astro         # Store page
│   └── styles/
├── sanity-studio/             # Sanity CMS Studio
│   ├── schemaTypes/
│   │   ├── monthlyBook.ts     # Books schema
│   │   ├── blogPost.ts        # Blog posts schema
│   │   ├── event.ts           # Events schema
│   │   ├── siteSettings.ts    # Site settings schema
│   │   └── index.ts           # Schema exports
│   ├── sanity.config.ts       # Studio configuration
│   └── package.json           # Studio dependencies
├── .env                       # Environment variables for Sanity
└── tailwind.config.mjs        # Custom color configuration
```

## ✨ Key Features

### 🏛️ Ancient Library Aesthetic
- Custom color palette evoking old books and classical architecture
- Hero background images on major pages
- Elegant typography with serif headers and clean body text
- Sophisticated borders, shadows, and visual hierarchy

### 📱 Responsive Design
- Mobile-first approach with hamburger navigation
- Responsive logo and flag design (20% smaller on mobile)
- Center-aligned mobile menu for improved UX
- Optimized image loading and aspect ratios

### 📅 Dynamic Event Management
- Centralized event data in `src/lib/currentEvent.ts`
- Single source of truth for monthly book discussions
- Automated text updates across multiple pages
- CMS-ready structure for future content management

### 🎯 Branding & Navigation
- Dramatic logo with decorative flag background
- Sticky navigation with overflow design
- Consistent visual hierarchy across all pages
- Professional favicon and brand assets

### 📋 Form Integration
- Netlify Forms for contact and membership
- Newsletter signup functionality
- Accessible form design with proper labeling
- Success/error handling ready for implementation

### 🎛️ Content Management System
- **Sanity CMS** fully integrated with TypeScript support
- **Dynamic content** for books, blog posts, and events
- **Featured content** management for homepage highlighting
- **SEO optimization** with meta titles and descriptions
- **Image management** with automatic optimization and CDN
- **Real-time updates** - changes in CMS appear immediately on site

## 🧞 Commands

### Main Website
All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Sanity CMS Studio
Commands for the CMS (run from `sanity-studio/` directory):

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run dev`             | Starts CMS studio at `localhost:3333`           |
| `npm run build`           | Build the studio for production                 |
| `sanity deploy`           | Deploy studio to Sanity's hosting               |

## 🚀 Deployment

The site is configured for deployment on Netlify with:
- Automatic builds from Git repository
- Form handling for contact and membership
- Environment variable support for future CMS integration
- Optimized static asset delivery

## 📚 Content Management

### 🎛️ Using Sanity CMS

**Starting the CMS:**
1. Run `npm run dev` (main website)
2. Run `cd sanity-studio && npm run dev` (CMS interface)
3. Visit `http://localhost:3333` for the CMS

**Content Types Available:**
- **Monthly Books**: Book details, meeting dates, discussion questions, themes
- **Blog Posts**: Full blog system with featured posts, categories, SEO
- **Events**: Meeting management with locations, registration details
- **Site Settings**: Global site configuration and announcements

**Key Workflows:**
1. **Set Current Book**: Edit any book → check "Is Current Month's Book?"
2. **Feature Blog Posts**: Edit any post → check "Featured Post"
3. **Add Discussion Questions**: From your GCBC Study Guide to book entries
4. **Manage Images**: Upload directly in CMS with automatic optimization

### 📅 Legacy Event Updates (Fallback)
For event text customization:
1. Edit `src/lib/currentEvent.ts`
2. Update the `currentEvent` object with new text
3. Changes propagate across all pages automatically
- **Blog Posts**: Add to `src/pages/blog/` directory
- **Book Images**: Place in `public/images/2025BookImages/`
- **Site Images**: Add to `public/images/SiteImages/`

## 🔮 Future Enhancements

- Sanity CMS integration for content management
- Mailchimp newsletter integration
- Enhanced blog functionality with categories and tags
- E-commerce integration for book sales
- Event calendar with RSVP functionality
- User accounts and community features

## 📖 About Great Catholic Book Club

"Every Book is Catholic" - We explore how literature and art can deepen our relationship with Jesus Christ through the lens of Catholic intellectual tradition. Our 2025 reading list features beloved sci-fi and literature classics that introduced the founders to ideas that helped them embrace the Gospel.

---

*Built with ❤️ for the Catholic intellectual tradition*