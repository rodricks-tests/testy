# overflow

Utilities for controlling how an element handles content that is too large for the container.

## Untitled

### Untitled

Use the overflow-visible utility to prevent content within an element from being clipped:
Andrew AlfredTechnical advisor
<div class="overflow-visible ...">
<!-- ... -->
</div>
Note that any content that overflows the bounds of the element will then be visible.

### Untitled

Use the overflow-hidden utility to clip any content within an element that overflows the bounds of that element:
Andrew AlfredTechnical advisor
<div class="overflow-hidden ...">
<!-- ... -->
</div>

### Untitled

Use the overflow-auto utility to add scrollbars to an element in the event that its content overflows the bounds of that element:
Scroll vertically
Andrew AlfredTechnical advisor
Debra HoustonAnalyst
Jane WhiteDirector, Marketing
Ray FlintTechnical Advisor
<div class="overflow-auto ...">
<!-- ... -->
</div>
Unlike overflow-scroll, which always shows scrollbars, this utility will only show them if scrolling is necessary.

### Untitled

Use the overflow-x-auto utility to allow horizontal scrolling if needed:
Scroll horizontally
Andrew
Emily
Whitney
David
Kristin
Sarah
<div class="overflow-x-auto ...">
<!-- ... -->
</div>

### Untitled

Use the overflow-y-auto utility to allow vertical scrolling if needed:
Scroll vertically
Andrew AlfredTechnical advisor
Debra HoustonAnalyst
Jane WhiteDirector, Marketing
Ray FlintTechnical Advisor
<div class="h-32 overflow-y-auto ...">
<!-- ... -->
</div>

### Untitled

Use the overflow-x-scroll utility to allow horizontal scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:
Scroll horizontally
Andrew
Emily
Whitney
David
Kristin
Sarah
<div class="overflow-x-scroll ...">
<!-- ... -->
</div>

### Untitled

Use the overflow-y-scroll utility to allow vertical scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:
Scroll vertically
Andrew AlfredTechnical advisor
Debra HoustonAnalyst
Jane WhiteDirector, Marketing
Ray FlintTechnical Advisor
<div class="overflow-y-scroll ...">
<!-- ... -->
</div>

### Untitled

Use the overflow-scroll utility to add scrollbars to an element:
Scroll vertically and horizontally
Sun
Mon
Tue
Wed
Thu
Fri
Sat
5 AM
6 AM
7 AM
8 AM
9 AM
10 AM
11 AM
12 PM
1 PM
2 PM
3 PM
4 PM
5 PM
6 PM
7 PM
8 PM
5 AMFlight to VancouverToronto YYZ
6 AMBreakfastMel's Diner
5 PM🎉 Party party 🎉We like to party!
<div class="overflow-scroll ...">
<!-- ... -->
</div>
Unlike overflow-auto, which only shows scrollbars if they are necessary, this utility always shows them. Note that some operating systems (like macOS) hide unnecessary scrollbars regardless of this setting.

### Untitled

Prefix an overflow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<div class="overflow-auto md:overflow-scroll ...">
<!-- ... -->
</div>
