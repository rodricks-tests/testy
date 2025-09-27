# fill

Utilities for styling the fill of SVG elements.
Show more

## Untitled

### Untitled

Use utilities like fill-indigo-500 and fill-lime-600 to change the fill color of an SVG:
<svg class="fill-blue-500 ...">
<!-- ... -->
</svg>
This can be useful for styling icon sets like .

### Untitled

Use the fill-current utility to set the fill color to the current text color:
Hover over the button to see the fill color change
Check for updates
<button class="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white ...">
<svg class="size-5 fill-current ...">
<!-- ... -->
</svg>
Check for updates
</button>

### Untitled

Use the fill-[<value>] syntax to set the fill color based on a completely custom value:
<svg class="fill-[#243c5a] ...">
<!-- ... -->
</svg>
For CSS variables, you can also use the fill-(<custom-property>) syntax:
<svg class="fill-(--my-fill-color) ...">
<!-- ... -->
</svg>
This is just a shorthand for fill-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a fill utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<svg class="fill-cyan-500 md:fill-cyan-700 ...">
<!-- ... -->
</svg>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the fill-regal-blue utility can be used in your markup:
<svg class="fill-regal-blue">
<!-- ... -->
</svg>
