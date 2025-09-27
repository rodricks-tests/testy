# font-variant-numeric

Utilities for controlling the variant of numbers.

## Untitled

### Untitled

Use the ordinal utility to enable special glyphs for the ordinal markers in fonts that support them:
1st
<p class="ordinal ...">1st</p>

### Untitled

Use the slashed-zero utility to force a zero with a slash in fonts that support them:
0
<p class="slashed-zero ...">0</p>

### Untitled

Use the lining-nums utility to use numeric glyphs that are aligned by their baseline in fonts that support them:
1234567890
<p class="lining-nums ...">1234567890</p>

### Untitled

Use the oldstyle-nums utility to use numeric glyphs where some numbers have descenders in fonts that support them:
1234567890
<p class="oldstyle-nums ...">1234567890</p>

### Untitled

Use the proportional-nums utility to use numeric glyphs that have proportional widths in fonts that support them:
12121
90909
<p class="proportional-nums ...">12121</p>
<p class="proportional-nums ...">90909</p>

### Untitled

Use the tabular-nums utility to use numeric glyphs that have uniform/tabular widths in fonts that support them:
12121
90909
<p class="tabular-nums ...">12121</p>
<p class="tabular-nums ...">90909</p>

### Untitled

Use the diagonal-fractions utility to replace numbers separated by a slash with common diagonal fractions in fonts that support them:
1/2 3/4 5/6
<p class="diagonal-fractions ...">1/2 3/4 5/6</p>

### Untitled

Use the stacked-fractions utility to replace numbers separated by a slash with common stacked fractions in fonts that support them:
1/2 3/4 5/6
<p class="stacked-fractions ...">1/2 3/4 5/6</p>

### Untitled

The font-variant-numeric utilities are composable so you can enable multiple variants by combining them:
Subtotal
$100.00
Tax
$14.50
Total
$114.50
<dl class="...">
<dt class="...">Subtotal</dt>
<dd class="text-right slashed-zero tabular-nums ...">$100.00</dd>
<dt class="...">Tax</dt>
<dd class="text-right slashed-zero tabular-nums ...">$14.50</dd>
<dt class="...">Total</dt>
<dd class="text-right slashed-zero tabular-nums ...">$114.50</dd>
</dl>

### Untitled

Use the normal-nums property to reset numeric font variants:
<p class="slashed-zero tabular-nums md:normal-nums ...">
<!-- ... -->
</p>

### Untitled

Prefix a font-variant-numeric utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<p class="proportional-nums md:tabular-nums ...">
Lorem ipsum dolor sit amet...
</p>
