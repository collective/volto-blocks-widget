import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash/isEmpty';
import { Form as UIForm } from 'semantic-ui-react';
import { createPortal } from 'react-dom';
import Sidebar from '@plone/volto/components/manage/Sidebar/Sidebar';
import Form from '@plone/volto/components/manage/Form/Form';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { setBlockWidgetSelected } from '../actions';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';

import './blocks_widget.css';

// Volto's major version tracks React's major version (Volto 18 shipped on
// React 18, Volto 17 on React 17, etc.), so React.version is used as a
// stand-in for the Volto version. @plone/volto/package.json is not a
// reliable source here: Volto may be resolved from npm or, in development,
// symlinked in from its checked-out source via mrs.developer, and the
// package.json path isn't guaranteed to be reachable in both cases. React
// is always a real, deduplicated dependency of the app instead.
const isReactVersionAtLeast18 =
  parseInt(React.version.split('.')[0], 10) >= 18;

const BlocksWidget = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { value = {}, id, onChange, required } = props;
  const currentFieldSelected = useSelector(
    (state) => state.blocksWidgetSelected?.value,
  );
  const currentFieldSelectedRef = useRef(currentFieldSelected);
  useEffect(() => {
    // tieni la ref sempre aggiornata
    currentFieldSelectedRef.current = currentFieldSelected;
  }, [currentFieldSelected]);

  const widgetRef = useRef();
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

  const onChangeBlocks = (data) => {
    onChange(id, {
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
  };

  const onFocusWidget = () => {
    if (currentFieldSelectedRef.current !== id) {
      dispatch(setBlockWidgetSelected(id));
    }
  };

  const onBlurWidget = () => {
    props.onBlur(id, value);
  };

  useEffect(() => {
    if (widgetRef) {
      const currentWidget = widgetRef.current;
      currentWidget.addEventListener('click', onFocusWidget);

      return () => {
        currentWidget.removeEventListener('click', onFocusWidget);
      };
    }
  }, [widgetRef]);
  return (
    <>
      <div className="blocks-widget" ref={widgetRef} onBlur={onBlurWidget}>
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
                  props?.widgetOptions?.allowedBlocks ??
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

      {isReactVersionAtLeast18 ? (
        <>
          {createPortal(
            <div
              style={{
                display: currentFieldSelected === id ? 'block' : 'none',
              }}
            >
              <Sidebar />
            </div>,
            document.getElementById('sidebar'),
          )}
        </>
      ) : (
        <Portal node={document.getElementById('sidebar')}>
          {currentFieldSelected === id && <Sidebar />}
        </Portal>
      )}
    </>
  );
};

export default BlocksWidget;
