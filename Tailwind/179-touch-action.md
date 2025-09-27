# touch-action

Utilities for controlling how an element can be scrolled and zoomed on touchscreens.

## Untitled

### Untitled

Use utilities like touch-pan-y and touch-pinch-zoom to control how an element can be scrolled (panned) and zoomed (pinched) on touchscreens:
Try panning these images on a touchscreen
touch-auto
touch-none
touch-pan-x
touch-pan-y
<div class="h-48 w-full touch-auto overflow-auto ...">
<img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-none overflow-auto ...">
<img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-pan-x overflow-auto ...">
<img class="h-auto w-[150%] max-w-none" src="..." />
</div>
<div class="h-48 w-full touch-pan-y overflow-auto ...">
<img class="h-auto w-[150%] max-w-none" src="..." />
</div>

### Untitled

Prefix a touch-action utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="touch-pan-x md:touch-auto ...">
<!-- ... -->
</div>
