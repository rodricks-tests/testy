# **useImperativeHandle**
useImperativeHandle is a React Hook that lets you customize the handle exposed as a[link](https://react.dev/learn/manipulating-the-dom-with-refs)[ref.](https://react.dev/learn/manipulating-the-dom-with-refs)
useImperativeHandle(ref, createHandle, dependencies?)
- [Reference](https://react.dev/reference/react/useImperativeHandle#reference)
  - [useImperativeHandle(ref, createHandle, dependencies?)](https://react.dev/reference/react/useImperativeHandle#useimperativehandle)
- [Usage](https://react.dev/reference/react/useImperativeHandle#usage)
  - [Exposing a custom ref handle to the parent component](https://react.dev/reference/react/useImperativeHandle#exposing-a-custom-ref-handle-to-the-parent-component)
  - [Exposing your own imperative methods](https://react.dev/reference/react/useImperativeHandle#exposing-your-own-imperative-methods)
## **Reference **
### **useImperativeHandle(ref, createHandle, dependencies?)**** **
Call useImperativeHandle at the top level of your component to customize the ref handle it exposes:
import { useImperativeHandle } from 'react';
function MyInput({ ref }) {
useImperativeHandle(ref, () => {
return {
// ... your methods ...
};
}, []);
// ...
[See more examples below.](https://react.dev/reference/react/useImperativeHandle#usage)
#### **Parameters **
- ref: The ref you received as a prop to the MyInput component.
- createHandle: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose.
- **optional** dependencies: The list of all reactive values referenced inside of the createHandle code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is[link](https://react.dev/learn/editor-setup#linting)[configured for React](https://react.dev/learn/editor-setup#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If a re-render resulted in a change to some dependency, or if you omitted this argument, your createHandle function will re-execute, and the newly created handle will be assigned to the ref.
### **Note**
Starting with React 19,[link](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop)[ref](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop)[is available as a prop.](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop) In React 18 and earlier, it was necessary to get the ref from[link](https://react.dev/reference/react/forwardRef)[forwardRef](https://react.dev/reference/react/forwardRef)[.](https://react.dev/reference/react/forwardRef)
#### **Returns **
useImperativeHandle returns undefined.
## **Usage **
### **Exposing a custom ref handle to the parent component **
To expose a DOM node to the parent element, pass in the ref prop to the node.
function MyInput({ ref }) {
return <input ref={ref} />;
};
With the code above,[link](https://react.dev/learn/manipulating-the-dom-with-refs)[a ref to](https://react.dev/learn/manipulating-the-dom-with-refs)[MyInput](https://react.dev/learn/manipulating-the-dom-with-refs)[will receive the](https://react.dev/learn/manipulating-the-dom-with-refs)[<input>](https://react.dev/learn/manipulating-the-dom-with-refs)[DOM node.](https://react.dev/learn/manipulating-the-dom-with-refs) However, you can expose a custom value instead. To customize the exposed handle, call useImperativeHandle at the top level of your component:
import { useImperativeHandle } from 'react';
function MyInput({ ref }) {
useImperativeHandle(ref, () => {
return {
// ... your methods ...
};
}, []);
return <input />;
};
Note that in the code above, the ref is no longer passed to the <input>.
For example, suppose you don’t want to expose the entire <input> DOM node, but you want to expose two of its methods: focus and scrollIntoView. To do this, keep the real browser DOM in a separate ref. Then use useImperativeHandle to expose a handle with only the methods that you want the parent component to call:
import { useRef, useImperativeHandle } from 'react';
function MyInput({ ref }) {
const inputRef = useRef(null);
useImperativeHandle(ref, () => {
return {
focus() {
inputRef.current.focus();
},
scrollIntoView() {
inputRef.current.scrollIntoView();
},
};
}, []);
return <input ref={inputRef} />;
};
Now, if the parent component gets a ref to MyInput, it will be able to call the focus and scrollIntoView methods on it. However, it will not have full access to the underlying <input> DOM node.
App.jsMyInput.js
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
import { useRef } from 'react';
import MyInput from './MyInput.js';
export default function Form() {
const ref = useRef(null);
function handleClick() {
ref.current.focus();
// This won't work because the DOM node isn't exposed:
// ref.current.style.opacity = 0.5;
}
return (
<form>
<MyInput placeholder="Enter your name" ref={ref} />
<button type="button" onClick={handleClick}>
Edit
</button>
</form>
);
}
Show more
### **Exposing your own imperative methods **
The methods you expose via an imperative handle don’t have to match the DOM methods exactly. For example, this Post component exposes a scrollAndFocusAddComment method via an imperative handle. This lets the parent Page scroll the list of comments *and* focus the input field when you click the button:
App.jsPost.jsCommentList.jsAddComment.js
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
import { useRef } from 'react';
import Post from './Post.js';
export default function Page() {
const postRef = useRef(null);
function handleClick() {
postRef.current.scrollAndFocusAddComment();
}
return (
<>
<button onClick={handleClick}>
Write a comment
</button>
<Post ref={postRef} />
</>
);
}
Show more
### **Pitfall**
**Do not overuse refs.** You should only use refs for *imperative* behaviors that you can’t express as props: for example, scrolling to a node, focusing a node, triggering an animation, selecting text, and so on.
**If you can express something as a prop, you should not use a ref.** For example, instead of exposing an imperative handle like { open, close } from a Modal component, it is better to take isOpen as a prop like <Modal isOpen={isOpen} />.[link](https://react.dev/learn/synchronizing-with-effects)[Effects](https://react.dev/learn/synchronizing-with-effects) can help you expose imperative behaviors via props.
