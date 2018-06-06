import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../components/panel';

ReactDOM.render(
    <div style={{ width: '400px' }}>
        <Panel color="red" icon="star" />
        <Panel color="blue" icon="chatboxes" />
        <Panel color="green" />
    </div>,
    document.getElementById('app')
);
