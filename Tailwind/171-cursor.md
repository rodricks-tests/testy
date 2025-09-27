# cursor

Utilities for controlling the cursor style when hovering over an element.
Show more

## Untitled

### Untitled

Use utilities like cursor-pointer and cursor-grab to control which cursor is displayed when hovering over an element:
Hover over each button to see the cursor change
SubmitSaving...Confirm
<button class="cursor-pointer ...">Submit</button>
<button class="cursor-progress ...">Saving...</button>
<button class="cursor-not-allowed ..." disabled>Confirm</button>

### Untitled

Use the cursor-[<value>] syntax to set the cursor based on a completely custom value:
<button class="cursor-[url(hand.cur),_pointer] ...">
<!-- ... -->
</button>
For CSS variables, you can also use the cursor-(<custom-property>) syntax:
<button class="cursor-(--my-cursor) ...">
<!-- ... -->
</button>
This is just a shorthand for cursor-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a cursor utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="cursor-not-allowed md:cursor-auto ...">
<!-- ... -->
</button>
