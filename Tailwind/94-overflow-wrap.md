# overflow-wrap

Utilities for controlling line breaks within words in an overflowing element.

## Untitled

### Untitled

Use the wrap-break-word utility to allow line breaks between letters in a word if needed:
The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
<p class="wrap-break-word">The longest word in any of the major...</p>

### Untitled

The wrap-anywhere utility behaves similarly to wrap-break-word, except that the browser factors in mid-word line breaks when calculating the intrinsic size of the element:
wrap-break-word
Jay Riemenschneider
jason.riemenschneider@vandelayindustries.com
wrap-anywhere
Jay Riemenschneider
jason.riemenschneider@vandelayindustries.com
<div class="flex max-w-sm">
<img class="size-16 rounded-full" src="/img/profile.jpg" />
<div class="wrap-break-word">
<p class="font-medium">Jay Riemenschneider</p>
<p>jason.riemenschneider@vandelayindustries.com</p>
</div>
</div>
<div class="flex max-w-sm">
<img class="size-16 rounded-full" src="/img/profile.jpg" />
<div class="wrap-anywhere">
<p class="font-medium">Jay Riemenschneider</p>
<p>jason.riemenschneider@vandelayindustries.com</p>
</div>
</div>
This is useful for wrapping text inside of flex containers, where you would usually need to set min-width: 0 on the child element to allow it to shrink below its content size.

### Untitled

Use the wrap-normal utility to only allow line breaks at natural wrapping points, like spaces, hyphens, and punctuation:
The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
<p class="wrap-normal">The longest word in any of the major...</p>

### Untitled

Prefix an overflow-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="wrap-normal md:wrap-break-word ...">
Lorem ipsum dolor sit amet...
</p>
