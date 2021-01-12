import React from 'react';
//import { defineMessages, useIntl } from 'react-intl';
import { Form as UIForm } from 'semantic-ui-react';
import { FormFieldWrapper, Form } from '@plone/volto/components';

//const messages = defineMessages({
// footerItemsHeader: {
//   id: 'editablefooter-items-header',
//   defaultMessage: 'Footer columns',
// },
//});

const BlocksWidget = (props) => {
  const { value, id, onChange, required } = props;
  //const intl = useIntl();

  const onChangeBlocks = (data) => {
    onChange({
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
  };

  return (
    <div className="blocks-widget">
      <UIForm.Field inline id={id}>
        <FormFieldWrapper {...props}>
          blocks widget
          <div className="menu-blocks-container">
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
