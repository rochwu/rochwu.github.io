import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {
  attemptsState,
  isIncrementalGameState,
  tauntsState,
  starsFelledState,
} from '../state';
import {Taunt} from '../Taunt';

const TauntsMap = () => {
  const taunts = useRecoilValue(tauntsState);
  const attempts = useRecoilValue(attemptsState);
  const starsFelled = useRecoilValue(starsFelledState);

  const today = attempts + starsFelled;

  const elements = useMemo(() => {
    return taunts.map((props) => (
      <Taunt key={props.birthday} {...props} today={today} />
    ));
    // We ignore `today` to render `taunts` in sync
    // Else we'd render the `taunts` twice, one before the addition
  }, [taunts]);

  return <>{elements}</>;
};

export const Taunts = () => {
  const isIncrementalGame = useRecoilValue(isIncrementalGameState);

  if (!isIncrementalGame) {
    return null;
  }

  return (
    <div aria-hidden>
      <TauntsMap />
    </div>
  );
};
