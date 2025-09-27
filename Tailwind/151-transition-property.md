# transition-property

Utilities for controlling which CSS properties transition.

## Untitled

### Untitled

Use utilities like transition and transition-colors to specify which properties should transition when they change:
Hover the button to see the expected behavior
Save Changes
<button class="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...">
Save Changes
</button>

### Untitled

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the motion-safe and motion-reduce variants:
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
<!-- ... -->
</button>

### Untitled

Use the transition-[<value>] syntax to set the transition properties based on a completely custom value:
<button class="transition-[height] ...">
<!-- ... -->
</button>
For CSS variables, you can also use the transition-(<custom-property>) syntax:
<button class="transition-(--my-properties) ...">
<!-- ... -->
</button>
This is just a shorthand for transition-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a transition-property utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="transition-none md:transition-all ...">
<!-- ... -->
</button>
