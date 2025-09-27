# **captureOwnerStack**
captureOwnerStack reads the current Owner Stack in development and returns it as a string if available.
const stack = captureOwnerStack();
- [Reference](https://react.dev/reference/react/captureOwnerStack#reference)
  - [captureOwnerStack()](https://react.dev/reference/react/captureOwnerStack#captureownerstack)
- [Usage](https://react.dev/reference/react/captureOwnerStack#usage)
  - [Enhance a custom error overlay](https://react.dev/reference/react/captureOwnerStack#enhance-a-custom-error-overlay)
- [Troubleshooting](https://react.dev/reference/react/captureOwnerStack#troubleshooting)
  - [The Owner Stack is](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)[null](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)
  - [captureOwnerStack](https://react.dev/reference/react/captureOwnerStack#captureownerstack-is-not-available)[is not available](https://react.dev/reference/react/captureOwnerStack#captureownerstack-is-not-available)
## **Reference **
### **captureOwnerStack()**** **
Call captureOwnerStack to get the current Owner Stack.
import * as React from 'react';
function Component() {
if (process.env.NODE_ENV !== 'production') {
const ownerStack = React.captureOwnerStack();
console.log(ownerStack);
}
}
#### **Parameters **
captureOwnerStack does not take any parameters.
#### **Returns **
captureOwnerStack returns string | null.
Owner Stacks are available in
- Component render
- Effects (e.g. useEffect)
- React’s event handlers (e.g. <button onClick={...} />)
- React error handlers ([React Root options](https://react.dev/reference/react-dom/client/createRoot#parameters) onCaughtError, onRecoverableError, and onUncaughtError)
If no Owner Stack is available, null is returned (see[link](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)[Troubleshooting: The Owner Stack is](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)[null](https://react.dev/reference/react/captureOwnerStack#the-owner-stack-is-null)).
#### **Caveats **
- Owner Stacks are only available in development. captureOwnerStack will always return null outside of development.
##### **Deep Dive**
#### **Owner Stack vs Component Stack **
**Show Details**
## **Usage **
### **Enhance a custom error overlay **
import { captureOwnerStack } from "react";
import { instrumentedConsoleError } from "./errorOverlay";
const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
originalConsoleError.apply(console, args);
const ownerStack = captureOwnerStack();
onConsoleError({
// Keep in mind that in a real application, console.error can be
// called with multiple arguments which you should account for.
consoleMessage: args[0],
ownerStack,
});
};
If you intercept console.error calls to highlight them in an error overlay, you can call captureOwnerStack to include the Owner Stack.
index.jserrorOverlay.jsApp.js
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
import { captureOwnerStack } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import { onConsoleError } from "./errorOverlay";
import './styles.css';
const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
originalConsoleError.apply(console, args);
const ownerStack = captureOwnerStack();
onConsoleError({
// Keep in mind that in a real application, console.error can be
// called with multiple arguments which you should account for.
consoleMessage: args[0],
ownerStack,
});
};
const container = document.getElementById("root");
createRoot(container).render(<App />);
Show more
## **Troubleshooting **
### **The Owner Stack is ****null**** **
The call of captureOwnerStack happened outside of a React controlled function e.g. in a setTimeout callback, after a fetch call or in a custom DOM event handler. During render, Effects, React event handlers, and React error handlers (e.g. hydrateRoot#options.onCaughtError) Owner Stacks should be available.
In the example below, clicking the button will log an empty Owner Stack because captureOwnerStack was called during a custom DOM event handler. The Owner Stack must be captured earlier e.g. by moving the call of captureOwnerStack into the Effect body.
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
import {captureOwnerStack, useEffect} from 'react';
export default function App() {
useEffect(() => {
// Should call `captureOwnerStack` here.
function handleEvent() {
// Calling it in a custom DOM event handler is too late.
// The Owner Stack will be `null` at this point.
console.log('Owner Stack: ', captureOwnerStack());
}
document.addEventListener('click', handleEvent);
return () => {
document.removeEventListener('click', handleEvent);
}
})
return <button>Click me to see that Owner Stacks are not available in custom DOM event handlers</button>;
}
Show more
### **captureOwnerStack**** is not available **
captureOwnerStack is only exported in development builds. It will be undefined in production builds. If captureOwnerStack is used in files that are bundled for production and development, you should conditionally access it from a namespace import.
// Don't use named imports of `captureOwnerStack` in files that are bundled for development and production.
import {captureOwnerStack} from 'react';
// Use a namespace import instead and access `captureOwnerStack` conditionally.
import * as React from 'react';
if (process.env.NODE_ENV !== 'production') {
const ownerStack = React.captureOwnerStack();
console.log('Owner Stack', ownerStack);
}
