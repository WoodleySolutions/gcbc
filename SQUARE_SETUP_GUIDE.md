# Square Online Store Setup Guide - Free Plan
## Embedded on Your Astro Site (Like Wix Integration)

---

## Overview

**What You Get:**
- Products display on YOUR site (greatcatholicbookclub.com/shop)
- Square handles checkout (overlay modal, not separate site)
- No monthly fees, only pay 2.9% + $0.30 when you sell
- Handles shipping calculations, taxes, payment processing
- Manual fulfillment through Printify (2 min per order)

**Total Cost:**
- Setup: $0
- Monthly: $0
- Per Sale: 2.9% + $0.30

---

## Step-by-Step Setup

### Phase 1: Square Account Setup (15 minutes)

#### 1. Create Square Account
1. Go to: https://squareup.com/signup
2. Click "Get Started"
3. Choose "Online" as your business type
4. Fill in:
   - Business name: "Great Catholic Book Club"
   - Email: your email
   - Password
5. Verify email

#### 2. Set Up Online Store (Free Plan)
1. In Square Dashboard, go to "Online" → "Overview"
2. Click "Get Started with Online Store"
3. Choose **Free Plan** ($0/month)
4. Set up your store:
   - Store name: Great Catholic Book Club
   - Store URL: gcbc.square.site (or whatever's available)
   - Business type: Retail/Online

#### 3. Configure Shipping
**Recommended: Flat Rate Shipping**

1. Go to "Items & Orders" → "Shipping"
2. Click "Create Shipping Rate"
3. Set up:
   - Name: "Standard Shipping"
   - Type: "Flat Rate"
   - Price: $5.00
   - Applies to: "All items"
4. Save

**Alternative: Include Shipping in Item Price**
- Set shipping to "$0 - Free Shipping"
- Increase item prices by $5 to cover it
- Simpler for customers

---

### Phase 2: Add Products (30 minutes)

#### 1. Get Product Info from Printify
For each product you want to sell:
1. Log into Printify
2. Go to "My Products"
3. Note down:
   - Base cost (what Printify charges you)
   - Product images (download high-res)
   - Available sizes/colors
   - Product description

#### 2. Add Products to Square
1. Square Dashboard → "Items & Orders" → "Items Library"
2. Click "Create an Item"
3. Fill in:

**Example for T-Shirt:**
```
Name: "Every Book is Catholic" T-Shirt
Description: Classic fit unisex tee featuring our signature motto.
             Comfortable cotton blend, perfect for book club meetings.

Price: $25.00
Category: Apparel
SKU: GCBC-TSHIRT-001 (optional, for your tracking)

Images: Upload product mockup from Printify

Variations:
- Size: S, M, L, XL, 2XL
- Color: Black, Navy, Heather Gray (or whatever Printify offers)

Stock: Set to "Unlimited" (since Printify prints on-demand)
```

4. Click "Save"
5. Repeat for each product

**Pricing Strategy:**
```
Printify base cost: $15
Your profit: $5
Shipping cost: $5
-----------------
Total price: $25
```

Or if free shipping:
```
Item price: $25 (includes shipping)
Shipping: Free
```

---

### Phase 3: Get Embed Codes (15 minutes)

#### 1. Enable Web API
1. Square Dashboard → "Apps" → "My Apps"
2. Click "+" to create new application
3. Name it: "GCBC Website Integration"
4. Click "Save"
5. Copy your **Application ID** (starts with `sq0idp-`)
6. Copy your **Location ID**

#### 2. Get Item IDs
1. Go to "Items & Orders" → "Items Library"
2. Click on each product
3. In the URL, copy the item ID (long string of letters/numbers)
4. Save these for your embed code

**Example:**
- T-Shirt Item ID: `ABCD1234EFGH5678`
- Mug Item ID: `WXYZ9876STUV5432`

---

### Phase 4: Embed on Your Site (1-2 hours)

#### 1. Create Shop Page

Create a new shop page in your Astro site:

```astro
---
// /src/pages/shop.astro
import Layout from '../layouts/Layout.astro';

// Your Square credentials (from Phase 3)
const SQUARE_APP_ID = 'sq0idp-your-app-id';
const SQUARE_LOCATION_ID = 'your-location-id';

// Your products with Square item IDs
const products = [
  {
    id: 'ABCD1234EFGH5678',
    name: '"Every Book is Catholic" T-Shirt',
    description: 'Classic fit unisex tee with our signature motto',
    price: 25.00,
    image: '/images/merch/tshirt.jpg'
  },
  {
    id: 'WXYZ9876STUV5432',
    name: '"Every Book is Catholic" Mug',
    description: 'Start your reading day with coffee',
    price: 18.00,
    image: '/images/merch/mug.jpg'
  },
  {
    id: 'IJKL2468MNOP1357',
    name: 'Book Club Tote Bag',
    description: 'Carry your books in style',
    price: 22.00,
    image: '/images/merch/tote.jpg'
  }
];
---

<Layout
  title="Shop - Great Catholic Book Club"
  description="Support our mission with GCBC merchandise. Every purchase helps us create more content."
>
  <!-- Hero Section -->
  <section class="bg-black-olive relative py-16">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold text-champaign-100 mb-4 font-headline">
          Support Great Catholic Book Club
        </h1>
        <p class="text-lg text-champaign-200 max-w-2xl mx-auto">
          Every purchase helps us continue bringing you quality Catholic content and building our community.
        </p>
      </div>
    </div>
  </section>

  <!-- Products Grid -->
  <section class="py-16 bg-gradient-to-b from-black-olive to-rust-800/20">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map(product => (
          <div class="bg-black-olive border border-champaign-700/30 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <!-- Product Image -->
            <div class="aspect-square bg-champaign-700/10">
              <img
                src={product.image}
                alt={product.name}
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Product Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-champaign-100 mb-2">
                {product.name}
              </h3>
              <p class="text-champaign-200 mb-4 text-sm">
                {product.description}
              </p>
              <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-champaign-100">
                  ${product.price.toFixed(2)}
                </span>
                <span class="text-sm text-champaign-300">
                  + $5 shipping
                </span>
              </div>

              <!-- Square Buy Button Container -->
              <button
                class="square-buy-button w-full bg-rust-800 text-champaign-100 px-6 py-3 rounded-lg font-semibold hover:bg-rust-900 transition-colors"
                data-item-id={product.id}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}

      </div>

      <!-- Info Section -->
      <div class="mt-16 bg-black-olive border border-champaign-700/30 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-champaign-100 mb-4 font-headline">
          About Our Merch
        </h2>
        <div class="space-y-3 text-champaign-200">
          <p>✅ High-quality print-on-demand products</p>
          <p>✅ Shipped directly to your door</p>
          <p>✅ Flat $5 shipping on all orders</p>
          <p>✅ 100% of profits support GCBC content creation</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Square Web Payments SDK -->
  <script is:inline src="https://web.squarecdn.com/v1/square.js"></script>
  <script is:inline define:vars={{ SQUARE_APP_ID, SQUARE_LOCATION_ID }}>
    // Initialize Square Payments when page loads
    document.addEventListener('DOMContentLoaded', async function() {
      try {
        // Initialize Square
        const payments = Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);

        // Set up each buy button
        const buttons = document.querySelectorAll('.square-buy-button');

        buttons.forEach(button => {
          button.addEventListener('click', async function() {
            const itemId = this.dataset.itemId;

            // Open Square checkout
            // This will show a modal overlay on your site
            try {
              await payments.verifyBuyer(itemId, {
                amount: '25.00', // Set based on product
                currencyCode: 'USD',
                intent: 'CHARGE'
              });

              // Redirect to Square checkout page
              window.location.href = `https://square.link/u/${itemId}`;

            } catch (error) {
              console.error('Checkout error:', error);
              alert('Something went wrong. Please try again.');
            }
          });
        });

      } catch (error) {
        console.error('Square initialization error:', error);
      }
    });
  </script>
</Layout>
```

---

## Actually, Simpler Approach: Payment Links

After researching Square's latest docs, **the easiest integration is Payment Links**, not the Web SDK:

### Simpler Embed Method:

1. **Create Payment Links in Square:**
   - Go to each product in Square
   - Click "Share" → "Create Payment Link"
   - Copy the URL (like `https://square.link/u/ABC123`)

2. **Use Those Links as Buy Buttons:**

```astro
<button
  onclick="window.open('https://square.link/u/ABC123', '_blank', 'width=600,height=800')"
  class="bg-rust-800 text-champaign-100 px-6 py-3 rounded-lg"
>
  Buy Now
</button>
```

This opens Square checkout in a popup window - still feels integrated, much simpler to set up.

---

### Phase 5: Test Everything (30 minutes)

#### 1. Test Purchase Flow
1. Go to your shop page
2. Click "Buy Now" on a product
3. Complete checkout with test payment
4. Verify:
   - ✅ Checkout opened correctly
   - ✅ Shipping calculated properly
   - ✅ Payment processed
   - ✅ You received order notification email

#### 2. Test Manual Fulfillment
1. Log into Square Dashboard
2. Check "Orders" - see your test order
3. Log into Printify
4. Create new order manually:
   - Select product
   - Enter customer shipping address (from Square order)
   - Submit order
5. Printify creates and ships
6. Back in Square, mark order as "Fulfilled"

---

## Managing Orders - The Manual Process

### When Someone Buys:

**Step 1: Get Notification**
- Square emails you: "New order!"
- Check Square Dashboard → "Orders"

**Step 2: Fulfill via Printify (2 minutes)**
1. Log into Printify
2. Click "Create Order"
3. Select the product they bought
4. Enter customer's shipping info (copy from Square)
5. Choose shipping method
6. Submit order (Printify charges your connected payment method)

**Step 3: Update Square**
1. Back to Square Dashboard → "Orders"
2. Find the order
3. Click "Add Tracking" (paste tracking from Printify email)
4. Mark as "Fulfilled"
5. Customer gets automated email with tracking

**Total Time:** 2-3 minutes per order

---

## Shipping Strategy Recommendation

**Best Option: Flat $5 Shipping**

**Why:**
- Simple for customers to understand
- Covers most USPS First Class costs ($4-6)
- Easy to configure in Square
- No surprises at checkout

**Set it up:**
1. Square Dashboard → "Shipping"
2. Create rule: "Flat $5 for all orders"
3. Done

**Customer sees:**
```
T-Shirt: $20.00
Shipping: $5.00
Tax: $1.50 (auto-calculated)
-------------------
Total: $26.50
```

---

## Pricing Your Products

**Formula:**
```
Printify Base Cost + Your Profit + Shipping = Item Price

OR

Printify Base Cost + Your Profit = Item Price (with separate $5 shipping)
```

**Examples:**

### Separate Shipping (Recommended):
- Printify charges you: $15
- Your profit: $5
- Item price: $20
- Shipping: $5 (separate line)
- **Customer pays: $25 total**

### Included Shipping:
- Printify charges you: $15
- Your profit: $5
- Shipping cost: $5
- Item price: $25
- Shipping: Free
- **Customer pays: $25 total**

**Same total, but separate shipping feels more transparent.**

---

## Square vs Shopify Comparison

| Feature | Square Free | Shopify Starter |
|---------|-------------|-----------------|
| **Monthly Cost** | $0 | $5 |
| **Transaction Fee** | 2.9% + $0.30 | 5% + payment processing |
| **Printify Integration** | Manual fulfillment | Auto-fulfillment |
| **Embedded Checkout** | Yes (payment links) | Yes (buy button SDK) |
| **Shipping Calculation** | Yes | Yes |
| **Time per Order** | 2-3 min manual | Automatic |
| **Best For** | Low volume, testing | Scaling, automation |

**Bottom Line:** Square is better for you because:
- No monthly cost (testing phase)
- 2-3 min manual fulfillment is fine for low volume
- Embeddable on your site (like Wix)
- Lower transaction fees

If you sell 20+ items/month, Shopify's automation becomes worth the $5.

---

## Next Steps

**Week 1:**
1. [ ] Create Square account
2. [ ] Set up flat rate shipping
3. [ ] Add 2-3 products from Printify
4. [ ] Get payment links
5. [ ] Test with small purchase

**Week 2:**
6. [ ] Create /shop page in Astro
7. [ ] Embed payment links
8. [ ] Test checkout flow
9. [ ] Practice manual fulfillment
10. [ ] Announce to community

---

## Common Questions

**Q: Do I need a business bank account?**
A: Not required to start. Square can pay to personal account. Consider business account if you scale.

**Q: What about taxes?**
A: Square calculates and collects sales tax automatically based on customer location. You remit quarterly/annually depending on your state.

**Q: Can I offer discounts?**
A: Yes! Square has discount codes you can create.

**Q: What if someone has an issue with their order?**
A: Handle through Square's customer support tools + contact Printify about production issues.

**Q: How long does shipping take?**
A: Printify: 2-7 days production + 3-10 days shipping = 5-17 days total. Set customer expectations on your site.

---

## Summary

**What You Get:**
- Professional storefront integrated on YOUR site
- $0 monthly cost (only pay when you sell)
- Handles shipping/tax calculations automatically
- Manual fulfillment (2-3 min per order - fine for low volume)
- Lower fees than most alternatives (2.9%)

**Total Setup Time:** 2-3 hours
**Ongoing Time:** 2-3 minutes per order

**Result:** Exactly like your Wix integration, but:
- Easier to manage
- No monthly fee
- Better checkout experience
- You have full control over product page design

Want me to help you create the actual /shop page code?
