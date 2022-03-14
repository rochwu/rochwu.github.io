import {VFC} from 'react';

import {Content} from '../Content';

import {Curtains} from './Curtains';
import {useIsReady} from './useIsReady';
import {WelcomeOverlay} from './WelcomeOverlay';
import {TouchDisclaimer} from './TouchDisclaimer';

const welcome = !!new URLSearchParams(window.location.search).get('unwelcome');

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  const isReady = useIsReady();

  const welcomeCommittee = (
    <>
      <Curtains shouldShow={!isReady} />
      <WelcomeOverlay shouldShow={!isReady} />
    </>
  );

  return (
    <>
      <Content />
      {welcome && welcomeCommittee}
      <TouchDisclaimer />
    </>
  );
};
