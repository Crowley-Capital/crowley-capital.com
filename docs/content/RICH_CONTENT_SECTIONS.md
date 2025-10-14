# Rich Content Sections

This document outlines the enhanced article sections that the AI will automatically include when generating content. These sections provide depth, visual interest, and actionable value to readers.

## Overview

Articles now include **7 rich content sections** (when relevant to the topic):
1. **Pros & Cons** - Comparison table
2. **Alternatives** - Alternative approaches/solutions
3. **Common Mistakes** - Warning-styled alerts
4. **Troubleshooting** - Problem/solution format
5. **Examples** - Real-world case studies
6. **Checklist** - Actionable items
7. **References** - Sources at the end

## Section Details

### 1. Pros & Cons
**Format:** Always displayed as a table with two columns

**When to use:** 
- Product/service comparisons
- Decision-making content
- Strategy evaluations

**Structure:**
- 5-7 pros and 5-7 cons
- Each row has a pro and con
- Brief explanations for each point
- Balanced and honest perspective

**Visual Design:**
- Green background for pros column (✅)
- Red background for cons column (❌)
- Table with borders and clear headers
- Bold titles with explanation text below

---

### 2. Alternatives
**Format:** Card-based layout

**When to use:**
- When multiple solutions exist
- Comparative articles
- "How to choose" content

**Structure:**
- 3-5 alternative solutions/approaches
- Each has: name, description (2-3 sentences), best use case
- Icon prefix (🔄)

**Visual Design:**
- Light gray background cards
- Border with rounded corners
- Organized spacing between alternatives

---

### 3. Common Mistakes ⚠️
**Format:** Warning cards with icons (ALARMING STYLE)

**When to use:**
- Instructional content
- Best practices articles
- How-to guides

**Structure:**
- 5-7 critical mistakes
- Each includes:
  - ❌ Mistake title
  - Why it's wrong
  - ✅ Correct approach

**Visual Design:**
- **Red background** with red border (alarming)
- Large error icon (❌) on the left
- Solution box with **green left border**
- Drop shadow for emphasis

---

### 4. Troubleshooting
**Format:** Problem/solution pairs

**When to use:**
- Technical content
- Implementation guides
- Debugging articles

**Structure:**
- 5-7 common issues
- Each includes:
  - 🚨 Problem statement
  - Step-by-step solution (numbered list)

**Visual Design:**
- Gray background cards
- Red problem titles
- Numbered solution steps

---

### 5. Examples
**Format:** Detailed case study cards

**When to use:**
- All articles (2-3 examples minimum)
- Demonstration content
- Success stories

**Structure:**
- 2-3 real-world examples
- Each includes:
  - **Context:** The situation
  - **Approach:** What was done
  - **Outcome:** The results

**Visual Design:**
- Blue tinted background
- Clear section headers
- Easy-to-scan format

---

### 6. Checklist
**Format:** Interactive checkboxes (disabled)

**When to use:**
- Implementation guides
- Process documentation
- Action-oriented content

**Structure:**
- 10-15 actionable items
- Organized by phase/category
- Each item is a specific task to complete

**Visual Design:**
- Checkbox icons (disabled for display)
- Organized into categories
- Clear spacing between items

---

### 7. References
**Format:** Numbered list at the end

**When to use:**
- **ALL ARTICLES** (required)

**Structure:**
- Numbered list of sources
- Each includes:
  - Link to source (opens in new tab)
  - Source name
  - Brief description of what it covers

**Visual Design:**
- Separated by border at top
- Standard link styling (black, underlined)
- 📚 Icon in header

---

## AI Implementation

### Content Generation Phase
The AI is instructed to:
- Include relevant sections based on the topic
- Provide raw content for each section
- Follow structural requirements (5-7 items, 2-3 examples, etc.)
- Focus on latest, up-to-date information

### Formatting Phase
The AI is instructed to:
- Apply specific HTML structure for each section type
- Use exact CSS classes from the design system
- Include appropriate icons (emojis for visual appeal)
- Ensure proper spacing and hierarchy

## CSS Classes Reference

All sections use Tailwind CSS and custom classes defined in a dedicated article stylesheet: `apps/web/src/styles/article.css`.

This stylesheet is only loaded on article detail pages (`ArticleDetail.tsx`) to keep the main bundle smaller.

### Key Classes:
- `.article-content` - Main article wrapper
- `.answer-box` - Quick Answer section
- `.pros-cons-section` - Pros/cons container
- `.pros-cons-table` - Table with pros/cons styling
- `.mistake-card` - Warning-styled mistake cards (red background)
- `.alternative-card` - Alternative solution cards
- `.example-card` - Example case study cards (blue background)
- `.checklist-section` - Checklist container
- `.troubleshooting-section` - Troubleshooting container
- `.references-section` - References container
- `.faq-accordion` - FAQ section
- `.key-takeaways` - Key takeaways section

See `apps/web/src/styles/article.css` for full CSS implementation (including responsive and print styles).

## Example Output

When an article is generated, you'll see sections like:

```
Quick Answer → Body Content → Pros & Cons Table → 
Alternatives Cards → Common Mistakes (Warning) → 
Troubleshooting Guide → Real Examples → Checklist → 
FAQ → References
```

Not all sections appear in every article - the AI determines relevance based on the topic.

## Benefits

1. **SEO Value:**
   - Rich snippets potential
   - Better Featured Snippet targeting
   - Increased dwell time

2. **User Experience:**
   - Scannable content
   - Actionable takeaways
   - Visual variety

3. **Authority:**
   - Comprehensive coverage
   - Cited sources
   - Practical guidance

4. **Engagement:**
   - Multiple entry points
   - Different learning styles
   - Interactive elements

## Future Enhancements

Potential additions:
- Video embeds in Examples section
- Interactive checklists (save progress)
- Comparison matrix (advanced Pros & Cons)
- Timeline visualizations
- Infographics

