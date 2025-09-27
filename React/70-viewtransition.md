# **<ViewTransition>**
### **Experimental Feature**
**This API is experimental and is not available in a stable version of React yet.**
You can try it by upgrading React packages to the most recent experimental version:
- react@experimental
- react-dom@experimental
- eslint-plugin-react-hooks@experimental
Experimental versions of React may contain bugs. Don’t use them in production.
<ViewTransition> lets you animate elements that update inside a Transition.
import {unstable_ViewTransition as ViewTransition} from 'react';
<ViewTransition>
<div>...</div>
</ViewTransition>
- [Reference](https://react.dev/reference/react/ViewTransition#reference)
  - [<ViewTransition>](https://react.dev/reference/react/ViewTransition#viewtransition)
  - [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class)
  - [Styling View Transitions](https://react.dev/reference/react/ViewTransition#styling-view-transitions)
- [Usage](https://react.dev/reference/react/ViewTransition#usage)
  - [Animating an element on enter/exit](https://react.dev/reference/react/ViewTransition#animating-an-element-on-enter)
  - [Animating a shared element](https://react.dev/reference/react/ViewTransition#animating-a-shared-element)
  - [Animating reorder of items in a list](https://react.dev/reference/react/ViewTransition#animating-reorder-of-items-in-a-list)
  - [Animating from Suspense content](https://react.dev/reference/react/ViewTransition#animating-from-suspense-content)
  - [Opting-out of an animation](https://react.dev/reference/react/ViewTransition#opting-out-of-an-animation)
  - [Customizing animations](https://react.dev/reference/react/ViewTransition#customizing-animations)
  - [Customizing animations with types](https://react.dev/reference/react/ViewTransition#customizing-animations-with-types)
  - [Building View Transition enabled routers](https://react.dev/reference/react/ViewTransition#building-view-transition-enabled-routers)
- [Troubleshooting](https://react.dev/reference/react/ViewTransition#troubleshooting)
  - [My](https://react.dev/reference/react/ViewTransition#my-viewtransition-is-not-activating)[<ViewTransition>](https://react.dev/reference/react/ViewTransition#my-viewtransition-is-not-activating)[is not activating](https://react.dev/reference/react/ViewTransition#my-viewtransition-is-not-activating)
  - [I’m getting an error “There are two](https://react.dev/reference/react/ViewTransition#two-viewtransition-with-same-name)[<ViewTransition name=%s>](https://react.dev/reference/react/ViewTransition#two-viewtransition-with-same-name)[components with the same name mounted at the same time.”](https://react.dev/reference/react/ViewTransition#two-viewtransition-with-same-name)
## **Reference **
### **<ViewTransition>**** **
Wrap elements in <ViewTransition> to animate them when they update inside a[link](https://react.dev/reference/react/useTransition)[Transition](https://react.dev/reference/react/useTransition). React uses the following heuristics to determine if a View Transition activates for an animation:
- enter: If a ViewTransition itself gets inserted in this Transition, then this will activate.
- exit: If a ViewTransition itself gets deleted in this Transition, then this will activate.
- update: If a ViewTransition has any DOM mutations inside it that React is doing (such as a prop changing) or if the ViewTransition boundary itself changes size or position due to an immediate sibling. If there are nested ViewTransition then the mutation applies to them and not the parent.
- share: If a named ViewTransition is inside a deleted subtree and another named ViewTransition with the same name is part of an inserted subtree in the same Transition, they form a Shared Element Transition, and it animates from the deleted one to the inserted one.
By default, <ViewTransition> animates with a smooth cross-fade (the browser default view transition). You can customize the animation by providing a[link](https://react.dev/reference/react/ViewTransition#view-transition-class)[View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) to the <ViewTransition> component. You can  customize animations for each kind of trigger (see[link](https://react.dev/reference/react/ViewTransition#styling-view-transitions)[Styling View Transitions](https://react.dev/reference/react/ViewTransition#styling-view-transitions)).
##### **Deep Dive**
#### **How does ****<ViewTransition>**** work? **
**Show Details**
#### **Props **
By default, <ViewTransition> animates with a smooth cross-fade. You can customize the animation, or specify a shared element transition, with these props:
- **optional** enter: A string or object. The [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) to apply when enter is activated.
- **optional** exit: A string or object. The [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) to apply when exit is activated.
- **optional** update: A string or object. The [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) to apply when an update is activated.
- **optional** share: A string or object. The [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) to apply when a shared element is activated.
- **optional** default: A string or object. The [View Transition Class](https://react.dev/reference/react/ViewTransition#view-transition-class) used when no other matching activation prop is found.
- **optional** name: A string or object. The name of the View Transition used for shared element transitions. If not provided, React will use a unique name for each View Transition to prevent unexpected animations.
#### **Callback **
These callbacks allow you to adjust the animation imperatively using the[link](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)[animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) APIs:
- **optional** onEnter: A function. React calls onEnter after an “enter” animation.
- **optional** onExit: A function. React calls onExit after an “exit” animation.
- **optional** onShare: A function. React calls onShare after a “share” animation.
- **optional** onUpdate: A function. React calls onUpdate after an “update” animation.
Each callback receives as arguments:
- element: The DOM element that was animated.
- types: The [Transition Types](https://react.dev/reference/react/addTransitionType) included in the animation.
### **View Transition Class **
The View Transition Class is the CSS class name(s) applied by React during the transition when the ViewTransition activates. It can be a string or an object.
- string: the class added on the child elements when activated. If 'none' is provided, no class will be added.
- object: the class added on the child elements will be the key matching View Transition type added with addTransitionType. The object can also specify a default to use if no matching type is found.
The value 'none' can be used to prevent a View Transition from activating for a specific trigger.
### **Styling View Transitions **
### **Note**
In many early examples of View Transitions around the web, you’ll have seen using a[link](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name)[view-transition-name](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name) and then style it using ::view-transition-...(my-name) selectors. We don’t recommend that for styling. Instead, we normally recommend using a View Transition Class instead.
To customize the animation for a <ViewTransition> you can provide a View Transition Class to one of the activation props. The View Transition Class is a CSS class name that React applies to the child elements when the ViewTransition activates.
For example, to customize an “enter” animation, provide a class name to the enter prop:
<ViewTransition enter="slide-in">
When the <ViewTransition> activates an “enter” animation, React will add the class name slide-in. Then you can refer to this class using[link](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#pseudo-elements)[view transition pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#pseudo-elements) to build reusable animations:
::view-transition-group(.slide-in) {
}
::view-transition-old(.slide-in) {
}
::view-transition-new(.slide-in) {
}
In the future, CSS libraries may add built-in animations using View Transition Classes to make this easier to use.
#### **Caveats **
- By default, setState updates immediately and does not activate <ViewTransition>, only updates wrapped in a [Transition](https://react.dev/reference/react/useTransition). You can also use [<Suspense>](https://react.dev/reference/react/Suspense) to opt-in to a Transition to [reveal content](https://react.dev/reference/react/Suspense#revealing-content-together-at-once).
- <ViewTransition> creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece. However, it can also lose continuity in things that should be moving by themselves. So you might have to add more <ViewTransition> boundaries manually as a result.
- Many users may prefer not having animations on the page. React doesn’t automatically disable animations for this case. We recommend that using the @media (prefers-reduced-motion) media query to disable animations or tone them down based on user preference. In the future, CSS libraries may have this built-in to their presets.
- Currently, <ViewTransition> only works in the DOM. We’re working on adding support for React Native and other platforms.
## **Usage **
### **Animating an element on enter/exit **
Enter/Exit Transitions trigger when a <ViewTransition> is added or removed by a component in a transition:
function Child() {
return <ViewTransition>Hi</ViewTransition>
}
function Parent() {
const [show, setShow] = useState();
if (show) {
return <Child />;
}
return null;
}
When setShow is called, show switches to true and the Child component is rendered. When setShow is called inside startTransition, and Child renders a ViewTransition before any other DOM nodes, an enter animation is triggered.
When show switches back to false, an exit animation is triggered.
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
return (
<ViewTransition>
<Video video={videos[0]}/>
</ViewTransition>
);
}
export default function Component() {
const [showItem, setShowItem] = useState(false);
return (
<>
<button
onClick={() => {
startTransition(() => {
setShowItem((prev) => !prev);
});
}}
>{showItem ? '➖' : '➕'}</button>
{showItem ? <Item /> : null}
</>
);
}
Show more
### **Pitfall**
<ViewTransition> only activates if it is placed before any DOM node. If Child instead looked like this, no animation would trigger:
function Component() {
return (
<div>
<ViewTransition>Hi</ViewTransition>
</div>
);
}
### **Animating a shared element **
Normally, we don’t recommend assigning a name to a <ViewTransition> and instead let React assign it an automatic name. The reason you might want to assign a name is to animate between completely different components when one tree unmounts and another tree mounts at the same time. To preserve continuity.
<ViewTransition name={UNIQUE_NAME}>
<Child />
</ViewTransition>
When one tree unmounts and another mounts, if there’s a pair where the same name exists in the unmounting tree and the mounting tree, they trigger the “share” animation on both. It animates from the unmounting side to the mounting side.
Unlike an exit/enter animation this can be deeply inside the deleted/mounted tree. If a <ViewTransition> would also be eligible for exit/enter, then the “share” animation takes precedence.
If Transition first unmounts one side and then leads to a <Suspense> fallback being shown before eventually the new name being mounted, then no shared element transition happens.
App.jsVideo.js
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from "react";
import {Video, Thumbnail, FullscreenVideo} from "./Video";
import videos from "./data";
export default function Component() {
const [fullscreen, setFullscreen] = useState(false);
if (fullscreen) {
return <FullscreenVideo
video={videos[0]}
onExit={() => startTransition(() => setFullscreen(false))}
/>
}
return <Video
video={videos[0]}
onClick={() => startTransition(() => setFullscreen(true))}
/>
}
Show more
### **Note**
If either the mounted or unmounted side of a pair is outside the viewport, then no pair is formed. This ensures that it doesn’t fly in or out of the viewport when something is scrolled. Instead it’s treated as a regular enter/exit by itself.
This does not happen if the same Component instance changes position, which triggers an “update”. Those animate regardless if one position is outside the viewport.
There’s currently a quirk where if a deeply nested unmounted <ViewTransition> is inside the viewport but the mounted side is not within the viewport, then the unmounted side animates as its own “exit” animation even if it’s deeply nested instead of as part of the parent animation.
### **Pitfall**
It’s important that there’s only one thing with the same name mounted at a time in the entire app. Therefore it’s important to use unique namespaces for the name to avoid conflicts. To ensure you can do this you might want to add a constant in a separate module that you import.
export const MY_NAME = "my-globally-unique-name";
import {MY_NAME} from './shared-name';
...
<ViewTransition name={MY_NAME}>
### **Animating reorder of items in a list **
items.map(item => <Component key={item.id} item={item} />)
When reordering a list, without updating the content, the “update” animation triggers on each <ViewTransition> in the list if they’re outside a DOM node. Similar to enter/exit animations.
This means that this will trigger the animation on this <ViewTransition>:
function Component() {
return <ViewTransition><div>...</div></ViewTransition>;
}
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";
export default function Component() {
const [orderedVideos, setOrderedVideos] = useState(videos);
const reorder = () => {
startTransition(() => {
setOrderedVideos((prev) => {
return [...prev.sort(() => Math.random() - 0.5)];
});
});
};
return (
<>
<button onClick={reorder}>🎲</button>
<div className="listContainer">
{orderedVideos.map((video, i) => {
return (
<ViewTransition key={video.title}>
<Video video={video} />
</ViewTransition>
);
})}
</div>
</>
);
}
Show more
However, this wouldn’t animate each individual item:
function Component() {
return <div><ViewTransition>...</ViewTransition></div>;
}
Instead, any parent <ViewTransition> would cross-fade. If there is no parent <ViewTransition> then there’s no animation in that case.
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";
export default function Component() {
const [orderedVideos, setOrderedVideos] = useState(videos);
const reorder = () => {
startTransition(() => {
setOrderedVideos((prev) => {
return [...prev.sort(() => Math.random() - 0.5)];
});
});
};
return (
<>
<button onClick={reorder}>🎲</button>
<ViewTransition>
<div className="listContainer">
{orderedVideos.map((video, i) => {
return <Video video={video} key={video.title} />;
})}
</div>
</ViewTransition>
</>
);
}
Show more
This means you might want to avoid wrapper elements in lists where you want to allow the Component to control its own reorder animation:
items.map(item => <div><Component key={item.id} item={item} /></div>)
The above rule also applies if one of the items updates to resize, which then causes the siblings to resize, it’ll also animate its sibling <ViewTransition> but only if they’re immediate siblings.
This means that during an update, which causes a lot of re-layout, it doesn’t individually animate every <ViewTransition> on the page. That would lead to a lot of noisy animations which distracts from the actual change. Therefore React is more conservative about when an individual animation triggers.
### **Pitfall**
It’s important to properly use keys to preserve identity when reordering lists. It might seem like you could use “name”, shared element transitions, to animate reorders but that would not trigger if one side was outside the viewport. To animate a reorder you often want to show that it went to a position outside the viewport.
### **Animating from Suspense content **
Just like any Transition, React waits for data and new CSS (<link rel="stylesheet" precedence="...">) before running the animation. In addition to this, ViewTransitions also wait up to 500ms for new fonts to load before starting the animation to avoid them flickering in later. For the same reason, an image wrapped in ViewTransition will wait for the image to load.
If it’s inside a new Suspense boundary instance, then the fallback is shown first. After the Suspense boundary fully loads, it triggers the <ViewTransition> to animate the reveal to the content.
Currently, this only happens for client-side Transition. In the future, this will also animate Suspense boundary for streaming SSR when content from the server suspends during the initial load.
There are two ways to animate Suspense boundaries depending on where you place the <ViewTransition>:
Update:
<ViewTransition>
<Suspense fallback={<A />}>
<B />
</Suspense>
</ViewTransition>
In this scenario when the content goes from A to B, it’ll be treated as an “update” and apply that class if appropriate. Both A and B will get the same view-transition-name and therefore they’re acting as a cross-fade by default.
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition,
Suspense
} from 'react';
import {Video, VideoPlaceholder} from "./Video";
import {useLazyVideoData} from "./data"
function LazyVideo() {
const video = useLazyVideoData();
return (
<Video video={video}/>
);
}
export default function Component() {
const [showItem, setShowItem] = useState(false);
return (
<>
<button
onClick={() => {
startTransition(() => {
setShowItem((prev) => !prev);
});
}}
>{showItem ? '➖' : '➕'}</button>
{showItem ? (
<ViewTransition>
<Suspense fallback={<VideoPlaceholder />}>
<LazyVideo />
</Suspense>
</ViewTransition>
) : null}
</>
);
Show more
Enter/Exit:
<Suspense fallback={<ViewTransition><A /></ViewTransition>}>
<ViewTransition><B /></ViewTransition>
</Suspense>
In this scenario, these are two separate ViewTransition instances each with their own view-transition-name. This will be treated as an “exit” of the <A> and an “enter” of the <B>.
You can achieve different effects depending on where you choose to place the <ViewTransition> boundary.
### **Opting-out of an animation **
Sometimes you’re wrapping a large existing component, like a whole page, and you want to animate some updates, such as changing the theme. However, you don’t want it to opt-in all updates inside the whole page to cross-fade when they’re updating. Especially if you’re incrementally adding more animations.
You can use the class “none” to opt-out of an animation. By wrapping your children in a “none” you can disable animations for updates to them while the parent still triggers.
<ViewTransition>
<div className={theme}>
<ViewTransition update="none">
{children}
</ViewTransition>
</div>
</ViewTransition>
This will only animate if the theme changes and not if only the children update. The children can still opt-in again with their own <ViewTransition> but at least it’s manual again.
### **Customizing animations **
By default, <ViewTransition> includes the default cross-fade from the browser.
To customize animations, you can provide props to the <ViewTransition> component to specify which animations to use, based on how the <ViewTransition> activates.
For example, we can slow down the default cross fade animation:
<ViewTransition default="slow-fade">
<Video />
</ViewTransition>
And define slow-fade in CSS using view transition classes:
::view-transition-old(.slow-fade) {
animation-duration: 500ms;
}
::view-transition-new(.slow-fade) {
animation-duration: 500ms;
}
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
return (
<ViewTransition default="slow-fade">
<Video video={videos[0]}/>
</ViewTransition>
);
}
export default function Component() {
const [showItem, setShowItem] = useState(false);
return (
<>
<button
onClick={() => {
startTransition(() => {
setShowItem((prev) => !prev);
});
}}
>{showItem ? '➖' : '➕'}</button>
{showItem ? <Item /> : null}
</>
);
}
Show more
In addition to setting the default, you can also provide configurations for enter, exit, update, and share animations.
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
import {
unstable_ViewTransition as ViewTransition,
useState,
startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"
function Item() {
return (
<ViewTransition enter="slide-in" exit="slide-out">
<Video video={videos[0]}/>
</ViewTransition>
);
}
export default function Component() {
const [showItem, setShowItem] = useState(false);
return (
<>
<button
onClick={() => {
startTransition(() => {
setShowItem((prev) => !prev);
});
}}
>{showItem ? '➖' : '➕'}</button>
{showItem ? <Item /> : null}
</>
);
}
Show more
### **Customizing animations with types **
You can use the[link](https://react.dev/reference/react/addTransitionType)[addTransitionType](https://react.dev/reference/react/addTransitionType) API to add a class name to the child elements when a specific transition type is activated for a specific activation trigger. This allows you to customize the animation for each type of transition.
For example, to customize the animation for all forward and backward navigations:
<ViewTransition default={{
'navigation-back': 'slide-right',
'navigation-forward': 'slide-left',
}}>
<div>...</div>
</ViewTransition>
// in your router:
startTransition(() => {
addTransitionType('navigation-' + navigationType);
});
When the ViewTransition activates a “navigation-back” animation, React will add the class name “slide-right”. When the ViewTransition activates a “navigation-forward” animation, React will add the class name “slide-left”.
In the future, routers and other libraries may add support for standard view-transition types and styles.
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
import {
unstable_ViewTransition as ViewTransition,
unstable_addTransitionType as addTransitionType,
useState,
startTransition,
} from "react";
import {Video} from "./Video";
import videos from "./data"
function Item() {
return (
<ViewTransition enter={
{
"add-video-back": "slide-in-back",
"add-video-forward": "slide-in-forward"
}
}
exit={
{
"remove-video-back": "slide-in-forward",
"remove-video-forward": "slide-in-back"
}
}>
<Video video={videos[0]}/>
</ViewTransition>
);
}
export default function Component() {
const [showItem, setShowItem] = useState(false);
return (
<>
<div className="button-container">
<button
onClick={() => {
startTransition(() => {
Show more
### **Building View Transition enabled routers **
React waits for any pending Navigation to finish to ensure that scroll restoration happens within the animation. If the Navigation is blocked on React, your router must unblock in useLayoutEffect since useEffect would lead to a deadlock.
If a startTransition is started from the legacy popstate event, such as during a “back”-navigation then it must finish synchronously to ensure scroll and form restoration works correctly. This is in conflict with running a View Transition animation. Therefore, React will skip animations from popstate. Therefore animations won’t run for the back button. You can fix this by upgrading your router to use the Navigation API.
## **Troubleshooting **
### **My ****<ViewTransition>**** is not activating **
<ViewTransition> only activates if it is placed is before any DOM node:
function Component() {
return (
<div>
<ViewTransition>Hi</ViewTransition>
</div>
);
}
To fix, ensure that the <ViewTransition> comes before any other DOM nodes:
function Component() {
return (
<ViewTransition>
<div>Hi</div>
</ViewTransition>
);
}
### **I’m getting an error “There are two ****<ViewTransition name=%s>**** components with the same name mounted at the same time.” **
This error occurs when two <ViewTransition> components with the same name are mounted at the same time:
function Item() {
// 🚩 All items will get the same "name".
return <ViewTransition name="item">...</ViewTransition>;
}
function ItemList({items}) {
return (
<>
{item.map(item => <Item key={item.id} />)}
</>
);
}
This will cause the View Transition to error. In development, React detects this issue to surface it and logs two errors:
Console
There are two <ViewTransition name=%s> components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name. at Item at ItemList
The existing <ViewTransition name=%s> duplicate has this stack trace. at Item at ItemList
To fix, ensure that there’s only one <ViewTransition> with the same name mounted at a time in the entire app by ensuring the name is unique, or adding an id to the name:
function Item({id}) {
// ✅ All items will get the same "name".
return <ViewTransition name={`item-${id}`}>...</ViewTransition>;
}
function ItemList({items}) {
return (
<>
{item.map(item => <Item key={item.id} item={item} />)}
</>
);
}
