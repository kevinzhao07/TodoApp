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

### Continuing, adding Context
Context is a way to pass down data/variables to components that may be multiple levels deep instead of passing them through props. We have a projects context because we want to modify our projects list in multiple locations. It seems easier to export the context one time rather than pass it in through props in multiple levels.

To have context between mulitple componenets, we have to have a `provider` and a `consumer`. The provider exists at the top level and is consumed at the bottom level. The context is exported by the provider and then imported by each consumer. We do the exporting here in `context/index.js`. The context also exports a hook, allowing whichever consumer it encounters to modify `projects` if they'd like. 

We want to change which project we are selecting in the sidebar. Therefore, we need to use the context for `Selected Project` in order to access those variables. In this file, there are a lot of hooks that are mainly for keeping track of creating projects and which projects that are selected. 

### Building the Projects Component
After our context has been written, we have to continue with building the Project component. This will be used in our sidebar to display all the projects that we currently have so far, and can also be used to toggle between the selected project (and what's displayed on the main section). We will use a few react hooks and will be importing the context that we previously created. This allows us to change the value of the variables `activeProject` and `projects`, in case a few are created or deleted. 
> note that an error regarding requiring indeces can be easily fixed by creating indeces in the firebase website. This is usually caused by using `orderBy()` without having indeces. However, creating the indeces is as simple as following a few instructions on their website and clicking a few buttons. 

### Individual Projects
React is all about individual control. We want to have as much control of our project as we would like, and building individual components for each `Project` is a good start. This way, we can target updates for each specific project without the need of mapping all projects every time. We will have individual components so it is easy to delete specific projects. Inside this component, we bulit a delete project button that allows for users to delete projects. It gets the database through firebase. 
> we will add more styling into `App.scss` in order to correctly style the rest of our application. 

### Individual Tasks
Again, relying on the powerfulness of individuality, we are going to build individual tasks. This is because we may want to do something specific to each task and cannot rely on refreshing all the tasks every time one of them changes. The tasks will be filtered and only the ones that are chosen will be shown in the main content. There are small checkboxes next to each task that will archive them as they are completed. 
> most of what are buildling is using the same syntax and content-- using context, updating using hooks, etc. 

### Adding Projects
We are going to be buliding a component which allows us to add projects within our React app. This will include modifying the firebase. The code is written and commented inside `AddProject.js`. The code for this is pretty short, just calling in firebase, adding it into the database, and refreshing what we have for now. The trickier parts is to make sure everything is imported as needed, and the `onClick` and `onChanges` are correctly written. 

### Adding Tasks
This component will allow us to add tasks into our React app. Evidently, the functionality between the two will remain largely similar and calling firebase will be necessary. Again, the code will be written and commented inside `AddTask.js`. This is a more complicated component with more parts. This is because when adding a task, we have a choice for which project it belongs to as well as which date it should be associated with. Both these must be selected through drop down menus, which are components in and of themselves. Also, we have to keep track of variables that either display those overlays or not. All in all, it is a pretty complicated component where keeping track of seeing the overlay is key. 
> the two main items that we have to further add for `AddTask.js` is the `ProjectOverlay.js` and `TaskDate.js`. this is because each will be a separate component that renders only if it is pressed. for the overlay, a nice list of all the projects to choose from will be dispalyed, and for task date, a calendar will pop up to ask the user to choose a time. each code is written and commented in their respective component file. 

## After the Tutorial

### Small Changes
1. I want to be able to see which project I selected and have it presented to me. The other way around was too confusing.

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

**When to use {}**  
`{}` are a hard thing to understand when it comes to using them within React functions. For example, the two code snippets below are NOT identical:
```js
export const getTitle = (projects, projectId) => 
  projects.find(project => project.projectId === projectId);

export const getTitle = (projects, projectId) => {
  projects.find(project => project.projectId === projectId);
}
```
When we intentionally use `{}`, we are omitting that hidden return statement in the first code block. We are using an arrow function, so it assumes to return whatever evaluates from our next line of code. This is a shortcut and can be used when we are sure to return an expression afterwards. However, the second code snipped intentionally adds back the `{}`, which means we must explicitly add our `return ();` statement as well. As it is right now, these two code snippets have very different functionalities. 

**If then statements inside components**  
There's an interesting new syntax for React that helps with writing if-then/if-else statements. This is mostly seen when writing a function inside a component that will use that function. It is often seen as this:
```js
const addProject = () => {
    projectName && // this basically means if projectName exists, then... 
  }
```
The `&&` symbols gives the "then" keyword, and there is an implicit `if` that asks if the projectName exists.

This also works when we are writing JSX and are trying to render elements based on whether a certain variable is true or not. For example, this syntax is also valid inside a return statement as shown below:
```js
{ showAddTaskMain && ( // asking is showAddTaskMain true? if so, then render the rest of the elements (surrounded by ()).
  <div className="add-task_shallow" data-testid="show-main-action" onClick={() => setShowMain(!showMain)}>
    ...
  </div>
)}
```

**Obtaining values from Inputs**  
React has a way to get user inputted values from forms. In any HTML element, we have to add our desired characteristics. Example below:
```html
<input 
  class="randomClass"
  value={VARIABLE-NAME-HERE}
  onChange={e => setProjectName(e.target.value)}
>
```
If we enclose which variable we want to use inside curly braces and put it inside value. When we submit the form (or press enter) the variable will update to have that current value. 

**Iterating through all Objects in an Array**  
Unlike Django/Jinja, we aren't able to use `{% for %}` keywords. There is another syntax that we use to map over items in an array that we want to display. This is seen in `Sidebar.js` and `ProjectOverlay.js`, where we have to display all projects/tasks for the user to see. The syntax is below:
```js
{projects.map(project => ( // map is the keyword that iterates through every item, project is the specified var name.
  <li> Do stuff with project here. </li> // each project inside projects will do this.
))};
```