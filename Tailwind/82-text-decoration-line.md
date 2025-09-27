# text-decoration-line

Utilities for controlling the decoration of text.

## Untitled

### Untitled

Use the underline utility to add an underline to the text of an element:
The quick brown fox jumps over the lazy dog.
<p class="underline">The quick brown fox...</p>

### Untitled

Use the overline utility to add an overline to the text of an element:
The quick brown fox jumps over the lazy dog.
<p class="overline">The quick brown fox...</p>

### Untitled

Use the line-through utility to add a line through the text of an element:
The quick brown fox jumps over the lazy dog.
<p class="line-through">The quick brown fox...</p>

### Untitled

Use the no-underline utility to remove a line from the text of an element:
The quick brown fox jumps over the lazy dog.
<p class="no-underline">The quick brown fox...</p>

### Untitled

Prefix a text-decoration-line utility with a variant like hover:* to only apply the utility in that state:
Hover over the text to see the expected behavior
The  jumps over the lazy dog.
<p>The <a href="..." class="no-underline hover:underline ...">quick brown fox</a> jumps over the lazy dog.</p>
Learn more about using variants in the .

### Untitled

Prefix a text-decoration-line utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<a class="no-underline md:underline ..." href="...">
<!-- ... -->
</a>
