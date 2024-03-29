import React, { useState } from "react";
import style from "./Truck.module.css";
import { cloneDeep } from "lodash";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

const Truck = (props) => {
  // truck options initial state
  const truckOption = [
    "Pickup Truck",
    "Cargo Van",
    "15 ft truck",
    "17 ft truck",
    "20 ft truck",
    "26 ft truck",
  ];

  const initialState = props.trucks;
  const [trucks, setTrucks] = useState(initialState);

  // add new truck
  const addTruck = () => {
    if (trucks[0].type && trucks[0].number) {
      setTrucks([...trucks, { type: "", number: "" }]);
      props.setTrucks([...trucks, { type: "", number: "" }]);
    }
  };
  // remove truck
  const removeTruck = (i) => {
    let truckArr = cloneDeep(trucks);
    truckArr.splice(i, 1);
    setTrucks(truckArr);
    props.setTrucks(truckArr);
  };

  // Handle trucks input change
  const handleTrucksInput = (e, i, inputType) => {
    let updatedTrucks = cloneDeep(trucks);
    let value = e.target.value;
    updatedTrucks[i][inputType] = value;
    if (inputType === "type") {
      updatedTrucks[i].number = 1;
    }
    setTrucks(updatedTrucks);
    props.setTrucks(updatedTrucks);
  };

  return (
    <div>
      <hr />
      <div className={style.movers}>
        {trucks &&
          trucks.map((x, i) => {
            return (
              <div className={style.moversChild} key={i}>
                <div className={style.styleFormFields}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Truck Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={trucks[i].type}
                      onChange={(e) => handleTrucksInput(e, i, "type")}
                      label="Truck Size"
                      name="truckSize"
                    >
                      <MenuItem value={"None"} disabled>
                        None
                      </MenuItem>
                      {truckOption.map((x, i) => (
                        <MenuItem key={i} value={x}>
                          {x}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                    }}
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="truck"
                    label="No. of Trucks"
                    autoComplete="Trucks"
                    name="truck"
                    value={trucks[i].number}
                    onChange={(e) => handleTrucksInput(e, i, "number")}
                  />
                  <div>
                    {i !== 0 ? (
                      <div
                        className={style.centeredIcon}
                        onClick={() => removeTruck(i)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        <div className="d-flex justify-content-end">
          <div
            onClick={addTruck}
            className={`${style.plusIcon} ${style.alignRight}`}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Truck;
