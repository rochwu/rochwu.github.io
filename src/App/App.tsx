import {VFC} from 'react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter} from 'react-router-dom';

import {GpsProvider} from '../GpsContext';
import {ResponsiveProvider} from '../ResponsiveContext';
import {SyncedProvider} from '../SyncedContext';
import {NightTheme} from '../StyledContext';

import {Loader} from './Loader';
import {DefineViewport} from './DefineViewport';

export const App: VFC = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <GpsProvider>
          <ResponsiveProvider>
            <SyncedProvider>
              <NightTheme>
                <DefineViewport>
                  <Loader />
                </DefineViewport>
              </NightTheme>
            </SyncedProvider>
          </ResponsiveProvider>
        </GpsProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};
