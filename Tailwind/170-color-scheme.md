# color-scheme

Utilities for controlling the color scheme of an element.

## Untitled

### Untitled

Use utilities like scheme-light and scheme-light-dark to control how element should be rendered:
Try switching your system color scheme to see the difference
scheme-light
scheme-dark
scheme-light-dark
<div class="scheme-light ...">
<input type="date" />
</div>
<div class="scheme-dark ...">
<input type="date" />
</div>
<div class="scheme-light-dark ...">
<input type="date" />
</div>

### Untitled

Prefix a color-scheme utility with a variant like dark:* to only apply the utility in that state:
<html class="scheme-light dark:scheme-dark ...">
<!-- ... -->
</html>
