# **Creating a React App**
If you want to build a new app or website with React, we recommend starting with a framework.
If your app has constraints not well-served by existing frameworks, you prefer to build your own framework, or you just want to learn the basics of a React app, you can[link](https://react.dev/learn/build-a-react-app-from-scratch)[build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch).
## **Full-stack frameworks **
These recommended frameworks support all the features you need to deploy and scale your app in production. They have integrated the latest React features and take advantage of React’s architecture.
### **Note**
#### **Full-stack frameworks do not require a server. **
All the frameworks on this page support client-side rendering ([CSR](https://developer.mozilla.org/en-US/docs/Glossary/CSR)), single-page apps ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)), and static-site generation ([SSG](https://developer.mozilla.org/en-US/docs/Glossary/SSG)). These apps can be deployed to a[link](https://developer.mozilla.org/en-US/docs/Glossary/CDN)[CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN) or static hosting service without a server. Additionally, these frameworks allow you to add server-side rendering on a per-route basis, when it makes sense for your use case.
This allows you to start with a client-only app, and if your needs change later, you can opt-in to using server features on individual routes without rewriting your app. See your framework’s documentation for configuring the rendering strategy.
### **Next.js (App Router) **
[**Next.js’s App Router**](https://nextjs.org/docs)** is a React framework that takes full advantage of React’s architecture to enable full-stack React apps.**
Terminal
Copy
npx create-next-app@latest
Next.js is maintained by[link](https://vercel.com/)[Vercel](https://vercel.com/). You can[link](https://nextjs.org/docs/app/building-your-application/deploying)[deploy a Next.js app](https://nextjs.org/docs/app/building-your-application/deploying) to any hosting provider that supports Node.js or Docker containers, or to your own server. Next.js also supports[link](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)[static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) which doesn’t require a server.
### **React Router (v7) **
[**React Router**](https://reactrouter.com/start/framework/installation)** is the most popular routing library for React and can be paired with Vite to create a full-stack React framework**. It emphasizes standard Web APIs and has several[link](https://github.com/remix-run/react-router-templates)[ready to deploy templates](https://github.com/remix-run/react-router-templates) for various JavaScript runtimes and platforms.
To create a new React Router framework project, run:
Terminal
Copy
npx create-react-router@latest
React Router is maintained by[link](https://www.shopify.com/)[Shopify](https://www.shopify.com/).
### **Expo (for native apps) **
[**Expo**](https://expo.dev/)** is a React framework that lets you create universal Android, iOS, and web apps with truly native UIs.** It provides an SDK for[link](https://reactnative.dev/)[React Native](https://reactnative.dev/) that makes the native parts easier to use. To create a new Expo project, run:
Terminal
Copy
npx create-expo-app@latest
If you’re new to Expo, check out the[link](https://docs.expo.dev/tutorial/introduction/)[Expo tutorial](https://docs.expo.dev/tutorial/introduction/).
Expo is maintained by[link](https://expo.dev/about)[Expo (the company)](https://expo.dev/about). Building apps with Expo is free, and you can submit them to the Google and Apple app stores without restrictions. Expo additionally provides opt-in paid cloud services.
## **Other frameworks **
There are other up-and-coming frameworks that are working towards our full stack React vision:
- [TanStack Start (Beta)](https://tanstack.com/): TanStack Start is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more using tools like Nitro and Vite.
- [RedwoodJS](https://redwoodjs.com/): Redwood is a full stack React framework with lots of pre-installed packages and configuration that makes it easy to build full-stack web applications.
##### **Deep Dive**
#### **Which features make up the React team’s full-stack architecture vision? **
**Show Details**
## **Start From Scratch **
If your app has constraints not well-served by existing frameworks, you prefer to build your own framework, or you just want to learn the basics of a React app, there are other options available for starting a React project from scratch.
Starting from scratch gives you more flexibility, but does require that you make choices on which tools to use for routing, data fetching, and other common usage patterns.  It’s a lot like building your own framework, instead of using a framework that already exists. The[link](https://react.dev/learn/creating-a-react-app#full-stack-frameworks)[frameworks we recommend](https://react.dev/learn/creating-a-react-app#full-stack-frameworks) have built-in solutions for these problems.
If you want to build your own solutions, see our guide to[link](https://react.dev/learn/build-a-react-app-from-scratch)[build a React app from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) for instructions on how to set up a new React project starting with a build tool like[link](https://vite.dev/)[Vite](https://vite.dev/),[link](https://parceljs.org/)[Parcel](https://parceljs.org/), or[link](https://rsbuild.dev/)[RSbuild](https://rsbuild.dev/).
