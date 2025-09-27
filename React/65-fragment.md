# **<Fragment> (<>...</>)**
<Fragment>, often used via <>...</> syntax, lets you group elements without a wrapper node.
<>
<OneChild />
<AnotherChild />
</>
- [Reference](https://react.dev/reference/react/Fragment#reference)
  - [<Fragment>](https://react.dev/reference/react/Fragment#fragment)
- [Usage](https://react.dev/reference/react/Fragment#usage)
  - [Returning multiple elements](https://react.dev/reference/react/Fragment#returning-multiple-elements)
  - [Assigning multiple elements to a variable](https://react.dev/reference/react/Fragment#assigning-multiple-elements-to-a-variable)
  - [Grouping elements with text](https://react.dev/reference/react/Fragment#grouping-elements-with-text)
  - [Rendering a list of Fragments](https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments)
## **Reference **
### **<Fragment>**** **
Wrap elements in <Fragment> to group them together in situations where you need a single element. Grouping elements in Fragment has no effect on the resulting DOM; it is the same as if the elements were not grouped. The empty JSX tag <></> is shorthand for <Fragment></Fragment> in most cases.
#### **Props **
- **optional** key: Fragments declared with the explicit <Fragment> syntax may have [keys.](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
#### **Caveats **
- If you want to pass key to a Fragment, you can’t use the <>...</> syntax. You have to explicitly import Fragment from 'react' and render <Fragment key={yourKey}>...</Fragment>.
- React does not[link](https://react.dev/learn/preserving-and-resetting-state)[reset state](https://react.dev/learn/preserving-and-resetting-state) when you go from rendering <><Child /></> to [<Child />] or back, or when you go from rendering <><Child /></> to <Child /> and back. This only works a single level deep: for example, going from <><><Child /></></> to <Child /> resets the state. See the precise semantics[link](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)[here.](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)
## **Usage **
### **Returning multiple elements **
Use Fragment, or the equivalent <>...</> syntax, to group multiple elements together. You can use it to put multiple elements in any place where a single element can go. For example, a component can only return one element, but by using a Fragment you can group multiple elements together and then return them as a group:
function Post() {
return (
<>
<PostTitle />
<PostBody />
</>
);
}
Fragments are useful because grouping elements with a Fragment has no effect on layout or styles, unlike if you wrapped the elements in another container like a DOM element. If you inspect this example with the browser tools, you’ll see that all <h1> and <article> DOM nodes appear as siblings without wrappers around them:
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
export default function Blog() {
return (
<>
<Post title="An update" body="It's been a while since I posted..." />
<Post title="My new blog" body="I am starting a new blog!" />
</>
)
}
function Post({ title, body }) {
return (
<>
<PostTitle title={title} />
<PostBody body={body} />
</>
);
}
function PostTitle({ title }) {
return <h1>{title}</h1>
}
function PostBody({ body }) {
return (
<article>
<p>{body}</p>
</article>
);
}
Show more
##### **Deep Dive**
#### **How to write a Fragment without the special syntax? **
**Show Details**
### **Assigning multiple elements to a variable **
Like any other element, you can assign Fragment elements to variables, pass them as props, and so on:
function CloseDialog() {
const buttons = (
<>
<OKButton />
<CancelButton />
</>
);
return (
<AlertDialog buttons={buttons}>
Are you sure you want to leave this page?
</AlertDialog>
);
}
### **Grouping elements with text **
You can use Fragment to group text together with components:
function DateRangePicker({ start, end }) {
return (
<>
From
<DatePicker date={start} />
to
<DatePicker date={end} />
</>
);
}
### **Rendering a list of Fragments **
Here’s a situation where you need to write Fragment explicitly instead of using the <></> syntax. When you[link](https://react.dev/learn/rendering-lists)[render multiple elements in a loop](https://react.dev/learn/rendering-lists), you need to assign a key to each element. If the elements within the loop are Fragments, you need to use the normal JSX element syntax in order to provide the key attribute:
function Blog() {
return posts.map(post =>
<Fragment key={post.id}>
<PostTitle title={post.title} />
<PostBody body={post.body} />
</Fragment>
);
}
You can inspect the DOM to verify that there are no wrapper elements around the Fragment children:
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
import { Fragment } from 'react';
const posts = [
{ id: 1, title: 'An update', body: "It's been a while since I posted..." },
{ id: 2, title: 'My new blog', body: 'I am starting a new blog!' }
];
export default function Blog() {
return posts.map(post =>
<Fragment key={post.id}>
<PostTitle title={post.title} />
<PostBody body={post.body} />
</Fragment>
);
}
function PostTitle({ title }) {
return <h1>{title}</h1>
}
function PostBody({ body }) {
return (
<article>
<p>{body}</p>
</article>
);
}
