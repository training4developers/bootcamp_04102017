import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { ToolHeader } from './components/tool-header';
import { UnorderedItemList } from './components/unordered-item-list';

class ColorTool extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newColor: '',
            colors: props.colors.concat(),
        };

        // this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [ e.currentTarget.name ]: e.currentTarget.value,
        });
    } 

    onClick = () => {
        this.setState({
            colors: this.state.colors.concat(this.state.newColor),
        });
    }

    componentDidMount() {
        this.newColorInput.focus();
    }

    render() {
        return <div>
            <ToolHeader header={'List of Intuit\'s Favorite Colors'} />
            <UnorderedItemList items={this.state.colors} />
            <form className="my-class">
                <label htmlFor="new-color-input">New Color:</label>
                <input type="text" id="new-color-input" name="newColor"
                    value={this.state.newColor} onChange={this.onChange}
                    ref={c => this.newColorInput = c}
                    />
                <button type="button" onClick={this.onClick}>Add Color</button>
            </form>
        </div>;
    }

}

// <div dangerouslySetInnerHTML={({ __html: '<script>console.log(0);</script>'})}></div>

const colors = [ 'green', 'white', 'saffron', 'red', 'blue', 'black' ];

ReactDOM.render(<ColorTool header='Color Tool!!!' colors={colors}  />, document.querySelector('main'));