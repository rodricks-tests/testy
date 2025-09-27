# transform

Utilities for transforming elements.

## Untitled

### Untitled

If your transition performs better when rendered by the GPU instead of the CPU, you can force hardware acceleration by adding the transform-gpu utility:
<div class="scale-150 transform-gpu">
<!-- ... -->
</div>
Use the transform-cpu utility to force things back to the CPU if you need to undo this conditionally.

### Untitled

Use the transform-none utility to remove all of the transforms on an element at once:
<div class="skew-y-3 md:transform-none">
<!-- ... -->
</div>

### Untitled

Use the transform-[<value>] syntax to set the transform based on a completely custom value:
<div class="transform-[matrix(1,2,3,4,5,6)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the transform-(<custom-property>) syntax:
<div class="transform-(--my-transform) ...">
<!-- ... -->
</div>
This is just a shorthand for transform-[var(<custom-property>)] that adds the var() function for you automatically.
