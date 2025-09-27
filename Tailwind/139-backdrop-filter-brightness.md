# backdrop-filter: brightness()

Utilities for applying backdrop brightness filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-brightness-50 and backdrop-brightness-100 to control an element's backdrop brightness:
backdrop-brightness-50
backdrop-brightness-150
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-brightness-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-brightness-150 ..."></div>
</div>

### Untitled

Use the backdrop-brightness-[<value>] syntax to set the backdrop brightness based on a completely custom value:
<div class="backdrop-brightness-[1.75] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-brightness-(<custom-property>) syntax:
<div class="backdrop-brightness-(--my-backdrop-brightness) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-brightness-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: brightness() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-brightness-110 md:backdrop-brightness-150 ...">
<!-- ... -->
</div>
