# grid-column

Utilities for controlling how elements are sized and placed across grid columns.
Show more

## Untitled

### Untitled

Use col-span-<number> utilities like col-span-2 and col-span-4 to make an element span n columns:
01
02
03
04
05
06
07
<div class="grid grid-cols-3 gap-4">
<div class="...">01</div>
<div class="...">02</div>
<div class="...">03</div>
<div class="col-span-2 ...">04</div>
<div class="...">05</div>
<div class="...">06</div>
<div class="col-span-2 ...">07</div>
</div>

### Untitled

Use col-start-<number> or col-end-<number> utilities like col-start-2 and col-end-3 to make an element start or end at the nth grid line:
01
02
03
04
<div class="grid grid-cols-6 gap-4">
<div class="col-span-4 col-start-2 ...">01</div>
<div class="col-start-1 col-end-3 ...">02</div>
<div class="col-span-2 col-end-7 ...">03</div>
<div class="col-start-1 col-end-7 ...">04</div>
</div>
These can also be combined with the col-span-<number> utilities to span a specific number of columns.

### Untitled

Use utilities like col-[<value>],col-span-[<value>],col-start-[<value>], and col-end-[<value>] to set the grid column size and location based on a completely custom value:
<div class="col-[16_/_span_16] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the col-(<custom-property>) syntax:
<div class="col-(--my-columns) ...">
<!-- ... -->
</div>
This is just a shorthand for col-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix grid-column,grid-column-start, and grid-column-end utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="col-span-2 md:col-span-6 ...">
<!-- ... -->
</div>
