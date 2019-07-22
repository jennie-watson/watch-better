import { combineReducers } from 'redux'

import movies from './movies'
import movieDetails from './movieDetails'
import info from './info'
import sortType from './sort'
import selectedTests from './filter'
import watchlist from './watchlist'
import quizAnswer from './quizAnswer'

export default combineReducers({
  movies,
  movieDetails,
  info,
  sortType,
  selectedTests,
  watchlist,
  quizAnswer
})
