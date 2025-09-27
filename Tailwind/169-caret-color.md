# caret-color

Utilities for controlling the color of the text input cursor.
Show more

## Untitled

### Untitled

Use utilities like caret-rose-500 and caret-lime-600 to change the color of the text input cursor:
Focus the textarea to see the new caret color
<textarea class="caret-pink-500 ..."></textarea>

### Untitled

Use the caret-[<value>] syntax to set the caret color based on a completely custom value:
<textarea class="caret-[#50d71e] ..."></textarea>
For CSS variables, you can also use the caret-(<custom-property>) syntax:
<textarea class="caret-(--my-caret-color) ..."></textarea>
This is just a shorthand for caret-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a caret-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<textarea class="caret-rose-500 md:caret-lime-600 ..."></textarea>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the caret-regal-blue utility can be used in your markup:
<textarea class="caret-regal-blue"></textarea>
