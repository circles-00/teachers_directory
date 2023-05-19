import { useStore } from "@store";

const usePagesStore = useStore

export const usePagesActions = () => usePagesStore((state) => state.pagesActions)

export const useCurrentScreenId = () => usePagesStore((state) => state.screenId)
