import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

export type State = {
  selectedId: number;
};

export type Action = {
  type: 'select';
  payload?: any;
};

export type AppDispatch = Dispatch<Action>;

export const initialState: State = {
  selectedId: 0,
};

export const reducer = (state: State, {type, payload}: Action) => {
  switch (type) {
    case 'select': {
      return {...state, selectedId: payload};
    }
    default:
      return state;
  }
};

export const actions = {
  select: (id: number): Action => ({
    type: 'select',
    payload: id,
  }),
};

const GetContext = createContext<State>({} as never);
const SetContext = createContext<AppDispatch>({} as never);

export const useDuckState = () => {
  return useContext(GetContext);
};

export const useDuckDispatch = () => {
  return useContext(SetContext);
};

export const DuckProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GetContext.Provider value={state}>
      <SetContext.Provider value={dispatch}>{children}</SetContext.Provider>
    </GetContext.Provider>
  );
};
