# list-style-image

Utilities for controlling the marker images for list items.

## Untitled

### Untitled

Use the list-image-[<value>] syntax to control the marker image for list items:
5 cups chopped Porcini mushrooms
1/2 cup of olive oil
3lb of celery
<ul class="list-image-[url(/img/checkmark.png)]">
<li>5 cups chopped Porcini mushrooms</li>
<!-- ... -->
</ul>

### Untitled

Use the list-image-(<custom-property>) syntax to control the marker image for list items using a CSS variable:
<ul class="list-image-(--my-list-image)">
<!-- ... -->
</ul>
This is just a shorthand for list-image-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Use the list-image-none utility to remove an existing marker image from list items:
<ul class="list-image-none">
<!-- ... -->
</ul>

### Untitled

Prefix a list-style-image utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="list-image-none md:list-image-[url(/img/checkmark.png)] ...">
<!-- ... -->
</div>
