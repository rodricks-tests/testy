# text-shadow

Utilities for controlling the shadow of a text element.
Show more

## Untitled

### Untitled

Use utilities like text-shadow-sm and shadow-lg to apply different sized text shadows to a text element:
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
<p class="text-shadow-2xs ...">The quick brown fox...</p>
<p class="text-shadow-xs ...">The quick brown fox...</p>
<p class="text-shadow-sm ...">The quick brown fox...</p>
<p class="text-shadow-md ...">The quick brown fox...</p>
<p class="text-shadow-lg ...">The quick brown fox...</p>

### Untitled

Use the opacity modifier to adjust the opacity of the text shadow:
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
<p class="text-shadow-lg ...">The quick brown fox...</p>
<p class="text-shadow-lg/20 ...">The quick brown fox...</p>
<p class="text-shadow-lg/30 ...">The quick brown fox...</p>
The default text shadow opacities are quite low (20% or less), so increasing the opacity (to like 50%) will make the text shadows more pronounced.

### Untitled

Use utilities like text-shadow-indigo-500 and text-shadow-cyan-500/50 to change the color of a text shadow:
Book a demo
Book a demo
See pricing
<button class="text-sky-950 text-shadow-2xs text-shadow-sky-300 ...">Book a demo</button>
<button class="text-gray-950 dark:text-white dark:text-shadow-2xs ...">See pricing</button>
By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use the text-shadow-none utility to remove an existing text shadow from an element:
<p class="text-shadow-lg dark:text-shadow-none">
<!-- ... -->
</p>

### Untitled

Use the text-shadow-[<value>] syntax to set the text shadow based on a completely custom value:
<p class="text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] ...">
Lorem ipsum dolor sit amet...
</p>
For CSS variables, you can also use the text-shadow-(<custom-property>) syntax:
<p class="text-shadow-(--my-text-shadow) ...">
Lorem ipsum dolor sit amet...
</p>
This is just a shorthand for text-shadow-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a text-shadow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="text-shadow-none md:text-shadow-lg ...">
Lorem ipsum dolor sit amet...
</p>
Learn more about using variants in the .

## Untitled

### Untitled

Use the --text-shadow-* theme variables to customize the text shadow utilities in your project:
@theme {
--text-shadow-xl: 0 35px 35px rgb(0, 0, 0 / 0.25);
}
Now the text-shadow-xl utility can be used in your markup:
<p class="text-shadow-xl">
Lorem ipsum dolor sit amet...
</p>
Learn more about customizing your theme in the .

### Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the text-shadow-regal-blue utility can be used in your markup:
<p class="text-shadow-regal-blue">
Lorem ipsum dolor sit amet...
</p>
