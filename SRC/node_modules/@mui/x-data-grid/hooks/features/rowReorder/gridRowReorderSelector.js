"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridRowReorderStateSelector = exports.gridIsRowDragActiveSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridRowReorderStateSelector = exports.gridRowReorderStateSelector = (0, _createSelector.createRootSelector)(state => state.rowReorder);
const gridIsRowDragActiveSelector = exports.gridIsRowDragActiveSelector = (0, _createSelector.createSelector)(gridRowReorderStateSelector, rowReorder => rowReorder?.isActive ?? false);