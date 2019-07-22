import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { MovieListItemStyles } from '../style/muiStyles'
import {
  Container,
  Typography,
  Grid,
  Paper,
  ButtonBase,
  Button,
  withStyles,
  Box
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import Avatars from './Avatars'
import { addToWatchlist, removeFromWatchlist } from '../actions/watchlist'

const StyledRating = withStyles({
  iconFilled: {
    color: '#EBBC00'
  }
})(Rating)

const MovieListItem = (props) => {
  const classes = MovieListItemStyles(props)

  const seen = () => {
    const element = props.seenList.find(item => {
      return item.id === props.movie.id
    })
    if (element) {
      return true
    } else {
      return false
    }
  }

  const [redirect, setRedirect] = useState()
  const [watchColor, setWatchColor] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isSeen, setIsSeen] = useState(seen)
  const [seenColor, setSeenColor] = useState(seen)

  const handleClick = () => {
    setRedirect(props.movie.id)
  }

  const handleSeen = () => {
    const icon = isSeen
    const color = seenColor
    setIsSeen(!icon)
    setSeenColor(!color)
  }

  const handleWatch = () => {
    const icon = isAdded
    const color = watchColor
    if (isAdded) {
      setWatchColor(!color)
      setIsAdded(!icon)
      props.dispatch(removeFromWatchlist(props.movie.id))
    } else {
      setWatchColor(!color)
      setIsAdded(!icon)
      props.dispatch(addToWatchlist(props.movie))
    }

    setWatchColor(!color)
    setIsAdded(!icon)
  }

  const renderRedirect = () => {
    if (redirect) { return <Redirect push to={`/movie/${redirect}`} /> }
  }

  return (
    <>
    {renderRedirect()}
    <Container className={classes.list}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={`https://image.tmdb.org/t/p/w200${props.movie.image}`} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom className={classes.text}>
                    {props.movie.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <StyledRating name="half-rating" value={props.movie.rating / 2} readOnly precision={0.1}/>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button size="small" className={classes.button} onClick={handleClick}>SEE MORE</Button>
                </Grid>
              </Grid>
              <Grid>
                <Box display="flex" justifyContent="flex-end" m={0} p={0} bgcolor="background.paper">
                  {props.movie.movieTests.map(x => {
                    if (x.result) return <Avatars key={x.testType} test={x} />
                    else return null
                  })
                  }
                </Box>
                <div className={classes.topMargin}>
                  <Button size="small" className={classes.seenButton} style={{ backgroundColor: seenColor ? '#a9da71' : '#FFDF59' }}onClick={handleSeen}>
                    <i className={classes.icon}>{ isSeen ? 'visibility' : 'visibility_off'}</i>&nbsp;SEEN
                  </Button>
                  <Button size="small" className={classes.watchButton} style={{ backgroundColor: watchColor ? '#a9da71' : '#FFDF59' }} onClick={handleWatch}>
                    <i className={classes.icon}>{ isAdded ? 'check_box' : 'add_to_queue'}</i>&nbsp;WATCHLIST
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
    </>
  )
}

MovieListItem.propTypes = {
  movie: PropTypes.object,
  dispatch: PropTypes.func,
  seenList: PropTypes.object
}

const mapStateToProps = ({ seenList }) => {
  return {
    seenList
  }
}

export default connect(mapStateToProps)(MovieListItem)
