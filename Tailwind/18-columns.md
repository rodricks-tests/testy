# columns

Utilities for controlling the number of columns within an element.
Show more

## Untitled

### Untitled

Use columns-<number> utilities like columns-3 to set the number of columns that should be created for the content within an element:
<div class="columns-3 ...">
<img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
<img class="aspect-square ..." src="/img/mountains-2.jpg" />
<img class="aspect-square ..." src="/img/mountains-3.jpg" />
<!-- ... -->
</div>
The column width will automatically adjust to accommodate the specified number of columns.

### Untitled

Use utilities like columns-xs and columns-sm to set the ideal column width for the content within an element:
Resize the example to see the expected behavior
<div class="columns-3xs ...">
<img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
<img class="aspect-square ..." src="/img/mountains-2.jpg" />
<img class="aspect-square ..." src="/img/mountains-3.jpg" />
<!-- ... -->
</div>
When setting the column width, the number of columns automatically adjusts to ensure they don't get too narrow.

### Untitled

Use the gap-<width> utilities to specify the width between columns:
<div class="columns-3 gap-8 ...">
<img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
<img class="aspect-square ..." src="/img/mountains-2.jpg" />
<img class="aspect-square ..." src="/img/mountains-3.jpg" />
<!-- ... -->
</div>
Learn more about the gap utilities in the .

### Untitled

Use the columns-[<value>] syntax to set the columns based on a completely custom value:
<div class="columns-[30vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the columns-(<custom-property>) syntax:
<div class="columns-(--my-columns) ...">
<!-- ... -->
</div>
This is just a shorthand for columns-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a columns utility with a breakpoint variant like sm: to only apply the utility at small screen sizes and above:
Resize the example to see the expected behavior
<div class="columns-2 gap-4 sm:columns-3 sm:gap-8 ...">
<img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
<img class="aspect-square ..." src="/img/mountains-2.jpg" />
<img class="aspect-square ..." src="/img/mountains-3.jpg" />
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --container-* theme variables to customize the fixed-width column utilities in your project:
@theme {
--container-4xs: 14rem;
}
Now the columns-4xs utility can be used in your markup:
<div class="columns-4xs">
<!-- ... -->
</div>
