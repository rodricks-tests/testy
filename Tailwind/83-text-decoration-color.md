# text-decoration-color

Utilities for controlling the color of text decorations.
Show more

## Untitled

### Untitled

Use utilities like decoration-sky-500 and decoration-pink-500 to change the  color of an element:
I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at . Outside of work, I like to  and have  fights.
<p>
I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings
at <a class="underline decoration-sky-500">My Company, Inc</a>. Outside
of work, I like to <a class="underline decoration-pink-500">watch pod-racing</a>
and have <a class="underline decoration-indigo-500">light-saber</a> fights.
</p>

### Untitled

Use the color opacity modifier to control the text decoration color opacity of an element:
I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at . Outside of work, I like to  and have  fights.
<p>
I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings
at <a class="underline decoration-sky-500/30">My Company, Inc</a>. Outside
of work, I like to <a class="underline decoration-pink-500/30">watch pod-racing</a>
and have <a class="underline decoration-indigo-500/30">light-saber</a> fights.
</p>

### Untitled

Use the decoration-[<value>] syntax to set the text decoration color based on a completely custom value:
<p class="decoration-[#50d71e] ...">
Lorem ipsum dolor sit amet...
</p>
For CSS variables, you can also use the decoration-(<custom-property>) syntax:
<p class="decoration-(--my-color) ...">
Lorem ipsum dolor sit amet...
</p>
This is just a shorthand for decoration-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a text-decoration-color utility with a variant like hover:* to only apply the utility in that state:
Hover over the text to see the expected behavior
The  jumps over the lazy dog.
<p>The <a href="..." class="underline hover:decoration-pink-500 ...">quick brown fox</a> jumps over the lazy dog.</p>
Learn more about using variants in the .

### Untitled

Prefix a text-decoration-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="underline decoration-sky-600 md:decoration-blue-400 ...">
Lorem ipsum dolor sit amet...
</p>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the decoration-regal-blue utility can be used in your markup:
<p class="decoration-regal-blue">
Lorem ipsum dolor sit amet...
</p>
