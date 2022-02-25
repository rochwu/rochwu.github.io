import {useEffect, useMemo, VFC} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import {
  attemptsState,
  isIncrementalGameState,
  tauntsState,
  starsFelledState,
} from '../state';
import {useGps} from '../GpsContext';
import {useSynced} from '../SyncedContext';
import {MILESTONES} from '../constants';

import {Taunt} from '../Taunt';
import {insult} from './insult';

const TauntsMap: VFC = () => {
  const gps = useGps();
  const schedule = useSynced();

  const [taunts, setTaunts] = useRecoilState(tauntsState);
  const attempts = useRecoilValue(attemptsState);
  const starsFelled = useRecoilValue(starsFelledState);

  const today = attempts + starsFelled;

  // We ignore `attempts` to render `taunts` in sync
  // Else we'd render the `taunts` twice, one without the addition, one with
  const elements = useMemo(() => {
    return taunts.map((props) => (
      <Taunt key={props.birthday} {...props} today={today} />
    ));

    // eslint-disable-next-line
  }, [taunts]);

  useEffect(() => {
    schedule(() => {
      setTaunts((previous) => {
        const [first, ...rest] = previous;
        const {top, left} = gps.get('button'); // Button always has top and left

        const newTaunt = {
          top: top!,
          left: left!,
          insult: insult(),
          birthday: today,
        };

        // -1 for first because 28 has to be enforced!
        if (rest.length >= MILESTONES.MAX_TAUNT_AGE - 1) {
          return [...rest, newTaunt];
        } else if (!first) {
          return [newTaunt];
        } else {
          return [first, ...rest, newTaunt];
        }
      });
    });
    // Only button chasing attempts make new taunts
    // eslint-disable-next-line
  }, [attempts]);

  return <>{elements}</>;
};

export const Taunts: VFC = () => {
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
