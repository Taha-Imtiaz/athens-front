import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import React from 'react'
import PlaceSearch from '../PlaceSearch/PlaceSearch';
import style from "./AddLocation.module.css"

const AddLocation = ({ locationArr, addLocation, handleLocationChange }) => {
    // const [locations, setLocations] = useState(locationArr)

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
        // updateLocation[i].value = "";
        updateLocation[i].default = false;

        handleLocationChange(updateLocation)

    };

    //change the state of textbox
    const changeCheckBoxState = (e, i) => {
        e.stopPropagation();
        let prevState = cloneDeep(locationArr);
        prevState[i].default = !prevState[i].default;
        // if (prevState[i].default) {
        //   prevState[i].value =
        //     prevState[i].type === "pickup" ? prevState[i].value.concat(` (Load Only / IA)`) : prevState[i].value.concat(` (Unload Only)`);
        // } else {
        //   prevState[i].value = prevState[i].value.split('(')[0]
        // }
        handleLocationChange(prevState)

    };


    const removeLocation = (i) => {
        let location = cloneDeep(locationArr);
        location.splice(i, 1);
        handleLocationChange(location)
        //   this.setState({
        //     locations: location,
        //   });
    }

    //function to show all locations
    const showLocation = (i) => {
        return (
            <div className={style.locationInput} key={i}>
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
                <div className={style.inputField}>
                    <PlaceSearch handleSetLocation={handleSetLocation} index={i} locationValue={locationArr[i].value} />
                </div>
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

                                />
                            }
                            label="Load only / IA"
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

                                />
                            }
                            label="Unload Only"
                        />
                    </div>
                ) : null}
                <div className={`${style.TrashIcon} ${style.centeredIcon}`}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => removeLocation(i)}
                    ></FontAwesomeIcon>
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
                <div className={style.alignRight}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        onClick={addLocation}
                    ></FontAwesomeIcon>
                </div>
            )}
        </div>
    )
}

export default AddLocation
