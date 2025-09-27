# order

Utilities for controlling the order of flex and grid items.

## Untitled

### Untitled

Use order-<number> utilities like order-1 and order-3 to render flex and grid items in a different order than they appear in the document:
01
02
03
<div class="flex justify-between ...">
<div class="order-3 ...">01</div>
<div class="order-1 ...">02</div>
<div class="order-2 ...">03</div>
</div>

### Untitled

Use the order-first and order-last utilities to render flex and grid items first or last:
01
02
03
<div class="flex justify-between ...">
<div class="order-last ...">01</div>
<div class="...">02</div>
<div class="order-first ...">03</div>
</div>

### Untitled

To use a negative order value, prefix the class name with a dash to convert it to a negative value:
<div class="-order-1">
<!-- ... -->
</div>

### Untitled

Use the order-[<value>] syntax to set the order based on a completely custom value:
<div class="order-[min(var(--total-items),10)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the order-(<custom-property>) syntax:
<div class="order-(--my-order) ...">
<!-- ... -->
</div>
This is just a shorthand for order-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an order utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="order-first md:order-last ...">
<!-- ... -->
</div>
