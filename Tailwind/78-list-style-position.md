# list-style-position

Utilities for controlling the position of bullets and numbers in lists.

## Untitled

### Untitled

Use utilities like list-inside and list-outside to control the position of the markers and text indentation in a list:
list-inside
5 cups chopped Porcini mushrooms
1/2 cup of olive oil
3lb of celery
list-outside
5 cups chopped Porcini mushrooms
1/2 cup of olive oil
3lb of celery
<ul class="list-inside">
<li>5 cups chopped Porcini mushrooms</li>
<!-- ... -->
</ul>
<ul class="list-outside">
<li>5 cups chopped Porcini mushrooms</li>
<!-- ... -->
</ul>

### Untitled

Prefix a list-style-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<ul class="list-outside md:list-inside ...">
<!-- ... -->
</ul>
