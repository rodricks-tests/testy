# skew

Utilities for skewing elements with transform.

## Untitled

### Untitled

Use skew-<number> utilities like skew-4 and skew-10 to skew an element on both axes:
skew-3
skew-6
skew-12
<img class="skew-3 ..." src="/img/mountains.jpg" />
<img class="skew-6 ..." src="/img/mountains.jpg" />
<img class="skew-12 ..." src="/img/mountains.jpg" />

### Untitled

Use -skew-<number> utilities like -skew-4 and -skew-10 to skew an element on both axes:
-skew-3
-skew-6
-skew-12
<img class="-skew-3 ..." src="/img/mountains.jpg" />
<img class="-skew-6 ..." src="/img/mountains.jpg" />
<img class="-skew-12 ..." src="/img/mountains.jpg" />

### Untitled

Use skew-x-<number> utilities like skew-x-4 and -skew-x-10 to skew an element on the x-axis:
-skew-x-12
skew-x-6
skew-x-12
<img class="-skew-x-12 ..." src="/img/mountains.jpg" />
<img class="skew-x-6 ..." src="/img/mountains.jpg" />
<img class="skew-x-12 ..." src="/img/mountains.jpg" />

### Untitled

Use skew-y-<number> utilities like skew-y-4 and -skew-y-10 to skew an element on the y-axis:
-skew-y-12
skew-y-6
skew-y-12
<img class="-skew-y-12 ..." src="/img/mountains.jpg" />
<img class="skew-y-6 ..." src="/img/mountains.jpg" />
<img class="skew-y-12 ..." src="/img/mountains.jpg" />

### Untitled

Use the skew-[<value>] syntax to set the skew based on a completely custom value:
<img class="skew-[3.142rad] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the skew-(<custom-property>) syntax:
<img class="skew-(--my-skew) ..." src="/img/mountains.jpg" />
This is just a shorthand for skew-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix skewX() and skewY() utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="skew-3 md:skew-12 ..." src="/img/mountains.jpg" />
