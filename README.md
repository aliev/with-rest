Inspired by the [react-apollo](https://www.apollographql.com/docs/react/api/react-apollo/) syntax, this simple wrapper extends [restfull-react](https://github.com/contiamo/restful-react) and allowing to visually separate the logic of REST queries from the component itself.

```JavaScript
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { withRest } from 'restfull-react-with';

class RandomImageComponent extends React.Component {
    render() {
        const [data, states, actions, meta] = this.props.randomImageResponse;
        return <button type="button" onClick={() => actions.refetch()}>Show me a new image!</button>;
    }
}

RandomImageComponent.PropTypes = {
    randomImageResponse: PropTypes.array.isRequired,
};

const withRandomImage = withRest(Get)({
    path: (props) => 'https://dog.ceo/api/breeds/image/random',
    propName: 'randomImageResponse',
});

export default withRandom(withRandomImage)

```

Using compose

```JavaScript
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { compose } from "recompose";
import { withRest } from 'restfull-react-with';

class RandomImageComponent extends React.Component {
    render() {
        return null;
    }
}

RandomImageComponent.PropTypes = {
    randomResponse: PropTypes.array.isRequired,
    trendingImagesResponse: PropTypes.array.isRequired,
};

const withRandomImage = withRest(Get)({
    path: (props) => 'https://dog.ceo/api/breeds/image/random',
    propName: 'randomImageResponse',
});

const withTrendingRepos = withRest(Get)({
    path: (props) => 'https://github-trending-api.now.sh',
    propName: 'trendingImagesResponse',
})

export default compose(
    withRandomImage,
    withTrendingRepos,
);
```

More examples here: https://github.com/contiamo/restful-react/blob/master/README.md
