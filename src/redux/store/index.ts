import configureStore from './configureStore';

const store = configureStore((window as any).__REDUX_DATA__);

export default store;
