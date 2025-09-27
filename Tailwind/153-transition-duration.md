# transition-duration

Utilities for controlling the duration of CSS transitions.

## Untitled

### Untitled

Use utilities like duration-150 and duration-700 to set the transition duration of an element in milliseconds:
Hover each button to see the expected behavior
duration-150
Button A
duration-300
Button B
duration-700
Button C
<button class="transition duration-150 ease-in-out ...">Button A</button>
<button class="transition duration-300 ease-in-out ...">Button B</button>
<button class="transition duration-700 ease-in-out ...">Button C</button>

### Untitled

Use the duration-[<value>] syntax to set the transition duration based on a completely custom value:
<button class="duration-[1s,15s] ...">
<!-- ... -->
</button>
For CSS variables, you can also use the duration-(<custom-property>) syntax:
<button class="duration-(--my-duration) ...">
<!-- ... -->
</button>
This is just a shorthand for duration-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a transition-duration utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="duration-0 md:duration-150 ...">
<!-- ... -->
</button>
