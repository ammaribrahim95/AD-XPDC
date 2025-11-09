import { useGridApiMethod } from "../../utils/useGridApiMethod.js";
import { useGridEvent } from "../../utils/useGridEvent.js";
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export const useGridColumnSpanning = apiRef => {
  const virtualizer = apiRef.current.virtualizer;
  const resetColSpan = virtualizer.api.resetColSpan;
  const getCellColSpanInfo = virtualizer.api.getCellColSpanInfo;
  const calculateColSpan = virtualizer.api.calculateColSpan;
  const columnSpanningPublicApi = {
    unstable_getCellColSpanInfo: getCellColSpanInfo
  };
  const columnSpanningPrivateApi = {
    resetColSpan,
    calculateColSpan
  };
  useGridApiMethod(apiRef, columnSpanningPublicApi, 'public');
  useGridApiMethod(apiRef, columnSpanningPrivateApi, 'private');
  useGridEvent(apiRef, 'columnOrderChange', resetColSpan);
};