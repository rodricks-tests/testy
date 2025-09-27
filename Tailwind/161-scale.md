# scale

Utilities for scaling elements.
Show more

## Untitled

### Untitled

Use scale-<number> utilities like scale-75 and scale-150 to scale an element by a percentage of its original size:
scale-75
scale-100
scale-125
<img class="scale-75 ..." src="/img/mountains.jpg" />
<img class="scale-100 ..." src="/img/mountains.jpg" />
<img class="scale-125 ..." src="/img/mountains.jpg" />

### Untitled

Use the scale-x-<number> utilities like scale-x-75 and -scale-x-150 to scale an element on the x-axis by a percentage of its original width:
scale-x-75
scale-x-100
scale-x-125
<img class="scale-x-75 ..." src="/img/mountains.jpg" />
<img class="scale-x-100 ..." src="/img/mountains.jpg" />
<img class="scale-x-125 ..." src="/img/mountains.jpg" />

### Untitled

Use the scale-y-<number> utilities like scale-y-75 and scale-y-150 to scale an element on the y-axis by a percentage of its original height:
scale-y-75
scale-y-100
scale-y-125
<img class="scale-y-75 ..." src="/img/mountains.jpg" />
<img class="scale-y-100 ..." src="/img/mountains.jpg" />
<img class="scale-y-125 ..." src="/img/mountains.jpg" />

### Untitled

Use -scale-<number>, -scale-x-<number> or -scale-y-<number> utilities like -scale-x-75 and -scale-125 to mirror and scale down an element by a percentage of its original size:
-scale-x-75
-scale-100
-scale-y-125
<img class="-scale-x-75 ..." src="/img/mountains.jpg" />
<img class="-scale-100 ..." src="/img/mountains.jpg" />
<img class="-scale-y-125 ..." src="/img/mountains.jpg" />

### Untitled

Use the scale-[<value>] syntax to set the scale based on a completely custom value:
<img class="scale-[1.7] ..." src="/img/mountains.jpg" />
For CSS variables, you can also use the scale-(<custom-property>) syntax:
<img class="scale-(--my-scale) ..." src="/img/mountains.jpg" />
This is just a shorthand for scale-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a scale utility with a variant like hover:* to only apply the utility in that state:
<img class="scale-95 hover:scale-120 ..." src="/img/mountains.jpg" />
