# backdrop-filter: invert()

Utilities for applying backdrop invert filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-invert and backdrop-invert-65 to control the color inversion of an element's backdrop:
backdrop-invert-0
backdrop-invert-65
backdrop-invert
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-invert-0 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-invert-65 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-invert ..."></div>
</div>

### Untitled

Use the backdrop-invert-[<value>] syntax to set the backdrop inversion based on a completely custom value:
<div class="backdrop-invert-[.25] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-invert-(<custom-property>) syntax:
<div class="backdrop-invert-(--my-backdrop-inversion) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-invert-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: invert() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-invert-0 md:backdrop-invert ...">
<!-- ... -->
</div>
