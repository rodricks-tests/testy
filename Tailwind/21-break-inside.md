# break-inside

Utilities for controlling how a column or page should break within an element.

## Untitled

### Untitled

Use utilities like break-inside-column and break-inside-avoid-page to control how a column or page break should behave within an element:
<div class="columns-2">
<p>Well, let me tell you something, ...</p>
<p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
<p>Maybe we can live without...</p>
<p>Look. If you think this is...</p>
</div>

### Untitled

Prefix a break-inside utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="break-inside-avoid-column md:break-inside-auto ...">
<!-- ... -->
</div>
