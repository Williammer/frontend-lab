import React, { Fragment } from 'react';
import ResizableCodeViewer from './ResizableCodeViewer';

export default function MainWithCodeViewer({ Comp, path, ...viewerProps }) {
  return (
    <Fragment>
      <ResizableCodeViewer {...viewerProps} path={path} />
      <Comp path={path} />
    </Fragment>
  );
}
