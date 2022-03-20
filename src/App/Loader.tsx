import {VFC} from 'react';
import {Routes, Route} from 'react-router-dom';

import {Home} from '../Home';
import {Be} from '../Be';

// TODO: Maybe add visibility change to remount this when inactive
export const Loader: VFC = () => {
  return (
    <Routes>
      <Route path="be">
        <Route index element={<Be />} />
        <Route path="rude" element={<Home dontWelcome />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
