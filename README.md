# LokalPortal Coding Challenge
TLDR:
`yarn install && yarn storybook`
or
`npm install && npm run storybook`

## Task (copied verbatim)
The notification widget
We want to have a small library that will allow us to show notifications on the user's browser. 

A call to the notification api should get the following params:

1. Message to show the user
2. Position: Should show itself in any corner of the screen, depends on the parameter provided (topleft (tl), bottomright (br)...)
3. Type: Should have 3 types of notifications: alert, info and warning. Each should have a different color.

So it could look like this:

Specifications:

1. Please use Typescript and React.
2. The notification should disappear after x seconds
3. If more than 1 is being presented in the same time - just show them on on top / below the other.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Solution
* a `Notification` component for the UI of each message. Basically a thin wrapper around Bootstrap's `.alert`
* a `Notifications` component which can be used to show notifications but centralize them in one DOM node, including some helpers for accessibility

You would use the library like this:
```javascript
<Notifications messages={...} />
```
and everything will be handled for you.
You can customize the appearance of notifications by supplying additional props:
```typescript
export interface Notification {
    type: "primary" | "danger" | "info" | "warning",
    message: string,
    dismissable?: boolean,
    elementType?: "div" | "li",
    key?: string
}

interface Notifications {
    messages: NotificationP[],
    position: 'tl' | 'tr' | 'bl' | 'br',
    timeout?: number | 1000
}
```
where `Notification` describes each message, and `Notifications` the aspects of handling all of them.

You can explore this by running `yarn storybook` and using the stories provided there.

## Setup, etc.
The project is bootstrapped using Create React App.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
