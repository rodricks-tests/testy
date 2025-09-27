# **useDebugValue**
useDebugValue is a React Hook that lets you add a label to a custom Hook in[link](https://react.dev/learn/react-developer-tools)[React DevTools.](https://react.dev/learn/react-developer-tools)
useDebugValue(value, format?)
- [Reference](https://react.dev/reference/react/useDebugValue#reference)
  - [useDebugValue(value, format?)](https://react.dev/reference/react/useDebugValue#usedebugvalue)
- [Usage](https://react.dev/reference/react/useDebugValue#usage)
  - [Adding a label to a custom Hook](https://react.dev/reference/react/useDebugValue#adding-a-label-to-a-custom-hook)
  - [Deferring formatting of a debug value](https://react.dev/reference/react/useDebugValue#deferring-formatting-of-a-debug-value)
## **Reference **
### **useDebugValue(value, format?)**** **
Call useDebugValue at the top level of your[link](https://react.dev/learn/reusing-logic-with-custom-hooks)[custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks) to display a readable debug value:
import { useDebugValue } from 'react';
function useOnlineStatus() {
// ...
useDebugValue(isOnline ? 'Online' : 'Offline');
// ...
}
[See more examples below.](https://react.dev/reference/react/useDebugValue#usage)
#### **Parameters **
- value: The value you want to display in React DevTools. It can have any type.
- **optional** format: A formatting function. When the component is inspected, React DevTools will call the formatting function with the value as the argument, and then display the returned formatted value (which may have any type). If you don’t specify the formatting function, the original value itself will be displayed.
#### **Returns **
useDebugValue does not return anything.
## **Usage **
### **Adding a label to a custom Hook **
Call useDebugValue at the top level of your[link](https://react.dev/learn/reusing-logic-with-custom-hooks)[custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks) to display a readable debug value for[link](https://react.dev/learn/react-developer-tools)[React DevTools.](https://react.dev/learn/react-developer-tools)
import { useDebugValue } from 'react';
function useOnlineStatus() {
// ...
useDebugValue(isOnline ? 'Online' : 'Offline');
// ...
}
This gives components calling useOnlineStatus a label like OnlineStatus: "Online" when you inspect them:
Without the useDebugValue call, only the underlying data (in this example, true) would be displayed.
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
import { useSyncExternalStore, useDebugValue } from 'react';
export function useOnlineStatus() {
const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
useDebugValue(isOnline ? 'Online' : 'Offline');
return isOnline;
}
function subscribe(callback) {
window.addEventListener('online', callback);
window.addEventListener('offline', callback);
return () => {
window.removeEventListener('online', callback);
window.removeEventListener('offline', callback);
};
}
Show more
### **Note**
Don’t add debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries and that have a complex internal data structure that’s difficult to inspect.
### **Deferring formatting of a debug value **
You can also pass a formatting function as the second argument to useDebugValue:
useDebugValue(date, date => date.toDateString());
Your formatting function will receive the debug value as a parameter and should return a formatted display value. When your component is inspected, React DevTools will call this function and display its result.
This lets you avoid running potentially expensive formatting logic unless the component is actually inspected. For example, if date is a Date value, this avoids calling toDateString() on it for every render.
