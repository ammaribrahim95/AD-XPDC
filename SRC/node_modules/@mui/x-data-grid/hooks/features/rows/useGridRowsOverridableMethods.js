"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowsOverridableMethods = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _gridRowsSelector = require("./gridRowsSelector");
var _gridRowsUtils = require("./gridRowsUtils");
const useGridRowsOverridableMethods = apiRef => {
  const setRowIndex = React.useCallback((rowId, targetIndex) => {
    const node = (0, _gridRowsSelector.gridRowNodeSelector)(apiRef, rowId);
    if (!node) {
      throw new Error(`MUI X: No row with id #${rowId} found.`);
    }

    // TODO: Remove irrelevant checks
    if (node.parent !== _gridRowsUtils.GRID_ROOT_GROUP_ID) {
      throw new Error(`MUI X: The row reordering do not support reordering of grouped rows yet.`);
    }
    if (node.type !== 'leaf') {
      throw new Error(`MUI X: The row reordering do not support reordering of footer or grouping rows.`);
    }
    apiRef.current.setState(state => {
      const group = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef)[_gridRowsUtils.GRID_ROOT_GROUP_ID];
      const allRows = group.children;
      const oldIndex = allRows.findIndex(row => row === rowId);
      if (oldIndex === -1 || oldIndex === targetIndex) {
        return state;
      }
      const updatedRows = [...allRows];
      updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
      return (0, _extends2.default)({}, state, {
        rows: (0, _extends2.default)({}, state.rows, {
          tree: (0, _extends2.default)({}, state.rows.tree, {
            [_gridRowsUtils.GRID_ROOT_GROUP_ID]: (0, _extends2.default)({}, group, {
              children: updatedRows
            })
          })
        })
      });
    });
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef]);
  return {
    setRowIndex
  };
};
exports.useGridRowsOverridableMethods = useGridRowsOverridableMethods;