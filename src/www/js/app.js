import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
    ADD: null,
    SUBTRACT: null,
});


const reducer = (state = { result: 0 }, action) => {

    switch(action.type) {
        case actionTypes.ADD:
            return Object.assign({}, state, { result: state.result + action.value });
        case actionTypes.SUBTRACT:
            return Object.assign({}, state, { result: state.result - action.value });
        default:
            return state;
    }

};


const createStore = reducerFn => {

    let state = undefined;
    const callbacks = [];

    return {
        getState: () => { return state; },
        dispatch: action => {
            state = reducerFn(state, action);
            callbacks.forEach(cb => cb());
        },
        subscribe: cb => {
            callbacks.push(cb);
        },
    };

};

const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});

const addActionCreator = value => ({ type: actionTypes.ADD, value });
const subtractActionCreator = value => ({ type: actionTypes.SUBTRACT, value });

const bindActionCreators = (actionCreators, dispatch) => {

    let actions = {};

    Object.keys(actionCreators).forEach(actionKey => {
        actions[actionKey] = (...params) => {
            dispatch(actionCreators[actionKey](...params));
        };
    });

    return actions;
};

const { add, subtract } = bindActionCreators({
    add: addActionCreator,
    subtract: subtractActionCreator
}, store.dispatch);

// ----------------- DMZ -------------------
add(1);
subtract(2);
add(3);
subtract(4);
add(5);
