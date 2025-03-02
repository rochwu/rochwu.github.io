import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';

import {useGps} from '../GpsContext';
import {useSchedule} from '../SyncedContext';
import {MILESTONES} from '../constants';
import {tauntsState} from '../state';

import {taunt} from './taunt';
import {LoopProps} from './types';

export const TauntsHandler = ({attempts, starsFelled}: LoopProps) => {
  const gps = useGps();
  const schedule = useSchedule();

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
          insult: taunt(),
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
