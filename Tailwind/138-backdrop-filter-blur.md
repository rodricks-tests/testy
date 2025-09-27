# backdrop-filter: blur()

Utilities for applying backdrop blur filters to an element.

## Untitled

### Untitled

Use utilities like backdrop-blur-sm and backdrop-blur-lg to control an element’s backdrop blur:
backdrop-blur-none
backdrop-blur-sm
backdrop-blur-md
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-blur-none ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-blur-sm ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
<div class="bg-white/30 backdrop-blur-md ..."></div>
</div>

### Untitled

Use the backdrop-blur-[<value>] syntax to set the backdrop blur based on a completely custom value:
<div class="backdrop-blur-[2px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the backdrop-blur-(<custom-property>) syntax:
<div class="backdrop-blur-(--my-backdrop-blur) ...">
<!-- ... -->
</div>
This is just a shorthand for backdrop-blur-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a backdrop-filter: blur() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="backdrop-blur-none md:backdrop-blur-lg ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --blur-* theme variables to customize the backdrop blur utilities in your project:
@theme {
--blur-2xs: 2px;
}
Now the backdrop-blur-2xs utility can be used in your markup:
<div class="backdrop-blur-2xs">
<!-- ... -->
</div>
