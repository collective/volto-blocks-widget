import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash';
import { flattenHTMLToAppURL } from '@plone/volto/helpers/Url/Url';
import { hasBlocksData } from '@plone/volto/helpers/Blocks/Blocks';
import RenderBlocks from './RenderBlocks';

const richTextHasContent = (data) => {
  if (hasBlocksData(data)) {
    //ReactDOMServer.renderToStaticMarkup(RenderBlocks({ data: data })),
    const renderedBlocks = RenderBlocks({ data: data });

    const textBlocks = values(data.blocks).filter(
      (b) => b['@type'] === 'slate',
    );
    const noTextBlocks = values(data.blocks).filter(
      (b) => b['@type'] !== 'slate',
    );

    const textContent = textBlocks?.filter(
      (b) => b.plaintext != null && b.plaintext?.trim().length > 0,
    )?.[0];

    return (
      renderedBlocks !== null &&
      ((textBlocks?.length > 0 && textContent && textContent !== '') ||
        noTextBlocks.length > 0)
    );
  } else {
    const textToDisplay = data?.data?.replace(/(<([^>]+)>)/g, '') ?? '';
    return textToDisplay.length > 0 ? true : false;
  }
};

/**
 * RichTextRender view component class.
 * @function RichTextRender
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const RichTextRender = ({ data, add_class, content }) => {
  let hasContent = richTextHasContent(data);

  return hasContent ? (
    hasBlocksData(data) ? (
      <div className={`richtext-blocks ${add_class ?? ''}`}>
        <RenderBlocks data={data} content={content} />
      </div>
    ) : (
      <div
        className={`${add_class}`}
        dangerouslySetInnerHTML={{ __html: flattenHTMLToAppURL(data.data) }}
      />
    )
  ) : null;
};

export { RichTextRender, richTextHasContent };

RichTextRender.propTypes = {
  data: PropTypes.object,
  add_class: PropTypes.string,
  content: PropTypes.object,
};
