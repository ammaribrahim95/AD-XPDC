"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVirtualizer = void 0;
var _useLazyRef = _interopRequireDefault(require("@mui/utils/useLazyRef"));
var _store = require("@mui/x-internals/store");
var _colspan = require("./features/colspan");
var _dimensions = require("./features/dimensions");
var _keyboard = require("./features/keyboard");
var _rowspan = require("./features/rowspan");
var _virtualization = require("./features/virtualization");
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-returns-type */

const FEATURES = [_dimensions.Dimensions, _virtualization.Virtualization, _colspan.Colspan, _rowspan.Rowspan, _keyboard.Keyboard];
const useVirtualizer = params => {
  const store = (0, _useLazyRef.default)(() => {
    return new _store.Store(FEATURES.map(f => f.initialize(params)).reduce((state, partial) => Object.assign(state, partial), {}));
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
exports.useVirtualizer = useVirtualizer;