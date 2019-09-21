/* istanbul ignore file */
jest.mock('restful-react', () => ({
  __esModule: true,
  default: (props) => {
    const React = require('react');
    const PropTypes = require('prop-types');

    class Get extends React.Component {
      static propTypes = {
        children: PropTypes.func.isRequired,
      };

      render() {
        return this.props.children(
          {},
          { loading: false, error: null },
          { refetch: () => {} },
          { response: '', absolutePath: '' },
        );
      }
    }

    return <Get {...props} />;
  },
  Mutate: (props) => {
    const React = require('react');
    const PropTypes = require('prop-types');

    class Mutate extends React.Component {
      static propTypes = {
        children: PropTypes.func.isRequired,
      };

      render() {
        const mutate = () => new Promise(() => {});

        return this.props.children(
          mutate,
          { loading: false, error: null },
          { refetch: () => {} },
          { absolutePath: '' },
        );
      }
    }

    return <Mutate {...props} />;
  },
}));
