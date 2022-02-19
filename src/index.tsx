import {render} from 'react-dom';
import {RecoilRoot} from 'recoil';
import './styles.css';

import App from './App';
import {GpsProvider} from './GpsContext';

const rootElement = document.getElementById('root');
render(
  <RecoilRoot>
    <GpsProvider>
      <App />
    </GpsProvider>
  </RecoilRoot>,
  rootElement,
);
