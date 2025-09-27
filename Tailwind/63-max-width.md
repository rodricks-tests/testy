# max-width

Utilities for setting the maximum width of an element.
Show more

## Untitled

### Untitled

Use max-w-<number> utilities like max-w-24 and max-w-64 to set an element to a fixed maximum width based on the spacing scale:
Resize the example to see the expected behavior
max-w-96
max-w-80
max-w-64
max-w-48
max-w-40
max-w-32
max-w-24
<div class="w-full max-w-96 ...">max-w-96</div>
<div class="w-full max-w-80 ...">max-w-80</div>
<div class="w-full max-w-64 ...">max-w-64</div>
<div class="w-full max-w-48 ...">max-w-48</div>
<div class="w-full max-w-40 ...">max-w-40</div>
<div class="w-full max-w-32 ...">max-w-32</div>
<div class="w-full max-w-24 ...">max-w-24</div>

### Untitled

Use max-w-full or max-w-<fraction> utilities like max-w-1/2 and max-w-2/5 to give an element a percentage-based maximum width:
Resize the example to see the expected behavior
max-w-9/10
max-w-3/4
max-w-1/2
max-w-1/3
<div class="w-full max-w-9/10 ...">max-w-9/10</div>
<div class="w-full max-w-3/4 ...">max-w-3/4</div>
<div class="w-full max-w-1/2 ...">max-w-1/2</div>
<div class="w-full max-w-1/3 ...">max-w-1/3</div>

### Untitled

Use utilities like max-w-sm and max-w-xl to set an element to a fixed maximum width based on the container scale:
Resize the example to see the expected behavior
Andrew Alfred
Assistant to the Traveling Secretary
<div class="max-w-md ...">
<!-- ... -->
</div>

### Untitled

Use the container utility to set the maximum width of an element to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of screen sizes instead of trying to accommodate a fully fluid viewport:
<div class="container">
<!-- ... -->
</div>
Note that unlike containers you might have used in other frameworks, Tailwind's container does not center itself automatically and does not have any built-in horizontal padding. Use mx-auto and the px-<number> utilities to add these:
<div class="container mx-auto px-4">
<!-- ... -->
</div>

### Untitled

Use the max-w-[<value>] syntax to set the maximum width based on a completely custom value:
<div class="max-w-[220px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the max-w-(<custom-property>) syntax:
<div class="max-w-(--my-max-width) ...">
<!-- ... -->
</div>
This is just a shorthand for max-w-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a max-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="max-w-sm md:max-w-lg ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The max-w-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
