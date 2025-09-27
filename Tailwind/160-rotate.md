# rotate

Utilities for rotating elements.
Show more

## Untitled

### Untitled

Use rotate-<number> utilities like rotate-45 and rotate-90 to rotate an element by degrees:
rotate-45
rotate-90
rotate-210
<img class="rotate-45 ..." src="/img/mountains.jpg" />
<img class="rotate-90 ..." src="/img/mountains.jpg" />
<img class="rotate-210 ..." src="/img/mountains.jpg" />

### Untitled

Use -rotate-<number> utilities like -rotate-45 and -rotate-90 to rotate an element counterclockwise by degrees:
-rotate-45
-rotate-90
-rotate-210
<img class="-rotate-45 ..." src="/img/mountains.jpg" />
<img class="-rotate-90 ..." src="/img/mountains.jpg" />
<img class="-rotate-210 ..." src="/img/mountains.jpg" />

### Untitled

Use rotate-x-<number>, rotate-y-<number>, and rotate-z-<number> utilities like rotate-x-50, -rotate-y-30, and rotate-z-45 together to rotate an element in 3D space:
rotate-x-50
rotate-z-45
rotate-x-15
-rotate-y-30
rotate-y-25
rotate-z-30
<img class="rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
<img class="rotate-x-15 -rotate-y-30 ..." src="/img/mountains.jpg" />
<img class="rotate-y-25 rotate-z-30 ..." src="/img/mountains.jpg" />

### Untitled

Use the rotate-[<value>] syntax to set the rotation based on a completely custom value:
<img class="rotate-[3.142rad] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the rotate-(<custom-property>) syntax:
<img class="rotate-(--my-rotation) ..." src="/img/mountains.jpg" />
This is just a shorthand for rotate-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a rotate utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="rotate-45 md:rotate-60 ..." src="/img/mountains.jpg" />
