import {useEffect, VFC} from 'react';
import {RecoilRoot} from 'recoil';

import {GpsProvider} from '../GpsContext';
import {ResponsiveProvider} from '../ResponsiveContext';
import {SyncedProvider} from '../SyncedContext';

import {Loader} from './Loader';
import {DefineViewport} from './DefineViewport';

export const App: VFC = () => {
  useEffect(() => {
    // Not a debug console, just to let console people I know wussup
    console.log(`oh? you are here, mhm, there are ways to reach that button`);
  }, []);

  return (
    <RecoilRoot>
      <GpsProvider>
        <ResponsiveProvider>
          <SyncedProvider>
            <DefineViewport>
              <Loader />
            </DefineViewport>
          </SyncedProvider>
        </ResponsiveProvider>
      </GpsProvider>
    </RecoilRoot>
  );
};
