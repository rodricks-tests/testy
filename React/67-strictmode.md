# **<StrictMode>**
<StrictMode> lets you find common bugs in your components early during development.
<StrictMode>
<App />
</StrictMode>
- [Reference](https://react.dev/reference/react/StrictMode#reference)
  - [<StrictMode>](https://react.dev/reference/react/StrictMode#strictmode)
- [Usage](https://react.dev/reference/react/StrictMode#usage)
  - [Enabling Strict Mode for entire app](https://react.dev/reference/react/StrictMode#enabling-strict-mode-for-entire-app)
  - [Enabling Strict Mode for a part of the app](https://react.dev/reference/react/StrictMode#enabling-strict-mode-for-a-part-of-the-app)
  - [Fixing bugs found by double rendering in development](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development)
  - [Fixing bugs found by re-running Effects in development](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development)
  - [Fixing bugs found by re-running ref callbacks in development](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development)
  - [Fixing deprecation warnings enabled by Strict Mode](https://react.dev/reference/react/StrictMode#fixing-deprecation-warnings-enabled-by-strict-mode)
## **Reference **
### **<StrictMode>**** **
Use StrictMode to enable additional development behaviors and warnings for the component tree inside:
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(
<StrictMode>
<App />
</StrictMode>
);
[See more examples below.](https://react.dev/reference/react/StrictMode#usage)
Strict Mode enables the following development-only behaviors:
- Your components will [re-render an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development) to find bugs caused by impure rendering.
- Your components will [re-run Effects an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development) to find bugs caused by missing Effect cleanup.
- Your components will [re-run refs callbacks an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development) to find bugs caused by missing ref cleanup.
- Your components will [be checked for usage of deprecated APIs.](https://react.dev/reference/react/StrictMode#fixing-deprecation-warnings-enabled-by-strict-mode)
#### **Props **
StrictMode accepts no props.
#### **Caveats **
- There is no way to opt out of Strict Mode inside a tree wrapped in <StrictMode>. This gives you confidence that all components inside <StrictMode> are checked. If two teams working on a product disagree whether they find the checks valuable, they need to either reach consensus or move <StrictMode> down in the tree.
## **Usage **
### **Enabling Strict Mode for entire app **
Strict Mode enables extra development-only checks for the entire component tree inside the <StrictMode> component. These checks help you find common bugs in your components early in the development process.
To enable Strict Mode for your entire app, wrap your root component with <StrictMode> when you render it:
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(
<StrictMode>
<App />
</StrictMode>
);
We recommend wrapping your entire app in Strict Mode, especially for newly created apps. If you use a framework that calls[link](https://react.dev/reference/react-dom/client/createRoot)[createRoot](https://react.dev/reference/react-dom/client/createRoot) for you, check its documentation for how to enable Strict Mode.
Although the Strict Mode checks **only run in development,** they help you find bugs that already exist in your code but can be tricky to reliably reproduce in production. Strict Mode lets you fix bugs before your users report them.
### **Note**
Strict Mode enables the following checks in development:
- Your components will [re-render an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development) to find bugs caused by impure rendering.
- Your components will [re-run Effects an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development) to find bugs caused by missing Effect cleanup.
- Your components will [re-run ref callbacks an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development) to find bugs caused by missing ref cleanup.
- Your components will [be checked for usage of deprecated APIs.](https://react.dev/reference/react/StrictMode#fixing-deprecation-warnings-enabled-by-strict-mode)
**All of these checks are development-only and do not impact the production build.**
### **Enabling Strict Mode for a part of the app **
You can also enable Strict Mode for any part of your application:
import { StrictMode } from 'react';
function App() {
return (
<>
<Header />
<StrictMode>
<main>
<Sidebar />
<Content />
</main>
</StrictMode>
<Footer />
</>
);
}
In this example, Strict Mode checks will not run against the Header and Footer components. However, they will run on Sidebar and Content, as well as all of the components inside them, no matter how deep.
### **Note**
When StrictMode is enabled for a part of the app, React will only enable behaviors that are possible in production. For example, if <StrictMode> is not enabled at the root of the app, it will not[link](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development)[re-run Effects an extra time](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development) on initial mount, since this would cause child effects to double fire without the parent effects, which cannot happen in production.
### **Fixing bugs found by double rendering in development **
[React assumes that every component you write is a pure function.](https://react.dev/learn/keeping-components-pure) This means that React components you write must always return the same JSX given the same inputs (props, state, and context).
Components breaking this rule behave unpredictably and cause bugs. To help you find accidentally impure code, Strict Mode calls some of your functions (only the ones that should be pure) **twice in development.** This includes:
- Your component function body (only top-level logic, so this doesn’t include code inside event handlers)
- Functions that you pass to [useState](https://react.dev/reference/react/useState), [set](https://react.dev/reference/react/useState#setstate)[functions](https://react.dev/reference/react/useState#setstate), [useMemo](https://react.dev/reference/react/useMemo), or [useReducer](https://react.dev/reference/react/useReducer)
- Some class component methods like [constructor](https://react.dev/reference/react/Component#constructor), [render](https://react.dev/reference/react/Component#render), [shouldComponentUpdate](https://react.dev/reference/react/Component#shouldcomponentupdate) ([see the whole list](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects))
If a function is pure, running it twice does not change its behavior because a pure function produces the same result every time. However, if a function is impure (for example, it mutates the data it receives), running it twice tends to be noticeable (that’s what makes it impure!) This helps you spot and fix the bug early.
**Here is an example to illustrate how double rendering in Strict Mode helps you find bugs early.**
This StoryTray component takes an array of stories and adds one last “Create Story” item at the end:
index.jsApp.jsStoryTray.js
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
export default function StoryTray({ stories }) {
const items = stories;
items.push({ id: 'create', label: 'Create Story' });
return (
<ul>
{items.map(story => (
<li key={story.id}>
{story.label}
</li>
))}
</ul>
);
}
There is a mistake in the code above. However, it is easy to miss because the initial output appears correct.
This mistake will become more noticeable if the StoryTray component re-renders multiple times. For example, let’s make the StoryTray re-render with a different background color whenever you hover over it:
index.jsApp.jsStoryTray.js
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
import { useState } from 'react';
export default function StoryTray({ stories }) {
const [isHover, setIsHover] = useState(false);
const items = stories;
items.push({ id: 'create', label: 'Create Story' });
return (
<ul
onPointerEnter={() => setIsHover(true)}
onPointerLeave={() => setIsHover(false)}
style={{
backgroundColor: isHover ? '#ddd' : '#fff'
}}
>
{items.map(story => (
<li key={story.id}>
{story.label}
</li>
))}
</ul>
);
}
Show more
Notice how every time you hover over the StoryTray component, “Create Story” gets added to the list again. The intention of the code was to add it once at the end. But StoryTray directly modifies the stories array from the props. Every time StoryTray renders, it adds “Create Story” again at the end of the same array. In other words, StoryTray is not a pure function—running it multiple times produces different results.
To fix this problem, you can make a copy of the array, and modify that copy instead of the original one:
export default function StoryTray({ stories }) {
const items = stories.slice(); // Clone the array
// ✅ Good: Pushing into a new array
items.push({ id: 'create', label: 'Create Story' });
This would[link](https://react.dev/learn/keeping-components-pure)[make the](https://react.dev/learn/keeping-components-pure)[StoryTray](https://react.dev/learn/keeping-components-pure)[function pure.](https://react.dev/learn/keeping-components-pure) Each time it is called, it would only modify a new copy of the array, and would not affect any external objects or variables. This solves the bug, but you had to make the component re-render more often before it became obvious that something is wrong with its behavior.
**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in ****<StrictMode>****:**
index.jsApp.jsStoryTray.js
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
export default function StoryTray({ stories }) {
const items = stories;
items.push({ id: 'create', label: 'Create Story' });
return (
<ul>
{items.map(story => (
<li key={story.id}>
{story.label}
</li>
))}
</ul>
);
}
**Strict Mode *****always***** calls your rendering function twice, so you can see the mistake right away** (“Create Story” appears twice). This lets you notice such mistakes early in the process. When you fix your component to render in Strict Mode, you *also* fix many possible future production bugs like the hover functionality from before:
index.jsApp.jsStoryTray.js
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
import { useState } from 'react';
export default function StoryTray({ stories }) {
const [isHover, setIsHover] = useState(false);
const items = stories.slice(); // Clone the array
items.push({ id: 'create', label: 'Create Story' });
return (
<ul
onPointerEnter={() => setIsHover(true)}
onPointerLeave={() => setIsHover(false)}
style={{
backgroundColor: isHover ? '#ddd' : '#fff'
}}
>
{items.map(story => (
<li key={story.id}>
{story.label}
</li>
))}
</ul>
);
}
Show more
Without Strict Mode, it was easy to miss the bug until you added more re-renders. Strict Mode made the same bug appear right away. Strict Mode helps you find bugs before you push them to your team and to your users.
[Read more about keeping components pure.](https://react.dev/learn/keeping-components-pure)
### **Note**
If you have[link](https://react.dev/learn/react-developer-tools)[React DevTools](https://react.dev/learn/react-developer-tools) installed, any console.log calls during the second render call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.
### **Fixing bugs found by re-running Effects in development **
Strict Mode can also help find bugs in[link](https://react.dev/learn/synchronizing-with-effects)[Effects.](https://react.dev/learn/synchronizing-with-effects)
Every Effect has some setup code and may have some cleanup code. Normally, React calls setup when the component *mounts* (is added to the screen) and calls cleanup when the component *unmounts* (is removed from the screen). React then calls cleanup and setup again if its dependencies changed since the last render.
When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every Effect.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.
**Here is an example to illustrate how re-running Effects in Strict Mode helps you find bugs early.**
Consider this example that connects a component to a chat:
index.jsApp.jschat.js
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
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
const root = createRoot(document.getElementById("root"));
root.render(<App />);
Console (2)
✅ Connecting to "general" room at https://localhost:1234...
Active connections: 1
There is an issue with this code, but it might not be immediately clear.
To make the issue more obvious, let’s implement a feature. In the example below, roomId is not hardcoded. Instead, the user can select the roomId that they want to connect to from a dropdown. Click “Open chat” and then select different chat rooms one by one. Keep track of the number of active connections in the console:
index.jsApp.jschat.js
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
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
const root = createRoot(document.getElementById("root"));
root.render(<App />);
You’ll notice that the number of open connections always keeps growing. In a real app, this would cause performance and network problems. The issue is that[link](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)[your Effect is missing a cleanup function:](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)
useEffect(() => {
const connection = createConnection(serverUrl, roomId);
connection.connect();
return () => connection.disconnect();
}, [roomId]);
Now that your Effect “cleans up” after itself and destroys the outdated connections, the leak is solved. However, notice that the problem did not become visible until you’ve added more features (the select box).
**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in ****<StrictMode>****:**
index.jsApp.jschat.js
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
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
<App />
</StrictMode>
);
Console (4)
✅ Connecting to "general" room at https://localhost:1234...
Active connections: 1
✅ Connecting to "general" room at https://localhost:1234...
Active connections: 2
**With Strict Mode, you immediately see that there is a problem** (the number of active connections jumps to 2). Strict Mode runs an extra setup+cleanup cycle for every Effect. This Effect has no cleanup logic, so it creates an extra connection but doesn’t destroy it. This is a hint that you’re missing a cleanup function.
Strict Mode lets you notice such mistakes early in the process. When you fix your Effect by adding a cleanup function in Strict Mode, you *also* fix many possible future production bugs like the select box from before:
index.jsApp.jschat.js
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
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
<App />
</StrictMode>
);
Notice how the active connection count in the console doesn’t keep growing anymore.
Without Strict Mode, it was easy to miss that your Effect needed cleanup. By running *setup → cleanup → setup* instead of *setup* for your Effect in development, Strict Mode made the missing cleanup logic more noticeable.
[Read more about implementing Effect cleanup.](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
### **Fixing bugs found by re-running ref callbacks in development **
Strict Mode can also help find bugs in[link](https://react.dev/learn/manipulating-the-dom-with-refs)[callbacks refs.](https://react.dev/learn/manipulating-the-dom-with-refs)
Every callback ref has some setup code and may have some cleanup code. Normally, React calls setup when the element is *created* (is added to the DOM) and calls cleanup when the element is *removed* (is removed from the DOM).
When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every callback ****ref****.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.
Consider this example, which allows you to select an animal and then scroll to one of them. Notice when you switch from “Cats” to “Dogs”, the console logs show that the number of animals in the list keeps growing, and the “Scroll to” buttons stop working:
index.jsApp.js
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
import { useRef, useState } from "react";
export default function CatFriends() {
const itemsRef = useRef([]);
const [catList, setCatList] = useState(setupCatList);
const [cat, setCat] = useState('neo');
function scrollToCat(index) {
const list = itemsRef.current;
const {node} = list[index];
node.scrollIntoView({
behavior: "smooth",
block: "nearest",
inline: "center",
});
}
const cats = catList.filter(c => c.type === cat)
return (
<>
<nav>
<button onClick={() => setCat('neo')}>Neo</button>
<button onClick={() => setCat('millie')}>Millie</button>
</nav>
<hr />
<nav>
<span>Scroll to:</span>{cats.map((cat, index) => (
<button key={cat.src} onClick={() => scrollToCat(index)}>
{index}
</button>
))}
</nav>
<div>
<ul>
{cats.map((cat) => (
Show more
**This is a production bug!** Since the ref callback doesn’t remove animals from the list in the cleanup, the list of animals keeps growing. This is a memory leak that can cause performance problems in a real app, and breaks the behavior of the app.
The issue is the ref callback doesn’t cleanup after itself:
<li
ref={node => {
const list = itemsRef.current;
const item = {animal, node};
list.push(item);
return () => {
// 🚩 No cleanup, this is a bug!
}
}}
</li>
Now let’s wrap the original (buggy) code in <StrictMode>:
index.jsApp.js
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
import { useRef, useState } from "react";
export default function CatFriends() {
const itemsRef = useRef([]);
const [catList, setCatList] = useState(setupCatList);
const [cat, setCat] = useState('neo');
function scrollToCat(index) {
const list = itemsRef.current;
const {node} = list[index];
node.scrollIntoView({
behavior: "smooth",
block: "nearest",
inline: "center",
});
}
const cats = catList.filter(c => c.type === cat)
return (
<>
<nav>
<button onClick={() => setCat('neo')}>Neo</button>
<button onClick={() => setCat('millie')}>Millie</button>
</nav>
<hr />
<nav>
<span>Scroll to:</span>{cats.map((cat, index) => (
<button key={cat.src} onClick={() => scrollToCat(index)}>
{index}
</button>
))}
</nav>
<div>
<ul>
{cats.map((cat) => (
Show more
**With Strict Mode, you immediately see that there is a problem**. Strict Mode runs an extra setup+cleanup cycle for every callback ref. This callback ref has no cleanup logic, so it adds refs but doesn’t remove them. This is a hint that you’re missing a cleanup function.
Strict Mode lets you eagerly find mistakes in callback refs. When you fix your callback by adding a cleanup function in Strict Mode, you *also* fix many possible future production bugs like the “Scroll to” bug from before:
index.jsApp.js
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
import { useRef, useState } from "react";
export default function CatFriends() {
const itemsRef = useRef([]);
const [catList, setCatList] = useState(setupCatList);
const [cat, setCat] = useState('neo');
function scrollToCat(index) {
const list = itemsRef.current;
const {node} = list[index];
node.scrollIntoView({
behavior: "smooth",
block: "nearest",
inline: "center",
});
}
const cats = catList.filter(c => c.type === cat)
return (
<>
<nav>
<button onClick={() => setCat('neo')}>Neo</button>
<button onClick={() => setCat('millie')}>Millie</button>
</nav>
<hr />
<nav>
<span>Scroll to:</span>{cats.map((cat, index) => (
<button key={cat.src} onClick={() => scrollToCat(index)}>
{index}
</button>
))}
</nav>
<div>
<ul>
{cats.map((cat) => (
Console (30)
✅ Adding cat to the map. Total cats: 1
✅ Adding cat to the map. Total cats: 2
✅ Adding cat to the map. Total cats: 3
✅ Adding cat to the map. Total cats: 4
✅ Adding cat to the map. Total cats: 5
✅ Adding cat to the map. Total cats: 6
✅ Adding cat to the map. Total cats: 7
✅ Adding cat to the map. Total cats: 8
✅ Adding cat to the map. Total cats: 9
✅ Adding cat to the map. Total cats: 10
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
❌ Removing cat from the map. Total cats: 0
✅ Adding cat to the map. Total cats: 1
✅ Adding cat to the map. Total cats: 2
✅ Adding cat to the map. Total cats: 3
✅ Adding cat to the map. Total cats: 4
✅ Adding cat to the map. Total cats: 5
✅ Adding cat to the map. Total cats: 6
✅ Adding cat to the map. Total cats: 7
✅ Adding cat to the map. Total cats: 8
✅ Adding cat to the map. Total cats: 9
✅ Adding cat to the map. Total cats: 10
Show more
Now on inital mount in StrictMode, the ref callbacks are all setup, cleaned up, and setup again:
...
✅ Adding animal to the map. Total animals: 10
...
❌ Removing animal from the map. Total animals: 0
...
✅ Adding animal to the map. Total animals: 10
**This is expected.** Strict Mode confirms that the ref callbacks are cleaned up correctly, so the size never grows above the expected amount. After the fix, there are no memory leaks, and all the features work as expected.
Without Strict Mode, it was easy to miss the bug until you clicked around to app to notice broken features. Strict Mode made the bugs appear right away, before you push them to production.
### **Fixing deprecation warnings enabled by Strict Mode **
React warns if some component anywhere inside a <StrictMode> tree uses one of these deprecated APIs:
- UNSAFE_ class lifecycle methods like [UNSAFE_componentWillMount](https://react.dev/reference/react/Component#unsafe_componentwillmount). [See alternatives.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#migrating-from-legacy-lifecycles)
These APIs are primarily used in older[link](https://react.dev/reference/react/Component)[class components](https://react.dev/reference/react/Component) so they rarely appear in modern apps.
