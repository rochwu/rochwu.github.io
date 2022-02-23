import {VFC} from 'react';
import {RecoilRoot} from 'recoil';

import {GpsProvider} from '../GpsContext';
import {ResponsiveProvider} from '../ResponsiveContext';
import {SyncedProvider} from '../SyncedContext';

import {Loader} from './Loader';
import {DefineHeight} from './DefineHeight';

export const App: VFC = () => {
  return (
    <RecoilRoot>
      <GpsProvider>
        <ResponsiveProvider>
          <SyncedProvider>
            <DefineHeight>
              <Loader />
            </DefineHeight>
          </SyncedProvider>
        </ResponsiveProvider>
      </GpsProvider>
    </RecoilRoot>
  );
};
