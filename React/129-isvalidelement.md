# **isValidElement**
isValidElement checks whether a value is a React element.
const isElement = isValidElement(value)
- [Reference](https://react.dev/reference/react/isValidElement#reference)
  - [isValidElement(value)](https://react.dev/reference/react/isValidElement#isvalidelement)
- [Usage](https://react.dev/reference/react/isValidElement#usage)
  - [Checking if something is a React element](https://react.dev/reference/react/isValidElement#checking-if-something-is-a-react-element)
## **Reference **
### **isValidElement(value)**** **
Call isValidElement(value) to check whether value is a React element.
import { isValidElement, createElement } from 'react';
// ✅ React elements
console.log(isValidElement(<p />)); // true
console.log(isValidElement(createElement('p'))); // true
// ❌ Not React elements
console.log(isValidElement(25)); // false
console.log(isValidElement('Hello')); // false
console.log(isValidElement({ age: 42 })); // false
[See more examples below.](https://react.dev/reference/react/isValidElement#usage)
#### **Parameters **
- value: The value you want to check. It can be any a value of any type.
#### **Returns **
isValidElement returns true if the value is a React element. Otherwise, it returns false.
#### **Caveats **
- **Only **[**JSX tags**](https://react.dev/learn/writing-markup-with-jsx)** and objects returned by **[**createElement**](https://react.dev/reference/react/createElement)** are considered to be React elements.** For example, even though a number like 42 is a valid React *node* (and can be returned from a component), it is not a valid React element. Arrays and portals created with [createPortal](https://react.dev/reference/react-dom/createPortal) are also *not* considered to be React elements.
## **Usage **
### **Checking if something is a React element **
Call isValidElement to check if some value is a *React element.*
React elements are:
- Values produced by writing a [JSX tag](https://react.dev/learn/writing-markup-with-jsx)
- Values produced by calling [createElement](https://react.dev/reference/react/createElement)
For React elements, isValidElement returns true:
import { isValidElement, createElement } from 'react';
// ✅ JSX tags are React elements
console.log(isValidElement(<p />)); // true
console.log(isValidElement(<MyComponent />)); // true
// ✅ Values returned by createElement are React elements
console.log(isValidElement(createElement('p'))); // true
console.log(isValidElement(createElement(MyComponent))); // true
Any other values, such as strings, numbers, or arbitrary objects and arrays, are not React elements.
For them, isValidElement returns false:
// ❌ These are *not* React elements
console.log(isValidElement(null)); // false
console.log(isValidElement(25)); // false
console.log(isValidElement('Hello')); // false
console.log(isValidElement({ age: 42 })); // false
console.log(isValidElement([<div />, <div />])); // false
console.log(isValidElement(MyComponent)); // false
It is very uncommon to need isValidElement. It’s mostly useful if you’re calling another API that *only* accepts elements (like[link](https://react.dev/reference/react/cloneElement)[cloneElement](https://react.dev/reference/react/cloneElement) does) and you want to avoid an error when your argument is not a React element.
Unless you have some very specific reason to add an isValidElement check, you probably don’t need it.
