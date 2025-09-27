# border-radius

Utilities for controlling the border radius of an element.
Show more

## Untitled

### Untitled

Use utilities like rounded-sm and rounded-md to apply different border radius sizes to an element:
rounded-sm
rounded-md
rounded-lg
rounded-xl
<div class="rounded-sm ..."></div>
<div class="rounded-md ..."></div>
<div class="rounded-lg ..."></div>
<div class="rounded-xl ..."></div>

### Untitled

Use utilities like rounded-t-md and rounded-r-lg to only round one side of an element:
rounded-t-lg
rounded-r-lg
rounded-b-lg
rounded-l-lg
<div class="rounded-t-lg ..."></div>
<div class="rounded-r-lg ..."></div>
<div class="rounded-b-lg ..."></div>
<div class="rounded-l-lg ..."></div>

### Untitled

Use utilities like rounded-tr-md and rounded-tl-lg utilities to only round one corner of an element:
rounded-tl-lg
rounded-tr-lg
rounded-br-lg
rounded-bl-lg
<div class="rounded-tl-lg ..."></div>
<div class="rounded-tr-lg ..."></div>
<div class="rounded-br-lg ..."></div>
<div class="rounded-bl-lg ..."></div>

### Untitled

Use utilities like rounded-s-md and rounded-se-xl to set the border radius using , which map to the appropriate corners based on the text direction:
Left-to-right
Right-to-left
<div dir="ltr">
<div class="rounded-s-lg ..."></div>
</div>
<div dir="rtl">
<div class="rounded-s-lg ..."></div>
</div>
Here are all the available border radius logical property utilities and their physical property equivalents in both LTR and RTL modes.
For more control, you can also use the  to conditionally apply specific styles depending on the current text direction.

### Untitled

Use the rounded-full utility to create pill buttons:
rounded-full
Save Changes
<button class="rounded-full ...">Save Changes</button>

### Untitled

Use the rounded-none utility to remove an existing border radius from an element:
rounded-none
Save Changes
<button class="rounded-none ...">Save Changes</button>

### Untitled

Use the rounded-[<value>] syntax to set the border radius based on a completely custom value:
<div class="rounded-[2vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the rounded-(<custom-property>) syntax:
<div class="rounded-(--my-radius) ...">
<!-- ... -->
</div>
This is just a shorthand for rounded-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a border-radius utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="rounded md:rounded-lg ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --radius-* theme variables to customize the border radius utilities in your project:
@theme {
--radius-5xl: 3rem;
}
Now the rounded-5xl utility can be used in your markup:
<div class="rounded-5xl">
<!-- ... -->
</div>
