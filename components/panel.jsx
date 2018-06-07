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
        <div className="panel" style={{ borderColor: colorHex }}>
            <div
                className="panel-heading"
                style={{ backgroundColor: colorHex }}
            >
                {props.icon && (
                    <span className="panel-icon">
                        <ion-icon name={props.icon} />
                    </span>
                )}
                <h1 className="panel-title">My title</h1>
            </div>
            <div className="panel-body">{props.children}</div>
        </div>
    );
};

Panel.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.node
};

export default Panel;
