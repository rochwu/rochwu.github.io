import {render} from 'react-dom';

import './spa';

import {App} from './App';
import './style';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
