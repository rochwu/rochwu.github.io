import {VFC} from 'react';

import {Body} from '../Body';
import {hasSearchParams} from '../hasSearchParams';

import {Curtains} from './Curtains';
import {useIsReady} from './useIsReady';
import {WelcomeOverlay} from './WelcomeOverlay';
import {TouchDisclaimer} from './TouchDisclaimer';

const shouldWelcome = !hasSearchParams('dontWelcome');

const Welcome: VFC = () => {
  const isReady = useIsReady();

  return (
    <>
      {isReady && <Body />}
      <Curtains shouldShow={!isReady} />
      <WelcomeOverlay shouldShow={!isReady} />
    </>
  );
};

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  return (
    <>
      {shouldWelcome ? <Welcome /> : <Body />}
      <TouchDisclaimer />
    </>
  );
};
