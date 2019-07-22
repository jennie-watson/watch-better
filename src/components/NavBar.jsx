import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Grid, Button, Badge, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import { NavBarStyles } from '../style/muiStyles'
import Search from './Search'

const StyledBadge = withStyles(() => ({
  badge: { top: '20%', right: '-7%' }
}))(Badge)

function NavBar (props) {
  const classes = NavBarStyles(props)
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link container to="/" className={`${classes.link} ${classes.logo}`}>WB</Link>
          <Link container to="/" className={`${classes.link} ${classes.tagline}`}>
            <Typography className={classes.tagline}>
              CURATION THROUGH A LENS OF DIVERSITY
            </Typography>
          </Link>
          <div className={classes.divide}>
            <StyledBadge color="primary" badgeContent={props.watchlist.length} className={classes.margin}>
              <Button className={classes.watchButton}><Link to="/movies/watchlist" className={classes.link}>Watchlist</Link></Button>
            </StyledBadge>
          </div>
          <Button className={classes.navButton}><Link to="/quiz" className={classes.link}>Test A Movie</Link></Button>
          <div className={classes.search}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon className={classes.searchIcon}/>
              </Grid>
              <Grid item>
                <Search className={classes.search}/>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = ({ watchlist }) => {
  return {
    watchlist
  }
}

export default connect(mapStateToProps)(NavBar)

NavBar.propTypes = {
  watchlist: PropTypes.array
}
