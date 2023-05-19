/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type IPagesState, type TPagesSlice } from "~/store/pages/types";
import { EScreenId } from "@domains/screen";
import { type StateCreator } from "zustand";
import { type TState } from "@store";

const initialState: Omit<IPagesState, 'pagesActions'> = {
  screenId: EScreenId.HOME,
}


export const createPagesSlice: StateCreator<TState,
  [['zustand/devtools', never],
  ['zustand/persist', unknown],
  ['zustand/immer', never]
],
[],
  TPagesSlice>=  ((set) => ({
  ...initialState,
  pagesActions: {
    setCurrentScreenId: (screenId: EScreenId) => {
      set(
        (state) => {
          state.screenId = screenId
        },
        false,
        'setScreenId'
      )
    }
  }
  }))

