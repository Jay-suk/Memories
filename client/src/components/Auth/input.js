import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

/*
component to be used for the input fields in auth form
for the password field we are setting an additional prompt -- to display the visibility icon at the end of the field
*/

const input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    return(
        <Grid item xs ={12} sm={ half ? 6 : 12 }>
          <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            { type === "password" ? <Visibility /> : <VisibilityOff />  }
                        </IconButton>
                    </InputAdornment>
                ),
            }:null
            }
          />  
        </Grid>
    );
}; 

export default input;