# filter: sepia()

Utilities for applying sepia filters to an element.

## Untitled

### Untitled

Use utilities like sepia and sepia-50 to control the sepia effect applied to an element:
sepia-0
sepia-50
sepia
<img class="sepia-0" src="/img/mountains.jpg" />
<img class="sepia-50" src="/img/mountains.jpg" />
<img class="sepia" src="/img/mountains.jpg" />

### Untitled

Use the sepia-[<value>] syntax to set the sepia amount based on a completely custom value:
<img class="sepia-[.25] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the sepia-(<custom-property>) syntax:
<img class="sepia-(--my-sepia) ..." src="/img/mountains.jpg" />
This is just a shorthand for sepia-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: sepia() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="sepia md:sepia-0 ..." src="/img/mountains.jpg" />
