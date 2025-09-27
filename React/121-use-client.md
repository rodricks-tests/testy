# **'use client'**
### **React Server Components**
'use client' is for use with[link](https://react.dev/reference/rsc/server-components)[React Server Components](https://react.dev/reference/rsc/server-components).
'use client' lets you mark what code runs on the client.
- [Reference](https://react.dev/reference/rsc/use-client#reference)
  - ['use client'](https://react.dev/reference/rsc/use-client#use-client)
  - [How](https://react.dev/reference/rsc/use-client#how-use-client-marks-client-code)['use client'](https://react.dev/reference/rsc/use-client#how-use-client-marks-client-code)[marks client code](https://react.dev/reference/rsc/use-client#how-use-client-marks-client-code)
  - [When to use](https://react.dev/reference/rsc/use-client#when-to-use-use-client)['use client'](https://react.dev/reference/rsc/use-client#when-to-use-use-client)
  - [Serializable types returned by Server Components](https://react.dev/reference/rsc/use-client#serializable-types)
- [Usage](https://react.dev/reference/rsc/use-client#usage)
  - [Building with interactivity and state](https://react.dev/reference/rsc/use-client#building-with-interactivity-and-state)
  - [Using client APIs](https://react.dev/reference/rsc/use-client#using-client-apis)
  - [Using third-party libraries](https://react.dev/reference/rsc/use-client#using-third-party-libraries)
## **Reference **
### **'use client'**** **
Add 'use client' at the top of a file to mark the module and its transitive dependencies as client code.
'use client';
import { useState } from 'react';
import { formatDate } from './formatters';
import Button from './button';
export default function RichTextEditor({ timestamp, text }) {
const date = formatDate(timestamp);
// ...
const editButton = <Button />;
// ...
}
When a file marked with 'use client' is imported from a Server Component,[link](https://react.dev/learn/start-a-new-react-project#full-stack-frameworks)[compatible bundlers](https://react.dev/learn/start-a-new-react-project#full-stack-frameworks) will treat the module import as a boundary between server-run and client-run code.
As dependencies of RichTextEditor, formatDate and Button will also be evaluated on the client regardless of whether their modules contain a 'use client' directive. Note that a single module may be evaluated on the server when imported from server code and on the client when imported from client code.
#### **Caveats **
- 'use client' must be at the very beginning of a file, above any imports or other code (comments are OK). They must be written with single or double quotes, but not backticks.
- When a 'use client' module is imported from another client-rendered module, the directive has no effect.
- When a component module contains a 'use client' directive, any usage of that component is guaranteed to be a Client Component. However, a component can still be evaluated on the client even if it does not have a 'use client' directive.
  - A component usage is considered a Client Component if it is defined in module with 'use client' directive or when it is a transitive dependency of a module that contains a 'use client' directive. Otherwise, it is a Server Component.
- Code that is marked for client evaluation is not limited to components. All code that is a part of the Client module sub-tree is sent to and run by the client.
- When a server evaluated module imports values from a 'use client' module, the values must either be a React component or [supported serializable prop values](https://react.dev/reference/rsc/use-client#passing-props-from-server-to-client-components) to be passed to a Client Component. Any other use case will throw an exception.
### **How ****'use client'**** marks client code **
In a React app, components are often split into separate files, or[link](https://react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component)[modules](https://react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component).
For apps that use React Server Components, the app is server-rendered by default. 'use client' introduces a server-client boundary in the[link](https://react.dev/learn/understanding-your-ui-as-a-tree#the-module-dependency-tree)[module dependency tree](https://react.dev/learn/understanding-your-ui-as-a-tree#the-module-dependency-tree), effectively creating a subtree of Client modules.
To better illustrate this, consider the following React Server Components app.
App.js
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
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';
export default function App() {
return (
<>
<FancyText title text="Get Inspired App" />
<InspirationGenerator>
<Copyright year={2004} />
</InspirationGenerator>
</>
);
}
In the module dependency tree of this example app, the 'use client' directive in InspirationGenerator.js marks that module and all of its transitive dependencies as Client modules. The subtree starting at InspirationGenerator.js is now marked as Client modules.
'use client' segments the module dependency tree of the React Server Components app, marking InspirationGenerator.js and all of its dependencies as client-rendered.
During render, the framework will server-render the root component and continue through the[link](https://react.dev/learn/understanding-your-ui-as-a-tree#the-render-tree)[render tree](https://react.dev/learn/understanding-your-ui-as-a-tree#the-render-tree), opting-out of evaluating any code imported from client-marked code.
The server-rendered portion of the render tree is then sent to the client. The client, with its client code downloaded, then completes rendering the rest of the tree.
The render tree for the React Server Components app. InspirationGenerator and its child component FancyText are components exported from client-marked code and considered Client Components.
We introduce the following definitions:
- **Client Components** are components in a render tree that are rendered on the client.
- **Server Components** are components in a render tree that are rendered on the server.
Working through the example app, App, FancyText and Copyright are all server-rendered and considered Server Components. As InspirationGenerator.js and its transitive dependencies are marked as client code, the component InspirationGenerator and its child component FancyText are Client Components.
##### **Deep Dive**
#### **How is ****FancyText**** both a Server and a Client Component? **
**Show Details**
##### **Deep Dive**
#### **Why is ****Copyright**** a Server Component? **
**Show Details**
****
### **When to use ****'use client'**** **
With 'use client', you can determine when components are Client Components. As Server Components are default, here is a brief overview of the advantages and limitations to Server Components to determine when you need to mark something as client rendered.
For simplicity, we talk about Server Components, but the same principles apply to all code in your app that is server run.
#### **Advantages of Server Components **
- Server Components can reduce the amount of code sent and run by the client. Only Client modules are bundled and evaluated by the client.
- Server Components benefit from running on the server. They can access the local filesystem and may experience low latency for data fetches and network requests.
#### **Limitations of Server Components **
- Server Components cannot support interaction as event handlers must be registered and triggered by a client.
  - For example, event handlers like onClick can only be defined in Client Components.
- Server Components cannot use most Hooks.
  - When Server Components are rendered, their output is essentially a list of components for the client to render. Server Components do not persist in memory after render and cannot have their own state.
### **Serializable types returned by Server Components **
As in any React app, parent components pass data to child components. As they are rendered in different environments, passing data from a Server Component to a Client Component requires extra consideration.
Prop values passed from a Server Component to Client Component must be serializable.
Serializable props include:
- Primitives
  - [string](https://developer.mozilla.org/en-US/docs/Glossary/String)
  - [number](https://developer.mozilla.org/en-US/docs/Glossary/Number)
  - [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
  - [boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
  - [undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)
  - [null](https://developer.mozilla.org/en-US/docs/Glossary/Null)
  - [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), only symbols registered in the global Symbol registry via [Symbol.for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)
- Iterables containing serializable values
  - [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
  - [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
  - [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) and [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- Plain [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object): those created with [object initializers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), with serializable properties
- Functions that are [Server Functions](https://react.dev/reference/rsc/server-functions)
- Client or Server Component elements (JSX)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
Notably, these are not supported:
- [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) that are not exported from client-marked modules or marked with ['use server'](https://react.dev/reference/rsc/use-server)
- [Classes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)
- Objects that are instances of any class (other than the built-ins mentioned) or objects with [a null prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)
- Symbols not registered globally, ex. Symbol('my new symbol')
## **Usage **
### **Building with interactivity and state **
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
'use client';
import { useState } from 'react';
export default function Counter({initialValue = 0}) {
const [countValue, setCountValue] = useState(initialValue);
const increment = () => setCountValue(countValue + 1);
const decrement = () => setCountValue(countValue - 1);
return (
<>
<h2>Count Value: {countValue}</h2>
<button onClick={increment}>+1</button>
<button onClick={decrement}>-1</button>
</>
);
}
Show more
As Counter requires both the useState Hook and event handlers to increment or decrement the value, this component must be a Client Component and will require a 'use client' directive at the top.
In contrast, a component that renders UI without interaction will not need to be a Client Component.
import { readFile } from 'node:fs/promises';
import Counter from './Counter';
export default async function CounterContainer() {
const initialValue = await readFile('/path/to/counter_value');
return <Counter initialValue={initialValue} />
}
For example, Counter’s parent component, CounterContainer, does not require 'use client' as it is not interactive and does not use state. In addition, CounterContainer must be a Server Component as it reads from the local file system on the server, which is possible only in a Server Component.
There are also components that don’t use any server or client-only features and can be agnostic to where they render. In our earlier example, FancyText is one such component.
export default function FancyText({title, text}) {
return title
? <h1 className='fancy title'>{text}</h1>
: <h3 className='fancy cursive'>{text}</h3>
}
In this case, we don’t add the 'use client' directive, resulting in FancyText’s *output* (rather than its source code) to be sent to the browser when referenced from a Server Component. As demonstrated in the earlier Inspirations app example, FancyText is used as both a Server or Client Component, depending on where it is imported and used.
But if FancyText’s HTML output was large relative to its source code (including dependencies), it might be more efficient to force it to always be a Client Component. Components that return a long SVG path string are one case where it may be more efficient to force a component to be a Client Component.
### **Using client APIs **
Your React app may use client-specific APIs, such as the browser’s APIs for web storage, audio and video manipulation, and device hardware, among[link](https://developer.mozilla.org/en-US/docs/Web/API)[others](https://developer.mozilla.org/en-US/docs/Web/API).
In this example, the component uses[link](https://developer.mozilla.org/en-US/docs/Glossary/DOM)[DOM APIs](https://developer.mozilla.org/en-US/docs/Glossary/DOM) to manipulate a[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)[canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element. Since those APIs are only available in the browser, it must be marked as a Client Component.
'use client';
import {useRef, useEffect} from 'react';
export default function Circle() {
const ref = useRef(null);
useLayoutEffect(() => {
const canvas = ref.current;
const context = canvas.getContext('2d');
context.reset();
context.beginPath();
context.arc(100, 75, 50, 0, 2 * Math.PI);
context.stroke();
});
return <canvas ref={ref} />;
}
### **Using third-party libraries **
Often in a React app, you’ll leverage third-party libraries to handle common UI patterns or logic.
These libraries may rely on component Hooks or client APIs. Third-party components that use any of the following React APIs must run on the client:
- [createContext](https://react.dev/reference/react/createContext)
- [react](https://react.dev/reference/react/hooks) and [react-dom](https://react.dev/reference/react-dom/hooks) Hooks, excluding [use](https://react.dev/reference/react/use) and [useId](https://react.dev/reference/react/useId)
- [forwardRef](https://react.dev/reference/react/forwardRef)
- [memo](https://react.dev/reference/react/memo)
- [startTransition](https://react.dev/reference/react/startTransition)
- If they use client APIs, ex. DOM insertion or native platform views
If these libraries have been updated to be compatible with React Server Components, then they will already include 'use client' markers of their own, allowing you to use them directly from your Server Components. If a library hasn’t been updated, or if a component needs props like event handlers that can only be specified on the client, you may need to add your own Client Component file in between the third-party Client Component and your Server Component where you’d like to use it.
