import React, { PureComponent } from 'react';
import Resizable from 're-resizable';
import SourceCode from './SourceCode';
import mapPathToSourceCode from './mapPathToSourceCode';

export default class ResizableCodeViewer extends PureComponent {
  defaultStyle = {
    border: '3px double #DDD',
    borderLeft: '6px double #DDD',
    background: 'rgb(29, 31, 33)',
    position: 'absolute',
    overflow: 'hidden',
    right: '0',
    top: '0',
    fontSize: '14px',
  };

  render() {
    const { path, enable, size, style } = this.props;
    return (
      <Resizable
        defaultSize={size || { width: 700, height: '-webkit-fill-available' }}
        enable={enable || { left: true }}
        style={{ ...this.defaultStyle, ...style }}>
        <SourceCode code={mapPathToSourceCode[path]} />
      </Resizable>
    );
  }
}
