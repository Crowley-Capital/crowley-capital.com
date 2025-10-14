# Rich Content Section Randomization

## Overview
Implemented rule-based logic to randomly select exactly 2 rich content sections for each generated article, ensuring variety and preventing content bloat.

## Problem
Previously, the AI was instructed to include multiple rich content sections but wasn't following the limit, often including 3+ sections (e.g., Pros & Cons, Alternatives, and Common Mistakes in the same article).

## Solution
Implemented deterministic backend logic that:
1. **Randomly selects 2 sections** at generation time
2. **Only provides instructions** for those 2 selected sections
3. **Removes confusion** by not showing the AI all 6 options

## Available Rich Content Sections
Each article will include exactly 2 of these 6 options:

1. **PROS & CONS TABLE** - Balanced comparison with 5-7 pros and cons
2. **ALTERNATIVES SECTION** - 3-5 alternative solutions with use cases
3. **COMMON MISTAKES SECTION** - 5-7 critical mistakes to avoid (alarming design)
4. **TROUBLESHOOTING SECTION** - Problem/solution format for common issues
5. **EXAMPLES SECTION** - 2-3 detailed real-world examples
6. **CHECKLIST SECTION** - Actionable 10-15 item checklist

## Technical Implementation

### Location
`apps/api/src/server.js` - Article generation endpoint

### How It Works
```javascript
// 1. Define all available sections with content + format instructions
const availableSections = [
  { name: 'PROS_CONS', contentInstructions: '...', formatInstructions: '...' },
  { name: 'ALTERNATIVES', contentInstructions: '...', formatInstructions: '...' },
  // ... etc
];

// 2. Randomly shuffle and select 2
const shuffled = availableSections.sort(() => Math.random() - 0.5);
const selectedSections = shuffled.slice(0, 2);

// 3. Build instructions only for selected sections
const selectedContentInstructions = selectedSections.map(s => s.contentInstructions).join('\n\n');
const selectedFormatInstructions = selectedSections.map(s => s.formatInstructions).join('\n\n');

// 4. Inject into prompts
// - Content generation prompt uses selectedContentInstructions
// - Formatting prompt uses selectedFormatInstructions
```

### Console Logging
The server logs which sections were randomly selected:
```
🎲 Randomly selected sections: EXAMPLES, COMMON_MISTAKES
```

## Benefits
✅ **Deterministic** - Backend controls exactly what gets included  
✅ **Variety** - Each article has a different combination  
✅ **Focused** - Articles stay concise and relevant  
✅ **No AI confusion** - AI only sees instructions for selected sections  
✅ **Consistent** - Both content generation and formatting use the same selections

## Testing
To verify it's working:
1. Generate multiple articles
2. Check the backend logs for the selected sections
3. Verify each article has exactly 2 rich content sections
4. Confirm the sections match what was logged

## Related Files
- `/apps/api/src/server.js` - Main implementation (lines 210-518)
- `/apps/web/src/styles/article.css` - Section styling
- `/docs/content/SECTION_EXAMPLES.md` - Section templates and examples

## Date Implemented
October 14, 2025

