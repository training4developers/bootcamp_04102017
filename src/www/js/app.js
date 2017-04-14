import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class ColorTool extends React.Component {

    render() {
        // return React.createElement('h1', null, 'Hello World');

        // <h1>Hello World</h1>
        return <div>
            <h1>Color Tool</h1>
            <ul>
                <li>green</li>
                <li>white</li>
                <li>saffron</li>
                <li>red</li>
                <li>blue</li>
                <li>black</li>
            </ul>
        </div>;
    }

}

ReactDOM.render(<ColorTool />, document.querySelector('main'));