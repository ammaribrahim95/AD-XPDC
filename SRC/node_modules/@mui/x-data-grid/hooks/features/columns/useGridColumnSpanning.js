"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnSpanning = void 0;
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _useGridEvent = require("../../utils/useGridEvent");
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
const useGridColumnSpanning = apiRef => {
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
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnSpanningPublicApi, 'public');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnSpanningPrivateApi, 'private');
  (0, _useGridEvent.useGridEvent)(apiRef, 'columnOrderChange', resetColSpan);
};
exports.useGridColumnSpanning = useGridColumnSpanning;