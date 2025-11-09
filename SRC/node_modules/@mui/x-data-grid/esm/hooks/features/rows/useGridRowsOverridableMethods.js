import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridRowTreeSelector, gridRowNodeSelector } from "./gridRowsSelector.js";
import { GRID_ROOT_GROUP_ID } from "./gridRowsUtils.js";
export const useGridRowsOverridableMethods = apiRef => {
  const setRowIndex = React.useCallback((rowId, targetIndex) => {
    const node = gridRowNodeSelector(apiRef, rowId);
    if (!node) {
      throw new Error(`MUI X: No row with id #${rowId} found.`);
    }

    // TODO: Remove irrelevant checks
    if (node.parent !== GRID_ROOT_GROUP_ID) {
      throw new Error(`MUI X: The row reordering do not support reordering of grouped rows yet.`);
    }
    if (node.type !== 'leaf') {
      throw new Error(`MUI X: The row reordering do not support reordering of footer or grouping rows.`);
    }
    apiRef.current.setState(state => {
      const group = gridRowTreeSelector(apiRef)[GRID_ROOT_GROUP_ID];
      const allRows = group.children;
      const oldIndex = allRows.findIndex(row => row === rowId);
      if (oldIndex === -1 || oldIndex === targetIndex) {
        return state;
      }
      const updatedRows = [...allRows];
      updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          tree: _extends({}, state.rows.tree, {
            [GRID_ROOT_GROUP_ID]: _extends({}, group, {
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