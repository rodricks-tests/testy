# top / right / bottom / left

Utilities for controlling the placement of positioned elements.
Show more

## Untitled

### Untitled

Use top-<number>, right-<number>, bottom-<number>, left-<number>, and inset-<number> utilities like top-0 and bottom-4 to set the horizontal or vertical position of a :
01
02
03
04
05
06
07
08
09
<!-- Pin to top left corner -->
<div class="relative size-32 ...">
<div class="absolute top-0 left-0 size-16 ...">01</div>
</div>
<!-- Span top edge -->
<div class="relative size-32 ...">
<div class="absolute inset-x-0 top-0 h-16 ...">02</div>
</div>
<!-- Pin to top right corner -->
<div class="relative size-32 ...">
<div class="absolute top-0 right-0 size-16 ...">03</div>
</div>
<!-- Span left edge -->
<div class="relative size-32 ...">
<div class="absolute inset-y-0 left-0 w-16 ...">04</div>
</div>
<!-- Fill entire parent -->
<div class="relative size-32 ...">
<div class="absolute inset-0 ...">05</div>
</div>
<!-- Span right edge -->
<div class="relative size-32 ...">
<div class="absolute inset-y-0 right-0 w-16 ...">06</div>
</div>
<!-- Pin to bottom left corner -->
<div class="relative size-32 ...">
<div class="absolute bottom-0 left-0 size-16 ...">07</div>
</div>
<!-- Span bottom edge -->
<div class="relative size-32 ...">
<div class="absolute inset-x-0 bottom-0 h-16 ...">08</div>
</div>
<!-- Pin to bottom right corner -->
<div class="relative size-32 ...">
<div class="absolute right-0 bottom-0 size-16 ...">09</div>
</div>

### Untitled

To use a negative top/right/bottom/left value, prefix the class name with a dash to convert it to a negative value:
<div class="relative size-32 ...">
<div class="absolute -top-4 -left-4 size-14 ..."></div>
</div>

### Untitled

Use start-<number> or end-<number> utilities like start-0 and end-4 to set the inset-inline-start and inset-inline-end , which map to either the left or right side based on the text direction:
Left-to-right
Right-to-left
<div dir="ltr">
<div class="relative size-32 ...">
<div class="absolute start-0 top-0 size-14 ..."></div>
</div>
<div>
<div dir="rtl">
<div class="relative size-32 ...">
<div class="absolute start-0 top-0 size-14 ..."></div>
</div>
<div></div>
</div>
</div>
</div>
For more control, you can also use the  to conditionally apply specific styles depending on the current text direction.

### Untitled

Use utilities like inset-[<value>] and top-[<value>] to set the position based on a completely custom value:
<div class="inset-[3px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the inset-(<custom-property>) syntax:
<div class="inset-(--my-position) ...">
<!-- ... -->
</div>
This is just a shorthand for inset-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix inset,inset-x,inset-y,start,end,top,left,bottom, and right utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="top-4 md:top-6 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The inset-<number>,inset-x-<number>,inset-y-<number>,start-<number>,end-<number>,top-<number>,left-<number>,bottom-<number>, and right-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
