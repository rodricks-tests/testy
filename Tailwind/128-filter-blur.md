# filter: blur()

Utilities for applying blur filters to an element.

## Untitled

### Untitled

Use utilities like blur-sm and blur-lg to blur an element:
blur-none
blur-sm
blur-lg
blur-2xl
<img class="blur-none" src="/img/mountains.jpg" />
<img class="blur-sm" src="/img/mountains.jpg" />
<img class="blur-lg" src="/img/mountains.jpg" />
<img class="blur-2xl" src="/img/mountains.jpg" />

### Untitled

Use the blur-[<value>] syntax to set the blur based on a completely custom value:
<img class="blur-[2px] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the blur-(<custom-property>) syntax:
<img class="blur-(--my-blur) ..." src="/img/mountains.jpg" />
This is just a shorthand for blur-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a filter: blur() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<img class="blur-none md:blur-lg ..." src="/img/mountains.jpg" />
Learn more about using variants in the .

## Untitled

Use the --blur-* theme variables to customize the blur utilities in your project:
@theme {
--blur-2xs: 2px;
}
Now the blur-2xs utility can be used in your markup:
<img class="blur-2xs" src="/img/mountains.jpg" />
