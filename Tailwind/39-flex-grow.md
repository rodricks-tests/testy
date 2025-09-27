# flex-grow

Utilities for controlling how flex items grow.

## Untitled

### Untitled

Use grow to allow a flex item to grow to fill any available space:
01
02
03
<div class="flex ...">
<div class="size-14 flex-none ...">01</div>
<div class="size-14 grow ...">02</div>
<div class="size-14 flex-none ...">03</div>
</div>

### Untitled

Use grow-<number> utilities like grow-3 to make flex items grow proportionally based on their growth factor, allowing them to fill the available space relative to each other:
01
02
03
<div class="flex ...">
<div class="size-14 grow-3 ...">01</div>
<div class="size-14 grow-7 ...">02</div>
<div class="size-14 grow-3 ...">03</div>
</div>

### Untitled

Use grow-0 to prevent a flex item from growing:
01
02
03
<div class="flex ...">
<div class="size-14 grow ...">01</div>
<div class="size-14 grow-0 ...">02</div>
<div class="size-14 grow ...">03</div>
</div>

### Untitled

Use the grow-[<value>] syntax to set the flex grow factor based on a completely custom value:
<div class="grow-[25vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the grow-(<custom-property>) syntax:
<div class="grow-(--my-grow) ...">
<!-- ... -->
</div>
This is just a shorthand for grow-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a flex-grow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="grow md:grow-0 ...">
<!-- ... -->
</div>
