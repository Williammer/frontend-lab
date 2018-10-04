import React, { Fragment } from 'react';
import ResizableCodeViewer from './ResizableCodeViewer';
import styled from 'styled-components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const Container = styled.div`
  display: inline-block;
  text-align: center;
`;

function MainWithCodeViewer({ Comp, path, width, ...viewerProps }) {
  return (
    <Fragment>
      <Container>
        <Comp path={path} />
      </Container>
      {isWidthUp('md', width) ? (
        <ResizableCodeViewer {...viewerProps} path={path} />
      ) : null}
    </Fragment>
  );
}

export default withWidth()(MainWithCodeViewer);
