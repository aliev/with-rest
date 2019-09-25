# with-rest

Inspired by the [react-apollo](https://www.apollographql.com/docs/react/api/react-apollo/) syntax, this simple wrapper extends [restful-react](https://github.com/contiamo/restful-react) and allowing to visually separate the logic of REST queries from the component itself.

## Getting Started

To install and use this library, simply `yarn add with-rest`, or `npm i with-rest --save` and you should be good to go. Don't forget to `import { withRest } from "with-rest"` or similar wherever you need it!

## Examples

Example how to wrap component with `withRest`:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { withRest } from 'with-rest';

class RandomImageComponent extends React.Component {
    render() {
        const [data, states, actions, meta] = this.props.randomImageResponse;
        return (
            <div>
                {states.loading ? 'Loading' : <img src={data.message} />}
                <button type="button" onClick={() => actions.refetch()}>Show me a new image!</button>
            </div>
        );
    }
}

RandomImageComponent.PropTypes = {
    randomImageResponse: PropTypes.array.isRequired,
};

const withRandomImage = withRest(Get)({
    path: (props) => 'https://dog.ceo/api/breeds/image/random',
    propName: 'randomImageResponse',
});

export default withRandomImage(RandomImageComponent)

```

Wrap multiple components using [Recompose](https://github.com/acdlite/recompose)

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { compose } from "recompose";
import { withRest } from 'with-rest';

class RandomImageComponent extends React.Component {
    ...
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
)(RandomImageComponent);
```

Rewritten example from: [Mutate](https://github.com/contiamo/restful-react#mutations-with-mutate)

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import Get, { Mutate } from 'restful-react';
import { compose } from "recompose";
import { withRest } from 'with-rest';

class Movies extends React.Component {
    render() {
        const [movies, states, actions] = this.props.moviesList;
        const [deleteMovie, { loading: isDeleting }] = this.props.moviesDelete;

        return (
            <ul>
                {movies.map(movie) => (
                    <li>
                        {movie.name}
                        <button onClick={() => deleteMovie(movie.id).then(() => dispatch("DELETED"))} loading={isDeleting}>
                        Delete!
                        </button>
                    </li>
                )}
            </ul>
        )
    }
}

Movies.PropTypes = {
    moviesList: PropTypes.array.isRequired,
    moviesDelete: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const withMoviesList = withRest(Get)({
    path: (props) => '/movies',
    propName: 'moviesList',
});

const withMoviesDelete = withRest(Mutate)({
    path: (props) => '/movies',
    verb: 'DELETE',
    propName: 'moviesDelete',
});

export default compose(
    withMoviesList,
    withMoviesDelete,
)(Movies)
```

More examples here: https://github.com/contiamo/restful-react/blob/master/README.md
