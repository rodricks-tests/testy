# backdrop-filter: saturate()

Utilities for applying backdrop saturation filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-saturate-50 and backdrop-saturate-100 utilities to control the saturation of an element's backdrop:
backdrop-saturate-50
backdrop-saturate-125
backdrop-saturate-200
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-saturate-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-saturate-125 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-saturate-200 ..."></div>
</div>

### Untitled

Use the backdrop-saturate-[<value>] syntax to set the backdrop saturation based on a completely custom value:
<div class="backdrop-saturate-[.25] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-saturate-(<custom-property>) syntax:
<div class="backdrop-saturate-(--my-backdrop-saturation) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-saturate-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: saturate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-saturate-50 md:backdrop-saturate-150 ...">
<!-- ... -->
</div>
