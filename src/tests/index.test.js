import { withRest } from '..';
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Get, { Mutate } from 'restful-react';

it('withRest', () => {
  class Component extends React.Component {
    render() {
      return null;
    }
  }

  Component.propTypes = {
    rest: PropTypes.array.isRequired,
  };

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
