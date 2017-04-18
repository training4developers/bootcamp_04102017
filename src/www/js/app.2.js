import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class Top extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log('top constructor');
    }

    componentWillMount() {
        console.log('top component will mount');
    }

    componentDidMount() {
        console.log('top component did mount');
    }

    componentWillUpdate() {
        console.log('top component will update');
    }

    componentDidUpdate() {
        console.log('top component did update');
    }

    componentWillUnmount() {
        console.log('top component will unmount');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //return this.props.nums !== nextProps.nums;
    //     return true;
    // }

    render() {

        console.log('top render');
        return <div>
            <Middle />
            <ul>
                {this.props.nums.map(num => <li>{num}</li>)}
            </ul>
        </div>;
    }

}

class Middle extends React.Component {

    constructor(props) { 
        super(props);
        console.log('middle constructor');
    }

    componentWillMount() {
        console.log('middle component will mount');
    }

    componentDidMount() {
        console.log('middle component did mount');
    }

    componentWillUpdate() {
        console.log('middle component will update');
    }

    componentDidUpdate() {
        console.log('middle component did update');
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }    
    
    render() {
        console.log('middle render');
        return null;
    }
}

let nums = [ 1,2,3,4 ];

console.log('react dom render');
ReactDOM.render(<Top appName="Test" nums={nums}  />, document.querySelector('main'));

nums = nums.concat(5);

setTimeout(() => {
    console.log('react dom render');
    ReactDOM.render(<h1>Time for a break!</h1>, document.querySelector('main'));
}, 3000);