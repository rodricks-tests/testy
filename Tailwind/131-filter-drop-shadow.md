# filter: drop-shadow()

Utilities for applying drop-shadow filters to an element.
Show more

## Untitled

### Untitled

Use utilities like drop-shadow-sm and drop-shadow-xl to add a drop shadow to an element:
drop-shadow-md
drop-shadow-lg
drop-shadow-xl
<svg class="drop-shadow-md ...">
<!-- ... -->
</svg>
<svg class="drop-shadow-lg ...">
<!-- ... -->
</svg>
<svg class="drop-shadow-xl ...">
<!-- ... -->
</svg>
This is useful for applying shadows to irregular shapes, like text and SVG elements. For applying shadows to regular elements, you probably want to use  instead.

### Untitled

Use the opacity modifier to adjust the opacity of the drop shadow:
drop-shadow-xl
drop-shadow-xl/25
drop-shadow-xl/50
<svg class="fill-white drop-shadow-xl ...">...</svg>
<svg class="fill-white drop-shadow-xl/25 ...">...</svg>
<svg class="fill-white drop-shadow-xl/50 ...">...</svg>
The default drop shadow opacities are quite low (15% or less), so increasing the opacity (to like 50%) will make the drop shadows more pronounced.

### Untitled

Use utilities like drop-shadow-indigo-500 and drop-shadow-cyan-500/50 to change the color of a drop shadow:
drop-shadow-cyan-500/50
drop-shadow-indigo-500/50
<svg class="fill-cyan-500 drop-shadow-lg drop-shadow-cyan-500/50 ...">...</svg>
<svg class="fill-indigo-500 drop-shadow-lg drop-shadow-indigo-500/50 ...">...</svg>
By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use the drop-shadow-none utility to remove an existing drop shadow from an element:
<svg class="drop-shadow-lg dark:drop-shadow-none">
<!-- ... -->
</svg>

### Untitled

Use the drop-shadow-[<value>] syntax to set the drop shadow based on a completely custom value:
<svg class="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ...">
<!-- ... -->
</svg>
For CSS variables, you can also use the drop-shadow-(<custom-property>) syntax:
<svg class="drop-shadow-(--my-drop-shadow) ...">
<!-- ... -->
</svg>
This is just a shorthand for drop-shadow-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: drop-shadow() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<svg class="drop-shadow-md md:drop-shadow-xl ...">
<!-- ... -->
</svg>
Learn more about using variants in the .

## Untitled

### Untitled

Use the --drop-shadow-* theme variables to customize the drop shadow utilities in your project:
@theme {
--drop-shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
Now the drop-shadow-3xl utility can be used in your markup:
<svg class="drop-shadow-3xl">
<!-- ... -->
</svg>
Learn more about customizing your theme in the .

### Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the drop-shadow-regal-blue utility can be used in your markup:
<svg class="drop-shadow-regal-blue">
<!-- ... -->
</svg>
