import {createRoot} from 'react-dom/client';

import './spa';

import {App} from './App';
import './style';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
