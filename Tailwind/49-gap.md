# gap

Utilities for controlling gutters between grid and flexbox items.

## Untitled

### Untitled

Use gap-<number> utilities like gap-2 and gap-4 to change the gap between both rows and columns in grid and flexbox layouts:
01
02
03
04
<div class="grid grid-cols-2 gap-4">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use gap-x-<number> or gap-y-<number> utilities like gap-x-8 and gap-y-4 to change the gap between columns and rows independently:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-x-8 gap-y-4">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use utilities like gap-[<value>],gap-x-[<value>], and gap-y-[<value>] to set the gap based on a completely custom value:
<div class="gap-[10vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the gap-(<custom-property>) syntax:
<div class="gap-(--my-gap) ...">
<!-- ... -->
</div>
This is just a shorthand for gap-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix gap,column-gap, and row-gap utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid gap-4 md:gap-6 ...">
<!-- ... -->
</div>
