# **Reusing Logic with Custom Hooks**
React comes with several built-in Hooks like useState, useContext, and useEffect. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. You might not find these Hooks in React, but you can create your own Hooks for your application’s needs.
### **You will learn**
- What custom Hooks are, and how to write your own
- How to reuse logic between components
- How to name and structure your custom Hooks
- When and why to extract custom Hooks
## **Custom Hooks: Sharing logic between components **
Imagine you’re developing an app that heavily relies on the network (as most apps do). You want to warn the user if their network connection has accidentally gone off while they were using your app. How would you go about it? It seems like you’ll need two things in your component:
1. A piece of state that tracks whether the network is online.
1. An Effect that subscribes to the global [online](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) and [offline](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) events, and updates that state.
This will keep your component[link](https://react.dev/learn/synchronizing-with-effects)[synchronized](https://react.dev/learn/synchronizing-with-effects) with the network status. You might start with something like this:
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
import { useState, useEffect } from 'react';
export default function StatusBar() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
function handleOnline() {
setIsOnline(true);
}
function handleOffline() {
setIsOnline(false);
}
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
return () => {
window.removeEventListener('online', handleOnline);
window.removeEventListener('offline', handleOffline);
};
}, []);
return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
Show more
Try turning your network on and off, and notice how this StatusBar updates in response to your actions.
Now imagine you *also* want to use the same logic in a different component. You want to implement a Save button that will become disabled and show “Reconnecting…” instead of “Save” while the network is off.
To start, you can copy and paste the isOnline state and the Effect into SaveButton:
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
import { useState, useEffect } from 'react';
export default function SaveButton() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
function handleOnline() {
setIsOnline(true);
}
function handleOffline() {
setIsOnline(false);
}
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
return () => {
window.removeEventListener('online', handleOnline);
window.removeEventListener('offline', handleOffline);
};
}, []);
function handleSaveClick() {
console.log('✅ Progress saved');
}
return (
<button disabled={!isOnline} onClick={handleSaveClick}>
{isOnline ? 'Save progress' : 'Reconnecting...'}
</button>
);
}
Show more
Verify that, if you turn off the network, the button will change its appearance.
These two components work fine, but the duplication in logic between them is unfortunate. It seems like even though they have different *visual appearance,* you want to reuse the logic between them.
### **Extracting your own custom Hook from a component **
Imagine for a moment that, similar to[link](https://react.dev/reference/react/useState)[useState](https://react.dev/reference/react/useState) and[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect), there was a built-in useOnlineStatus Hook. Then both of these components could be simplified and you could remove the duplication between them:
function StatusBar() {
const isOnline = useOnlineStatus();
return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
function SaveButton() {
const isOnline = useOnlineStatus();
function handleSaveClick() {
console.log('✅ Progress saved');
}
return (
<button disabled={!isOnline} onClick={handleSaveClick}>
{isOnline ? 'Save progress' : 'Reconnecting...'}
</button>
);
}
Although there is no such built-in Hook, you can write it yourself. Declare a function called useOnlineStatus and move all the duplicated code into it from the components you wrote earlier:
function useOnlineStatus() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
function handleOnline() {
setIsOnline(true);
}
function handleOffline() {
setIsOnline(false);
}
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
return () => {
window.removeEventListener('online', handleOnline);
window.removeEventListener('offline', handleOffline);
};
}, []);
return isOnline;
}
At the end of the function, return isOnline. This lets your components read that value:
App.jsuseOnlineStatus.js
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
import { useOnlineStatus } from './useOnlineStatus.js';
function StatusBar() {
const isOnline = useOnlineStatus();
return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
function SaveButton() {
const isOnline = useOnlineStatus();
function handleSaveClick() {
console.log('✅ Progress saved');
}
return (
<button disabled={!isOnline} onClick={handleSaveClick}>
{isOnline ? 'Save progress' : 'Reconnecting...'}
</button>
);
}
export default function App() {
return (
<>
<SaveButton />
<StatusBar />
</>
);
}
Show more
Verify that switching the network on and off updates both components.
Now your components don’t have as much repetitive logic. **More importantly, the code inside them describes *****what they want to do***** (use the online status!) rather than *****how to do it***** (by subscribing to the browser events).**
When you extract logic into custom Hooks, you can hide the gnarly details of how you deal with some external system or a browser API. The code of your components expresses your intent, not the implementation.
### **Hook names always start with ****use**** **
React applications are built from components. Components are built from Hooks, whether built-in or custom. You’ll likely often use custom Hooks created by others, but occasionally you might write one yourself!
You must follow these naming conventions:
1. **React component names must start with a capital letter,** like StatusBar and SaveButton. React components also need to return something that React knows how to display, like a piece of JSX.
1. **Hook names must start with ****use**** followed by a capital letter,** like [useState](https://react.dev/reference/react/useState) (built-in) or useOnlineStatus (custom, like earlier on the page). Hooks may return arbitrary values.
This convention guarantees that you can always look at a component and know where its state, Effects, and other React features might “hide”. For example, if you see a getColor() function call inside your component, you can be sure that it can’t possibly contain React state inside because its name doesn’t start with use. However, a function call like useOnlineStatus() will most likely contain calls to other Hooks inside!
### **Note**
If your linter is[link](https://react.dev/learn/editor-setup#linting)[configured for React,](https://react.dev/learn/editor-setup#linting) it will enforce this naming convention. Scroll up to the sandbox above and rename useOnlineStatus to getOnlineStatus. Notice that the linter won’t allow you to call useState or useEffect inside of it anymore. Only Hooks and components can call other Hooks!
##### **Deep Dive**
#### **Should all functions called during rendering start with the use prefix? **
**Show Details**
### **Custom Hooks let you share stateful logic, not state itself **
In the earlier example, when you turned the network on and off, both components updated together. However, it’s wrong to think that a single isOnline state variable is shared between them. Look at this code:
function StatusBar() {
const isOnline = useOnlineStatus();
// ...
}
function SaveButton() {
const isOnline = useOnlineStatus();
// ...
}
It works the same way as before you extracted the duplication:
function StatusBar() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
// ...
}, []);
// ...
}
function SaveButton() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
// ...
}, []);
// ...
}
These are two completely independent state variables and Effects! They happened to have the same value at the same time because you synchronized them with the same external value (whether the network is on).
To better illustrate this, we’ll need a different example. Consider this Form component:
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
import { useState } from 'react';
export default function Form() {
const [firstName, setFirstName] = useState('Mary');
const [lastName, setLastName] = useState('Poppins');
function handleFirstNameChange(e) {
setFirstName(e.target.value);
}
function handleLastNameChange(e) {
setLastName(e.target.value);
}
return (
<>
<label>
First name:
<input value={firstName} onChange={handleFirstNameChange} />
</label>
<label>
Last name:
<input value={lastName} onChange={handleLastNameChange} />
</label>
<p><b>Good morning, {firstName} {lastName}.</b></p>
</>
);
}
Show more
There’s some repetitive logic for each form field:
1. There’s a piece of state (firstName and lastName).
1. There’s a change handler (handleFirstNameChange and handleLastNameChange).
1. There’s a piece of JSX that specifies the value and onChange attributes for that input.
You can extract the repetitive logic into this useFormInput custom Hook:
App.jsuseFormInput.js
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
import { useState } from 'react';
export function useFormInput(initialValue) {
const [value, setValue] = useState(initialValue);
function handleChange(e) {
setValue(e.target.value);
}
const inputProps = {
value: value,
onChange: handleChange
};
return inputProps;
}
Show more
Notice that it only declares *one* state variable called value.
However, the Form component calls useFormInput *two times:*
function Form() {
const firstNameProps = useFormInput('Mary');
const lastNameProps = useFormInput('Poppins');
// ...
This is why it works like declaring two separate state variables!
**Custom Hooks let you share *****stateful logic***** but not *****state itself.***** Each call to a Hook is completely independent from every other call to the same Hook.** This is why the two sandboxes above are completely equivalent. If you’d like, scroll back up and compare them. The behavior before and after extracting a custom Hook is identical.
When you need to share the state itself between multiple components,[link](https://react.dev/learn/sharing-state-between-components)[lift it up and pass it down](https://react.dev/learn/sharing-state-between-components) instead.
## **Passing reactive values between Hooks **
The code inside your custom Hooks will re-run during every re-render of your component. This is why, like components, custom Hooks[link](https://react.dev/learn/keeping-components-pure)[need to be pure.](https://react.dev/learn/keeping-components-pure) Think of custom Hooks’ code as part of your component’s body!
Because custom Hooks re-render together with your component, they always receive the latest props and state. To see what this means, consider this chat room example. Change the server URL or the chat room:
App.jsChatRoom.jschat.jsnotifications.js
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
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useEffect(() => {
const options = {
serverUrl: serverUrl,
roomId: roomId
};
const connection = createConnection(options);
connection.on('message', (msg) => {
showNotification('New message: ' + msg);
});
connection.connect();
return () => connection.disconnect();
}, [roomId, serverUrl]);
return (
<>
<label>
Server URL:
<input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
</label>
<h1>Welcome to the {roomId} room!</h1>
</>
);
}
Show more
When you change serverUrl or roomId, the Effect[link](https://react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values)[“reacts” to your changes](https://react.dev/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) and re-synchronizes. You can tell by the console messages that the chat re-connects every time that you change your Effect’s dependencies.
Now move the Effect’s code into a custom Hook:
export function useChatRoom({ serverUrl, roomId }) {
useEffect(() => {
const options = {
serverUrl: serverUrl,
roomId: roomId
};
const connection = createConnection(options);
connection.connect();
connection.on('message', (msg) => {
showNotification('New message: ' + msg);
});
return () => connection.disconnect();
}, [roomId, serverUrl]);
}
This lets your ChatRoom component call your custom Hook without worrying about how it works inside:
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl
});
return (
<>
<label>
Server URL:
<input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
</label>
<h1>Welcome to the {roomId} room!</h1>
</>
);
}
This looks much simpler! (But it does the same thing.)
Notice that the logic *still responds* to prop and state changes. Try editing the server URL or the selected room:
ChatRoom.js
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
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl
});
return (
<>
<label>
Server URL:
<input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
</label>
<h1>Welcome to the {roomId} room!</h1>
</>
);
}
Show more
Notice how you’re taking the return value of one Hook:
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl
});
// ...
and passing it as an input to another Hook:
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl
});
// ...
Every time your ChatRoom component re-renders, it passes the latest roomId and serverUrl to your Hook. This is why your Effect re-connects to the chat whenever their values are different after a re-render. (If you ever worked with audio or video processing software, chaining Hooks like this might remind you of chaining visual or audio effects. It’s as if the output of useState “feeds into” the input of the useChatRoom.)
### **Passing event handlers to custom Hooks **
### **Under Construction**
This section describes an **experimental API that has not yet been released** in a stable version of React.
As you start using useChatRoom in more components, you might want to let components customize its behavior. For example, currently, the logic for what to do when a message arrives is hardcoded inside the Hook:
export function useChatRoom({ serverUrl, roomId }) {
useEffect(() => {
const options = {
serverUrl: serverUrl,
roomId: roomId
};
const connection = createConnection(options);
connection.connect();
connection.on('message', (msg) => {
showNotification('New message: ' + msg);
});
return () => connection.disconnect();
}, [roomId, serverUrl]);
}
Let’s say you want to move this logic back to your component:
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl,
onReceiveMessage(msg) {
showNotification('New message: ' + msg);
}
});
// ...
To make this work, change your custom Hook to take onReceiveMessage as one of its named options:
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
useEffect(() => {
const options = {
serverUrl: serverUrl,
roomId: roomId
};
const connection = createConnection(options);
connection.connect();
connection.on('message', (msg) => {
onReceiveMessage(msg);
});
return () => connection.disconnect();
}, [roomId, serverUrl, onReceiveMessage]); // ✅ All dependencies declared
}
This will work, but there’s one more improvement you can do when your custom Hook accepts event handlers.
Adding a dependency on onReceiveMessage is not ideal because it will cause the chat to re-connect every time the component re-renders.[link](https://react.dev/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props)[Wrap this event handler into an Effect Event to remove it from the dependencies:](https://react.dev/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props)
import { useEffect, useEffectEvent } from 'react';
// ...
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
const onMessage = useEffectEvent(onReceiveMessage);
useEffect(() => {
const options = {
serverUrl: serverUrl,
roomId: roomId
};
const connection = createConnection(options);
connection.connect();
connection.on('message', (msg) => {
onMessage(msg);
});
return () => connection.disconnect();
}, [roomId, serverUrl]); // ✅ All dependencies declared
}
Now the chat won’t re-connect every time that the ChatRoom component re-renders. Here is a fully working demo of passing an event handler to a custom Hook that you can play with:
ChatRoom.js
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
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';
import { showNotification } from './notifications.js';
export default function ChatRoom({ roomId }) {
const [serverUrl, setServerUrl] = useState('https://localhost:1234');
useChatRoom({
roomId: roomId,
serverUrl: serverUrl,
onReceiveMessage(msg) {
showNotification('New message: ' + msg);
}
});
return (
<>
<label>
Server URL:
<input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
</label>
<h1>Welcome to the {roomId} room!</h1>
</>
);
}
Show more
Notice how you no longer need to know *how* useChatRoom works in order to use it. You could add it to any other component, pass any other options, and it would work the same way. That’s the power of custom Hooks.
## **When to use custom Hooks **
You don’t need to extract a custom Hook for every little duplicated bit of code. Some duplication is fine. For example, extracting a useFormInput Hook to wrap a single useState call like earlier is probably unnecessary.
However, whenever you write an Effect, consider whether it would be clearer to also wrap it in a custom Hook.[link](https://react.dev/learn/you-might-not-need-an-effect)[You shouldn’t need Effects very often,](https://react.dev/learn/you-might-not-need-an-effect) so if you’re writing one, it means that you need to “step outside React” to synchronize with some external system or to do something that React doesn’t have a built-in API for. Wrapping it into a custom Hook lets you precisely communicate your intent and how the data flows through it.
For example, consider a ShippingForm component that displays two dropdowns: one shows the list of cities, and another shows the list of areas in the selected city. You might start with some code that looks like this:
function ShippingForm({ country }) {
const [cities, setCities] = useState(null);
// This Effect fetches cities for a country
useEffect(() => {
let ignore = false;
fetch(`/api/cities?country=${country}`)
.then(response => response.json())
.then(json => {
if (!ignore) {
setCities(json);
}
});
return () => {
ignore = true;
};
}, [country]);
const [city, setCity] = useState(null);
const [areas, setAreas] = useState(null);
// This Effect fetches areas for the selected city
useEffect(() => {
if (city) {
let ignore = false;
fetch(`/api/areas?city=${city}`)
.then(response => response.json())
.then(json => {
if (!ignore) {
setAreas(json);
}
});
return () => {
ignore = true;
};
}
}, [city]);
// ...
Although this code is quite repetitive,[link](https://react.dev/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things)[it’s correct to keep these Effects separate from each other.](https://react.dev/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things) They synchronize two different things, so you shouldn’t merge them into one Effect. Instead, you can simplify the ShippingForm component above by extracting the common logic between them into your own useData Hook:
function useData(url) {
const [data, setData] = useState(null);
useEffect(() => {
if (url) {
let ignore = false;
fetch(url)
.then(response => response.json())
.then(json => {
if (!ignore) {
setData(json);
}
});
return () => {
ignore = true;
};
}
}, [url]);
return data;
}
Now you can replace both Effects in the ShippingForm components with calls to useData:
function ShippingForm({ country }) {
const cities = useData(`/api/cities?country=${country}`);
const [city, setCity] = useState(null);
const areas = useData(city ? `/api/areas?city=${city}` : null);
// ...
Extracting a custom Hook makes the data flow explicit. You feed the url in and you get the data out. By “hiding” your Effect inside useData, you also prevent someone working on the ShippingForm component from adding[link](https://react.dev/learn/removing-effect-dependencies)[unnecessary dependencies](https://react.dev/learn/removing-effect-dependencies) to it. With time, most of your app’s Effects will be in custom Hooks.
##### **Deep Dive**
#### **Keep your custom Hooks focused on concrete high-level use cases **
**Show Details**
### **Custom Hooks help you migrate to better patterns **
Effects are an[link](https://react.dev/learn/escape-hatches)[“escape hatch”](https://react.dev/learn/escape-hatches): you use them when you need to “step outside React” and when there is no better built-in solution for your use case. With time, the React team’s goal is to reduce the number of the Effects in your app to the minimum by providing more specific solutions to more specific problems. Wrapping your Effects in custom Hooks makes it easier to upgrade your code when these solutions become available.
Let’s return to this example:
App.jsuseOnlineStatus.js
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
import { useState, useEffect } from 'react';
export function useOnlineStatus() {
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
function handleOnline() {
setIsOnline(true);
}
function handleOffline() {
setIsOnline(false);
}
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
return () => {
window.removeEventListener('online', handleOnline);
window.removeEventListener('offline', handleOffline);
};
}, []);
return isOnline;
}
Show more
In the above example, useOnlineStatus is implemented with a pair of[link](https://react.dev/reference/react/useState)[useState](https://react.dev/reference/react/useState) and[link](https://react.dev/reference/react/useEffect)[useEffect](https://react.dev/reference/react/useEffect)[.](https://react.dev/reference/react/useEffect) However, this isn’t the best possible solution. There is a number of edge cases it doesn’t consider. For example, it assumes that when the component mounts, isOnline is already true, but this may be wrong if the network already went offline. You can use the browser[link](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)[navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) API to check for that, but using it directly would not work on the server for generating the initial HTML. In short, this code could be improved.
React includes a dedicated API called[link](https://react.dev/reference/react/useSyncExternalStore)[useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) which takes care of all of these problems for you. Here is your useOnlineStatus Hook, rewritten to take advantage of this new API:
App.jsuseOnlineStatus.js
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
import { useSyncExternalStore } from 'react';
function subscribe(callback) {
window.addEventListener('online', callback);
window.addEventListener('offline', callback);
return () => {
window.removeEventListener('online', callback);
window.removeEventListener('offline', callback);
};
}
export function useOnlineStatus() {
return useSyncExternalStore(
subscribe,
() => navigator.onLine, // How to get the value on the client
() => true // How to get the value on the server
);
}
Show more
Notice how **you didn’t need to change any of the components** to make this migration:
function StatusBar() {
const isOnline = useOnlineStatus();
// ...
}
function SaveButton() {
const isOnline = useOnlineStatus();
// ...
}
This is another reason for why wrapping Effects in custom Hooks is often beneficial:
1. You make the data flow to and from your Effects very explicit.
1. You let your components focus on the intent rather than on the exact implementation of your Effects.
1. When React adds new features, you can remove those Effects without changing any of your components.
Similar to a[link](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969)[design system,](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) you might find it helpful to start extracting common idioms from your app’s components into custom Hooks. This will keep your components’ code focused on the intent, and let you avoid writing raw Effects very often. Many excellent custom Hooks are maintained by the React community.
##### **Deep Dive**
#### **Will React provide any built-in solution for data fetching? **
**Show Details**
### **There is more than one way to do it **
Let’s say you want to implement a fade-in animation *from scratch* using the browser[link](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API. You might start with an Effect that sets up an animation loop. During each frame of the animation, you could change the opacity of the DOM node you[link](https://react.dev/learn/manipulating-the-dom-with-refs)[hold in a ref](https://react.dev/learn/manipulating-the-dom-with-refs) until it reaches 1. Your code might start like this:
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
import { useState, useEffect, useRef } from 'react';
function Welcome() {
const ref = useRef(null);
useEffect(() => {
const duration = 1000;
const node = ref.current;
let startTime = performance.now();
let frameId = null;
function onFrame(now) {
const timePassed = now - startTime;
const progress = Math.min(timePassed / duration, 1);
onProgress(progress);
if (progress < 1) {
// We still have more frames to paint
frameId = requestAnimationFrame(onFrame);
}
}
function onProgress(progress) {
node.style.opacity = progress;
}
function start() {
onProgress(0);
startTime = performance.now();
frameId = requestAnimationFrame(onFrame);
}
function stop() {
cancelAnimationFrame(frameId);
startTime = null;
frameId = null;
Show more
To make the component more readable, you might extract the logic into a useFadeIn custom Hook:
App.jsuseFadeIn.js
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
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';
function Welcome() {
const ref = useRef(null);
useFadeIn(ref, 1000);
return (
<h1 className="welcome" ref={ref}>
Welcome
</h1>
);
}
export default function App() {
const [show, setShow] = useState(false);
return (
<>
<button onClick={() => setShow(!show)}>
{show ? 'Remove' : 'Show'}
</button>
<hr />
{show && <Welcome />}
</>
);
}
Show more
You could keep the useFadeIn code as is, but you could also refactor it more. For example, you could extract the logic for setting up the animation loop out of useFadeIn into a custom useAnimationLoop Hook:
App.jsuseFadeIn.js
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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
export function useFadeIn(ref, duration) {
const [isRunning, setIsRunning] = useState(true);
useAnimationLoop(isRunning, (timePassed) => {
const progress = Math.min(timePassed / duration, 1);
ref.current.style.opacity = progress;
if (progress === 1) {
setIsRunning(false);
}
});
}
function useAnimationLoop(isRunning, drawFrame) {
const onFrame = useEffectEvent(drawFrame);
useEffect(() => {
if (!isRunning) {
return;
}
const startTime = performance.now();
let frameId = null;
function tick(now) {
const timePassed = now - startTime;
onFrame(timePassed);
frameId = requestAnimationFrame(tick);
}
tick();
return () => cancelAnimationFrame(frameId);
}, [isRunning]);
}
Show more
However, you didn’t *have to* do that. As with regular functions, ultimately you decide where to draw the boundaries between different parts of your code. You could also take a very different approach. Instead of keeping the logic in the Effect, you could move most of the imperative logic inside a JavaScript[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)[class:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
App.jsuseFadeIn.jsanimation.js
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
import { useState, useEffect } from 'react';
import { FadeInAnimation } from './animation.js';
export function useFadeIn(ref, duration) {
useEffect(() => {
const animation = new FadeInAnimation(ref.current);
animation.start(duration);
return () => {
animation.stop();
};
}, [ref, duration]);
}
Effects let you connect React to external systems. The more coordination between Effects is needed (for example, to chain multiple animations), the more it makes sense to extract that logic out of Effects and Hooks *completely* like in the sandbox above. Then, the code you extracted *becomes* the “external system”. This lets your Effects stay simple because they only need to send messages to the system you’ve moved outside React.
The examples above assume that the fade-in logic needs to be written in JavaScript. However, this particular fade-in animation is both simpler and much more efficient to implement with a plain[link](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)[CSS Animation:](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
App.jswelcome.css
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
.welcome {
color: white;
padding: 50px;
text-align: center;
font-size: 50px;
background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
animation: fadeIn 1000ms;
}
@keyframes fadeIn {
0% { opacity: 0; }
100% { opacity: 1; }
}
Sometimes, you don’t even need a Hook!
