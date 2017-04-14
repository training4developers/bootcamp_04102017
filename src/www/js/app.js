import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class ColorTool extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newColor: '',
        };

        // this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [ e.currentTarget.name ]: e.currentTarget.value,
        });
    } 

    render() {
        return <div>
            <h1>{this.props.header}</h1>
            <ul>
                {this.props.colors.map(color => <li>
                    {color}
                </li>)}
            </ul>
            <form>
                <label htmlFor="new-color-input">New Color:</label>
                <input type="text" id="new-color-input" name="newColor"
                    value={this.state.newColor} onChange={this.onChange} />
            </form>
        </div>;
    }

}

const colors = [ 'green', 'white', 'saffron', 'red', 'blue', 'black' ];

ReactDOM.render(<ColorTool header='Color Tool!!!' colors={colors}  />, document.querySelector('main'));