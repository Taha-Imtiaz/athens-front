import React, { useEffect, useState } from "react";
import style from "./Unavailable.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import {
  getAllData,
  approveRequest,
} from "../../../Redux/Unavailable/unavailableAction";

import { connect } from "react-redux";

import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UnavailableSchedule = (props) => {
  let { getAllData, unavailable } = props;
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState("pending");
  const [status, setStatus] = useState(false);

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

  useEffect(() => {
    const { getAllData } = props;
    getAllData(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllData]);

  const handleChange = (list) => {
    let index = dates.findIndex((x) => x === list._id);
    if (index !== -1) {
      dates.splice(index, 1);
    } else {
      dates.push(list._id);
      setDates(dates);
    }
  };
  const approveRequests = () => {
    let { approveRequest } = props;
    if (dates.length > 0) {
      let data = {
        id: dates,
      };

      approveRequest(data);
    }
  };

  const changeStatus = (e) => {
    let value = e.target.value;
    setValue(value);
    getAllData(!status);
    setStatus(!status);
  };
  return (
    <div className={`${style.unavailableContainer}`}>
      <div className={style.sidebar}>
        <SideBar routes={routes} />
      </div>

      <div className={style.unavailableContent}>
        <div className={style.unavailableHeader}>
          <div>
            <h5>Unavailable</h5>
          </div>
         {value === "pending" ? <div className={style.approveBtn}>
            <Button className={style.button} onClick={approveRequests}>
              Approve
            </Button>
          </div>:<div></div>}

          <div className={`dropdown ${style.flex} ${style.dropDownMenu}`}>
            {/* <Button className={`${style.button}`}> */}
              <i
                className={`fa fa-filter dropdown-toggle  ${style.dropDownIcon}`}
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
                  value={value}
                  onChange={(e) => changeStatus(e)}
                >
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                    className="dropdown-item"
                  />
                  <FormControlLabel
                    value="approved"
                    control={<Radio />}
                    label="Approved"
                    className="dropdown-item"
                  />
                </RadioGroup>
              </div>
            {/* </Button> */}
          </div>
        </div>
        <div className={style.unavailableList}>
          {unavailable && unavailable.length > 0 ? (
            unavailable.map((list, i) => {
              return (
                <div className={`list-group ${style.item}`} key={i}>
                  <div
                    className={`list-group-item list-group-item-action flex-column align-items-start `}
                  >
                    <div className={`d-flex w-100 justify-content-between`}>
                      <span>
                        {list && list.approved === false && (
                          <input
                            type="checkbox"
                            id="defaultCheck1"
                            value=""
                            onChange={() => handleChange(list)}
                            className={`${style.checkBox}`}
                          />
                        )}
                        {list.applicant && list.applicant.name}
                      </span>
                    </div>
                    <p className="mb-1">
                      {list.dates.map((date, k) => (
                        <span className="mr-2" key={k}>
                          {new Date(date).toDateString()}
                        </span>
                      ))}
                    </p>
                    <div>
                      <p className="mb-1">Reason: {list.reason}</p>
                    </div>
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
  );
};

var mapStateToProps = (state) => ({
  unavailable: state.unavailable,
});
var actions = {
  getAllData,
  approveRequest,
};
export default connect(mapStateToProps, actions)(UnavailableSchedule);
