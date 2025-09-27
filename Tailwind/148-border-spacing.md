# border-spacing

Utilities for controlling the spacing between table borders.

## Untitled

### Untitled

Use border-spacing-<number> utilities like border-spacing-2 and border-spacing-x-3 to control the space between the borders of table cells with :
<table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
<thead>
<tr>
<th class="border border-gray-300 dark:border-gray-600">State</th>
<th class="border border-gray-300 dark:border-gray-600">City</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-gray-300 dark:border-gray-700">Indiana</td>
<td class="border border-gray-300 dark:border-gray-700">Indianapolis</td>
</tr>
<tr>
<td class="border border-gray-300 dark:border-gray-700">Ohio</td>
<td class="border border-gray-300 dark:border-gray-700">Columbus</td>
</tr>
<tr>
<td class="border border-gray-300 dark:border-gray-700">Michigan</td>
<td class="border border-gray-300 dark:border-gray-700">Detroit</td>
</tr>
</tbody>
</table>

### Untitled

Use the border-spacing-[<value>] syntax to set the border spacing based on a completely custom value:
<table class="border-spacing-[7px] ...">
<!-- ... -->
</table>
For CSS variables, you can also use the border-spacing-(<custom-property>) syntax:
<table class="border-spacing-(--my-border-spacing) ...">
<!-- ... -->
</table>
This is just a shorthand for border-spacing-[var(<custom-property>)] that adds the var() function for you automatically.

### Untitled

Prefix a border-spacing utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:
<table class="border-spacing-2 md:border-spacing-4 ...">
<!-- ... -->
</table>
Learn more about using variants in the .

## Untitled

The border-spacing-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:
@theme {
--spacing: 1px;
}
