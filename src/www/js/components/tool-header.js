import React from 'react';
import PropTypes from 'prop-types';

export class ToolHeader extends React.Component {

    static propTypes = {
        header: PropTypes.string.isRequired,
    };

    // static defaultProps = {
    //     header: 'Tool Header',
    // }

    render() {

        return <header>
            <h1>{this.props.header}</h1>
        </header>;
    }

}