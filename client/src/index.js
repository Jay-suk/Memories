import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from "@react-oauth/google";

import reducers  from './reducers';
import App from './App';  
import './index.css';

//creating redux store and applying thunk middleware to handle side-effects and asynchronous operation
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));

//rendering App component into HTML element with id root
//provider component -- to wrap the react application and provide acces to redux store
root.render(
    <GoogleOAuthProvider clientId="74316202020-t05kvfljfkjkoansmf3s4rko11c6076f.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
    );