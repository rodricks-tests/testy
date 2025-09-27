# align-content

Utilities for controlling how rows are positioned in multi-row flex and grid containers.

## Untitled

### Untitled

Use content-start to pack rows in a container against the start of the cross axis:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-start gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-center to pack rows in a container in the center of the cross axis:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-center gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-end to pack rows in a container against the end of the cross axis:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-end gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-between to distribute rows in a container such that there is an equal amount of space between each line:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-between gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-around to distribute rows in a container such that there is an equal amount of space around each line:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-around gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-evenly to distribute rows in a container such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using content-around:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-evenly gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-stretch to allow content items to fill the available space along the container’s cross axis:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-stretch gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Use content-normal to pack content items in their default position as if no align-content value was set:
01
02
03
04
05
<div class="grid h-56 grid-cols-3 content-normal gap-4 ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
</div>

### Untitled

Prefix an align-content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid content-start md:content-around ...">
<!-- ... -->
</div>
