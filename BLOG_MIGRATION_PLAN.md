# Blog Migration Plan - Great Catholic Book Club

## Current Status
✅ **CMS Cleaned**: All 42 duplicate/incorrect blog posts have been deleted
✅ **PDFs Located**: Found 27 PDF blog posts in `C:\Users\woodl\Downloads\BlogPosts`
✅ **Schema Ready**: Blog post schema supports both articles and videos

## Systematic Migration Strategy

### Phase 1: PDF Analysis & Categorization
**Goal**: Identify which PDFs are articles vs video posts based on content

**Video Posts** (have YouTube videos, no featured images):
- Against Brave New World.pdf
- New Video Brave New World Marriage and Family vs The World.pdf
- Jane Austen, Pride and Prejudice vs The New York Times.pdf
- The Bourne Identity Genesis, Original Sin, and the Christian Love Story.pdf
- Jason Bourne, Marie, and the Covenant of Presence.pdf
- My Catholic Conversion Story, Part 2.pdf
- Woman Plans to Divorce and.pdf
- The Masculine Art of Listening Lessons from Pride.pdf
- New Video The Miseducation of Lauryn Hill Pro Life and Other Catholic Things in Hip Hop.pdf
- Pride and Prejudice A Catholic Take on Virtue and.pdf
- The Bright Side of Blasphemy.pdf
- My Conversion Story Speech by Sadie Woodley.pdf
- Walking Through the Jungle.pdf
- Theology of The Office.pdf
- Flannery O'Connor and the Catholic Imagination.pdf
- Watchmen A Catholic Take on Means and Ends, Use.pdf

**Article Posts** (have featured images in PDFs):
- The Family Is the Foundation.pdf
- Reading Scripture every day is awesome.pdf
- Watchmen Power, Morality, and Being a Dad.pdf
- The Life, Works, and Faith of JRR Tolkien.pdf
- Introduction to Ender's Game.pdf
- Ender's Game Fatherhood, Failure, and Forgiveness.pdf
- The Theology of Bob's Burgers, Part 1.pdf
- The Hitchhiker's Guide to the Galaxy.pdf
- Good Kid mAAd Catholic A Journey Through Faith.pdf
- 2025 Book List Introduction and January Book.pdf
- WhyIsEveryBookCatholic.pdf

### Phase 2: YouTube Video Collection
**Goal**: Get correct video IDs and metadata for all 24 video posts

**Known Video Issues to Fix**:
- Brave New World: needs correct video ID (not BRAVE_NEW_WORLD_VIDEO_ID)
- Lauryn Hill: needs correct video ID (not LAURYN_HILL_VIDEO_ID)

**Video Metadata Needed**:
- Video ID from YouTube URL
- Duration
- Publication date from video upload
- Proper thumbnails (auto-generated from video ID)

### Phase 3: Content Processing
**Goal**: Extract clean content and metadata from each PDF

**For Articles**:
- Extract featured images from PDFs
- Clean text content (remove webpage headers/footers)
- Generate proper excerpts
- Set correct publication dates
- Identify proper categories/tags

**For Videos**:
- Extract any supplementary text content
- Match with correct YouTube video
- Generate video-appropriate excerpts
- Set publication dates to match video upload dates

### Phase 4: Clean Migration Scripts
**Goal**: Create single, reliable script for each content type

**Article Migration Script**:
- Process 11 article PDFs
- Extract and upload images to Sanity
- Create clean blog post entries
- Set postType: 'article'

**Video Migration Script**:
- Process 16 video PDFs (from the 27)
- Get 8 additional videos from YouTube (to reach 24 total)
- Create video blog post entries
- Set postType: 'video'
- Include proper YouTube metadata

### Phase 5: Quality Assurance
**Goal**: Verify all content is correct and properly formatted

**Validation Checks**:
- No duplicate titles
- All articles have featured images
- All videos have valid YouTube IDs
- Publication dates are historically accurate
- Categories and tags are consistent
- Content displays properly on website

## Content Categories
Based on existing schema, organize posts into:
- **book-discussions**: Literature analysis posts
- **faith-literature**: Catholic perspective on books/media
- **catholic-living**: Lifestyle and spiritual growth
- **video-content**: All video posts
- **author-spotlights**: Author-focused content
- **reading-tips**: Reading strategies and Scripture
- **club-updates**: Book club announcements
- **reading-lists**: Book recommendations

## Publication Date Strategy
- Use actual creation dates from original blog posts
- For videos: match video upload dates on YouTube
- Maintain chronological order for blog archives
- Avoid future dates (current max should be Sept 2025)

## Next Steps
1. ✅ Create this plan document
2. 🔄 Analyze each PDF to categorize article vs video
3. 🔄 Create YouTube video inventory with correct IDs
4. 🔄 Build article migration script
5. 🔄 Build video migration script
6. 🔄 Execute migration with QA checks
7. 🔄 Final audit and cleanup

## Success Criteria
- ✅ 0 duplicate posts
- ✅ All articles have featured images
- ✅ All videos have working YouTube embeds
- ✅ Proper publication dates throughout
- ✅ Clean, consistent categorization
- ✅ Content displays correctly on website
- ✅ Total of ~27-35 posts (11 articles + 16-24 videos)