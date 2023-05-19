import { EScreenId } from "@domains/screen";

export interface IPagesActions {
  setCurrentScreenId: (screenId: EScreenId) => void;
}

export interface IPagesState {
  screenId: EScreenId;
  pagesActions: IPagesActions;
}

export type TPagesSlice = IPagesState;
