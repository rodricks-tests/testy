# **Updating Objects in State**
State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.
### **You will learn**
- How to correctly update an object in React state
- How to update a nested object without mutating it
- What immutability is, and how not to break it
- How to make object copying less repetitive with Immer
## **What’s a mutation? **
You can store any kind of JavaScript value in state.
const [x, setX] = useState(0);
So far you’ve been working with numbers, strings, and booleans. These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. You can trigger a re-render to *replace* a value:
setX(5);
The x state changed from 0 to 5, but the *number **0** itself* did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JavaScript.
Now consider an object in state:
const [position, setPosition] = useState({ x: 0, y: 0 });
Technically, it is possible to change the contents of *the object itself*. **This is called a mutation:**
position.x = 5;
However, although objects in React state are technically mutable, you should treat them **as if** they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them.
## **Treat state as read-only **
In other words, you should **treat any JavaScript object that you put into state as read-only.**
This example holds an object in state to represent the current pointer position. The red dot is supposed to move when you touch or move the cursor over the preview area. But the dot stays in the initial position:
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
export default function MovingDot() {
const [position, setPosition] = useState({
x: 0,
y: 0
});
return (
<div
onPointerMove={e => {
position.x = e.clientX;
position.y = e.clientY;
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
);
}
Show more
The problem is with this bit of code.
onPointerMove={e => {
position.x = e.clientX;
position.y = e.clientY;
}}
This code modifies the object assigned to position from[link](https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time)[the previous render.](https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) But without using the state setting function, React has no idea that object has changed. So React does not do anything in response. It’s like trying to change the order after you’ve already eaten the meal. While mutating state can work in some cases, we don’t recommend it. You should treat the state value you have access to in a render as read-only.
To actually[link](https://react.dev/learn/state-as-a-snapshot#setting-state-triggers-renders)[trigger a re-render](https://react.dev/learn/state-as-a-snapshot#setting-state-triggers-renders) in this case, **create a *****new***** object and pass it to the state setting function:**
onPointerMove={e => {
setPosition({
x: e.clientX,
y: e.clientY
});
}}
With setPosition, you’re telling React:
- Replace position with this new object
- And render this component again
Notice how the red dot now follows your pointer when you touch or hover over the preview area:
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
);
}
Show more
##### **Deep Dive**
#### **Local mutation is fine **
**Show Details**
## **Copying objects with the spread syntax **
In the previous example, the position object is always created fresh from the current cursor position. But often, you will want to include *existing* data as a part of the new object you’re creating. For example, you may want to update *only one* field in a form, but keep the previous values for all other fields.
These input fields don’t work because the onChange handlers mutate the state:
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
const [person, setPerson] = useState({
firstName: 'Barbara',
lastName: 'Hepworth',
email: 'bhepworth@sculpture.com'
});
function handleFirstNameChange(e) {
person.firstName = e.target.value;
}
function handleLastNameChange(e) {
person.lastName = e.target.value;
}
function handleEmailChange(e) {
person.email = e.target.value;
}
return (
<>
<label>
First name:
<input
value={person.firstName}
onChange={handleFirstNameChange}
/>
</label>
<label>
Last name:
<input
value={person.lastName}
onChange={handleLastNameChange}
/>
Show more
For example, this line mutates the state from a past render:
person.firstName = e.target.value;
The reliable way to get the behavior you’re looking for is to create a new object and pass it to setPerson. But here, you want to also **copy the existing data into it** because only one of the fields has changed:
setPerson({
firstName: e.target.value, // New first name from the input
lastName: person.lastName,
email: person.email
});
You can use the ...[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)[object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) syntax so that you don’t need to copy every property separately.
setPerson({
...person, // Copy the old fields
firstName: e.target.value // But override this one
});
Now the form works!
Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!
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
const [person, setPerson] = useState({
firstName: 'Barbara',
lastName: 'Hepworth',
email: 'bhepworth@sculpture.com'
});
function handleFirstNameChange(e) {
setPerson({
...person,
firstName: e.target.value
});
}
function handleLastNameChange(e) {
setPerson({
...person,
lastName: e.target.value
});
}
function handleEmailChange(e) {
setPerson({
...person,
email: e.target.value
});
}
return (
<>
<label>
First name:
<input
value={person.firstName}
Show more
Note that the ... spread syntax is “shallow”—it only copies things one level deep. This makes it fast, but it also means that if you want to update a nested property, you’ll have to use it more than once.
##### **Deep Dive**
#### **Using a single event handler for multiple fields **
**Show Details**
## **Updating a nested object **
Consider a nested object structure like this:
const [person, setPerson] = useState({
name: 'Niki de Saint Phalle',
artwork: {
title: 'Blue Nana',
city: 'Hamburg',
image: 'https://i.imgur.com/Sd1AgUOm.jpg',
}
});
If you wanted to update person.artwork.city, it’s clear how to do it with mutation:
person.artwork.city = 'New Delhi';
But in React, you treat state as immutable! In order to change city, you would first need to produce the new artwork object (pre-populated with data from the previous one), and then produce the new person object which points at the new artwork:
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
Or, written as a single function call:
setPerson({
...person, // Copy other fields
artwork: { // but replace the artwork
...person.artwork, // with the same one
city: 'New Delhi' // but in New Delhi!
}
});
This gets a bit wordy, but it works fine for many cases:
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
const [person, setPerson] = useState({
name: 'Niki de Saint Phalle',
artwork: {
title: 'Blue Nana',
city: 'Hamburg',
image: 'https://i.imgur.com/Sd1AgUOm.jpg',
}
});
function handleNameChange(e) {
setPerson({
...person,
name: e.target.value
});
}
function handleTitleChange(e) {
setPerson({
...person,
artwork: {
...person.artwork,
title: e.target.value
}
});
}
function handleCityChange(e) {
setPerson({
...person,
artwork: {
...person.artwork,
city: e.target.value
}
Show more
##### **Deep Dive**
#### **Objects are not really nested **
**Show Details**
### **Write concise update logic with Immer **
If your state is deeply nested, you might want to consider[link](https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state)[flattening it.](https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state) But, if you don’t want to change your state structure, you might prefer a shortcut to nested spreads.[link](https://github.com/immerjs/use-immer)[Immer](https://github.com/immerjs/use-immer) is a popular library that lets you write using the convenient but mutating syntax and takes care of producing the copies for you. With Immer, the code you write looks like you are “breaking the rules” and mutating an object:
updatePerson(draft => {
draft.artwork.city = 'Lagos';
});
But unlike a regular mutation, it doesn’t overwrite the past state!
##### **Deep Dive**
#### **How does Immer work? **
**Show Details**
To try Immer:
1. Run npm install use-immer to add Immer as a dependency
1. Then replace import { useState } from 'react' with import { useImmer } from 'use-immer'
Here is the above example converted to Immer:
package.jsonApp.js
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
{
"dependencies": {
"immer": "1.7.3",
"react": "latest",
"react-dom": "latest",
"react-scripts": "latest",
"use-immer": "0.5.1"
},
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test --env=jsdom",
"eject": "react-scripts eject"
},
"devDependencies": {}
}
Notice how much more concise the event handlers have become. You can mix and match useState and useImmer in a single component as much as you like. Immer is a great way to keep the update handlers concise, especially if there’s nesting in your state, and copying objects leads to repetitive code.
##### **Deep Dive**
#### **Why is mutating state not recommended in React? **
**Show Details**
## **Recap**
- Treat all state in React as immutable.
- When you store objects in state, mutating them will not trigger renders and will change the state in previous render “snapshots”.
- Instead of mutating an object, create a *new* version of it, and trigger a re-render by setting state to it.
- You can use the {...obj, something: 'newValue'} object spread syntax to create copies of objects.
- Spread syntax is shallow: it only copies one level deep.
- To update a nested object, you need to create copies all the way up from the place you’re updating.
- To reduce repetitive copying code, use Immer.
## **Try out some challenges**
1. Fix incorrect state updates2. Find and fix the mutation3. Update an object with Immer
#### **Challenge 1 of 3: **Fix incorrect state updates
This form has a few bugs. Click the button that increases the score a few times. Notice that it does not increase. Then edit the first name, and notice that the score has suddenly “caught up” with your changes. Finally, edit the last name, and notice that the score has disappeared completely.
Your task is to fix all of these bugs. As you fix them, explain why each of them happens.
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
export default function Scoreboard() {
const [player, setPlayer] = useState({
firstName: 'Ranjani',
lastName: 'Shettar',
score: 10,
});
function handlePlusClick() {
player.score++;
}
function handleFirstNameChange(e) {
setPlayer({
...player,
firstName: e.target.value,
});
}
function handleLastNameChange(e) {
setPlayer({
lastName: e.target.value
});
}
return (
<>
<label>
Score: <b>{player.score}</b>
{' '}
<button onClick={handlePlusClick}>
+1
</button>
</label>
<label>
Show more
**Show solution****Next Challenge**
[**Previous**](https://react.dev/learn/queueing-a-series-of-state-updates)Queueing a Series of State Updates
[**Next**](https://react.dev/learn/updating-arrays-in-state)Updating Arrays in State
Copyright © Meta Platforms, Inc
uwu?
[**Learn React**](https://react.dev/learn)
[Quick Start](https://react.dev/learn)
[Installation](https://react.dev/learn/installation)
[Describing the UI](https://react.dev/learn/describing-the-ui)
[Adding Interactivity](https://react.dev/learn/adding-interactivity)
[Managing State](https://react.dev/learn/managing-state)
[Escape Hatches](https://react.dev/learn/escape-hatches)
[**API Reference**](https://react.dev/reference/react)
[React APIs](https://react.dev/reference/react)
[React DOM APIs](https://react.dev/reference/react-dom)
[**Community**](https://react.dev/community)
[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)
[Meet the Team](https://react.dev/community/team)
[Docs Contributors](https://react.dev/community/docs-contributors)
[Acknowledgements](https://react.dev/community/acknowledgements)
**More**
[Blog](https://react.dev/blog)
[React Native](https://reactnative.dev/)
[Privacy](https://opensource.facebook.com/legal/privacy)
[Terms](https://opensource.fb.com/legal/terms/)
## **On this page**
- Overview
- What’s a mutation?
- Treat state as read-only
- Copying objects with the spread syntax
- Updating a nested object
- **Write concise update logic with Immer**
- Recap
- Challenges
Updating Objects in State – React
