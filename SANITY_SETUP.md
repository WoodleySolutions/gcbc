# Sanity CMS Setup Instructions

## Step 1: Create Sanity Account & Project
1. Go to https://sanity.io and create account
2. Run `npx @sanity/cli init` in project root
3. Choose "great-catholic-book-club" as project name
4. Select "production" dataset
5. Update the project ID in `src/lib/sanity.ts`

## Step 2: Schema Structure for Catholic Book Club

Create these schemas in your Sanity Studio:

### Book Schema
- Title (string)
- Slug (slug from title)
- Author (string) 
- Description (text)
- Cover Image (image)
- ISBN (string)
- Published Date (date)
- Rating (number 1-5)
- Currently Reading (boolean)
- Featured (boolean)
- Book of the Month (boolean)
- Discussion Date (datetime)

### Blog Post Schema  
- Title (string)
- Slug (slug from title)
- Excerpt (text)
- Content (rich text)
- Published At (datetime)
- Author (string)
- Cover Image (image)
- Categories (array of strings)

### Author Schema
- Name (string)
- Bio (text)
- Photo (image)
- Website (url)

### Event Schema
- Title (string)
- Description (text)
- Date (datetime)
- Location (string)
- Type (select: Book Discussion, Author Event, Social)

## Step 3: Sanity Studio Deployment
1. Run `npm run dev` in sanity folder to start local studio
2. Deploy to Sanity's hosted studio: `npm run deploy`

## Environment Variables Needed
```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

## Next Steps After Setup
- Import existing Wix content
- Configure Astro to fetch from Sanity
- Set up content preview mode