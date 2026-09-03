# Furnish — Design System
**E-Commerce Design System · v1.0 · Deep Plum Edition**

> This document is the single source of truth for colors, typography, spacing, radii, shadows, buttons, badges, forms, icons, breakpoints, and animation for the Furnish storefront. Follow it exactly — do not substitute similar colors, fonts, or sizes.

---

## 1. Brand Ratio

Use brand colors in roughly this proportion across any screen: **60% Primary Plum / 30% Gradient Partner / 10% Action Accent.**

---

## 2. Color Tokens

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--brand-primary` | `#570054` | rgb(87, 0, 84) | Primary brand color (Plum) |
| `--brand-gradient-end` | `#9E1B97` | rgb(158, 27, 151) | Gradient partner (Magenta) |
| `--brand-accent` | `#FF5E36` | rgb(255, 94, 54) | Action accent (Coral) — CTAs, discounts, alerts |
| `--bg-page` | `#FDFBFD` | rgb(253, 251, 253) | Page canvas background |
| `--bg-surface` | `#FFFFFF` | rgb(255, 255, 255) | Card / surface background |
| `--text-main` | `#1A1A1A` | rgb(26, 26, 26) | Primary text color |

### Secondary / supporting colors (used across components)
| Color | Hex | Usage |
|---|---|---|
| Border neutral | `#E8D5E8` | Card borders |
| Border light | `#E4DFD6` | Light borders on white swatches |
| Muted text | `#7C7C86` | Secondary/meta text |
| Input border | `#D4C8D3` | Default input border |
| Placeholder text | `#8A8289` | Input placeholder |
| Disabled bg | `#F5F1F5` / `#E8E0E7` | Disabled surfaces |
| Disabled text | `#A89DA7` | Disabled text |
| Error | `#DC2626` | Error borders/text |
| Success bg / text | `#E5F0E5` / `#3F7A52` | "In Stock" badge |
| Error bg / text | `#FCE8E6` / `#FF5E36` | "Sold Out" badge |
| Category tag bg | `#F3E8F2` | Category chip background |
| Code block bg | `#1A1A1A` | Code/console blocks |
| Code block border | `#2D2D2D` | Code block border |
| Code text (highlight) | `#E5C07B` | Syntax text in code blocks |
| Hover — Primary | `#740C6F` | `--brand-primary` hover (200ms ease) |
| Hover — Accent | `#E5532F` | `--brand-accent` hover |
| Ghost hover | `rgba(87,0,84,0.06)` | Ghost button hover fill |

### Primary Plum opacity scale (over white canvas)
| Opacity | Hex |
|---|---|
| 5% | `#F2E5F2` |
| 10% | `#E5CCE4` |
| 20% | `#CD99CC` |
| 40% | `#9C339B` |
| 60% | `#6A0069` |
| 80% | `#590059` |

### Accent Coral opacity scale (over white canvas)
| Opacity | Hex |
|---|---|
| 10% | `#FFEFEA` |
| 20% | `#FFDFDA` |
| 40% | `#FFBEB4` |

---

## 3. Gradients

| Name | CSS |
|---|---|
| Brand Gradient (Primary → Magenta) | `linear-gradient(135deg, #570054 0%, #9E1B97 100%)` |
| Hero Gradient (Full Spectrum) | `linear-gradient(180deg, #570054 0%, #9E1B97 50%, #FF5E36 100%)` |
| Subtle Surface Gradient | `linear-gradient(180deg, #FDFBFD 0%, #F3E8F2 100%)` |
| Dark Overlay Gradient | `linear-gradient(180deg, rgba(87,0,84,0.9) 0%, rgba(87,0,84,0.4) 100%)` |

---

## 4. Typography

**Font families:** `Roboto` (UI text), `Roboto Mono` (code, labels, specs)

> Font wiring is a single-source decision — see §17. Loaded via `next/font/google` in `src/app/layout.tsx` as `--font-roboto` / `--font-roboto-mono`, mapped to `--font-sans` / `--font-mono` in `globals.css`.

| Role | Size | Line-height | Weight | Letter-spacing | Transform |
|---|---|---|---|---|---|
| Display | 48px | 56px | Bold | -1px | — |
| H1 | 36px | 44px | Bold | -0.5px | — |
| H2 | 28px | 36px | SemiBold | — | — |
| H3 | 22px | 30px | SemiBold | — | — |
| H4 | 18px | 26px | Medium | — | — |
| Body Large | 16px | 24px | Regular | — | — |
| Body | 14px | 22px | Regular | — | — |
| Caption | 12px | 18px | Regular | — | — |
| Overline | 11px | 16px | SemiBold | 1.5px | uppercase |

Main body text color: `#1A1A1A`.

---

## 5. Spacing Scale

| Token | Value | Use for |
|---|---|---|
| `--spacing-2xs` | 4px | Inline elements, text micro-adjustments |
| `--spacing-xs` | 8px | Inside badges, tight button items, small gaps |
| `--spacing-sm` | 12px | Button interior, form field spacing |
| `--spacing-md` | 16px | Card padding, general grid gaps |
| `--spacing-lg` | 20px | Standard block margins, layout groups |
| `--spacing-xl` | 24px | Section item gaps, hero margins |
| `--spacing-2xl` | 32px | Container padding, major block offsets |
| `--spacing-3xl` | 48px | Outer section headers, desktop grid offsets |
| `--spacing-4xl` | 64px | Mega section block padding, page outer margin |

---

## 6. Border Radius

| Token | Value | Use for |
|---|---|---|
| `--radius-sm` | 4px | Inputs, checkboxes, mini-badges |
| `--radius-md` | 8px | Cards, primary buttons, content blocks |
| `--radius-lg` | 12px | Modals, side drawers, hero blocks |
| `--radius-xl` | 16px | Feature promo cards, outer boxes |
| `--radius-full` | 9999px | Badges, round pills, avatars |

---

## 7. Elevation / Shadows

| Level | CSS |
|---|---|
| Level 1 — Subtle (Cards) | `box-shadow: 0 2px 4px rgba(87,0,84,0.06);` |
| Level 2 — Medium (Dropdowns) | `box-shadow: 0 4px 12px rgba(87,0,84,0.10);` |
| Level 3 — Strong (Modals) | `box-shadow: 0 8px 24px rgba(87,0,84,0.14);` |

---

## 8. Buttons

| Variant | Background | Text Color | Border | Notes |
|---|---|---|---|---|
| Primary Default | `#570054` | `#FFFFFF` | none | Hover → `#740C6F` (200ms ease) |
| Secondary / Outline | transparent | `#570054` | `1.5px solid #570054` | padding `11px 23px` |
| Accent Action | `#FF5E36` | `#FFFFFF` | none | Hover → `#E5532F`; padding `12px 24px` |
| Ghost | transparent | `#570054` | none | Hover fill → `rgba(87,0,84,0.06)`; padding `12px 24px` |
| Disabled | `#E8E0E7` | `#A89DA7` | none | padding `12px 24px` |

**Sizing & behavior:**
- Height: fixed **44px**
- Min-width: **120px**
- Sizing: auto-hug content
- Border radius: `--radius-md` (8px equivalent, rendered at 6px in button previews)
- Font: `Geist SemiBold`, 15px
- Transitions: `background-color 200ms ease`

---

## 9. Badges & Tags

| Type | Background | Text | Style |
|---|---|---|---|
| Discount Badge | `#FF5E36` | white | 11px bold, `radius-full` (9999px) |
| Category Tag | `#F3E8F2` | `#570054` | 12px medium, `radius-sm/md` (6px) |
| Status — In Stock | `#E5F0E5` | `#3F7A52` | 11px semibold |
| Status — Sold Out | `#FCE8E6` | `#FF5E36` | 11px semibold |
| Status — New Arrival | Brand Gradient fill | white | 11px semibold |

---

## 10. Form Elements

| State | Background | Border | Text |
|---|---|---|---|
| Default | `#FFFFFF` | `1px solid #D4C8D3` | placeholder `#8A8289` |
| Focused | `#FFFFFF` | `2px solid #570054` | + `box-shadow: 0 0 3px rgba(87,0,84,0.1)` |
| Error | `#FFFFFF` | `2px solid #DC2626` | label color `#DC2626` |
| Disabled | `#F5F1F5` | `1px solid #E8E0E7` | text/placeholder `#A89DA7` |

- Padding: `12px 16px` (default/disabled), `11px 15px` (focused/error, to offset thicker border)
- Border radius: `radius-md` (8px)
- Search input: icon + text, `gap: 12px`
- Quantity stepper: 3-cell flex row (minus / value / plus), each cell `flex: 1`, dividers between cells, buttons in `#570054`

---

## 11. Icons

**Icon library: `hugeicons`** (`hugeicons-react`) — the canonical icon set for this project.

> Icon wiring is a single-source decision — see §17. All components import icons from `src/lib/icons.ts` (canonical alias module), never from the library directly.

| Grid | Stroke weight | Use for |
|---|---|---|
| 16px | 1.5px | Micro inline items / details |
| 20px | 1.5px | Buttons inner, standard inputs |
| 24px | 2.0px | Primary navigation bar icons |
| 32px | 2.0px | Feature showcase highlighting |

---

## 12. Responsive Breakpoints

| Range | Viewport | Grid |
|---|---|---|
| Mobile | 0px – 639px | 1 column |
| Tablet | 640px – 1023px | 2 columns |
| Desktop | 1024px – 1279px | 3 columns |
| Wide Desktop | 1280px+ | 4 columns |

---

## 13. Animation & Transitions

| Interaction | Timing |
|---|---|
| Button hover | `transition: background 0.2s ease;` |
| Modal transitions | `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);` |
| Dropdown selections | `transition: opacity 0.2s ease-out;` |
| Page flow navigation | `transition: transform 0.4s ease-in-out;` |
| Toast enter/exit | `transition: transform 0.3s ease, opacity 0.2s ease;` (300ms enter / 200ms exit) |

---

## 14. CSS Custom Properties (drop-in)

```css
:root {
  /* Brand color tokens */
  --brand-primary: #570054;
  --brand-gradient-end: #9E1B97;
  --brand-accent: #FF5E36;
  --bg-page: #FDFBFD;
  --bg-surface: #FFFFFF;
  --text-main: #1A1A1A;

  /* Composed background patterns */
  --bg-brand-gradient: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-gradient-end) 100%);

  /* Layout scale variables */
  --spacing-2xs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 20px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;

  /* Border radius variables */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Drop shadow configurations */
  --shadow-sm: 0px 2px 4px rgba(87, 0, 84, 0.06);
  --shadow-md: 0px 4px 12px rgba(87, 0, 84, 0.10);
  --shadow-lg: 0px 8px 24px rgba(87, 0, 84, 0.14);
}
```

---

## 15. Tailwind Config Extension (drop-in)

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#570054',
          magenta: '#9E1B97',
          coral: '#FF5E36',
        },
        surface: {
          canvas: '#FDFBFD',
          alt: '#FFFFFF',
        },
        neutral: {
          dark: '#1A1A1A',
        }
      },
      spacing: {
        '2xs': '4px',
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(87, 0, 84, 0.06)',
        'medium': '0 4px 12px rgba(87, 0, 84, 0.10)',
        'strong': '0 8px 24px rgba(87, 0, 84, 0.14)',
      }
    }
  }
}
```

---

## 16. System Integration Demonstrations (Section A)

> This section of the source file names four components that should be built by composing the tokens above. The source node contains only these labels — no additional colors, sizes, or props beyond what's already defined in §2–§13. Treat these as a build checklist, not new specs.

1. **Active Product Component Instance** — a live product card. Build using: `radius-md` card, Level 1 shadow, `bg-surface` background, category tag (§9), price/typography per Body/H4 roles (§4), Accent Action button (§8).
2. **Loading Skeleton Layout** — a loading placeholder matching the product card's shape/dimensions, using the Primary Plum opacity scale (e.g. 5–10%) for the pulsing/skeleton fill blocks, `radius-md` corners.
3. **Interaction Feedback Toast** — a toast notification. Use Level 2 shadow, `radius-md`, and the toast transition timing from §13 (`transform 0.3s ease, opacity 0.2s ease`, 300ms enter / 200ms exit).
4. **Complete Rendered Review Component Specifications** — a review/rating component. Build using Body/Caption typography (§4), Main Text color, spacing tokens (§5) for internal gaps, and status/tag styling (§9) if displaying verified-purchase or rating badges.

Since the source file doesn't specify exact markup for these four, an implementing agent should treat §1–§15 as the binding spec and use ordinary composition to build these four instances — no colors, spacing, or typography outside the tables above should be introduced.

---

## 17. Decisions & Wiring (single source of truth)

Every design decision maps to a **single edit point**. Change the decision, then edit only that point — the change propagates through the whole project because no component hardcodes these values.

| Decision | Specified in | Single edit point | What consumers use |
|---|---|---|---|
| Brand colors (Plum/Magenta/Coral) | §2 | `furnish-design-system.md` + `:root` in `globals.css` | `--brand-*`, `bg-brand-*` utilities |
| Canvas / surface | §2/§14 | `:root` `--bg-page` / `--bg-surface` | `bg-background`, `bg-card` |
| Supporting colors | §2 | `:root` + `@theme` | semantic shadcn tokens |
| Gradients | §3 | `@theme` (`--gradient-brand`, `--gradient-hero`, …) | `bg-gradient-<name>` utilities |
| Typography roles | §4 | `@theme` (`--text-*`) | HTML semantic + `text-*` roles |
| **Font families** | §4 | `src/app/layout.tsx` (`next/font/google`: Roboto / Roboto Mono) → `--font-sans` / `--font-mono` in `globals.css` | `font-sans`, `font-mono` |
| Spacing scale | §5 | `@theme` (`--spacing-*`) | `p-*`, `m-*`, `gap-*` |
| Border radius | §6 | `@theme` (`--radius-*`) | `rounded-*` |
| Shadows | §7 | `@theme` (`--shadow-sm/md/lg`) | `shadow-sm`, `shadow-md`, `shadow-lg` |
| Buttons | §8 | `src/components/ui/button.tsx` (cva variants) | `<Button variant="…">` |
| Badges | §9 | `src/components/ui/badge.tsx` (cva variants) | `<Badge variant="…">` |
| Forms | §10 | Input/label + custom `search-input`, `quantity-stepper` | `<Input>`, `<SearchInput>`, `<QuantityStepper>` |
| **Icon library** | §11 | `src/lib/icons.ts` (canonical alias map) + `components.json` `iconLibrary: "hugeicons"` | icons imported from `@/lib/icons` only |
| Breakpoints | §12 | default breakpoints (sm/md/lg/xl) | responsive grid classes |
| Animation/timing | §13 | component classes + `@theme` easing vars | transition classes, Sonner config |
| §16 demos | §16 | `src/components/demos/*` + `src/app/showcase/page.tsx` | — |

**Swapping a decision later:** update the row's *Specified in* cell and the *Single edit point*, nothing else. Examples:
- Font → Geist: change the `next/font/google` import in `layout.tsx` (and the two mapped vars), update §4.
- Icons → lucide: update the alias map in `src/lib/icons.ts`, update `components.json` `iconLibrary`, update §11.

---

## Quick reference for an agent implementing UI

1. Always pull colors from the token table in §2 — never hardcode a similar-looking hex.
2. Use the Tailwind config in §15 directly, or the CSS variables in §14 if not using Tailwind.
3. Match typography roles (§4) to semantic HTML elements — don't invent new sizes.
4. Use the spacing scale (§5) for all padding/margin/gap values — no arbitrary pixel values.
5. Apply border radius (§6) and shadows (§7) per component type, not per-designer preference.
6. Button, badge, and form specs (§8–10) are exact — copy background/border/padding values as given.
7. Respect breakpoints (§12) for grid column counts.

---

## Canonical Colors (condensed reference)

```
Primary Plum      #570054
Gradient End      #9E1B97
Accent Coral      #FF5E36
Page BG           #FDFBFD
Surface BG        #FFFFFF
Text Main         #1A1A1A

Border            #E8D5E8
Muted Text        #7C7C86
Input Border      #D4C8D3
Placeholder       #8A8289
Disabled BG       #F5F1F5 / #E8E0E7
Disabled Text     #A89DA7
Error             #DC2626
Success BG/Text   #E5F0E5 / #3F7A52
Sold-Out BG/Text  #FCE8E6 / #FF5E36
Category Tag BG   #F3E8F2
Code BG / Border  #1A1A1A / #2D2D2D
Code Text         #E5C07B
Hover Primary     #740C6F
Hover Accent      #E5532F
Ghost Hover       rgba(87,0,84,0.06)
```

Brand ratio: **60% Plum / 30% Magenta / 10% Coral**

Gradients:
```
Brand:    linear-gradient(135deg, #570054 0%, #9E1B97 100%)
Hero:     linear-gradient(180deg, #570054 0%, #9E1B97 50%, #FF5E36 100%)
Surface:  linear-gradient(180deg, #FDFBFD 0%, #F3E8F2 100%)
Overlay:  linear-gradient(180deg, rgba(87,0,84,.9) 0%, rgba(87,0,84,.4) 100%)
```

Transitions:
```
button hover:   background 0.2s ease
modal:          all 0.3s cubic-bezier(0.16,1,0.3,1)
dropdown:       opacity 0.2s ease-out
page nav:       transform 0.4s ease-in-out
toast:          transform 0.3s ease, opacity 0.2s ease
```