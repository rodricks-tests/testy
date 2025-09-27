# user-select

Utilities for controlling whether the user can select text in an element.

## Untitled

### Untitled

Use the select-none utility to prevent selecting text in an element and its children:
Try selecting the text to see the expected behavior
<div class="select-none ...">The quick brown fox jumps over the lazy dog.</div>

### Untitled

Use the select-text utility to allow selecting text in an element and its children:
Try selecting the text to see the expected behavior
The quick brown fox jumps over the lazy dog.
<div class="select-text ...">The quick brown fox jumps over the lazy dog.</div>

### Untitled

Use the select-all utility to automatically select all the text in an element when a user clicks:
Try clicking the text to see the expected behavior
The quick brown fox jumps over the lazy dog.
<div class="select-all ...">The quick brown fox jumps over the lazy dog.</div>

### Untitled

Use the select-auto utility to use the default browser behavior for selecting text:
Try selecting the text to see the expected behavior
The quick brown fox jumps over the lazy dog.
<div class="select-auto ...">The quick brown fox jumps over the lazy dog.</div>

### Untitled

Prefix an user-select utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="select-none md:select-all ...">
<!-- ... -->
</div>
