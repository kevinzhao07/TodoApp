# React
This is a simple app that is insipred by [todoist](https://todoist.com/). It has many of the similar functionalities as well as newer ones. The tutorial that I've followed is [here](https://youtu.be/HgfA4W_VjmI), but after this, I've made my own modifications to truly make this my own project. 

This will be a tutorial document explaining best practices of React, as well as how this project was built. The project requires maintaining a database for each todo value, as well as testing. 

## Getting Started
Most files that come with the app are not useful to us. The main files and folders we should have are:
- `Components/` inside `src/`, where we will house all our separate components that exist in our React app
- `__tests__` for unit and production testing, making sure that all the functionalities of our website work as expected
- `layouts/` for unchanging components, like the header, sidebar, etc. 
- `hooks/`, `context/`, `helpers/`, and `constants/` are necessary for this project.
- `index.js` is going to be our most used file, so add one in every folder previously created. 

> what are hooks? they allow for updating of elements using a new specified syntax. it is set as `const [val, updateVal] = useState(0);`. this shows that the variable in question is val, the updateVal is a function to update the val, and the useState is used to initiailze the variable. 

From `package.json` remove 
```json 
  "eslintConfig": {
    "extends": "react-app"
  },
```
as it is not necessary for this project (didn't go into detail, said something about running a "global linker")

use `npm install react-icons --save` to get the same icons as fontawesome!

## Building the App
We can start by building the most basic and static sections in our `layouts/`. Each component will be named a `[COMPONENT].js`, and will contain in-line exports.  

**Make sure that each `.js` file imports React, as it is a common import that everyone forgets.**

> by exporting each component, they can then be called as a **named export** in other files. we see this happen with header being adopted in `App.js`. 

We start with building:
- Header in `Header.js`
- Content in `Content.js`
- Sidebar in `Sidebar.js`

### Creating the Database
To have our app work well, we must have a database to store all our notes and todo items. To accomplish this, we will be using `firebase.js`, which is a database primarily used by react developers. 

The firebase comes with a lot of inputs, which are below:
```js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '', 
  projectId: '', 
  storageBucket: '', 
  messageSenderId: '', 
  apiId: '', 
});

// afterwards, we want to export this component
export { firebaseConfig as firebase };
```

The `firebaseConfig` does come with a lot of keys, but they will be filled in later. To use `firebase`, there are a lot of dependencies. Because we don't want to write them all out, we will add `firebase` into our dependencies in `package.json`. 
> `"firebase": "^6.2.4",`

We also want to add a dependency for `node-sass`:
> `"node-sass": "^4.12.0",`

**Make sure you have an account with [firebase](https://console.firebase.google.com)!** 

After making an account and signing up, create a database, and then a firestore database (at any location). Following the tutorial, we create three collections, projects, tasks, and users. These are the collections we will reference while building our project. After registering our project as a web app, we are given the `firebaseConfig` as seen above. These can just be copy and pasted right into the code. That is all for firebase!

### Explanation of Hooks
Hooks are the new and important thing to learn in React. They're an easier way to update states of Components, requiring much shorter code and eliminiating the `super(props);` call that everyone seems to forget. They are also preferred over older styles of updating Components. For most projects, `useState` and `useEffect` are necessary, as `useState` allows for setting values to variables, and `useEffect` allows for updating the UI in case of database changes, etc. 

We are not limited to the simple hooks provided by React, as we are going to implement our own custom hooks. This will be implemented in `useEffect();`. The entire code is there and commented in `hooks/index.js`. `useEffect();` basically handles updating the states of Components when they are changed. 
> finishing this hook requires modifying `package.json`, `index.js` in `helpers/`, and `index.js` in `constants/`.

The rest of the hook is with modifying `unsubscribe` variable, and using a new method `onSnapshot` and `snapshot`. The code is detailed and commented in `hooks/`. 

Additionally, another hook is going to be created right after (`useProjects`)
> commented and explained in the codebase as well.

### Continuing Building
Next, we build the Tasks component that will be used in our `Content.js`. In this component, we are directly using variable values, and they are accessed by `{}` like in Django/Jinja.

there is no `{% for val in vals %}` like in jinja. In order to access ALL elements in an array, we have to use `tasks.map(task => ())`, putting whatever we need repeated inside `()`. 
> accessing variables/keys inside an element requires different syntax: {`` `${ [VARIABLE ID] }` ``}

Each tasks to clear requires a `Checkbox`. Because we want to archive the task that is related to each checkbox, we can pass in an argument `id`. To pass args into a component, the syntax goes: `export const [COMPONENT] = ([ARGUMENTS]) => { ... }`.

We want the `Checkbox` to call a function `onClick()` that will take the task and archive it. The syntax is: `onClick={([Args]) => [Function]}`. 

### Adding a bit of SASS 
To style our application, we will use CSS but an extension called sass/scss. This is a new way of writing CSS that includes indenting (to give styles to children elements of specific parent elements), as well as creating variables for commonly used styles and `mixins` for longer pieces of code that is used often throughout. There are a lot of special syntax that comes with using SASS:

1. Creating variables. Requires the syntax `$[NAME OF VARIABLE]: [ATTRIBUTE HERE];` Each variable is separated by whitespace, and you can create as many variables as you need. 
2. Mixins. These are large groups of CSS that usually work well together and is repeated throughout the project. They are created by writing `@mixin [NAME OF MIXIN]($[OPTIONAL PARAMTERS]) { ... }`. These optional parameters **must** have `$` before them to work. Also, they are able to have a default value if they are set like so: `$width: 400px`.
> to use either elements or mixins we have to use the keyword `@include [variable/mixin]`
3. Referencing classes of similar elements. `&` is an interesting keyword, and refers to different classes on similar elements. An example clears it up below:
```scss
div {
  &.logo {
    // code here
  }

  &.another {
    // code here
  }
}
```
vs.
```css
div.logo {
  /* code here */
}
div.another {
  /* code here */
}
```
There are also many useful keywords, like `first-of-type`, `svg`, `:nth-child(x)`, where x is the nth child.

## Peculiarities 
**Named Exports**  
Instead of importing `ReactDOM`, you can just import `{ render }`. This allows you to write `render` instead of `ReactDOM.render` everytime. These are called **named exports**.

**Inline Exports**  
Instead of exporting on a separate line, we can export inline. We are given `export default App` as starter code, but can remove that and `export const` the entire App. The syntax for the export are in two parts, below:

Export without variables inside:
```js
// with variables
export const [APP NAME] = () => {
    return (
        // HTML code here
    );
}

// without variables
export const [APP NAME] = () => (
    // HTML code here
);
```

The differences lie in whether or not `return` is necessary. According to the tutorial, this is just better practice. 