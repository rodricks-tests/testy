# transition-delay

Utilities for controlling the delay of CSS transitions.

## Untitled

### Untitled

Use utilities like delay-150 and delay-700 to set the transition delay of an element in milliseconds:
Hover each button to see the expected behavior
delay-150
Button A
delay-300
Button B
delay-700
Button C
<button class="transition delay-150 duration-300 ease-in-out ...">Button A</button>
<button class="transition delay-300 duration-300 ease-in-out ...">Button B</button>
<button class="transition delay-700 duration-300 ease-in-out ...">Button C</button>

### Untitled

Use the delay-[<value>] syntax to set the transition delay based on a completely custom value:
<button class="delay-[1s,250ms] ...">
<!-- ... -->
</button>
For CSS variables, you can also use the delay-(<custom-property>) syntax:
<button class="delay-(--my-delay) ...">
<!-- ... -->
</button>
This is just a shorthand for delay-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a transition-delay utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="delay-150 md:delay-300 ...">
<!-- ... -->
</button>
