import React, { PureComponent } from 'react';
import Resizable from 're-resizable';
import SourceCode from './SourceCode';

export default class ResizableCodeViewer extends PureComponent {
  defaultStyle = {
    borderWidth: '1px 1px 3px',
    borderStyle: 'solid solid double',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    background: 'rgb(29, 31, 33)',
    overflow: 'scroll',
  };

  render() {
    const { code, enable, size, style } = this.props;
    return (
      <Resizable
        defaultSize={size}
        enable={enable}
        style={{ ...this.defaultStyle, ...style }}>
        <SourceCode code={code} />
      </Resizable>
    );
  }
}
