import React, {useState} from 'react'
import style from "./Truck.module.css";
import { cloneDeep, uniqBy } from "lodash";
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

const Truck = () => {

    // truck options initial state
    const truckOptions = ["Pickup Truck", "Cargo Van", "15 ft truck", "17 ft truck", "20 ft truck", "26 ft truck"]
    const [truckOption, setTruckOption] = useState(truckOptions)

    // add new truck
    const addTruck = () => {
        if (this.state.trucks[0].type && this.state.trucks[0].number) {
            console.log(this.state.trucks)
            this.setState({ trucks: [...this.state.trucks, { type: "", number: "" }] });
        }
    };
    // remove truck
    const removeTruck = (i) => {
        let truckArr = cloneDeep(this.state.trucks);
        truckArr.splice(i, 1);
        this.setState({
            trucks: truckArr,
        });
    };

    // Handle trucks input change
   const handleTrucksInput = (e, i, inputType) => {
        let trucks = cloneDeep(this.state.trucks);
        let value = e.target.value;
        trucks[i][inputType] = value;
        if (inputType == 'type') {
            trucks[i].number = 1;
        }
        this.setState({
            trucks
        });
    }

    return (
        <div>
            <hr />
            <div className={style.movers}>
                {truckOption && truckOption.map((x, i) => {
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
                                        value={truckOption[i].type}
                                        onChange={(e) => this.handleTrucksInput(e, i, 'type')}
                                        label="Truck Size"
                                        name="truckSize"
                                    >
                                        <MenuItem value={"None"} disabled>None</MenuItem>
                                        {truckOptions.map((x, i) => <MenuItem key={i} value={x}>{x}</MenuItem>)}
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
                                    value={truckOption[i].number}
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
                <div onClick={addTruck} className={`${style.plusIcon} ${style.alignRight}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Truck
