import {useEffect, VFC} from 'react';
import {useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {useSynced} from '../SyncedContext';
import {MILESTONES} from '../constants';
import {tauntsState} from '../state';

import {insult} from './insult';
import {LoopProps} from './types';

export const TauntsHandler: VFC<LoopProps> = ({attempts, starsFelled}) => {
  const gps = useGps();
  const schedule = useSynced();

  const setTaunts = useSetRecoilState(tauntsState);

  const today = attempts + starsFelled;

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
  }, [attempts]);

  return null;
};
