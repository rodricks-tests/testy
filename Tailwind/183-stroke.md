# stroke

Utilities for styling the stroke of SVG elements.
Show more

## Untitled

### Untitled

Use utilities like stroke-indigo-500 and stroke-lime-600 to change the stroke color of an SVG:
<svg class="stroke-cyan-500 ...">
<!-- ... -->
</svg>
This can be useful for styling icon sets like .

### Untitled

Use the stroke-current utility to set the stroke color to the current text color:
Hover over the button to see the stroke color change
Download file
<button class="bg-white text-pink-600 hover:bg-pink-600 hover:text-white ...">
<svg class="size-5 stroke-current ..." fill="none">
<!-- ... -->
</svg>
Download file
</button>

### Untitled

Use the stroke-[<value>] syntax to set the stroke color based on a completely custom value:
<svg class="stroke-[#243c5a] ...">
<!-- ... -->
</svg>
For CSS variables, you can also use the stroke-(<custom-property>) syntax:
<svg class="stroke-(--my-stroke-color) ...">
<!-- ... -->
</svg>
This is just a shorthand for stroke-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a stroke utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<svg class="stroke-cyan-500 md:stroke-cyan-700 ...">
<!-- ... -->
</svg>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the stroke-regal-blue utility can be used in your markup:
<svg class="stroke-regal-blue">
<!-- ... -->
</svg>
