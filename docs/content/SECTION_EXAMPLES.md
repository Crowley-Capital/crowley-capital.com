# Rich Content Section Examples

Visual reference guide showing HTML structure for each rich content section type.

---

## 1. Pros & Cons Table

**Use case:** Product comparisons, decision-making content, strategy evaluations

```html
<div class="pros-cons-section">
  <h2>Pros & Cons</h2>
  <table class="pros-cons-table">
    <thead>
      <tr>
        <th class="pros-header">✅ Pros</th>
        <th class="cons-header">❌ Cons</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pros-cell">
          <strong>Fast Implementation</strong><br>
          <span class="text-slate-600">Can be deployed in hours, not days</span>
        </td>
        <td class="cons-cell">
          <strong>Higher Costs</strong><br>
          <span class="text-slate-600">Premium pricing compared to alternatives</span>
        </td>
      </tr>
      <tr>
        <td class="pros-cell">
          <strong>Excellent Support</strong><br>
          <span class="text-slate-600">24/7 customer service with fast response times</span>
        </td>
        <td class="cons-cell">
          <strong>Learning Curve</strong><br>
          <span class="text-slate-600">Requires training for advanced features</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Visual:** Green background for pros column, red background for cons column

---

## 2. Alternatives

**Use case:** When multiple solutions exist, comparative articles

```html
<div class="alternatives-section">
  <h2>Alternatives to Consider</h2>
  
  <div class="alternative-card">
    <h3>🔄 Bootstrap Approach</h3>
    <p class="text-slate-700">Self-fund your startup through revenue generation and maintain full control without diluting equity.</p>
    <p class="text-slate-600 text-sm"><strong>Best for:</strong> Businesses with quick path to profitability and low capital requirements.</p>
  </div>
  
  <div class="alternative-card">
    <h3>🔄 Angel Investment</h3>
    <p class="text-slate-700">Raise smaller rounds ($25K-$500K) from individual investors who provide mentorship alongside capital.</p>
    <p class="text-slate-600 text-sm"><strong>Best for:</strong> Early-stage startups needing guidance and validation from experienced entrepreneurs.</p>
  </div>
  
  <div class="alternative-card">
    <h3>🔄 Venture Debt</h3>
    <p class="text-slate-700">Borrow capital based on future revenue projections, preserving equity while accessing growth funds.</p>
    <p class="text-slate-600 text-sm"><strong>Best for:</strong> Companies with predictable revenue streams and strong unit economics.</p>
  </div>
</div>
```

**Visual:** Gray cards with borders, hover effects

---

## 3. Common Mistakes (Alarming)

**Use case:** Instructional content, best practices, how-to guides

```html
<div class="mistakes-section">
  <h2>⚠️ Common Mistakes to Avoid</h2>
  
  <div class="mistake-card warning-card">
    <div class="mistake-icon">❌</div>
    <div class="mistake-content">
      <h3 class="mistake-title">Raising Too Much Too Soon</h3>
      <p class="mistake-description">
        Many founders raise large rounds before validating product-market fit, 
        leading to excessive dilution and unrealistic growth expectations.
      </p>
      <div class="mistake-solution">
        <strong>✅ Instead:</strong> Raise only what you need for the next 12-18 months 
        and focus on hitting key milestones before the next round.
      </div>
    </div>
  </div>
  
  <div class="mistake-card warning-card">
    <div class="mistake-icon">❌</div>
    <div class="mistake-content">
      <h3 class="mistake-title">Ignoring Cap Table Implications</h3>
      <p class="mistake-description">
        Failing to understand how different deal terms affect ownership can leave 
        founders with minimal equity after multiple rounds.
      </p>
      <div class="mistake-solution">
        <strong>✅ Instead:</strong> Model your cap table through multiple rounds 
        and understand the impact of liquidation preferences and anti-dilution clauses.
      </div>
    </div>
  </div>
</div>
```

**Visual:** RED background with red borders, large error icons, drop shadow for emphasis

---

## 4. Troubleshooting

**Use case:** Technical content, implementation guides, debugging

```html
<div class="troubleshooting-section">
  <h2>🔧 Troubleshooting Guide</h2>
  
  <div class="troubleshooting-item">
    <h3 class="problem-title">🚨 Problem: Investors Not Responding to Your Pitch</h3>
    <div class="solution-content">
      <p><strong>Solution:</strong></p>
      <ol class="solution-steps">
        <li>Review your pitch deck for clarity - ensure the problem/solution is clear within 30 seconds</li>
        <li>Personalize each outreach - reference specific portfolio companies or thesis areas</li>
        <li>Lead with traction - put your most impressive metrics in the subject line</li>
        <li>Get warm introductions - cold emails have <5% response rate vs. 40% for warm intros</li>
        <li>Follow up strategically - wait 7 days, add new milestone, keep it brief</li>
      </ol>
    </div>
  </div>
  
  <div class="troubleshooting-item">
    <h3 class="problem-title">🚨 Problem: Term Sheet Terms Seem Unfavorable</h3>
    <div class="solution-content">
      <p><strong>Solution:</strong></p>
      <ol class="solution-steps">
        <li>Hire an experienced startup lawyer to review the terms</li>
        <li>Negotiate on the most important points (valuation, liquidation preference, board seats)</li>
        <li>Use competing offers as leverage if you have multiple term sheets</li>
        <li>Walk away if terms are predatory - a bad deal is worse than no deal</li>
      </ol>
    </div>
  </div>
</div>
```

**Visual:** Gray cards with red problem headers

---

## 5. Examples

**Use case:** All articles (2-3 examples minimum), demonstration content

```html
<div class="examples-section">
  <h2>💡 Real-World Examples</h2>
  
  <div class="example-card">
    <h3>Example 1: Airbnb's Y Combinator Pivot</h3>
    <p class="example-context">
      <strong>Context:</strong> Airbnb was struggling with low traction and running 
      out of money when they applied to Y Combinator in 2009.
    </p>
    <p class="example-approach">
      <strong>Approach:</strong> They pivoted from air mattresses to entire homes, 
      improved their photos, and focused on creating memorable experiences for hosts 
      and guests. YC's mentorship helped them refine their model.
    </p>
    <p class="example-outcome">
      <strong>Outcome:</strong> The company grew from near-bankruptcy to a $75 billion 
      valuation, proving that the right investors can provide more than just capital.
    </p>
  </div>
  
  <div class="example-card">
    <h3>Example 2: Stripe's Focus on Developer Experience</h3>
    <p class="example-context">
      <strong>Context:</strong> In 2011, online payments were notoriously difficult 
      to integrate, requiring weeks of developer time.
    </p>
    <p class="example-approach">
      <strong>Approach:</strong> Stripe raised $2M from Peter Thiel and others to 
      build a developer-first API that could be integrated in 15 minutes. They used 
      the funding to perfect the product before scaling marketing.
    </p>
    <p class="example-outcome">
      <strong>Outcome:</strong> Stripe is now valued at $95 billion and processes 
      hundreds of billions in transactions annually, validating their patient approach 
      to product development.
    </p>
  </div>
</div>
```

**Visual:** BLUE background cards with structured format

---

## 6. Checklist

**Use case:** Implementation guides, process documentation, action-oriented content

```html
<div class="checklist-section">
  <h2>✅ Action Checklist</h2>
  
  <div class="checklist-category">
    <h3>Phase 1: Preparation</h3>
    <ul class="checklist-items">
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Create a compelling pitch deck (10-15 slides maximum)</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Build financial model with 3-year projections</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Set up a clean cap table with proper documentation</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Prepare one-pager with key metrics and traction</span>
      </li>
    </ul>
  </div>
  
  <div class="checklist-category">
    <h3>Phase 2: Outreach</h3>
    <ul class="checklist-items">
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Research 50+ relevant investors and their portfolio companies</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Request warm introductions from advisors and founders</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Personalize each outreach email with specific references</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Set up a CRM to track all investor interactions</span>
      </li>
    </ul>
  </div>
  
  <div class="checklist-category">
    <h3>Phase 3: Closing</h3>
    <ul class="checklist-items">
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Negotiate term sheet with legal counsel</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Complete due diligence documentation</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Sign final agreements and close the round</span>
      </li>
      <li class="checklist-item">
        <input type="checkbox" disabled> 
        <span>Announce the funding and update stakeholders</span>
      </li>
    </ul>
  </div>
</div>
```

**Visual:** Checkboxes (disabled for display), organized by category

---

## 7. References

**Use case:** ALL ARTICLES (required)

```html
<div class="references-section">
  <h2>📚 References & Sources</h2>
  <ol class="references-list">
    <li>
      <a href="https://www.ycombinator.com/library" target="_blank" rel="noopener">
        Y Combinator Startup Library
      </a> - Comprehensive guides on fundraising and startup strategy
    </li>
    <li>
      <a href="https://www.saastr.com/resources/" target="_blank" rel="noopener">
        SaaStr Resources
      </a> - Expert insights on SaaS metrics and fundraising
    </li>
    <li>
      <a href="https://nvca.org/research/venture-monitor/" target="_blank" rel="noopener">
        NVCA Venture Monitor
      </a> - Latest venture capital data and trends (Q3 2025)
    </li>
    <li>
      <a href="https://www.nfx.com/post/valuation-best-practices" target="_blank" rel="noopener">
        NFX Valuation Best Practices
      </a> - How to think about startup valuation
    </li>
    <li>
      <a href="https://stripe.com/atlas/guides" target="_blank" rel="noopener">
        Stripe Atlas Guides
      </a> - Legal and financial frameworks for startups
    </li>
  </ol>
</div>
```

**Visual:** Numbered list with underlined links, separated by top border

---

## Mobile Responsive Notes

### Pros & Cons Table (Mobile)
- Switches from 2-column table to stacked cards
- Adds "Pro:" and "Con:" labels automatically
- Each row becomes an independent card

### Mistake Cards (Mobile)
- Icon moves from left to top
- Icon size reduces from 4xl to 3xl
- Flex direction changes from row to column

### All Cards (Mobile)
- Reduced padding (p-6 → p-4)
- Full width with proper margins
- Touch-friendly (44px minimum target size)

---

## Print Styles

All sections are print-optimized:
- Colors convert to grayscale borders
- Links show URLs in parentheses
- Backgrounds are lightened for ink savings
- Page breaks avoided within cards
- Checkboxes render as empty squares

---

## Accessibility Features

- ✅ Semantic HTML5 tags (sections, articles, lists)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast text (WCAG AA compliant)
- ✅ Screen reader-friendly structure
- ✅ Focus indicators on all interactive elements

---

**For full CSS implementation, see:** `apps/web/src/styles/article.css`

