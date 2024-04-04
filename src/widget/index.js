import loadable from '@loadable/component';

export const BlocksWidget = loadable(() =>
  import(/* webpackChunkName: "volto-blocks-widget-manage" */ './BlocksWidget'),
);
