# aspect-ratio

Utilities for controlling the aspect ratio of an element.

## Untitled

### Untitled

Use aspect-<ratio> utilities like aspect-3/2 to give an element a specific aspect ratio:
Resize the example to see the expected behavior
<img class="aspect-3/2 object-cover ..." src="/img/villas.jpg" />

### Untitled

Use the aspect-video utility to give a video element a 16 / 9 aspect ratio:
Resize the example to see the expected behavior
<iframe class="aspect-video ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>

### Untitled

Use the aspect-[<value>] syntax to set the aspect ratio based on a completely custom value:
<img class="aspect-[calc(4*3+1)/3] ..." src="/img/villas.jpg" />
For CSS variables, you can also use the aspect-(<custom-property>) syntax:
<img class="aspect-(--my-aspect-ratio) ..." src="/img/villas.jpg" />
This is just a shorthand for aspect-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an aspect-ratio utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<iframe class="aspect-video md:aspect-square ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
Learn more about using variants in the .

## Untitled

Use the --aspect-* theme variables to customize the aspect ratio utilities in your project:
@theme {
--aspect-retro: 4 / 3;
}
Now the aspect-retro utility can be used in your markup:
<iframe class="aspect-retro" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></
