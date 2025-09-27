# grid-row

Utilities for controlling how elements are sized and placed across grid rows.
Show more

## Untitled

### Untitled

Use row-span-<number> utilities like row-span-2 and row-span-4 to make an element span n rows:
01
02
03
<div class="grid grid-flow-col grid-rows-3 gap-4">
<div class="row-span-3 ...">01</div>
<div class="col-span-2 ...">02</div>
<div class="col-span-2 row-span-2 ...">03</div>
</div>

### Untitled

Use row-start-<number> or row-end-<number> utilities like row-start-2 and row-end-3 to make an element start or end at the nth grid line:
01
02
03
<div class="grid grid-flow-col grid-rows-3 gap-4">
<div class="row-span-2 row-start-2 ...">01</div>
<div class="row-span-2 row-end-3 ...">02</div>
<div class="row-start-1 row-end-4 ...">03</div>
</div>
These can also be combined with the row-span-<number> utilities to span a specific number of rows.

### Untitled

Use utilities like row-[<value>],row-span-[<value>],row-start-[<value>], and row-end-[<value>] to set the grid row size and location based on a completely custom value:
<div class="row-[span_16_/_span_16] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the row-(<custom-property>) syntax:
<div class="row-(--my-rows) ...">
<!-- ... -->
</div>
This is just a shorthand for row-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix grid-row,grid-row-start, and grid-row-end utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="row-span-3 md:row-span-4 ...">
<!-- ... -->
</div>
