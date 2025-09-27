# filter: contrast()

Utilities for applying contrast filters to an element.

## Untitled

### Untitled

Use utilities like contrast-50 and contrast-100 to control an element's contrast:
contrast-50
contrast-100
contrast-125
contrast-200
<img class="contrast-50 ..." src="/img/mountains.jpg" />
<img class="contrast-100 ..." src="/img/mountains.jpg" />
<img class="contrast-125 ..." src="/img/mountains.jpg" />
<img class="contrast-200 ..." src="/img/mountains.jpg" />

### Untitled

Use the contrast-[<value>] syntax to set the contrast based on a completely custom value:
<img class="contrast-[.25] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the contrast-(<custom-property>) syntax:
<img class="contrast-(--my-contrast) ..." src="/img/mountains.jpg" />
This is just a shorthand for contrast-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: contrast() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="contrast-125 md:contrast-150 ..." src="/img/mountains.jpg" />
