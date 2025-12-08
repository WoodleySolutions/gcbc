# Netlify Deployment Guide
## Great Catholic Book Club - Production Deployment

This guide walks you through deploying the Great Catholic Book Club website to Netlify.

---

## 📋 Pre-Deployment Checklist

### ✅ Security Verification (COMPLETED)
- [x] Verified .env file is NOT in git repository
- [x] .gitignore properly configured
- [x] No sensitive tokens exposed in codebase

### 🔧 Files Ready for Deployment
- [x] netlify.toml configuration file created
- [x] public/_redirects file in place for Wix migration
- [x] Build process tested and working
- [x] All dependencies up to date

---

## 🚀 Step 1: Create Netlify Account & Connect Repository

1. **Sign up at Netlify** (if you haven't already)
   - Go to: https://www.netlify.com/
   - Sign up with GitHub account (recommended) or email

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" (or your git provider)
   - Authorize Netlify to access your repositories
   - Select: `GreatCatholicBookClubWebsite` repository
   - Select branch: `master`

3. **Configure Build Settings**

   Netlify should auto-detect from `netlify.toml`, but verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20

---

## 🔐 Step 2: Configure Environment Variables

Go to: **Site settings → Environment variables → Add a variable**

Add the following environment variables (these are PUBLIC and safe to expose):

### Required Variables:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `PUBLIC_SANITY_PROJECT_ID` | `1pod6f3p` | Sanity project ID (public) |
| `PUBLIC_SANITY_DATASET` | `production` | Sanity dataset (public) |
| `PUBLIC_SANITY_API_VERSION` | `2024-01-01` | Sanity API version (public) |

### Optional but Recommended:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NODE_VERSION` | `20` | Node.js version (can also be in netlify.toml) |

### ⚠️ DO NOT ADD THESE TO NETLIFY:
- ❌ `SANITY_WRITE_TOKEN` - Never expose write tokens to frontend builds
- ❌ Any other secrets from your local .env file

**Why?** The website only needs READ access to Sanity CMS via the CDN. Write tokens are only for local scripts (import-study-guide.cjs, etc.) and should NEVER be deployed.

---

## 🌐 Step 3: Configure Domain Settings

### A. Add Your Custom Domain

1. Go to: **Site settings → Domain management**
2. Click "Add custom domain"
3. Enter: `greatcatholicbookclub.com`
4. Netlify will guide you through DNS configuration

### B. Choose www vs non-www Preference

**Option 1: Redirect www to non-www (RECOMMENDED)**
- Primary domain: `greatcatholicbookclub.com`
- Redirect: `www.greatcatholicbookclub.com` → `greatcatholicbookclub.com`

**Option 2: Redirect non-www to www**
- Primary domain: `www.greatcatholicbookclub.com`
- Redirect: `greatcatholicbookclub.com` → `www.greatcatholicbookclub.com`

**ACTION REQUIRED:** Uncomment the appropriate line in `public/_redirects` (see Step 4)

### C. Configure DNS at Your Domain Registrar

Netlify will provide DNS records. Typically:

**For Netlify DNS (Recommended):**
- Change nameservers at your registrar to Netlify's nameservers

**For External DNS:**
- Add A record: `@` → Netlify's IP address
- Add CNAME record: `www` → `yoursite.netlify.app`

**Specific Instructions:** Netlify will show you exactly what to do based on your setup.

---

## 🔄 Step 4: Update Redirect Configuration

Edit `public/_redirects` and uncomment ONE of these lines based on your preference from Step 3B:

### If you chose non-www as primary (RECOMMENDED):
```
# Uncomment this line:
https://www.greatcatholicbookclub.com/* https://greatcatholicbookclub.com/:splat 301
```

### If you chose www as primary:
```
# Uncomment this line:
https://greatcatholicbookclub.com/* https://www.greatcatholicbookclub.com/:splat 301
```

**Then commit and push this change:**
```bash
git add public/_redirects
git commit -m "Configure domain redirect preference"
git push origin master
```

---

## 📧 Step 5: Configure Netlify Forms

Your forms are already configured with `data-netlify="true"`. Now set up notifications:

1. Go to: **Site settings → Forms**
2. **Enable form notifications**
3. **Add notification recipients:**
   - Email: `woodleys@greatcatholicbookclub.com`
4. **Configure for each form:**
   - Newsletter signup
   - Join form
   - Contact form

### Form Spam Protection (Included):
- ✅ Honeypot field (automatic)
- ✅ Netlify spam filtering (automatic)
- Optional: Enable reCAPTCHA if spam becomes an issue

---

## 🧪 Step 6: Test Deployment

After your first deploy completes, test everything:

### Critical Tests:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Books page displays 2026 list from Sanity CMS
- [ ] Blog posts load with correct content
- [ ] Shop page Square links work
- [ ] Forms submit successfully (test newsletter, join, contact)
- [ ] Mobile responsive on phone
- [ ] Old Wix URLs redirect properly
- [ ] SSL certificate is active (https://)

### Test Form Submissions:
1. Submit test via each form
2. Check email notifications arrive
3. View submissions in Netlify dashboard: **Site → Forms**

### Test Redirects:
Try these old Wix URLs (should redirect):
- `/post/why-is-every-book-catholic` → `/blog/why-is-every-book-catholic`
- `/2025-book-list` → `/books`
- `/contactus` → `/contact`

---

## 📊 Step 7: Verify Analytics & Monitoring

### Google Analytics
- Verify tracking code is firing: Use Google Tag Assistant browser extension
- Check Real-Time reports in Google Analytics
- ID is: `G-8J30EH3QNP` (already configured)

### Netlify Analytics (Optional)
- Consider enabling Netlify Analytics ($9/month)
- Provides server-side analytics (more accurate than GA)

---

## 🎯 Post-Launch Tasks

### Immediate (First 24 Hours):
- [ ] Monitor form submissions
- [ ] Check for any 404 errors in Netlify logs
- [ ] Verify Sanity CMS content updates propagate to live site
- [ ] Test on multiple devices and browsers

### First Week:
- [ ] Monitor Google Search Console for crawl errors
- [ ] Submit sitemap to Google: `https://greatcatholicbookclub.com/sitemap-index.xml`
- [ ] Set up Google Search Console property
- [ ] Monitor site performance with Lighthouse

### Ongoing:
- [ ] Regular security updates: `npm audit` and update dependencies
- [ ] Monthly Sanity usage check (stay within free tier)
- [ ] Backup CMS content periodically
- [ ] Monitor form spam levels

---

## 🔧 Troubleshooting Common Issues

### Build Fails
**Problem:** Build fails with "Command failed with exit code 1"

**Solutions:**
1. Check build logs in Netlify for specific error
2. Verify Node version is 20
3. Clear cache and retry: Deploy settings → Clear cache and retry deploy
4. Ensure all dependencies in package.json are correct

### Forms Not Working
**Problem:** Form submits but no email notification

**Solutions:**
1. Verify form has `data-netlify="true"`
2. Verify hidden field: `<input type="hidden" name="form-name" value="newsletter" />`
3. Check Netlify Forms settings for notification email
4. Check spam folder for form notifications

### Sanity Content Not Showing
**Problem:** CMS content doesn't appear on live site

**Solutions:**
1. Verify environment variables are set correctly in Netlify
2. Check Sanity project is published (not in draft)
3. Verify API version matches: `2024-01-01`
4. Check Sanity CORS settings allow your domain

### Redirects Not Working
**Problem:** Old URLs not redirecting properly

**Solutions:**
1. Verify `_redirects` file is in `public/` directory (✅ it is)
2. Check Netlify deploy log shows "_redirects" file was processed
3. Test with curl: `curl -I https://greatcatholicbookclub.com/old-url`
4. Redirects may take a few minutes to propagate

---

## 🆘 Support Resources

### Netlify Documentation:
- Build configuration: https://docs.netlify.com/configure-builds/
- Forms: https://docs.netlify.com/forms/
- Redirects: https://docs.netlify.com/routing/redirects/

### Sanity Documentation:
- CDN: https://www.sanity.io/docs/api-cdn
- CORS: https://www.sanity.io/docs/cors

### Astro Documentation:
- Netlify deployment: https://docs.astro.build/en/guides/deploy/netlify/

---

## 📝 Environment Variables Reference Sheet

**Copy this for easy setup in Netlify UI:**

```
PUBLIC_SANITY_PROJECT_ID=1pod6f3p
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Scopes:** All are "Available during runtime"

---

## ✅ Deployment Complete!

Once everything is tested and working:

1. ✅ Announce on social media
2. ✅ Send newsletter to existing subscribers
3. ✅ Update any external links pointing to old Wix site
4. ✅ Celebrate with coffee from your GCBC mug! ☕️

**Gloria in excelsis Deo!** ✝️
