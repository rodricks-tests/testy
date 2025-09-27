# **Manipulating the DOM with Refs**
React automatically updates the[link](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)[DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a *ref* to the DOM node.
### **You will learn**
- How to access a DOM node managed by React with the ref attribute
- How the ref JSX attribute relates to the useRef Hook
- How to access another component’s DOM node
- In which cases it’s safe to modify the DOM managed by React
## **Getting a ref to the node **
To access a DOM node managed by React, first, import the useRef Hook:
import { useRef } from 'react';
Then, use it to declare a ref inside your component:
const myRef = useRef(null);
Finally, pass your ref as the ref attribute to the JSX tag for which you want to get the DOM node:
<div ref={myRef}>
The useRef Hook returns an object with a single property called current. Initially, myRef.current will be null. When React creates a DOM node for this <div>, React will put a reference to this node into myRef.current. You can then access this DOM node from your[link](https://react.dev/learn/responding-to-events)[event handlers](https://react.dev/learn/responding-to-events) and use the built-in[link](https://developer.mozilla.org/docs/Web/API/Element)[browser APIs](https://developer.mozilla.org/docs/Web/API/Element) defined on it.
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
### **Example: Focusing a text input **
In this example, clicking the button will focus the input:
App.js
Download
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
import { useRef } from 'react';
export default function Form() {
const inputRef = useRef(null);
function handleClick() {
inputRef.current.focus();
}
return (
<>
<input ref={inputRef} />
<button onClick={handleClick}>
Focus the input
</button>
</>
);
}
Show more
To implement this:
1. Declare inputRef with the useRef Hook.
1. Pass it as <input ref={inputRef}>. This tells React to **put this ****<input>****’s DOM node into ****inputRef.current****.**
1. In the handleClick function, read the input DOM node from inputRef.current and call [focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on it with inputRef.current.focus().
1. Pass the handleClick event handler to <button> with onClick.
While DOM manipulation is the most common use case for refs, the useRef Hook can be used for storing other things outside React, like timer IDs. Similarly to state, refs remain between renders. Refs are like state variables that don’t trigger re-renders when you set them. Read about refs in[link](https://react.dev/learn/referencing-values-with-refs)[Referencing Values with Refs.](https://react.dev/learn/referencing-values-with-refs)
### **Example: Scrolling to an element **
You can have more than a single ref in a component. In this example, there is a carousel of three images. Each button centers an image by calling the browser[link](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)[scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) method on the corresponding DOM node:
App.js
Download
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
34
35
36
import { useRef } from 'react';
export default function CatFriends() {
const firstCatRef = useRef(null);
const secondCatRef = useRef(null);
const thirdCatRef = useRef(null);
function handleScrollToFirstCat() {
firstCatRef.current.scrollIntoView({
behavior: 'smooth',
block: 'nearest',
inline: 'center'
});
}
function handleScrollToSecondCat() {
secondCatRef.current.scrollIntoView({
behavior: 'smooth',
block: 'nearest',
inline: 'center'
});
}
function handleScrollToThirdCat() {
thirdCatRef.current.scrollIntoView({
behavior: 'smooth',
block: 'nearest',
inline: 'center'
});
}
return (
<>
<nav>
<button onClick={handleScrollToFirstCat}>
Neo
Show more
##### **Deep Dive**
#### **How to manage a list of refs using a ref callback **
**Show Details**
## **Accessing another component’s DOM nodes **
### **Pitfall**
Refs are an escape hatch. Manually manipulating *another* component’s DOM nodes can make your code fragile.
You can pass refs from parent component to child components[link](https://react.dev/learn/passing-props-to-a-component)[just like any other prop](https://react.dev/learn/passing-props-to-a-component).
import { useRef } from 'react';
function MyInput({ ref }) {
return <input ref={ref} />;
}
function MyForm() {
const inputRef = useRef(null);
return <MyInput ref={inputRef} />
}
In the above example, a ref is created in the parent component, MyForm, and is passed to the child component, MyInput. MyInput then passes the ref to <input>. Because <input> is a[link](https://react.dev/reference/react-dom/components/common)[built-in component](https://react.dev/reference/react-dom/components/common) React sets the .current property of the ref to the <input> DOM element.
The inputRef created in MyForm now points to the <input> DOM element returned by MyInput. A click handler created in MyForm can access inputRef and call focus() to set the focus on <input>.
App.js
Download
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
import { useRef } from 'react';
function MyInput({ ref }) {
return <input ref={ref} />;
}
export default function MyForm() {
const inputRef = useRef(null);
function handleClick() {
inputRef.current.focus();
}
return (
<>
<MyInput ref={inputRef} />
<button onClick={handleClick}>
Focus the input
</button>
</>
);
}
Show more
##### **Deep Dive**
#### **Exposing a subset of the API with an imperative handle **
**Show Details**
## **When React attaches the refs **
In React, every update is split in[link](https://react.dev/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)[two phases](https://react.dev/learn/render-and-commit#step-3-react-commits-changes-to-the-dom):
- During **render,** React calls your components to figure out what should be on the screen.
- During **commit,** React applies changes to the DOM.
In general, you[link](https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs)[don’t want](https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs) to access refs during rendering. That goes for refs holding DOM nodes as well. During the first render, the DOM nodes have not yet been created, so ref.current will be null. And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.
React sets ref.current during the commit. Before updating the DOM, React sets the affected ref.current values to null. After updating the DOM, React immediately sets them to the corresponding DOM nodes.
**Usually, you will access refs from event handlers.** If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. We will discuss Effects on the next pages.
##### **Deep Dive**
#### **Flushing state updates synchronously with flushSync **
**Show Details**
## **Best practices for DOM manipulation with refs **
Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.
If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to **modify** the DOM manually, you can risk conflicting with the changes React is making.
To illustrate this problem, this example includes a welcome message and two buttons. The first button toggles its presence using[link](https://react.dev/learn/conditional-rendering)[conditional rendering](https://react.dev/learn/conditional-rendering) and[link](https://react.dev/learn/state-a-components-memory)[state](https://react.dev/learn/state-a-components-memory), as you would usually do in React. The second button uses the[link](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)[remove()](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)[DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) to forcefully remove it from the DOM outside of React’s control.
Try pressing “Toggle with setState” a few times. The message should disappear and appear again. Then press “Remove from the DOM”. This will forcefully remove it. Finally, press “Toggle with setState”:
App.js
Download
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
import { useState, useRef } from 'react';
export default function Counter() {
const [show, setShow] = useState(true);
const ref = useRef(null);
return (
<div>
<button
onClick={() => {
setShow(!show);
}}>
Toggle with setState
</button>
<button
onClick={() => {
ref.current.remove();
}}>
Remove from the DOM
</button>
{show && <p ref={ref}>Hello world</p>}
</div>
);
}
Show more
After you’ve manually removed the DOM element, trying to use setState to show it again will lead to a crash. This is because you’ve changed the DOM, and React doesn’t know how to continue managing it correctly.
**Avoid changing DOM nodes managed by React.** Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.
However, this doesn’t mean that you can’t do it at all. It requires caution. **You can safely modify parts of the DOM that React has *****no reason***** to update.** For example, if some <div> is always empty in the JSX, React won’t have a reason to touch its children list. Therefore, it is safe to manually add or remove elements there.
