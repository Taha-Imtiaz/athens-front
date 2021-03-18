import React, { useState } from 'react'
import style from "./Truck.module.css";
import { cloneDeep } from "lodash";
import FormControl from "@material-ui/core/FormControl";
import {
    InputLabel,
    MenuItem,
    Button,
    Select,
    TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Truck = (props) => {

    // truck options initial state
    const truckOptions = ["Pickup Truck", "Cargo Van", "15 ft truck", "17 ft truck", "20 ft truck", "26 ft truck"]
    const [truckOption, setTruckOption] = useState(truckOptions)
    const [trucks, setTrucks] = useState(props.trucks)

    // add new truck
    const addTruck = () => {
        if (trucks[0].type && trucks[0].number) {
            console.log(trucks)
            setTrucks([...trucks, { type: "", number: "" }]);
            props.setTrucks([...trucks, { type: "", number: "" }])
        }
    };
    // remove truck
    const removeTruck = (i) => {
        let truckArr = cloneDeep(trucks);
        truckArr.splice(i, 1);
        setTrucks(trucks);
        props.setTrucks(trucks)
    };

    // Handle trucks input change
    const handleTrucksInput = (e, i, inputType) => {
        console.log(inputType, i)
        let updatedTrucks = cloneDeep(trucks);
        let value = e.target.value;
        updatedTrucks[i][inputType] = value;
        if (inputType == 'type') {
            updatedTrucks[i].number = 1;
        }
        setTrucks(updatedTrucks);
        props.setTrucks(updatedTrucks)

    }

    return (
        <div>
            <hr />
            <div className={style.movers}>
                {trucks && trucks.map((x, i) => {
                    return (
                        <div className={style.moversChild} key={i}>
                            <div>
                                <FormControl variant="outlined" margin="dense" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Truck Type
                          </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={trucks[i].type}
                                        onChange={(e) => handleTrucksInput(e, i, 'type')}
                                        label="Truck Size"
                                        name="truckSize"
                                    >
                                        <MenuItem value={"None"} disabled>None</MenuItem>
                                        {truckOption.map((x, i) => <MenuItem key={i} value={x}>{x}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <TextField
                                    type="number"
                                    variant="outlined"
                                    margin="dense"
                                    // required
                                    fullWidth
                                    size="small"
                                    id="truck"
                                    label="No. of Trucks"
                                    autoComplete="Trucks"
                                    name="truck"
                                    value={trucks[i].number}
                                    className={style.styleFormFields}
                                    // error={this.state.assigneeRequiredError ? true : false}
                                    onChange={(e) => handleTrucksInput(e, i, 'number')}
                                />

                                {i != 0 ?
                                    <div className={style.centeredIcon}
                                        onClick={() => removeTruck(i)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div> : null}</div>
                        </div>
                    );
                })}
                <div onClick={addTruck}
                    className={`${style.plusIcon} 
                    ${style.alignRight}`}>
                    <FontAwesomeIcon
                        icon={faPlus} />
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Truck
