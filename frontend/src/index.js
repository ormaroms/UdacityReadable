import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(
      <div className="App">
                 <nav>
                    <div className="nav-wrapper tool-bar">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li key='Readable'>Readable</li>
                    </ul>
                        </div>
                    </nav>
            <App/>
         </div>,
    document.getElementById('root')
);
