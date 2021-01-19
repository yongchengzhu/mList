import TextField from '@material-ui/core/TextField';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export const renderTextField = (props: any) => {
  return <TextField 
    { ...props.input }
    type={props.type}
    label={props.label}
    className={props.className}
    error={props.meta.touched && props.meta.error}
    // helperText={props.meta.error}
  />
}

export const renderSelect = (props: any) => {
  console.log(props.children);
  return (
    <FormControl variant="filled" className={props.className}>
      <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
      <Select
        { ...props.input }
        labelId="demo-simple-select-filled-label"
        // id="demo-simple-select-filled"
        // value={props.defaultValue}
        // onChange={handleChange}
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

export const rating = (value: any) => value >= 1 && value <= 5? undefined : 'Rating must be between 1 and 5';

export const passwordsMatch = (value: any, allValues: any) => 
  value !== allValues.password ? 'Passwords don\'t match' : undefined;