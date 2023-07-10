interface INodeLike {
  label: string
  title?: string
  children?: INodeLike[]
  count?: number
}

interface INode {
  id: string
  label: string
  children?: INode[]
  parent?: INode
  title?: string
}

interface ITreeSelectState {
  checked: Record<string, boolean>
  expanded: Record<string, boolean>
  nodeIndex: Record<string, Node>
}

declare module 'react-tree-select-hook' {
  export declare function useTreeSelect(
    rawNodes: INodeLike[],
    reducer?: TreeSelectReducer
  ): {
    toggleChecked: (id: string) => void
    state: ITreeSelectState
    selectAll: () => void
    selectNone: () => void
    setNodes: (nodes: INodeLike[]) => void
    nodes: INode[]
    isExpanded: (id: string) => boolean
    getExpandButtonProps: (id: string) => {
      onClick: () => void
    }
    getCheckboxProps: (id: string) => {
      checked: boolean
      onChange: () => void
      type: string
    }
    simplifiedSelection: INode[]
  }
}
