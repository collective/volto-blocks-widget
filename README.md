# volto-blocks-widget

Volto addon to use blocks inside fields

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

Created with [voltocli](https://github.com/nzambello/voltocli).

## Usage

> If you are using Volto < 16, then use [v2.1.0](https://github.com/collective/volto-blocks-widget/tree/v2.1.0)
>
> If you are using Volto < 12, then use [v1.0.3](https://github.com/collective/volto-blocks-widget/tree/v1.0.3)

This is a widget for fields that have the widget set to 'blocks'.

Default allowed blocks are:
Text, Video, HTML, Table

but you could customize your allowed blocks by adding this configuration to your config.js:

```jsx
export const settings = {
  ...config.settings,
    'volto-blocks-widget' = {
    allowedBlocks: ['text', 'video', 'html', 'table'],
    showRestricted: false,
  },
};
```
