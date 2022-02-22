import {useEffect, useMemo, useState, VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {attemptsState, isIncrementalGameState} from '../state';
import {useGps} from '../GpsContext';
import {useSynced} from '../SyncedContext';
import {randomIndex} from '../randomIndex';
import {MILESTONES} from '../constants';

import {Taunt, TauntProps} from './Taunt';
import {insults} from './insults';

export const Taunts: VFC = () => {
  const gps = useGps();
  const schedule = useSynced();
  const [taunts, setTaunts] = useState<Omit<TauntProps, 'attempts'>[]>([]);

  const attempts = useRecoilValue(attemptsState);
  const isIncrementalGame = useRecoilValue(isIncrementalGameState);

  // We ignore `attempts` to render `taunts` in sync
  // Else we'd render the `taunts` twice, one without the addition, one with
  const elements = useMemo(() => {
    return taunts.map((props) => (
      <Taunt key={props.birthday} {...props} attempts={attempts} />
    ));

    // eslint-disable-next-line
  }, [taunts]);

  useEffect(() => {
    if (!isIncrementalGame) {
      return;
    }

    schedule(() => {
      setTaunts((previous) => {
        const [first, ...rest] = previous;
        const {top, left} = gps.get('button');
        const insult = insults[randomIndex(insults.length)];
        const newTaunt = {
          top,
          left,
          insult,
          birthday: attempts,
        };
        if (rest.length >= MILESTONES.MAX_TAUNT_AGE) {
          return [...rest, newTaunt];
        } else if (!first) {
          return [newTaunt];
        } else {
          return [first, ...rest, newTaunt];
        }
      });
    });

    // eslint-disable-next-line
  }, [attempts]);

  if (!isIncrementalGame) {
    return null;
  }

  return <div aria-hidden>{elements}</div>;
};
