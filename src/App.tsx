import {VFC} from 'react';
import styled from '@emotion/styled';
import {RecoilRoot} from 'recoil';

import {GpsProvider} from './GpsContext';
import {ResponsiveProvider} from './ResponsiveContext';
import {SyncedProvider} from './SyncedContext';
import {Header} from './Header';
import {Main} from './Main';
import {APP} from './constants';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: APP.BACK_COLOR,
  maxWidth: '1024px', // Arbitrary, iPad
  height: '100vh',
  margin: 'auto',
});

const App: VFC = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
};

export default function () {
  return (
    <RecoilRoot>
      <GpsProvider>
        <ResponsiveProvider>
          <SyncedProvider>
            <App />
          </SyncedProvider>
        </ResponsiveProvider>
      </GpsProvider>
    </RecoilRoot>
  );
}
