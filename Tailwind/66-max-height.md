# max-height

Utilities for setting the maximum height of an element.
Show more

## Untitled

### Untitled

Use max-h-<number> utilities like max-h-24 and max-h-64 to set an element to a fixed maximum height based on the spacing scale:
max-h-80
max-h-64
max-h-48
max-h-40
max-h-32
max-h-24
<div class="h-96 ...">
<div class="h-full max-h-80 ...">max-h-80</div>
<div class="h-full max-h-64 ...">max-h-64</div>
<div class="h-full max-h-48 ...">max-h-48</div>
<div class="h-full max-h-40 ...">max-h-40</div>
<div class="h-full max-h-32 ...">max-h-32</div>
<div class="h-full max-h-24 ...">max-h-24</div>
</div>

### Untitled

Use max-h-full or max-h-<fraction> utilities like max-h-1/2 and max-h-2/5 to give an element a percentage-based maximum height:
max-h-9/10
max-h-3/4
max-h-1/2
max-h-1/4
max-h-full
<div class="h-96 ...">
<div class="h-full max-h-9/10 ...">max-h-9/10</div>
<div class="h-full max-h-3/4 ...">max-h-3/4</div>
<div class="h-full max-h-1/2 ...">max-h-1/2</div>
<div class="h-full max-h-1/4 ...">max-h-1/4</div>
<div class="h-full max-h-full ...">max-h-full</div>
</div>

### Untitled

Use the max-h-[<value>] syntax to set the maximum height based on a completely custom value:
<div class="max-h-[220px] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the max-h-(<custom-property>) syntax:
<div class="max-h-(--my-max-height) ...">
<!-- ... -->
</div>
This is just a shorthand for max-h-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a max-height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="h-48 max-h-full md:max-h-screen ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The max-h-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
