//files imported -- app.js , /reducers/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//importing the reducers
import reducers  from './reducers';
//importing App component
import App from './App';  
import './index.css';

//create a redux store and apply the thunk middleware to handle side-effects and asynchronous operation
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//render the App component into the HTML element with id root
//provider component -- to wrap the react application and provide acces to redux store
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );