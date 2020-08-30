import { createStore } from 'redux';

const initialState = {};
function reducer(state = initialState, action) {
     switch (action.type) {
        case "CHANGE_DATA":
             return { ...state, ...action.payload };
        default:
            return state;
     }
}

export function createClientStore() {
    return createStore(reducer, { data: window.REDUX_STORE });
}

export function createServerStore() {
    return createStore(reducer);
}