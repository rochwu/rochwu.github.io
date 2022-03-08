import {useEffect, VFC} from 'react';
import {useSetRecoilState} from 'recoil';

import {clearUnlocksState} from '../state';

export const System: VFC = () => {
  const clear = useSetRecoilState(clearUnlocksState);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);

    if (params.get('clear') !== null) {
      clear(true);
    }
    // eslint-disable-next-line
  }, []);

  return null;
};
