# **<link>**
The[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[<link>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) lets you use external resources such as stylesheets or annotate the document with link metadata.
<link rel="icon" href="favicon.ico" />
- [Reference](https://react.dev/reference/react-dom/components/link#reference)
  - [<link>](https://react.dev/reference/react-dom/components/link#link)
- [Usage](https://react.dev/reference/react-dom/components/link#usage)
  - [Linking to related resources](https://react.dev/reference/react-dom/components/link#linking-to-related-resources)
  - [Linking to a stylesheet](https://react.dev/reference/react-dom/components/link#linking-to-a-stylesheet)
  - [Controlling stylesheet precedence](https://react.dev/reference/react-dom/components/link#controlling-stylesheet-precedence)
  - [Deduplicated stylesheet rendering](https://react.dev/reference/react-dom/components/link#deduplicated-stylesheet-rendering)
  - [Annotating specific items within the document with links](https://react.dev/reference/react-dom/components/link#annotating-specific-items-within-the-document-with-links)
## **Reference **
### **<link>**** **
To link to external resources such as stylesheets, fonts, and icons, or to annotate the document with link metadata, render the[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[<link>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)[component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link). You can render <link> from any component and React will[link](https://react.dev/reference/react-dom/components/link#special-rendering-behavior)[in most cases](https://react.dev/reference/react-dom/components/link#special-rendering-behavior) place the corresponding DOM element in the document head.
<link rel="icon" href="favicon.ico" />
[See more examples below.](https://react.dev/reference/react-dom/components/link#usage)
#### **Props **
<link> supports all[link](https://react.dev/reference/react-dom/components/common#common-props)[common element props.](https://react.dev/reference/react-dom/components/common#common-props)
- rel: a string, required. Specifies the [relationship to the resource](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). React [treats links with](https://react.dev/reference/react-dom/components/link#special-rendering-behavior)[rel="stylesheet"](https://react.dev/reference/react-dom/components/link#special-rendering-behavior)[differently](https://react.dev/reference/react-dom/components/link#special-rendering-behavior) from other links.
These props apply when rel="stylesheet":
- precedence: a string. Tells React where to rank the <link> DOM node relative to others in the document <head>, which determines which stylesheet can override the other. React will infer that precedence values it discovers first are “lower” and precedence values it discovers later are “higher”. Many style systems can work fine using a single precedence value because style rules are atomic. Stylesheets with the same precedence go together whether they are <link> or inline <style> tags or loaded using [preinit](https://react.dev/reference/react-dom/preinit) functions.
- media: a string. Restricts the stylesheet to a certain [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).
- title: a string. Specifies the name of an [alternative stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets).
These props apply when rel="stylesheet" but disable React’s[link](https://react.dev/reference/react-dom/components/link#special-rendering-behavior)[special treatment of stylesheets](https://react.dev/reference/react-dom/components/link#special-rendering-behavior):
- disabled: a boolean. Disables the stylesheet.
- onError: a function. Called when the stylesheet fails to load.
- onLoad: a function. Called when the stylesheet finishes being loaded.
These props apply when rel="preload" or rel="modulepreload":
- as: a string. The type of resource. Its possible values are audio, document, embed, fetch, font, image, object, script, style, track, video, worker.
- imageSrcSet: a string. Applicable only when as="image". Specifies the [source set of the image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
- imageSizes: a string. Applicable only when as="image". Specifies the [sizes of the image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
These props apply when rel="icon" or rel="apple-touch-icon":
- sizes: a string. The [sizes of the icon](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
These props apply in all cases:
- href: a string. The URL of the linked resource.
- crossOrigin: a string. The [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) to use. Its possible values are anonymous and use-credentials. It is required when as is set to "fetch".
- referrerPolicy: a string. The [Referrer header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#referrerpolicy) to send when fetching. Its possible values are no-referrer-when-downgrade (the default), no-referrer, origin, origin-when-cross-origin, and unsafe-url.
- fetchPriority: a string. Suggests a relative priority for fetching the resource. The possible values are auto (the default), high, and low.
- hrefLang: a string. The language of the linked resource.
- integrity: a string. A cryptographic hash of the resource, to [verify its authenticity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
- type: a string. The MIME type of the linked resource.
Props that are **not recommended** for use with React:
- blocking: a string. If set to "render", instructs the browser not to render the page until the stylesheet is loaded. React provides more fine-grained control using Suspense.
#### **Special rendering behavior **
React will always place the DOM element corresponding to the <link> component within the document’s <head>, regardless of where in the React tree it is rendered. The <head> is the only valid place for <link> to exist within the DOM, yet it’s convenient and keeps things composable if a component representing a specific page can render <link> components itself.
There are a few exceptions to this:
- If the <link> has a rel="stylesheet" prop, then it has to also have a precedence prop to get this special behavior. This is because the order of stylesheets within the document is significant, so React needs to know how to order this stylesheet relative to others, which you specify using the precedence prop. If the precedence prop is omitted, there is no special behavior.
- If the <link> has an [itemProp](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) prop, there is no special behavior, because in this case it doesn’t apply to the document but instead represents metadata about a specific part of the page.
- If the <link> has an onLoad or onError prop, because in that case you are managing the loading of the linked resource manually within your React component.
#### **Special behavior for stylesheets **
In addition, if the <link> is to a stylesheet (namely, it has rel="stylesheet" in its props), React treats it specially in the following ways:
- The component that renders <link> will [suspend](https://react.dev/reference/react/Suspense) while the stylesheet is loading.
- If multiple components render links to the same stylesheet, React will de-duplicate them and only put a single link into the DOM. Two links are considered the same if they have the same href prop.
There are two exception to this special behavior:
- If the link doesn’t have a precedence prop, there is no special behavior, because the order of stylesheets within the document is significant, so React needs to know how to order this stylesheet relative to others, which you specify using the precedence prop.
- If you supply any of the onLoad, onError, or disabled props, there is no special behavior, because these props indicate that you are managing the loading of the stylesheet manually within your component.
This special treatment comes with two caveats:
- React will ignore changes to props after the link has been rendered. (React will issue a warning in development if this happens.)
- React may leave the link in the DOM even after the component that rendered it has been unmounted.
## **Usage **
### **Linking to related resources **
You can annotate the document with links to related resources such as an icon, canonical URL, or pingback. React will place this metadata within the document <head> regardless of where in the React tree it is rendered.
App.jsShowRenderedHTML.js
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
import ShowRenderedHTML from './ShowRenderedHTML.js';
export default function BlogPage() {
return (
<ShowRenderedHTML>
<link rel="icon" href="favicon.ico" />
<link rel="pingback" href="http://www.example.com/xmlrpc.php" />
<h1>My Blog</h1>
<p>...</p>
</ShowRenderedHTML>
);
}
### **Linking to a stylesheet **
If a component depends on a certain stylesheet in order to be displayed correctly, you can render a link to that stylesheet within the component. Your component will[link](https://react.dev/reference/react/Suspense)[suspend](https://react.dev/reference/react/Suspense) while the stylesheet is loading. You must supply the precedence prop, which tells React where to place this stylesheet relative to others — stylesheets with higher precedence can override those with lower precedence.
### **Note**
When you want to use a stylesheet, it can be beneficial to call the[link](https://react.dev/reference/react-dom/preinit)[preinit](https://react.dev/reference/react-dom/preinit) function. Calling this function may allow the browser to start fetching the stylesheet earlier than if you just render a <link> component, for example by sending an[link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)[HTTP Early Hints response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103).
App.jsShowRenderedHTML.js
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
import ShowRenderedHTML from './ShowRenderedHTML.js';
export default function SiteMapPage() {
return (
<ShowRenderedHTML>
<link rel="stylesheet" href="sitemap.css" precedence="medium" />
<p>...</p>
</ShowRenderedHTML>
);
}
### **Controlling stylesheet precedence **
Stylesheets can conflict with each other, and when they do, the browser goes with the one that comes later in the document. React lets you control the order of stylesheets with the precedence prop. In this example, three components render stylesheets, and the ones with the same precedence are grouped together in the <head>.
App.jsShowRenderedHTML.js
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
import ShowRenderedHTML from './ShowRenderedHTML.js';
export default function HomePage() {
return (
<ShowRenderedHTML>
<FirstComponent />
<SecondComponent />
<ThirdComponent/>
...
</ShowRenderedHTML>
);
}
function FirstComponent() {
return <link rel="stylesheet" href="first.css" precedence="first" />;
}
function SecondComponent() {
return <link rel="stylesheet" href="second.css" precedence="second" />;
}
function ThirdComponent() {
return <link rel="stylesheet" href="third.css" precedence="first" />;
}
Show more
Note the precedence values themselves are arbitrary and their naming is up to you. React will infer that precedence values it discovers first are “lower” and precedence values it discovers later are “higher”.
### **Deduplicated stylesheet rendering **
If you render the same stylesheet from multiple components, React will place only a single <link> in the document head.
App.jsShowRenderedHTML.js
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
import ShowRenderedHTML from './ShowRenderedHTML.js';
export default function HomePage() {
return (
<ShowRenderedHTML>
<Component />
<Component />
...
</ShowRenderedHTML>
);
}
function Component() {
return <link rel="stylesheet" href="styles.css" precedence="medium" />;
}
### **Annotating specific items within the document with links **
You can use the <link> component with the itemProp prop to annotate specific items within the document with links to related resources. In this case, React will *not* place these annotations within the document <head> but will place them like any other React component.
<section itemScope>
<h3>Annotating specific items</h3>
<link itemProp="author" href="http://example.com/" />
<p>...</p>
</section>
