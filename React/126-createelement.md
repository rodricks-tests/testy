# **createElement**
createElement lets you create a React element. It serves as an alternative to writing[link](https://react.dev/learn/writing-markup-with-jsx)[JSX.](https://react.dev/learn/writing-markup-with-jsx)
const element = createElement(type, props, ...children)
- [Reference](https://react.dev/reference/react/createElement#reference)
  - [createElement(type, props, ...children)](https://react.dev/reference/react/createElement#createelement)
- [Usage](https://react.dev/reference/react/createElement#usage)
  - [Creating an element without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx)
## **Reference **
### **createElement(type, props, ...children)**** **
Call createElement to create a React element with the given type, props, and children.
import { createElement } from 'react';
function Greeting({ name }) {
return createElement(
'h1',
{ className: 'greeting' },
'Hello'
);
}
[See more examples below.](https://react.dev/reference/react/createElement#usage)
#### **Parameters **
- type: The type argument must be a valid React component type. For example, it could be a tag name string (such as 'div' or 'span'), or a React component (a function, a class, or a special component like[link](https://react.dev/reference/react/Fragment)[Fragment](https://react.dev/reference/react/Fragment)).
- props: The props argument must either be an object or null. If you pass null, it will be treated the same as an empty object. React will create an element with props matching the props you have passed. Note that ref and key from your props object are special and will *not* be available as element.props.ref and element.props.key on the returned element. They will be available as element.ref and element.key.
- **optional** ...children: Zero or more child nodes. They can be any React nodes, including React elements, strings, numbers,[link](https://react.dev/reference/react-dom/createPortal)[portals](https://react.dev/reference/react-dom/createPortal), empty nodes (null, undefined, true, and false), and arrays of React nodes.
#### **Returns **
createElement returns a React element object with a few properties:
- type: The type you have passed.
- props: The props you have passed except for ref and key.
- ref: The ref you have passed. If missing, null.
- key: The key you have passed, coerced to a string. If missing, null.
Usually, you’ll return the element from your component or make it a child of another element. Although you may read the element’s properties, it’s best to treat every element as opaque after it’s created, and only render it.
#### **Caveats **
- You must **treat React elements and their props as**[** **](https://en.wikipedia.org/wiki/Immutable_object)[**immutable**](https://en.wikipedia.org/wiki/Immutable_object) and never change their contents after creation. In development, React will[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)[freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) the returned element and its props property shallowly to enforce this.
- When you use JSX, **you must start a tag with a capital letter to render your own custom component.** In other words, <Something /> is equivalent to createElement(Something), but <something /> (lowercase) is equivalent to createElement('something') (note it’s a string, so it will be treated as a built-in HTML tag).
- You should only **pass children as multiple arguments to ****createElement**** if they are all statically known,** like createElement('h1', {}, child1, child2, child3). If your children are dynamic, pass the entire array as the third argument: createElement('ul', {}, listItems). This ensures that React will[link](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)[warn you about missing](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)[key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)[s](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) for any dynamic lists. For static lists this is not necessary because they never reorder.
## **Usage **
### **Creating an element without JSX **
If you don’t like[link](https://react.dev/learn/writing-markup-with-jsx)[JSX](https://react.dev/learn/writing-markup-with-jsx) or can’t use it in your project, you can use createElement as an alternative.
To create an element without JSX, call createElement with some type, props, and children:
import { createElement } from 'react';
function Greeting({ name }) {
return createElement(
'h1',
{ className: 'greeting' },
'Hello ',
createElement('i', null, name),
'. Welcome!'
);
}
The children are optional, and you can pass as many as you need (the example above has three children). This code will display a <h1> header with a greeting. For comparison, here is the same example rewritten with JSX:
function Greeting({ name }) {
return (
<h1 className="greeting">
Hello <i>{name}</i>. Welcome!
</h1>
);
}
To render your own React component, pass a function like Greeting as the type instead of a string like 'h1':
export default function App() {
return createElement(Greeting, { name: 'Taylor' });
}
With JSX, it would look like this:
export default function App() {
return <Greeting name="Taylor" />;
}
Here is a complete example written with createElement:
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
import { createElement } from 'react';
function Greeting({ name }) {
return createElement(
'h1',
{ className: 'greeting' },
'Hello ',
createElement('i', null, name),
'. Welcome!'
);
}
export default function App() {
return createElement(
Greeting,
{ name: 'Taylor' }
);
}
Show more
And here is the same example written using JSX:
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
function Greeting({ name }) {
return (
<h1 className="greeting">
Hello <i>{name}</i>. Welcome!
</h1>
);
}
export default function App() {
return <Greeting name="Taylor" />;
}
Both coding styles are fine, so you can use whichever one you prefer for your project. The main benefit of using JSX compared to createElement is that it’s easy to see which closing tag corresponds to which opening tag.
