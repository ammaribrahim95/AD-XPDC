import useLazyRef from '@mui/utils/useLazyRef';
import { Store } from '@mui/x-internals/store';
import { Colspan } from "./features/colspan.js";
import { Dimensions } from "./features/dimensions.js";
import { Keyboard } from "./features/keyboard.js";
import { Rowspan } from "./features/rowspan.js";
import { Virtualization } from "./features/virtualization.js";

/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-returns-type */

const FEATURES = [Dimensions, Virtualization, Colspan, Rowspan, Keyboard];
export const useVirtualizer = params => {
  const store = useLazyRef(() => {
    return new Store(FEATURES.map(f => f.initialize(params)).reduce((state, partial) => Object.assign(state, partial), {}));
  }).current;
  const api = {};
  for (const feature of FEATURES) {
    Object.assign(api, feature.use(store, params, api));
  }
  return {
    store,
    api
  };
};