import BlocksWidget from './widget/BlocksWidget';
export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };
  return config;
};
