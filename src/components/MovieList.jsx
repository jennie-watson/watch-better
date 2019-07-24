import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMovies } from '../actions/movies'
import PropTypes from 'prop-types'
import { Box, Container } from '@material-ui/core'

import MovieListItem from './MovieListItem'
import Sorter from './Sorter'
import {
  sortAlphabeticalAscending,
  sortHighToLow,
  sortLowToHigh
} from '../utilities/sort'
import {
  SORT_RATING_HIGH_LOW,
  SORT_RATING_LOW_HIGH,
  SORT_ALPHABETICAL_ASCENDING
} from '../actions/sort'
import Filter from './Filter'
import { getWatchList } from '../actions/watchlist'
import { getSeenList } from '../actions/seenList'
import { isAuthenticated } from '../auth'
import { MovieListStyles } from '../style/muiStyles'

const MovieList = ({ dispatch, movies }, ...props) => {
  const classes = MovieListStyles(props)
  useEffect(() => {
    dispatch(getMovies())
    isAuthenticated() && dispatch(getWatchList())
    isAuthenticated() && dispatch(getSeenList())
  }, [dispatch])

  return (
    <Container className={classes.container}>
      <Box display="flex" flexDirection="row-reverse" p={1} m={1} className={classes.actions}>
        <Box p={1} m={2} className={classes.sort}>
          <Sorter />
        </Box>
        <Box p={1} m={2} className={classes.sort}>
          <Filter />
        </Box>
        <Box p={1} className={classes.header}>
          <h3 className={classes.title}>Movies</h3>
        </Box>
      </Box>
      {movies &&
        movies.map(movie => {
          return <MovieListItem key={movie.id} movie={movie} />
        })}
    </Container>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array,
  dispatch: PropTypes.func
}

const mapStateToProps = ({ movies, info, sortType }) => {
  switch (sortType) {
    case SORT_ALPHABETICAL_ASCENDING:
      return {
        movies: sortAlphabeticalAscending(movies),
        info,
        sortType
      }
    case SORT_RATING_HIGH_LOW:
      return {
        movies: sortHighToLow(movies),
        info,
        sortType
      }
    case SORT_RATING_LOW_HIGH:
      return {
        movies: sortLowToHigh(movies),
        info,
        sortType
      }

    default:
      return {
        movies,
        info,
        sortType
      }
  }
}

export default connect(mapStateToProps)(MovieList)
