# transition-behavior

Utilities to control the behavior of CSS transitions.

## Untitled

### Untitled

Use the transition-discrete utility to start transitions when changing properties with a discrete set of values, such as elements that change from hidden to block:
Interact with the checkboxes to see the expected behavior
I hide
I fade out
<label class="peer ...">
<input type="checkbox" checked />
</label>
<button class="hidden transition-all not-peer-has-checked:opacity-0 peer-has-checked:block ...">
I hide
</button>
<label class="peer ...">
<input type="checkbox" checked />
</label>
<button class="hidden transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block ...">
I fade out
</button>

### Untitled

Prefix a transition-behavior utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<button class="transition-discrete md:transition-normal ...">
<!-- ... -->
</button>
