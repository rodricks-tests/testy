# transform-origin

Utilities for specifying the origin for an element's transformations.

## Untitled

### Untitled

Use utilities like origin-top and origin-bottom-left to set an element's transform origin:
origin-center
origin-top-left
origin-bottom
<img class="origin-center rotate-45 ..." src="/img/mountains.jpg" />
<img class="origin-top-left rotate-12 ..." src="/img/mountains.jpg" />
<img class="origin-bottom -rotate-12 ..." src="/img/mountains.jpg" />

### Untitled

Use the origin-[<value>] syntax to set the transform origin based on a completely custom value:
<img class="origin-[33%_75%] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the origin-(<custom-property>) syntax:
<img class="origin-(--my-transform-origin) ..." src="/img/mountains.jpg" />
This is just a shorthand for origin-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a transform-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="origin-center md:origin-top ..." src="/img/mountains.jpg" />
