# outline-style

Utilities for controlling the style of an element's outline.

## Untitled

### Untitled

Use utilities like outline-solid and outline-dashed to set the style of an element's outline:
outline-solid
Button A
outline-dashed
Button B
outline-dotted
Button C
outline-double
Button D
<button class="outline-2 outline-offset-2 outline-solid ...">Button A</button>
<button class="outline-2 outline-offset-2 outline-dashed ...">Button B</button>
<button class="outline-2 outline-offset-2 outline-dotted ...">Button C</button>
<button class="outline-3 outline-offset-2 outline-double ...">Button D</button>

### Untitled

Use the outline-hidden utility to hide the default browser outline on focused elements, while still preserving the outline in forced colors mode:
Try emulating `forced-colors: active` in your developer tools to see the behavior
<input class="focus:border-indigo-600 focus:outline-hidden ..." type="text" />
It is highly recommended to apply your own focus styling for accessibility when using this utility.

### Untitled

Use the outline-none utility to completely remove the default browser outline on focused elements:
Post
<div class="focus-within:outline-2 focus-within:outline-indigo-600 ...">
<textarea class="outline-none ..." placeholder="Leave a comment..." />
<button class="..." type="button">Post</button>
</div>
It is highly recommended to apply your own focus styling for accessibility when using this utility.

### Untitled

Prefix an outline-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="outline md:outline-dashed ...">
<!-- ... -->
</div>
