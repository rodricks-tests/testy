# transition-timing-function

Utilities for controlling the easing of CSS transitions.

## Untitled

### Untitled

Use utilities like ease-in and ease-out to control the easing curve of an element's transition:
Hover each button to see the expected behavior
ease-in
Button A
ease-out
Button B
ease-in-out
Button C
<button class="duration-300 ease-in ...">Button A</button>
<button class="duration-300 ease-out ...">Button B</button>
<button class="duration-300 ease-in-out ...">Button C</button>

### Untitled

Use the ease-[<value>] syntax to set the transition timing function based on a completely custom value:
<button class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ...">
<!-- ... -->
</button>
For CSS variables, you can also use the ease-(<custom-property>) syntax:
<button class="ease-(--my-ease) ...">
<!-- ... -->
</button>
This is just a shorthand for ease-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a transition-timing-function utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="ease-out md:ease-in ...">
<!-- ... -->
</button>
Learn more about using variants in the .

## Untitled

Use the --ease-* theme variables to customize the transition timing function utilities in your project:
@theme {
--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
Now the ease-in-expo utility can be used in your markup:
<button class="ease-in-expo">
<!-- ... -->
</button>
