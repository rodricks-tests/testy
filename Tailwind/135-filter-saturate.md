# filter: saturate()

Utilities for applying saturation filters to an element.

## Untitled

### Untitled

Use utilities like saturate-50 and saturate-100 to control an element's saturation:
saturate-50
saturate-100
saturate-150
saturate-200
<img class="saturate-50 ..." src="/img/mountains.jpg" />
<img class="saturate-100 ..." src="/img/mountains.jpg" />
<img class="saturate-150 ..." src="/img/mountains.jpg" />
<img class="saturate-200 ..." src="/img/mountains.jpg" />

### Untitled

Use the saturate-[<value>] syntax to set the saturation based on a completely custom value:
<img class="saturate-[.25] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the saturate-(<custom-property>) syntax:
<img class="saturate-(--my-saturation) ..." src="/img/mountains.jpg" />
This is just a shorthand for saturate-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: saturate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="saturate-50 md:saturate-150 ..." src="/img/mountains.jpg" />
