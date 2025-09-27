# **Introduction**
React Compiler is a new build-time tool that automatically optimizes your React app. It works with plain JavaScript, and understands the[link](https://react.dev/reference/rules)[Rules of React](https://react.dev/reference/rules), so you don’t need to rewrite any code to use it.
### **You will learn**
- What React Compiler does
- Getting started with the compiler
- Incremental adoption strategies
- Debugging and troubleshooting when things go wrong
- Using the compiler on your React library
### **Note**
React Compiler is currently in Release Candidate (RC). We now recommend everyone to try the compiler and provide feedback. The latest RC release can be found with the @rc tag.
## **What does React Compiler do? **
React Compiler automatically optimizes your React application at build time. React is often fast enough without optimization, but sometimes you need to manually memoize components and values to keep your app responsive. This manual memoization is tedious, easy to get wrong, and adds extra code to maintain. React Compiler does this optimization automatically for you, freeing you from this mental burden so you can focus on building features.
### **Before React Compiler **
Without the compiler, you need to manually memoize components and values to optimize re-renders:
import { useMemo, useCallback, memo } from 'react';
const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
const processedData = useMemo(() => {
return expensiveProcessing(data);
}, [data]);
const handleClick = useCallback((item) => {
onClick(item.id);
}, [onClick]);
return (
<div>
{processedData.map(item => (
<Item key={item.id} onClick={() => handleClick(item)} />
))}
</div>
);
});
### **Note**
This manual memoization has a subtle bug that breaks memoization:
<Item key={item.id} onClick={() => handleClick(item)} />
Even though handleClick is wrapped in useCallback, the arrow function () => handleClick(item) creates a new function every time the component renders. This means that Item will always receive a new onClick prop, breaking memoization.
React Compiler is able to optimize this correctly with or without the arrow function, ensuring that Item only re-renders when props.onClick changes.
### **After React Compiler **
With React Compiler, you write the same code without manual memoization:
function ExpensiveComponent({ data, onClick }) {
const processedData = expensiveProcessing(data);
const handleClick = (item) => {
onClick(item.id);
};
return (
<div>
{processedData.map(item => (
<Item key={item.id} onClick={() => handleClick(item)} />
))}
</div>
);
}
[*See this example in the React Compiler Playground*](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAMygOzgFwJYSYAEAogB4AOCmYeAbggMIQC2Fh1OAFMEQCYBDHAIA0RQowA2eOAGsiAXwCURYAB1iROITA4iFGBERgwCPgBEhAogF4iCStVoMACoeO1MAcy6DhSgG4NDSItHT0ACwFMPkkmaTlbIi48HAQWFRsAPlUQ0PFMKRlZFLSWADo8PkC8hSDMPJgEHFhiLjzQgB4+eiyO-OADIwQTM0thcpYBClL02xz2zXz8zoBJMqJZBABPG2BU9Mq+BQKiuT2uTJyomLizkoOMk4B6PqX8pSUFfs7nnro3qEapgFCAFEA)
React Compiler automatically applies the optimal memoization, ensuring your app only re-renders when necessary.
##### **Deep Dive**
#### **What kind of memoization does React Compiler add? **
**Show Details**
## **Should I try out the compiler? **
We encourage everyone to start using React Compiler. While the compiler is still an optional addition to React today, in the future some features may require the compiler in order to fully work.
### **Is it safe to use? **
React Compiler is now in RC and has been tested extensively in production. While it has been used in production at companies like Meta, rolling out the compiler to production for your app will depend on the health of your codebase and how well you’ve followed the[link](https://react.dev/reference/rules)[Rules of React](https://react.dev/reference/rules).
## **What build tools are supported? **
React Compiler can be installed across[link](https://react.dev/learn/react-compiler/installation)[several build tools](https://react.dev/learn/react-compiler/installation) such as Babel, Vite, Metro, and Rsbuild.
React Compiler is primarily a light Babel plugin wrapper around the core compiler, which was designed to be decoupled from Babel itself. While the initial stable version of the compiler will remain primarily a Babel plugin, we are working with the swc and[link](https://github.com/oxc-project/oxc/issues/10048)[oxc](https://github.com/oxc-project/oxc/issues/10048) teams to build first class support for React Compiler so you won’t have to add Babel back to your build pipelines in the future.
Next.js users can enable the swc-invoked React Compiler by using[link](https://github.com/vercel/next.js/releases/tag/v15.3.1)[v15.3.1](https://github.com/vercel/next.js/releases/tag/v15.3.1) and up.
## **What should I do about useMemo, useCallback, and React.memo? **
React Compiler adds automatic memoization more precisely and granularly than is possible with[link](https://react.dev/reference/react/useMemo)[useMemo](https://react.dev/reference/react/useMemo),[link](https://react.dev/reference/react/useCallback)[useCallback](https://react.dev/reference/react/useCallback), and[link](https://react.dev/reference/react/memo)[React.memo](https://react.dev/reference/react/memo). If you choose to keep manual memoization, React Compiler will analyze them and determine if your manual memoization matches its automatically inferred memoization. If there isn’t a match, the compiler will choose to bail out of optimizing that component.
This is done out of caution as a common anti-pattern with manual memoization is using it for correctness.  This means your app depends on specific values being memoized to work properly. For example, in order to prevent an infinite loop, you may have memoized some values to stop a useEffect call from firing. This breaks the Rules of React, but since it can potentially be dangerous for the compiler to automatically remove manual memoization, the compiler will just bail out instead. You should manually remove your handwritten memoization and verify that your app still works as expected.
## **Try React Compiler **
This section will help you get started with React Compiler and understand how to use it effectively in your projects.
- [**Installation**](https://react.dev/learn/react-compiler/installation) - Install React Compiler and configure it for your build tools
- [**React Version Compatibility**](https://react.dev/reference/react-compiler/target) - Support for React 17, 18, and 19
- [**Configuration**](https://react.dev/reference/react-compiler/configuration) - Customize the compiler for your specific needs
- [**Incremental Adoption**](https://react.dev/learn/react-compiler/incremental-adoption) - Strategies for gradually rolling out the compiler in existing codebases
- [**Debugging and Troubleshooting**](https://react.dev/learn/react-compiler/debugging) - Identify and fix issues when using the compiler
- [**Compiling Libraries**](https://react.dev/reference/react-compiler/compiling-libraries) - Best practices for shipping compiled code
- [**API Reference**](https://react.dev/reference/react-compiler/configuration) - Detailed documentation of all configuration options
## **Additional resources **
In addition to these docs, we recommend checking the[link](https://github.com/reactwg/react-compiler)[React Compiler Working Group](https://github.com/reactwg/react-compiler) for additional information and discussion about the compiler.
