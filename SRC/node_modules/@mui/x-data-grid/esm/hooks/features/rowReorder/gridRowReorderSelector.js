import { createRootSelector, createSelector } from "../../../utils/createSelector.js";
export const gridRowReorderStateSelector = createRootSelector(state => state.rowReorder);
export const gridIsRowDragActiveSelector = createSelector(gridRowReorderStateSelector, rowReorder => rowReorder?.isActive ?? false);