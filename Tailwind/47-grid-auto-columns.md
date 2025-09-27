# grid-auto-columns

Utilities for controlling the size of implicitly-created grid columns.

## Untitled

### Untitled

Use utilities like auto-cols-min and auto-cols-max to control the size of implicitly-created grid columns:
<div class="grid auto-cols-max grid-flow-col">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use the auto-cols-[<value>] syntax to set the size of implicitly-created grid columns based on a completely custom value:
<div class="auto-cols-[minmax(0,2fr)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the auto-cols-(<custom-property>) syntax:
<div class="auto-cols-(--my-auto-cols) ...">
<!-- ... -->
</div>
This is just a shorthand for auto-cols-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a grid-auto-columns utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid grid-flow-col auto-cols-max md:auto-cols-min ...">
<!-- ... -->
</div>
