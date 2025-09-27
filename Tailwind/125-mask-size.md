# mask-size

Utilities for controlling the size of an element's mask image.

## Untitled

### Untitled

Use the mask-cover utility to scale the mask image until it fills the mask layer, cropping the image if needed:
<div class="mask-cover mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-contain utility to scale the mask image to the outer edges without cropping or stretching:
<div class="mask-contain mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-auto utility to display the mask image at its default size:
<div class="mask-auto mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>

### Untitled

Use the mask-size-[<value>] syntax to set the mask image size based on a completely custom value:
<div class="mask-size-[auto_100px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the mask-size-(<custom-property>) syntax:
<div class="mask-size-(--my-mask-size) ...">
<!-- ... -->
</div>
This is just a shorthand for mask-size-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a mask-size utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="mask-auto md:mask-contain ...">
<!-- ... -->
</div>
