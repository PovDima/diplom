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
  const { isAuth } = useSelector((state) => state.users);
  const classes = useStyles()

  return (

    <AppBar className={classes.wrapper} position={'relative'} >
      {isAuth ? (
        <>
          <Link className={classes.link} to='/my-profile'>
            Профиль
          </Link>
          <Link className={classes.link} to='/statements'>
            Вступники
          </Link>
          <Link className={classes.link} to='/offers'>
            Конкурсні пропозиції
          </Link>
          <Link className={classes.link} to='/files'>
            Робота з файлами
          </Link>
          <Link className={classes.link} to='/logout'>
            Вихід
          </Link>
        </>
      ) : (
        <>
          <Link className={classes.link} to='/login'>
            Вхід
          </Link>
          <Link className={classes.link} to='/register'>
            Реєстрація
          </Link>
        </>
      )}

    </AppBar>
  );
}
export default NavBar
