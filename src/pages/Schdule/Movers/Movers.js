  import React, { useEffect, useState } from "react";
import style from "./Movers.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { getAllMover } from "../../../Redux/Schedule/scheduleAction";
import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const MoversSchedule = (props) => {
  const [allMovers, setAllMovers] = useState();
  const [filteredMovers, setFilteredMovers] = useState();
  const [dropDownMenu, setDropDownMenu] = useState('All')
  useEffect(() => {
    let { getAllMover } = props;
    getAllMover(res => {
      setAllMovers(res.data.data)
      setFilteredMovers(res.data.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = [
    {
      title: "Daily Schedule",
      path: "/schedule",
      icon: <FontAwesomeIcon icon={faClock} />,
    },

    {
      title: "Unavailable",
      path: "/schedule/unavailable",

      icon: <FontAwesomeIcon icon={faBan} />,
    },

    {
      title: "Movers",
      path: "/schedule/movers",

      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  const handleDropDownMenu = (e) => {
    let value = e.target.value
    setDropDownMenu(value)
    if(value === 'All') {
      setFilteredMovers(allMovers)
    } else {
      let filteredMovers = allMovers.filter((mover) => mover.attribute && mover.attribute.toLowerCase() === value.toLowerCase())
      setFilteredMovers(filteredMovers)
    }
  }

  return (
  
    <div className={`${style.moversContainer}`}>
      <div className={style.sidebar}>
        <SideBar routes={routes} />
      </div>
      <div className={style.moversContent}>
        <div className={style.moverHeader}>
          <div>
            <h3>Movers</h3>
          </div>

          <div className={`dropdown ${style.flexEnd}`}>
         
            {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> */}
             {/* <select name = "dropDownMenu" value = {dropDownMenu} onChange = {handleDropDownMenu} className = {style.dropDownMenu}>
             <option value = "Crew Leader">
                Crew Leader
              </option>
              
              <option value = "Mover">
                Mover
              </option>
              <option value = "New Mover">
                New Mover
              </option>
             </select> */}
            {/* </div> */}
            <i
                className={`fa fa-filter dropdown-toggle`}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={dropDownMenu}
                  onChange = {handleDropDownMenu}
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                    className="dropdown-item"
                  />
                  <FormControlLabel
                    value="Crew Leader"
                    control={<Radio />}
                    label="Crew Leader"
                    className="dropdown-item"
                  />
                  <FormControlLabel
                    value="Mover"
                    control={<Radio />}
                    label="Mover"
                    className="dropdown-item"
                  />
                   <FormControlLabel
                    value="New Mover"
                    control={<Radio />}
                    label="New Mover"
                    className="dropdown-item"
                  />
                </RadioGroup>
              </div>
          </div>
        </div>

        <div className={`list-group ${style.moverList}`}>
          <div className={style.listContent}>
            {filteredMovers && filteredMovers.length ? (
              filteredMovers.map((list, i) => {
                return (
                  <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className={`mb-1 `}>{list.name}</h5>
                      <small>{list.attribute}</small>
                    </div>
                    <div>
                      {list.weeklySchedule
                        .filter((day) => day.status)
                        .map((status, i) => {
                          return (
                            <span className="mb-1" key={i}>
                              {status.day.split("", 3).join("")}&nbsp;
                              </span>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            ) : (
                <div className="text-center">
                  <img src="/images/no-data-found.png" alt="" />
                </div>
              )}
          </div>
        </div>
      </div>
    </div >
  );
};

var actions = {
  getAllMover
};

export default connect(null, actions)(MoversSchedule);
