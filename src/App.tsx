import styled from '@emotion/styled';
import {RecoilRoot} from 'recoil';

import {GpsProvider} from './GpsContext';
import {ResponsiveProvider} from './ResponsiveContext';
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

export default function App() {
  return (
    <RecoilRoot>
      <GpsProvider>
        <ResponsiveProvider>
          <Container>
            <Header />
            <Main />
          </Container>
        </ResponsiveProvider>
      </GpsProvider>
    </RecoilRoot>
  );
}
