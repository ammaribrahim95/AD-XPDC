import * as React from 'react';
import type { integer } from '@mui/x-internals/types';
import { Store } from '@mui/x-internals/store';
import type { CellColSpanInfo } from "../models/colspan.js";
import { Dimensions } from "./dimensions.js";
import type { BaseState, VirtualizerParams } from "../useVirtualizer.js";
import { PinnedRowPosition, RenderContext, ColumnsRenderContext, ColumnWithWidth, RowId, RowEntry } from "../models/index.js";
export type VirtualizationParams = {
  /** @default false */
  isRtl?: boolean;
  /** The row buffer in pixels to render before and after the viewport.
   * @default 150 */
  rowBufferPx?: number;
  /** The column buffer in pixels to render before and after the viewport.
   * @default 150 */
  columnBufferPx?: number;
};
export type VirtualizationState = {
  enabled: boolean;
  enabledForRows: boolean;
  enabledForColumns: boolean;
  renderContext: RenderContext;
};
export declare const EMPTY_RENDER_CONTEXT: {
  firstRowIndex: number;
  lastRowIndex: number;
  firstColumnIndex: number;
  lastColumnIndex: number;
};
export declare const Virtualization: {
  initialize: typeof initializeState;
  use: typeof useVirtualization;
  selectors: {
    renderContext: (state: BaseState) => RenderContext;
    enabledForRows: (state: BaseState) => boolean;
    enabledForColumns: (state: BaseState) => boolean;
  };
};
export declare namespace Virtualization {
  type State = {
    virtualization: VirtualizationState;
    getters: ReturnType<typeof useVirtualization>['getters'];
  };
  type API = ReturnType<typeof useVirtualization>;
}
declare function initializeState(params: VirtualizerParams): Virtualization.State;
/** APIs to override for colspan/rowspan */
type AbstractAPI = {
  getCellColSpanInfo: (rowId: RowId, columnIndex: integer) => CellColSpanInfo;
  calculateColSpan: (rowId: RowId, minFirstColumn: integer, maxLastColumn: integer, columns: ColumnWithWidth[]) => void;
  getHiddenCellsOrigin: () => Record<RowId, Record<number, number>>;
};
type RequiredAPI = Dimensions.API & AbstractAPI;
declare function useVirtualization(store: Store<BaseState>, params: VirtualizerParams, api: RequiredAPI): {
  getters: {
    setPanels: React.Dispatch<React.SetStateAction<Readonly<Map<any, React.ReactNode>>>>;
    getOffsetTop: () => number;
    getRows: (rowParams?: {
      rows?: RowEntry[];
      position?: PinnedRowPosition;
      renderContext?: RenderContext;
    }, unstable_rowTree?: Record<RowId, any>) => React.ReactNode[];
    getContainerProps: () => {
      ref: (node: HTMLDivElement | null) => void;
    };
    getScrollerProps: () => {
      ref: (node: HTMLDivElement | null) => void;
      onScroll: () => void;
      onWheel: ((event: React.WheelEvent) => void) | undefined;
      onTouchMove: ((event: React.TouchEvent) => void) | undefined;
      style: React.CSSProperties;
      role: string;
      tabIndex: number | undefined;
    };
    getContentProps: () => {
      ref: (node: HTMLDivElement | null) => void;
      style: React.CSSProperties;
      role: string;
    };
    getScrollbarVerticalProps: () => {
      ref: (node: HTMLDivElement | null) => void;
      scrollPosition: React.RefObject<{
        top: number;
        left: number;
      }>;
    };
    getScrollbarHorizontalProps: () => {
      ref: (node: HTMLDivElement | null) => void;
      scrollPosition: React.RefObject<{
        top: number;
        left: number;
      }>;
    };
    getScrollAreaProps: () => {
      scrollPosition: React.RefObject<{
        top: number;
        left: number;
      }>;
    };
  };
  useVirtualization: () => BaseState;
  setPanels: React.Dispatch<React.SetStateAction<Readonly<Map<any, React.ReactNode>>>>;
  forceUpdateRenderContext: () => void;
  getCellColSpanInfo: (rowId: RowId, columnIndex: integer) => CellColSpanInfo;
  calculateColSpan: (rowId: RowId, minFirstColumn: integer, maxLastColumn: integer, columns: ColumnWithWidth[]) => void;
  getHiddenCellsOrigin: () => Record<RowId, Record<number, number>>;
};
export declare function areRenderContextsEqual(context1: RenderContext, context2: RenderContext): boolean;
export declare function computeOffsetLeft(columnPositions: number[], renderContext: ColumnsRenderContext, pinnedLeftLength: number): number;
export declare function roundToDecimalPlaces(value: number, decimals: number): number;
export {};