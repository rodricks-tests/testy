# mix-blend-mode

Utilities for controlling how an element should blend with the background.
Show more

## Untitled

### Untitled

Use utilities like mix-blend-overlay and mix-blend-soft-light to control how an element's content and background is blended with other content in the same stacking context:
<div class="flex justify-center -space-x-14">
<div class="bg-blue-500 mix-blend-multiply ..."></div>
<div class="bg-pink-500 mix-blend-multiply ..."></div>
</div>

### Untitled

Use the isolate utility on the parent element to create a new stacking context and prevent blending with content behind it:
<div class="isolate flex justify-center -space-x-14">
<div class="bg-yellow-500 mix-blend-multiply ..."></div>
<div class="bg-green-500 mix-blend-multiply ..."></div>
</div>
<div class="flex justify-center -space-x-14">
<div class="bg-yellow-500 mix-blend-multiply ..."></div>
<div class="bg-green-500 mix-blend-multiply ..."></div>
</div>

### Untitled

Prefix a mix-blend-mode utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mix-blend-multiply md:mix-blend-overlay ...">
<!-- ... -->
</div>
