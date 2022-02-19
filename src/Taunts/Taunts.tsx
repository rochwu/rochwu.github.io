import {useEffect, useRef, VFC} from 'react';
import {useRecoilValue} from 'recoil';

import {attemptsState, isIncrementalGameState} from '../state';
import {useGps} from '../GpsContext';

import {MAX_AGE, Taunt, TauntProps} from './Taunt';

const insults = ['lol!', 'hahaha', 'hihihi!', 'jaja', 'lmao', 'funny...'];

const randomIndex = () => Math.floor(Math.random() * insults.length);

export const Taunts: VFC = () => {
  const gps = useGps();
  const attempts = useRecoilValue(attemptsState);
  const isIncrementalGame = useRecoilValue(isIncrementalGameState);
  const taunts = useRef<Omit<TauntProps, 'attempts'>[]>([]);

  const previous = useRef(attempts);
  useEffect(() => {
    previous.current = attempts;
  }, [attempts]);

  if (!isIncrementalGame) {
    return null;
  }

  if (previous.current !== attempts) {
    const [first, ...rest] = taunts.current;
    const {top, left} = gps.get('button');
    const insult = insults[randomIndex()];

    const newTaunt = {
      top,
      left,
      insult,
      birthday: attempts,
    };

    if (rest.length >= MAX_AGE) {
      taunts.current = [...rest, newTaunt];
    } else if (!first) {
      taunts.current = [newTaunt];
    } else {
      taunts.current = [first, ...rest, newTaunt];
    }
  }

  return (
    <div aria-hidden>
      {taunts.current.map((props) => (
        <Taunt key={props.birthday} {...props} attempts={attempts} />
      ))}
    </div>
  );
};
