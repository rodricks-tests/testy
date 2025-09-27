# outline-width

Utilities for controlling the width of an element's outline.

## Untitled

### Untitled

Use outline or outline-<number> utilities like outline-2 and outline-4 to set the width of an element's outline:
outline
Button A
outline-2
Button B
outline-4
Button C
<button class="outline outline-offset-2 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-4 outline-offset-2 ...">Button C</button>

### Untitled

Prefix an outline-width utility with a variant like focus:* to only apply the utility in that state:
Focus the button to see the outline added
Save Changes
<button class="outline-offset-2 outline-sky-500 focus:outline-2 ...">Save Changes</button>
Learn more about using variants in the .

### Untitled

Use the outline-[<value>] syntax to set the outline width based on a completely custom value:
<div class="outline-[2vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the outline-(length:<custom-property>) syntax:
<div class="outline-(length:--my-outline-width) ...">
<!-- ... -->
</div>
This is just a shorthand for outline-[length:var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an outline-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="outline md:outline-2 ...">
<!-- ... -->
</div>
