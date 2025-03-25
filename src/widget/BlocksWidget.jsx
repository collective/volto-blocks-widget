import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import { v4 as uuid } from 'uuid';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { Form as UIForm } from 'semantic-ui-react';
import { createPortal } from 'react-dom';
import { FormFieldWrapper, Form, Sidebar } from '@plone/volto/components';
import { setBlockWidgetSelected } from '../actions';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';

import './blocks_widget.css';

const BlocksWidget = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { value = {}, id, onChange, required } = props;
  const currentFieldSelected = useSelector(
    (state) => state.blocksWidgetSelected?.value,
  );
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
        '@type': config.settings.defaultBlockType,
      },
    };
  }

  const onChangeBlocks = useCallback(
    (data) => {
      // Watch out: triple bug here.
      // 1- malformed data from Form when deleting last/only block left in widget
      // 2- cannot delete last/only block left in widget
      // 3- pressing enter trying to add a new block when focus is in a block like
      // Image will open filesystem explorer
      // Wont fix now as scope is now to make it work again with volto 17
      const realData = pick(data, ['blocks', 'blocks_layout']);
      onChange(id, {
        blocks: realData.blocks,
        blocks_layout: realData.blocks_layout,
      });
    },
    [id],
  );

  const onFocusWidget = () => {
    if (currentFieldSelected !== id) {
      dispatch(setBlockWidgetSelected(id));
    }
  };

  const onBlurWidget = useCallback(() => {
    props.onBlur(id, value);
  }, [value]);

  return (
    <>
      <div
        className="blocks-widget"
        onBlur={onBlurWidget}
        onClick={onFocusWidget}
        onFocus={onFocusWidget}
      >
        <UIForm.Field inline id={id}>
          <FormFieldWrapper {...props}>
            <div className="blocks-widget-container">
              <Form
                key={id}
                formData={value}
                visual={true}
                hideActions
                onChangeFormData={onChangeBlocks}
                allowedBlocks={
                  props.allowedBlocks ??
                  config.settings['volto-blocks-widget']?.allowedBlocks
                }
                showRestricted={
                  props.showRestricted ??
                  config.settings['volto-blocks-widget']?.showRestricted
                }
                isFormSelected={currentFieldSelected === id}
                pathname={location.pathname}
              />
            </div>
          </FormFieldWrapper>
        </UIForm.Field>
      </div>

      <Portal node={document.getElementById('sidebar')}>
        {currentFieldSelected === id && <Sidebar />}
      </Portal>
    </>
  );
};

export default BlocksWidget;
