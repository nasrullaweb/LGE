import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './components/App';
import 'antd/dist/antd.less'; // Import Ant Design styles by less entry
import './variable.less'
// import 'your-theme-file.less'; // variables to override above
//import * as serviceWorker from './serviceWorker';
import HttpsRedirect from 'react-https-redirect';

import configureStore from './store/configureStore'
import { BoldOutlined } from '@ant-design/icons';
const store = configureStore()
const rootEl = document.getElementById('root')

ReactDOM.render(
    <HttpsRedirect>
        <Provider store={store}>
            <App />
        </Provider>
    </HttpsRedirect>
    , rootEl
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
