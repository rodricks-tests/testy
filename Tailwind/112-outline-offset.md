# outline-offset

Utilities for controlling the offset of an element's outline.

## Untitled

### Untitled

Use utilities like outline-offset-2 and outline-offset-4 to change the offset of an element's outline:
outline-offset-0
Button A
outline-offset-2
Button B
outline-offset-4
Button C
<button class="outline-2 outline-offset-0 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-2 outline-offset-4 ...">Button C</button>

### Untitled

Use the outline-offset-[<value>] syntax to set the outline offset based on a completely custom value:
<div class="outline-offset-[2vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the outline-offset-(<custom-property>) syntax:
<div class="outline-offset-(--my-outline-offset) ...">
<!-- ... -->
</div>
This is just a shorthand for outline-offset-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an outline-offset utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="outline md:outline-offset-2 ...">
<!-- ... -->
</div>
