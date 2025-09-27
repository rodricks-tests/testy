# backdrop-filter: hue-rotate()

Utilities for applying backdrop hue-rotate filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-hue-rotate-90 and backdrop-hue-rotate-180 to rotate the hue of an element's backdrop:
backdrop-hue-rotate-90
backdrop-hue-rotate-180
backdrop-hue-rotate-270
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-hue-rotate-90 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-hue-rotate-180 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-hue-rotate-270 ..."></div>
</div>

### Untitled

Use utilities like -backdrop-hue-rotate-90 and -backdrop-hue-rotate-180 to set a negative backdrop hue rotation value:
-backdrop-hue-rotate-15
-backdrop-hue-rotate-45
-backdrop-hue-rotate-90
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 -backdrop-hue-rotate-15 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 -backdrop-hue-rotate-90 ..."></div>
</div>

### Untitled

Use the backdrop-hue-rotate-[<value>] syntax to set the backdrop hue rotation based on a completely custom value:
<div class="backdrop-hue-rotate-[3.142rad] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-hue-rotate-(<custom-property>) syntax:
<div class="backdrop-hue-rotate-(--my-backdrop-hue-rotation) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-hue-rotate-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: hue-rotate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-hue-rotate-15 md:backdrop-hue-rotate-0 ...">
<!-- ... -->
</div>
