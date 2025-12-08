# URL Redirect Analysis - Wix to Netlify Migration
## Generated: December 7, 2025

## Summary
Analyzed Google Search Console data (last 3 months) to map old Wix URLs to new Astro/Netlify URLs.

---

## ✅ URLs That Match Perfectly (No Redirect Needed)

These URLs work the same on both sites:
- `/` - Homepage
- `/about` - About page
- `/join` - Join page
- `/blog` - Blog listing page

---

## 🔄 Blog Posts Requiring Redirects

### Wix URL Format: `/post/[slug]`
### New URL Format: `/blog/[slug]`

| Wix URL (Old) | New URL | Status | Priority |
|---------------|---------|--------|----------|
| `/post/the-bourne-identity-genesis-original-sin-and-the-christian-love-story` | `/blog/the-bourne-identity-genesis-original-sin-and-the-christian-love-story` | ✅ Match | HIGH (has clicks) |
| `/post/the-hitchhiker-s-guide-to-the-galaxy-family-as-the-purpose-of-creation` | `/blog/the-hitchhikers-guide-to-the-galaxy-family-as-the-purpose-of-creation` | ⚠️ SLUG CHANGE | HIGH (has clicks) |
| `/post/jason-bourne-marie-and-the-covenant-of-presence` | `/blog/jason-bourne-marie-and-the-covenant-of-presence` | ✅ Match | MEDIUM (impressions) |
| `/post/dune-the-fremen-and-the-gift-of-faith-how-god-shapes-his-people-through-suffering` | `/blog/dune-the-fremen-and-the-gift-of-faith-how-god-shapes-his-people-through-suffering` | ✅ Match | MEDIUM (impressions) |
| `/post/the-martian-training-for-the-mission-you-can-t-predict` | `/blog/the-martian-training-for-the-mission-you-can-t-predict` | ✅ Match | MEDIUM (impressions) |
| `/post/introduction-to-ender-s-game` | `/blog/enders-game-introduction-to-moral-reasoning-and-catholic-ethics` | ⚠️ SLUG CHANGE | LOW (impressions) |
| `/post/the-theology-of-bob-s-burgers-part-1-marriage-is-worth-it` | `/blog/the-theology-of-bob-s-burgers-the-belchers-as-a-catholic-family` | ⚠️ SLUG CHANGE | LOW (impressions) |
| `/post/my-catholic-conversion-story-part-2-learning-to-read-the-bible-speech-by-sadie-woodley` | `/blog/walking-through-the-jungle-a-journey-of-faith-and-discovery` | ⚠️ SLUG CHANGE | LOW (impressions) |
| `/post/pride-and-prejudice-a-catholic-take-on-virtue-and-marriage-april-2025-book-of-the-month` | `/blog/pride-and-prejudice-a-catholic-take-on-virtue-and-the-sacrament-of-marriage` | ⚠️ SLUG CHANGE | LOW (impressions) |
| `/post/why-is-every-book-catholic` | `/blog/why-is-every-book-catholic` | ✅ Match | LOW (impressions) |
| `/post/flannery-o-connor-and-the-catholic-imagination` | `/blog/flannery-oconnor-and-the-catholic-imagination` | ✅ Match | LOW (impressions) |

---

## 🗑️ Pages That Don't Exist on New Site (404 or Different Structure)

These pages existed on Wix but don't have equivalents on the new site:

| Wix URL | Impressions | Recommended Action |
|---------|-------------|-------------------|
| `/2025-book-list` | 68 | ➡️ Redirect to `/books` |
| `/events` | 65 | ➡️ Redirect to `/` (no events page anymore) |
| `/study-guide` | 57 | ➡️ Redirect to `/join` (study guides via signup) |
| `/event-details-registration/jane-austen-x-pope-st-john-paul-ii-pride-prejudice-love-responsibility` | 46 | ➡️ Redirect to `/blog/pride-and-prejudice-a-catholic-take-on-virtue-and-the-sacrament-of-marriage` |
| `/category/all-products` | 38 | ➡️ Redirect to `/shop` |
| `/blog/categories/the-great-catholic-book-club` | 3 | ➡️ Redirect to `/blog` |
| `/contactus` | 3 | ➡️ Redirect to `/contact` |
| `/product-page/great-catholic-book-club-tote-bag` | 5 | ➡️ Redirect to `/shop` |
| `/product-page/ceramic-mug-11oz-15oz` | 2 | ➡️ Redirect to `/shop` |

---

## 🔍 Slug Changes That Need Attention

These blog posts changed slugs between Wix and the new site. **Verify these are correct:**

1. **Hitchhiker's Guide**
   - Old: `the-hitchhiker-s-guide-to-the-galaxy...` (has apostrophe-s)
   - New: `the-hitchhikers-guide-to-the-galaxy...` (no apostrophe)
   - **Action:** Redirect needed ✅

2. **Introduction to Ender's Game**
   - Old: `introduction-to-ender-s-game`
   - New: `enders-game-introduction-to-moral-reasoning-and-catholic-ethics`
   - **Question:** Is this the same article or different?

3. **Bob's Burgers**
   - Old: `the-theology-of-bob-s-burgers-part-1-marriage-is-worth-it`
   - New: `the-theology-of-bob-s-burgers-the-belchers-as-a-catholic-family`
   - **Question:** Same article renamed or different article?

4. **Sadie's Speech**
   - Old: `my-catholic-conversion-story-part-2-learning-to-read-the-bible-speech-by-sadie-woodley`
   - New: `walking-through-the-jungle-a-journey-of-faith-and-discovery`
   - **Question:** Same content or different?

5. **Pride and Prejudice**
   - Old: `pride-and-prejudice-a-catholic-take-on-virtue-and-marriage-april-2025-book-of-the-month`
   - New: `pride-and-prejudice-a-catholic-take-on-virtue-and-the-sacrament-of-marriage`
   - **Action:** Redirect needed (slight wording change) ✅

---

## 📊 Impact Analysis

**High Priority Redirects (have clicks):**
- Homepage redirects: Already working ✅
- Bourne Identity post: 1 click
- Hitchhiker's Guide post: 1 click

**Medium Priority (strong impressions but no clicks):**
- 2025 book list → /books (68 impressions)
- Events page (65 impressions)
- Jason Bourne post (65 impressions)
- Study guide (57 impressions)

**SEO Impact:**
- Most traffic is on homepage (27 clicks) - Already works ✅
- Blog posts have low individual traffic
- Main risk is losing /2025-book-list and /events page impressions

---

## Next Steps

1. **Verify slug changes** - Confirm the 4-5 blog posts with different slugs
2. **Create _redirects file** - Implement all 301 redirects
3. **Test redirects** - Test on Netlify preview before launch
4. **Monitor post-launch** - Watch Google Search Console for 404s
