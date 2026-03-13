# H2 Personal Website Design System

## Overview

This design system documents the visual language currently implemented in the site.
It is based on the live code in `app/`, `components/`, and `app/globals.css`.

The overall style is:

- editorial
- minimal
- monochrome-first
- soft off-white canvas
- sharp black typography
- muted gray support text
- olive accent used sparingly

## Design Tokens

### Core Colors

- Background: `#f6f7f1`
- Primary text: `#111111`
- Secondary text: `#555555`
- Tertiary text: `#888888`
- Soft label text: `#AAAAAA`
- Accent olive: `#ADB35B`
- Card background: `#E7E3D3`
- Border default: `rgba(0, 0, 0, 0.1)`
- White overlay text: `rgba(255, 255, 255, 0.9)`

### CSS Variables

Defined in [app/globals.css](/Users/hehang/Documents/H2 personal website/app/globals.css):

- `--background: #f6f7f1`
- `--accent: #111111`
- `--text: #111111`
- `--muted: #555555`
- `--radius: 0.5rem`
- `--font-dm-sans`
- `--font-playfair`

## Typography

### Font Families

- Primary sans: `Avenir Next`, fallback to `Segoe UI`, `Helvetica Neue`, `Arial`, `system-ui`
- Editorial serif: `Georgia`, fallback to `Iowan Old Style`, `Times New Roman`
- Mono usage: system monospace stack for counters and utilitarian text

### Type Roles

- Section labels:
  - usually `text-xs`
  - uppercase
  - letter spacing around `0.15em` to `0.25em`
  - medium weight
  - muted gray
- Primary headings:
  - bold
  - uppercase
  - tight tracking
  - typically `text-4xl` to `text-7xl`
- Narrative / editorial body:
  - serif styling where needed
  - larger line height
  - softer tracking
- Body copy:
  - `text-sm` to `text-xl`
  - color `#555555`
  - relaxed line height

### Tone Rules

- Labels should feel technical and understated.
- Main headlines should feel decisive and high-contrast.
- Long-form narrative should feel more editorial than product-marketing.

## Spacing

### Section Rhythm

- Horizontal padding commonly uses `px-6`, `px-8`, `md:px-12`, `md:px-20`
- Vertical section padding commonly uses `py-24`, `py-32`, `py-36`, `pt-32`, `pt-40`
- Most sections use large breathing room and minimal clutter

### Common Layout Widths

- Content wrappers: `max-w-4xl`, `max-w-6xl`
- Full-bleed interaction sections still preserve centered inner content

## Borders and Surfaces

- Borders are thin and subtle:
  - `border-black/10`
  - `border-black/20`
- The visual language prefers outlines over filled UI
- Surfaces are usually:
  - site background `#f6f7f1`
  - dark feature surfaces `#111111`
  - muted card surface `#E7E3D3`

## Motion

### Motion Character

- smooth but not playful
- cinematic transitions
- slow reveal timing
- scroll-driven storytelling

### Typical Motion Patterns

- opacity + slight translate on entrance
- pinned scroll sections
- text reveal by progress
- hover line expansion
- grayscale-to-focus transitions
- directional transitions with `ease: [0.22, 1, 0.36, 1]`

### Interaction Rule

- Motion should support atmosphere and pacing, not become decorative noise.

## Imagery

- Images are often grayscale or partially desaturated
- Blend and atmosphere matter more than vibrant color
- Hero imagery is treated as an effect layer, not a normal photo block
- Project cards use dark overlays and high-contrast white text

## Components

### Navbar

- Fixed
- transparent until scroll threshold
- becomes soft background glass on scroll
- small uppercase labels
- active section shown through darker text treatment

### Hero

- full-screen
- dark backdrop
- image-as-effect treatment
- single centered statement line

### Narrative Section

- sticky storytelling layout
- serif-led long-form statement
- label on top
- strong CTA outlined in black

### Projects

- radial gallery interaction
- dark photographic cards
- category chip
- project title in white
- state tag uses uppercase utility styling

### Timeline

- horizontal pinned experience
- giant ghosted background wording
- olive progress line
- timeline cards separated with left borders

### Contact

- oversized heading letters
- minimal contact methods
- hover-driven micro-interaction
- strong emphasis on typography over UI chrome

### Footer

- thin top rule
- minimal metadata
- decorative cat element sitting on the border line

## UI Patterns

### Labels

Use:

- uppercase
- extra tracking
- muted gray
- small size

Example pattern:

`// Label`

### Primary CTA

Use:

- black text on light background
- thin border
- uppercase
- wide tracking
- invert to black background on hover

### Link Treatment

Use:

- inherit color
- underline simulated with animated bottom border or width transition

## Accessibility Notes

- High contrast is generally strong on light surfaces
- Gray labels should remain decorative or secondary, not core readable content
- Motion-heavy interactions should remain usable even when animation is delayed

## Implementation Notes

### Source of Truth

- Global tokens: [app/globals.css](/Users/hehang/Documents/H2 personal website/app/globals.css)
- Tailwind theme extensions: [tailwind.config.js](/Users/hehang/Documents/H2 personal website/tailwind.config.js)

### Current Inconsistency

[tailwind.config.js](/Users/hehang/Documents/H2 personal website/tailwind.config.js) still defines some legacy background tokens using `#FAF8F4`, while the site has been updated in actual component styles to `#f6f7f1`.

If you want this design system to be fully clean, the next step should be to align Tailwind theme tokens to the same new background value.

## Recommended Next Step

If you want, I can do one of these next:

1. turn this into a tighter token file and normalize all hard-coded colors
2. create a Figma-style design system spec from this
3. extract reusable UI primitives so the code follows this system more strictly
