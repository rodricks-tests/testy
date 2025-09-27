# **target**
The target option specifies which React version the compiler should generate code for.
{
target: '19' // or '18', '17'
}
- [Reference](https://react.dev/reference/react-compiler/target#reference)
  - [target](https://react.dev/reference/react-compiler/target#target)
- [Usage](https://react.dev/reference/react-compiler/target#usage)
  - [Targeting React 19 (default)](https://react.dev/reference/react-compiler/target#targeting-react-19)
  - [Targeting React 17 or 18](https://react.dev/reference/react-compiler/target#targeting-react-17-or-18)
- [Troubleshooting](https://react.dev/reference/react-compiler/target#troubleshooting)
  - [Runtime errors about missing compiler runtime](https://react.dev/reference/react-compiler/target#missing-runtime)
  - [Runtime package not working](https://react.dev/reference/react-compiler/target#runtime-not-working)
  - [Checking compiled output](https://react.dev/reference/react-compiler/target#checking-output)
## **Reference **
### **target**** **
Configures the React version compatibility for the compiled output.
#### **Type **
'17' | '18' | '19'
#### **Default value **
'19'
#### **Valid values **
- **'19'**: Target React 19 (default). No additional runtime required.
- **'18'**: Target React 18. Requires react-compiler-runtime package.
- **'17'**: Target React 17. Requires react-compiler-runtime package.
#### **Caveats **
- Always use string values, not numbers (e.g., '17' not 17)
- Don’t include patch versions (e.g., use '18' not '18.2.0')
- React 19 includes built-in compiler runtime APIs
- React 17 and 18 require installing react-compiler-runtime@rc
## **Usage **
### **Targeting React 19 (default) **
For React 19, no special configuration is needed:
{
// defaults to target: '19'
}
The compiler will use React 19’s built-in runtime APIs:
// Compiled output uses React 19's native APIs
import { c as _c } from 'react/compiler-runtime';
### **Targeting React 17 or 18 **
For React 17 and React 18 projects, you need two steps:
1. Install the runtime package:
npm install react-compiler-runtime@rc
1. Configure the target:
// For React 18
{
target: '18'
}
// For React 17
{
target: '17'
}
The compiler will use the polyfill runtime for both versions:
// Compiled output uses the polyfill
import { c as _c } from 'react-compiler-runtime';
## **Troubleshooting **
### **Runtime errors about missing compiler runtime **
If you see errors like “Cannot find module ‘react/compiler-runtime’“:
1. Check your React version:
1. npm why react
1. If using React 17 or 18, install the runtime:
1. npm install react-compiler-runtime@rc
1. Ensure your target matches your React version:
1. {
1. target: '18' // Must match your React major version
1. }
### **Runtime package not working **
Ensure the runtime package is:
1. Installed in your project (not globally)
1. Listed in your package.json dependencies
1. The correct version (@rc tag)
1. Not in devDependencies (it’s needed at runtime)
### **Checking compiled output **
To verify the correct runtime is being used, note the different import (react/compiler-runtime for builtin, react-compiler-runtime standalone package for 17/18):
// For React 19 (built-in runtime)
import { c } from 'react/compiler-runtime'
//                      ^
// For React 17/18 (polyfill runtime)
import { c } from 'react-compiler-runtime'
//                      ^
