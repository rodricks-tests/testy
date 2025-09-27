# outline-color

Utilities for controlling the color of an element's outline.
Show more

## Untitled

### Untitled

Use utilities like outline-rose-500 and outline-lime-100 to control the color of an element's outline:
outline-blue-500
Button A
outline-cyan-500
Button B
outline-pink-500
Button C
<button class="outline-2 outline-offset-2 outline-blue-500 ...">Button A</button>
<button class="outline-2 outline-offset-2 outline-cyan-500 ...">Button B</button>
<button class="outline-2 outline-offset-2 outline-pink-500 ...">Button C</button>

### Untitled

Use the color opacity modifier to control the opacity of an element's outline color:
outline-blue-500/100
Button A
outline-blue-500/75
Button B
outline-blue-500/50
Button C
<button class="outline-2 outline-blue-500/100 ...">Button A</button>
<button class="outline-2 outline-blue-500/75 ...">Button B</button>
<button class="outline-2 outline-blue-500/50 ...">Button C</button>

### Untitled

Use the outline-[<value>] syntax to set the outline color based on a completely custom value:
<div class="outline-[#243c5a] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the outline-(<custom-property>) syntax:
<div class="outline-(--my-color) ...">
<!-- ... -->
</div>
This is just a shorthand for outline-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an outline-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="outline md:outline-blue-400 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the outline-regal-blue utility can be used in your markup:
<div class="outline-regal-blue">
<!-- ... -->
</div>
