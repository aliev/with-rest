import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withRest = (RestComponent) => (args) => (WrappedComponent) => {
  class WithRestWrapper extends React.Component {
    render() {
      const {
        path,
        propName,
        ...restComponentProps
      } = args;

      return (
        <RestComponent {...restComponentProps} path={path(this.props)}>
          {(...args) => <WrappedComponent {...this.props} {...{ [propName]: args }} />}
        </RestComponent>
      );
    }
  }

  return hoistNonReactStatics(WithRestWrapper, WrappedComponent);
};
