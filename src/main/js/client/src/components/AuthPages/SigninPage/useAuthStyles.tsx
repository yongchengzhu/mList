import { makeStyles } from '@material-ui/core';

export const useAuthStyles = makeStyles({
  textField: {
    width: '100%',
    'margin-top': '5px',
    '& label': {
      color: '#79787b',
    },
    '& label.Mui-focused': {
      color: '#79787b',
    },
    '& input': {
      color: '#fff',
    },
    '& div:before': {
      'border-bottom': '1px solid #79787b',
    },
    '& div:after': {
      'border-bottom': '2px solid #fff',
    },
    '& div:hover:not(.Mui-disabled):before': {
      'border-bottom': '2px solid #fff',
    },
  },
  button: {
    color: '#727174',
  },
  formControl: {
    '& label': {
      color: '#79787b',
    },
    '& label.Mui-focused': {
      color: '#79787b',
    },
    '& div': {
      color: '#fff',
    },
    '& div:before': {
      'border-bottom': '1px solid #79787b',
    },
    '& div:after': {
      'border-bottom': '2px solid #fff',
    },
    '& div:hover:not(.Mui-disabled):before': {
      'border-bottom': '2px solid #fff',
    },
  },
  formControlLabel: {
    margin: 0,
    verticalAlign: 'bottom!important',
    '& .MuiTypography-body1': {
      color: '#79787b',
      fontSize: '0.9em',
    }
  },
  editLastChapter: {
    width: '260px',
    'margin-top': '5px',
    '& label': {
      color: '#79787b',
    },
    '& label.Mui-focused': {
      color: '#79787b',
    },
    '& input': {
      color: '#fff',
    },
    '& div:before': {
      'border-bottom': '1px solid #79787b',
    },
    '& div:after': {
      'border-bottom': '2px solid #fff',
    },
    '& div:hover:not(.Mui-disabled):before': {
      'border-bottom': '2px solid #fff',
    },
  }
});