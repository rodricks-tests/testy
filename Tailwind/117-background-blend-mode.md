# background-blend-mode

Utilities for controlling how an element's background image should blend with its background color.
Show more

## Untitled

### Untitled

Use utilities like bg-blend-difference and bg-blend-saturation to control how the background image and color of an element are blended:
bg-blend-multiply
bg-blend-soft-light
bg-blend-overlay
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div>
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-soft-light ..."></div>
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>

### Untitled

Prefix a background-blend-mode utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-lighten md:bg-blend-darken ...">
<!-- ... -->
</div>
