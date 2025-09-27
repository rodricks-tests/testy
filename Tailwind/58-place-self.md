# place-self

Utilities for controlling how an individual item is justified and aligned at the same time.

## Untitled

### Untitled

Use place-self-auto to align an item based on the value of the container's place-items property:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-4 ...">
<div>01</div>
<div class="place-self-auto ...">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-self-start to align an item to the start on both axes:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-4 ...">
<div>01</div>
<div class="place-self-start ...">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-self-center to align an item at the center on both axes:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-4 ...">
<div>01</div>
<div class="place-self-center ...">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-self-end to align an item to the end on both axes:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-4 ...">
<div>01</div>
<div class="place-self-end ...">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use place-self-stretch to stretch an item on both axes:
01
02
03
04
05
06
<div class="grid grid-cols-3 gap-4 ...">
<div>01</div>
<div class="place-self-stretch ...">02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Prefix a place-self utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="place-self-start md:place-self-end ...">
<!-- ... -->
</div>
