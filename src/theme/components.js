// eslint-disable-next-line
export default {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        color: "#F4DFC8",

        "& fieldset": {
          borderColor: "#F4DFC8",          
        },
        "&:hover fieldset": {
          borderColor: "#F4DFC8",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#F4DFC8",
        },
        "&.Mui-error fieldset": {
          borderColor: "#d32f2f",
        },
         '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#F4DFC8', // hover border
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#F4DFC8', // focused border
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d32f2f', // error border
        },
      },
    },
  },
   MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#F4DFC8 !important',
        '&.Mui-focused': { color: '#F4DFC8' },
        '&.Mui-error': { color: '#d32f2f' },
      },
    },
  },
};
