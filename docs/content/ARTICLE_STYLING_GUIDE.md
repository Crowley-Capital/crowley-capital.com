# Article Styling Guide

This guide explains how article styling is organized and implemented in the Crowley Capital blog system.

## Architecture Overview

### Separation of Concerns

We use **dedicated CSS files** for different purposes:

1. **`apps/web/src/index.css`** - Global styles
   - Base typography
   - Color system
   - Layout utilities
   - Animation utilities
   - Scrollbar styling
   - Focus states
   - General UI components

2. **`apps/web/src/styles/article.css`** - Article-specific styles
   - Rich content sections (Pros/Cons, Alternatives, etc.)
   - Article typography
   - FAQ accordions
   - Quick Answer boxes
   - References
   - Print styles
   - Mobile responsive adjustments

### Benefits of This Approach

✅ **Performance:** Article CSS only loads on article pages  
✅ **Maintainability:** Clear separation between global and article styles  
✅ **Scalability:** Easy to add new article-specific styles  
✅ **Bundle Size:** Smaller main bundle for homepage/other pages  

---

## File Structure

```
apps/web/src/
├── index.css                    # Global styles (loaded everywhere)
├── styles/
│   └── article.css              # Article styles (loaded on ArticleDetail page only)
└── pages/
    └── ArticleDetail.tsx        # Imports article.css
```

---

## Implementation

### ArticleDetail.tsx

```tsx
import '@/styles/article.css';  // Import article-specific styles
```

This import ensures article styles are only loaded when viewing an article, not on the homepage or other pages.

---

## Article CSS Classes

### Base Article Content

```css
.article-content            /* Main wrapper for article */
.article-content h1         /* Article title */
.article-content h2         /* Major headings */
.article-content h3         /* Minor headings */
.article-content p          /* Paragraphs */
.article-content ul/ol      /* Lists */
.article-content a          /* Links */
.article-content strong     /* Bold text */
.article-content code       /* Inline code */
.article-content blockquote /* Quotes */
```

### Special Sections

```css
.answer-box                 /* Quick Answer (SEO-critical) */
.faq-accordion              /* FAQ section */
.key-takeaways              /* Key takeaways list */
```

### Rich Content Sections

```css
/* Pros & Cons */
.pros-cons-section
.pros-cons-table
.pros-header / .cons-header
.pros-cell / .cons-cell

/* Alternatives */
.alternatives-section
.alternative-card

/* Common Mistakes (Alarming) */
.mistakes-section
.mistake-card               /* Red background, border, shadow */
.mistake-icon               /* Large error icon */
.mistake-content
.mistake-title
.mistake-solution           /* Green left border */

/* Troubleshooting */
.troubleshooting-section
.troubleshooting-item
.problem-title
.solution-steps

/* Examples */
.examples-section
.example-card               /* Blue background */
.example-context / .example-approach / .example-outcome

/* Checklist */
.checklist-section
.checklist-category
.checklist-items
.checklist-item

/* References */
.references-section
.references-list
```

---

## Design Principles

### Color Coding

- **Green** = Positive (Pros, Solutions)
- **Red** = Negative/Warning (Cons, Mistakes, Problems)
- **Blue** = Informative (Examples)
- **Gray** = Neutral (Alternatives, Troubleshooting)

### Visual Hierarchy

1. **Quick Answer** - Most prominent (dark border, larger padding)
2. **Headings** - Clear hierarchy (H2 > H3)
3. **Rich Sections** - Color-coded backgrounds
4. **Body Text** - Readable (slate-700, font-light, large line-height)

### Accessibility

- Minimum 44px touch targets on mobile
- High contrast text (WCAG AA compliant)
- Semantic HTML5 tags
- Screen reader-friendly
- Keyboard navigation support

---

## Responsive Design

### Mobile Adjustments

**Pros/Cons Table:**
- Stacks vertically on mobile
- Adds "Pro:" and "Con:" labels
- Each row becomes a card

**Mistake Cards:**
- Icon moves to top (flex-col)
- Smaller icon size

**All Cards:**
- Reduced padding
- Full-width on mobile

### Print Styles

- Removes colors (grayscale)
- Shows link URLs in parentheses
- Optimizes for paper layout
- Maintains readability

---

## Adding New Section Types

To add a new rich content section:

1. **Add to AI prompt** (`apps/api/src/server.js`)
   - Content generation instructions
   - Formatting template with HTML structure

2. **Add CSS** (`apps/web/src/styles/article.css`)
   - Desktop styles
   - Mobile responsive adjustments
   - Print styles (if needed)

3. **Update documentation** (`RICH_CONTENT_SECTIONS.md`)
   - Section details
   - When to use
   - Structure requirements
   - Visual design notes

---

## Best Practices

### DO ✅

- Use Tailwind utility classes where possible
- Keep custom CSS in `article.css`
- Follow existing color coding
- Add mobile-responsive adjustments
- Include print styles
- Use semantic HTML
- Add appropriate ARIA labels

### DON'T ❌

- Put article styles in `index.css`
- Use inline styles
- Hardcode colors (use Tailwind classes)
- Create overly complex selectors
- Forget mobile testing
- Skip accessibility considerations

---

## Testing Checklist

When adding/modifying article styles:

- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Test on tablet
- [ ] Test print preview
- [ ] Verify color contrast (WCAG AA)
- [ ] Check keyboard navigation
- [ ] Test with screen reader
- [ ] Verify bundle size impact
- [ ] Check load performance

---

## Related Documentation

- `RICH_CONTENT_SECTIONS.md` - Details on each section type
- `apps/web/src/styles/article.css` - Full CSS implementation
- `apps/api/src/server.js` - AI prompt formatting instructions
- `.cursorrules` - Project coding standards

---

## Maintenance

### Regular Tasks

- Review unused CSS (quarterly)
- Optimize bundle size (ongoing)
- Update mobile breakpoints as needed
- Keep Tailwind classes consistent
- Monitor performance metrics

### Future Enhancements

- Dark mode support for articles
- Interactive checklist (save progress)
- Syntax highlighting for code blocks
- Expandable/collapsible sections
- Table of contents (auto-generated)
- Reading progress indicator

