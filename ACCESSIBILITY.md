# Accessibility Improvements

## Modal
- Added `role="dialog"` and `aria-modal="true"`.
- Focus is trapped inside modal while open.
- Escape key closes modal.
- Focus returns to triggering marker after close.

## Timeline Markers
- Rendered as `<button>` elements for native keyboard focus/activation.
- Used `aria-current="true"` on active marker.

## Keyboard Navigation
- Markers reachable via Tab.
- Modal closable via Esc.
- Optional Arrow keys can be added for timeline navigation.

## Colour Contrast
- Verified text/background colour contrast ≥ 4.5:1 (WCAG AA).
- Dark/light theme colours meet contrast requirements.

## Other WCAG
- All interactive elements have visible focus styles.
- Images include descriptive `alt` attributes.
