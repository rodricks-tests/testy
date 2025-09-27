# backdrop-filter: sepia()

Utilities for applying backdrop sepia filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-sepia and backdrop-sepia-50 to control the sepia effect applied to an element's backdrop:
backdrop-sepia-0
backdrop-sepia-50
backdrop-sepia
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-sepia-0 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-sepia-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-sepia ..."></div>
</div>

### Untitled

Use the backdrop-sepia-[<value>] syntax to set the backdrop sepia based on a completely custom value:
<div class="backdrop-sepia-[.25] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-sepia-(<custom-property>) syntax:
<div class="backdrop-sepia-(--my-backdrop-sepia) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-sepia-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: sepia() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-sepia md:backdrop-sepia-0 ...">
<!-- ... -->
</div>
