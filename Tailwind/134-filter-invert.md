# filter: invert()

Utilities for applying invert filters to an element.

## Untitled

### Untitled

Use utilities like invert and invert-20 to control the color inversion of an element:
invert-0
invert-20
invert
<img class="invert-0" src="/img/mountains.jpg" />
<img class="invert-20" src="/img/mountains.jpg" />
<img class="invert" src="/img/mountains.jpg" />

### Untitled

Use the invert-[<value>] syntax to set the color inversion based on a completely custom value:
<img class="invert-[.25] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the invert-(<custom-property>) syntax:
<img class="invert-(--my-inversion) ..." src="/img/mountains.jpg" />
This is just a shorthand for invert-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: invert() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="invert md:invert-0 ..." src="/img/mountains.jpg" />
