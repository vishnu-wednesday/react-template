import { createBrowserHistory } from 'history';
// eslint-disable-next-line no-unused-vars
const baseUrl = process.env.NODE_ENV === 'production' ? '/react-template' : '/';
const history = createBrowserHistory();
export default history;
