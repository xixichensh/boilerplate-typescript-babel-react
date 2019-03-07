import "reset";
import "app";

import "jquery";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from 'react-hot-loader';
import Root from './views/root';
import { Provider } from 'react-redux';
import store from './redux/store';


const renderIndex = (Component: any) => {

    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
    
};

renderIndex(Root);

// Hot Module Replacement API
declare const module: { hot: any };

if (module.hot) {
    module.hot.accept(() => renderIndex(Root));
}