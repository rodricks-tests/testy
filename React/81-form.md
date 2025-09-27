# **<form>**
The[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[<form>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) lets you create interactive controls for submitting information.
<form action={search}>
<input name="query" />
<button type="submit">Search</button>
</form>
- [Reference](https://react.dev/reference/react-dom/components/form#reference)
  - [<form>](https://react.dev/reference/react-dom/components/form#form)
- [Usage](https://react.dev/reference/react-dom/components/form#usage)
  - [Handle form submission on the client](https://react.dev/reference/react-dom/components/form#handle-form-submission-on-the-client)
  - [Handle form submission with a Server Function](https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-function)
  - [Display a pending state during form submission](https://react.dev/reference/react-dom/components/form#display-a-pending-state-during-form-submission)
  - [Optimistically updating form data](https://react.dev/reference/react-dom/components/form#optimistically-updating-form-data)
  - [Handling form submission errors](https://react.dev/reference/react-dom/components/form#handling-form-submission-errors)
  - [Display a form submission error without JavaScript](https://react.dev/reference/react-dom/components/form#display-a-form-submission-error-without-javascript)
  - [Handling multiple submission types](https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types)
## **Reference **
### **<form>**** **
To create interactive controls for submitting information, render the[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[built-in browser](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[<form>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)[component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form).
<form action={search}>
<input name="query" />
<button type="submit">Search</button>
</form>
[See more examples below.](https://react.dev/reference/react-dom/components/form#usage)
#### **Props **
<form> supports all[link](https://react.dev/reference/react-dom/components/common#common-props)[common element props.](https://react.dev/reference/react-dom/components/common#common-props)
[action](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action): a URL or function. When a URL is passed to action the form will behave like the HTML form component. When a function is passed to action the function will handle the form submission in a Transition following[link](https://react.dev/reference/react/useTransition#exposing-action-props-from-components)[the Action prop pattern](https://react.dev/reference/react/useTransition#exposing-action-props-from-components). The function passed to action may be async and will be called with a single argument containing the[link](https://developer.mozilla.org/en-US/docs/Web/API/FormData)[form data](https://developer.mozilla.org/en-US/docs/Web/API/FormData) of the submitted form. The action prop can be overridden by a formAction attribute on a <button>, <input type="submit">, or <input type="image"> component.
#### **Caveats **
- When a function is passed to action or formAction the HTTP method will be POST regardless of value of the method prop.
## **Usage **
### **Handle form submission on the client **
Pass a function to the action prop of form to run the function when the form is submitted.[link](https://developer.mozilla.org/en-US/docs/Web/API/FormData)[formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) will be passed to the function as an argument so you can access the data submitted by the form. This differs from the conventional[link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action)[HTML action](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action), which only accepts URLs. After the action function succeeds, all uncontrolled field elements in the form are reset.
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
export default function Search() {
function search(formData) {
const query = formData.get("query");
alert(`You searched for '${query}'`);
}
return (
<form action={search}>
<input name="query" />
<button type="submit">Search</button>
</form>
);
}
### **Handle form submission with a Server Function **
Render a <form> with an input and submit button. Pass a Server Function (a function marked with[link](https://react.dev/reference/rsc/use-server)['use server'](https://react.dev/reference/rsc/use-server)) to the action prop of form to run the function when the form is submitted.
Passing a Server Function to <form action> allow users to submit forms without JavaScript enabled or before the code has loaded. This is beneficial to users who have a slow connection, device, or have JavaScript disabled and is similar to the way forms work when a URL is passed to the action prop.
You can use hidden form fields to provide data to the <form>’s action. The Server Function will be called with the hidden form field data as an instance of[link](https://developer.mozilla.org/en-US/docs/Web/API/FormData)[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData).
import { updateCart } from './lib.js';
function AddToCart({productId}) {
async function addToCart(formData) {
'use server'
const productId = formData.get('productId')
await updateCart(productId)
}
return (
<form action={addToCart}>
<input type="hidden" name="productId" value={productId} />
<button type="submit">Add to Cart</button>
</form>
);
}
In lieu of using hidden form fields to provide data to the <form>’s action, you can call the bind method to supply it with extra arguments. This will bind a new argument (productId) to the function in addition to the formData that is passed as an argument to the function.
import { updateCart } from './lib.js';
function AddToCart({productId}) {
async function addToCart(productId, formData) {
"use server";
await updateCart(productId)
}
const addProductToCart = addToCart.bind(null, productId);
return (
<form action={addProductToCart}>
<button type="submit">Add to Cart</button>
</form>
);
}
When <form> is rendered by a[link](https://react.dev/reference/rsc/use-client)[Server Component](https://react.dev/reference/rsc/use-client), and a[link](https://react.dev/reference/rsc/server-functions)[Server Function](https://react.dev/reference/rsc/server-functions) is passed to the <form>’s action prop, the form is[link](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)[progressively enhanced](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).
### **Display a pending state during form submission **
To display a pending state when a form is being submitted, you can call the useFormStatus Hook in a component rendered in a <form> and read the pending property returned.
Here, we use the pending property to indicate the form is submitting.
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
17
18
19
20
21
22
23
24
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";
function Submit() {
const { pending } = useFormStatus();
return (
<button type="submit" disabled={pending}>
{pending ? "Submitting..." : "Submit"}
</button>
);
}
function Form({ action }) {
return (
<form action={action}>
<Submit />
</form>
);
}
export default function App() {
return <Form action={submitForm} />;
}
Show more
To learn more about the useFormStatus Hook see the[link](https://react.dev/reference/react-dom/hooks/useFormStatus)[reference documentation](https://react.dev/reference/react-dom/hooks/useFormStatus).
### **Optimistically updating form data **
The useOptimistic Hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, this technique helps to make apps feel more responsive. When a user submits a form, instead of waiting for the server’s response to reflect the changes, the interface is immediately updated with the expected outcome.
For example, when a user types a message into the form and hits the “Send” button, the useOptimistic Hook allows the message to immediately appear in the list with a “Sending…” label, even before the message is actually sent to a server. This “optimistic” approach gives the impression of speed and responsiveness. The form then attempts to truly send the message in the background. Once the server confirms the message has been received, the “Sending…” label is removed.
App.jsactions.js
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
33
34
35
36
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";
function Thread({ messages, sendMessage }) {
const formRef = useRef();
async function formAction(formData) {
addOptimisticMessage(formData.get("message"));
formRef.current.reset();
await sendMessage(formData);
}
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
messages,
(state, newMessage) => [
...state,
{
text: newMessage,
sending: true
}
]
);
return (
<>
{optimisticMessages.map((message, index) => (
<div key={index}>
{message.text}
{!!message.sending && <small> (Sending...)</small>}
</div>
))}
<form action={formAction} ref={formRef}>
<input type="text" name="message" placeholder="Hello!" />
<button type="submit">Send</button>
</form>
</>
);
}
Show more
### **Handling form submission errors **
In some cases the function called by a <form>’s action prop throws an error. You can handle these errors by wrapping <form> in an Error Boundary. If the function called by a <form>’s action prop throws an error, the fallback for the error boundary will be displayed.
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
17
18
19
import { ErrorBoundary } from "react-error-boundary";
export default function Search() {
function search() {
throw new Error("search error");
}
return (
<ErrorBoundary
fallback={<p>There was an error while submitting the form</p>}
>
<form action={search}>
<input name="query" />
<button type="submit">Search</button>
</form>
</ErrorBoundary>
);
}
Show more
### **Display a form submission error without JavaScript **
Displaying a form submission error message before the JavaScript bundle loads for progressive enhancement requires that:
1. <form> be rendered by a [Server Component](https://react.dev/reference/rsc/use-client)
1. the function passed to the <form>’s action prop be a [Server Function](https://react.dev/reference/rsc/server-functions)
1. the useActionState Hook be used to display the error message
useActionState takes two parameters: a[link](https://react.dev/reference/rsc/server-functions)[Server Function](https://react.dev/reference/rsc/server-functions) and an initial state. useActionState returns two values, a state variable and an action. The action returned by useActionState should be passed to the action prop of the form. The state variable returned by useActionState can be used to display an error message. The value returned by the Server Function passed to useActionState will be used to update the state variable.
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
import { useActionState } from "react";
import { signUpNewUser } from "./api";
export default function Page() {
async function signup(prevState, formData) {
"use server";
const email = formData.get("email");
try {
await signUpNewUser(email);
alert(`Added "${email}"`);
} catch (err) {
return err.toString();
}
}
const [message, signupAction] = useActionState(signup, null);
return (
<>
<h1>Signup for my newsletter</h1>
<p>Signup with the same email twice to see an error</p>
<form action={signupAction} id="signup-form">
<label htmlFor="email">Email: </label>
<input name="email" id="email" placeholder="react@example.com" />
<button>Sign up</button>
{!!message && <p>{message}</p>}
</form>
</>
);
}
Show more
Learn more about updating state from a form action with the[link](https://react.dev/reference/react/useActionState)[useActionState](https://react.dev/reference/react/useActionState) docs
### **Handling multiple submission types **
Forms can be designed to handle multiple submission actions based on the button pressed by the user. Each button inside a form can be associated with a distinct action or behavior by setting the formAction prop.
When a user taps a specific button, the form is submitted, and a corresponding action, defined by that button’s attributes and action, is executed. For instance, a form might submit an article for review by default but have a separate button with formAction set to save the article as a draft.
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
export default function Search() {
function publish(formData) {
const content = formData.get("content");
const button = formData.get("button");
alert(`'${content}' was published with the '${button}' button`);
}
function save(formData) {
const content = formData.get("content");
alert(`Your draft of '${content}' has been saved!`);
}
return (
<form action={publish}>
<textarea name="content" rows={4} cols={40} />
<br />
<button type="submit" name="button" value="submit">Publish</button>
<button formAction={save}>Save draft</button>
</form>
);
}
