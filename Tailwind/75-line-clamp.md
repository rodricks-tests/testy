# line-clamp

Utilities for clamping text to a specific number of lines.

## Untitled

### Untitled

Use line-clamp-<number> utilities like line-clamp-2 and line-clamp-3 to truncate multi-line text after a specific number of lines:
Mar 10, 2020
Boost your conversion rate
Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
Lindsay Walton
<article>
<time>Mar 10, 2020</time>
<h2>Boost your conversion rate</h2>
<p class="line-clamp-3">
Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut
sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat
dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt
ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur
enim.
</p>
<div>
<img src="/img/lindsay.jpg" />
Lindsay Walton
</div>
</article>

### Untitled

Use line-clamp-none to undo a previously applied line clamp utility:
<p class="line-clamp-3 lg:line-clamp-none">
<!-- ... -->
</p>

### Untitled

Use the line-clamp-[<value>] syntax to set the number of lines based on a completely custom value:
<p class="line-clamp-[calc(var(--characters)/100)] ...">
Lorem ipsum dolor sit amet...
</p>
For CSS variables, you can also use the line-clamp-(<custom-property>) syntax:
<p class="line-clamp-(--my-line-count) ...">
Lorem ipsum dolor sit amet...
</p>
This is just a shorthand for line-clamp-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a line-clamp utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="line-clamp-3 md:line-clamp-4 ...">
<!-- ... -->
</div>
