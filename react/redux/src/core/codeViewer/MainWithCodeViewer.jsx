import React, { Fragment } from 'react';
import ResizableCodeViewer from './ResizableCodeViewer';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: auto;
  text-align: center;
`;

export default function MainWithCodeViewer({ Comp, path, ...viewerProps }) {
  return (
    <Fragment>
      <Container>
        <Comp path={path} />
      </Container>
      <ResizableCodeViewer {...viewerProps} path={path} />
    </Fragment>
  );
}
