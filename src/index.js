import { BlocksWidget } from './widget';
import { blocksWidgetSelectedReducer } from './reducers';
import RenderBlocks from './components/RenderBlocks';
import {
  RichTextRender,
  richTextHasContent,
} from './components/RichTextRender';

export { RenderBlocks, RichTextRender, richTextHasContent };

export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };

  const textBlock = config.settings?.slate ? 'slate' : 'text';

  config.settings['volto-blocks-widget'] = {
    allowedBlocks: [textBlock, 'image', 'video', 'html', 'table', 'maps'],
    showRestricted: false,
  };

  config.addonReducers = {
    ...config.addonReducers,
    blocksWidgetSelected: blocksWidgetSelectedReducer,
  };

  return config;
};
