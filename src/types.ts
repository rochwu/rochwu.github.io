export type Metadata = {
  width: number;
  height: number;
  top?: number;
  left?: number;
};

export type TauntState = Pick<Metadata, 'top' | 'left'> & {
  insult: string;
  birthday: number; // Acts as an id, unique
};
