import {VFC} from 'react';

import {Content} from '../Content';

import {Curtains} from './Curtains';
import {useIsReady} from './useIsReady';
import {WelcomeOverlay} from './WelcomeOverlay';
import {TouchDisclaimer} from './TouchDisclaimer';

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  const isReady = useIsReady();

  return (
    <>
      <Content />
      <Curtains shouldShow={!isReady} />
      <WelcomeOverlay shouldShow={!isReady} />
      <TouchDisclaimer />
    </>
  );
};
