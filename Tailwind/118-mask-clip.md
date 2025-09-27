# mask-clip

Utilities for controlling the bounding box of an element's mask.

## Untitled

### Untitled

Use utilities like mask-clip-border, mask-clip-padding, and mask-clip-content to control the bounding box of an element's mask:
mask-clip-border
mask-clip-padding
mask-clip-content
<div class="mask-clip-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-clip-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-clip-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Prefix a mask-clip utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mask-clip-border md:mask-clip-padding ...">
<!-- ... -->
</div>
