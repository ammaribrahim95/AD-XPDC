import { RefObject } from '@mui/x-internals/types';
import { GridPrivateApiCommunity } from "../../models/api/gridApiCommunity.js";
import { DataGridProcessedProps } from "../../models/props/DataGridProps.js";
type RootProps = DataGridProcessedProps;
/**
 * Virtualizer setup
 */
export declare function useGridVirtualizer(apiRef: RefObject<GridPrivateApiCommunity>, rootProps: RootProps): void;
export {};