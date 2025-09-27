# scroll-margin

Utilities for controlling the scroll offset around items in a snap container.
Show more

## Untitled

### Untitled

Use the scroll-mt-<number>, scroll-mr-<number>, scroll-mb-<number>, and scroll-ml-<number> utilities like scroll-ml-4 and scroll-mt-6 to set the scroll offset around items within a snap container:
Scroll in the grid of images to see the expected behavior
<div class="snap-x ...">
<div class="snap-start scroll-ml-6 ...">
<img src="/img/vacation-01.jpg"/>
</div>
<div class="snap-start scroll-ml-6 ...">
<img src="/img/vacation-02.jpg"/>
</div>
<div class="snap-start scroll-ml-6 ...">
<img src="/img/vacation-03.jpg"/>
</div>
<div class="snap-start scroll-ml-6 ...">
<img src="/img/vacation-04.jpg"/>
</div>
<div class="snap-start scroll-ml-6 ...">
<img src="/img/vacation-05.jpg"/>
</div>
</div>

### Untitled

To use a negative scroll margin value, prefix the class name with a dash to convert it to a negative value:
<div class="snap-start -scroll-ml-6 ...">
<!-- ... -->
</div>

### Untitled

Use the scroll-ms-<number> and scroll-me-<number> utilities to set the scroll-margin-inline-start and scroll-margin-inline-end , which map to either the left or right side based on the text direction:
Scroll in the grid of images to see the expected behavior
Left-to-right
Right-to-left
<div dir="ltr">
<div class="snap-x ...">
<div class="snap-start scroll-ms-6 ...">
<img src="/img/vacation-01.jpg"/>
</div>
<!-- ... -->
</div>
</div>
<div dir="rtl">
<div class="snap-x ...">
<div class="snap-start scroll-ms-6 ...">
<img src="/img/vacation-01.jpg"/>
</div>
<!-- ... -->
</div>
</div>
For more control, you can also use the  to conditionally apply specific styles depending on the current text direction.

### Untitled

Use utilities like scroll-ml-[<value>] and scroll-me-[<value>] to set the scroll margin based on a completely custom value:
<div class="scroll-ml-[24rem] ...">
<!-- ... -->
</div>
For CSS variables, you can also use the scroll-ml-(<custom-property>) syntax:
<div class="scroll-ml-(--my-scroll-margin) ...">
<!-- ... -->
</div>
This is just a shorthand for scroll-ml-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a scroll-margin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="scroll-m-8 md:scroll-m-0 ...">
<!-- ... -->
</div>
Learn more about using variants in the .

## Untitled

The scroll-m-<number>,scroll-mx-<number>,scroll-my-<number>,scroll-ms-<number>,scroll-me-<number>,scroll-mt-<number>,scroll-mr-<number>,scroll-mb-<number>, and scroll-ml-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
