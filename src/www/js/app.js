import keyMirror from 'key-mirror';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const actionTypes = keyMirror({
    ADD: null,
    SUBTRACT: null,
    MULTIPLY: null,
    DIVIDE: null,
});


const reducer = (state = { result: 0 }, action) => {

    switch(action.type) {
        case actionTypes.ADD:
            return Object.assign({}, state, { result: state.result + action.value });
        case actionTypes.SUBTRACT:
            return Object.assign({}, state, { result: state.result - action.value });
        case actionTypes.MULTIPLY:
            return Object.assign({}, state, { result: state.result * action.value });
        case actionTypes.DIVIDE:
            return Object.assign({}, state, { result: state.result / action.value });
        default:
            return state;
    }

};


// const createStore = (reducerFn, initialState) => {

//     let state = initialState || undefined;
//     const callbacks = [];

//     return {
//         getState: () => { return state; },
//         dispatch: action => {
//             state = reducerFn(state, action);
//             callbacks.forEach(cb => cb());
//         },
//         subscribe: cb => {
//             callbacks.push(cb);
//         },
//     };

// };

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState());
});

const addActionCreator = value => ({ type: actionTypes.ADD, value });
const subtractActionCreator = value => ({ type: actionTypes.SUBTRACT, value });
const multiplyActionCreator = value => ({ type: actionTypes.MULTIPLY, value });
const divideActionCreator = value => ({ type: actionTypes.DIVIDE, value });

// const bindActionCreators = (actionCreators, dispatch) => {

//     let actions = {};

//     Object.keys(actionCreators).forEach(actionKey => {
//         actions[actionKey] = (...params) => {
//             dispatch(actionCreators[actionKey](...params));
//         };
//     });

//     return actions;
// };

const add = value => {

    return dispatch => {

        // return fetch('http://localhost:3010/books')
        //     .then(res => res.json())
        //     .then(results => dispatch(actionCreator(results)));

        return new Promise(resolve => {

            setTimeout(() => {
                resolve(value);
            },  2000);

        }).then(result => dispatch(addActionCreator(result)));

    };

};

// const actions = bindActionCreators({
//     add,
//     subtract: subtractActionCreator,
//     multiply: multiplyActionCreator,
//     divide: divideActionCreator,
// }, store.dispatch);

// Redux

// ----------------- DMZ -------------------

// React

// add(1);
// subtract(2);
// add(3);
// subtract(4);
// add(5);

export class MyCalculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
    }

    onChange = e => {
        this.setState({
            [e.currentTarget.name]: parseInt(e.currentTarget.value),
        });
    }

    render() {
        return <form>
            <input type="number" value={this.state.value} name="value" onChange={this.onChange} /><br />
            <button type="button" onClick={() => this.props.add(this.state.value).then(() => { console.log('added'); })}>Add</button> 
            <button type="button" onClick={() => this.props.subtract(this.state.value)}>Subtract</button> 
            <button type="button" onClick={() => this.props.multiply(this.state.value)}>Multiply</button> 
            <button type="button" onClick={() => this.props.divide(this.state.value)}>Divide</button><br />
            Result: {this.props.result}
        </form>;
    }


}

// redux state
// props of the root presentational component
const mapStateToProps = state => ({
    result: state.result,
});

// redux action creators and ability to dispatch
// props of the root presentational component
const mapDispatchToProps = dispatch => bindActionCreators({
    add,
    subtract: subtractActionCreator,
    multiply: multiplyActionCreator,
    divide: divideActionCreator,
}, dispatch);

// const connect = (mapStateToProps, mapDispatchToProps) => {

//     return PresentationalComponent => {

//         return class ContainerComponent extends React.Component {

//             static propTypes = {
//                 store: PropTypes.object.isRequired,
//             };

//             constructor(props) {
//                 super(props);

//                 this.actions = mapDispatchToProps(props.store.dispatch);
//             }

//             componentDidMount() {
//                 this.unsubscribeFromStore = this.props.store.subscribe(() => {
//                     this.forceUpdate();
//                 });
//             }

//             componentWillUnmount() {
//                 this.unsubscribeFromStore();
//             }

//             render() {

//                 const stateToProps = mapStateToProps(this.props.store.getState());

//                 return <PresentationalComponent {...this.actions} {...stateToProps} />;

//             }

//         };

//     };

// };

const MyCalculatorContainer = connect(mapStateToProps, mapDispatchToProps)(MyCalculator);


ReactDOM.render(
    <MyCalculatorContainer store={store} />,
    document.querySelector('main')
);




// store.subscribe(() => {

//     ReactDOM.render(<MyCalculator {...actions} result={store.getState().result} />,
//     document.querySelector('main'));

// });

// store.dispatch({ type: 'noop' });

// GET
fetch('http://localhost:3010/books').then(res => res.json()).then(results => console.log(results));

// POST
fetch('http://localhost:3010/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Candide', category: 'Philosophy', price: 0.05, authorId: 1 })
}).then(() => fetch('http://localhost:3010/books')).then(res => res.json()).then(books => console.log(books));