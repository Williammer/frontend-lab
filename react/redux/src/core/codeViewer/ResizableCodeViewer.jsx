import React from 'react';
import Resizable from 're-resizable';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SourceCode from './SourceCode';
import mapPathToSourceCode from './mapPathToSourceCode';
import {
  baseDefaultResizableStyle,
  mobileResizableStyle,
  defaultResizableStyle,
} from './codeViewerStyles';

function ResizableCodeViewer({ path, enable, size, style, width }) {
  const defaultSize = size || {
    width: isWidthUp('lg', width)
      ? defaultResizableStyle.width
      : mobileResizableStyle.width,
    height: '-webkit-fill-available',
  };

  const computedStyle = {
    ...baseDefaultResizableStyle,
    fontSize: isWidthUp('lg', width)
      ? defaultResizableStyle.fontSize
      : mobileResizableStyle.fontSize,
    ...style,
  };
  return (
    <Resizable
      defaultSize={defaultSize}
      enable={enable || { left: true }}
      style={computedStyle}>
      <SourceCode code={mapPathToSourceCode[path]} />
    </Resizable>
  );
}

export default withWidth()(ResizableCodeViewer);
