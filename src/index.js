import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export const withRest = (RestComponent) => (args) => (WrappedComponent) => {
  class WithRestWrapper extends React.Component {
    render() {
      const {
        path,
        propName,
        render = (component, props, propName, args) => (
          <WrappedComponent {...props} {...{ [propName]: args }} />
        ),
        ...restComponentProps
      } = args;

      return (
        <RestComponent {...restComponentProps} path={path(this.props)}>
          {(...args) => render(WrappedComponent, this.props, propName, args)}
        </RestComponent>
      );
    }
  }

  return hoistNonReactStatics(WithRestWrapper, WrappedComponent);
};
