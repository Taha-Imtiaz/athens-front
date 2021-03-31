import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react'
// import Autocomplete from 'react-autocomplete';
import PlaceSearch from '../PlaceSearch/PlaceSearch';
import style from "./AddLocation.module.css"
import { Autocomplete } from "@material-ui/lab";

const AddLocation = ({ locationArr, addLocation, handleLocationChange }) => {

    const [state, setState] = useState({
        newProperty: '',
        propertyOptions: [
            { id: 1, name: "House" },
            { id: 2, name: "Condominium" },
            { id: 3, name: "Duplex" },
            { id: 4, name: "Trailer" },
            { id: 5, name: "Office" },
            { id: 6, name: "Indoor Storage" },
            { id: 7, name: "Outdoor Storage" },
            { id: 8, name: "Town House" },
            { id: 9, name: "Apartment" }
        ]
    })
    const initialState = {
        multiError: ""
    }
    const validate = () => {
        let multiError = ""
        if (this.state.locationArr.length === 0) {
            multiError = "Location must not be empty"
        }
        if (multiError) {
            setState({
                multiError
            });
            return false
        }
        return true;
    }

    //set the google location in the state
    const handleSetLocation = (choosenLocation, index) => {
        let value = choosenLocation ? choosenLocation.description : ''
        let location = cloneDeep(locationArr);
        location[index].value = value;
        handleLocationChange(location)
    }


    //onchange handler of radio buttons
    const handleInputChange = (e, i) => {
        let { value } = e.target;
        let updateLocation = cloneDeep(locationArr);
        updateLocation[i].type = value;
        updateLocation[i].default = false;
        handleLocationChange(updateLocation)
    };

    //change the state of textbox
    const changeCheckBoxState = (e, i) => {
        e.stopPropagation();
        let prevState = cloneDeep(locationArr);
        prevState[i].default = !prevState[i].default;
        handleLocationChange(prevState)
    };


    const removeLocation = (i) => {
        let location = cloneDeep(locationArr);
        location.splice(i, 1);
        handleLocationChange(location)
    }

    const propertyChanged = (e, i) => {
        if (e) {
            // setState({ ...state, propertyType: newValue.name });
            let prevState = cloneDeep(locationArr);
            prevState[i].propertyType = e.name;
            handleLocationChange(prevState)
        }
        else {
            // setState({ ...state, propertyType: "" });
            let prevState = cloneDeep(locationArr);
            prevState[i].propertyType = '';
            handleLocationChange(prevState)
        }
    };

    const addCustomPropertyType = (e, i) => {
        e.preventDefault();
        if (e.target.value) {
            setState({
                ...state,
                newProperty: e.target.value,
            });
            let propertyAdded = {
                name: state.newProperty,
                id: Math.random() * 10,
            };
            if (e.keyCode === 13 && e.target.value) {
                let propertyOptions = cloneDeep(state.propertyOptions);
                propertyOptions.push(propertyAdded);
                setState({
                    ...state,
                    propertyOptions
                });

                let prevState = cloneDeep(locationArr);
                prevState[i].propertyType = e.target.value;
                handleLocationChange(prevState)
            }
        } else {
            setState({
                ...state,
                newProperty: "",
            });
        }
    }
    //function to show all locations
    const showLocation = (i) => {
        return (
            <div className={style.locationInput} key={i}>
                {/* Property Type */}
                <div className={style.propertyType}>
                    <Autocomplete
                        noOptionsText={`Add '${state.newProperty}' to property type`}
                        value={locationArr[i].propertyType}
                        onChange={(event, newValue) => {
                            propertyChanged(newValue, i);
                        }}
                        limitTags={1}
                        id="property-tag"
                        options={
                            state.propertyOptions
                        }
                        getOptionLabel={(option) =>
                            option.name ? option.name : option
                        }
                        renderInput={(params) => (
                            <TextField onKeyUp={(e) => addCustomPropertyType(e, i)}
                                {...params}
                                required
                                className={style.styleFormFields}
                                variant="outlined"
                                size="small"
                                label="Property Type"
                                placeholder="Property Type"
                                error={state.multiError ? true : false}
                            />
                        )}
                    />
                </div>

                {/* Radio Buttons */}
                <div className={style.radioButtons}>
                    <RadioGroup
                        className={style.rowFlex}
                        value={locationArr[i].type}
                        onChange={(e) => handleInputChange(e, i)}
                    >
                        <FormControlLabel
                            value="pickup"
                            name="pickup"
                            control={<Radio className={style.styleRadio} />}
                            label="Pickup"
                        />
                        <FormControlLabel
                            value="dropoff"
                            name="dropoff"
                            control={<Radio className={style.styleRadio} />}
                            label="DropOff"
                        />
                    </RadioGroup>
                </div>
                {/* Google Location */}
                <div className={style.inputField}>
                    <PlaceSearch handleSetLocation={handleSetLocation} index={i} locationValue={locationArr[i].value} />
                </div>
                {/* Checkboxes */}
                {locationArr[i].type === "pickup" ? (
                    <div
                        className={
                            locationArr[i].type === "pickup" ? style.checkBox : null
                        }
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={locationArr[i].default}
                                    onClick={(e) => changeCheckBoxState(e, i)}
                                    name="checkboxStates"
                                    className={style.checkBoxTick}
                                />
                            }
                            label="Load only/IA"
                        />
                    </div>
                ) : locationArr[i].type === "dropoff" ? (
                    <div className={locationArr[i].type === "dropoff" ? style.checkBox : null}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={locationArr[i].default}

                                    onClick={(e) => changeCheckBoxState(e, i)}
                                    name="checkboxStates"
                                    className={style.checkBoxTick}

                                />
                            }
                            label="Unload Only"
                        />
                    </div>
                ) : null}
                <div className="d-flex justify-content-end">
                    <div className={`${style.TrashIcon} ${style.alignRight}`}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => removeLocation(i)}
                        ></FontAwesomeIcon>
                    </div>
                </div>

            </div>
        );
    };


    return (
        <div>
            {locationArr.map((location, i) =>
                showLocation(i)
            )}
            {locationArr.length > 0 && (
                <div className="d-flex justify-content-end">
                    <div onClick={addLocation}
                        className={`${style.plusIcon} ${style.alignRight}`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            )} <hr/>
        </div>
       
    )
}

export default AddLocation
