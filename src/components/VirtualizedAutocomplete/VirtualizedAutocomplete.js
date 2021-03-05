import { List } from 'react-virtualized';
import React from 'react'
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const ListboxComponent = React.forwardRef((props, ref) => {
    const { children, role, ...other } = props;
    console.log(props)
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 36;
  
   
    return (
      <div ref={ref}>
        <div {...other}>
          <List
            height={250}
            width={850}
            rowHeight={itemSize}
            overscanCount={5}
            rowCount={itemCount}
            rowRenderer={(props) => {
              return React.cloneElement(children[props.index], {
                style: props.style
              });
            }}
            role={role}
            
          />
        </div>
      </div>
    );
  });
//   returns random element from the array
  function random(length,option) {
      console.log(length)
    // const characters =
    //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.";
    let result = "";
  
    for (let i = 0; i < length; i += 1) {
      result += option;
    }
  console.log(result)
    return result;
  }
  

const VirtualizedAutocomplete = (props) => {
    console.log(props)
   
    console.log(props.value)
    return (
        <Autocomplete
          id="virtualize-demo"
          noOptionsText={`Add '${props.optionTextValue}' as Customer`}
          disableListWrap
          onChange = {(event, newValue) => {
              console.log(newValue)
                props.getCustomerJobs(newValue); // Get the customer and get job
              }}
          size = "small"
          value = {props.value}
          ListboxComponent={ListboxComponent}
            // options={props.options}
             options={Array.from(props.options).map(() =>
        random(Math.ceil(Math.random() * 5),props.options)
      )}
          autoHighlight
        //   options={this.state.customers}
            getOptionLabel={(option) =>
              option.firstName
                ? option.firstName + " " + option.lastName
                : option
            }
            renderOption={(option) => (
              <React.Fragment>
                {option.firstName} {option.lastName} ({option.email})
              </React.Fragment>
            )}
        
          renderInput={(params) => (
            <TextField
               required
                autoFocus
              {...params}
              onKeyUp = {props.addNewCustomer}
              variant="outlined"
              label="Choose a Customer"
              size = "small"
              fullWidth
              inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
            />
          )}
        />
      );
}

export default VirtualizedAutocomplete
