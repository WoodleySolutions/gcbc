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
- **Content Management**: Prepared for Sanity CMS integration

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
│   │   └── currentEvent.ts    # Dynamic event management
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About page
│   │   ├── books.astro        # 2025 book list
│   │   ├── join.astro         # Membership form
│   │   ├── contact.astro      # Contact form
│   │   ├── events.astro       # Events page
│   │   ├── blog.astro         # Blog listing
│   │   └── shop.astro         # Store page
│   └── styles/
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

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

The site is configured for deployment on Netlify with:
- Automatic builds from Git repository
- Form handling for contact and membership
- Environment variable support for future CMS integration
- Optimized static asset delivery

## 📚 Content Management

### Current Event Updates
To update the current monthly book and event:
1. Edit `src/lib/currentEvent.ts`
2. Update the `currentEvent` object with new book details
3. The changes will automatically propagate across all pages

### Adding New Content
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