# font-stretch

Utilities for selecting the width of a font face.

## Untitled

### Untitled

Use utilities like font-stretch-condensed and font-stretch-expanded to set the width of a font face:
font-stretch-extra-condensed
The quick brown fox jumps over the lazy dog.
font-stretch-condensed
The quick brown fox jumps over the lazy dog.
font-stretch-normal
The quick brown fox jumps over the lazy dog.
font-stretch-expanded
The quick brown fox jumps over the lazy dog.
font-stretch-extra-expanded
The quick brown fox jumps over the lazy dog.
<p class="font-stretch-extra-condensed">The quick brown fox...</p>
<p class="font-stretch-condensed">The quick brown fox...</p>
<p class="font-stretch-normal">The quick brown fox...</p>
<p class="font-stretch-expanded">The quick brown fox...</p>
<p class="font-stretch-extra-expanded">The quick brown fox...</p>
This only applies to fonts that have multiple width variations available, otherwise the browser selects the closest match.

### Untitled

Use font-stretch-<percentage> utilities like font-stretch-50% and font-stretch-125% to set the width of a font face using a percentage:
font-stretch-50%
The quick brown fox jumps over the lazy dog.
font-stretch-100%
The quick brown fox jumps over the lazy dog.
font-stretch-150%
The quick brown fox jumps over the lazy dog.
<p class="font-stretch-50%">The quick brown fox...</p>
<p class="font-stretch-100%">The quick brown fox...</p>
<p class="font-stretch-150%">The quick brown fox...</p>

### Untitled

Use the font-stretch-[<value>] syntax to set the font width based on a completely custom value:
<p class="font-stretch-[66.66%] ...">
Lorem ipsum dolor sit amet...
</p>
For CSS variables, you can also use the font-stretch-(<custom-property>) syntax:
<p class="font-stretch-(--my-font-width) ...">
Lorem ipsum dolor sit amet...
</p>
This is just a shorthand for font-stretch-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a font-stretch utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="font-stretch-normal md:font-stretch-expanded ...">
<!-- ... -->
</div>
