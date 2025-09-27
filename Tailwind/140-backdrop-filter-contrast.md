# backdrop-filter: contrast()

Utilities for applying backdrop contrast filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-contrast-50 and backdrop-contrast-100 to control an element's backdrop contrast:
backdrop-contrast-50
backdrop-contrast-200
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-contrast-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-contrast-200 ..."></div>
</div>

### Untitled

Use the backdrop-contrast-[<value>] syntax to set the backdrop contrast based on a completely custom value:
<div class="backdrop-contrast-[.25] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-contrast-(<custom-property>) syntax:
<div class="backdrop-contrast-(--my-backdrop-contrast) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-contrast-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: contrast() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-contrast-125 md:backdrop-contrast-150 ...">
<!-- ... -->
</div>
