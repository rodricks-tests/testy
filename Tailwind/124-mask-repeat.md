# mask-repeat

Utilities for controlling the repetition of an element's mask image.

## Untitled

### Untitled

Use the mask-repeat utility to repeat the mask image both vertically and horizontally:
<div class="mask-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-repeat-x utility to only repeat the mask image horizontally:
<div class="mask-repeat-x mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)]..."></div>

### Untitled

Use the mask-repeat-y utility to only repeat the mask image vertically:
<div class="mask-repeat-y mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)]..."></div>

### Untitled

Use the mask-repeat-space utility to repeat the mask image without clipping:
<div class="mask-repeat-space mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-repeat-round utility to repeat the mask image without clipping, stretching if needed to avoid gaps:
<div class="mask-repeat-round mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-no-repeat utility to prevent a mask image from repeating:
<div class="mask-no-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Prefix a mask-repeat utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mask-repeat md:mask-repeat-x ...">
<!-- ... -->
</div>
