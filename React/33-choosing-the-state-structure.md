# **Choosing the State Structure**
Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. Here are some tips you should consider when structuring state.
### **You will learn**
- When to use a single vs multiple state variables
- What to avoid when organizing state
- How to fix common issues with the state structure
## **Principles for structuring state **
When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:
1. **Group related state.** If you always update two or more state variables at the same time, consider merging them into a single state variable.
1. **Avoid contradictions in state.** When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
1. **Avoid redundant state.** If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
1. **Avoid duplication in state.** When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
1. **Avoid deeply nested state.** Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.
The goal behind these principles is to *make state easy to update without introducing mistakes*. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync. This is similar to how a database engineer might want to[link](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description)[“normalize” the database structure](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description) to reduce the chance of bugs. To paraphrase Albert Einstein, **“Make your state as simple as it can be—but no simpler.”**
Now let’s see how these principles apply in action.
## **Group related state **
You might sometimes be unsure between using a single or multiple state variables.
Should you do this?
const [x, setX] = useState(0);
const [y, setY] = useState(0);
Or this?
const [position, setPosition] = useState({ x: 0, y: 0 });
Technically, you can use either of these approaches. But **if some two state variables always change together, it might be a good idea to unify them into a single state variable.** Then you won’t forget to always keep them in sync, like in this example where moving the cursor updates both coordinates of the red dot:
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
import { useState } from 'react';
export default function MovingDot() {
const [position, setPosition] = useState({
x: 0,
y: 0
});
return (
<div
onPointerMove={e => {
setPosition({
x: e.clientX,
y: e.clientY
});
}}
style={{
position: 'relative',
width: '100vw',
height: '100vh',
}}>
<div style={{
position: 'absolute',
backgroundColor: 'red',
borderRadius: '50%',
transform: `translate(${position.x}px, ${position.y}px)`,
left: -10,
top: -10,
width: 20,
height: 20,
}} />
</div>
)
}
Show more
Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields.
### **Pitfall**
If your state variable is an object, remember that[link](https://react.dev/learn/updating-objects-in-state)[you can’t update only one field in it](https://react.dev/learn/updating-objects-in-state) without explicitly copying the other fields. For example, you can’t do setPosition({ x: 100 }) in the above example because it would not have the y property at all! Instead, if you wanted to set x alone, you would either do setPosition({ ...position, x: 100 }), or split them into two state variables and do setX(100).
## **Avoid contradictions in state **
Here is a hotel feedback form with isSending and isSent state variables:
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
import { useState } from 'react';
export default function FeedbackForm() {
const [text, setText] = useState('');
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);
async function handleSubmit(e) {
e.preventDefault();
setIsSending(true);
await sendMessage(text);
setIsSending(false);
setIsSent(true);
}
if (isSent) {
return <h1>Thanks for feedback!</h1>
}
return (
<form onSubmit={handleSubmit}>
<p>How was your stay at The Prancing Pony?</p>
<textarea
disabled={isSending}
value={text}
onChange={e => setText(e.target.value)}
/>
<br />
<button
disabled={isSending}
type="submit"
>
Send
</button>
{isSending && <p>Sending...</p>}
</form>
Show more
While this code works, it leaves the door open for “impossible” states. For example, if you forget to call setIsSent and setIsSending together, you may end up in a situation where both isSending and isSent are true at the same time. The more complex your component is, the harder it is to understand what happened.
**Since ****isSending**** and ****isSent**** should never be ****true**** at the same time, it is better to replace them with one ****status**** state variable that may take one of *****three***** valid states:** 'typing' (initial), 'sending', and 'sent':
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
import { useState } from 'react';
export default function FeedbackForm() {
const [text, setText] = useState('');
const [status, setStatus] = useState('typing');
async function handleSubmit(e) {
e.preventDefault();
setStatus('sending');
await sendMessage(text);
setStatus('sent');
}
const isSending = status === 'sending';
const isSent = status === 'sent';
if (isSent) {
return <h1>Thanks for feedback!</h1>
}
return (
<form onSubmit={handleSubmit}>
<p>How was your stay at The Prancing Pony?</p>
<textarea
disabled={isSending}
value={text}
onChange={e => setText(e.target.value)}
/>
<br />
<button
disabled={isSending}
type="submit"
>
Send
</button>
{isSending && <p>Sending...</p>}
Show more
You can still declare some constants for readability:
const isSending = status === 'sending';
const isSent = status === 'sent';
But they’re not state variables, so you don’t need to worry about them getting out of sync with each other.
## **Avoid redundant state **
If you can calculate some information from the component’s props or its existing state variables during rendering, you **should not** put that information into that component’s state.
For example, take this form. It works, but can you find any redundant state in it?
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
import { useState } from 'react';
export default function Form() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');
function handleFirstNameChange(e) {
setFirstName(e.target.value);
setFullName(e.target.value + ' ' + lastName);
}
function handleLastNameChange(e) {
setLastName(e.target.value);
setFullName(firstName + ' ' + e.target.value);
}
return (
<>
<h2>Let’s check you in</h2>
<label>
First name:{' '}
<input
value={firstName}
onChange={handleFirstNameChange}
/>
</label>
<label>
Last name:{' '}
<input
value={lastName}
onChange={handleLastNameChange}
/>
</label>
<p>
Your ticket will be issued to: <b>{fullName}</b>
Show more
This form has three state variables: firstName, lastName, and fullName. However, fullName is redundant. **You can always calculate ****fullName**** from ****firstName**** and ****lastName**** during render, so remove it from state.**
This is how you can do it:
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
import { useState } from 'react';
export default function Form() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName;
function handleFirstNameChange(e) {
setFirstName(e.target.value);
}
function handleLastNameChange(e) {
setLastName(e.target.value);
}
return (
<>
<h2>Let’s check you in</h2>
<label>
First name:{' '}
<input
value={firstName}
onChange={handleFirstNameChange}
/>
</label>
<label>
Last name:{' '}
<input
value={lastName}
onChange={handleLastNameChange}
/>
</label>
<p>
Your ticket will be issued to: <b>{fullName}</b>
</p>
Show more
Here, fullName is *not* a state variable. Instead, it’s calculated during render:
const fullName = firstName + ' ' + lastName;
As a result, the change handlers don’t need to do anything special to update it. When you call setFirstName or setLastName, you trigger a re-render, and then the next fullName will be calculated from the fresh data.
##### **Deep Dive**
#### **Don’t mirror props in state **
**Show Details**
## **Avoid duplication in state **
This menu list component lets you choose a single travel snack out of several:
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
import { useState } from 'react';
const initialItems = [
{ title: 'pretzels', id: 0 },
{ title: 'crispy seaweed', id: 1 },
{ title: 'granola bar', id: 2 },
];
export default function Menu() {
const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(
items[0]
);
return (
<>
<h2>What's your travel snack?</h2>
<ul>
{items.map(item => (
<li key={item.id}>
{item.title}
{' '}
<button onClick={() => {
setSelectedItem(item);
}}>Choose</button>
</li>
))}
</ul>
<p>You picked {selectedItem.title}.</p>
</>
);
}
Show more
Currently, it stores the selected item as an object in the selectedItem state variable. However, this is not great: **the contents of the ****selectedItem**** is the same object as one of the items inside the ****items**** list.** This means that the information about the item itself is duplicated in two places.
Why is this a problem? Let’s make each item editable:
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
import { useState } from 'react';
const initialItems = [
{ title: 'pretzels', id: 0 },
{ title: 'crispy seaweed', id: 1 },
{ title: 'granola bar', id: 2 },
];
export default function Menu() {
const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(
items[0]
);
function handleItemChange(id, e) {
setItems(items.map(item => {
if (item.id === id) {
return {
...item,
title: e.target.value,
};
} else {
return item;
}
}));
}
return (
<>
<h2>What's your travel snack?</h2>
<ul>
{items.map((item, index) => (
<li key={item.id}>
<input
value={item.title}
onChange={e => {
Show more
Notice how if you first click “Choose” on an item and *then* edit it, **the input updates but the label at the bottom does not reflect the edits.** This is because you have duplicated state, and you forgot to update selectedItem.
Although you could update selectedItem too, an easier fix is to remove duplication. In this example, instead of a selectedItem object (which creates a duplication with objects inside items), you hold the selectedId in state, and *then* get the selectedItem by searching the items array for an item with that ID:
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
import { useState } from 'react';
const initialItems = [
{ title: 'pretzels', id: 0 },
{ title: 'crispy seaweed', id: 1 },
{ title: 'granola bar', id: 2 },
];
export default function Menu() {
const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);
const selectedItem = items.find(item =>
item.id === selectedId
);
function handleItemChange(id, e) {
setItems(items.map(item => {
if (item.id === id) {
return {
...item,
title: e.target.value,
};
} else {
return item;
}
}));
}
return (
<>
<h2>What's your travel snack?</h2>
<ul>
{items.map((item, index) => (
<li key={item.id}>
<input
Show more
The state used to be duplicated like this:
- items = [{ id: 0, title: 'pretzels'}, ...]
- selectedItem = {id: 0, title: 'pretzels'}
But after the change it’s like this:
- items = [{ id: 0, title: 'pretzels'}, ...]
- selectedId = 0
The duplication is gone, and you only keep the essential state!
Now if you edit the *selected* item, the message below will update immediately. This is because setItems triggers a re-render, and items.find(...) would find the item with the updated title. You didn’t need to hold *the selected item* in state, because only the *selected ID* is essential. The rest could be calculated during render.
## **Avoid deeply nested state **
Imagine a travel plan consisting of planets, continents, and countries. You might be tempted to structure its state using nested objects and arrays, like in this example:
App.jsplaces.js
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
export const initialTravelPlan = {
id: 0,
title: '(Root)',
childPlaces: [{
id: 1,
title: 'Earth',
childPlaces: [{
id: 2,
title: 'Africa',
childPlaces: [{
id: 3,
title: 'Botswana',
childPlaces: []
}, {
id: 4,
title: 'Egypt',
childPlaces: []
}, {
id: 5,
title: 'Kenya',
childPlaces: []
}, {
id: 6,
title: 'Madagascar',
childPlaces: []
}, {
id: 7,
title: 'Morocco',
childPlaces: []
}, {
id: 8,
title: 'Nigeria',
childPlaces: []
}, {
id: 9,
title: 'South Africa',
Show more
Now let’s say you want to add a button to delete a place you’ve already visited. How would you go about it?[link](https://react.dev/learn/updating-objects-in-state#updating-a-nested-object)[Updating nested state](https://react.dev/learn/updating-objects-in-state#updating-a-nested-object) involves making copies of objects all the way up from the part that changed. Deleting a deeply nested place would involve copying its entire parent place chain. Such code can be very verbose.
**If the state is too nested to update easily, consider making it “flat”.** Here is one way you can restructure this data. Instead of a tree-like structure where each place has an array of *its child places*, you can have each place hold an array of *its child place IDs*. Then store a mapping from each place ID to the corresponding place.
This data restructuring might remind you of seeing a database table:
App.jsplaces.js
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
export const initialTravelPlan = {
0: {
id: 0,
title: '(Root)',
childIds: [1, 42, 46],
},
1: {
id: 1,
title: 'Earth',
childIds: [2, 10, 19, 26, 34]
},
2: {
id: 2,
title: 'Africa',
childIds: [3, 4, 5, 6 , 7, 8, 9]
},
3: {
id: 3,
title: 'Botswana',
childIds: []
},
4: {
id: 4,
title: 'Egypt',
childIds: []
},
5: {
id: 5,
title: 'Kenya',
childIds: []
},
6: {
id: 6,
title: 'Madagascar',
childIds: []
},
Show more
**Now that the state is “flat” (also known as “normalized”), updating nested items becomes easier.**
In order to remove a place now, you only need to update two levels of state:
- The updated version of its *parent* place should exclude the removed ID from its childIds array.
- The updated version of the root “table” object should include the updated version of the parent place.
Here is an example of how you could go about it:
App.jsplaces.js
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
import { initialTravelPlan } from './places.js';
export default function TravelPlan() {
const [plan, setPlan] = useState(initialTravelPlan);
function handleComplete(parentId, childId) {
const parent = plan[parentId];
// Create a new version of the parent place
// that doesn't include this child ID.
const nextParent = {
...parent,
childIds: parent.childIds
.filter(id => id !== childId)
};
// Update the root state object...
setPlan({
...plan,
// ...so that it has the updated parent.
[parentId]: nextParent
});
}
const root = plan[0];
const planetIds = root.childIds;
return (
<>
<h2>Places to visit</h2>
<ol>
{planetIds.map(id => (
<PlaceTree
key={id}
id={id}
parentId={0}
placesById={plan}
onComplete={handleComplete}
Show more
You can nest state as much as you like, but making it “flat” can solve numerous problems. It makes state easier to update, and it helps ensure you don’t have duplication in different parts of a nested object.
##### **Deep Dive**
#### **Improving memory usage **
**Show Details**
Sometimes, you can also reduce state nesting by moving some of the nested state into the child components. This works well for ephemeral UI state that doesn’t need to be stored, like whether an item is hovered.
