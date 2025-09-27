# box-shadow

Utilities for controlling the box shadow of an element.
Show more

## Untitled

### Untitled

Use utilities like shadow-sm and shadow-lg to apply different sized outer box shadows to an element:
shadow-md
shadow-lg
shadow-xl
<div class="shadow-md ..."></div>
<div class="shadow-lg ..."></div>
<div class="shadow-xl ..."></div>

### Untitled

Use the opacity modifier to adjust the opacity of the box shadow:
shadow-xl
shadow-xl/20
shadow-xl/30
<div class="shadow-xl ..."></div>
<div class="shadow-xl/20 ..."></div>
<div class="shadow-xl/30 ..."></div>
The default box shadow opacities are quite low (25% or less), so increasing the opacity (to like 50%) will make the box shadows more pronounced.

### Untitled

Use utilities like shadow-indigo-500 and shadow-cyan-500/50 to change the color of a box shadow:
shadow-cyan-500/50
Subscribe
shadow-blue-500/50
Subscribe
shadow-indigo-500/50
Subscribe
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50 ...">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">Subscribe</button>
By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use utilities like inset-shadow-xs and inset-shadow-sm to apply an inset box shadow to an element:
inset-shadow-2xs
inset-shadow-xs
inset-shadow-sm
<div class="inset-shadow-2xs ..."></div>
<div class="inset-shadow-xs ..."></div>
<div class="inset-shadow-sm ..."></div>
You can adjust the opacity of an inset shadow using the opacity modifier, like inset-shadow-sm/50. The default inset shadow opacities are quite low (5%), so increasing the opacity (to like 50%) will make the inset shadows more pronounced.

### Untitled

Use utilities like inset-shadow-indigo-500 and inset-shadow-cyan-500/50 to change the color of an inset box shadow:
inset-shadow-indigo-500
inset-shadow-indigo-500/50
<div class="inset-shadow-sm inset-shadow-indigo-500 ..."></div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50 ..."></div>
By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use ring or ring-<number> utilities like ring-2 and ring-4 to apply a solid box-shadow to an element:
ring
Subscribe
ring-2
Subscribe
ring-4
Subscribe
<button class="ring ...">Subscribe</button>
<button class="ring-2 ...">Subscribe</button>
<button class="ring-4 ...">Subscribe</button>
By default rings match the currentColor of the element they are applied to.

### Untitled

Use utilities like ring-indigo-500 and ring-cyan-500/50 to change the color of a ring:
ring-blue-500
Subscribe
ring-blue-500/50
Subscribe
<button class="ring-2 ring-blue-500 ...">Subscribe</button>
<button class="ring-2 ring-blue-500/50 ...">Subscribe</button>
By default rings have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use inset-ring or inset-ring-<number> utilities like inset-ring-2 and inset-ring-4 to apply a solid inset box-shadow to an element:
inset-ring
Subscribe
inset-ring-2
Subscribe
inset-ring-4
Subscribe
<button class="inset-ring ...">Subscribe</button>
<button class="inset-ring-2 ...">Subscribe</button>
<button class="inset-ring-4 ...">Subscribe</button>
By default inset rings match the currentColor of the element they are applied to.

### Untitled

Use utilities like inset-ring-indigo-500 and inset-ring-cyan-500/50 to change the color of an inset ring:
inset-ring-blue-500
Subscribe
inset-ring-blue-500/50
Subscribe
<button class="inset-ring-2 inset-ring-blue-500 ...">Subscribe</button>
<button class="inset-ring-2 inset-ring-blue-500/50 ...">Subscribe</button>
By default inset rings have an opacity of 100% but you can adjust this using the opacity modifier.

### Untitled

Use the shadow-none, inset-shadow-none,ring-0, and inset-ring-0 utilities to remove an existing box shadow from an element:
shadow-none
<div class="shadow-none ..."></div>

### Untitled

Use utilities like shadow-[<value>],inset-shadow-[<value>],ring-[<value>], and inset-ring-[<value>] to set the box shadow based on a completely custom value:
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the shadow-(<custom-property>) syntax:
<div class="shadow-(--my-shadow) ...">
<!-- ... -->
</div>
This is just a shorthand for shadow-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a box-shadow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="shadow-none md:shadow-lg ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

### Untitled

Use the --shadow-* theme variables to customize the box shadow utilities in your project:
@theme {
--shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
Now the shadow-3xl utility can be used in your markup:
<div class="shadow-3xl">
<!-- ... -->
</div>
Learn more about customizing your theme in the .

### Untitled

Use the --inset-shadow-* theme variables to customize the inset box shadow utilities in your project:
@theme {
--inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25);
}
Now the inset-shadow-md utility can be used in your markup:
<div class="inset-shadow-md">
<!-- ... -->
</div>
Learn more about customizing your theme in the .

### Untitled

Use the --color-* theme variables to customize the color utilities in your project:
@theme {
--color-regal-blue: #243c5a;
}
Now utilities like shadow-regal-blue,inset-shadow-regal-blue,ring-regal-blue, and inset-ring-regal-blue can be used in your markup:
<div class="shadow-regal-blue">
<!-- ... -->
</div>
