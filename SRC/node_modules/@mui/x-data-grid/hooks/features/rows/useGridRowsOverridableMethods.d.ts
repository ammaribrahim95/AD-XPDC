import { RefObject } from '@mui/x-internals/types';
import { GridRowId } from "../../../models/gridRows.js";
import { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.js";
export declare const useGridRowsOverridableMethods: (apiRef: RefObject<GridPrivateApiCommunity>) => {
  setRowIndex: (rowId: GridRowId, targetIndex: number) => void;
};