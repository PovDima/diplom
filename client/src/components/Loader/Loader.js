import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
}))

const Loader = props => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <CircularProgress disableShrink thickness={5} />
    </div>
  )
}

export default Loader
