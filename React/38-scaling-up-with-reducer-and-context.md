# **Scaling Up with Reducer and Context**
Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.
### **You will learn**
- How to combine a reducer with context
- How to avoid passing state and dispatch through props
- How to keep context and state logic in a separate file
## **Combining a reducer with context **
In this example from[link](https://react.dev/learn/extracting-state-logic-into-a-reducer)[the introduction to reducers](https://react.dev/learn/extracting-state-logic-into-a-reducer), the state is managed by a reducer. The reducer function contains all of the state update logic and is declared at the bottom of this file:
App.jsAddTask.jsTaskList.js
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
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
export default function TaskApp() {
const [tasks, dispatch] = useReducer(
tasksReducer,
initialTasks
);
function handleAddTask(text) {
dispatch({
type: 'added',
id: nextId++,
text: text,
});
}
function handleChangeTask(task) {
dispatch({
type: 'changed',
task: task
});
}
function handleDeleteTask(taskId) {
dispatch({
type: 'deleted',
id: taskId
});
}
return (
<>
<h1>Day off in Kyoto</h1>
<AddTask
Show more
A reducer helps keep the event handlers short and concise. However, as your app grows, you might run into another difficulty. **Currently, the ****tasks**** state and the ****dispatch**** function are only available in the top-level ****TaskApp**** component.** To let other components read the list of tasks or change it, you have to explicitly[link](https://react.dev/learn/passing-props-to-a-component)[pass down](https://react.dev/learn/passing-props-to-a-component) the current state and the event handlers that change it as props.
For example, TaskApp passes a list of tasks and the event handlers to TaskList:
<TaskList
tasks={tasks}
onChangeTask={handleChangeTask}
onDeleteTask={handleDeleteTask}
/>
And TaskList passes the event handlers to Task:
<Task
task={task}
onChange={onChangeTask}
onDelete={onDeleteTask}
/>
In a small example like this, this works well, but if you have tens or hundreds of components in the middle, passing down all state and functions can be quite frustrating!
This is why, as an alternative to passing them through props, you might want to put both the tasks state and the dispatch function[link](https://react.dev/learn/passing-data-deeply-with-context)[into context.](https://react.dev/learn/passing-data-deeply-with-context) **This way, any component below ****TaskApp**** in the tree can read the tasks and dispatch actions without the repetitive “prop drilling”.**
Here is how you can combine a reducer with context:
1. **Create** the context.
1. **Put** state and dispatch into context.
1. **Use** context anywhere in the tree.
### **Step 1: Create the context **
The useReducer Hook returns the current tasks and the dispatch function that lets you update them:
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
To pass them down the tree, you will[link](https://react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context)[create](https://react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context) two separate contexts:
- TasksContext provides the current list of tasks.
- TasksDispatchContext provides the function that lets components dispatch actions.
Export them from a separate file so that you can later import them from other files:
App.jsTasksContext.jsAddTask.jsTaskList.js
Reload
Clear
Fork
1
2
3
4
5
import { createContext } from 'react';
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
Here, you’re passing null as the default value to both contexts. The actual values will be provided by the TaskApp component.
### **Step 2: Put state and dispatch into context **
Now you can import both contexts in your TaskApp component. Take the tasks and dispatch returned by useReducer() and[link](https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context)[provide them](https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context) to the entire tree below:
import { TasksContext, TasksDispatchContext } from './TasksContext.js';
export default function TaskApp() {
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
// ...
return (
<TasksContext value={tasks}>
<TasksDispatchContext value={dispatch}>
...
</TasksDispatchContext>
</TasksContext>
);
}
For now, you pass the information both via props and in context:
App.jsTasksContext.jsAddTask.jsTaskList.js
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
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';
export default function TaskApp() {
const [tasks, dispatch] = useReducer(
tasksReducer,
initialTasks
);
function handleAddTask(text) {
dispatch({
type: 'added',
id: nextId++,
text: text,
});
}
function handleChangeTask(task) {
dispatch({
type: 'changed',
task: task
});
}
function handleDeleteTask(taskId) {
dispatch({
type: 'deleted',
id: taskId
});
}
return (
<TasksContext value={tasks}>
<TasksDispatchContext value={dispatch}>
Show more
In the next step, you will remove prop passing.
### **Step 3: Use context anywhere in the tree **
Now you don’t need to pass the list of tasks or the event handlers down the tree:
<TasksContext value={tasks}>
<TasksDispatchContext value={dispatch}>
<h1>Day off in Kyoto</h1>
<AddTask />
<TaskList />
</TasksDispatchContext>
</TasksContext>
Instead, any component that needs the task list can read it from the TasksContext:
export default function TaskList() {
const tasks = useContext(TasksContext);
// ...
To update the task list, any component can read the dispatch function from context and call it:
export default function AddTask() {
const [text, setText] = useState('');
const dispatch = useContext(TasksDispatchContext);
// ...
return (
// ...
<button onClick={() => {
setText('');
dispatch({
type: 'added',
id: nextId++,
text: text,
});
}}>Add</button>
// ...
**The ****TaskApp**** component does not pass any event handlers down, and the ****TaskList**** does not pass any event handlers to the ****Task**** component either.** Each component reads the context that it needs:
App.jsTasksContext.jsAddTask.jsTaskList.js
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
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';
export default function TaskList() {
const tasks = useContext(TasksContext);
return (
<ul>
{tasks.map(task => (
<li key={task.id}>
<Task task={task} />
</li>
))}
</ul>
);
}
function Task({ task }) {
const [isEditing, setIsEditing] = useState(false);
const dispatch = useContext(TasksDispatchContext);
let taskContent;
if (isEditing) {
taskContent = (
<>
<input
value={task.text}
onChange={e => {
dispatch({
type: 'changed',
task: {
...task,
text: e.target.value
}
});
}} />
<button onClick={() => setIsEditing(false)}>
Save
Show more
**The state still “lives” in the top-level ****TaskApp**** component, managed with ****useReducer****.** But its tasks and dispatch are now available to every component below in the tree by importing and using these contexts.
## **Moving all wiring into a single file **
You don’t have to do this, but you could further declutter the components by moving both reducer and context into a single file. Currently, TasksContext.js contains only two context declarations:
import { createContext } from 'react';
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
This file is about to get crowded! You’ll move the reducer into that same file. Then you’ll declare a new TasksProvider component in the same file. This component will tie all the pieces together:
1. It will manage the state with a reducer.
1. It will provide both contexts to components below.
1. It will [take](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)[as a prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) so you can pass JSX to it.
export function TasksProvider({ children }) {
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
return (
<TasksContext value={tasks}>
<TasksDispatchContext value={dispatch}>
{children}
</TasksDispatchContext>
</TasksContext>
);
}
**This removes all the complexity and wiring from your ****TaskApp**** component:**
App.jsTasksContext.jsAddTask.jsTaskList.js
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
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';
export default function TaskApp() {
return (
<TasksProvider>
<h1>Day off in Kyoto</h1>
<AddTask />
<TaskList />
</TasksProvider>
);
}
You can also export functions that *use* the context from TasksContext.js:
export function useTasks() {
return useContext(TasksContext);
}
export function useTasksDispatch() {
return useContext(TasksDispatchContext);
}
When a component needs to read context, it can do it through these functions:
const tasks = useTasks();
const dispatch = useTasksDispatch();
This doesn’t change the behavior in any way, but it lets you later split these contexts further or add some logic to these functions. **Now all of the context and reducer wiring is in ****TasksContext.js****. This keeps the components clean and uncluttered, focused on what they display rather than where they get the data:**
App.jsTasksContext.jsAddTask.jsTaskList.js
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
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
export default function TaskList() {
const tasks = useTasks();
return (
<ul>
{tasks.map(task => (
<li key={task.id}>
<Task task={task} />
</li>
))}
</ul>
);
}
function Task({ task }) {
const [isEditing, setIsEditing] = useState(false);
const dispatch = useTasksDispatch();
let taskContent;
if (isEditing) {
taskContent = (
<>
<input
value={task.text}
onChange={e => {
dispatch({
type: 'changed',
task: {
...task,
text: e.target.value
}
});
}} />
<button onClick={() => setIsEditing(false)}>
Save
Show more
You can think of TasksProvider as a part of the screen that knows how to deal with tasks, useTasks as a way to read them, and useTasksDispatch as a way to update them from any component below in the tree.
### **Note**
Functions like useTasks and useTasksDispatch are called[link](https://react.dev/learn/reusing-logic-with-custom-hooks)[*Custom Hooks.*](https://react.dev/learn/reusing-logic-with-custom-hooks) Your function is considered a custom Hook if its name starts with use. This lets you use other Hooks, like useContext, inside it.
As your app grows, you may have many context-reducer pairs like this. This is a powerful way to scale your app and[link](https://react.dev/learn/sharing-state-between-components)[lift state up](https://react.dev/learn/sharing-state-between-components) without too much work whenever you want to access the data deep in the tree.**Referencing Values with Refs**
When you want a component to “remember” some information, but you don’t want that information to[link](https://react.dev/learn/render-and-commit)[trigger new renders](https://react.dev/learn/render-and-commit), you can use a *ref*.
### **You will learn**
- How to add a ref to your component
- How to update a ref’s value
- How refs are different from state
- How to use refs safely
## **Adding a ref to your component **
You can add a ref to your component by importing the useRef Hook from React:
import { useRef } from 'react';
Inside your component, call the useRef Hook and pass the initial value that you want to reference as the only argument. For example, here is a ref to the value 0:
const ref = useRef(0);
useRef returns an object like this:
{
current: 0 // The value you passed to useRef
}
Illustrated by [Rachel Lee Nabors](https://nearestnabors.com/)
You can access the current value of that ref through the ref.current property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track. (This is what makes it an “escape hatch” from React’s one-way data flow—more on that below!)
Here, a button will increment ref.current on every click:
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
import { useRef } from 'react';
export default function Counter() {
let ref = useRef(0);
function handleClick() {
ref.current = ref.current + 1;
alert('You clicked ' + ref.current + ' times!');
}
return (
<button onClick={handleClick}>
Click me!
</button>
);
}
Show more
The ref points to a number, but, like[link](https://react.dev/learn/state-a-components-memory)[state](https://react.dev/learn/state-a-components-memory), you could point to anything: a string, an object, or even a function. Unlike state, ref is a plain JavaScript object with the current property that you can read and modify.
Note that **the component doesn’t re-render with every increment.** Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not!
## **Example: building a stopwatch **
You can combine refs and state in a single component. For example, let’s make a stopwatch that the user can start or stop by pressing a button. In order to display how much time has passed since the user pressed “Start”, you will need to keep track of when the Start button was pressed and what the current time is. **This information is used for rendering, so you’ll keep it in state:**
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
When the user presses “Start”, you’ll use[link](https://developer.mozilla.org/docs/Web/API/setInterval)[setInterval](https://developer.mozilla.org/docs/Web/API/setInterval) in order to update the time every 10 milliseconds:
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
import { useState } from 'react';
export default function Stopwatch() {
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
function handleStart() {
// Start counting.
setStartTime(Date.now());
setNow(Date.now());
setInterval(() => {
// Update the current time every 10ms.
setNow(Date.now());
}, 10);
}
let secondsPassed = 0;
if (startTime != null && now != null) {
secondsPassed = (now - startTime) / 1000;
}
return (
<>
<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
<button onClick={handleStart}>
Start
</button>
</>
);
}
Show more
When the “Stop” button is pressed, you need to cancel the existing interval so that it stops updating the now state variable. You can do this by calling[link](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)[clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval), but you need to give it the interval ID that was previously returned by the setInterval call when the user pressed Start. You need to keep the interval ID somewhere. **Since the interval ID is not used for rendering, you can keep it in a ref:**
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
import { useState, useRef } from 'react';
export default function Stopwatch() {
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
const intervalRef = useRef(null);
function handleStart() {
setStartTime(Date.now());
setNow(Date.now());
clearInterval(intervalRef.current);
intervalRef.current = setInterval(() => {
setNow(Date.now());
}, 10);
}
function handleStop() {
clearInterval(intervalRef.current);
}
let secondsPassed = 0;
if (startTime != null && now != null) {
secondsPassed = (now - startTime) / 1000;
}
return (
<>
<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
<button onClick={handleStart}>
Start
</button>
<button onClick={handleStop}>
Stop
</button>
</>
Show more
When a piece of information is used for rendering, keep it in state. When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient.
## **Differences between refs and state **
Perhaps you’re thinking refs seem less “strict” than state—you can mutate them instead of always having to use a state setting function, for instance. But in most cases, you’ll want to use state. Refs are an “escape hatch” you won’t need often. Here’s how state and refs compare:
| refs | state |
| --- | --- |
| useRef(initialValue) returns { current: initialValue } | useState(initialValue) returns the current value of a state variable and a state setter function ( [value, setValue]) |
| Doesn’t trigger re-render when you change it. | Triggers re-render when you change it. |
| Mutable—you can modify and update current’s value outside of the rendering process. | ”Immutable”—you must use the state setting function to modify state variables to queue a re-render. |
| You shouldn’t read (or write) the current value during rendering. | You can read state at any time. However, each render has its own  of state which does not change. |

Here is a counter button that’s implemented with state:
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
import { useState } from 'react';
export default function Counter() {
const [count, setCount] = useState(0);
function handleClick() {
setCount(count + 1);
}
return (
<button onClick={handleClick}>
You clicked {count} times
</button>
);
}
Because the count value is displayed, it makes sense to use a state value for it. When the counter’s value is set with setCount(), React re-renders the component and the screen updates to reflect the new count.
If you tried to implement this with a ref, React would never re-render the component, so you’d never see the count change! See how clicking this button **does not update its text**:
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
import { useRef } from 'react';
export default function Counter() {
let countRef = useRef(0);
function handleClick() {
// This doesn't re-render the component!
countRef.current = countRef.current + 1;
}
return (
<button onClick={handleClick}>
You clicked {countRef.current} times
</button>
);
}
Show more
This is why reading ref.current during render leads to unreliable code. If you need that, use state instead.
##### **Deep Dive**
#### **How does useRef work inside? **
**Show Details**
## **When to use refs **
Typically, you will use a ref when your component needs to “step outside” React and communicate with external APIs—often a browser API that won’t impact the appearance of the component. Here are a few of these rare situations:
- Storing [timeout IDs](https://developer.mozilla.org/docs/Web/API/setTimeout)
- Storing and manipulating [DOM elements](https://developer.mozilla.org/docs/Web/API/Element), which we cover on [the next page](https://react.dev/learn/manipulating-the-dom-with-refs)
- Storing other objects that aren’t necessary to calculate the JSX.
If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs.
## **Best practices for refs **
Following these principles will make your components more predictable:
- **Treat refs as an escape hatch.** Refs are useful when you work with external systems or browser APIs. If much of your application logic and data flow relies on refs, you might want to rethink your approach.
- **Don’t read or write ****ref.current**** during rendering.** If some information is needed during rendering, use [state](https://react.dev/learn/state-a-components-memory) instead. Since React doesn’t know when ref.current changes, even reading it while rendering makes your component’s behavior difficult to predict. (The only exception to this is code like if (!ref.current) ref.current = new Thing() which only sets the ref once during the first render.)
Limitations of React state don’t apply to refs. For example, state acts like a[link](https://react.dev/learn/state-as-a-snapshot)[snapshot for every render](https://react.dev/learn/state-as-a-snapshot) and[link](https://react.dev/learn/queueing-a-series-of-state-updates)[doesn’t update synchronously.](https://react.dev/learn/queueing-a-series-of-state-updates) But when you mutate the current value of a ref, it changes immediately:
ref.current = 5;
console.log(ref.current); // 5
This is because **the ref itself is a regular JavaScript object,** and so it behaves like one.
You also don’t need to worry about[link](https://react.dev/learn/updating-objects-in-state)[avoiding mutation](https://react.dev/learn/updating-objects-in-state) when you work with a ref. As long as the object you’re mutating isn’t used for rendering, React doesn’t care what you do with the ref or its contents.
## **Refs and the DOM **
You can point a ref to any value. However, the most common use case for a ref is to access a DOM element. For example, this is handy if you want to focus an input programmatically. When you pass a ref to a ref attribute in JSX, like <div ref={myRef}>, React will put the corresponding DOM element into myRef.current. Once the element is removed from the DOM, React will update myRef.current to be null. You can read more about this in[link](https://react.dev/learn/manipulating-the-dom-with-refs)[Manipulating the DOM with Refs.](https://react.dev/learn/manipulating-the-dom-with-refs)
