# flex-basis

Utilities for controlling the initial size of flex items.
Show more

## Untitled

### Untitled

Use basis-<number> utilities like basis-64 and basis-128 to set the initial size of flex items based on the spacing scale:
01
02
03
<div class="flex flex-row">
<div class="basis-64">01</div>
<div class="basis-64">02</div>
<div class="basis-128">03</div>
</div>

### Untitled

Use utilities like basis-xs and basis-sm to set the initial size of flex items based on the container scale:
01
02
03
04
<div class="flex flex-row">
<div class="basis-3xs">01</div>
<div class="basis-2xs">02</div>
<div class="basis-xs">03</div>
<div class="basis-sm">04</div>
</div>

### Untitled

Use basis-<fraction> utilities like basis-1/2 and basis-2/3 to set the initial size of flex items:
01
02
<div class="flex flex-row">
<div class="basis-1/3">01</div>
<div class="basis-2/3">02</div>
</div>

### Untitled

Use the basis-[<value>] syntax to set the basis based on a completely custom value:
<div class="basis-[30vw] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the basis-(<custom-property>) syntax:
<div class="basis-(--my-basis) ...">
<!-- ... -->
</div>
This is just a shorthand for basis-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a flex-basis utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="flex flex-row">
<div class="basis-1/4 md:basis-1/3">01</div>
<div class="basis-1/4 md:basis-1/3">02</div>
<div class="basis-1/2 md:basis-1/3">03</div>
</div>
Learn more about using variants in the .

## Untitled

Use the --container-* theme variables to customize the fixed-width basis utilities in your project:
@theme {
--container-4xs: 14rem;
}
Now the basis-4xs utility can be used in your markup:
<div class="basis-4xs">
<!-- ... -->
</div>
The basis-<number> utilities are driven by the --spacing theme variable, which you can also customize:
@theme {
--spacing: 1px;
}
flex-direction
Utilities for controlling the direction of flex items.

## Untitled

### Untitled

Use flex-row to position flex items horizontally in the same direction as text:
01
02
03
<div class="flex flex-row ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use flex-row-reverse to position flex items horizontally in the opposite direction:
01
02
03
<div class="flex flex-row-reverse ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use flex-col to position flex items vertically:
01
02
03
<div class="flex flex-col ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use flex-col-reverse to position flex items vertically in the opposite direction:
01
02
03
<div class="flex flex-col-reverse ...">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Prefix a flex-direction utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="flex flex-col md:flex-row ...">
<!-- ... -->
</div>
