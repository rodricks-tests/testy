# background-color

Utilities for controlling an element's background color.
Show more

## Untitled

### Untitled

Use utilities like bg-white, bg-indigo-500 and bg-transparent to control the background color of an element:
bg-blue-500
Button A
bg-cyan-500
Button B
bg-pink-500
Button C
<button class="bg-blue-500 ...">Button A</button>
<button class="bg-cyan-500 ...">Button B</button>
<button class="bg-pink-500 ...">Button C</button>

### Untitled

Use the color opacity modifier to control the opacity of an element's background color:
bg-sky-500/100
Button A
bg-sky-500/75
Button B
bg-sky-500/50
Button C
<button class="bg-sky-500/100 ..."></button>
<button class="bg-sky-500/75 ..."></button>
<button class="bg-sky-500/50 ..."></button>

### Untitled

Use the bg-[<value>] syntax to set the background color based on a completely custom value:
<div class="bg-[#50d71e] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the bg-(<custom-property>) syntax:
<div class="bg-(--my-color) ...">
<!-- ... -->
</div>
This is just a shorthand for bg-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a background-color utility with a variant like hover:* to only apply the utility in that state:
Save changes
<button class="bg-indigo-500 hover:bg-fuchsia-500 ...">Save changes</button>
Learn more about using variants in the .

### Untitled

Prefix a background-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="bg-blue-500 md:bg-green-500 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the bg-regal-blue utility can be used in your markup:
<div class="bg-regal-blue">
<!-- ... -->
</div>
