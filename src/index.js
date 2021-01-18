import BlocksWidget from './widget/BlocksWidget';
export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };

  config.settings['volto-blocks-widget'] = {
    allowedBlocks: ['text', 'image', 'video', 'html', 'table'],
    showRestricted: false,
  };
  return config;
};
