# **Rendering Lists**
You will often want to display multiple similar components from a collection of data. You can use the[link](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#)[JavaScript array methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) to manipulate an array of data. On this page, you’ll use[link](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)[filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and[link](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map)[map()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) with React to filter and transform your array of data into an array of components.
### **You will learn**
- How to render components from an array using JavaScript’s map()
- How to render only specific components using JavaScript’s filter()
- When and why to use React keys
## **Rendering data from arrays **
Say that you have a list of content.
<ul>
<li>Creola Katherine Johnson: mathematician</li>
<li>Mario José Molina-Pasquel Henríquez: chemist</li>
<li>Mohammad Abdus Salam: physicist</li>
<li>Percy Lavon Julian: chemist</li>
<li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
The only difference among those list items is their contents, their data. You will often need to show several instances of the same component using different data when building interfaces: from lists of comments to galleries of profile images. In these situations, you can store that data in JavaScript objects and arrays and use methods like[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and[link](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)[filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to render lists of components from them.
Here’s a short example of how to generate a list of items from an array:
1. **Move** the data into an array:
const people = [
'Creola Katherine Johnson: mathematician',
'Mario José Molina-Pasquel Henríquez: chemist',
'Mohammad Abdus Salam: physicist',
'Percy Lavon Julian: chemist',
'Subrahmanyan Chandrasekhar: astrophysicist'
];
1. **Map** the people members into a new array of JSX nodes, listItems:
const listItems = people.map(person => <li>{person}</li>);
1. **Return** listItems from your component wrapped in a <ul>:
return <ul>{listItems}</ul>;
Here is the result:
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
const people = [
'Creola Katherine Johnson: mathematician',
'Mario José Molina-Pasquel Henríquez: chemist',
'Mohammad Abdus Salam: physicist',
'Percy Lavon Julian: chemist',
'Subrahmanyan Chandrasekhar: astrophysicist'
];
export default function List() {
const listItems = people.map(person =>
<li>{person}</li>
);
return <ul>{listItems}</ul>;
}
Console (1)
Each child in a list should have a unique "key" prop.
Check the render method of `List`. See https://react.dev/link/warning-keys for more information.
Notice the sandbox above displays a console error:
Console
Warning: Each child in a list should have a unique “key” prop.
You’ll learn how to fix this error later on this page. Before we get to that, let’s add some structure to your data.
## **Filtering arrays of items **
This data can be structured even more.
const people = [{
id: 0,
name: 'Creola Katherine Johnson',
profession: 'mathematician',
}, {
id: 1,
name: 'Mario José Molina-Pasquel Henríquez',
profession: 'chemist',
}, {
id: 2,
name: 'Mohammad Abdus Salam',
profession: 'physicist',
}, {
id: 3,
name: 'Percy Lavon Julian',
profession: 'chemist',
}, {
id: 4,
name: 'Subrahmanyan Chandrasekhar',
profession: 'astrophysicist',
}];
Let’s say you want a way to only show people whose profession is 'chemist'. You can use JavaScript’s filter() method to return just those people. This method takes an array of items, passes them through a “test” (a function that returns true or false), and returns a new array of only those items that passed the test (returned true).
You only want the items where profession is 'chemist'. The “test” function for this looks like (person) => person.profession === 'chemist'. Here’s how to put it together:
1. **Create** a new array of just “chemist” people, chemists, by calling filter() on the people filtering by person.profession === 'chemist':
const chemists = people.filter(person =>
person.profession === 'chemist'
);
1. Now **map** over chemists:
const listItems = chemists.map(person =>
<li>
<img
src={getImageUrl(person)}
alt={person.name}
/>
<p>
<b>{person.name}:</b>
{' ' + person.profession + ' '}
known for {person.accomplishment}
</p>
</li>
);
1. Lastly, **return** the listItems from your component:
return <ul>{listItems}</ul>;
App.jsdata.jsutils.js
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
import { people } from './data.js';
import { getImageUrl } from './utils.js';
export default function List() {
const chemists = people.filter(person =>
person.profession === 'chemist'
);
const listItems = chemists.map(person =>
<li>
<img
src={getImageUrl(person)}
alt={person.name}
/>
<p>
<b>{person.name}:</b>
{' ' + person.profession + ' '}
known for {person.accomplishment}
</p>
</li>
);
return <ul>{listItems}</ul>;
}
Show more
### **Pitfall**
Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement:
const listItems = chemists.map(person =>
<li>...</li> // Implicit return!
);
However, **you must write ****return**** explicitly if your ****=>**** is followed by a ****{**** curly brace!**
const listItems = chemists.map(person => { // Curly brace
return <li>...</li>;
});
Arrow functions containing => { are said to have a[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body)[“block body”.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) They let you write more than a single line of code, but you *have to* write a return statement yourself. If you forget it, nothing gets returned!
## **Keeping list items in order with ****key**** **
Notice that all the sandboxes above show an error in the console:
Console
Warning: Each child in a list should have a unique “key” prop.
You need to give each array item a key — a string or a number that uniquely identifies it among other items in that array:
<li key={person.id}>...</li>
### **Note**
JSX elements directly inside a map() call always need keys!
Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.
Rather than generating keys on the fly, you should include them in your data:
App.jsdata.jsutils.js
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
export const people = [{
id: 0, // Used in JSX as a key
name: 'Creola Katherine Johnson',
profession: 'mathematician',
accomplishment: 'spaceflight calculations',
imageId: 'MK3eW3A'
}, {
id: 1, // Used in JSX as a key
name: 'Mario José Molina-Pasquel Henríquez',
profession: 'chemist',
accomplishment: 'discovery of Arctic ozone hole',
imageId: 'mynHUSa'
}, {
id: 2, // Used in JSX as a key
name: 'Mohammad Abdus Salam',
profession: 'physicist',
accomplishment: 'electromagnetism theory',
imageId: 'bE7W1ji'
}, {
id: 3, // Used in JSX as a key
name: 'Percy Lavon Julian',
profession: 'chemist',
accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
imageId: 'IOjWm71'
}, {
id: 4, // Used in JSX as a key
name: 'Subrahmanyan Chandrasekhar',
profession: 'astrophysicist',
accomplishment: 'white dwarf star mass calculations',
imageId: 'lrWQx8l'
}];
Show more
##### **Deep Dive**
#### **Displaying several DOM nodes for each list item **
**Show Details**
### **Where to get your ****key**** **
Different sources of data provide different sources of keys:
- **Data from a database:** If your data is coming from a database, you can use the database keys/IDs, which are unique by nature.
- **Locally generated data:** If your data is generated and persisted locally (e.g. notes in a note-taking app), use an incrementing counter, [crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) or a package like [uuid](https://www.npmjs.com/package/uuid) when creating items.
### **Rules of keys **
- **Keys must be unique among siblings.** However, it’s okay to use the same keys for JSX nodes in *different* arrays.
- **Keys must not change** or that defeats their purpose! Don’t generate them while rendering.
### **Why does React need keys? **
Imagine that files on your desktop didn’t have names. Instead, you’d refer to them by their order — the first file, the second file, and so on. You could get used to it, but once you delete a file, it would get confusing. The second file would become the first file, the third file would be the second file, and so on.
File names in a folder and JSX keys in an array serve a similar purpose. They let us uniquely identify an item between its siblings. A well-chosen key provides more information than the position within the array. Even if the *position* changes due to reordering, the key lets React identify the item throughout its lifetime.
### **Pitfall**
You might be tempted to use an item’s index in the array as its key. In fact, that’s what React will use if you don’t specify a key at all. But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered. Index as a key often leads to subtle and confusing bugs.
Similarly, do not generate keys on the fly, e.g. with key={Math.random()}. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.
Note that your components won’t receive key as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <Profile key={id} userId={id} />.
