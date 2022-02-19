import {CSSProperties, useEffect, useState, VFC} from 'react';
import {useRecoilValue} from 'recoil';
import styled from '@emotion/styled';

import {attemptsState, isButtonBroken} from '../state';
import {useGps} from '../GpsContext';
import {Metadata} from '../types';

const FONT_SIZE = '1em';

const Container = styled.div({
  position: 'absolute',
});

const insults = ['lol!', 'hahaha', 'hihihi!', 'jaja', 'lmao', 'funny...'];

const randomIndex = () => Math.floor(Math.random() * insults.length);

type TauntProps = Pick<Metadata, 'top' | 'left'> & {
  insult: string;
};

const Taunt: VFC<TauntProps> = ({top, left, insult}) => {
  return (
    <Container
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translateY(-${FONT_SIZE})`,
      }}
    >
      {insult}
    </Container>
  );
};

export const Taunts: VFC = () => {
  const gps = useGps();
  const attempts = useRecoilValue(attemptsState);
  const isBroken = useRecoilValue(isButtonBroken);
  const [taunts, setTaunts] = useState<TauntProps[]>([]);

  useEffect(() => {
    if (!isBroken) {
      return;
    }

    setTaunts((previous) => {
      const {top, left} = gps.get('button');

      return [...previous, {top, left, insult: insults[randomIndex()]}];
    });
  }, [isBroken, attempts, gps]);

  if (!isBroken) {
    return null;
  }

  return (
    <div aria-hidden>
      {taunts.map((props) => (
        <Taunt {...props} />
      ))}
    </div>
  );
};
