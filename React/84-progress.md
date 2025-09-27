# **<progress>**
The[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)[<progress>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)[component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) lets you render a progress indicator.
<progress value={0.5} />
- [Reference](https://react.dev/reference/react-dom/components/progress#reference)
  - [<progress>](https://react.dev/reference/react-dom/components/progress#progress)
- [Usage](https://react.dev/reference/react-dom/components/progress#usage)
  - [Controlling a progress indicator](https://react.dev/reference/react-dom/components/progress#controlling-a-progress-indicator)
## **Reference **
### **<progress>**** **
To display a progress indicator, render the[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)[<progress>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) component.
<progress value={0.5} />
[See more examples below.](https://react.dev/reference/react-dom/components/progress#usage)
#### **Props **
<progress> supports all[link](https://react.dev/reference/react-dom/components/common#common-props)[common element props.](https://react.dev/reference/react-dom/components/common#common-props)
Additionally, <progress> supports these props:
- [max](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max): A number. Specifies the maximum value. Defaults to 1.
- [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value): A number between 0 and max, or null for indeterminate progress. Specifies how much was done.
## **Usage **
### **Controlling a progress indicator **
To display a progress indicator, render a <progress> component. You can pass a number value between 0 and the max value you specify. If you don’t pass a max value, it will assumed to be 1 by default.
If the operation is not ongoing, pass value={null} to put the progress indicator into an indeterminate state.
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
export default function App() {
return (
<>
<progress value={0} />
<progress value={0.5} />
<progress value={0.7} />
<progress value={75} max={100} />
<progress value={1} />
<progress value={null} />
</>
);
}
