# **cache**
### **React Server Components**
cache is only for use with[link](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)[React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components).
cache lets you cache the result of a data fetch or computation.
const cachedFn = cache(fn);
- [Reference](https://react.dev/reference/react/cache#reference)
  - [cache(fn)](https://react.dev/reference/react/cache#cache)
- [Usage](https://react.dev/reference/react/cache#usage)
  - [Cache an expensive computation](https://react.dev/reference/react/cache#cache-expensive-computation)
  - [Share a snapshot of data](https://react.dev/reference/react/cache#take-and-share-snapshot-of-data)
  - [Preload data](https://react.dev/reference/react/cache#preload-data)
- [Troubleshooting](https://react.dev/reference/react/cache#troubleshooting)
  - [My memoized function still runs even though I’ve called it with the same arguments](https://react.dev/reference/react/cache#memoized-function-still-runs)
## **Reference **
### **cache(fn)**** **
Call cache outside of any components to create a version of the function with caching.
import {cache} from 'react';
import calculateMetrics from 'lib/metrics';
const getMetrics = cache(calculateMetrics);
function Chart({data}) {
const report = getMetrics(data);
// ...
}
When getMetrics is first called with data, getMetrics will call calculateMetrics(data) and store the result in cache. If getMetrics is called again with the same data, it will return the cached result instead of calling calculateMetrics(data) again.
[See more examples below.](https://react.dev/reference/react/cache#usage)
#### **Parameters **
- fn: The function you want to cache results for. fn can take any arguments and return any value.
#### **Returns **
cache returns a cached version of fn with the same type signature. It does not call fn in the process.
When calling cachedFn with given arguments, it first checks if a cached result exists in the cache. If a cached result exists, it returns the result. If not, it calls fn with the arguments, stores the result in the cache, and returns the result. The only time fn is called is when there is a cache miss.
### **Note**
The optimization of caching return values based on inputs is known as[link](https://en.wikipedia.org/wiki/Memoization)[*memoization*](https://en.wikipedia.org/wiki/Memoization). We refer to the function returned from cache as a memoized function.
#### **Caveats **
- React will invalidate the cache for all memoized functions for each server request.
- Each call to cache creates a new function. This means that calling cache with the same function multiple times will return different memoized functions that do not share the same cache.
- cachedFn will also cache errors. If fn throws an error for certain arguments, it will be cached, and the same error is re-thrown when cachedFn is called with those same arguments.
- cache is for use in [Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) only.
## **Usage **
### **Cache an expensive computation **
Use cache to skip duplicate work.
import {cache} from 'react';
import calculateUserMetrics from 'lib/user';
const getUserMetrics = cache(calculateUserMetrics);
function Profile({user}) {
const metrics = getUserMetrics(user);
// ...
}
function TeamReport({users}) {
for (let user in users) {
const metrics = getUserMetrics(user);
// ...
}
// ...
}
If the same user object is rendered in both Profile and TeamReport, the two components can share work and only call calculateUserMetrics once for that user.
Assume Profile is rendered first. It will call getUserMetrics, and check if there is a cached result. Since it is the first time getUserMetrics is called with that user, there will be a cache miss. getUserMetrics will then call calculateUserMetrics with that user and write the result to cache.
When TeamReport renders its list of users and reaches the same user object, it will call getUserMetrics and read the result from cache.
### **Pitfall**
##### **Calling different memoized functions will read from different caches. **
To access the same cache, components must call the same memoized function.
// Temperature.js
import {cache} from 'react';
import {calculateWeekReport} from './report';
export function Temperature({cityData}) {
// 🚩 Wrong: Calling `cache` in component creates new `getWeekReport` for each render
const getWeekReport = cache(calculateWeekReport);
const report = getWeekReport(cityData);
// ...
}
// Precipitation.js
import {cache} from 'react';
import {calculateWeekReport} from './report';
// 🚩 Wrong: `getWeekReport` is only accessible for `Precipitation` component.
const getWeekReport = cache(calculateWeekReport);
export function Precipitation({cityData}) {
const report = getWeekReport(cityData);
// ...
}
In the above example, Precipitation and Temperature each call cache to create a new memoized function with their own cache look-up. If both components render for the same cityData, they will do duplicate work to call calculateWeekReport.
In addition, Temperature creates a new memoized function each time the component is rendered which doesn’t allow for any cache sharing.
To maximize cache hits and reduce work, the two components should call the same memoized function to access the same cache. Instead, define the memoized function in a dedicated module that can be[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)[-ed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) across components.
// getWeekReport.js
import {cache} from 'react';
import {calculateWeekReport} from './report';
export default cache(calculateWeekReport);
// Temperature.js
import getWeekReport from './getWeekReport';
export default function Temperature({cityData}) {
const report = getWeekReport(cityData);
// ...
}
// Precipitation.js
import getWeekReport from './getWeekReport';
export default function Precipitation({cityData}) {
const report = getWeekReport(cityData);
// ...
}
Here, both components call the same memoized function exported from ./getWeekReport.js to read and write to the same cache.
### **Share a snapshot of data **
To share a snapshot of data between components, call cache with a data-fetching function like fetch. When multiple components make the same data fetch, only one request is made and the data returned is cached and shared across components. All components refer to the same snapshot of data across the server render.
import {cache} from 'react';
import {fetchTemperature} from './api.js';
const getTemperature = cache(async (city) => {
return await fetchTemperature(city);
});
async function AnimatedWeatherCard({city}) {
const temperature = await getTemperature(city);
// ...
}
async function MinimalWeatherCard({city}) {
const temperature = await getTemperature(city);
// ...
}
If AnimatedWeatherCard and MinimalWeatherCard both render for the same city, they will receive the same snapshot of data from the memoized function.
If AnimatedWeatherCard and MinimalWeatherCard supply different city arguments to getTemperature, then fetchTemperature will be called twice and each call site will receive different data.
The city acts as a cache key.
### **Note**
Asynchronous rendering is only supported for Server Components.
async function AnimatedWeatherCard({city}) {
const temperature = await getTemperature(city);
// ...
}
### **Preload data **
By caching a long-running data fetch, you can kick off asynchronous work prior to rendering the component.
const getUser = cache(async (id) => {
return await db.user.query(id);
});
async function Profile({id}) {
const user = await getUser(id);
return (
<section>
<img src={user.profilePic} />
<h2>{user.name}</h2>
</section>
);
}
function Page({id}) {
// ✅ Good: start fetching the user data
getUser(id);
// ... some computational work
return (
<>
<Profile id={id} />
</>
);
}
When rendering Page, the component calls getUser but note that it doesn’t use the returned data. This early getUser call kicks off the asynchronous database query that occurs while Page is doing other computational work and rendering children.
When rendering Profile, we call getUser again. If the initial getUser call has already returned and cached the user data, when Profile asks and waits for this data, it can simply read from the cache without requiring another remote procedure call. If the initial data request hasn’t been completed, preloading data in this pattern reduces delay in data-fetching.
##### **Deep Dive**
#### **Caching asynchronous work **
**Show Details**
### **Pitfall**
##### **Calling a memoized function outside of a component will not use the cache. **
import {cache} from 'react';
const getUser = cache(async (userId) => {
return await db.user.query(userId);
});
// 🚩 Wrong: Calling memoized function outside of component will not memoize.
getUser('demo-id');
async function DemoProfile() {
// ✅ Good: `getUser` will memoize.
const user = await getUser('demo-id');
return <Profile user={user} />;
}
React only provides cache access to the memoized function in a component. When calling getUser outside of a component, it will still evaluate the function but not read or update the cache.
This is because cache access is provided through a[link](https://react.dev/learn/passing-data-deeply-with-context)[context](https://react.dev/learn/passing-data-deeply-with-context) which is only accessible from a component.
##### **Deep Dive**
#### **When should I use ****cache****, **[**memo**](https://react.dev/reference/react/memo)**, or **[**useMemo**](https://react.dev/reference/react/useMemo)**? **
**Show Details**
## **Troubleshooting **
### **My memoized function still runs even though I’ve called it with the same arguments **
See prior mentioned pitfalls
- [Calling different memoized functions will read from different caches.](https://react.dev/reference/react/cache#pitfall-different-memoized-functions)
- [Calling a memoized function outside of a component will not use the cache.](https://react.dev/reference/react/cache#pitfall-memoized-call-outside-component)
If none of the above apply, it may be a problem with how React checks if something exists in cache.
If your arguments are not[link](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)[primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) (ex. objects, functions, arrays), ensure you’re passing the same object reference.
When calling a memoized function, React will look up the input arguments to see if a result is already cached. React will use shallow equality of the arguments to determine if there is a cache hit.
import {cache} from 'react';
const calculateNorm = cache((vector) => {
// ...
});
function MapMarker(props) {
// 🚩 Wrong: props is an object that changes every render.
const length = calculateNorm(props);
// ...
}
function App() {
return (
<>
<MapMarker x={10} y={10} z={10} />
<MapMarker x={10} y={10} z={10} />
</>
);
}
In this case the two MapMarkers look like they’re doing the same work and calling calculateNorm with the same value of {x: 10, y: 10, z:10}. Even though the objects contain the same values, they are not the same object reference as each component creates its own props object.
React will call[link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) on the input to verify if there is a cache hit.
import {cache} from 'react';
const calculateNorm = cache((x, y, z) => {
// ...
});
function MapMarker(props) {
// ✅ Good: Pass primitives to memoized function
const length = calculateNorm(props.x, props.y, props.z);
// ...
}
function App() {
return (
<>
<MapMarker x={10} y={10} z={10} />
<MapMarker x={10} y={10} z={10} />
</>
);
}
One way to address this could be to pass the vector dimensions to calculateNorm. This works because the dimensions themselves are primitives.
Another solution may be to pass the vector object itself as a prop to the component. We’ll need to pass the same object to both component instances.
import {cache} from 'react';
const calculateNorm = cache((vector) => {
// ...
});
function MapMarker(props) {
// ✅ Good: Pass the same `vector` object
const length = calculateNorm(props.vector);
// ...
}
function App() {
const vector = [10, 10, 10];
return (
<>
<MapMarker vector={vector} />
<MapMarker vector={vector} />
</>
);
}
