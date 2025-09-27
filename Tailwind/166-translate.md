# translate

Utilities for translating elements.
Show more

## Untitled

### Untitled

Use translate-<number> utilities like translate-2 and -translate-4 to translate an element on both axes based on the spacing scale:
-translate-6
translate-2
translate-8
<img class="-translate-6 ..." src="/img/mountains.jpg" />
<img class="translate-2 ..." src="/img/mountains.jpg" />
<img class="translate-8 ..." src="/img/mountains.jpg" />

### Untitled

Use translate-<fraction> utilities like translate-1/4 and -translate-full to translate an element on both axes by a percentage of the element's size:
-translate-1/4
translate-1/6
translate-1/2
<img class="-translate-1/4 ..." src="/img/mountains.jpg" />
<img class="translate-1/6 ..." src="/img/mountains.jpg" />
<img class="translate-1/2 ..." src="/img/mountains.jpg" />

### Untitled

Use translate-x-<number> or translate-x-<fraction> utilities like translate-x-4 and translate-x-1/4 to translate an element on the x-axis:
-translate-x-4
translate-x-2
translate-x-1/2
<img class="-translate-x-4 ..." src="/img/mountains.jpg" />
<img class="translate-x-2 ..." src="/img/mountains.jpg" />
<img class="translate-x-1/2 ..." src="/img/mountains.jpg" />

### Untitled

Use translate-y-<number> or translate-y-<fraction> utilities like translate-y-6 and translate-y-1/3 to translate an element on the y-axis:
-translate-y-4
translate-y-2
translate-y-1/2
<img class="-translate-y-4 ..." src="/img/mountains.jpg" />
<img class="translate-y-2 ..." src="/img/mountains.jpg" />
<img class="translate-y-1/2 ..." src="/img/mountains.jpg" />

### Untitled

Use translate-z-<number> utilities like translate-z-6 and -translate-z-12 to translate an element on the z-axis:
-translate-z-8
translate-z-4
translate-z-12
<div class="transform-3d">
<img class="-translate-z-8 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
<img class="translate-z-2 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
<img class="translate-z-1/2 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
</div>
Note that the translate-z-<number> utilities require the transform-3d utility to be applied to the parent element.

### Untitled

Use the translate-[<value>] syntax to set the translation based on a completely custom value:
<img class="translate-[3.142rad] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the translate-(<custom-property>) syntax:
<img class="translate-(--my-translate) ..." src="/img/mountains.jpg" />
This is just a shorthand for translate-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a translate utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="translate-45 md:translate-60 ..." src="/img/mountains.jpg" />
Interactivity
