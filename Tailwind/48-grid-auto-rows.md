# grid-auto-rows

Utilities for controlling the size of implicitly-created grid rows.

## Untitled

### Untitled

Use utilities like auto-rows-min and auto-rows-max to control the size of implicitly-created grid rows:
<div class="grid grid-flow-row auto-rows-max">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use the auto-rows-[<value>] syntax to set the size of implicitly-created grid rows based on a completely custom value:
<div class="auto-rows-[minmax(0,2fr)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the auto-rows-(<custom-property>) syntax:
<div class="auto-rows-(--my-auto-rows) ...">
<!-- ... -->
</div>
This is just a shorthand for auto-rows-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a grid-auto-rows utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid grid-flow-row auto-rows-max md:auto-rows-min ...">
<!-- ... -->
</div>
