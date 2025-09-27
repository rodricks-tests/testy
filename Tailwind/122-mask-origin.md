# mask-origin

Utilities for controlling how an element's mask image is positioned relative to borders, padding, and content.

## Untitled

### Untitled

Use utilities like mask-origin-border, mask-origin-padding, and mask-origin-content to control where an element's mask is rendered:
mask-origin-border
mask-origin-padding
mask-origin-content
<div class="mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-origin-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Prefix a mask-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mask-origin-border md:mask-origin-padding ...">
<!-- ... -->
</div>
