import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers  from './reducers';

//importing App component
import App from './App';  

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//render the App component into the HTML element with id root
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );