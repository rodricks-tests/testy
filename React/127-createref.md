# **createRef**
### **Pitfall**
createRef is mostly used for[link](https://react.dev/reference/react/Component)[class components.](https://react.dev/reference/react/Component) Function components typically rely on[link](https://react.dev/reference/react/useRef)[useRef](https://react.dev/reference/react/useRef) instead.
createRef creates a[link](https://react.dev/learn/referencing-values-with-refs)[ref](https://react.dev/learn/referencing-values-with-refs) object which can contain arbitrary value.
class MyInput extends Component {
inputRef = createRef();
// ...
}
- [Reference](https://react.dev/reference/react/createRef#reference)
  - [createRef()](https://react.dev/reference/react/createRef#createref)
- [Usage](https://react.dev/reference/react/createRef#usage)
  - [Declaring a ref in a class component](https://react.dev/reference/react/createRef#declaring-a-ref-in-a-class-component)
- [Alternatives](https://react.dev/reference/react/createRef#alternatives)
  - [Migrating from a class with](https://react.dev/reference/react/createRef#migrating-from-a-class-with-createref-to-a-function-with-useref)[createRef](https://react.dev/reference/react/createRef#migrating-from-a-class-with-createref-to-a-function-with-useref)[to a function with](https://react.dev/reference/react/createRef#migrating-from-a-class-with-createref-to-a-function-with-useref)[useRef](https://react.dev/reference/react/createRef#migrating-from-a-class-with-createref-to-a-function-with-useref)
## **Reference **
### **createRef()**** **
Call createRef to declare a[link](https://react.dev/learn/referencing-values-with-refs)[ref](https://react.dev/learn/referencing-values-with-refs) inside a[link](https://react.dev/reference/react/Component)[class component.](https://react.dev/reference/react/Component)
import { createRef, Component } from 'react';
class MyComponent extends Component {
intervalRef = createRef();
inputRef = createRef();
// ...
[See more examples below.](https://react.dev/reference/react/createRef#usage)
#### **Parameters **
createRef takes no parameters.
#### **Returns **
createRef returns an object with a single property:
- current: Initially, it’s set to the null. You can later set it to something else. If you pass the ref object to React as a ref attribute to a JSX node, React will set its current property.
#### **Caveats **
- createRef always returns a *different* object. It’s equivalent to writing { current: null } yourself.
- In a function component, you probably want [useRef](https://react.dev/reference/react/useRef) instead which always returns the same object.
- const ref = useRef() is equivalent to const [ref, _] = useState(() => createRef(null)).
## **Usage **
### **Declaring a ref in a class component **
To declare a ref inside a[link](https://react.dev/reference/react/Component)[class component,](https://react.dev/reference/react/Component) call createRef and assign its result to a class field:
import { Component, createRef } from 'react';
class Form extends Component {
inputRef = createRef();
// ...
}
If you now pass ref={this.inputRef} to an <input> in your JSX, React will populate this.inputRef.current with the input DOM node. For example, here is how you make a button that focuses the input:
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
import { Component, createRef } from 'react';
export default class Form extends Component {
inputRef = createRef();
handleClick = () => {
this.inputRef.current.focus();
}
render() {
return (
<>
<input ref={this.inputRef} />
<button onClick={this.handleClick}>
Focus the input
</button>
</>
);
}
}
Show more
### **Pitfall**
createRef is mostly used for[link](https://react.dev/reference/react/Component)[class components.](https://react.dev/reference/react/Component) Function components typically rely on[link](https://react.dev/reference/react/useRef)[useRef](https://react.dev/reference/react/useRef) instead.
## **Alternatives **
### **Migrating from a class with ****createRef**** to a function with ****useRef**** **
We recommend using function components instead of[link](https://react.dev/reference/react/Component)[class components](https://react.dev/reference/react/Component) in new code. If you have some existing class components using createRef, here is how you can convert them. This is the original code:
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
import { Component, createRef } from 'react';
export default class Form extends Component {
inputRef = createRef();
handleClick = () => {
this.inputRef.current.focus();
}
render() {
return (
<>
<input ref={this.inputRef} />
<button onClick={this.handleClick}>
Focus the input
</button>
</>
);
}
}
Show more
When you[link](https://react.dev/reference/react/Component#alternatives)[convert this component from a class to a function,](https://react.dev/reference/react/Component#alternatives) replace calls to createRef with calls to[link](https://react.dev/reference/react/useRef)[useRef](https://react.dev/reference/react/useRef)[:](https://react.dev/reference/react/useRef)
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
