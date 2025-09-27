# justify-items

Utilities for controlling how grid items are aligned along their inline axis.

## Untitled

### Untitled

Use the justify-items-start utility to justify grid items against the start of their inline axis:
01
02
03
04
05
06
<div class="grid justify-items-start ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Use the justify-items-end or justify-items-end-safe utilities to justify grid items against the end of their inline axis:
Resize the container to see the alignment behavior
justify-items-end
01
02
03
justify-items-end-safe
01
02
03
justify-items-end
<div class="grid grid-flow-col justify-items-end ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>
justify-items-end-safe
<div class="grid grid-flow-col justify-items-end-safe ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>
When there is not enough space available, the justify-items-end-safe utility will align items to the start of the container instead of the end.

### Untitled

Use the justify-items-center or justify-items-center-safe utilities to justify grid items against the end of their inline axis:
Resize the container to see the alignment behavior
justify-items-center
01
02
03
justify-items-center-safe
01
02
03
justify-items-center
<div class="grid grid-flow-col justify-items-center ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>
justify-items-center-safe
<div class="grid grid-flow-col justify-items-center-safe ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>
When there is not enough space available, the justify-items-center-safe utility will align items to the start of the container instead of the center.

### Untitled

Use the justify-items-stretch utility to stretch items along their inline axis:
01
02
03
04
05
06
<div class="grid justify-items-stretch ...">
<div>01</div>
<div>02</div>
<div>03</div>
<div>04</div>
<div>05</div>
<div>06</div>
</div>

### Untitled

Prefix a justify-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grid justify-items-start md:justify-items-center ...">
<!-- ... -->
</div>
