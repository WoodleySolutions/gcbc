# Final Blog Post Migration Steps
## Great Catholic Book Club - Completing Wix Content Migration

According to your LAUNCH_CHECKLIST.md, there are still blog posts on the old Wix site that need manual migration to Sanity CMS.

---

## 📋 Current Migration Status

### ✅ Already Migrated (via scripts):
- 12 article posts imported from PDFs
- Multiple video posts with YouTube links
- "Why is Every Book Catholic?" (featured)
- All 2025 monthly book discussion posts
- Various pop culture theology posts

### ⏳ Still Needed:
- **Priority:** "The Great Divorce" blog post (November 2025 final book)
- Any remaining Wix blog posts not yet in CMS
- Any draft posts that should be published

---

## 🔍 Step 1: Identify Missing Blog Posts

### A. Access Old Wix Site
1. Go to: `www.greatcatholicbookclub.com/blog` (old Wix site)
2. Browse through all blog posts
3. Create a list of posts not yet migrated

### B. Check Current CMS
1. Open Sanity Studio: `http://localhost:3333`
2. Navigate to "Blog Posts" section
3. Compare against Wix site list
4. Identify gaps

### Quick Check - Key Posts to Verify:
- [ ] The Great Divorce discussion post (November 2025)
- [ ] 2026 Book List announcement post (if written)
- [ ] Any recent posts from late 2025
- [ ] Any video content not yet added
- [ ] Conversion story posts (Tyler's and Sadie's)

---

## 📝 Step 2: Manual Migration Process

For each missing blog post:

### A. Gather Content from Wix

1. **Open post on Wix site**
2. **Copy/paste text** into a text editor
3. **Download all images:**
   - Right-click → Save image as
   - Save to: `great-catholic-book-club/public/images/blog/[post-slug]/`
4. **Note metadata:**
   - Original publish date
   - Author
   - Categories/tags
   - Featured image

### B. Add to Sanity CMS

1. **Start Sanity Studio** (if not running):
   ```bash
   cd great-catholic-book-club/sanity-studio
   npm run dev
   ```
   Opens at: http://localhost:3333

2. **Create New Blog Post:**
   - Click "Blog Posts" in sidebar
   - Click "Create" button (+ icon)
   - Select "Blog Post"

3. **Fill in Fields:**

   **Basic Info:**
   - **Title:** [Copy from Wix]
   - **Slug:** Auto-generates, but verify it matches redirect rules
   - **Author:** Great Catholic Book Club (default)
   - **Excerpt:** First 1-2 sentences (max 200 characters)
   - **Published Date:** Use original Wix publish date

   **Post Type:**
   - Choose "Article" or "Video"
   - If video: Add YouTube URL

   **Content:**
   - Paste text from Wix
   - Format with headings (H2, H3)
   - Add images:
     - Click "+" → Image
     - Upload from `public/images/blog/`
     - Add alt text (accessibility)
   - Format lists, quotes, etc.

   **Categorization:**
   - **Categories:** Select appropriate (book-reviews, catholic-living, etc.)
   - **Tags:** Add relevant tags
   - **Related Books:** Link to any monthly books discussed

   **SEO:**
   - **Meta Title:** Post title (or custom)
   - **Meta Description:** Excerpt or custom (155 characters max)

   **Featured Image:**
   - Upload hero image for post
   - Set hotspot/crop if needed

   **Featured Flag:**
   - Check "Featured" for homepage display (max 3 featured posts)

4. **Save & Publish:**
   - Click "Publish" button (not just Save)
   - Verify post appears on site

---

## 🎯 Step 3: Priority Post - The Great Divorce

This is mentioned in LAUNCH_CHECKLIST.md as highest priority:

### Content Suggestions (if not yet written):

**Title Ideas:**
- "The Great Divorce: Choosing Heaven Every Day"
- "C.S. Lewis and the Four Last Things"
- "The Great Divorce: A Catholic Reflection on Hell, Purgatory, and Heaven"

**Key Themes to Cover:**
- Catholic eschatology (Four Last Things)
- Lewis as Anglican but compatible with Catholic teaching
- Free will and God's mercy
- The nature of Hell as self-chosen
- Purgatory as purification (Lewis's "Grey Town")
- Heaven as ultimate reality

**Discussion Questions:**
1. How does Lewis's vision of Hell compare with Catholic teaching?
2. What does the bus trip represent theologically?
3. How do the characters' choices reflect real spiritual struggles?
4. What does this book teach us about attachment to sin?
5. How can we practice "choosing Heaven" in daily life?

**Catholic Connections:**
- Dante's Divine Comedy (parallel structure)
- Pope Benedict XVI on Hell as self-exclusion
- St. Thérèse and the Little Way (choosing God in small things)
- Catechism paragraphs on Hell (1033-1037) and Purgatory (1030-1032)

---

## 🖼️ Step 4: Image Management

### Image Organization:
```
public/
  images/
    blog/
      the-great-divorce/
        hero-image.jpg
        heaven-bus.jpg
        etc.
      other-post-slug/
        image1.jpg
        image2.jpg
```

### Image Optimization:
Before uploading to Sanity:
- Resize large images to max 1920px wide
- Compress with TinyPNG or similar
- Use descriptive filenames: `heaven-bus-illustration.jpg` not `IMG_1234.jpg`

### Image Rights:
- ✅ Use only images you own or have license for
- ✅ Book covers: Fair use for commentary
- ✅ AI-generated art: Midjourney allows commercial use
- ⚠️ Google Images: Generally requires permission

---

## ✅ Step 5: Verify Migration

After adding each post:

### Test on Development Site:
1. Visit: `http://localhost:4321/blog`
2. Verify post appears in list
3. Click through to full post
4. Check:
   - [ ] Images display correctly
   - [ ] Formatting looks good
   - [ ] Links work
   - [ ] Related books show up
   - [ ] Mobile responsive

### Test on Production (after deploy):
1. Visit: `https://greatcatholicbookclub.com/blog`
2. Verify same as above
3. Test old Wix redirect (if post existed on Wix):
   - Try: `https://greatcatholicbookclub.com/post/old-slug`
   - Should redirect to: `https://greatcatholicbookclub.com/blog/new-slug`

---

## 📊 Content Audit Checklist

Use this to track what's migrated:

### 2025 Book Discussion Posts:
- [x] January - Hitchhiker's Guide to the Galaxy
- [x] February - Ender's Game
- [x] March - Watchmen
- [x] April - Pride and Prejudice
- [x] May - Brave New World
- [x] June - Jurassic Park
- [x] July - Foundation
- [x] August - The Bourne Identity
- [x] September - Dune
- [x] October - The Martian
- [ ] November - **The Great Divorce** ⭐ PRIORITY

### Evergreen Content:
- [x] Why is Every Book Catholic?
- [x] The Theology of Bob's Burgers
- [x] Good Kid m.A.A.d Catholic (hip-hop)
- [x] Reading Scripture Every Day
- [x] The Life, Works, and Faith of JRR Tolkien
- [x] Flannery O'Connor and Catholic Imagination
- [ ] Any others from Wix?

### Conversion Stories:
- [ ] Tyler's conversion story (check if exists)
- [ ] Sadie's conversion story (mentioned in redirect as Part 2)
- [ ] Faith journey posts

### Video Content:
- [x] 2025 Book List Reveal
- [x] Monthly book discussions
- [ ] Any recent videos not yet added?

### 2026 Content:
- [ ] 2026 Book List announcement post (optional but recommended)
- [ ] January 2026 preview post

---

## 🎬 Step 6: Video Post Special Instructions

For video posts (YouTube content):

### Adding a Video Post:
1. Create new blog post in Sanity
2. Set **Post Type** to "Video"
3. In **YouTube Video** section:
   - **URL:** Full YouTube URL (https://www.youtube.com/watch?v=VIDEO_ID)
   - **Thumbnail:** Upload custom (optional - YouTube thumbnail auto-loads)
   - **Duration:** e.g., "15:30" (optional)
4. **Content:** Add description, timestamps, key points
5. **Categories:** Add "video-content" category

### Video Embed:
- ✅ YouTube videos auto-embed on blog post pages
- ✅ Thumbnail shows on blog list page
- ✅ No additional code needed

---

## 📧 Step 7: Notify Subscribers (After Migration)

Once all posts are migrated:

1. **Draft newsletter announcing migration:**
   - New website URL
   - Improved design and features
   - Easier navigation
   - Same great content

2. **Email to existing subscribers:**
   - Explain migration from Wix
   - Reassure them they're still subscribed
   - Highlight new features (book details pages, study guides, shop)
   - Encourage them to re-subscribe via new form (if needed)

---

## 🔄 Ongoing Content Strategy

### Regular Posting Schedule (Suggested):
- **Monthly:** Book discussion post (by meeting date)
- **Bi-weekly:** Video content / blog article
- **As needed:** Faith/culture commentary posts

### Content Ideas for 2026:
- Deep dives into 2026 books
- Author spotlights (Graham Greene, Tolkien, etc.)
- Catholic literary criticism
- Pop culture through Catholic lens
- Reading tips and recommendations
- Conversion story series

---

## 🛠️ Tools & Resources

### Sanity Studio:
- Local: http://localhost:3333
- Start: `cd sanity-studio && npm run dev`
- Deploy: `cd sanity-studio && npm run deploy`

### Wix Export (Limited):
- Wix doesn't provide full export tools
- Manual copy/paste is most reliable
- Consider archiving old site for reference

### Content Formatting:
- Use Grammarly or Hemingway Editor for polish
- Catholic style guide: USCCB style guide
- Scripture citations: Use RSV-CE or NABRE

---

## ✅ Migration Complete Criteria

Blog migration is DONE when:
- [ ] All Wix blog posts reviewed
- [ ] All valuable posts migrated to Sanity
- [ ] The Great Divorce post published
- [ ] All images uploaded and displaying correctly
- [ ] All redirects tested and working
- [ ] Featured posts selected (max 3)
- [ ] SEO metadata complete for all posts
- [ ] At least one 2026 content piece published

---

## 🎉 Post-Migration Actions

Once migration is complete:
1. ✅ Update LAUNCH_CHECKLIST.md
2. ✅ Mark "Finish blog migration" as complete
3. ✅ Proceed to 2026 content creation
4. ✅ Consider archiving Wix site (keep for reference but redirect all traffic)

**Gloria in excelsis Deo!** ✝️📚
