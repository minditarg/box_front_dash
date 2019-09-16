import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const input = ( props ) => {
    let inputElement = null;
    let textValidation = null
    console.log(props);
    if (props.invalid && props.shouldValidate && props.touched) {
      textValidation =  props.textValid



    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <TextField style={{ marginTop:'15px'}}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):

            inputElement =
            <TextareaAutosize style={{ marginTop:'20px'}}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />;

            break;
        case ( 'select' ):
            inputElement = (
          <FormControl style={{ minWidth:'180px',marginTop:'15px'}}>
        <InputLabel >{ props.elementConfig.label}</InputLabel>
        <Select
        {...props.elementConfig}
          value={props.value}
          onChange={props.changed}

        >
         {props.elementConfig.options.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.displayValue}</MenuItem>

                    ))}


        </Select>
      </FormControl>
            );
            break;
        default:
            inputElement = <input

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
            <br /><span style={{ fontSize:'80%',color:'red' }}>{textValidation}</span>
        </div>
    );

};

export default input;
