# width

Utilities for setting the width of an element.
Show more

## Untitled

### Untitled

Use w-<number> utilities like w-24 and w-64 to set an element to a fixed width based on the spacing scale:
w-96
w-80
w-64
w-48
w-40
w-32
w-24
<div class="w-96 ...">w-96</div>
<div class="w-80 ...">w-80</div>
<div class="w-64 ...">w-64</div>
<div class="w-48 ...">w-48</div>
<div class="w-40 ...">w-40</div>
<div class="w-32 ...">w-32</div>
<div class="w-24 ...">w-24</div>

### Untitled

Use w-full or w-<fraction> utilities like w-1/2 and w-2/5 to give an element a percentage-based width:
w-1/2
w-1/2
w-2/5
w-3/5
w-1/3
w-2/3
w-1/4
w-3/4
w-1/5
w-4/5
w-1/6
w-5/6
w-full
<div class="flex ...">
<div class="w-1/2 ...">w-1/2</div>
<div class="w-1/2 ...">w-1/2</div>
</div>
<div class="flex ...">
<div class="w-2/5 ...">w-2/5</div>
<div class="w-3/5 ...">w-3/5</div>
</div>
<div class="flex ...">
<div class="w-1/3 ...">w-1/3</div>
<div class="w-2/3 ...">w-2/3</div>
</div>
<div class="flex ...">
<div class="w-1/4 ...">w-1/4</div>
<div class="w-3/4 ...">w-3/4</div>
</div>
<div class="flex ...">
<div class="w-1/5 ...">w-1/5</div>
<div class="w-4/5 ...">w-4/5</div>
</div>
<div class="flex ...">
<div class="w-1/6 ...">w-1/6</div>
<div class="w-5/6 ...">w-5/6</div>
</div>
<div class="w-full ...">w-full</div>

### Untitled

Use utilities like w-sm and w-xl to set an element to a fixed width based on the container scale:
w-xl
w-lg
w-md
w-sm
w-xs
w-2xs
w-3xs
<div class="w-xl ...">w-xl</div>
<div class="w-lg ...">w-lg</div>
<div class="w-md ...">w-md</div>
<div class="w-sm ...">w-sm</div>
<div class="w-xs ...">w-xs</div>
<div class="w-2xs ...">w-2xs</div>
<div class="w-3xs ...">w-3xs</div>

### Untitled

Use the w-screen utility to make an element span the entire width of the viewport:
<div class="w-screen">
<!-- ... -->
</div>
Alternatively, you can match the width of the large, small or dynamic viewports using the w-lvw, w-svw, and w-dvw utilities.

### Untitled

Use the w-auto utility to remove an element's assigned width under a specific condition, like at a particular breakpoint:
<div class="w-full md:w-auto">
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

Use the w-[<value>] syntax to set the width based on a completely custom value:
<div class="w-[5px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the w-(<custom-property>) syntax:
<div class="w-(--my-width) ...">
<!-- ... -->
</div>
This is just a shorthand for w-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="w-1/2 md:w-full ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The w-<number> and size-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
