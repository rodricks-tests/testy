# height

Utilities for setting the height of an element.
Show more

## Untitled

### Untitled

Use h-<number> utilities like h-24 and h-64 to set an element to a fixed height based on the spacing scale:
h-96
h-80
h-64
h-48
h-40
h-32
h-24
<div class="h-96 ...">h-96</div>
<div class="h-80 ...">h-80</div>
<div class="h-64 ...">h-64</div>
<div class="h-48 ...">h-48</div>
<div class="h-40 ...">h-40</div>
<div class="h-32 ...">h-32</div>
<div class="h-24 ...">h-24</div>

### Untitled

Use h-full or h-<fraction> utilities like h-1/2 and h-2/5 to give an element a percentage-based height:
h-full
h-9/10
h-3/4
h-1/2
h-1/3
<div class="h-full ...">h-full</div>
<div class="h-9/10 ...">h-9/10</div>
<div class="h-3/4 ...">h-3/4</div>
<div class="h-1/2 ...">h-1/2</div>
<div class="h-1/3 ...">h-1/3</div>

### Untitled

Use the h-screen utility to make an element span the entire height of the viewport:
<div class="h-screen">
<!-- ... -->
</div>

### Untitled

Use the h-dvh utility to make an element span the entire height of the viewport, which changes as the browser UI expands or contracts:
Scroll the viewport to see the viewport height change
tailwindcss.com
h-dvh
<div class="h-dvh">
<!-- ... -->
</div>

### Untitled

Use the h-lvh utility to set an element's height to the largest possible height of the viewport:
Scroll the viewport to see the viewport height change
tailwindcss.com
h-lvh
<div class="h-lvh">
<!-- ... -->
</div>

### Untitled

Use the h-svh utility to set an element's height to the smallest possible height of the viewport:
Scroll the viewport to see the viewport height change
tailwindcss.com
h-svh
<div class="h-svh">
<!-- ... -->
</div>

### Untitled

Use utilities like size-px, size-4, and size-full to set both the width and height of an element at the same time:
size-16
size-20
size-24
size-32
size-40
<div class="size-16 ...">size-16</div>
<div class="size-20 ...">size-20</div>
<div class="size-24 ...">size-24</div>
<div class="size-32 ...">size-32</div>
<div class="size-40 ...">size-40</div>

### Untitled

Use the h-[<value>] syntax to set the height based on a completely custom value:
<div class="h-[32rem] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the h-(<custom-property>) syntax:
<div class="h-(--my-height) ...">
<!-- ... -->
</div>
This is just a shorthand for h-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="h-1/2 md:h-full ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The h-<number> and size-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
