# border-color

Utilities for controlling the color of an element's borders.
Show more

## Untitled

### Untitled

Use utilities like border-rose-500 and border-lime-100 to control the border color of an element:
border-indigo-500
border-purple-500
border-sky-500
<div class="border-4 border-indigo-500 ..."></div>
<div class="border-4 border-purple-500 ..."></div>
<div class="border-4 border-sky-500 ..."></div>

### Untitled

Use the color opacity modifier to control the opacity of an element's border color:
border-indigo-500/100
border-indigo-500/75
border-indigo-500/50
<div class="border-4 border-indigo-500/100 ..."></div>
<div class="border-4 border-indigo-500/75 ..."></div>
<div class="border-4 border-indigo-500/50 ..."></div>

### Untitled

Use utilities like border-t-indigo-500 and border-r-lime-100 to set the border color for one side of an element:
border-t-indigo-500
border-r-indigo-500
border-b-indigo-500
border-l-indigo-500
<div class="border-4 border-indigo-200 border-t-indigo-500 ..."></div>
<div class="border-4 border-indigo-200 border-r-indigo-500 ..."></div>
<div class="border-4 border-indigo-200 border-b-indigo-500 ..."></div>
<div class="border-4 border-indigo-200 border-l-indigo-500 ..."></div>

### Untitled

Use utilities like border-x-indigo-500 and border-y-lime-100 to set the border color on two sides of an element at the same time:
border-x-indigo-500
border-y-indigo-500
<div class="border-4 border-indigo-200 border-x-indigo-500 ..."></div>
<div class="border-4 border-indigo-200 border-y-indigo-500 ..."></div>

### Untitled

Use utilities like border-s-indigo-500 and border-e-lime-100 to set the border-inline-start-color and border-inline-end-color , which map to either the left or right border based on the text direction:
Left-to-right
Right-to-left
<div dir="ltr">
<div class="border-s-indigo-500 ..."></div>
</div>
<div dir="rtl">
<div class="border-s-indigo-500 ..."></div>
</div>

### Untitled

Use utilities like divide-indigo-500 and divide-lime-100 to control the border color between child elements:
01
02
03
<div class="grid grid-cols-3 divide-x-4 divide-indigo-500">
<div>01</div>
<div>02</div>
<div>03</div>
</div>

### Untitled

Use the border-[<value>] syntax to set the border color based on a completely custom value:
<div class="border-[#243c5a] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the border-(<custom-property>) syntax:
<div class="border-(--my-border) ...">
<!-- ... -->
</div>
This is just a shorthand for border-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a border-color utility with a variant like focus:* to only apply the utility in that state:
Email address
<input class="border-2 border-gray-700 focus:border-pink-600 ..." />
Learn more about using variants in the .

### Untitled

Prefix a border-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="border-blue-500 md:border-green-500 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now the border-regal-blue utility can be used in your markup:
<div class="border-regal-blue">
<!-- ... -->
</div>
