/**
 * Dropdown menu items reducer.
 * @module reducers/dropdownMenuNavItemsReducer
 */

import { SET_BLOCKSWIDGET_SELECTED } from '../actions';

const initialState = {
  value: null,
};

export const blocksWidgetSelectedReducer = (
  state = initialState,
  action = {},
) => {
  if (action.type === SET_BLOCKSWIDGET_SELECTED) {
    return {
      ...state,
      value: action.value,
    };
  }
  return state;
};
