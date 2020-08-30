import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from '../shared/App';
import { createClientStore } from '../shared/store';
import { Provider } from 'react-redux';
const store = createClientStore();

ReactDOM.hydrate((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));