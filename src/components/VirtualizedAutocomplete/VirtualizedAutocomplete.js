import { CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import React, { useRef, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import style from "./VirtualizedAutocomplete.module.css"

const VirtualizedAutocomplete = (props) => {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const [virtualizedState, setVirtualizedState] = useState({
    selection: "",
    data: props.options,
  });
  const onSelect = (item) =>
    setVirtualizedState((prevState) => ({ ...prevState, selection: item }));

  const renderItem = (item) => {
    return (
      <div>
        {" "}
        {item.firstName} {item.lastName} ({item.email})
      </div>
      
    );
  };
  const renderJob = (item) => {
    return (
      <div>
        {item.title} ({item.status})
      </div>
    );
  };

  const renderMenu = (items, searchingFor, autocompleteStyle) => {
    cache.clearAll();

    const rowRenderer = ({ key, index, parent, style }) => {
      const Item = items[index];
      const onMouseDown = (e) => {
        if (e.button === 0) {
          Item.props.onClick(e);
        }
      };

      return (
        <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={index}>
          {React.cloneElement(Item, {
            style: {
              ...style,
              height: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              borderBottom: "1px solid grey",
              padding: "5px",
              boxSizing: "border-box",
            },
            key: key,
            onMouseEnter: null,
            onMouseDown: onMouseDown,
          })}
        </CellMeasurer>
      );
    };

    return (
      <List
        rowHeight={cache.rowHeight}
        height={207}
        rowCount={items.length}
        rowRenderer={rowRenderer}
        width={autocompleteStyle.minWidth || 0}
        style={{
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid black",
          height: "auto",
          maxHeight: "207px",
          overflowY: "scroll",
          display: items.length ? "block" : "none",
        }}
      />
    );
  };
  return (
    <div>
      {props.textField ? (
        <Autocomplete
          value={props.value}
          size="small"
          onSelect={onSelect}
          renderMenu={renderMenu}
          onChange={(event, newValue) => {
            props.setSelectedCustomerJobs(newValue); // Get the customer and get job
          }}
          options={props.options}
          
          autoHighlight
          getOptionLabel={(option) => (option.title ? option.title : option)}
          renderOption={renderJob}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a job"
              fullWidth
              className={style.styleFormFields}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      ) : (
        <Autocomplete
          id="virtualize-demo"
          noOptionsText={`Add '${props.optionTextValue}' as Customer`}
          disableListWrap
          onChange={(event, newValue) => {
            props.getCustomerJobs(newValue); // Get the customer and get job
          }}
          size="small"
          value={props.value}
          onSelect={onSelect}
          renderMenu={renderMenu}
          options={props.options}
          autoHighlight
          getOptionLabel={(option) =>
            option.firstName ? option.firstName + " " + option.lastName : option
          }
          renderOption={renderItem}
          renderInput={(params) => (
            <TextField
              required
              autoFocus
              {...params}
              onKeyUp={props.addNewCustomer}
              variant="outlined"
              label="Choose a Customer"
              size="small"
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default VirtualizedAutocomplete;
