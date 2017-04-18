import React from 'react';
import PropTypes from 'prop-types';

export const ToolHeader = props => {

    const onClick = () => {
        console.log('clicked');
    };

    return <header>
        <h1 onClick={onClick}>{props.header}</h1>
    </header>;

};

ToolHeader.propTypes = {
    header: PropTypes.string.isRequired,
};

ToolHeader.defaultProps = {
    header: 'Tool Header',
};
