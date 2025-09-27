# scroll-padding

Utilities for controlling an element's scroll offset within a snap container.
Show more

## Untitled

### Untitled

Use the scroll-pt-<number>, scroll-pr-<number>, scroll-pb-<number>, and scroll-pl-<number> utilities like scroll-pl-4 and scroll-pt-6 to set the scroll offset of an element within a snap container:
Scroll in the grid of images to see the expected behavior
<div class="snap-x scroll-pl-6 ...">
<div class="snap-start ...">
<img src="/img/vacation-01.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-02.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-03.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-04.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-05.jpg" />
</div>
</div>

### Untitled

Use the scroll-ps-<number> and scroll-pe-<number> utilities to set the scroll-padding-inline-start and scroll-padding-inline-end logical properties, which map to either the left or right side based on the text direction:
Scroll in the grid of images to see the expected behavior
Left-to-right
Right-to-left
<div dir="ltr">
<div class="snap-x scroll-ps-6 ...">
<!-- ... -->
</div>
</div>
<div dir="rtl">
<div class="snap-x scroll-ps-6 ...">
<!-- ... -->
</div>
</div>

### Untitled

To use a negative scroll padding value, prefix the class name with a dash to convert it to a negative value:
<div class="-scroll-ps-6 snap-x ...">
<!-- ... -->
</div>

### Untitled

Use utilities like scroll-pl-[<value>] and scroll-pe-[<value>] to set the scroll padding based on a completely custom value:
<div class="scroll-pl-[24rem] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the scroll-pl-(<custom-property>) syntax:
<div class="scroll-pl-(--my-scroll-padding) ...">
<!-- ... -->
</div>
This is just a shorthand for scroll-pl-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a scroll-padding utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="scroll-p-8 md:scroll-p-0 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The scroll-p-<number>,scroll-px-<number>,scroll-py-<number>,scroll-ps-<number>,scroll-pe-<number>,scroll-pt-<number>,scroll-pr-<number>,scroll-pb-<number>, and scroll-pl-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
scroll-snap-align
Utilities for controlling the scroll snap alignment of an element.
Class
Styles
snap-start
scroll-snap-align: start;
snap-end
scroll-snap-align: end;
snap-center
scroll-snap-align: center;
snap-align-none
scroll-snap-align: none;
Examples
Snapping to the center
Use the snap-center utility to snap an element to its center when being scrolled inside a snap container:
Scroll in the grid of images to see the expected behavior
snap point
<div class="snap-x ...">
<div class="snap-center ...">
<img src="/img/vacation-01.jpg" />
</div>
<div class="snap-center ...">
<img src="/img/vacation-02.jpg" />
</div>
<div class="snap-center ...">
<img src="/img/vacation-03.jpg" />
</div>
<div class="snap-center ...">
<img src="/img/vacation-04.jpg" />
</div>
<div class="snap-center ...">
<img src="/img/vacation-05.jpg" />
</div>
<div class="snap-center ...">
<img src="/img/vacation-06.jpg" />
</div>
</div>
Snapping to the start
Use the snap-start utility to snap an element to its start when being scrolled inside a snap container:
Scroll in the grid of images to see the expected behavior
snap point
<div class="snap-x ...">
<div class="snap-start ...">
<img src="/img/vacation-01.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-02.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-03.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-04.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-05.jpg" />
</div>
<div class="snap-start ...">
<img src="/img/vacation-06.jpg" />
</div>
</div>
Snapping to the end
Use the snap-end utility to snap an element to its end when being scrolled inside a snap container:
Scroll in the grid of images to see the expected behavior
snap point
<div class="snap-x ...">
<div class="snap-end ...">
<img src="/img/vacation-01.jpg" />
</div>
<div class="snap-end ...">
<img src="/img/vacation-02.jpg" />
</div>
<div class="snap-end ...">
<img src="/img/vacation-03.jpg" />
</div>
<div class="snap-end ...">
<img src="/img/vacation-04.jpg" />
</div>
<div class="snap-end ...">
<img src="/img/vacation-05.jpg" />
</div>
<div class="snap-end ...">
<img src="/img/vacation-06.jpg" />
</div>
</div>
Responsive design
Prefix a scroll-snap-align utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="snap-center md:snap-start ...">
<!-- ... -->
</div>
