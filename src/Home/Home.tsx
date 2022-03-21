import {VFC} from 'react';

import {ContentMirrored} from '../ContentMirrored';

import {Curtains} from './Curtains';
import {useIsReady} from './useIsReady';
import {WelcomeOverlay} from './WelcomeOverlay';
import {TouchDisclaimer} from './TouchDisclaimer';

const Welcome: VFC = () => {
  const isReady = useIsReady();

  return (
    <>
      {isReady && <ContentMirrored />}
      <Curtains shouldShow={!isReady} />
      <WelcomeOverlay shouldShow={!isReady} />
    </>
  );
};

type Props = {
  dontWelcome?: boolean;
};

// TODO: Maybe add visibility change to remount this when inactive
export const Home: VFC<Props> = ({dontWelcome}) => {
  return (
    <>
      {dontWelcome ? <ContentMirrored /> : <Welcome />}
      <TouchDisclaimer />
    </>
  );
};
