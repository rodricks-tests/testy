# content

Utilities for controlling the content of the before and after pseudo-elements.

## Untitled

### Untitled

Use the content-[<value>] syntax, along with the before and after variants, to set the contents of the ::before and ::after pseudo-elements:
Higher resolution means more than just a better-quality image. With a Retina 6K display,  gives you nearly 40 percent more screen real estate than a 5K display.
<p>Higher resolution means more than just a better-quality image. With a
Retina 6K display, <a class="text-blue-600 after:content-['_↗']" href="...">
Pro Display XDR</a> gives you nearly 40 percent more screen real estate than
a 5K display.</p>

### Untitled

Use the content-[attr(<name>)] syntax to reference a value stored in an attribute using the attr() CSS function:
<p before="Hello World" class="before:content-[attr(before)] ...">
<!-- ... -->
</p>

### Untitled

Since whitespace denotes the end of a class in HTML, replace any spaces in an arbitrary value with an underscore:
<p class="before:content-['Hello_World'] ..."></p>
If you need to include an actual underscore, you can do this by escaping it with a backslash:
<p class="before:content-['Hello\_World']"></p>

### Untitled

Use the content-(<custom-property>) syntax to control the contents of the ::before and ::after pseudo-elements using a CSS variable:
<p class="content-(--my-content)"></p>
This is just a shorthand for content-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="before:content-['Mobile'] md:before:content-['Desktop'] ..."></p>
