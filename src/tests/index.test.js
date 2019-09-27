import { withRest } from '..';
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Get, { Mutate } from 'restful-react';

describe('Test withRest', () => {
  class Component extends React.Component {
    render() {
      return null;
    }
  }

  Component.propTypes = {
    rest: PropTypes.array.isRequired,
  };

  it('main tests', () => {
    const path = jest.fn(() => '/');
    const withRestWrapper = withRest(Get)({
      path,
      propName: 'rest',
    });
    expect(withRestWrapper).toBeInstanceOf(Function);
    const WrappedComponent = withRestWrapper(Component);
    const wrapped = mount(<WrappedComponent />);
    expect(path.mock.calls.length).toBe(1);
    expect(wrapped.find(Component)).toHaveLength(1);
  });

  it('test render callback', () => {
    const path = jest.fn(() => '/');
    const render = jest.fn((WrappedComponent, props, propName, args) => (
      <WrappedComponent {...props} {...{ [propName]: args }} />
    ));
    const withRestWrapper = withRest(Get)({
      path,
      propName: 'rest',
      render,
    });
    expect(withRestWrapper).toBeInstanceOf(Function);
    const WrappedComponent = withRestWrapper(Component);
    const wrapped = mount(<WrappedComponent />);
    expect(path.mock.calls.length).toBe(1);
    expect(render.mock.calls.length).toBe(1);
    expect(wrapped.find(Component)).toHaveLength(1);
  });
});
