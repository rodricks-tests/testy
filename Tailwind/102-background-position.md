# background-position

Utilities for controlling the position of an element's background image.

## Untitled

### Untitled

Use utilities like bg-center, bg-right, and bg-top-left to control the position of an element's background image:
Hover over these examples to see the full image
bg-top-left
bg-top
bg-top-right
bg-left
bg-center
bg-right
bg-bottom-left
bg-bottom
bg-bottom-right
<div class="bg-[url(/img/mountains.jpg)] bg-top-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-top"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-top-right"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-center"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-right"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom"></div>
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-right"></div>

### Untitled

Use the bg-position-[<value>] syntax to set the background position based on a completely custom value:
<div class="bg-position-[center_top_1rem] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the bg-position-(<custom-property>) syntax:
<div class="bg-position-(--my-bg-position) ...">
<!-- ... -->
</div>
This is just a shorthand for bg-position-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a background-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="bg-center md:bg-top ...">
<!-- ... -->
</div>
