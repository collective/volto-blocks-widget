/**
 *  Blocks widget
 * @module actions/setBlockWidgetSelected
 */
export const SET_BLOCKSWIDGET_SELECTED = 'SET_BLOCKSWIDGET_SELECTED';

/**
 * set BlockWidget selected
 * @function setBlockWidgetSelected
 */
export function setBlockWidgetSelected(id) {
  return {
    type: SET_BLOCKSWIDGET_SELECTED,
    value: id,
  };
}
