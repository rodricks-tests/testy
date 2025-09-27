# list-style-type

Utilities for controlling the marker style of a list.

## Untitled

### Untitled

Use utilities like list-disc and list-decimal to control the style of the markers in a list:
list-disc
Now this is a story all about how, my life got flipped-turned upside down
And I'd like to take a minute just sit right there
I'll tell you how I became the prince of a town called Bel-Air
list-decimal
Now this is a story all about how, my life got flipped-turned upside down
And I'd like to take a minute just sit right there
I'll tell you how I became the prince of a town called Bel-Air
list-none
Now this is a story all about how, my life got flipped-turned upside down
And I'd like to take a minute just sit right there
I'll tell you how I became the prince of a town called Bel-Air
<ul class="list-disc">
<li>Now this is a story all about how, my life got flipped-turned upside down</li>
<!-- ... -->
</ul>
<ol class="list-decimal">
<li>Now this is a story all about how, my life got flipped-turned upside down</li>
<!-- ... -->
</ol>
<ul class="list-none">
<li>Now this is a story all about how, my life got flipped-turned upside down</li>
<!-- ... -->
</ul>

### Untitled

Use the list-[<value>] syntax to set the marker based on a completely custom value:
<ol class="list-[upper-roman] ...">
<!-- ... -->
</ol>
For CSS variables, you can also use the list-(<custom-property>) syntax:
<ol class="list-(--my-marker) ...">
<!-- ... -->
</ol>
This is just a shorthand for list-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a list-style-type utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<ul class="list-none md:list-disc ...">
<!-- ... -->
</ul>
