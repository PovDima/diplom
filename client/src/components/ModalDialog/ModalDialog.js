import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    fontSize: '20px !important'
  }
}))

const ModalDialog = ({ open, title, submitMessage, rejectMessage, handleClose, handleSubmit }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogActions className={classes.buttonWrapper}>
        <Button className={classes.button} onClick={handleClose}>{rejectMessage}</Button>
        <Button className={classes.button} onClick={handleSubmit} autoFocus>{submitMessage}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalDialog
