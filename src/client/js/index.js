// import '../scss/index.sass';

import React from 'react';
import Application from './components/Application';
import {Provider} from 'react-redux';

import configureStore from './rootStore';
import {render} from 'react-dom';

const store = configureStore({});

render(
    <Provider store={store}><Application/></Provider>,
    document.getElementById('app')
);