import TextField from '@material-ui/core/TextField';
import React from 'react';

export const renderTextField = (props: any) => {
  return <TextField 
    { ...props.input }
    type={props.type}
    label={props.label}
    className={props.className}
    error={props.meta.touched && props.meta.error}
  />
}

export const required = (value: any) => value ? undefined : 'Cannot be empty';

export const passwordsMatch = (value: any, allValues: any) => 
  value !== allValues.password ? 'Passwords don\'t match' : undefined;