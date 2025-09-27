# grid-template-rows

Utilities for specifying the rows in a grid layout.

## Untitled

### Untitled

Use grid-rows-<number> utilities like grid-rows-2 and grid-rows-4 to create grids with n equally sized rows:
01
02
03
04
05
06
07
08
09
<div class="grid grid-flow-col grid-rows-4 gap-4">
<div>01</div>
<!-- ... -->
<div>09</div>
</div>

### Untitled

Use the grid-rows-subgrid utility to adopt the row tracks defined by the item's parent:
01
02
03
04
05
06
07
08
09
10
<div class="grid grid-flow-col grid-rows-4 gap-4">
<div>01</div>
<!-- ... -->
<div>05</div>
<div class="row-span-3 grid grid-rows-subgrid gap-4">
<div class="row-start-2">06</div>
</div>
<div>07</div>
<!-- ... -->
<div>10</div>
</div>

### Untitled

Use the grid-rows-[<value>] syntax to set the rows based on a completely custom value:
<div class="grid-rows-[200px_minmax(900px,1fr)_100px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the grid-rows-(<custom-property>) syntax:
<div class="grid-rows-(--my-grid-rows) ...">
<!-- ... -->
</div>
This is just a shorthand for grid-rows-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a grid-template-rows utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid grid-rows-2 md:grid-rows-6 ...">
<!-- ... -->
</div>
