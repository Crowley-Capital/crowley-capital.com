# Cleanup Recommendations

**Date:** October 7, 2025  
**Status:** Analysis Complete

---

## ✅ Already Cleaned Up

- Supabase integration (fully removed)
- Noble Loop Dashboard, HelpCenter, Index pages (deleted)
- Supabase-dependent components (deleted)
- 13 npm packages removed

---

## 🟡 Optional Cleanup Items

### 1. Unused Noble Loop Components

These components are still in your codebase but may not be actively used:

#### Help Center Components (Likely Unused)
- `/src/components/HelpCategoryList.tsx` - References "Noble Loop"
- `/src/components/HelpArticleView.tsx` - References "Noble Loop"
- `/src/components/HelpArticleList.tsx` - References "Noble Loop"
- `/src/components/HelpSidebar.tsx` - Help center sidebar

**Reason:** The `/help` route was deleted, so these are likely orphaned.

#### Integration Components (Likely Unused)
- `/src/components/ZapierIntegration.tsx` - References "Noble Loop"

#### Generic Noble Loop Components
- `/src/components/AboutSection.tsx`
- `/src/components/CaseStudiesSection.tsx`
- `/src/components/ContactSection.tsx`
- `/src/components/FinalCTA.tsx`
- `/src/components/PricingSection.tsx`
- `/src/components/ServicesSection.tsx`
- `/src/components/TestimonialsSection.tsx`
- `/src/components/ValueProps.tsx`
- `/src/components/About.tsx`
- `/src/components/CaseStudies.tsx`
- `/src/components/Contact.tsx`
- `/src/components/Expertise.tsx`
- `/src/components/ExpertiseCard.tsx`
- `/src/components/Features.tsx`
- `/src/components/Hero.tsx`
- `/src/components/Insights.tsx`
- `/src/components/LandingHero.tsx`
- `/src/components/Logo.tsx`
- `/src/components/Process.tsx`
- `/src/components/ServicesOverview.tsx`
- `/src/components/Testimonials.tsx`

**Used By:** Pricing, Contact, ProductCoach pages

---

### 2. Pages Using Noble Loop Components

These pages still exist and use Noble Loop branding:

#### `/src/pages/Pricing.tsx`
- Uses: `Navbar`, `Footer`, `Pricing` component
- Status: ⚠️ Active route (`/pricing`)
- Branding: Noble Loop

#### `/src/pages/Contact.tsx`
- Uses: `Navbar`, `Footer`, `Contact` component
- Status: ⚠️ Active route (`/contact`)
- Branding: Noble Loop

#### `/src/pages/ProductCoach.tsx`
- Uses: `Navbar`, `Footer`, and many Noble Loop sections
- Status: ⚠️ Active route (`/product-coach`)
- Branding: Noble Loop

---

### 3. Generic Components (Keep)

These are likely used by Crowley Capital:

- `/src/components/Footer.tsx` - Generic footer (used by Noble Loop pages)
- `/src/components/Header.tsx` - Generic header
- `/src/components/ConsultationCalendar.tsx` - Booking calendar
- `/src/components/ConsultationCalendarDialog.tsx` - Calendar dialog
- `/src/components/AIAssistant.tsx` - Generic AI assistant (not Supabase)

---

## 📋 Recommended Actions

### Option A: Keep Everything (Minimal Cleanup)
**Status:** ✅ Already done
- Supabase removed
- Site functional
- No further action needed

**Pros:**
- No additional work
- Pricing/Contact/ProductCoach pages still work

**Cons:**
- Mixed branding (Crowley Capital + Noble Loop)
- Unused components taking up space
- Confusing codebase

---

### Option B: Remove Unused Components (Moderate Cleanup)

**Delete these unused components:**

```bash
# Help Center components (unused - /help route deleted)
rm src/components/HelpCategoryList.tsx
rm src/components/HelpArticleView.tsx
rm src/components/HelpArticleList.tsx
rm src/components/HelpSidebar.tsx

# Integration components (unused)
rm src/components/ZapierIntegration.tsx
```

**Result:** Removes ~5 files, ~500-1000 lines of code

**Pros:**
- Cleaner codebase
- Removes definitively unused code

**Cons:**
- Minimal impact (small files)

---

### Option C: Full Cleanup (Recommended)

**Step 1: Decide on Pricing/Contact/ProductCoach pages**

**If you DON'T need these pages:**
```bash
# Delete the pages
rm src/pages/Pricing.tsx
rm src/pages/Contact.tsx
rm src/pages/ProductCoach.tsx

# Delete their components
rm src/components/AboutSection.tsx
rm src/components/CaseStudiesSection.tsx
rm src/components/ContactSection.tsx
rm src/components/FinalCTA.tsx
rm src/components/PricingSection.tsx
rm src/components/ServicesSection.tsx
rm src/components/TestimonialsSection.tsx
rm src/components/ValueProps.tsx
rm src/components/About.tsx
rm src/components/CaseStudies.tsx
rm src/components/Contact.tsx
rm src/components/Expertise.tsx
rm src/components/ExpertiseCard.tsx
rm src/components/Features.tsx
rm src/components/Hero.tsx
rm src/components/Insights.tsx
rm src/components/LandingHero.tsx
rm src/components/Logo.tsx
rm src/components/Process.tsx
rm src/components/ServicesOverview.tsx
rm src/components/Testimonials.tsx
rm src/components/Navbar.tsx
rm src/components/Footer.tsx

# Delete unused Help components
rm src/components/HelpCategoryList.tsx
rm src/components/HelpArticleView.tsx
rm src/components/HelpArticleList.tsx
rm src/components/HelpSidebar.tsx
rm src/components/ZapierIntegration.tsx

# Remove routes from App.tsx
# (remove /pricing, /contact, /product-coach)
```

**Result:** 
- Removes ~30 files
- Removes ~3,000-5,000 lines of code
- Pure Crowley Capital codebase

**If you DO need these pages:**
- Keep them as-is (they work fine)
- Or rebrand them to Crowley Capital (change "Noble Loop" to "Crowley Capital")

---

### Option D: Rebrand Noble Loop Pages (If Keeping)

**Update these files to say "Crowley Capital" instead of "Noble Loop":**

1. `/src/components/Navbar.tsx` - Line 52: Change "Noble Loop" to "Crowley Capital"
2. `/src/components/HelpCategoryList.tsx` - Update references
3. `/src/components/HelpArticleView.tsx` - Update references
4. `/src/components/HelpArticleList.tsx` - Update references
5. `/src/components/ZapierIntegration.tsx` - Update references

**Result:** Consistent branding across all pages

---

## 🎯 My Recommendation

**For a clean Crowley Capital site:**

1. **Delete unused Help components** (they're orphaned)
2. **Decide on Pricing/Contact/ProductCoach:**
   - If you need them → Keep them (they work)
   - If you don't → Delete them + their components
3. **If keeping them:** Update "Noble Loop" to "Crowley Capital" in Navbar

**Quick Command (Delete Unused Help Components):**
```bash
cd /Users/antonspromac/crowley-capital.com
rm src/components/HelpCategoryList.tsx \
   src/components/HelpArticleView.tsx \
   src/components/HelpArticleList.tsx \
   src/components/HelpSidebar.tsx \
   src/components/ZapierIntegration.tsx
```

---

## 📊 Current State

**Your site has:**
- ✅ Crowley Capital homepage (`/`)
- ✅ Articles system (`/articles`, `/articles/:id`)
- ✅ Admin panel (`/admin`)
- ⚠️ Noble Loop pages (`/pricing`, `/contact`, `/product-coach`)

**Component count:**
- Total: 96 components
- Crowley Capital specific: ~20 (in `/src/components/CCV/`)
- UI components: 52 (in `/src/components/ui/`)
- Noble Loop components: ~24 (various)

---

## ❓ Questions for You

1. **Do you need the Pricing page?** (`/pricing`)
2. **Do you need the Contact page?** (`/contact`)
3. **Do you need the Product Coach page?** (`/product-coach`)

**If YES to any:**
- Keep them as-is (they work fine)
- Optional: Rebrand "Noble Loop" to "Crowley Capital"

**If NO to all:**
- I can delete them + all their components
- This will give you a pure Crowley Capital codebase

---

## 🔍 How to Check What's Used

Run this to see which components are imported:
```bash
cd /Users/antonspromac/crowley-capital.com
grep -r "import.*from.*@/components" src/pages --include="*.tsx" | sort | uniq
```

---

**Let me know what you'd like to do!**
