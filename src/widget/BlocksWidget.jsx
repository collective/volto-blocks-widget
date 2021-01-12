import React from 'react';
//import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash';
import { Form as UIForm } from 'semantic-ui-react';
import { FormFieldWrapper, Form } from '@plone/volto/components';
import { settings } from '~/config';
import './blocks_widget.css';
//const messages = defineMessages({
// footerItemsHeader: {
//   id: 'editablefooter-items-header',
//   defaultMessage: 'Footer columns',
// },
//});

const BlocksWidget = (props) => {
  const { value, id, onChange, required } = props;
  //const intl = useIntl();
  const defaultBlockId = uuid();
  if (!value.blocks_layout || isEmpty(value.blocks_layout.items)) {
    value.blocks_layout = {
      items: [defaultBlockId],
    };
  }
  if (!value.blocks || isEmpty(value.blocks)) {
    value.blocks = {
      [defaultBlockId]: {
        '@type': settings.defaultBlockType,
      },
    };
  }

  const onChangeBlocks = (data) => {
    onChange(id, {
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
  };

  return (
    <div className="blocks-widget">
      <UIForm.Field inline id={id}>
        <FormFieldWrapper {...props}>
          <div className="blocks-widget-container">
            <Form
              key={id}
              formData={value}
              visual={true}
              hideActions
              onChangeFormData={onChangeBlocks}
            />
          </div>
        </FormFieldWrapper>
      </UIForm.Field>
    </div>
  );
};

export default BlocksWidget;
