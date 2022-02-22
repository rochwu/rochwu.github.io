import {createContext, FC, useContext, useEffect, useState} from 'react';

export enum ResponsiveLevel {
  Large = 'large',
  Small = 'small',
}

const Context = createContext(ResponsiveLevel.Large);
const Provider = Context.Provider;

export const useResponsiveLevel = () => {
  return useContext(Context);
};

const getLevel = (width: number): ResponsiveLevel => {
  if (width <= 480) {
    return ResponsiveLevel.Small;
  }

  return ResponsiveLevel.Large;
};

export const ResponsiveProvider: FC = ({children}) => {
  const [responsiveness, setResponsiveness] = useState(() =>
    getLevel(document.body.clientWidth),
  );

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setResponsiveness(getLevel(document.body.clientWidth));
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <Provider value={responsiveness}>{children}</Provider>;
};
