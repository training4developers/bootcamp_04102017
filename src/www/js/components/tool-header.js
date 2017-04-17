import React from 'react';

export class ToolHeader extends React.Component {

    render() {

        return <header>
            <h1>{this.props.header}</h1>
        </header>;
    }

}