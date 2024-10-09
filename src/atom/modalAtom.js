import { atom } from 'recoil';

export const modalAtom = atom({
  key: 'modalState',
  default: false,
});

export const postIdAtom = atom({
  key: 'postIdState',
  default: '',
});
