# z-index

Utilities for controlling the stack order of an element.

## Untitled

### Untitled

Use the z-<number> utilities like z-10 and z-50 to control the stack order (or three-dimensional positioning) of an element, regardless of the order it has been displayed:
05
04
03
02
01
<div class="z-40 ...">05</div>
<div class="z-30 ...">04</div>
<div class="z-20 ...">03</div>
<div class="z-10 ...">02</div>
<div class="z-0 ...">01</div>

### Untitled

To use a negative z-index value, prefix the class name with a dash to convert it to a negative value:
01
02
03
04
05
<div class="...">05</div>
<div class="...">04</div>
<div class="-z-10 ...">03</div>
<div class="...">02</div>
<div class="...">01</div>

### Untitled

Use the z-[<value>] syntax to set the stack order based on a completely custom value:
<div class="z-[calc(var(--index)+1)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the z-(<custom-property>) syntax:
<div class="z-(--my-z) ...">
<!-- ... -->
</div>
This is just a shorthand for z-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a z-index utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="z-0 md:z-50 ...">
<!-- ... -->
</div>
