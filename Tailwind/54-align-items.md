# align-items

Utilities for controlling how flex and grid items are positioned along a container's cross axis.

## Untitled

### Untitled

Use the items-stretch utility to stretch items to fill the container's cross axis:
01
02
03
<div class="flex items-stretch ...">
<div class="py-4">01</div>
<div class="py-12">02</div>
<div class="py-8">03</div>
</div>

### Untitled

Use the items-start utility to align items to the start of the container's cross axis:
01
02
03
<div class="flex items-start ...">
<div class="py-4">01</div>
<div class="py-12">02</div>
<div class="py-8">03</div>
</div>

### Untitled

Use the items-center utility to align items along the center of the container's cross axis:
01
02
03
<div class="flex items-center ...">
<div class="py-4">01</div>
<div class="py-12">02</div>
<div class="py-8">03</div>
</div>

### Untitled

Use the items-end utility to align items to the end of the container's cross axis:
01
02
03
<div class="flex items-end ...">
<div class="py-4">01</div>
<div class="py-12">02</div>
<div class="py-8">03</div>
</div>

### Untitled

Use the items-baseline utility to align items along the container's cross axis such that all of their baselines align:
01
02
03
<div class="flex items-baseline ...">
<div class="pt-2 pb-6">01</div>
<div class="pt-8 pb-12">02</div>
<div class="pt-12 pb-4">03</div>
</div>

### Untitled

Use the items-baseline-last utility to align items along the container's cross axis such that all of their baselines align with the last baseline in the container:
Spencer Sharp
Working on the future of astronaut recruitment at Space Recruit.
Alex Reed
A multidisciplinary designer.
<div class="grid grid-cols-[1fr_auto] items-baseline-last">
<div>
<img src="img/spencer-sharp.jpg" />
<h4>Spencer Sharp</h4>
<p>Working on the future of astronaut recruitment at Space Recruit.</p>
</div>
<p>spacerecruit.com</p>
</div>
This is useful for ensuring that text items align with each other, even if they have different heights.

### Untitled

Prefix an align-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="flex items-stretch md:items-center ...">
<!-- ... -->
</div>
