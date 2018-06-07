import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../components/panel';
import './index.css';

ReactDOM.render(
    <div className="app" style={{ width: '400px' }}>
        <div className="first-usage">
            <Panel color="green">
                <p>This is some test data</p>
            </Panel>
        </div>
        <div className="second-usage">
            <Panel color="red" icon="flower">
                <p>This is a little bit more test data</p>
            </Panel>
        </div>
        <div className="third-usage">
            <Panel color="blue" icon="contact">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    sagittis leo lacinia, condimentum nisl vel, sollicitudin
                    augue. Vestibulum nulla felis, vehicula non enim ut, ornare
                    fermentum magna. Nullam tincidunt tempus elit.
                </p>
                <p>
                    Sed eu placerat mauris, vel porttitor arcu. Phasellus quis
                    consequat augue, laoreet rutrum magna. Suspendisse quis
                    mollis ipsum, sed tempor nisl.
                </p>
            </Panel>
        </div>
    </div>,
    document.getElementById('app')
);
