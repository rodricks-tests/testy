# filter: grayscale()

Utilities for applying grayscale filters to an element.

## Untitled

### Untitled

Use utilities like grayscale and grayscale-75 to control the amount of grayscale effect applied to an element:
grayscale-0
grayscale-25
grayscale-50
grayscale
<img class="grayscale-0 ..." src="/img/mountains.jpg" />
<img class="grayscale-25 ..." src="/img/mountains.jpg" />
<img class="grayscale-50 ..." src="/img/mountains.jpg" />
<img class="grayscale ..." src="/img/mountains.jpg" />

### Untitled

Use the grayscale-[<value>] syntax to set the grayscale based on a completely custom value:
<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the grayscale-(<custom-property>) syntax:
<img class="grayscale-(--my-grayscale) ..." src="/img/mountains.jpg" />
This is just a shorthand for grayscale-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: grayscale() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="grayscale md:grayscale-0 ..." src="/img/mountains.jpg" />
