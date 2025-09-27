# border-style

Utilities for controlling the style of an element's borders.

## Untitled

### Untitled

Use utilities like border-solid and border-dotted to control an element's border style:
border-solid
Button A
border-dashed
Button A
border-dotted
Button A
border-double
Button A
<div class="border-2 border-solid ..."></div>
<div class="border-2 border-dashed ..."></div>
<div class="border-2 border-dotted ..."></div>
<div class="border-4 border-double ..."></div>

### Untitled

Use the border-none utility to remove an existing border from an element:
Save Changes
<button class="border-none ...">Save Changes</button>
This is most commonly used to remove a border style that was applied at a smaller breakpoint.

### Untitled

Use utilities like divide-dashed and divide-dotted to control the border style between child elements:
01
02
03
<div class="grid grid-cols-3 divide-x-3 divide-dashed divide-indigo-500">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Prefix a border-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="border-solid md:border-dotted ...">
<!-- ... -->
</div>
