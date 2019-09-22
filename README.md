## Overview

Inspired by the [react-apollo](https://www.apollographql.com/docs/react/api/react-apollo/) syntax, this simple wrapper extends [restfull-react](https://github.com/contiamo/restful-react) and allowing to visually separate the logic of REST queries from the component itself.

## Examples

Wrap component with `withRest`

```JavaScript
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { withRest } from 'restfull-react-with';

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

export default withRandom(withRandomImage)

```

Using [Recompose](https://github.com/acdlite/recompose)

```JavaScript
import React from 'react';
import PropTypes from 'prop-types';

import Get from 'restful-react';
import { compose } from "recompose";
import { withRest } from 'restfull-react-with';

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
);
```

Rewritten [Mutate](https://github.com/contiamo/restful-react#mutations-with-mutate) example:

```JavaScript

import React from 'react';
import PropTypes from 'prop-types';

import Get, {Mutate} from 'restful-react';
import { compose } from "recompose";
import { withRest } from 'restfull-react-with';

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
)

```

More examples here: https://github.com/contiamo/restful-react/blob/master/README.md
