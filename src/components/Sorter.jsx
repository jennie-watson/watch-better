import React from 'react'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { SORT_RATING_HIGH_LOW, SORT_RATING_LOW_HIGH, SORT_ALPHABETICAL_ASCENDING, sortBy } from '../actions/sort'
import { SorterStyle } from '../style/muiStyles'

const Sorter = ({ dispatch }) => {
  const classes = SorterStyle()

  const handleChange = ({ target: { value } }) => {
    dispatch(sortBy(value))
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="sort">Sort Movies By</InputLabel>
      <Select
        onChange={handleChange}
        inputProps={{
          name: 'sort',
          id: 'sort'
        }}
      >
        <MenuItem value={SORT_ALPHABETICAL_ASCENDING}>Sort A-Z</MenuItem>
        <MenuItem value={SORT_RATING_HIGH_LOW}>Rating High to Low</MenuItem>
        <MenuItem value={SORT_RATING_LOW_HIGH}>Rating Low to High</MenuItem>
      </Select>
    </FormControl>
  )
}

export default connect()(Sorter)

Sorter.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func
}