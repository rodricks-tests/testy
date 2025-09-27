# text-decoration-thickness

Utilities for controlling the thickness of text decorations.

## Untitled

### Untitled

Use decoration-<number> utilities like decoration-2 and decoration-4 to change the  thickness of an element:
decoration-1
The quick brown fox jumps over the lazy dog.
decoration-2
The quick brown fox jumps over the lazy dog.
decoration-4
The quick brown fox jumps over the lazy dog.
<p class="underline decoration-1">The quick brown fox...</p>
<p class="underline decoration-2">The quick brown fox...</p>
<p class="underline decoration-4">The quick brown fox...</p>

### Untitled

Use the decoration-[<value>] syntax to set the text decoration thickness based on a completely custom value:
<p class="decoration-[0.25rem] ...">
Lorem ipsum dolor sit amet...
</p>
For CSS variables, you can also use the decoration-(length:<custom-property>) syntax:
<p class="decoration-(length:--my-decoration-thickness) ...">
Lorem ipsum dolor sit amet...
</p>
This is just a shorthand for decoration-[length:var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a text-decoration-thickness utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="underline md:decoration-4 ...">
Lorem ipsum dolor sit amet...
</p>
