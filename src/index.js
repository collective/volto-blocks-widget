import BlocksWidget from './widget/BlocksWidget';
export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };

  config.settings['volto-blocks-widget'] = {
    allowedBlocks: ['text', 'video', 'html', 'table'],
    showRestricted: false,
  };
  return config;
};
