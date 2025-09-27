# grid-auto-flow

Utilities for controlling how elements in a grid are auto-placed.

## Untitled

### Untitled

Use utilities like grid-flow-col and grid-flow-row-dense to control how the auto-placement algorithm works for a grid layout:
01
02
03
04
05
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
<div class="col-span-2">01</div>
<div class="col-span-2">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Prefix a grid-auto-flow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid grid-flow-col md:grid-flow-row ...">
<!-- ... -->
</div>
