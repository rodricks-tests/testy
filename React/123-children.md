# **Children**
### **Pitfall**
Using Children is uncommon and can lead to fragile code.[link](https://react.dev/reference/react/Children#alternatives)[See common alternatives.](https://react.dev/reference/react/Children#alternatives)
Children lets you manipulate and transform the JSX you received as the[link](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop.](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
const mappedChildren = Children.map(children, child =>
<div className="Row">
{child}
</div>
);
- [Reference](https://react.dev/reference/react/Children#reference)
  - [Children.count(children)](https://react.dev/reference/react/Children#children-count)
  - [Children.forEach(children, fn, thisArg?)](https://react.dev/reference/react/Children#children-foreach)
  - [Children.map(children, fn, thisArg?)](https://react.dev/reference/react/Children#children-map)
  - [Children.only(children)](https://react.dev/reference/react/Children#children-only)
  - [Children.toArray(children)](https://react.dev/reference/react/Children#children-toarray)
- [Usage](https://react.dev/reference/react/Children#usage)
  - [Transforming children](https://react.dev/reference/react/Children#transforming-children)
  - [Running some code for each child](https://react.dev/reference/react/Children#running-some-code-for-each-child)
  - [Counting children](https://react.dev/reference/react/Children#counting-children)
  - [Converting children to an array](https://react.dev/reference/react/Children#converting-children-to-an-array)
- [Alternatives](https://react.dev/reference/react/Children#alternatives)
  - [Exposing multiple components](https://react.dev/reference/react/Children#exposing-multiple-components)
  - [Accepting an array of objects as a prop](https://react.dev/reference/react/Children#accepting-an-array-of-objects-as-a-prop)
  - [Calling a render prop to customize rendering](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering)
- [Troubleshooting](https://react.dev/reference/react/Children#troubleshooting)
  - [I pass a custom component, but the](https://react.dev/reference/react/Children#i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result)[Children](https://react.dev/reference/react/Children#i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result)[methods don’t show its render result](https://react.dev/reference/react/Children#i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result)
## **Reference **
### **Children.count(children)**** **
Call Children.count(children) to count the number of children in the children data structure.
import { Children } from 'react';
function RowList({ children }) {
return (
<>
<h1>Total rows: {Children.count(children)}</h1>
...
</>
);
}
[See more examples below.](https://react.dev/reference/react/Children#counting-children)
#### **Parameters **
- children: The value of the [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) received by your component.
#### **Returns **
The number of nodes inside these children.
#### **Caveats **
- Empty nodes (null, undefined, and Booleans), strings, numbers, and [React elements](https://react.dev/reference/react/createElement) count as individual nodes. Arrays don’t count as individual nodes, but their children do. **The traversal does not go deeper than React elements:** they don’t get rendered, and their children aren’t traversed. [Fragments](https://react.dev/reference/react/Fragment) don’t get traversed.
### **Children.forEach(children, fn, thisArg?)**** **
Call Children.forEach(children, fn, thisArg?) to run some code for each child in the children data structure.
import { Children } from 'react';
function SeparatorList({ children }) {
const result = [];
Children.forEach(children, (child, index) => {
result.push(child);
result.push(<hr key={index} />);
});
// ...
[See more examples below.](https://react.dev/reference/react/Children#running-some-code-for-each-child)
#### **Parameters **
- children: The value of the [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) received by your component.
- fn: The function you want to run for each child, similar to the [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)[forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)[method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) callback. It will be called with the child as the first argument and its index as the second argument. The index starts at 0 and increments on each call.
- **optional** thisArg: The [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)[value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) with which the fn function should be called. If omitted, it’s undefined.
#### **Returns **
Children.forEach returns undefined.
#### **Caveats **
- Empty nodes (null, undefined, and Booleans), strings, numbers, and [React elements](https://react.dev/reference/react/createElement) count as individual nodes. Arrays don’t count as individual nodes, but their children do. **The traversal does not go deeper than React elements:** they don’t get rendered, and their children aren’t traversed. [Fragments](https://react.dev/reference/react/Fragment) don’t get traversed.
### **Children.map(children, fn, thisArg?)**** **
Call Children.map(children, fn, thisArg?) to map or transform each child in the children data structure.
import { Children } from 'react';
function RowList({ children }) {
return (
<div className="RowList">
{Children.map(children, child =>
<div className="Row">
{child}
</div>
)}
</div>
);
}
[See more examples below.](https://react.dev/reference/react/Children#transforming-children)
#### **Parameters **
- children: The value of the [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) received by your component.
- fn: The mapping function, similar to the [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)[method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) callback. It will be called with the child as the first argument and its index as the second argument. The index starts at 0 and increments on each call. You need to return a React node from this function. This may be an empty node (null, undefined, or a Boolean), a string, a number, a React element, or an array of other React nodes.
- **optional** thisArg: The [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)[value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) with which the fn function should be called. If omitted, it’s undefined.
#### **Returns **
If children is null or undefined, returns the same value.
Otherwise, returns a flat array consisting of the nodes you’ve returned from the fn function. The returned array will contain all nodes you returned except for null and undefined.
#### **Caveats **
- Empty nodes (null, undefined, and Booleans), strings, numbers, and[link](https://react.dev/reference/react/createElement)[React elements](https://react.dev/reference/react/createElement) count as individual nodes. Arrays don’t count as individual nodes, but their children do. **The traversal does not go deeper than React elements:** they don’t get rendered, and their children aren’t traversed.[link](https://react.dev/reference/react/Fragment)[Fragments](https://react.dev/reference/react/Fragment) don’t get traversed.
- If you return an element or an array of elements with keys from fn, **the returned elements’ keys will be automatically combined with the key of the corresponding original item from ****children****.** When you return multiple elements from fn in an array, their keys only need to be unique locally amongst each other.
### **Children.only(children)**** **
Call Children.only(children) to assert that children represent a single React element.
function Box({ children }) {
const element = Children.only(children);
// ...
#### **Parameters **
- children: The value of the [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) received by your component.
#### **Returns **
If children[link](https://react.dev/reference/react/isValidElement)[is a valid element,](https://react.dev/reference/react/isValidElement) returns that element.
Otherwise, throws an error.
#### **Caveats **
- This method always **throws if you pass an array (such as the return value of ****Children.map****) as ****children****.** In other words, it enforces that children is a single React element, not that it’s an array with a single element.
### **Children.toArray(children)**** **
Call Children.toArray(children) to create an array out of the children data structure.
import { Children } from 'react';
export default function ReversedList({ children }) {
const result = Children.toArray(children);
result.reverse();
// ...
#### **Parameters **
- children: The value of the [children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) received by your component.
#### **Returns **
Returns a flat array of elements in children.
#### **Caveats **
- Empty nodes (null, undefined, and Booleans) will be omitted in the returned array. **The returned elements’ keys will be calculated from the original elements’ keys and their level of nesting and position.** This ensures that flattening the array does not introduce changes in behavior.
## **Usage **
### **Transforming children **
To transform the children JSX that your component[link](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[receives as the](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop,](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) call Children.map:
import { Children } from 'react';
function RowList({ children }) {
return (
<div className="RowList">
{Children.map(children, child =>
<div className="Row">
{child}
</div>
)}
</div>
);
}
In the example above, the RowList wraps every child it receives into a <div className="Row"> container. For example, let’s say the parent component passes three <p> tags as the children prop to RowList:
<RowList>
<p>This is the first item.</p>
<p>This is the second item.</p>
<p>This is the third item.</p>
</RowList>
Then, with the RowList implementation above, the final rendered result will look like this:
<div className="RowList">
<div className="Row">
<p>This is the first item.</p>
</div>
<div className="Row">
<p>This is the second item.</p>
</div>
<div className="Row">
<p>This is the third item.</p>
</div>
</div>
Children.map is similar to[link](https://react.dev/learn/rendering-lists)[to transforming arrays with](https://react.dev/learn/rendering-lists)[map()](https://react.dev/learn/rendering-lists)[.](https://react.dev/learn/rendering-lists) The difference is that the children data structure is considered *opaque.* This means that even if it’s sometimes an array, you should not assume it’s an array or any other particular data type. This is why you should use Children.map if you need to transform it.
App.jsRowList.js
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
import { Children } from 'react';
export default function RowList({ children }) {
return (
<div className="RowList">
{Children.map(children, child =>
<div className="Row">
{child}
</div>
)}
</div>
);
}
##### **Deep Dive**
#### **Why is the children prop not always an array? **
**Show Details**
### **Pitfall**
The children data structure **does not include rendered output** of the components you pass as JSX. In the example below, the children received by the RowList only contains two items rather than three:
1. <p>This is the first item.</p>
1. <MoreRows />
This is why only two row wrappers are generated in this example:
App.jsRowList.js
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
import RowList from './RowList.js';
export default function App() {
return (
<RowList>
<p>This is the first item.</p>
<MoreRows />
</RowList>
);
}
function MoreRows() {
return (
<>
<p>This is the second item.</p>
<p>This is the third item.</p>
</>
);
}
Show more
**There is no way to get the rendered output of an inner component** like <MoreRows /> when manipulating children. This is why[link](https://react.dev/reference/react/Children#alternatives)[it’s usually better to use one of the alternative solutions.](https://react.dev/reference/react/Children#alternatives)
### **Running some code for each child **
Call Children.forEach to iterate over each child in the children data structure. It does not return any value and is similar to the[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)[forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)[method.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) You can use it to run custom logic like constructing your own array.
App.jsSeparatorList.js
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
import { Children } from 'react';
export default function SeparatorList({ children }) {
const result = [];
Children.forEach(children, (child, index) => {
result.push(child);
result.push(<hr key={index} />);
});
result.pop(); // Remove the last separator
return result;
}
### **Pitfall**
As mentioned earlier, there is no way to get the rendered output of an inner component when manipulating children. This is why[link](https://react.dev/reference/react/Children#alternatives)[it’s usually better to use one of the alternative solutions.](https://react.dev/reference/react/Children#alternatives)
### **Counting children **
Call Children.count(children) to calculate the number of children.
App.jsRowList.js
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
import { Children } from 'react';
export default function RowList({ children }) {
return (
<div className="RowList">
<h1 className="RowListHeader">
Total rows: {Children.count(children)}
</h1>
{Children.map(children, child =>
<div className="Row">
{child}
</div>
)}
</div>
);
}
Show more
### **Pitfall**
As mentioned earlier, there is no way to get the rendered output of an inner component when manipulating children. This is why[link](https://react.dev/reference/react/Children#alternatives)[it’s usually better to use one of the alternative solutions.](https://react.dev/reference/react/Children#alternatives)
### **Converting children to an array **
Call Children.toArray(children) to turn the children data structure into a regular JavaScript array. This lets you manipulate the array with built-in array methods like[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)[filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)[sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), or[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)[reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)[.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
App.jsReversedList.js
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
import { Children } from 'react';
export default function ReversedList({ children }) {
const result = Children.toArray(children);
result.reverse();
return result;
}
### **Pitfall**
As mentioned earlier, there is no way to get the rendered output of an inner component when manipulating children. This is why[link](https://react.dev/reference/react/Children#alternatives)[it’s usually better to use one of the alternative solutions.](https://react.dev/reference/react/Children#alternatives)
## **Alternatives **
### **Note**
This section describes alternatives to the Children API (with capital C) that’s imported like this:
import { Children } from 'react';
Don’t confuse it with[link](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[using the](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) (lowercase c), which is good and encouraged.
### **Exposing multiple components **
Manipulating children with the Children methods often leads to fragile code. When you pass children to a component in JSX, you don’t usually expect the component to manipulate or transform the individual children.
When you can, try to avoid using the Children methods. For example, if you want every child of RowList to be wrapped in <div className="Row">, export a Row component, and manually wrap every row into it like this:
App.jsRowList.js
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
import { RowList, Row } from './RowList.js';
export default function App() {
return (
<RowList>
<Row>
<p>This is the first item.</p>
</Row>
<Row>
<p>This is the second item.</p>
</Row>
<Row>
<p>This is the third item.</p>
</Row>
</RowList>
);
}
Show more
Unlike using Children.map, this approach does not wrap every child automatically. **However, this approach has a significant benefit compared to the**[** **](https://react.dev/reference/react/Children#transforming-children)[**earlier example with **](https://react.dev/reference/react/Children#transforming-children)[**Children.map**](https://react.dev/reference/react/Children#transforming-children)** because it works even if you keep extracting more components.** For example, it still works if you extract your own MoreRows component:
App.jsRowList.js
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
import { RowList, Row } from './RowList.js';
export default function App() {
return (
<RowList>
<Row>
<p>This is the first item.</p>
</Row>
<MoreRows />
</RowList>
);
}
function MoreRows() {
return (
<>
<Row>
<p>This is the second item.</p>
</Row>
<Row>
<p>This is the third item.</p>
</Row>
</>
);
}
Show more
This wouldn’t work with Children.map because it would “see” <MoreRows /> as a single child (and a single row).
### **Accepting an array of objects as a prop **
You can also explicitly pass an array as a prop. For example, this RowList accepts a rows array as a prop:
App.jsRowList.js
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
import { RowList, Row } from './RowList.js';
export default function App() {
return (
<RowList rows={[
{ id: 'first', content: <p>This is the first item.</p> },
{ id: 'second', content: <p>This is the second item.</p> },
{ id: 'third', content: <p>This is the third item.</p> }
]} />
);
}
Since rows is a regular JavaScript array, the RowList component can use built-in array methods like[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on it.
This pattern is especially useful when you want to be able to pass more information as structured data together with children. In the below example, the TabSwitcher component receives an array of objects as the tabs prop:
App.jsTabSwitcher.js
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
import TabSwitcher from './TabSwitcher.js';
export default function App() {
return (
<TabSwitcher tabs={[
{
id: 'first',
header: 'First',
content: <p>This is the first item.</p>
},
{
id: 'second',
header: 'Second',
content: <p>This is the second item.</p>
},
{
id: 'third',
header: 'Third',
content: <p>This is the third item.</p>
}
]} />
);
}
Show more
Unlike passing the children as JSX, this approach lets you associate some extra data like header with each item. Because you are working with the tabs directly, and it is an array, you do not need the Children methods.
### **Calling a render prop to customize rendering **
Instead of producing JSX for every single item, you can also pass a function that returns JSX, and call that function when necessary. In this example, the App component passes a renderContent function to the TabSwitcher component. The TabSwitcher component calls renderContent only for the selected tab:
App.jsTabSwitcher.js
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
import TabSwitcher from './TabSwitcher.js';
export default function App() {
return (
<TabSwitcher
tabIds={['first', 'second', 'third']}
getHeader={tabId => {
return tabId[0].toUpperCase() + tabId.slice(1);
}}
renderContent={tabId => {
return <p>This is the {tabId} item.</p>;
}}
/>
);
}
A prop like renderContent is called a *render prop* because it is a prop that specifies how to render a piece of the user interface. However, there is nothing special about it: it is a regular prop which happens to be a function.
Render props are functions, so you can pass information to them. For example, this RowList component passes the id and the index of each row to the renderRow render prop, which uses index to highlight even rows:
App.jsRowList.js
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
import { RowList, Row } from './RowList.js';
export default function App() {
return (
<RowList
rowIds={['first', 'second', 'third']}
renderRow={(id, index) => {
return (
<Row isHighlighted={index % 2 === 0}>
<p>This is the {id} item.</p>
</Row>
);
}}
/>
);
}
Show more
This is another example of how parent and child components can cooperate without manipulating the children.
## **Troubleshooting **
### **I pass a custom component, but the ****Children**** methods don’t show its render result **
Suppose you pass two children to RowList like this:
<RowList>
<p>First item</p>
<MoreRows />
</RowList>
If you do Children.count(children) inside RowList, you will get 2. Even if MoreRows renders 10 different items, or if it returns null, Children.count(children) will still be 2. From the RowList’s perspective, it only “sees” the JSX it has received. It does not “see” the internals of the MoreRows component.
The limitation makes it hard to extract a component. This is why[link](https://react.dev/reference/react/Children#alternatives)[alternatives](https://react.dev/reference/react/Children#alternatives) are preferred to using Children.
