import React from "react";
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '35px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: 'white'
  }
}))

const NavBar = () => {
  const { isAuth } = useSelector((state) => { console.log(state); return state.users });
  const classes = useStyles()

  return (

    <AppBar className={classes.wrapper} position={'relative'} >
      {isAuth ? (
        <>
          <Link className={classes.link} to='/my-profile'>
            Profile
          </Link>
          <Link className={classes.link} to='/entrants'>
            Entrants
          </Link>
          <Link className={classes.link} to='/logout'>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link className={classes.link} to='/login'>
            Login
          </Link>
          <Link className={classes.link} to='/register'>
            Register
          </Link>
        </>
      )}

    </AppBar>
  );
}
export default NavBar
