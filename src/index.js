import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Routes from './Routes';
import SamplePage from './SamplePage';
import App from './App';
import BasePage from './BasePage';

//Add routes here
ReactDOM.render(<BasePage />,document.getElementById('root'));
registerServiceWorker();

