import { Store } from '@mui/x-internals/store';
import type { BaseState, VirtualizerParams } from "../useVirtualizer.js";
export declare const Keyboard: {
  initialize: typeof initializeState;
  use: typeof useKeyboard;
  selectors: {};
};
export declare namespace Keyboard {
  type State = {};
  type API = ReturnType<typeof useKeyboard>;
}
declare function initializeState(_params: VirtualizerParams): Keyboard.State;
declare function useKeyboard(store: Store<BaseState & Keyboard.State>, params: VirtualizerParams, _api: {}): {
  getViewportPageSize: () => number;
};
export {};