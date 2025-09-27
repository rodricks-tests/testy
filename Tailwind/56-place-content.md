# place-content

Utilities for controlling how content is justified and aligned at the same time.

## Untitled

### Untitled

Use place-content-center to pack items in the center of the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-center gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-start to pack items against the start of the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-start gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-end to pack items against the end of the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-end gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-between to distribute grid items along the block axis so that there is an equal amount of space between each row on the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-between gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-around to distribute grid items such that there is an equal amount of space around each row on the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-around gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-evenly to distribute grid items such that they are evenly spaced on the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-evenly gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Use place-content-stretch to stretch grid items along their grid areas on the block axis:
01
02
03
04
<div class="grid h-48 grid-cols-2 place-content-stretch gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
</div>

### Untitled

Prefix a place-content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid place-content-start md:place-content-center ...">
<!-- ... -->
</div>
