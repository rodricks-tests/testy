# vertical-align

Utilities for controlling the vertical alignment of an inline or table-cell box.

## Untitled

### Untitled

Use the align-baseline utility to align the baseline of an element with the baseline of its parent:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-baseline">The quick brown fox...</span>

### Untitled

Use the align-top utility to align the top of an element and its descendants with the top of the entire line:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-top">The quick brown fox...</span>

### Untitled

Use the align-middle utility to align the middle of an element with the baseline plus half the x-height of the parent:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-middle">The quick brown fox...</span>

### Untitled

Use the align-bottom utility to align the bottom of an element and its descendants with the bottom of the entire line:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-bottom">The quick brown fox...</span>

### Untitled

Use the align-text-top utility to align the top of an element with the top of the parent element's font:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-text-top">The quick brown fox...</span>

### Untitled

Use the align-text-bottom utility to align the bottom of an element with the bottom of the parent element's font:
The quick brown fox jumps over the lazy dog.
<span class="inline-block align-text-bottom">The quick brown fox...</span>

### Untitled

Use the align-[<value>] syntax to set the vertical alignment based on a completely custom value:
<span class="align-[4px] ...">
<!-- ... -->
</span>
For CSS variables, you can also use the align-(<custom-property>) syntax:
<span class="align-(--my-alignment) ...">
<!-- ... -->
</span>
This is just a shorthand for align-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a vertical-align utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<span class="align-middle md:align-top ...">
<!-- ... -->
</span>
