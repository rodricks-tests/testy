# mask-position

Utilities for controlling the position of an element's mask image.

## Untitled

### Untitled

Use utilities like mask-center, mask-right, and mask-left-top to control the position of an element's mask image:
mask-top-left
mask-top
mask-top-right
mask-left
mask-center
mask-right
mask-bottom-left
mask-bottom
mask-bottom-right
<div class="mask-top-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-top mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-top-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-center mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
<div class="mask-bottom-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-position-[<value>] syntax to set the mask position based on a completely custom value:
<div class="mask-position-[center_top_1rem] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the mask-position-(<custom-property>) syntax:
<div class="mask-position-(--my-mask-position) ...">
<!-- ... -->
</div>
This is just a shorthand for mask-position-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a mask-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mask-center md:mask-top ...">
<!-- ... -->
</div>
