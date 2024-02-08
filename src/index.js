import BlocksWidget from './widget/BlocksWidget';
import { blocksWidgetSelectedReducer } from './reducers';
import RenderBlocks from './components/RenderBlocks';
import { RichTextRender, richTextHasContent } from './components/RichTextRender';

export {
  RenderBlocks, RichTextRender, richTextHasContent
}

export default (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    blocks: BlocksWidget,
  };

  config.settings['volto-blocks-widget'] = {
    allowedBlocks: ['text', 'image', 'video', 'html', 'table', 'maps'],
    showRestricted: false,
  };

  config.addonReducers = {
    ...config.addonReducers,
    blocksWidgetSelected: blocksWidgetSelectedReducer,
  };

  return config;
};
