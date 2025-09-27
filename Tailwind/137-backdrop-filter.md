# backdrop-filter

Utilities for applying backdrop filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-blur-xs and backdrop-grayscale to apply filters to an element's backdrop:
backdrop-blur-xs
backdrop-grayscale
combined
<div class="bg-[url(/img/mountains.jpg)] ...">
<div class="backdrop-blur-xs ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)] ...">
<div class="backdrop-grayscale ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)] ...">
<div class="backdrop-blur-xs backdrop-grayscale ..."></div>
</div>
You can combine the following backdrop filter utilities: , , , , , , , , and .

### Untitled

Use the backdrop-filter-none utility to remove all of the backdrop filters applied to an element:
<div class="backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none"></div>

### Untitled

Use the backdrop-filter-[<value>] syntax to set the backdrop filter based on a completely custom value:
<div class="backdrop-filter-[url('filters.svg#filter-id')] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-filter-(<custom-property>) syntax:
<div class="backdrop-filter-(--my-backdrop-filter) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-filter-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter utility with a variant like hover:* to only apply the utility in that state:
<div class="backdrop-blur-sm hover:backdrop-filter-none ...">
<!-- ... -->
</div>
Learn more about using variants in the .

### Untitled

Prefix a backdrop-filter utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-blur-sm md:backdrop-filter-none ...">
<!-- ... -->
</div>
