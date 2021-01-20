import BlocksWidget from './widget/BlocksWidget';
import { blocksWidgetSelectedReducer } from './reducers';

export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };

  config.settings['volto-blocks-widget'] = {
    allowedBlocks: ['text', 'image', 'video', 'html', 'table'],
    showRestricted: false,
  };

  config.addonReducers = {
    ...config.addonReducers,
    blocksWidgetSelected: blocksWidgetSelectedReducer,
  };

  return config;
};
