# flex-wrap

Utilities for controlling how flex items wrap.

## Untitled

### Untitled

Use flex-nowrap to prevent flex items from wrapping, causing inflexible items to overflow the container if necessary:
01
02
03
<div class="flex flex-nowrap">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use flex-wrap to allow flex items to wrap:
01
02
03
<div class="flex flex-wrap">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use flex-wrap-reverse to wrap flex items in the reverse direction:
01
02
03
<div class="flex flex-wrap-reverse">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Prefix a flex-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="flex flex-wrap md:flex-wrap-reverse ...">
<!-- ... -->
</div>
