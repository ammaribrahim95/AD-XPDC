import { Store } from '@mui/x-internals/store';
import { ColumnWithWidth, DimensionsState, RowId, RowsMetaState, Size } from "../models/index.js";
import type { BaseState, VirtualizerParams } from "../useVirtualizer.js";
export type DimensionsParams = {
  rowHeight: number;
  columnsTotalWidth: number;
  leftPinnedWidth: number;
  rightPinnedWidth: number;
  topPinnedHeight: number;
  bottomPinnedHeight: number;
  scrollbarSize?: number;
};
export declare const Dimensions: {
  initialize: typeof initializeState;
  use: typeof useDimensions;
  selectors: {
    rootSize: (state: BaseState) => Size;
    dimensions: (state: BaseState) => DimensionsState;
    rowHeight: (state: BaseState) => number;
    contentHeight: (state: BaseState) => number;
    rowsMeta: (state: BaseState) => RowsMetaState;
    columnPositions: (_: any, columns: ColumnWithWidth[]) => number[];
    needsHorizontalScrollbar: (state: BaseState) => boolean;
  };
};
export declare namespace Dimensions {
  type State = {
    rootSize: Size;
    dimensions: DimensionsState;
    rowsMeta: RowsMetaState;
    rowHeights: Map<any, any>;
  };
  type API = ReturnType<typeof useDimensions>;
}
declare function initializeState(params: VirtualizerParams): Dimensions.State;
declare function useDimensions(store: Store<BaseState>, params: VirtualizerParams, _api: {}): {
  updateDimensions: () => void;
  debouncedUpdateDimensions: ((() => void) & import("@mui/x-internals/throttle").Cancelable) | undefined;
  rowsMeta: {
    getRowHeight: (rowId: RowId) => any;
    setLastMeasuredRowIndex: (index: number) => void;
    storeRowHeightMeasurement: (id: RowId, height: number) => void;
    hydrateRowsMeta: () => void;
    observeRowHeight: (element: Element, rowId: RowId) => () => void | undefined;
    rowHasAutoHeight: (id: RowId) => any;
    getRowHeightEntry: (rowId: RowId) => any;
    getLastMeasuredRowIndex: () => number;
    resetRowHeights: () => void;
  };
};
export {};