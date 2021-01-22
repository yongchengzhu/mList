import TextField from '@material-ui/core/TextField';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormControlLabel, withStyles, Switch } from '@material-ui/core';

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#f73378',
    '&$checked': {
      color: '#f73378',
    },
    '&$checked + $track': {
      backgroundColor: '#f73378',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#9f9f9f',
  },
})(Switch);

export const renderToggleSwitch = (props: any) => {
  return <FormControlLabel
    { ...props.input }
    className={props.className}
    control={<PurpleSwitch />}
    label="Update Date"
  />
}

export const renderTextField = (props: any) => {
  return <TextField 
    { ...props.input }
    type={props.type}
    label={props.label}
    className={props.className}
    error={props.meta.touched && props.meta.error}
  />
}

export const renderSelect = (props: any) => {
  return (
    <FormControl variant="filled" className={props.className}>
      <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
      <Select
        { ...props.input }
        labelId="demo-simple-select-filled-label"
      >
        <MenuItem value="reading">Reading</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="dropped">Dropped</MenuItem>
        <MenuItem value="axed">Axed</MenuItem>
        <MenuItem value="planned">Planned</MenuItem>
      </Select>
    </FormControl>
  )
}

export const required = (value: any) => value ? undefined : 'Cannot be empty';

export const rating = (value: any) => value >= 0 && value <= 5? undefined : 'Rating must be between 0 and 5';

export const passwordsMatch = (value: any, allValues: any) => 
  value !== allValues.password ? 'Passwords don\'t match' : undefined;