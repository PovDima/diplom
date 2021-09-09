import React from 'react';
import { FormControl, InputAdornment, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles(theme => ({
  searchIcon: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const Search = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { onClick } = props;

  return (
    <FormControl>
      <Input
        inputRef={ref}
        placeholder={'Search...'}
        endAdornment={
          <InputAdornment className={classes.searchIcon} onClick={onClick} position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

export default Search;
