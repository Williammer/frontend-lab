import React, { forwardRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Tooltip from '@material-ui/core/Tooltip';

export default function withToolTip(Component, toolTipProps) {
  function Wrapper(prop, ref) {
    return (
      <Tooltip {...toolTipProps}>
        <Component {...prop} ref={ref} />
      </Tooltip>
    );
  }
  Wrapper.displayName = `withToolTip(${Component.displayName ||
    Component.name})`;

  return hoistNonReactStatics(forwardRef(Wrapper), Component);
}
