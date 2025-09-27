# **State: A Component's Memory**
Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called *state*.
### **You will learn**
- How to add a state variable with the [useState](https://react.dev/reference/react/useState) Hook
- What pair of values the useState Hook returns
- How to add more than one state variable
- Why state is called local
## **When a regular variable isn’t enough **
Here’s a component that renders a sculpture image. Clicking the “Next” button should show the next sculpture by changing the index to 1, then 2, and so on. However, this **won’t work** (you can try it!):
App.jsdata.js
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
import { sculptureList } from './data.js';
export default function Gallery() {
let index = 0;
function handleClick() {
index = index + 1;
}
let sculpture = sculptureList[index];
return (
<>
<button onClick={handleClick}>
Next
</button>
<h2>
<i>{sculpture.name} </i>
by {sculpture.artist}
</h2>
<h3>
({index + 1} of {sculptureList.length})
</h3>
<img
src={sculpture.url}
alt={sculpture.alt}
/>
<p>
{sculpture.description}
</p>
</>
);
}
Show more
The handleClick event handler is updating a local variable, index. But two things prevent that change from being visible:
1. **Local variables don’t persist between renders.** When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
1. **Changes to local variables won’t trigger renders.** React doesn’t realize it needs to render the component again with the new data.
To update a component with new data, two things need to happen:
1. **Retain** the data between renders.
1. **Trigger** React to render the component with new data (re-rendering).
The[link](https://react.dev/reference/react/useState)[useState](https://react.dev/reference/react/useState) Hook provides those two things:
1. A **state variable** to retain the data between renders.
1. A **state setter function** to update the variable and trigger React to render the component again.
## **Adding a state variable **
To add a state variable, import useState from React at the top of the file:
import { useState } from 'react';
Then, replace this line:
let index = 0;
with
const [index, setIndex] = useState(0);
index is a state variable and setIndex is the setter function.
The [ and ] syntax here is called[link](https://javascript.info/destructuring-assignment)[array destructuring](https://javascript.info/destructuring-assignment) and it lets you read values from an array. The array returned by useState always has exactly two items.
This is how they work together in handleClick:
function handleClick() {
setIndex(index + 1);
}
Now clicking the “Next” button switches the current sculpture:
App.jsdata.js
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
import { useState } from 'react';
import { sculptureList } from './data.js';
export default function Gallery() {
const [index, setIndex] = useState(0);
function handleClick() {
setIndex(index + 1);
}
let sculpture = sculptureList[index];
return (
<>
<button onClick={handleClick}>
Next
</button>
<h2>
<i>{sculpture.name} </i>
by {sculpture.artist}
</h2>
<h3>
({index + 1} of {sculptureList.length})
</h3>
<img
src={sculpture.url}
alt={sculpture.alt}
/>
<p>
{sculpture.description}
</p>
</>
);
}
Show more
### **Meet your first Hook **
In React, useState, as well as any other function starting with “use”, is called a Hook.
*Hooks* are special functions that are only available while React is[link](https://react.dev/learn/render-and-commit#step-1-trigger-a-render)[rendering](https://react.dev/learn/render-and-commit#step-1-trigger-a-render) (which we’ll get into in more detail on the next page). They let you “hook into” different React features.
State is just one of those features, but you will meet the other Hooks later.
### **Pitfall**
**Hooks—functions starting with ****use****—can only be called at the top level of your components or**[** **](https://react.dev/learn/reusing-logic-with-custom-hooks)[**your own Hooks.**](https://react.dev/learn/reusing-logic-with-custom-hooks) You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs. You “use” React features at the top of your component similar to how you “import” modules at the top of your file.
### **Anatomy of ****useState**** **
When you call[link](https://react.dev/reference/react/useState)[useState](https://react.dev/reference/react/useState), you are telling React that you want this component to remember something:
const [index, setIndex] = useState(0);
In this case, you want React to remember index.
### **Note**
The convention is to name this pair like const [something, setSomething]. You could name it anything you like, but conventions make things easier to understand across projects.
The only argument to useState is the **initial value** of your state variable. In this example, the index’s initial value is set to 0 with useState(0).
Every time your component renders, useState gives you an array containing two values:
1. The **state variable** (index) with the value you stored.
1. The **state setter function** (setIndex) which can update the state variable and trigger React to render the component again.
Here’s how that happens in action:
const [index, setIndex] = useState(0);
1. **Your component renders the first time.** Because you passed 0 to useState as the initial value for index, it will return [0, setIndex]. React remembers 0 is the latest state value.
1. **You update the state.** When a user clicks the button, it calls setIndex(index + 1). index is 0, so it’s setIndex(1). This tells React to remember index is 1 now and triggers another render.
1. **Your component’s second render.** React still sees useState(0), but because React *remembers* that you set index to 1, it returns [1, setIndex] instead.
1. And so on!
## **Giving a component multiple state variables **
You can have as many state variables of as many types as you like in one component. This component has two state variables, a number index and a boolean showMore that’s toggled when you click “Show details”:
App.jsdata.js
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
import { sculptureList } from './data.js';
export default function Gallery() {
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
function handleNextClick() {
setIndex(index + 1);
}
function handleMoreClick() {
setShowMore(!showMore);
}
let sculpture = sculptureList[index];
return (
<>
<button onClick={handleNextClick}>
Next
</button>
<h2>
<i>{sculpture.name} </i>
by {sculpture.artist}
</h2>
<h3>
({index + 1} of {sculptureList.length})
</h3>
<button onClick={handleMoreClick}>
{showMore ? 'Hide' : 'Show'} details
</button>
{showMore && <p>{sculpture.description}</p>}
<img
src={sculpture.url}
alt={sculpture.alt}
/>
Show more
It is a good idea to have multiple state variables if their state is unrelated, like index and showMore in this example. But if you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with many fields, it’s more convenient to have a single state variable that holds an object than state variable per field. Read[link](https://react.dev/learn/choosing-the-state-structure)[Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure) for more tips.
##### **Deep Dive**
#### **How does React know which state to return? **
**Show Details**
## **State is isolated and private **
State is local to a component instance on the screen. In other words, **if you render the same component twice, each copy will have completely isolated state!** Changing one of them will not affect the other.
In this example, the Gallery component from earlier is rendered twice with no changes to its logic. Try clicking the buttons inside each of the galleries. Notice that their state is independent:
App.jsGallery.jsdata.js
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
import Gallery from './Gallery.js';
export default function Page() {
return (
<div className="Page">
<Gallery />
<Gallery />
</div>
);
}
This is what makes state different from regular variables that you might declare at the top of your module. State is not tied to a particular function call or a place in the code, but it’s “local” to the specific place on the screen. You rendered two <Gallery /> components, so their state is stored separately.
Also notice how the Page component doesn’t “know” anything about the Gallery state or even whether it has any. Unlike props, **state is fully private to the component declaring it.** The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.
What if you wanted both galleries to keep their states in sync? The right way to do it in React is to *remove* state from child components and add it to their closest shared parent. The next few pages will focus on organizing state of a single component, but we will return to this topic in[link](https://react.dev/learn/sharing-state-between-components)[Sharing State Between Components.](https://react.dev/learn/sharing-state-between-components)
