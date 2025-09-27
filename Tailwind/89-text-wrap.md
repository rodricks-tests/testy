# text-wrap

Utilities for controlling how text wraps within an element.

## Untitled

### Untitled

Use the text-wrap utility to wrap overflowing text onto multiple lines at logical points in the text:
Beloved Manhattan soup stand closes
New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
<article class="text-wrap">
<h3>Beloved Manhattan soup stand closes</h3>
<p>New Yorkers are facing the winter chill...</p>
</article>

### Untitled

Use the text-nowrap utility to prevent text from wrapping, allowing it to overflow if necessary:
Beloved Manhattan soup stand closes
New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
<article class="text-nowrap">
<h3>Beloved Manhattan soup stand closes</h3>
<p>New Yorkers are facing the winter chill...</p>
</article>

### Untitled

Use the text-balance utility to distribute the text evenly across each line:
Beloved Manhattan soup stand closes
New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
<article>
<h3 class="text-balance">Beloved Manhattan soup stand closes</h3>
<p>New Yorkers are facing the winter chill...</p>
</article>
For performance reasons browsers limit text balancing to blocks that are ~6 lines or less, making it best suited for headings.

### Untitled

Use the text-pretty utility to prevent orphans (a single word on its own line) at the end of a text block:
Beloved Manhattan soup stand closes
New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
<article>
<h3 class="text-pretty">Beloved Manhattan soup stand closes</h3>
<p>New Yorkers are facing the winter chill...</p>
</article>

### Untitled

Prefix a text-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<h1 class="text-pretty md:text-balance ...">
<!-- ... -->
</h1>
