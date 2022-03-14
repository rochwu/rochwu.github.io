import {VFC} from 'react';

import {Content} from '../Content';
import {hasSearchParams} from '../hasSearchParams';

import {Curtains} from './Curtains';
import {useIsReady} from './useIsReady';
import {WelcomeOverlay} from './WelcomeOverlay';
import {TouchDisclaimer} from './TouchDisclaimer';

const shouldWelcome = !hasSearchParams('dontWelcome');

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  const isReady = useIsReady();

  const welcomeScreen = shouldWelcome && (
    <>
      <Curtains shouldShow={!isReady} />
      <WelcomeOverlay shouldShow={!isReady} />
    </>
  );

  return (
    <>
      <Content />
      {welcomeScreen}
      <TouchDisclaimer />
    </>
  );
};
