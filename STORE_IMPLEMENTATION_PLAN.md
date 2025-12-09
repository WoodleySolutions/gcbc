# Store Implementation Plan - Great Catholic Book Club
## Date: November 30, 2025
### Decision: Square Online Free Plan + Multiple Vendors

---

## Background & Context

### Previous Experience
- Tried Printify with Wix
- Found it frustrating:
  - Difficult pricing management
  - Complicated shipping setup
  - Poor integration experience
  - Too much manual work

### Current Situation
- Have 2 products already: mug and tote bag (via Printify)
- No active storefront
- Need to design more products
- Planning to sell study guides (physical and digital)
- Have digital art to potentially sell as prints

### Key Requirements
1. **No monthly fees** (don't know if products will sell)
2. **Embedded on our site** (not separate store URL - liked Wix integration)
3. **Easy to add new products** (as we create designs)
4. **Simple shipping handling** (was pain point with Wix)
5. **Support multiple vendors** (Printify, book printing, digital products, art prints)
6. **Manual fulfillment is OK** (low volume expected)

---

## Chosen Solution: Square Online Free Plan

### Why Square?

**Pricing:**
- $0/month (no commitment)
- 2.9% + $0.30 per transaction (only pay when we sell)
- Lowest fees of free options

**Integration:**
- Can embed on our Astro site via payment links
- Products display on greatcatholicbookclub.com/shop
- Square checkout opens in popup/overlay (doesn't fully leave our site)
- Exactly like Wix integration we liked, but simpler

**Shipping:**
- Handles flat rate shipping ($5 for everything)
- Can also do free shipping (include in price)
- Auto-calculates taxes
- No complex configuration needed

**Multi-Vendor Support:**
- Square doesn't care where products come from
- Manual fulfillment means we route orders to appropriate vendor
- Can mix: Printify (apparel), Lulu (books), Gumroad (digital), etc.

**Easy Product Management:**
- Add products in Square dashboard (10 min per product)
- Get payment link
- Add button to site with payment link
- Done

---

## Product Strategy

### Current Products (Have Already)
1. **Mug** - Via Printify
2. **Tote Bag** - Via Printify

### Phase 1: Add Core Products (Next 2-4 Weeks)
3. **"Every Book is Catholic" T-Shirt** - Printify
   - Our signature product
   - Multiple colors/sizes
   - Price: $25 (includes $5 profit + $5 shipping cost)

### Phase 2: Study Guide (When Ready)
4. **Study Guide - Digital PDF** - Via Gumroad
   - Instant download
   - Automated delivery (no manual work)
   - Price: $12

5. **Study Guide - Printed Book** - Via Lulu through Square
   - Professional printed book
   - Manual fulfillment (order from Lulu when purchased)
   - Price: $18

### Phase 3: Expansion (Future)
6. **Hoodie** - Printify
7. **Digital Art Prints** - TBD vendor (possibly Fine Art America or similar)
8. **Bookmarks** - Printify or bulk custom
9. **Sticker pack** - Printify or StickerMule

---

## Vendor Management

### Products by Fulfillment Source

**Printify (Print-on-Demand Apparel):**
- Mug
- Tote bag
- T-shirt
- Future: Hoodie, bookmarks
- **Process:** Log into Printify, create order, paste customer address
- **Time:** 2-3 minutes per order

**Lulu (Print-on-Demand Books):**
- Study guide (printed version)
- **Process:** Log into Lulu, create order, paste customer address
- **Time:** 2-3 minutes per order
- **Setup:** One-time PDF upload

**Gumroad (Digital Products - Automated):**
- Study guide (digital PDF)
- **Process:** Customer gets instant download link
- **Time:** 0 minutes (fully automated!)
- **Note:** Won't use Square for this - direct Gumroad link

**Future Vendors (Art Prints, etc.):**
- TBD when we expand
- Same manual process: Order notification → Fulfill with vendor

### Order Fulfillment Workflow

**When Square order comes in:**
1. Email notification: "New order!"
2. Check Square dashboard to see what was ordered
3. Determine vendor:
   - Apparel → Printify
   - Printed study guide → Lulu
   - Art print → [Future vendor]
4. Log into that vendor
5. Create order manually with customer's shipping address
6. Vendor charges us and ships to customer
7. Get tracking number
8. Update Square order with tracking
9. Mark as fulfilled in Square
10. Customer gets auto-email with tracking

**Time per order:** 2-3 minutes
**Acceptable volume:** Fine for low volume (1-10 orders/month)

---

## Shipping Strategy

### Decision: Flat Rate $5 Shipping

**Why:**
- Simple for customers to understand
- Covers most USPS First Class costs ($4-6)
- Easy to configure in Square
- No surprises at checkout
- Transparent (separate line item)

**Customer sees at checkout:**
```
T-Shirt: $20.00
Shipping: $5.00
Tax: $1.50 (auto-calculated by Square)
-----------------------------------
Total: $26.50
```

**Alternative considered:** Free shipping (include $5 in item price)
- Makes pricing look higher
- Less transparent
- Will stick with separate shipping line item

---

## Pricing Strategy

### Formula
```
Printify Base Cost + Our Profit + (Shipping Cost) = Customer Price

Example T-Shirt:
Printify charges us: $15
Our profit margin: $5
Item price: $20
Shipping (separate): $5
Total customer pays: $25
```

### Price Points by Product Type

**Apparel:**
- Mug: $18 + $5 shipping = $23 total (profit: ~$8)
- Tote: $20 + $5 shipping = $25 total (profit: ~$8)
- T-Shirt: $20 + $5 shipping = $25 total (profit: ~$5)
- Hoodie: $35 + $5 shipping = $40 total (profit: ~$10)

**Study Guides:**
- Digital PDF: $12 (no shipping, profit: ~$11)
- Printed book: $15 + $5 shipping = $20 total (profit: ~$9 after Lulu costs)

**Art Prints:**
- TBD based on vendor costs
- Likely $25-40 depending on size

### Profit Expectations (Conservative)

**Monthly scenarios:**
- 5 items sold = $35-50 profit
- 10 items sold = $70-100 profit
- 25 items sold = $175-250 profit
- 50 items sold = $350-500 profit

**Not meant to be major income stream** - helps offset costs and validates interest.

---

## Technical Implementation

### Site Structure

**New page:** `/shop` on greatcatholicbookclub.com

**Design approach:**
- Match existing GCBC aesthetic (dark bg, champaign/rust colors)
- Product cards in grid layout
- Each card has Square payment link button
- Organized by category (Apparel, Study Guides, Art)

### Integration Method: Square Payment Links

**How it works:**
1. Create products in Square dashboard
2. Generate payment link for each product
3. Embed as buttons on shop page
4. When clicked, Square checkout opens in popup
5. Customer completes purchase without leaving our site (feels integrated)

**Code structure:**
```astro
---
// /src/pages/shop.astro
const products = [
  {
    name: 'T-Shirt',
    price: 20.00,
    shipping: 5.00,
    image: '/images/merch/tshirt.jpg',
    description: 'Classic fit unisex tee',
    squareLink: 'https://square.link/u/ABC123'
  },
  // ... more products
];
---

<Layout>
  {products.map(product => (
    <div class="product-card">
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price} + ${product.shipping} shipping</p>
      <button onclick="window.open('{product.squareLink}', '_blank', 'width=600,height=800')">
        Buy Now
      </button>
    </div>
  ))}
</Layout>
```

### Adding New Products (Simple Process)

**To add a new product:**
1. Design the product mockup
2. Add to Printify (or other vendor) - get pricing
3. Add to Square dashboard (5 minutes):
   - Name, description, price
   - Upload image
   - Get payment link
4. Add to shop page code (2 minutes):
   - Copy existing product object
   - Update details and Square link
5. Commit and push to GitHub
6. Netlify auto-deploys

**Total time:** ~10 minutes per product

---

## Implementation Timeline

### Week 1: Square Setup
- [ ] Create Square account
- [ ] Configure flat $5 shipping
- [ ] Add existing 2 products (mug, tote)
- [ ] Generate payment links
- [ ] Test with small purchase

### Week 2: Build Shop Page
- [ ] Create `/src/pages/shop.astro`
- [ ] Design product card components
- [ ] Embed payment links
- [ ] Match GCBC styling
- [ ] Test checkout flow
- [ ] Practice manual fulfillment process

### Week 3: Add T-Shirt
- [ ] Design "Every Book is Catholic" t-shirt mockup
- [ ] Add to Printify
- [ ] Confirm pricing
- [ ] Add to Square
- [ ] Add to shop page
- [ ] Create product announcement

### Week 4: Soft Launch
- [ ] Announce shop to email list
- [ ] Post on social media
- [ ] Monitor first orders
- [ ] Refine process based on experience

### Future: Study Guide & More
- [ ] Complete 2026 study guide
- [ ] Set up Lulu account
- [ ] Upload PDF to Lulu
- [ ] Create digital version (Gumroad)
- [ ] Add both versions to shop
- [ ] Design and add more products as ready

---

## Success Criteria

### Phase 1 (First 30 Days)
- ✅ Shop page live and functional
- ✅ At least 3 products available
- ✅ Successfully fulfill 1-5 orders
- ✅ Process works smoothly
- ✅ No major customer issues

### Phase 2 (60-90 Days)
- ✅ 5-10 products available
- ✅ Study guide available (both versions)
- ✅ Consistent small order volume (5-10/month)
- ✅ Fulfillment process optimized
- ✅ Positive customer feedback

### Phase 3 (Future)
- ✅ Consider if volume justifies Shopify automation ($5/month)
- ✅ Expand product line based on what sells
- ✅ Potentially explore wholesale/bulk orders for events

---

## Risk Mitigation

### Potential Issues & Solutions

**Issue:** No one buys anything
- **Impact:** Low (no monthly costs, minimal time invested)
- **Learning:** Validates that merch isn't priority for community
- **Action:** Focus on other revenue streams (study guides, Patreon)

**Issue:** Too many orders to fulfill manually
- **Impact:** Good problem to have!
- **Solution:** Upgrade to Shopify ($5/month) for auto-fulfillment with Printify
- **Threshold:** >20 orders/month

**Issue:** Shipping costs vary too much (heavy items)
- **Impact:** Lose money on some orders
- **Solution:** Adjust pricing or switch to calculated shipping
- **Monitor:** Track actual Printify shipping costs

**Issue:** Customer service issues (wrong size, defective product)
- **Impact:** Time spent on support
- **Solution:**
  - Work with Printify customer support
  - Offer easy returns/exchanges
  - Set clear expectations on product pages

**Issue:** Adding products takes too long
- **Impact:** Slow product expansion
- **Solution:** Batch design sessions (design 3-5 products at once)
- **Delegate:** Consider hiring designer on Fiverr for mockups

---

## Comparison: Why Not Other Options?

### Why Not Shopify?
- ✅ **Winner on automation** (auto-fulfills Printify)
- ❌ **Monthly cost** ($5) - not justified for low/uncertain volume
- ❌ **Psychological barrier** after Wix experience
- **Verdict:** Revisit if we hit 20+ orders/month

### Why Not Etsy?
- ✅ **Built-in audience** could discover us
- ✅ **Auto-fulfillment** with Printify
- ❌ **Higher fees** (~10% vs Square's 2.9%)
- ❌ **Sends traffic away** from our site
- ❌ **Doesn't match requirement** for embedded experience
- **Verdict:** Maybe for art prints to reach new audience, but not primary store

### Why Not Custom API Integration?
- ✅ **Full control** and customization
- ✅ **Lowest fees** (just Stripe 2.9%)
- ❌ **20-40 hours development** time
- ❌ **Ongoing maintenance** burden
- ❌ **Not worth it** for low volume
- **Verdict:** Only if this becomes significant revenue stream

### Why Not Gumroad for Everything?
- ✅ **Great for digital** products (automated)
- ❌ **Manual fulfillment** for physical products
- ❌ **Higher fees** (10% on free plan)
- ❌ **Not designed** for physical merch
- **Verdict:** Use for digital study guides, not physical merch

---

## Questions & Answers from Discussion

**Q: Can we go straight to Printify without a middleman?**
A: No. Printify is only fulfillment (printing/shipping). They don't handle payments, checkout, or storefront. Need something like Square, Shopify, or Etsy to sell.

**Q: Why not Etsy for GCBC-specific merch?**
A: Etsy makes sense for art prints (reach new audience), but for GCBC merch, our community already knows us. Better to keep them on our site. Can use both though!

**Q: How hard is it to add new products?**
A: Very easy. 10 minutes per product:
- 5 min: Add to Square dashboard (name, price, image, get link)
- 2 min: Add product card to shop page code
- 3 min: Test and deploy

**Q: Can we use multiple vendors (not just Printify)?**
A: Yes! Square doesn't care where products come from. We manually fulfill from:
- Printify (apparel)
- Lulu (printed books)
- Gumroad (digital - actually won't route through Square, direct link)
- Any future vendors

**Q: How does Square handle shipping?**
A: Configure once in dashboard:
- Set flat $5 rate for all products
- Auto-applies at checkout
- Calculates tax automatically based on customer location
- Customer sees: Item + Shipping + Tax = Total

---

## Documentation & Resources

**Related Documents:**
- `MERCH_IMPLEMENTATION_OPTIONS.md` - Full comparison of all options
- `SQUARE_SETUP_GUIDE.md` - Step-by-step Square configuration
- `MONETIZATION_RESEARCH.md` - Overall revenue strategy context

**External Resources:**
- Square Online: https://squareup.com/us/en/online-store
- Printify: https://printify.com
- Lulu: https://www.lulu.com
- Gumroad: https://gumroad.com

**Credentials Needed:**
- Square account (to be created)
- Existing Printify account (already have)
- Lulu account (create when ready for study guide)
- Gumroad account (create for digital products)

---

## Next Actions

**Immediate (This Week):**
1. Create Square account
2. Configure shipping settings
3. Add mug and tote bag products
4. Generate payment links
5. Test with one small purchase

**Short Term (Next 2 Weeks):**
6. Build /shop page in Astro
7. Embed payment links with styling
8. Test full checkout flow
9. Practice fulfillment process
10. Design t-shirt mockup

**Medium Term (Next Month):**
11. Add t-shirt to shop
12. Soft launch to community
13. Gather feedback
14. Iterate on design/products

**Long Term (2-3 Months):**
15. Complete 2026 study guide
16. Set up Lulu and Gumroad
17. Add study guides to shop
18. Expand product line based on sales

---

## Metrics to Track

### Sales Metrics
- Total orders per month
- Revenue per month
- Profit per month (after costs)
- Average order value
- Best-selling products

### Operational Metrics
- Time spent fulfilling orders
- Customer support issues
- Fulfillment errors
- Time from order to shipment

### Decision Triggers
- **If >20 orders/month:** Consider Shopify automation
- **If <2 orders/month for 3 months:** Pause/pivot
- **If customer service issues >25%:** Investigate quality/vendors
- **If certain products sell well:** Expand that category

---

## Conclusion

**Decision:** Implement Square Online Free Plan with embedded payment links

**Confidence Level:** HIGH
- Meets all requirements (no monthly cost, embedded on site, easy to use)
- Solves Wix pain points (easier pricing, simpler shipping)
- Supports multi-vendor strategy
- Low risk (only pay when we sell)
- Can scale up later if needed

**Primary Risk:** Low sales volume
- **Mitigation:** No sunk costs, learning experience, helps test market

**Expected Outcome:**
- Functional, professional shop within 2-3 weeks
- 5-15 orders/month within 3 months
- $50-150/month profit (offsets some hosting/content costs)
- Better understanding of what community wants
- Foundation for future product expansion

**Next Step:** Create Square account and begin setup process.

---

**Document Status:** Implementation plan approved
**Date:** November 30, 2025
**Stakeholders:** Tyler & Sadie Woodley
**Implementation Owner:** Tyler
**Timeline:** Begin Week of December 1, 2025
