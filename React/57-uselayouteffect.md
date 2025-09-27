# **useLayoutEffect**
### **Pitfall**
useLayoutEffect can hurt performance. Prefer[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect) when possible.
useLayoutEffect is a version of[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect) that fires before the browser repaints the screen.
useLayoutEffect(setup, dependencies?)
- [Reference](https://react.dev/reference/react/useLayoutEffect#reference)
  - [useLayoutEffect(setup, dependencies?)](https://react.dev/reference/react/useLayoutEffect#useinsertioneffect)
- [Usage](https://react.dev/reference/react/useLayoutEffect#usage)
  - [Measuring layout before the browser repaints the screen](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)
- [Troubleshooting](https://react.dev/reference/react/useLayoutEffect#troubleshooting)
  - [I’m getting an error: “](https://react.dev/reference/react/useLayoutEffect#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)[useLayoutEffect](https://react.dev/reference/react/useLayoutEffect#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)[does nothing on the server”](https://react.dev/reference/react/useLayoutEffect#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)
## **Reference **
### **useLayoutEffect(setup, dependencies?)**** **
Call useLayoutEffect to perform the layout measurements before the browser repaints the screen:
import { useState, useRef, useLayoutEffect } from 'react';
function Tooltip() {
const ref = useRef(null);
const [tooltipHeight, setTooltipHeight] = useState(0);
useLayoutEffect(() => {
const { height } = ref.current.getBoundingClientRect();
setTooltipHeight(height);
}, []);
// ...
[See more examples below.](https://react.dev/reference/react/useLayoutEffect#usage)
#### **Parameters **
- setup: The function with your Effect’s logic. Your setup function may also optionally return a *cleanup* function. Before your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function.
- **optional** dependencies: The list of all reactive values referenced inside of the setup code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is[link](https://react.dev/learn/editor-setup#linting)[configured for React](https://react.dev/learn/editor-setup#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If you omit this argument, your Effect will re-run after every re-render of the component.
#### **Returns **
useLayoutEffect returns undefined.
#### **Caveats **
- useLayoutEffect is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a component and move the Effect there.
- When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem,[link](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)[implement the cleanup function.](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
- If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary[link](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies)[object](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies) and[link](https://react.dev/reference/react/useEffect#removing-unnecessary-function-dependencies)[function](https://react.dev/reference/react/useEffect#removing-unnecessary-function-dependencies) dependencies. You can also[link](https://react.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect)[extract state updates](https://react.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect) and[link](https://react.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect)[non-reactive logic](https://react.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect) outside of your Effect.
- Effects **only run on the client.** They don’t run during server rendering.
- The code inside useLayoutEffect and all state updates scheduled from it **block the browser from repainting the screen.** When used excessively, this makes your app slow. When possible, prefer[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect)[.](https://react.dev/reference/react/useEffect)
- If you trigger a state update inside useLayoutEffect, React will execute all remaining Effects immediately including useEffect.
## **Usage **
### **Measuring layout before the browser repaints the screen **
Most components don’t need to know their position and size on the screen to decide what to render. They only return some JSX. Then the browser calculates their *layout* (position and size) and repaints the screen.
Sometimes, that’s not enough. Imagine a tooltip that appears next to some element on hover. If there’s enough space, the tooltip should appear above the element, but if it doesn’t fit, it should appear below. In order to render the tooltip at the right final position, you need to know its height (i.e. whether it fits at the top).
To do this, you need to render in two passes:
1. Render the tooltip anywhere (even with a wrong position).
1. Measure its height and decide where to place the tooltip.
1. Render the tooltip *again* in the correct place.
**All of this needs to happen before the browser repaints the screen.** You don’t want the user to see the tooltip moving. Call useLayoutEffect to perform the layout measurements before the browser repaints the screen:
function Tooltip() {
const ref = useRef(null);
const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet
useLayoutEffect(() => {
const { height } = ref.current.getBoundingClientRect();
setTooltipHeight(height); // Re-render now that you know the real height
}, []);
// ...use tooltipHeight in the rendering logic below...
}
Here’s how this works step by step:
1. Tooltip renders with the initial tooltipHeight = 0 (so the tooltip may be wrongly positioned).
1. React places it in the DOM and runs the code in useLayoutEffect.
1. Your useLayoutEffect [measures the height](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the tooltip content and triggers an immediate re-render.
1. Tooltip renders again with the real tooltipHeight (so the tooltip is correctly positioned).
1. React updates it in the DOM, and the browser finally displays the tooltip.
Hover over the buttons below and see how the tooltip adjusts its position depending on whether it fits:
Tooltip.js
Reload
Clear
Fork
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';
export default function Tooltip({ children, targetRect }) {
const ref = useRef(null);
const [tooltipHeight, setTooltipHeight] = useState(0);
useLayoutEffect(() => {
const { height } = ref.current.getBoundingClientRect();
setTooltipHeight(height);
console.log('Measured tooltip height: ' + height);
}, []);
let tooltipX = 0;
let tooltipY = 0;
if (targetRect !== null) {
tooltipX = targetRect.left;
tooltipY = targetRect.top - tooltipHeight;
if (tooltipY < 0) {
// It doesn't fit above, so place below.
tooltipY = targetRect.bottom;
}
}
return createPortal(
<TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
{children}
</TooltipContainer>,
document.body
);
}
Show more
Notice that even though the Tooltip component has to render in two passes (first, with tooltipHeight initialized to 0 and then with the real measured height), you only see the final result. This is why you need useLayoutEffect instead of[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect) for this example. Let’s look at the difference in detail below.
#### **useLayoutEffect vs useEffect**
1. useLayoutEffect blocks the browser from repainting2. useEffect does not block the browser
#### **Example 1 of 2: **useLayoutEffect blocks the browser from repainting
React guarantees that the code inside useLayoutEffect and any state updates scheduled inside it will be processed **before the browser repaints the screen.** This lets you render the tooltip, measure it, and re-render the tooltip again without the user noticing the first extra render. In other words, useLayoutEffect blocks the browser from painting.
Tooltip.js
Reload
Clear
Fork
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';
export default function Tooltip({ children, targetRect }) {
const ref = useRef(null);
const [tooltipHeight, setTooltipHeight] = useState(0);
useLayoutEffect(() => {
const { height } = ref.current.getBoundingClientRect();
setTooltipHeight(height);
}, []);
let tooltipX = 0;
let tooltipY = 0;
if (targetRect !== null) {
tooltipX = targetRect.left;
tooltipY = targetRect.top - tooltipHeight;
if (tooltipY < 0) {
// It doesn't fit above, so place below.
tooltipY = targetRect.bottom;
}
}
return createPortal(
<TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
{children}
</TooltipContainer>,
document.body
);
}
Show more
**Next Example**
### **Note**
Rendering in two passes and blocking the browser hurts performance. Try to avoid this when you can.
## **Troubleshooting **
### **I’m getting an error: “****useLayoutEffect**** does nothing on the server” **
The purpose of useLayoutEffect is to let your component[link](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)[use layout information for rendering:](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)
1. Render the initial content.
1. Measure the layout *before the browser repaints the screen.*
1. Render the final content using the layout information you’ve read.
When you or your framework uses[link](https://react.dev/reference/react-dom/server)[server rendering](https://react.dev/reference/react-dom/server), your React app renders to HTML on the server for the initial render. This lets you show the initial HTML before the JavaScript code loads.
The problem is that on the server, there is no layout information.
In the[link](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)[earlier example](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen), the useLayoutEffect call in the Tooltip component lets it position itself correctly (either above or below content) depending on the content height. If you tried to render Tooltip as a part of the initial server HTML, this would be impossible to determine. On the server, there is no layout yet! So, even if you rendered it on the server, its position would “jump” on the client after the JavaScript loads and runs.
Usually, components that rely on layout information don’t need to render on the server anyway. For example, it probably doesn’t make sense to show a Tooltip during the initial render. It is triggered by a client interaction.
However, if you’re running into this problem, you have a few different options:
- Replace useLayoutEffect with[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect)[.](https://react.dev/reference/react/useEffect) This tells React that it’s okay to display the initial render result without blocking the paint (because the original HTML will become visible before your Effect runs).
- Alternatively,[link](https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content)[mark your component as client-only.](https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content) This tells React to replace its content up to the closest[link](https://react.dev/reference/react/Suspense)[<Suspense>](https://react.dev/reference/react/Suspense) boundary with a loading fallback (for example, a spinner or a glimmer) during server rendering.
- Alternatively, you can render a component with useLayoutEffect only after hydration. Keep a boolean isMounted state that’s initialized to false, and set it to true inside a useEffect call. Your rendering logic can then be like return isMounted ? <RealContent /> : <FallbackContent />. On the server and during the hydration, the user will see FallbackContent which should not call useLayoutEffect. Then React will replace it with RealContent which runs on the client only and can include useLayoutEffect calls.
- If you synchronize your component with an external data store and rely on useLayoutEffect for different reasons than measuring layout, consider[link](https://react.dev/reference/react/useSyncExternalStore)[useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) instead which[link](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)[supports server rendering.](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
