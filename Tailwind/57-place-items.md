# place-items

Utilities for controlling how items are justified and aligned at the same time.

## Untitled

### Untitled

Use place-items-start to place grid items on the start of their grid areas on both axes:
01
02
03
04
05
06
<div class="grid grid-cols-3 place-items-start gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-items-end to place grid items on the end of their grid areas on both axes:
01
02
03
04
05
06
<div class="grid h-56 grid-cols-3 place-items-end gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-items-center to place grid items on the center of their grid areas on both axes:
01
02
03
04
05
06
<div class="grid h-56 grid-cols-3 place-items-center gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-items-stretch to stretch items along their grid areas on both axes:
01
02
03
04
05
06
<div class="grid h-56 grid-cols-3 place-items-stretch gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

## Untitled

Prefix a place-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid place-items-start md:place-items-center ...">
<!-- ... -->
</div>
