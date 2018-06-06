import React from 'react';
import PropTypes from 'prop-types';
import './panel.css';

const getColorHex = color => {
    if (color === 'red') {
        return '#ad4343';
    } else if (color === 'green') {
        return '#58ad43';
    }
    return '#437bad';
};

const Panel = props => {
    const colorHex = getColorHex(props.color);
    return (
        <div className="panel">
            <div
                className="panel-heading"
                style={{ backgroundColor: colorHex }}
            >
                <span className="icon">
                    <ion-icon name={props.icon} />
                </span>
                <h1 className="title">Panel name</h1>
            </div>
            <div className="panel-body">fff</div>
        </div>
    );
};

Panel.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string
};

export default Panel;
