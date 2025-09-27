# filter: brightness()

Utilities for applying brightness filters to an element.

## Untitled

### Untitled

Use utilities like brightness-50 and brightness-100 to control an element's brightness:
brightness-50
brightness-100
brightness-125
brightness-200
<img class="brightness-50 ..." src="/img/mountains.jpg" />
<img class="brightness-100 ..." src="/img/mountains.jpg" />
<img class="brightness-125 ..." src="/img/mountains.jpg" />
<img class="brightness-200 ..." src="/img/mountains.jpg" />

### Untitled

Use the brightness-[<value>] syntax to set the brightness based on a completely custom value:
<img class="brightness-[1.75] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the brightness-(<custom-property>) syntax:
<img class="brightness-(--my-brightness) ..." src="/img/mountains.jpg" />
This is just a shorthand for brightness-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: brightness() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="brightness-110 md:brightness-150 ..." src="/img/mountains.jpg" />
