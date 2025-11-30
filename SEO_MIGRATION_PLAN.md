# SEO Migration Plan - Great Catholic Book Club
## Maintaining Google Rankings During Wix → Netlify Migration

### 🎯 Goal
Preserve (and improve) current top-3 rankings for:
- "Catholic Book Club"
- "Catholic Book Club Books"
- Other organic search terms

---

## ✅ Phase 1: Pre-Migration Audit (DO THIS FIRST)

### 1.1 Document Current Wix URLs
**Action:** Export all current page URLs from Wix site
- Homepage: `/`
- Books page: `/books`
- Join page: `/join` (has external backlinks)
- Blog posts: `/blog/[slug]`
- Any other pages

**Tool:** Use Google Search Console → Coverage report to see all indexed pages

### 1.2 Check Current Rankings
**Action:** Document current keyword rankings in Google Search Console
- Performance tab → Queries
- Export data showing:
  - Keywords ranking in top 10
  - Pages receiving most clicks
  - Average position for key terms

### 1.3 Identify Backlinks
**Action:** Check Google Search Console → Links → External links
- Which pages have the most backlinks?
- Which domains are linking to you?

---

## ✅ Phase 2: Technical SEO Implementation (IN PROGRESS)

### 2.1 Meta Tags ✅ DONE
- [x] Blog post meta titles and descriptions
- [ ] Homepage meta tags
- [ ] Books page meta tags
- [ ] Join page meta tags
- [ ] About/Contact pages meta tags

### 2.2 Structured Data (Schema.org)
**What:** Add JSON-LD markup to help Google understand your content

**For Blog Posts:**
```json
{
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "Meta description",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2024-01-01",
  "image": "featured-image-url"
}
```

**For Organization:**
```json
{
  "@type": "Organization",
  "name": "Great Catholic Book Club",
  "url": "https://www.greatcatholicbookclub.com",
  "logo": "logo-url",
  "sameAs": ["social-media-urls"]
}
```

### 2.3 XML Sitemap
**Status:** Need to verify Astro is generating sitemap
**File:** `/sitemap.xml` or `/sitemap-index.xml`
**Action:** Ensure all pages are included, submit to Google Search Console

### 2.4 Robots.txt
**Status:** Need to create/verify
**Location:** `/public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://www.greatcatholicbookclub.com/sitemap.xml
```

---

## ✅ Phase 3: URL Redirects (CRITICAL FOR RANKING PRESERVATION)

### 3.1 Create Redirect Map
**Action:** Map every Wix URL to new Astro URL

**Example:**
```
/blog/post-name-on-wix → /blog/post-slug-on-new-site
/old-page → /new-page
```

### 3.2 Implement Netlify Redirects
**File:** `netlify.toml` or `_redirects` in public folder

**Format:**
```toml
[[redirects]]
  from = "/old-url"
  to = "/new-url"
  status = 301  # Permanent redirect - passes SEO juice
```

**Important:**
- Use 301 (permanent) not 302 (temporary)
- Redirect EVERY old URL, even if content doesn't exist
- Test every redirect before launch

### 3.3 Special Attention: Join Page
**Why:** External backlinks pointing here
**Action:** Ensure `/join` works identically on new site
**Test:** URL structure, form functionality, content identical

---

## ✅ Phase 4: Performance Optimization

### 4.1 Page Speed
**Current Astro Status:** Likely already fast
**Check:** Run Google PageSpeed Insights
**Target:** 90+ score on mobile and desktop

**Optimizations:**
- Compress images (use Astro Image component)
- Minimize CSS/JS
- Enable Netlify CDN (automatic)
- Lazy load images below the fold

### 4.2 Mobile Responsiveness
**Status:** Should be good with Tailwind
**Test:** Google Mobile-Friendly Test tool

### 4.3 Core Web Vitals
**Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## ✅ Phase 5: Migration Day Checklist

### Before Switching Domain:
- [ ] All content migrated and verified
- [ ] All redirects tested on Netlify preview URL
- [ ] Sitemap generated and accessible
- [ ] Meta tags on all pages
- [ ] Google Analytics code installed
- [ ] Backup of old Wix site

### During Switch:
- [ ] Point domain DNS to Netlify
- [ ] Verify HTTPS is working
- [ ] Test 5-10 key URLs to ensure redirects work
- [ ] Check homepage loads correctly

### Immediately After:
- [ ] Submit new sitemap to Google Search Console
- [ ] Fetch as Google for homepage
- [ ] Monitor Search Console for crawl errors
- [ ] Check Analytics is tracking

---

## ✅ Phase 6: Post-Migration Monitoring (First 30 Days)

### Week 1:
- [ ] Check Google Search Console daily for errors
- [ ] Monitor Analytics traffic - expect temporary dip
- [ ] Fix any broken links/redirects immediately
- [ ] Verify all backlinks still work

### Week 2-4:
- [ ] Monitor keyword rankings (may fluctuate)
- [ ] Check indexation status (should stabilize)
- [ ] Review page speed scores
- [ ] Address any 404 errors

### Expected Timeline:
- Days 1-7: Traffic may dip 10-30% (normal)
- Weeks 2-4: Should recover to baseline
- Months 2-3: Potential ranking improvements due to better site speed

---

## 🚨 Critical Don'ts

1. ❌ DON'T change URL structure without redirects
2. ❌ DON'T delete old content
3. ❌ DON'T launch without testing redirects
4. ❌ DON'T forget to update Google Search Console property
5. ❌ DON'T panic if rankings dip slightly in first week (normal)

---

## 🎯 Why Netlify Sites Sometimes Struggle with SEO

**Common Issues:**
1. **Missing redirects** - Old URLs return 404s
2. **No sitemap submitted** - Google doesn't know what to crawl
3. **Poor meta tags** - We fixed this ✅
4. **Slow image loading** - Need to optimize
5. **JavaScript rendering issues** - Astro handles this well ✅
6. **No structured data** - Need to add

**Good News for You:**
- Astro pre-renders HTML (better than client-side React)
- Keeping same domain (huge advantage)
- Content quality is already good
- Site speed will likely improve on Netlify

---

## 📊 Tools to Use

1. **Google Search Console** - Monitor crawling, indexing, rankings
2. **Google Analytics** - Track traffic
3. **PageSpeed Insights** - Check performance
4. **Screaming Frog** (free tier) - Audit site before/after migration
5. **Ahrefs/SEMrush** (if budget allows) - Track rankings

---

## Next Steps

**What I can help with now:**

1. Check if sitemap is configured in Astro
2. Add structured data to blog posts
3. Create meta tags for main pages (homepage, books, join)
4. Set up Netlify redirects file
5. Create comprehensive redirect map once you provide Wix URLs

**What you should do:**

1. Export list of all current URLs from Google Search Console
2. Note which pages get the most traffic in Analytics
3. List any known external backlinks
4. Decide on migration timeline

Would you like me to start with any of these technical implementations?
