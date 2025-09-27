# accent-color

Utilities for controlling the accented color of a form control.
Show more

## Untitled

### Untitled

Use utilities like accent-rose-500 and accent-lime-600 to change the accent color of an element:
Browser default
Customized
<label>
<input type="checkbox" checked />
Browser default
</label>
<label>
<input class="accent-pink-500" type="checkbox" checked />
Customized
</label>
This is helpful for styling elements like checkboxes and radio groups by overriding the browser's default color.

### Untitled

Use the color opacity modifier to control the opacity of an element's accent color:
accent-purple-500/25
accent-purple-500/75
<input class="accent-purple-500/25" type="checkbox" checked />
<input class="accent-purple-500/75" type="checkbox" checked />
Setting the accent color opacity has limited browser-support and only works in Firefox at this time.

### Untitled

Use the accent-[<value>] syntax to set the accent color based on a completely custom value:
<input class="accent-[#50d71e] ..." type="checkbox" />
For CSS variables, you can also use the accent-(<custom-property>) syntax:
<input class="accent-(--my-accent-color) ..." type="checkbox" />
This is just a shorthand for accent-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix an accent-color utility with a variant like hover:* to only apply the utility in that state:
Agree to terms
<input class="accent-black hover:accent-pink-500" type="checkbox" />
Learn more about using variants in the .

### Untitled

Prefix an accent-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<input class="accent-black md:accent-pink-500 ..." type="checkbox" />
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the accent-regal-blue utility can be used in your markup:
<input class="accent-regal-blue" type="checkbox" />
