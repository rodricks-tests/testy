# **Understanding Your UI as a Tree**
Your React app is taking shape with many components being nested within each other. How does React keep track of your app’s component structure?
React, and many other UI libraries, model UI as a tree. Thinking of your app as a tree is useful for understanding the relationship between components. This understanding will help you debug future concepts like performance and state management.
### **You will learn**
- How React “sees” component structures
- What a render tree is and what it is useful for
- What a module dependency tree is and what it is useful for
## **Your UI as a tree **
Trees are a relationship model between items and UI is often represented using tree structures. For example, browsers use tree structures to model HTML ([DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)) and CSS ([CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model)). Mobile platforms also use trees to represent their view hierarchy.
React creates a UI tree from your components. In this example, the UI tree is then used to render to the DOM.
Like browsers and mobile platforms, React also uses tree structures to manage and model the relationship between components in a React app. These trees are useful tools to understand how data flows through a React app and how to optimize rendering and app size.
## **The Render Tree **
A major feature of components is the ability to compose components of other components. As we[link](https://react.dev/learn/your-first-component#nesting-and-organizing-components)[nest components](https://react.dev/learn/your-first-component#nesting-and-organizing-components), we have the concept of parent and child components, where each parent component may itself be a child of another component.
When we render a React app, we can model this relationship in a tree, known as the render tree.
Here is a React app that renders inspirational quotes.
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
React creates a *render tree*, a UI tree, composed of the rendered components.
From the example app, we can construct the above render tree.
The tree is composed of nodes, each of which represents a component. App, FancyText, Copyright, to name a few, are all nodes in our tree.
The root node in a React render tree is the[link](https://react.dev/learn/importing-and-exporting-components#the-root-component-file)[root component](https://react.dev/learn/importing-and-exporting-components#the-root-component-file) of the app. In this case, the root component is App and it is the first component React renders. Each arrow in the tree points from a parent component to a child component.
##### **Deep Dive**
#### **Where are the HTML tags in the render tree? **
**Show Details**
A render tree represents a single render pass of a React application. With[link](https://react.dev/learn/conditional-rendering)[conditional rendering](https://react.dev/learn/conditional-rendering), a parent component may render different children depending on the data passed.
We can update the app to conditionally render either an inspirational quote or color.
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
With conditional rendering, across different renders, the render tree may render different components.
In this example, depending on what inspiration.type is, we may render <FancyText> or <Color>. The render tree may be different for each render pass.
Although render trees may differ across render passes, these trees are generally helpful for identifying what the *top-level* and *leaf components* are in a React app. Top-level components are the components nearest to the root component and affect the rendering performance of all the components beneath them and often contain the most complexity. Leaf components are near the bottom of the tree and have no child components and are often frequently re-rendered.
Identifying these categories of components are useful for understanding data flow and performance of your app.
## **The Module Dependency Tree **
Another relationship in a React app that can be modeled with a tree are an app’s module dependencies. As we[link](https://react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component)[break up our components](https://react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component) and logic into separate files, we create[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)[JS modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) where we may export components, functions, or constants.
Each node in a module dependency tree is a module and each branch represents an import statement in that module.
If we take the previous Inspirations app, we can build a module dependency tree, or dependency tree for short.
The module dependency tree for the Inspirations app.
The root node of the tree is the root module, also known as the entrypoint file. It often is the module that contains the root component.
Comparing to the render tree of the same app, there are similar structures but some notable differences:
- The nodes that make-up the tree represent modules, not components.
- Non-component modules, like inspirations.js, are also represented in this tree. The render tree only encapsulates components.
- Copyright.js appears under App.js but in the render tree, Copyright, the component, appears as a child of InspirationGenerator. This is because InspirationGenerator accepts JSX as [children props](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children), so it renders Copyright as a child component but does not import the module.
Dependency trees are useful to determine what modules are necessary to run your React app. When building a React app for production, there is typically a build step that will bundle all the necessary JavaScript to ship to the client. The tool responsible for this is called a[link](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem)[bundler](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem), and bundlers will use the dependency tree to determine what modules should be included.
As your app grows, often the bundle size does too. Large bundle sizes are expensive for a client to download and run. Large bundle sizes can delay the time for your UI to get drawn. Getting a sense of your app’s dependency tree may help with debugging these issues.
