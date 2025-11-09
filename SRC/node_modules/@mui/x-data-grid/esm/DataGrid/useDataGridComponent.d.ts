import { RefObject } from '@mui/x-internals/types';
import { DataGridProcessedProps } from "../models/props/DataGridProps.js";
import { GridPrivateApiCommunity } from "../models/api/gridApiCommunity.js";
import { GridConfiguration } from "../models/configuration/gridConfiguration.js";
export declare const useDataGridComponent: (apiRef: RefObject<GridPrivateApiCommunity>, props: DataGridProcessedProps, configuration: GridConfiguration) => void;